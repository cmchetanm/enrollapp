require 'application_system_test_case'

class SitesTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @admin = admins(:two)
  end

  test 'visiting the admins index' do
    visit admins_url
    assert_selector 'h1', text: 'Admins'
  end

  test 'creating an admin and resending an invitation' do
    visit admins_url
    click_on 'New Admin'

    fill_in 'First name', with: @admin.first_name
    fill_in 'Last name', with: @admin.last_name
    fill_in 'Email', with: 'test@example.com'
    click_on 'Send an invitation'

    assert_text 'An invitation email has been sent to test@example.com.'

    click_on 'Resend Invitation'

    assert_text 'An invitation email has been sent to test@example.com.'
  end

  test 'destroying an admin' do
    visit admins_url
    page.accept_confirm do
      find('tr', text: @admin.full_name).click_link('Delete')
    end

    assert_text 'Admin was successfully destroyed.'
  end
end
