class AppointmentMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.appointment_mailer.notify.subject
  #
  def notify(appointment)
    @appointment = appointment

    mail to: @appointment.member.email,
         subject: @appointment.study.name
  end
end
