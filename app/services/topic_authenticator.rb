class TopicAuthenticator
  def initialize(user)
    @user = user
  end

  def find_all
    members = Member.where(user: @user)
    appointments = Appointment.select(:study_id).where(member: members)
    studies = Study.published.where(id: appointments)
    mine = Topic.where(owner: @user)
    shared = Topic.where(studies: studies)
    mine.or(shared).includes(:studies).order(:name)
  end

  def find_one(topic_id)
    Topic.find_by!(id: topic_id, owner: @user)
  end
end
