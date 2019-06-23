class Study < ApplicationRecord
  belongs_to :topic, optional: true
  has_many :criteria, dependent: :destroy
  has_many :appointments, inverse_of: :study, dependent: :destroy
  has_many :members, through: :appointments
  belongs_to :creator, polymorphic: true, optional: true
  belongs_to :owner, polymorphic: true

  scope :published, -> { where(published: true) }

  validates :name, presence: true
  validate :validate_associations

  attr_accessor :inclusion_criteria, :exclusion_criteria

  accepts_nested_attributes_for :criteria, :appointments

  def set_criteria(params, creator, owner)
    set_inclusion_criteria(params[:inclusion_criteria] || [], creator, owner)
    set_exclusion_criteria(params[:exclusion_criteria] || [], creator, owner)
  end

  def role(user)
    owner_id == user.id ? nil : members.find { |member| member.user_id == user.id }.role
  end

  private

  def set_inclusion_criteria(criteria_list, creator, owner)
    inclusion_criteria = Util.json_array_to_object_array(criteria_list, Criterion)
    remove_criteria(inclusion_criteria, CriterionType::INCL)
    edit_criteria(inclusion_criteria, CriterionType::INCL, creator, owner)
  end

  def set_exclusion_criteria(criteria_list, creator, owner)
    exclusion_criteria = Util.json_array_to_object_array(criteria_list, Criterion)
    remove_criteria(exclusion_criteria, CriterionType::EXCL)
    edit_criteria(exclusion_criteria, CriterionType::EXCL, creator, owner)
  end

  def edit_criteria(criteria_list, type, creator, owner)
    criteria_list.each do |criterion|
      if criterion.id.present?
        old_criterion = Criterion.find_by(id: criterion.id, study: self)
        old_criterion.update(text: criterion.text) if old_criterion.present?
      else
        criteria << Criterion.new(kind: type, text: criterion.text, creator: creator, owner: owner)
      end
    end
  end

  def remove_criteria(criteria_list, type)
    old_criteria_ids ||= criteria.where(kind: type).pluck(:id)
    new_criteria_ids = []
    criteria_list.each do |criterion|
      new_criteria_ids << criterion.id if criterion.id.present?
    end
    deleted_criteria_ids = old_criteria_ids - new_criteria_ids
    criteria.where(id: deleted_criteria_ids).destroy_all if deleted_criteria_ids.any?
  end

  def validate_associations
    errors.add(:topic, 'does not exist') unless Topic.exists?(id: topic_id, owner: owner)
  end
end
