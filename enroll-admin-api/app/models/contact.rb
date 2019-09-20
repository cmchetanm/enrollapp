class Contact < ApplicationRecord
  include HasFullName

  belongs_to :user, optional: true
  belongs_to :creator, class_name: 'User', inverse_of: :contacts
  validates :email, presence: true, format: {
    with: URI::MailTo::EMAIL_REGEXP, message: 'is invalid', allow_blank: true
  }

  before_create :link_to_user

  private

  def link_to_user
    self.user = User.find_by(email: email)
  end
end
