class Message < ApplicationRecord
  belongs_to :study
  belongs_to :site
  belongs_to :user
end
