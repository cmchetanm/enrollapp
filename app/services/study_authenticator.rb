class StudyAuthenticator
  def initialize(user)
    @user = user
  end

  def find_all(topic_id)
    mine = Study.where(owner: @user)
    shared = Study.published.where(id: Member.select(:study_id).where(user: @user))
    mine.or(shared).includes(:members).where(topic_id: topic_id).order(:name)
  end

  def find_one(study_id)
    study = Study.find_by(id: study_id, owner: @user)
    study = Study.published.joins(:members).where(id: study_id, members: {user: @user}).first if study.nil?
    raise ActiveRecord::RecordNotFound if study.nil?

    study
  end
end
