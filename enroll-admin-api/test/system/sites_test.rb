require 'application_system_test_case'

class SitesTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @site = sites(:one)
  end

  test 'visiting the sites index' do
    visit sites_url
    assert_selector 'h1', text: 'Sites'
  end

  test 'creating a site' do
    visit sites_url
    click_on 'New Site'

    fill_in 'Name', with: @site.name
    click_on 'Create Site'

    assert_text 'Site was successfully created.'
  end

  test 'updating a site' do
    visit sites_url
    find('.button', text: 'EDIT', match: :first).click

    fill_in 'Name', with: @site.name
    click_on 'Update Site'

    assert_text 'Site was successfully updated.'
  end

  test 'destroying a site with dependent shares' do
    visit sites_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'Cannot delete record because dependent shares exist'
  end
end
