class Site < ApplicationRecord
  has_many :shares, dependent: :restrict_with_error
  has_many :studies, through: :shares
  has_many :users, through: :shares

  validates :name, presence: true

  def self.names
    order(:name)
  end
end
