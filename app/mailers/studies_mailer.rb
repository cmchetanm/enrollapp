class StudiesMailer < ApplicationMailer
  def notify(updater, study, user)
    @updater = updater
    @study = study

    mail to: user.email,
         subject: "#{@study.name} Updated"
  end
end
