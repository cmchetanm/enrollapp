class StudiesController < ApplicationController
  before_action :set_study, only: %i[show edit update destroy]

  def index
    @studies = Study.all.order(:name)
  end

  def show
  end

  def new
    @study = Study.new
  end

  def edit
  end

  def create
    @study = Study.new(study_params.merge(creator: current_admin))

    if @study.save
      redirect_to @study, notice: 'Study was successfully created.'
    else
      render :new
    end
  end

  def update
    if @study.update(study_params)
      redirect_to @study, notice: 'Study was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @study.destroy
      redirect_to studies_url, notice: 'Study was successfully destroyed.'
    else
      redirect_to studies_url, alert: @study.errors.full_messages.to_sentence
    end
  end

  private

  def set_study
    @study = Study.find(params[:id])
  end

  def study_params
    params.require(:study).permit(:topic_id, :name, :protocol, :agent, :mechanism, :side_effects,
                                  :administration, :randomization, :duration, :assessment_frequency, :interventions,
                                  :contact, :honorarium, :comments, :published, :owner_type, :owner_id)
  end
end
