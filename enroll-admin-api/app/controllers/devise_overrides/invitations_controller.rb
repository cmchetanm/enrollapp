module DeviseOverrides
  class InvitationsController < Devise::InvitationsController
    before_action :configure_permitted_parameters, if: :devise_controller?

    protected

    def after_invite_path_for(_inviter, _invitee = nil)
      [resource_name.to_s.pluralize]
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:invite, keys: %i[first_name last_name phone_number])
    end
  end
end
