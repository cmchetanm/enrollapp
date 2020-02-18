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
      update_study_version
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
    @study = Study.find params.require(:id)
  end

  def update_study_version
    study_versions = @study.study_versions
    if study_versions.present?
      study_versions.each do |study_version|
        study_version.name = @study.name
        study_version.protocol = @study.protocol
        study_version.agent = @study.agent
        study_version.mechanism = @study.mechanism
        study_version.side_effects = @study.side_effects
        study_version.administration = @study.administration
        study_version.randomization = @study.randomization
        study_version.duration = @study.duration
        study_version.assessment_frequency = @study.assessment_frequency
        study_version.interventions = @study.interventions
        study_version.sponsor_name = @study.sponsor_name
        study_version.sponsor_contact = @study.sponsor_contact
        study_version.cro_contact = @study.cro_contact
        study_version.budget = @study.budget
        study_version.comments = @study.comments
        study_version.inclusion_criteria = @study.inclusion_criteria
        study_version.exclusion_criteria = @study.exclusion_criteria
        study_version.travel_parking_costs = @study.travel_parking_costs
        study_version.sponsor_contact_email = @study.sponsor_contact_email
        study_version.sponsor_contact_phone = @study.sponsor_contact_phone
        study_version.cro_name = @study.cro_name
        study_version.cro_contact_email = @study.cro_contact_email
        study_version.cro_contact_phone = @study.cro_contact_phone
        study_version.save
      end
    end
  end

  def study_params
    params.require(:study).permit(
      :topic_id, :name, :protocol, :agent, :mechanism, :side_effects, :administration, :randomization,
      :duration, :assessment_frequency, :interventions, :sponsor_name, :sponsor_contact, :cro_contact,
      :budget, :comments, :inclusion_criteria, :exclusion_criteria, :travel_parking_costs,
      :sponsor_contact_email, :sponsor_contact_phone, :cro_name, :cro_contact_email, :cro_contact_phone
    )
  end
end
