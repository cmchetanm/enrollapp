# rubocop:disable Style/MutableConstant
class StudyRole
  NURSE = 'Study Coordinator'
  PI = 'Principal Investigator'
  SUB = 'Sub-Investigator'
  COLLEAGUE = 'Community Colleague'
  OTHER = 'Other'

  def self.constants
    super.map(&:to_s)
  end

  def self.all
    constants.map { |const| Hash[const.to_s, const_get(const)] }.sort_by { |hash| hash.values.first }.reduce(:merge)
  end
end
# rubocop:enable Style/MutableConstant
