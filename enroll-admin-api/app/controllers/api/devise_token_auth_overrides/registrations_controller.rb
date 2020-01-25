module Api
  module DeviseTokenAuthOverrides
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
      protected

      def render_update_success
        render @resource
      end
    end
  end
end
