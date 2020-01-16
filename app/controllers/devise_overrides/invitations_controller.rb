module DeviseOverrides
  class InvitationsController < Devise::InvitationsController
    before_action :configure_permitted_parameters, if: :devise_controller?
    #GET /resource/sign_in
    def new
      puts 'new'
      super
    end

    #DELETE /resource/sign_out
    def destroy
      puts 'destroy'
      super
    end
    # POST /resource/invitation
    def create
      self.resource = invite_resource
      resource_invited = resource.errors.empty?

      yield resource if block_given?
      puts 'invite_resource'
      puts invite_resource
      puts 'is_flashing_format?'
      puts is_flashing_format?
      puts 'is_flashing_format'
      puts is_flashing_format

      if resource_invited
        if is_flashing_format? && self.resource.invitation_sent_at
          set_flash_message :notice, :send_instructions, email: self.resource.email
        end
        if self.method(:after_invite_path_for).arity == 1
          respond_with resource, location: after_invite_path_for(current_inviter)
        else
          respond_with resource, location: after_invite_path_for(current_inviter, resource)
        end
      else
        respond_with_navigational(resource) { render :new }
      end
    end

    protected

    def after_invite_path_for(_inviter, _invitee = nil)
      puts 'after_invite_path_for'
      [resource_name.to_s.pluralize]
    end

    def configure_permitted_parameters
      puts 'configure_permitted_parameters'
      devise_parameter_sanitizer.permit(:invite, keys: %i[first_name last_name phone_number])
    end
  end
end
