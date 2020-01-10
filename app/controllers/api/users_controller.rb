module Api
  class UsersController < ApplicationController
    before_action :set_client

    def index
      @sites = Share.select(:site_id).where(user_id: current_api_user)
      @users = User.where(id: Share.select(:user_id).where(site_id: @sites))
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

    def check_exists
      puts 'in check existssssssssssssss'
      @user = User.where(id: params[:email])

      puts 'got user'
      puts @user
      if @user
        puts 'returning true'
        render json: {exists: true}
      else
        puts 'returning false'
        render json: {exists: false}
      end
    end

    private

    def set_client
      client_name = DeviseTokenAuth.headers_names[:client]
      @client_id = request.headers[client_name] || params[client_name]
    end
  end
end
