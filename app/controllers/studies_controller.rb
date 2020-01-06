class StudiesController < ApplicationController
  before_action :set_study, only: %i[show edit update destroy]

  def index
    @studies = Study.all.order(:name)
  end

  def show
  end

  def new
    @study = Study.new(topic: Topic.find_by(id: params[:topic_id]))
  end

  def edit
  end

  def create
    @study = Study.new(study_params)

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
    notice params
    params.require(:study).permit(
      :topic_id, :name, :study_icon, :protocol, :agent, :mechanism, :side_effects, :administration, :randomization,
      :duration, :assessment_frequency, :interventions, :sponsor_name, :sponsor_contact, :cro_contact,
      :budget, :enrolled_or_committed, :comments, :inclusion_criteria, :exclusion_criteria, :travel_parking_costs
    )
  end
end
