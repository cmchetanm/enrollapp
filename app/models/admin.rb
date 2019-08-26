class Admin < ApplicationRecord
  include HasFullName
  include HasStrongPassword
  include SendsAsynchronousMail

  devise :confirmable, :database_authenticatable, :invitable, :lockable, :registerable,
         :recoverable, :rememberable, :timeoutable, :validatable
end
