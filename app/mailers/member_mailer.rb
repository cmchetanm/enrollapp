class MemberMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.member_mailer.notify.subject
  #
  def notify(member)
    @member = member

    mail to: @member.email,
         subject: @member.study.name
  end
end
