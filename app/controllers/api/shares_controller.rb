module Api
  class SharesController < ApplicationController
    before_action :set_study
    before_action :set_user, only: :create
    before_action :set_share, only: :destroy

    def create
      puts 'create api'
      puts '@study'
      puts @study
      puts '@user'
      puts @user
      site_id = @study.site_for(current_api_user)
      @share = Share.find_or_initialize_by(study_id: @study.id, user: @user)
      @share.assign_attributes(site_id: site_id, role: params[:role])
      puts '@@share'
      puts @share

      if @share.save
        puts 'save true'
        SharesMailer.notify(@share).deliver_later
        render :show, status: :created
      else
        uts 'save false'
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
        puts 'shares is array!'
        @studies = []
        params[:shares].each do |sharestring|
          puts '|sharestring|'
          puts sharestring
          puts 'sharestring.class'
          puts sharestring.class
          share = JSON.parse(sharestring)
          puts 'share'
          puts share
          puts 'share.attributes()'
          puts share.attributes()
          puts 'share.study_id'
          puts share.study_id
          study = StudyAuthenticator.new(current_api_user).find_one(share.study_id)
          puts '|study|'
          puts study
          @studies.push(study)
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
      @user = User.find_by!(id: params[:contact_id])
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
