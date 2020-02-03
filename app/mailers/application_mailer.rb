class ApplicationMailer < ActionMailer::Base
  default from: "#{APP[:website_name]} <#{APP[:system_email]}>"
  layout 'mailer'
end
