class StudyVersion < ApplicationRecord
  belongs_to :site
  belongs_to :study
  validates :name, presence: true

  before_save :format_criteria

  private

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
