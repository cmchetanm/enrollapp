require 'test_helper'

class MemberMailerTest < ActionMailer::TestCase
  setup do
    @member = members(:one)
  end

  test 'notify' do
    mail = MemberMailer.notify(@member)
    assert_equal @member.study.name, mail.subject
    assert_equal [@member.email], mail.to
    assert_equal [APP[:system_email]], mail.from
    assert_match 'has given you access', mail.body.encoded
  end
end
