class AppointmentsMailer < ApplicationMailer
  def notify(appointment)
    @appointment = appointment

    mail to: @appointment.member.email,
         subject: @appointment.study.name
  end
end
