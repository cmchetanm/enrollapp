module Api
  class StudiesController < ApplicationController
    before_action :set_topic, only: :create
    before_action :set_study, only: %i[show update destroy]

    def index
      @studies = StudyAuthenticator.new(current_api_user).find_all
    end

    def show
    end

    def create
      @study = Study.new(study_params.merge(creator: current_api_user, owner: current_api_user))
      @study.set_criteria(study_params, current_api_user, current_api_user)

      if @study.save
        render :show, status: :created, location: @study
      else
        render json: {errors: @study.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def update
      @study.set_criteria(study_params, current_api_user, current_api_user)

      if @study.update(study_params)
        StudyNotifier.new(current_api_user, @study).notify if @study.published?
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
      @topic = TopicAuthenticator.new(current_api_user).find_one(params[:topic_id])
    end

    def set_study
      @study = StudyAuthenticator.new(current_api_user).find_one(params[:id])
    end

    def study_params
      params.permit(
        :topic_id, :name, :protocol, :agent, :mechanism, :side_effects, :administration,
        :randomization, :duration, :assessment_frequency, :interventions, :sponsor, :sponsor_contact,
        :cro_contact, :budget, :enrolled_or_committed, :comments,
        inclusion_criteria: [], exclusion_criteria: []
      )
    end
  end
end
