class Sponsor < ApplicationRecord
  has_many :topics, -> { order(:name) }, dependent: :destroy, inverse_of: :sponsor
  has_many :studies, through: :topics

  devise :database_authenticatable, :registerable,
   :recoverable, :rememberable, :timeoutable, :validatable, :invitable


  def first_name
    self.name
  end
end
