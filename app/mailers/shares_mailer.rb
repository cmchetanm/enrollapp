class SharesMailer < ApplicationMailer
  layout 'mailer'
  def notify(share)
    @share = share

    if @share.user.invitation_accepted?
      mail to: @share.user.email,
           subject: @share.study.name
    end
  end
end
