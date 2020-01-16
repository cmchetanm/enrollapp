# frozen_string_literal: true

module DeviseOverrides
  class RegistrationsController < Devise::RegistrationsController
    prepend_before_action :authenticate_scope!, unless: :no_resources?

    private

    def no_resources?
      resource_class.count.zero?
    end
  end
end
