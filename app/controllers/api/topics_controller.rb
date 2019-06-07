module Api
  class TopicsController < ApplicationController
    before_action :set_topic, only: %i[show update destroy]

    def index
      @topics = Topic.all.where(owner: current_api_user).order(:name)
    end

    def show
    end

    def create
      @topic = Topic.new(topic_params.merge(creator: current_api_user, owner: current_api_user))

      if @topic.save
        render :show, status: :created, location: @topic
      else
        render json: {errors: @topic.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def update
      if @topic.update(topic_params)
        render :show, status: :ok, location: @topic
      else
        render json: {errors: @topic.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      if @topic.destroy
        render :show, status: :ok, location: @topic
      else
        render json: {errors: @topic.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_topic
      @topic = Topic.find_by!(id: params[:id], owner: current_api_user)
    end

    def topic_params
      params.permit(:name)
    end
  end
end
