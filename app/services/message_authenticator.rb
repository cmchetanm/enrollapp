class MessageAuthenticator
  def initialize(user)
    @user = user
  end

  def find_all(share)
    Message.where(site_id: share.site_id, study_id: share.study_id).order(created_at: :desc)
  end
end
