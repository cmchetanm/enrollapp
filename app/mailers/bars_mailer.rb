class BarsMailer < ActionMailer::Base
  default :from => "info@refuahsolutions.com"
  def welcome_email(user, password, study=nil, source=:app, name=nil)
    @user = user
    @password = password
    @source = source
    @study = study
    @name = name
    puts 'in mailer'
    puts 'user is'
    puts user
    puts 'user email'
    puts user.email
    mail to: @user.email,
         subject: "Welcome to Enroll!"
  end
end
