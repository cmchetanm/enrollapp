# Preview all emails at http://localhost:3000/rails/mailers/member_mailer
class MemberMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/member_mailer/notify
  def notify
    MemberMailer.notify(Member.all.sample)
  end
end
