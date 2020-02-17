module Api
  class ApplicationController < ActionController::Base
    include DeviseTokenAuth::Concerns::SetUserByToken
    skip_before_action :verify_authenticity_token
    before_action :authenticate_api_user!

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    private

    def record_not_found
      head :not_found
    end
  end
end
