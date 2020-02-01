module DeviseOverrides
  class InvitationsController < Devise::InvitationsController
    before_action :configure_permitted_parameters, if: :devise_controller?

    # POST /resource/invitation
    def create
      puts 'create'
      self.resource = invite_resource
      resource_invited = resource.errors.empty?

      yield resource if block_given?
      puts '1'
      if resource_invited
        puts '2'
        if is_flashing_format? && self.resource.invitation_sent_at
          puts '3'
          set_flash_message :notice, :send_instructions, email: self.resource.email
        end
        if self.method(:after_invite_path_for).arity == 1
          puts '4'
          respond_with resource, location: after_invite_path_for(current_inviter)
        else
          puts '5'
          respond_with resource, location: after_invite_path_for(current_inviter, resource)
        end
      else
        puts '6'
        respond_with_navigational(resource) { render :new }
      end
      puts '7'
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
