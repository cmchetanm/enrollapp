require 'test_helper'

class SponsorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
    @sponsor = sponsors(:one)
  end

  test 'should get index' do
    get sponsors_url
    assert_response :success
  end

  test 'should get new' do
    get new_sponsor_url
    assert_response :success
  end

  test 'should create sponsor' do
    assert_difference('Sponsor.count') do
      post sponsors_url, params: { sponsor: {
        contact: @sponsor.contact, cro: @sponsor.cro, name: @sponsor.name
      } }
    end

    assert_redirected_to sponsor_url(Sponsor.order(:created_at).last)
  end

  test 'should show sponsor' do
    get sponsor_url(@sponsor)
    assert_response :success
  end

  test 'should get edit' do
    get edit_sponsor_url(@sponsor)
    assert_response :success
  end

  test 'should update sponsor' do
    patch sponsor_url(@sponsor), params: { sponsor: {
      contact: @sponsor.contact, cro: @sponsor.cro, name: @sponsor.name
    } }
    assert_redirected_to sponsor_url(@sponsor)
  end

  test 'should destroy sponsor' do
    assert_difference('Sponsor.count', -1) do
      delete sponsor_url(@sponsor)
    end

    assert_redirected_to sponsors_url
  end
end
