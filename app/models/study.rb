class Study < ApplicationRecord
  belongs_to :topic, optional: true
  has_many :appointments, inverse_of: :study, dependent: :destroy
  has_many :members, through: :appointments
  belongs_to :creator, polymorphic: true, optional: true
  belongs_to :owner, polymorphic: true

  scope :published, -> { where(published: true) }

  validates :name, presence: true
  validate :validate_associations

  accepts_nested_attributes_for :appointments

  def role(user)
    owner_id == user.id ? nil : members.find { |member| member.user_id == user.id }.role
  end

  private

  def validate_associations
    errors.add(:topic, 'does not exist') unless Topic.exists?(id: topic_id, owner: owner)
  end
end
