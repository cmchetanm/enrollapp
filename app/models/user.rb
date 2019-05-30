class User < ApplicationRecord
  include HasStrongPassword
  include DeviseTokenAuth::Concerns::User

  devise :confirmable, :database_authenticatable, :lockable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :first_name, :last_name, presence: true
  validates :phone_number, presence: true, format:
      { with: /\A\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\z/,
        allow_blank: true, message: 'must have 10 digits' }

  before_validation :prettify

  def self.names
    all.order(:first_name, :last_name).select(:id, :first_name, :last_name)
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def prettify
    self.phone_number = phone_number.to_s.gsub(/\D/, '')
  end
end
