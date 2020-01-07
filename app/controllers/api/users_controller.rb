module Api
  class UsersController < ApplicationController
    before_action :set_client

    def index
      puts 'users api controller'
      puts 'params'
      puts params
    end

    def fcm_token
      current_api_user.fcm_tokens ||= {}
      current_api_user.fcm_tokens[@client_id] = params[:token]

      if current_api_user.save
        head :created
      else
        render json: {errors: current_api_user.errors.full_messages.to_sentence}, status: :unprocessable_entity
      end
    end

    private

    def set_client
      client_name = DeviseTokenAuth.headers_names[:client]
      @client_id = request.headers[client_name] || params[client_name]
    end
  end
end
