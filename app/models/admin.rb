class Admin < ApplicationRecord
  include HasStrongPassword

  devise :confirmable, :database_authenticatable, :lockable, :registerable,
         :recoverable, :rememberable, :timeoutable, :validatable
end
