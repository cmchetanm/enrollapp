class StudyNotifier
  def initialize(user, study)
    @user = user
    @study = study
  end

  def notify
    @study.members.each do |member|
      next unless member.user_id.present? && member.user.confirmed?

      StudiesMailer.notify(@user, @study, member.user).deliver_later
      Thread.new do
        PushNotification.new(member.user).send(
          'Study Updated',
          "#{@study.name} has been updated. Please review the study for changes."
        )
      end
    end
  end
end
