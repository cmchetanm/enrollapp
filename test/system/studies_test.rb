require 'application_system_test_case'

class StudiesTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @study = studies(:one)
  end

  test 'visiting the index' do
    visit studies_url
    assert_selector 'h1', text: 'Listing studies'
  end

  test 'creating a study' do
    visit studies_url
    click_on 'New Study'

    fill_in 'Administration', with: @study.administration
    fill_in 'Agent', with: @study.agent
    fill_in 'Assessment frequency', with: @study.assessment_frequency
    fill_in 'Comments', with: @study.comments
    fill_in 'Contact', with: @study.contact
    fill_in 'Duration', with: @study.duration
    fill_in 'Honorarium', with: @study.honorarium
    fill_in 'Interventions', with: @study.interventions
    fill_in 'Mechanism', with: @study.mechanism
    fill_in 'Name', with: @study.name
    select @study.nurse.full_name, from: 'study_nurse_id'
    fill_in 'Protocol', with: @study.protocol
    check 'Published'
    fill_in 'Randomization', with: @study.randomization
    fill_in 'Side effects', with: @study.side_effects
    select @study.topic.name, from: 'study_topic_id'
    select @study.owner.full_name, from: 'study_owner_id'
    click_on 'Create Study'

    assert_text 'Study was successfully created.'
    click_on 'Back'
  end

  test 'updating a study' do
    visit studies_url
    click_on 'Edit', match: :first

    fill_in 'Administration', with: @study.administration
    fill_in 'Agent', with: @study.agent
    fill_in 'Assessment frequency', with: @study.assessment_frequency
    fill_in 'Comments', with: @study.comments
    fill_in 'Contact', with: @study.contact
    fill_in 'Duration', with: @study.duration
    fill_in 'Honorarium', with: @study.honorarium
    fill_in 'Interventions', with: @study.interventions
    fill_in 'Mechanism', with: @study.mechanism
    fill_in 'Name', with: @study.name
    select @study.nurse.full_name, from: 'study_nurse_id'
    fill_in 'Protocol', with: @study.protocol
    check 'Published' if @study.published
    fill_in 'Randomization', with: @study.randomization
    fill_in 'Side effects', with: @study.side_effects
    select @study.topic.name, from: 'study_topic_id'
    click_on 'Update Study'

    assert_text 'Study was successfully updated.'
    click_on 'Back'
  end

  test 'destroying a study' do
    visit studies_url
    page.accept_confirm do
      click_on 'Destroy', match: :first
    end

    assert_text 'Study was successfully destroyed.'
  end
end
