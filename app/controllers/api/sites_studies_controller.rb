module Api
  class SitesStudiesController < ApplicationController

    def update_enrolled_committed
      @sites_study = SitesStudy.find_by(site_id: params[:site_id], study_id: params[:study_id])
      if @sites_study.update(enrolled: params[:enrolled], committed: params[:committed])
        render {enrolled: @sites_study.enrolled, committed: @sites_study.committed}, status: :ok
      else
        render json: {errors: @sites_study.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end
end
