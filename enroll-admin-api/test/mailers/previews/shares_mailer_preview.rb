# Preview all emails at http://localhost:3000/rails/mailers/shares_mailer
class SharesMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/shares_mailer/notify
  def notify
    SharesMailer.notify(Share.all.sample)
  end
end
