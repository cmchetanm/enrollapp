class TopicAuthenticator
  def initialize(user)
    @user = user
  end

  def find_all
    Topic.where(studies: Study.where(id: Share.select(:study_id).where(user: @user)))
         .includes(:studies).order(:name)
  end
end
