# frozen_string_literal: true

module DeviseOverrides
  class SessionsController < Devise::SessionsController
    before_action :redirect_mobile_user

    def new
      if resource_class.count.zero?
        redirect_to [:new, resource_name, :registration]
      else
        super
      end
    end

    private

    def redirect_mobile_user
      redirect_to mobile_app_url if resource_name == :user
    end
  end
end
