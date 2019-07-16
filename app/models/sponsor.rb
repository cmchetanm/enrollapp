class Sponsor < ApplicationRecord
  has_many :topics, -> { order(:name) }, dependent: :destroy, inverse_of: :sponsor
  has_many :studies, through: :topics
end
