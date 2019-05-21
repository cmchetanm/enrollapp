require 'test_helper'

module DeviseOverrides
  class ConfirmationsControllerTest < ActionDispatch::IntegrationTest
    test 'should get new' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'

        get url_for([:new, scope[0], :confirmation])
        assert_response :success
      end
    end

    test 'should create confirmation' do
      Devise.mappings.each do |scope|
        next if scope[1].path.include? 'auth'

        resource = scope[0].to_s.classify.constantize.all.sample
        post url_for([scope[0], :confirmation]), params: {"#{scope[0]}": {email: resource.email}}
        assert_redirected_to url_for([:new, scope[0], :session])
      end
    end
  end
end
