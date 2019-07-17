class Study < ApplicationRecord
  belongs_to :topic
  has_one :sponsor, through: :topic
  has_many :shares, dependent: :destroy
  has_many :sites, -> { order(:name) }, through: :shares
  has_many :users, through: :shares
  has_many :messages, dependent: :destroy
  has_many :study_versions, dependent: :destroy

  validates :name, presence: true

  before_save :format_criteria

  def role_for(user)
    @role_for ||= my_share(user).role
  end

  def site_for(user)
    @site_for ||= my_share(user).site_id
  end

  def version_for(user)
    @version_for ||= StudyVersion.find_by(site_id: my_share(user).site_id, study_id: id)
  end

  private

  def my_share(user)
    @my_share ||= Share.find_by(user_id: user.id, study_id: id)
  end

  def format_criteria
    self.inclusion_criteria = strings_to_json_array(inclusion_criteria)
    self.exclusion_criteria = strings_to_json_array(exclusion_criteria)
  end

  def strings_to_json_array(str)
    return nil if str.nil?

    array = str.is_a?(Array) ? str : str.lines
    array.map { |line| line.gsub('\n', '') }.map(&:strip).reject(&:blank?)
  end
end
