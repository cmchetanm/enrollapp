require 'test_helper'

class StudiesMailerTest < ActionMailer::TestCase
  setup do
    @updater = users(:one)
    @study_version = study_versions(:one)
    @user = users(:two)
  end

  test 'notify' do
    mail = StudiesMailer.notify(@updater, @study_version, @user)
    assert_equal "#{@study_version.name} Updated", mail.subject
    assert_equal [@user.email], mail.to
    assert_equal [APP[:system_email]], mail.from
    assert_match 'has just been updated', mail.body.encoded
  end
end
