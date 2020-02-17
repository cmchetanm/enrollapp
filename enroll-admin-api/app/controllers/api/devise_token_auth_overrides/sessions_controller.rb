module Api
  module DeviseTokenAuthOverrides
    class SessionsController < DeviseTokenAuth::SessionsController
      def destroy
        @resource&.fcm_tokens&.delete(@client_id)
        super
      end

      protected

      def render_create_success
        render @resource
      end
    end
  end
end
