class StudyAuthenticator
  def initialize(user)
    @user = user
  end

  def find_all(topic_id)
    members = Member.where(user: @user)
    appointments = Appointment.select(:study_id).where(member: members)
    mine = Study.where(owner: @user)
    shared = Study.published.where(id: appointments)
    mine.or(shared).where(topic_id: topic_id).order(:name)
  end

  def find_one(study_id)
    members = Member.where(user: @user)
    appointments = Appointment.select(:study_id).where(study_id: study_id, member: members)
    study = Study.find_by(id: study_id, owner: @user)
    study = Study.published.where(id: appointments).first if study.nil?
    raise ActiveRecord::RecordNotFound if study.nil?

    study
  end
end
