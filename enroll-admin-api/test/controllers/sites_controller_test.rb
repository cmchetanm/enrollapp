require 'test_helper'

class SitesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
    @site = sites(:one)
  end

  test 'should get index' do
    get sites_url
    assert_response :success
  end

  test 'should get new' do
    get new_site_url
    assert_response :success
  end

  test 'should create site' do
    assert_difference('Site.count') do
      post sites_url, params: { site: { name: @site.name } }
    end
    assert_redirected_to sites_url
  end

  test 'should get edit' do
    get edit_site_url(@site)
    assert_response :success
  end

  test 'should update site' do
    patch site_url(@site), params: { site: { name: @site.name } }
    assert_redirected_to sites_url
  end

  test 'should not destroy site with dependencies' do
    assert_difference('Site.count', 0) do
      delete site_url(@site)
    end
    assert_redirected_to sites_url
  end

  test 'should destroy site without dependencies' do
    assert_difference('Site.count', -1) do
      delete site_url(sites(:three))
    end
    assert_redirected_to sites_url
  end
end
