require 'test_helper'

module Api
  class UsersControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
    end

    test 'should set fcm token' do
      put api_auth_fcm_token_url, params: {
        client: @auth_tokens['client'], token: SecureRandom.hex
      }, headers: @auth_tokens
      assert_response :success
    end
  end
end
