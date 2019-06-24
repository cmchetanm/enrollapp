require 'test_helper'

class StudiesMailerTest < ActionMailer::TestCase
  setup do
    @updater = users(:one)
    @study = studies(:one)
    @user = users(:two)
  end

  test 'notify' do
    mail = StudiesMailer.notify(@updater, @study, @user)
    assert_equal "#{@study.name} Updated", mail.subject
    assert_equal [@user.email], mail.to
    assert_equal [APP[:system_email]], mail.from
    assert_match 'has just been updated', mail.body.encoded
  end
end
