require 'application_system_test_case'

class TopicsTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @topic = topics(:one)
  end

  test 'visiting the index' do
    visit topics_url
    assert_selector 'h1', text: 'Topics'
  end

  test 'creating a topic' do
    visit topics_url
    click_on 'New Topic'

    fill_in 'Name', with: @topic.name
    select @topic.owner.full_name
    click_on 'Create Topic'

    assert_text 'Topic was successfully created.'
    click_on 'Back'
  end

  test 'updating a topic' do
    visit topic_url(@topic)
    click_on 'Edit Topic', match: :first

    fill_in 'Name', with: @topic.name
    click_on 'Update Topic'

    assert_text 'Topic was successfully updated.'
    click_on 'Back to Topics'
  end

  test 'destroying a topic' do
    visit topic_url(@topic)
    page.accept_confirm do
      click_on 'Delete Topic', match: :first
    end

    assert_text 'Topic was successfully destroyed.'
  end
end
