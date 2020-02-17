require 'test_helper'

module Api
  class TopicsControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @topic = topics(:one)
    end

    test 'should get index' do
      get api_topics_url, headers: @auth_tokens
      assert_response :success
    end
  end
end
