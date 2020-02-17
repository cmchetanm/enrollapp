class SponsorsController < ApplicationController
  before_action :set_sponsor, only: %i[show edit update destroy]

  def index
    @sponsors = Sponsor.order(:name)
  end

  def show
  end

  def new
    @sponsor = Sponsor.new
  end

  def edit
  end

  def create
    @sponsor = Sponsor.new(sponsor_params)

    if @sponsor.save
      redirect_to @sponsor, notice: 'Sponsor was successfully created.'
    else
      render :new
    end
  end

  def update
    if @sponsor.update(sponsor_params)
      redirect_to @sponsor, notice: 'Sponsor was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @sponsor.destroy
      redirect_to sponsors_url, notice: 'Sponsor was successfully destroyed.'
    else
      redirect_to sponsors_url, alert: @sponsor.errors.full_messages.to_sentence
    end
  end

  private

  def set_sponsor
    @sponsor = Sponsor.find(params[:id])
  end

  def sponsor_params
    params.require(:sponsor).permit(:name, :contact, :cro)
  end
end
