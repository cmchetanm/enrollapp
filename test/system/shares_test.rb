require 'application_system_test_case'

class SharesTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @study = studies(:one)
    @site = sites(:one)
  end

  test 'visiting the shares index' do
    visit study_url(@study)
    assert_selector 'h3', text: @study.sites.sample.name
  end

  test 'creating a share' do
    visit study_url(@study)
    click_on 'Share Study', match: :first

    select @site.name
    select StudyRole.all.first.second
    fill_in 'Users', with: 'Jane,Stone,jane@gmail.com'
    click_on 'Create Share'

    assert_text 'Study was successfully shared.'
  end

  test 'updating a share' do
    visit study_url(@study)
    find('.button', text: 'EDIT', match: :first).click

    select @site.name
    select StudyRole.all.first.second
    click_on 'Update Share'

    assert_text 'Share was successfully updated.'
  end

  test 'destroying a share' do
    visit study_url(@study)
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'Share was successfully destroyed.'
  end
end
