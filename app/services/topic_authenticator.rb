class TopicAuthenticator
  def initialize(user)
    @user = user
  end

  def find_all
    mine = Topic.where(owner: @user)
    shared = Topic.where(studies: Study.where(id: Member.select(:study_id).where(user: @user)))
    mine.or(shared).includes(:studies).order(:name)
  end

  def find_one(topic_id)
    Topic.find_by!(id: topic_id, owner: @user)
  end
end
