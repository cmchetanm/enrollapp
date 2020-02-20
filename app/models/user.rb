class User < ApplicationRecord
  # include HasFullName
  include SendsAsynchronousMail

  has_many :shares, dependent: :destroy
  has_many :studies, through: :shares
  has_many :messages, dependent: :destroy
  has_many :contacts, dependent: :destroy, foreign_key: :creator_id, inverse_of: :creator
  has_many :user_associations, dependent: :nullify, class_name: 'Contact', foreign_key: :user_id, inverse_of: :user

  devise :confirmable, :database_authenticatable, :invitable, :lockable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User
  validates :email, presence: true, format: {
    with: URI::MailTo::EMAIL_REGEXP, message: 'is invalid', allow_blank: true
  }
  validates :first_name, presence: true, length: {maximum: 255}

  before_validation :prettify

  def full_name
    "#{last_name}, #{first_name}"
  end

  def self.from_contact(contact)
    user = User.get_or_invite(contact.first_name, contact.last_name, contact.email, contact.phone_number)
    contact.update(user_id: user.id) if contact.user_id != user.id
    user
  end

  def self.get_or_invite(first_name, last_name, email, phone_number, study_id = nil, name=nil)
    user = User.find_by(email: email)
    study = Study.find_by(id: study_id)
    name = study&.sponsor&.name
    if user.nil?
      user = User.new(
        first_name: first_name.presence, last_name: last_name.presence,
        email: email.presence, phone_number: phone_number.presence
      )
      generated_password = rand.to_s[2..7]
      user.password = generated_password
      user.skip_confirmation!
      user.save!
      BarsMailer.welcome_email(user, generated_password, study, :admin, name).deliver_now
    else
      BarsMailer.welcome_email(user, nil, study, :admin, name).deliver_now
    end
    user
  end

  def site_for(user)
    share = Share.find_by(user_id: user.id)
    site = Site.find_by(id: share.site_id)
    @site_for ||= site
  end

  private

  def prettify
    self.phone_number = phone_number.to_s.gsub(/\D/, '')
    self.phone_number = nil if phone_number.blank?
  end
end
