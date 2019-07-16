module Api
  class MessagesController < ApplicationController
    before_action :set_share, only: %i[index create]
    before_action :set_message, only: %i[show edit update destroy]

    def index
      @messages = MessageAuthenticator.new(current_api_user).find_all(@share)
    end

    def create
      @message = Message.new(message_params.merge(site_id: @share.site_id, user: current_api_user))

      if @message.save
        render :show, status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def update
      if @message.update(message_params)
        render :show, status: :ok
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @message.destroy
        render :show, status: :ok
      else
        render json: {errors: @message.errors.full_messages.to_sentence}, status: :unprocessable_entity
      end
    end

    private

    def set_share
      @share = Share.find_by!(study_id: params[:study_id], user: current_api_user)
    end

    def set_message
      @message = Message.find_by!(id: params[:id], user: current_api_user)
    end

    def message_params
      params.permit(:study_id, :site_id, :user_id, :text)
    end
  end
end
