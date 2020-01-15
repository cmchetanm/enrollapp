class SharesController < ApplicationController
  before_action :set_share, only: %i[edit update destroy]

  def new
    puts 'new not api'
    @share = Share.new(study: Study.find(params[:study_id]))
  end

  def edit
    puts 'edit not api'
  end

  def create
    puts 'create not api'
    @share = Share.new(share_params)

    if @share.bulk_save(params[:users])
      redirect_to @share.study, notice: 'Study was successfully shared.'
    else
      render :new
    end
  end

  def update
    puts 'update not api'
    if @share.update(share_params)
      redirect_to @share.study, notice: 'Share was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    puts 'destroy not api'
    if @share.destroy
      redirect_to @share.study, notice: 'Share was successfully destroyed.'
    else
      redirect_to @share.study, alert: @site.errors.full_messages.to_sentence
    end
  end

  private

  def set_share
    puts 'set_share not api'
    @share = Share.find(params[:id])
  end

  def share_params
    puts 'share_params not api'
    params.require(:share).permit(:study_id, :site_id, :role)
  end
end
