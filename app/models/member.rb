class Member < ApplicationRecord
  belongs_to :study
  belongs_to :user, optional: true
  belongs_to :creator, class_name: 'User'

  validates :full_name, presence: true
  validates :email, presence: true
  validates :phone_number, presence: true, format:
      { with: /\A\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\z/,
        allow_blank: true, message: 'must have 10 digits' }
  validates :role, presence: true, inclusion: {in: [
    MemberRole::NURSE,
    MemberRole::PRINCIPAL_INVESTIGATOR,
    MemberRole::SUB_INVESTIGATOR,
    MemberRole::COMMUNITY_COLLEAGUE,
    MemberRole::SPONSOR
  ], allow_blank: true}

  before_validation :prettify, :link_user

  private

  def prettify
    self.phone_number = phone_number.to_s.gsub(/\D/, '')
  end

  def link_user
    self.user_id = User.find_by(email: email).try(:id)
  end
end
