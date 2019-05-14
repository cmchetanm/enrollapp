class Admin < ApplicationRecord
  devise :confirmable, :database_authenticatable, :lockable, :registerable,
         :recoverable, :rememberable, :timeoutable, :validatable

  validates :password, password_strength: {use_dictionary: true}, allow_blank: true
end
