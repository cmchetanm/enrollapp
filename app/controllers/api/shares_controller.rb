module Api
  class SharesController < ApplicationController
    before_action :set_study
    before_action :set_user, only: :create
    before_action :set_share, only: :destroy

    def create
      site_id = @study.site_for(current_api_user)
      @share = Share.new(site_id: site_id, study_id: @study.id, user: @user, role: params[:role])

      if @share.save
        SharesMailer.notify(@share).deliver_later
        render :show, status: :created
      else
        render json: {errors: @share.errors.full_messages.to_sentence}, status: :unprocessable_entity
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
      @study = StudyAuthenticator.new(current_api_user).find_one(params[:study_id])
    end

    def set_user
      contact = Contact.find_by!(id: params[:contact_id], creator: current_api_user)
      @user = User.from_contact(contact)
    end

    def set_share
      @share = Share.find(params[:id])
    end

    def share_params
      params.permit(:study_id, :contact_id, :role)
    end
  end
end
