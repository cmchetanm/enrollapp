require 'test_helper'

module DeviseOverrides
  class PasswordsControllerTest < ActionDispatch::IntegrationTest
    test 'should get new' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'

        get url_for([:new, scope[0], :password])
        assert_response :success
      end
    end

    test 'should create password reset token' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'

        resource_class = scope[0].to_s.classify.constantize
        resource = resource_class.all.sample
        post url_for([scope[0], :password]), params: {"#{scope[0]}": {email: resource.email}}
        assert_not_nil resource_class.find(resource.id).reset_password_token
        assert_redirected_to url_for([:new, scope[0], :session])
      end
    end

    test 'should get edit' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'

        get url_for([:edit, scope[0], :password, reset_password_token: 'token'])
        assert_response :success
      end
    end

    test 'should update password' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'

        resource_class = scope[0].to_s.classify.constantize
        resource = resource_class.all.sample
        patch url_for([scope[0], :password]), params: {"#{scope[0]}": {
          reset_password_token: resource.send_reset_password_instructions,
          password: 'NewC0mPl3xPassw0rd!', password_confirmation: 'NewC0mPl3xPassw0rd!'
        }}
        assert_not_equal resource.encrypted_password, resource_class.find(resource.id).encrypted_password
        assert_redirected_to root_url
      end
    end
  end
end
