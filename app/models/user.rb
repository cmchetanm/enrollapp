class User < ApplicationRecord
  include HasFullName
  include HasStrongPassword

  has_many :shares, dependent: :destroy
  has_many :studies, through: :shares
  has_many :messages, dependent: :destroy
  has_many :contacts, dependent: :destroy, foreign_key: :creator_id, inverse_of: :creator

  devise :confirmable, :database_authenticatable, :invitable, :lockable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  before_validation :prettify

  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end

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

  private

  def prettify
    self.phone_number = phone_number.to_s.gsub(/\D/, '')
    self.phone_number = nil if phone_number.blank?
  end
end
