# frozen_string_literal: true

module DeviseOverrides
  class SessionsController < Devise::SessionsController
    def new
      if resource_class.count.zero?
        redirect_to [:new, resource_name, :registration]
      else
        super
      end
    end
  end
end
