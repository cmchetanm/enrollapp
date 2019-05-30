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

    test 'should create topic' do
      assert_difference('Topic.count') do
        post api_topics_url, params: {name: @topic.name, owner_id: @user.id, owner_type: 'User'},
                             headers: @auth_tokens
      end
      assert_response :success
    end

    test 'should show topic' do
      get api_topic_url(@topic), headers: @auth_tokens
      assert_response :success
    end

    test 'should update topic' do
      patch api_topic_url(@topic), params: {name: @topic.name}, headers: @auth_tokens
      assert_response :success
    end

    test 'should destroy topic' do
      assert_difference('Topic.count', -1) do
        delete api_topic_url(@topic), headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
