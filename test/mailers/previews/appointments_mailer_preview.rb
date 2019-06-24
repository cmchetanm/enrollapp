# Preview all emails at http://localhost:3000/rails/mailers/appointments_mailer
class AppointmentsMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/appointments_mailer/notify
  def notify
    AppointmentsMailer.notify(Appointment.all.sample)
  end
end
