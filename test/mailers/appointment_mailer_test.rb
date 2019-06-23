require 'test_helper'

class AppointmentMailerTest < ActionMailer::TestCase
  setup do
    @appointment = appointments(:one)
  end

  test 'notify' do
    mail = AppointmentMailer.notify(@appointment)
    assert_equal @appointment.study.name, mail.subject
    assert_equal [@appointment.member.email], mail.to
    assert_equal [APP[:system_email]], mail.from
    assert_match 'has given you access', mail.body.encoded
  end
end
