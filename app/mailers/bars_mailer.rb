class BarsMailer < ActionMailer::Base
  default :from => "info@refuahsolutions.com"
  layout 'mailer'
  def welcome_email(user, password=nil, study=nil, source=:app, name=nil)
    @user = user
    @user_name = @user.last_name.present? ? "#{@user.first_name} #{@user.last_name}" : "#{@user.first_name}" 
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
