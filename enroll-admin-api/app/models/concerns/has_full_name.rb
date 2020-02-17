module HasFullName
  extend ActiveSupport::Concern

  included do
    validates :first_name, :last_name, presence: true, length: {maximum: 255}
  end

  def full_name
    "#{last_name}, #{first_name}"
  end
end
