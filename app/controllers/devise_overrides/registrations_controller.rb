# frozen_string_literal: true

module DeviseOverrides
  class RegistrationsController < Devise::RegistrationsController
    prepend_before_action :authenticate_scope!, unless: :no_admins?

    private

    def no_admins?
      Admin.count.zero?
    end
  end
end
