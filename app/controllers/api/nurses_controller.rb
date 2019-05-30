module Api
  class NursesController < ApplicationController
    before_action :set_nurse, only: %i[show update destroy]

    def index
      @nurses = Nurse.all.where(owner: current_api_user).order(:full_name)
    end

    def show
    end

    def create
      @nurse = Nurse.new(nurse_params.merge(creator: current_api_user, owner: current_api_user))

      if @nurse.save
        render :show, status: :created, location: @nurse
      else
        render json: @nurse.errors, status: :unprocessable_entity
      end
    end

    def update
      if @nurse.update(nurse_params)
        render :show, status: :ok, location: @nurse
      else
        render json: @nurse.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @nurse.destroy
        head :no_content
      else
        render json: @nurse.errors, status: :unprocessable_entity
      end
    end

    private

    def set_nurse
      @nurse = Nurse.find_by!(id: params[:id], owner: current_api_user)
    end

    def nurse_params
      params.permit(:full_name, :email, :phone_number)
    end
  end
end
