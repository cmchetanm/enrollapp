class User < ApplicationRecord
  include HasStrongPassword
  include DeviseTokenAuth::Concerns::User

  has_many :nurses, as: :owner, dependent: :destroy
  has_many :members, dependent: :destroy
  has_many :studies, as: :owner, dependent: :destroy
  has_many :topics, as: :owner, dependent: :destroy

  devise :confirmable, :database_authenticatable, :lockable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :first_name, :last_name, presence: true
  validates :phone_number, presence: true, format:
      { with: /\A\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\z/,
        allow_blank: true, message: 'must have 10 digits' }

  before_validation :prettify
  after_commit :link_studies

  def self.names
    all.order(:first_name, :last_name).select(:id, :first_name, :last_name)
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end

  private

  def prettify
    self.phone_number = phone_number.to_s.gsub(/\D/, '')
  end

  def link_studies
    StudyTeamManager.link_studies(self)
  end
end
