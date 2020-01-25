require 'test_helper'

class AdminsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
    @admin = admins(:two)
  end

  test 'should get index' do
    get admins_url
    assert_response :success
  end

  test 'should resend invitation' do
    assert_enqueued_jobs 1 do
      post resend_invitation_admin_url(@admin)
    end
    assert_redirected_to admins_url
  end

  test 'should destroy admin' do
    assert_difference('Admin.count', -1) do
      delete admin_url(@admin)
    end

    assert_redirected_to admins_url
  end
end
