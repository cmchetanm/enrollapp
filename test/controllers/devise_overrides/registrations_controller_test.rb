require 'test_helper'

module DeviseOverrides
  class RegistrationsControllerTest < ActionDispatch::IntegrationTest
    test 'should get new for first resource' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'
        next if scope[0].to_s.classify.constantize.new.respond_to?(:tokens?)

        scope[0].to_s.classify.constantize.destroy_all
        get url_for([:new, scope[0], :registration])
        assert_response :success
      end
    end

    test 'should not get new for subsequent resources' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'
        next if scope[0].to_s.classify.constantize.new.respond_to?(:tokens?)

        get url_for([:new, scope[0], :registration])
        assert_redirected_to url_for([:new, scope[0], :session])
      end
    end

    test 'should create first resource' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'
        next if scope[0].to_s.classify.constantize.new.respond_to?(:tokens?)

        scope[0].to_s.classify.constantize.destroy_all

        assert_difference('scope[0].to_s.classify.constantize.count') do
          post url_for([scope[0], :registration]), params: {"#{scope[0]}": {
            first_name: 'Test', last_name: 'Test', email: 'new@example.com',
            password: 'NewC0mPl3xPassw0rd!', password_confirmation: 'NewC0mPl3xPassw0rd!'
          }}
        end
      end
      assert_redirected_to root_url
    end

    test 'should not create subsequent resources' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'
        next if scope[0].to_s.classify.constantize.new.respond_to?(:tokens?)

        post url_for([scope[0], :registration]), params: {"#{scope[0]}": {
          email: 'new@example.com', password: 'NewC0mPl3xPassw0rd!', password_confirmation: 'NewC0mPl3xPassw0rd!'
        }}
        assert_redirected_to url_for([:new, scope[0], :session])
      end
    end

    test 'should get edit' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'
        next if scope[0].to_s.classify.constantize.new.respond_to?(:tokens?)

        resource = scope[0].to_s.classify.constantize.all.sample
        sign_in resource
        get url_for([:edit, scope[0], :registration])
        assert_response :success
      end
    end

    test 'should update resource' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'
        next if scope[0].to_s.classify.constantize.new.respond_to?(:tokens?)

        resource = scope[0].to_s.classify.constantize.all.sample
        sign_in resource

        user_params = {
          current_password: 'MyC0mPl3xPassw0rd!', email: 'new@example.com',
          password: 'NewC0mPl3xPassw0rd!', password_confirmation: 'NewC0mPl3xPassw0rd!'
        }
        patch url_for([scope[0], :registration]), params: {"#{scope[0]}": user_params}
        assert_redirected_to root_url
      end
    end
  end
end
