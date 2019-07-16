require 'application_system_test_case'

class UsersTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @user = users(:one)
  end

  test 'visiting the users index' do
    visit users_url
    assert_selector 'h1', text: 'Users'
  end

  test 'destroying a user' do
    visit users_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'User was successfully destroyed.'
  end
end
