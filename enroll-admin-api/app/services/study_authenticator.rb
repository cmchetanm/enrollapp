class StudyAuthenticator
  def initialize(user)
    @user = user
  end

  def find_all
    Study.where(id: Share.select(:study_id).where(user: @user)).order(:name)
  end

  def find_one(study_id)
    Study.find(Share.find_by(user: @user, study_id: study_id).study_id)
  end
end
