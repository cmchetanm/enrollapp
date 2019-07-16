class Topic < ApplicationRecord
  belongs_to :sponsor
  has_many :studies, -> { order(:name) }, dependent: :destroy, inverse_of: :topic

  validates :name, presence: true

  def self.names
    order(:name)
  end
end
