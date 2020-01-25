module HasStrongPassword
  extend ActiveSupport::Concern

  included do
    validates :password, password_strength: {use_dictionary: true}, allow_blank: true
  end
end
