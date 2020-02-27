class Contact < ApplicationRecord
  # include HasFullName

  belongs_to :user, optional: true
  belongs_to :creator, class_name: 'User', inverse_of: :contacts
  validates :email, presence: true, format: {
    with: URI::MailTo::EMAIL_REGEXP, message: 'is invalid', allow_blank: true
  }
  validates :first_name, presence: true, length: {maximum: 255}
  before_create :link_to_user

  def full_name
    last_name.present? ? "#{last_name}, #{first_name}" : "#{first_name}" 
  end

  private

  def link_to_user
    self.user = User.find_by(email: email)
  end
end
