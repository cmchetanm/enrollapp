class User < ApplicationRecord
  include HasFullName
  include SendsAsynchronousMail

  has_many :shares, dependent: :destroy
  has_many :studies, through: :shares
  has_many :messages, dependent: :destroy
  has_many :contacts, dependent: :destroy, foreign_key: :creator_id, inverse_of: :creator
  has_many :user_associations, dependent: :nullify, class_name: 'Contact', foreign_key: :user_id, inverse_of: :user

  devise :confirmable, :database_authenticatable, :invitable, :lockable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  before_validation :prettify

  def self.from_contact(contact)
    user = User.get_or_invite(contact.first_name, contact.last_name, contact.email, contact.phone_number)
    contact.update(user_id: user.id) if contact.user_id != user.id
    user
  end

  def self.get_or_invite(first_name, last_name, email, phone_number)
    user = User.find_by(email: email)
    if user.nil? || (!user.invitation_accepted? && !user.valid_invitation?)
      user = User.invite!(
        first_name: first_name.presence, last_name: last_name.presence,
        email: email.presence, phone_number: phone_number.presence
      )
    end
    user
  end

  def site_for(user)
    share = Share.find_by(user_id: user.id)
    puts 'user model got share'
    puts share
    puts 'with site id'
    puts share.site_id
    site = Site.find_by(id: share.site_id)
    puts 'site found'
    puts site
    @site_for ||= site
  end

  private

  def prettify
    self.phone_number = phone_number.to_s.gsub(/\D/, '')
    self.phone_number = nil if phone_number.blank?
  end
end
