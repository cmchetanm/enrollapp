require 'application_system_test_case'

class TopicsTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @sponsor = sponsors(:one)
    @topic = topics(:one)
  end

  test 'updating a topic' do
    visit sponsor_url(@sponsor)
    find('.button', text: 'EDIT', match: :first).click

    fill_in 'Name', with: @topic.name
    click_on 'Update Topic'

    assert_text 'Topic was successfully updated.'
  end

  test 'destroying a topic' do
    visit sponsor_url(@sponsor)
    page.accept_confirm do
      find('.button', text: 'DELETE', match: :first).click
    end

    assert_text 'Topic was successfully destroyed.'
  end
end
