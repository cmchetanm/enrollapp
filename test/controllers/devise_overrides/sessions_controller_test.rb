require 'test_helper'

module DeviseOverrides
  class SessionsControllerTest < ActionDispatch::IntegrationTest
    test 'should get new' do
      Devise.mappings.each do |scope|
        get url_for([:new, scope[0], :session])
        assert_response :success
      end
    end

    test 'should create session' do
      Devise.mappings.each do |scope|
        resource = scope[0].to_s.classify.constantize.all.sample
        post url_for([scope[0], :session]), params: {"#{scope[0]}": {
          email: resource.email, password: 'MyC0mPl3xPassw0rd!'
        }}
      end
      assert_redirected_to root_url
    end

    test 'should destroy session' do
      Devise.mappings.each do |scope|
        resource = scope[0].to_s.classify.constantize.all.sample
        sign_in resource
        delete url_for([:destroy, scope[0], :session])
        assert_redirected_to root_url
      end
    end
  end
end
