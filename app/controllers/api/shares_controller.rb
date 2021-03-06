module Api
  class SharesController < ApplicationController
    before_action :set_study
    before_action :set_user, only: :create
    before_action :set_share, only: :destroy

    def create
      puts 'api shares controller create'
      @shares = []
      @share = nil
      @studies.each_with_index do |study, i|
        site_id = study.site_for(current_api_user)
        share = Share.find_or_initialize_by(study_id: study.id, user: @users[i])
        share.assign_attributes(site_id: site_id, role: @roles[i])
        @shares.push(share)
        @share = share
      end
      @sharesToSend = []

      @shares.each do |share|
        if share.save
          @sharesToSend.push(share)
          SharesMailer.notify(share).deliver_later
        end
      end
      if @sharesToSend.length > 0
        render json: {shares: @sharesToSend}, status: :created
      else
        render json: {errors: @share.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      puts 'api shares controller destory'
      if @share.destroy!
        render :show, status: :ok
      else
        render json: {errors: @share.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_study
      puts 'api shares controller set_study'
      @studies = []
      @roles = []
      if params[:shares].kind_of?(Array)
        params[:shares].each do |sharestring|
          share = JSON.parse(sharestring)
          study = StudyAuthenticator.new(current_api_user).find_one(share["study_id"])
          @studies.push(study)
          @roles.push(share["role"])
        end
      elsif params[:shares].present?
        @study = StudyAuthenticator.new(current_api_user).find_one(params[:study_id])
        @studies.push(@study)
        share = JSON.parse(params[:shares])
        @roles.push(share["role"])
      end
    end

    def set_user
      puts 'api shares controller set_user'
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
      puts 'api shares controller set_share'
      @share = Share.find(params[:id])
    end

    def share_params
      params.permit(:study_id, :contact_id, :role)
    end
  end
end
