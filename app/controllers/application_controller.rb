class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :api_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_admin!, unless: :api_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name phone_number])
  end

  private

  def api_controller?
    request.path.start_with? '/api'
  end
end
