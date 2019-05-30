class NursesController < ApplicationController
  before_action :set_nurse, only: %i[show edit update destroy]

  def index
    @nurses = Nurse.all.order(:full_name)
  end

  def show
  end

  def new
    @nurse = Nurse.new
  end

  def edit
  end

  def create
    @nurse = Nurse.new(nurse_params.merge(creator: current_admin))

    if @nurse.save!
      redirect_to @nurse, notice: 'Nurse was successfully created.'
    else
      render :new
    end
  end

  def update
    if @nurse.update(nurse_params)
      redirect_to @nurse, notice: 'Nurse was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @nurse.destroy
      redirect_to nurses_url, notice: 'Nurse was successfully destroyed.'
    else
      redirect_to nurses_url, alert: @nurse.errors.full_messages.to_sentence
    end
  end

  private

  def set_nurse
    @nurse = Nurse.find(params[:id])
  end

  def nurse_params
    params.require(:nurse).permit(:full_name, :email, :phone_number, :owner_type, :owner_id)
  end
end
