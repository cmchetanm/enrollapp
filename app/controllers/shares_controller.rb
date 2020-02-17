class SharesController < ApplicationController
  before_action :set_share, only: %i[edit update destroy]

  def new
    puts 'shares controller new'
    @share = Share.new(study: Study.find(params[:study_id]))
  end

  def edit
    puts 'shares controller edit'
  end

  def create
    puts 'shares controller create'
    @share = Share.new(share_params)

    if @share.bulk_save(params[:users], (current_admin&.full_name || current_sponsor&.name))
      redirect_to @share.study, notice: 'Study was successfully shared.'
    else
      render :new
    end
  end

  def update
    puts 'shares controller update'
    if @share.update(share_params)
      redirect_to @share.study, notice: 'Share was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @share.destroy
      redirect_to @share.study, notice: 'Share was successfully destroyed.'
    else
      redirect_to @share.study, alert: @site.errors.full_messages.to_sentence
    end
  end

  private

  def set_share
    puts 'shares controller set_share'
    puts params[:id]
    @share = Share.find(params[:id])
  end

  def share_params
    params.require(:share).permit(:study_id, :site_id, :role)
  end
end
