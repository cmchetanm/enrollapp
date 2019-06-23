class Topic < ApplicationRecord
  belongs_to :creator, polymorphic: true
  belongs_to :owner, polymorphic: true
  has_many :studies, dependent: :destroy
  has_many :appointments, through: :studies, dependent: :destroy

  validates :name, presence: true

  def self.names
    all.order(:name)
  end
end
