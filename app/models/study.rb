class Study < ApplicationRecord
  belongs_to :topic, optional: true
  belongs_to :nurse, optional: true
  has_many :criteria, dependent: :destroy
  belongs_to :creator, polymorphic: true, optional: true
  belongs_to :owner, polymorphic: true

  validates :name, presence: true
  validate :validate_associations

  attr_accessor :inclusion_criteria, :exclusion_criteria

  accepts_nested_attributes_for :criteria

  def set_criteria(params, creator, owner)
    set_inclusion_criteria(params[:inclusion_criteria] || [], creator, owner)
    set_exclusion_criteria(params[:exclusion_criteria] || [], creator, owner)
  end

  private

  def set_inclusion_criteria(criteria_list, creator, owner)
    inclusion_criteria = Util.json_array_to_object_array(criteria_list, Criterion)
    remove_criteria(inclusion_criteria, CriterionType::INCLUSION)
    edit_criteria(inclusion_criteria, CriterionType::INCLUSION, creator, owner)
  end

  def set_exclusion_criteria(criteria_list, creator, owner)
    exclusion_criteria = Util.json_array_to_object_array(criteria_list, Criterion)
    remove_criteria(exclusion_criteria, CriterionType::EXCLUSION)
    edit_criteria(exclusion_criteria, CriterionType::EXCLUSION, creator, owner)
  end

  def edit_criteria(criteria_list, type, creator, owner)
    criteria_list.each do |criterion|
      if criterion.id.present?
        old_criterion = Criterion.find_by(id: criterion.id, study: self)
        old_criterion.text = criterion.text if old_criterion.present? && old_criterion.text != criterion.text
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
    errors.add(:nurse, 'does not exist') unless nurse_id.nil? || Nurse.exists?(id: nurse_id, owner: owner)
    errors.add(:topic, 'does not exist') unless Topic.exists?(id: topic_id, owner: owner)
  end
end
