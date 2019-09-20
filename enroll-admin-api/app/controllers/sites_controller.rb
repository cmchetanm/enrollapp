class SitesController < ApplicationController
  before_action :set_site, only: %i[edit update destroy]

  def index
    @sites = Site.order(:name)
  end

  def new
    @site = Site.new
  end

  def edit
  end

  def create
    @site = Site.new(site_params)

    if @site.save
      redirect_to sites_url, notice: 'Site was successfully created.'
    else
      render :new
    end
  end

  def update
    if @site.update(site_params)
      redirect_to sites_url, notice: 'Site was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @site.destroy
      redirect_to sites_url, notice: 'Site was successfully destroyed.'
    else
      redirect_to sites_url, alert: @site.errors.full_messages.to_sentence
    end
  end

  private

  def set_site
    @site = Site.find(params[:id])
  end

  def site_params
    params.require(:site).permit(:name)
  end
end
