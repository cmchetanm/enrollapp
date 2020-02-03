class ApplicationMailer < ActionMailer::Base
  default from: "#{APP[:website_name]} <#{APP[:system_email]}>"
  layout 'mailer'
  def notify(user, password)
    puts 'in mailer'
    puts 'user is'
    puts user
    puts 'user email'
    puts user.email
    mail to: user.email,
         subject: password
  end
end
