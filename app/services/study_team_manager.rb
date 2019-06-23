module StudyTeamManager
  def self.link_studies(user)
    Member.where(email: user.email).update_all(user_id: user.id)
  end
end
