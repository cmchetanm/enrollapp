class User < ApplicationRecord
  include HasStrongPassword
  include DeviseTokenAuth::Concerns::User

  devise :confirmable, :database_authenticatable, :lockable, :registerable,
         :recoverable, :rememberable, :validatable
end
