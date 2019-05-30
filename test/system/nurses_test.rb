require 'application_system_test_case'

class NursesTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @nurse = nurses(:one)
  end

  test 'visiting the index' do
    visit nurses_url
    assert_selector 'h1', text: 'Listing nurses'
  end

  test 'creating a nurse' do
    visit nurses_url
    click_on 'New Nurse'

    fill_in 'Email', with: @nurse.email
    fill_in 'Full name', with: @nurse.full_name
    fill_in 'Phone number', with: @nurse.phone_number
    select @nurse.owner.full_name
    click_on 'Create Nurse'

    assert_text 'Nurse was successfully created'
    click_on 'Back'
  end

  test 'updating a nurse' do
    visit nurses_url
    click_on 'Edit', match: :first

    fill_in 'Email', with: @nurse.email
    fill_in 'Full name', with: @nurse.full_name
    fill_in 'Phone number', with: @nurse.phone_number
    click_on 'Update Nurse'

    assert_text 'Nurse was successfully updated'
    click_on 'Back'
  end

  test 'destroying a nurse' do
    visit nurses_url
    page.accept_confirm do
      click_on 'Destroy', match: :first
    end

    assert_text 'Nurse was successfully destroyed'
  end
end
