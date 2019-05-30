require 'test_helper'

class NursesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
    @nurse = nurses(:one)
    @user = users(:one)
  end

  test 'should get index' do
    get nurses_url
    assert_response :success
  end

  test 'should get new' do
    get new_nurse_url
    assert_response :success
  end

  test 'should create nurse' do
    assert_difference('Nurse.count') do
      post nurses_url, params: { nurse: {
        email: @nurse.email, full_name: @nurse.full_name, phone_number: @nurse.phone_number,
        owner_id: @user.id, owner_type: 'User'
      } }
    end

    assert_redirected_to nurse_url(Nurse.last)
  end

  test 'should show nurse' do
    get nurse_url(@nurse)
    assert_response :success
  end

  test 'should get edit' do
    get edit_nurse_url(@nurse)
    assert_response :success
  end

  test 'should update nurse' do
    patch nurse_url(@nurse), params: { nurse: {
      email: @nurse.email, full_name: @nurse.full_name, phone_number: @nurse.phone_number
    } }
    assert_redirected_to nurse_url(@nurse)
  end

  test 'should destroy nurse' do
    assert_difference('Nurse.count', -1) do
      delete nurse_url(@nurse)
    end

    assert_redirected_to nurses_url
  end
end
