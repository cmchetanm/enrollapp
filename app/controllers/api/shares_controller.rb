module Api
  class SharesController < ApplicationController
    before_action :set_study
    before_action :set_user, only: :create
    before_action :set_share, only: :destroy

    def create
      puts 'create api'
      puts '@studies'
      puts @studies
      puts '@users'
      puts @users
      @shares = []
      @share = nil
      @studies.each_with_index do |study, i|
        site_id = study.site_for(current_api_user)
        share = Share.find_or_initialize_by(study_id: study.id, user: @users[i])
        share.assign_attributes(site_id: site_id, role: @roles[i])
        puts 'share'
        puts share
        @shares.push(share)
        @share = share
      end

      onesuccess = false
      @shares.each do |share|
        if share.save
          puts 'save true'
          onesuccess = true
          SharesMailer.notify(share).deliver_later
        end
      end
      if onesuccess
        puts 'Success!!'
        render :show, status: :created
      else
        puts 'Fail!!'
        render json: {errors: @share.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      puts 'destroy api'
      if @share.destroy!
        render :show, status: :ok
      else
        render json: {errors: @share.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_study
      puts 'set_study api'
      puts params
      if params[:shares].kind_of?(Array)
        @studies = []
        @roles = []
        params[:shares].each do |sharestring|
          share = JSON.parse(sharestring)
          study = StudyAuthenticator.new(current_api_user).find_one(share["study_id"])
          @studies.push(study)
          @roles.push(share["role"])
        end
        puts 'end studies'
        puts @studies
      else
        puts 'not array shares yo'
        @study = StudyAuthenticator.new(current_api_user).find_one(params[:study_id])
      end
    end

    def set_user
      puts 'set_user api'
      if params[:shares].kind_of?(Array)
        @users = []
        params[:shares].each do |sharestring|
          share = JSON.parse(sharestring)
          study = User.find_by!(id: share["contact_id"])
          @users.push(study)
        end
        puts 'end users'
        puts @users
      else
        puts 'not array shares yo'
        @user = User.find_by!(id: params[:contact_id])
      end
    end

    def set_share
      puts 'set_share api'
      @share = Share.find(params[:id])
    end

    def share_params
      puts 'share_params api'
      params.permit(:study_id, :contact_id, :role)
    end
  end
end
