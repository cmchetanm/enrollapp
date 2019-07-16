class Contact < ApplicationRecord
  include HasFullName

  belongs_to :user, optional: true
  belongs_to :creator, class_name: 'User', inverse_of: :contacts
end
