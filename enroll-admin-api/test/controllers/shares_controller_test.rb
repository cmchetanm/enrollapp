require 'test_helper'

class SharesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
    @study = studies(:one)
    @share = shares(:one)
  end

  test 'should get new' do
    get new_share_url(study_id: @study)
    assert_response :success
  end

  test 'should create share' do
    assert_enqueued_jobs 2 do
      assert_difference('Share.count') do
        post shares_url, params: {share: {
          role: @share.role, site_id: @share.site_id, study_id: @share.study_id
        }, users: 'John,Smith,john@gmail.com,2041234567'}
      end
    end

    assert_redirected_to study_url(@study)
  end

  test 'should get edit' do
    get edit_share_url(@share)
    assert_response :success
  end

  test 'should update share' do
    patch share_url(@share), params: {share: {role: @share.role, site_id: @share.site_id}}
    assert_redirected_to study_url(@study)
  end

  test 'should destroy share' do
    assert_difference('Share.count', -1) do
      delete share_url(@share)
    end
    assert_redirected_to study_url(@study)
  end
end
