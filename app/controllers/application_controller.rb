class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token, if: :api_controller?

  private

  def api_controller?
    request.path.start_with? '/api'
  end
end
