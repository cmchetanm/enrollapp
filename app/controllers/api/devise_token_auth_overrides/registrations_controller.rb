module Api
  module DeviseTokenAuthOverrides
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
      # def update
      #   puts 'update'
      # end
      # def new
      #   puts 'new'
      # end
      # def edit
      #   puts 'edit'
      # end
      # # POST /resource/invitation
      # def create
      #   puts 'create'
      # end
      protected

      def render_update_success
        render @resource
      end
    end
  end
end
