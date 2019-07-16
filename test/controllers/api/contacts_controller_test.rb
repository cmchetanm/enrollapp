require 'test_helper'

module Api
  class ContactsControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @contact = contacts(:one)
    end

    test 'should get index' do
      get api_contacts_url, headers: @auth_tokens
      assert_response :success
    end

    test 'should create contact' do
      assert_difference('Contact.count') do
        post api_contacts_url, params: {
          email: @contact.email, first_name: @contact.first_name,
          last_name: @contact.last_name, phone_number: @contact.phone_number,
          user_id: @contact.user_id
        }, headers: @auth_tokens
      end
      assert_response :success
    end

    test 'should show contact' do
      get api_contact_url(@contact), headers: @auth_tokens
      assert_response :success
    end

    test 'should update contact' do
      patch api_contact_url(@contact), params: {
        email: @contact.email, first_name: @contact.first_name,
        last_name: @contact.last_name, phone_number: @contact.phone_number,
        user_id: @contact.user_id
      }, headers: @auth_tokens
      assert_response :success
    end

    test 'should destroy contact' do
      assert_difference('Contact.count', -1) do
        delete api_contact_url(@contact), headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
