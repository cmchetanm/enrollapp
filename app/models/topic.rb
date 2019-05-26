class Topic < ApplicationRecord
  belongs_to :creator, polymorphic: true
  belongs_to :owner, polymorphic: true

  validates :name, presence: true
end
