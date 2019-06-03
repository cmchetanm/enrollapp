class Study < ApplicationRecord
  belongs_to :topic, optional: true
  belongs_to :nurse, optional: true
  belongs_to :creator, polymorphic: true, optional: true
  belongs_to :owner, polymorphic: true

  validates :name, presence: true
  validate :validate_associations

  private

  def validate_associations
    errors.add(:nurse, 'does not exist') unless nurse_id.nil? || Nurse.exists?(id: nurse_id, owner: owner)
    errors.add(:topic, 'does not exist') unless Topic.exists?(id: topic_id, owner: owner)
  end
end
