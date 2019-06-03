require 'test_helper'

module Api
  class NursesControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @nurse = nurses(:one)
    end

    test 'should get index' do
      get api_nurses_url, headers: @auth_tokens
      assert_response :success
    end

    test 'should create nurse' do
      assert_difference('Nurse.count') do
        post api_nurses_url, params: {
          full_name: @nurse.full_name, email: @nurse.email, phone_number: @nurse.phone_number,
          owner_id: @user.id, owner_type: 'User'
        }, headers: @auth_tokens
      end
      assert_response :success
    end

    test 'should show nurse' do
      get api_nurse_url(@nurse), headers: @auth_tokens
      assert_response :success
    end

    test 'should update nurse' do
      patch api_nurse_url(@nurse), params: {
        full_name: @nurse.full_name, email: @nurse.email, phone_number: @nurse.phone_number
      }, headers: @auth_tokens
      assert_response :success
    end

    test 'should destroy nurse' do
      assert_difference('Nurse.count', -1) do
        delete api_nurse_url(@nurse), headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
