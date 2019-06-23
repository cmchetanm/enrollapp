class Criterion < ApplicationRecord
  belongs_to :study
  belongs_to :creator, polymorphic: true, optional: true
  belongs_to :owner, polymorphic: true

  validates :kind, presence: true, inclusion: {in: CriterionType.all.map(&:to_s)}
  validates :text, presence: true
end
