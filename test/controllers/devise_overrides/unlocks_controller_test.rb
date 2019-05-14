require 'test_helper'

module DeviseOverrides
  class UnlocksControllerTest < ActionDispatch::IntegrationTest
    test 'should get new' do
      Devise.mappings.each do |scope|
        get url_for([:new, scope[0], :unlock])
        assert_response :success
      end
    end

    test 'should create unlock' do
      Devise.mappings.each do |scope|
        resource = scope[0].to_s.classify.constantize.all.sample
        post url_for([scope[0], :unlock]), params: {"#{scope[0]}": {email: resource.email}}
        assert_redirected_to url_for([:new, scope[0], :session])
      end
    end
  end
end
