require 'test_helper'

module Api
  class MembersControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @study = studies(:one)
      @member = members(:one)
    end

    test 'should get index' do
      get api_members_url, headers: @auth_tokens
      assert_response :success
    end

    test 'should create member' do
      assert_difference('Member.count') do
        post api_members_url, params: {
          full_name: @member.full_name, email: @member.email, phone_number: @member.phone_number,
          role: MemberRole::PI
        }, headers: @auth_tokens
      end
      assert_response :success
    end

    test 'should update member' do
      patch api_member_url(@member), params: {
        full_name: @member.full_name, email: @member.email, phone_number: @member.phone_number,
        role: MemberRole::SUB
      }, headers: @auth_tokens
      assert_response :success
    end

    test 'should destroy member' do
      assert_difference('Member.count', -1) do
        delete api_member_url(@member), headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
