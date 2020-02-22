class StudiesMailer < ApplicationMailer
  layout 'mailer'
  def notify(updater, study_version, user)
    @updater = updater
    @study = study_version
    @user = user
    
    #if user.invitation_accepted?
      mail to: user.email,
           subject: "#{@study.name} Updated"
    #end
  end
end
