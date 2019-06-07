module Api
  class StudiesController < ApplicationController
    before_action :set_topic, only: %i[index create]
    before_action :set_study, only: %i[show update destroy]

    def index
      @studies = Study.eager_load(:topic).where(topic: @topic, owner: current_api_user).order(:name)
    end

    def show
    end

    def create
      @study = Study.new(study_params.merge(creator: current_api_user, owner: current_api_user))

      if @study.save
        render :show, status: :created, location: @study
      else
        render json: {errors: @study.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def update
      if @study.update(study_params)
        render :show, status: :ok, location: @study
      else
        render json: {errors: @study.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      if @study.destroy
        render :show, status: :ok, location: @study
      else
        render json: {errors: @study.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_topic
      @topic = Topic.find_by!(id: params[:topic_id], owner: current_api_user)
    end

    def set_study
      @study = Study.find_by!(id: params[:id], owner: current_api_user)
    end

    def study_params
      params.permit(:topic_id, :nurse_id, :name, :protocol, :agent, :mechanism, :side_effects, :administration,
                    :randomization, :duration, :assessment_frequency, :interventions, :contact, :honorarium, :comments)
    end
  end
end
