class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :api_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_any!, unless: :api_controller?
  before_action :authenticate_api_user!, if: :api_controller?, unless: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found unless Rails.env.development?
  helper_method :no_admins?

  def no_admins?
    Admin.count.zero?
  end

  def authenticate_any!
    unless current_admin || current_sponsor
      authenticate_admin!
    end
  end



  protected

  def configure_permitted_parameters
    added_attrs = %i[first_name last_name phone_number name, contact, cro]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

  private

  def api_controller?
    request.path.start_with? '/api'
  end

  def record_not_found
    redirect_to not_found_url
  end

  def after_sign_out_path_for(resource_or_scope)
    [:new, resource_or_scope, :session]
  end
end
