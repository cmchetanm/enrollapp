module Api
  class UsersController < ApplicationController
    def fcm_token
      current_api_user.fcm_tokens[request.headers['client']] = params[:token]

      if current_api_user.save
        head :created
      else
        render json: {errors: current_api_user.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end
end
