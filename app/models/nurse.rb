class Nurse < ApplicationRecord
  belongs_to :creator, polymorphic: true, optional: true
  belongs_to :owner, polymorphic: true

  validates :full_name, presence: true
  validates :email, presence: true
  validates :phone_number, presence: true, format:
      { with: /\A\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\z/,
        allow_blank: true, message: 'must have 10 digits' }

  before_validation :prettify

  def self.names
    all.order(:full_name)
  end

  private

  def prettify
    self.phone_number = phone_number.to_s.gsub(/\D/, '')
  end
end
