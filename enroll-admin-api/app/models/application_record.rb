class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  strip_attributes collapse_spaces: true

  before_create :set_uuid

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
