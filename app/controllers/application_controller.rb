class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :api_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_admin!, unless: :api_controller?
  before_action :authenticate_user!, if: :api_controller?, unless: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found unless Rails.env.development?

  def authenticated_user
    current_admin || current_user
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name phone_number])
  end

  private

  def api_controller?
    request.path.start_with? '/api'
  end

  def record_not_found
    redirect_to not_found_url
  end
end
