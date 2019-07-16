require 'test_helper'

module Api
  class SharesControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @study = studies(:one)
      @share = shares(:one)
      @contact = contacts(:two)
    end

    test 'should create share' do
      assert_enqueued_jobs 2 do
        assert_difference('Share.count', 1) do
          post api_shares_url, params: {
            study_id: @study.id, contact_id: @contact.id, role: StudyRole.constants.sample
          }, headers: @auth_tokens
        end
      end
      assert_response :success
    end

    test 'should destroy share' do
      assert_difference('Share.count', -1) do
        delete api_share_url(@share), params: {study_id: @study.id}, headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
