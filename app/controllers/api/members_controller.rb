module Api
  class MembersController < ApplicationController
    before_action :set_member, except: %i[index create]

    def index
      @members = Member.where(creator: current_api_user).order(:full_name)
    end

    def create
      @member = Member.new(member_params.merge(creator: current_api_user))

      if @member.save
        render :show, status: :created
      else
        render json: {errors: @member.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def update
      if @member.update(member_params)
        render :show, status: :ok
      else
        render json: {errors: @member.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      if @member.destroy
        render :show, status: :ok
      else
        render json: {errors: @member.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_member
      @member = Member.find_by!(id: params[:id])
    end

    def member_params
      params.permit(:study_id, :full_name, :email, :phone_number, :role)
    end
  end
end
