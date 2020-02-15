class Site < ApplicationRecord
  has_many :shares, dependent: :restrict_with_error
  has_many :studies, through: :shares
  has_many :users, through: :shares
  has_many :sites_studies, dependent: :destroy

  validates :name, presence: true

  def self.names
    order(:name)
  end

  def enrolled(study)
    self.sites_studies.where(study_id: study.id).sum(:enrolled)
  end

  def committed(study)
    self.sites_studies.where(study_id: study.id).sum(:committed)
  end
end
