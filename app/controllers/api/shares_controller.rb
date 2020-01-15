module Api
  class SharesController < ApplicationController
    before_action :set_study
    before_action :set_user, only: :create
    before_action :set_share, only: :destroy

    def create
      puts 'create api'
      site_id = @study.site_for(current_api_user)
      @share = Share.find_or_initialize_by(study_id: @study.id, user: @user)
      @share.assign_attributes(site_id: site_id, role: params[:role])

      if @share.save
        SharesMailer.notify(@share).deliver_later
        render :show, status: :created
      else
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
      @study = StudyAuthenticator.new(current_api_user).find_one(params[:study_id])
    end

    def set_user
      puts 'set_user api'
      contact = Contact.find_by!(id: params[:contact_id], creator: current_api_user)
      @user = User.from_contact(contact)
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
