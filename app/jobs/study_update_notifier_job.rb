class StudyUpdateNotifierJob < ApplicationJob
  queue_as :default

  def perform(updater, study_version)
    users = User.where(id: Share.where(site_id: study_version.site_id).where.not(user_id: updater.id).pluck(:user_id))
    users.each do |user|
      #if user.invitation_accepted?
        send_email_notification(updater, study_version, user)
        # send_push_notification(study_version, user)
      #end
    end
  end

  private

  def send_email_notification(updater, study_version, user)
    StudiesMailer.notify(updater, study_version, user).deliver_now
  end

  def send_push_notification(study_version, user)
    PushNotification.new(user).send(
      'Study Updated',
      "#{study_version.name} has been updated. Please review the study for changes."
    )
  end
end
