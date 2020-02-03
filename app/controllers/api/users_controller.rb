module Api
  class UsersController < ApplicationController
    before_action :set_client

    def index
      puts 'api users controller index'
      @shares = Share.where(user_id: current_api_user)
      puts 'in controller @@shares are'
      puts @shares
      @sites = []
      @shares.each do |share|
        puts 'share'
        puts share.attributes
        @sites.push(share[:site_id])
      end
      puts 'sites are'
      puts @sites
      @users = User.where(id: Share.select(:user_id).where(site_id: @sites))
      puts 'in controller users are'
      puts @users
      @users.each do |user|
        puts user.attributes
      end
    end

    def fcm_token
      puts 'api users controller fcm_tokem'
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
      puts 'api users controller set_client'
      client_name = DeviseTokenAuth.headers_names[:client]
      @client_id = request.headers[client_name] || params[client_name]
    end
  end
end
