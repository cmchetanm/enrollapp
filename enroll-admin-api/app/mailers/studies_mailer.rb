class StudiesMailer < ApplicationMailer
  def notify(updater, study_version, user)
    @updater = updater
    @study = study_version

    if user.invitation_accepted?
      mail to: user.email,
           subject: "#{@study.name} Updated"
    end
  end
end
