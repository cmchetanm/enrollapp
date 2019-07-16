# Preview all emails at http://localhost:3000/rails/mailers/studies_mailer
class StudiesMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/studies_mailer/notify
  def notify
    StudiesMailer.notify(User.all.sample, StudyVersion.all.sample, User.first)
  end
end
