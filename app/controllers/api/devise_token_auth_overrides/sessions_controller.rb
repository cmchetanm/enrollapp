module Api
  module DeviseTokenAuthOverrides
    class SessionsController < DeviseTokenAuth::SessionsController
      def render_create_success
        render @resource
      end
    end
  end
end
