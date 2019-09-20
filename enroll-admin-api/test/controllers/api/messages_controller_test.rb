require 'test_helper'

module Api
  class MessagesControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @study = studies(:one)
      @message = messages(:one)
    end

    test 'should get index' do
      get api_messages_url(study_id: @study), headers: @auth_tokens
      assert_response :success
    end

    test 'should create message' do
      assert_difference('Message.count') do
        post api_messages_url, params: {
          study_id: @message.study_id, text: @message.text
        }, headers: @auth_tokens
      end
      assert_response :success
    end

    test 'should show message' do
      get api_message_url(@message), headers: @auth_tokens
      assert_response :success
    end

    test 'should update message' do
      patch api_message_url(@message), params: {text: @message.text}, headers: @auth_tokens
      assert_response :success
    end

    test 'should destroy message' do
      assert_difference('Message.count', -1) do
        delete api_message_url(@message), headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
