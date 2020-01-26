module Api
  class SharesController < ApplicationController
    before_action :set_study
    before_action :set_user, only: :create
    before_action :set_share, only: :destroy

    def create
      @shares = []
      @share = nil
      @studies.each_with_index do |study, i|
        site_id = study.site_for(current_api_user)
        share = Share.find_or_initialize_by(study_id: study.id, user: @users[i])
        share.assign_attributes(site_id: site_id, role: @roles[i])
        @shares.push(share)
        @share = share
      end

      onesuccess = false
      @shares.each do |share|
        if share.save
          onesuccess = true
          SharesMailer.notify(share).deliver_later
        end
      end
      if onesuccess
        render shares: @shares, status: :created
      else
        render json: {errors: @share.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      if @share.destroy!
        render :show, status: :ok
      else
        render json: {errors: @share.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_study
      if params[:shares].kind_of?(Array)
        @studies = []
        @roles = []
        params[:shares].each do |sharestring|
          share = JSON.parse(sharestring)
          study = StudyAuthenticator.new(current_api_user).find_one(share["study_id"])
          @studies.push(study)
          @roles.push(share["role"])
        end
      else
        @study = StudyAuthenticator.new(current_api_user).find_one(params[:study_id])
      end
    end

    def set_user
      if params[:shares].kind_of?(Array)
        @users = []
        params[:shares].each do |sharestring|
          share = JSON.parse(sharestring)
          study = User.find_by!(id: share["contact_id"])
          @users.push(study)
        end
      else
        @user = User.find_by!(id: params[:contact_id])
      end
    end

    def set_share
      @share = Share.find(params[:id])
    end

    def share_params
      params.permit(:study_id, :contact_id, :role)
    end
  end
end
