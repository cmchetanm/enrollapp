class Appointment < ApplicationRecord
  belongs_to :study
  belongs_to :member
  belongs_to :creator, class_name: 'User'
end
