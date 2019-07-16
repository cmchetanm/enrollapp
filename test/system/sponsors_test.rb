require 'application_system_test_case'

class SponsorsTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @sponsor = sponsors(:one)
  end

  test 'visiting the index' do
    visit sponsors_url
    assert_selector 'h1', text: 'Sponsors'
  end

  test 'creating a sponsor' do
    visit sponsors_url
    click_on 'New Sponsor'

    fill_in 'Contact', with: @sponsor.contact
    fill_in 'Cro', with: @sponsor.cro
    fill_in 'Name', with: @sponsor.name
    click_on 'Create Sponsor'

    assert_text 'Sponsor was successfully created.'
  end

  test 'updating a sponsor' do
    visit sponsors_url
    find('.button', text: 'SHOW', match: :first).click
    click_on 'Edit Sponsor'

    fill_in 'Contact', with: @sponsor.contact
    fill_in 'Cro', with: @sponsor.cro
    fill_in 'Name', with: @sponsor.name
    click_on 'Update Sponsor'

    assert_text 'Sponsor was successfully updated.'
  end

  test 'destroying a sponsor' do
    visit sponsors_url
    find('.button', text: 'SHOW', match: :first).click

    page.accept_confirm do
      click_on 'Delete Sponsor', match: :first
    end

    assert_text 'Sponsor was successfully destroyed.'
  end
end
