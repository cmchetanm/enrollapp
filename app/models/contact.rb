class Contact < ApplicationRecord
  include HasFullName

  belongs_to :user, optional: true
  belongs_to :creator, class_name: 'User', inverse_of: :contacts
  validates :email, presence: true, format: {
    with: URI::MailTo::EMAIL_REGEXP, message: 'is invalid', allow_blank: true
  }
  validates :phone_number, format:
      {with: /\A\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\z/,
       allow_blank: true, message: 'must have 10 digits'}
end
