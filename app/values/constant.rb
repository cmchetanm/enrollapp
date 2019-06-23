class Constant
  def self.all
    constants
  end

  def self.values
    constants.map { |const| const_get(const) }.sort
  end

  def self.pairs
    constants.map { |const| Hash[const, const_get(const)] }.sort_by { |hash| hash.values.first }
  end
end
