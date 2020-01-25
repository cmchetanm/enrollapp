require 'test_helper'

class SharesMailerTest < ActionMailer::TestCase
  setup do
    @share = shares(:one)
  end

  test 'notify' do
    mail = SharesMailer.notify(@share)
    assert_equal @share.study.name, mail.subject
    assert_equal [@share.user.email], mail.to
    assert_equal [APP[:system_email]], mail.from
    assert_match 'have been given access', mail.body.encoded
  end
end
