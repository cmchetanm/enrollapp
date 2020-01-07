module Api
  class StudiesController < ApplicationController
    before_action :set_share, except: :index
    before_action :set_study_version, except: :index
    before_action :set_study, except: :index

    def index
      puts 'index'
      @studies = StudyAuthenticator.new(current_api_user).find_all
      puts @studies[0].keys
    end

    def show
      puts 'show'
    end

    def update
      puts 'update'
      @study_version.assign_attributes(study_params)

      if @study_version.save
        StudyUpdateNotifierJob.perform_later(current_api_user, @study_version)
        render :show, status: :ok, location: @study
      else
        render json: {errors: @study_version.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      puts 'destroy'
      if @study_version.destroy
        render :show, status: :ok, location: @study
      else
        render json: {errors: @study_version.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_share
      puts 'set_share'
      @share = Share.find_by!(study_id: params[:id], user: current_api_user)
    end

    def set_study
      puts 'set_study'
      @study = StudyAuthenticator.new(current_api_user).find_one(params[:id])
    end

    def set_study_version
      puts 'set_study_version'
      @study_version = StudyVersion.find_or_initialize_by(study_id: params[:id], site_id: @share.site_id)
    end

    def study_params
      puts 'study_params'
      params.permit(
        :topic_id, :study_icon, :name, :protocol, :agent, :mechanism, :side_effects, :administration,
        :randomization, :duration, :assessment_frequency, :interventions, :sponsor_name, :sponsor_contact,
        :cro_contact, :budget, :enrolled_or_committed, :comments, :travel_parking_costs,
        inclusion_criteria: [], exclusion_criteria: []
      )
    end
  end
end
