require 'application_system_test_case'

class StudiesTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @study = studies(:one)
  end

  test 'visiting the index' do
    visit studies_url
    assert_selector 'h1', text: 'Studies'
  end

  test 'creating a study' do
    visit studies_url
    click_on 'New Study'

    fill_in Study.human_attribute_name(:administration), with: @study.administration
    fill_in Study.human_attribute_name(:agent), with: @study.agent
    fill_in Study.human_attribute_name(:assessment_frequency), with: @study.assessment_frequency
    fill_in Study.human_attribute_name(:comments), with: @study.comments
    fill_in Study.human_attribute_name(:sponsor), with: @study.sponsor
    fill_in Study.human_attribute_name(:sponsor_contact), with: @study.sponsor_contact
    fill_in Study.human_attribute_name(:cro_contact), with: @study.cro_contact
    fill_in Study.human_attribute_name(:duration), with: @study.duration
    fill_in Study.human_attribute_name(:budget), with: @study.budget
    fill_in Study.human_attribute_name(:interventions), with: @study.interventions
    fill_in Study.human_attribute_name(:enrolled_or_committed), with: @study.enrolled_or_committed
    fill_in Study.human_attribute_name(:mechanism), with: @study.mechanism
    fill_in Study.human_attribute_name(:name), with: @study.name
    fill_in Study.human_attribute_name(:protocol), with: @study.protocol
    find(".switch label[for='study_published']").click
    fill_in Study.human_attribute_name(:randomization), with: @study.randomization
    fill_in Study.human_attribute_name(:side_effects), with: @study.side_effects
    select @study.topic.name, from: 'study_topic_id'
    select @study.owner.full_name, from: 'study_owner_id'
    click_on 'Create Study'

    assert_text 'Study was successfully created.'
    click_on 'Back to Studies'
  end

  test 'updating a study' do
    visit study_url(@study)
    click_on 'Edit Study', match: :first

    fill_in Study.human_attribute_name(:administration), with: @study.administration
    fill_in Study.human_attribute_name(:agent), with: @study.agent
    fill_in Study.human_attribute_name(:assessment_frequency), with: @study.assessment_frequency
    fill_in Study.human_attribute_name(:comments), with: @study.comments
    fill_in Study.human_attribute_name(:sponsor), with: @study.sponsor
    fill_in Study.human_attribute_name(:sponsor_contact), with: @study.sponsor_contact
    fill_in Study.human_attribute_name(:cro_contact), with: @study.cro_contact
    fill_in Study.human_attribute_name(:duration), with: @study.duration
    fill_in Study.human_attribute_name(:budget), with: @study.budget
    fill_in Study.human_attribute_name(:interventions), with: @study.interventions
    fill_in Study.human_attribute_name(:enrolled_or_committed), with: @study.enrolled_or_committed
    fill_in Study.human_attribute_name(:mechanism), with: @study.mechanism
    fill_in Study.human_attribute_name(:name), with: @study.name
    fill_in Study.human_attribute_name(:protocol), with: @study.protocol
    find(".switch label[for='study_published']").click
    fill_in Study.human_attribute_name(:randomization), with: @study.randomization
    fill_in Study.human_attribute_name(:side_effects), with: @study.side_effects
    select @study.topic.name, from: 'study_topic_id'
    click_on 'Update Study'

    assert_text 'Study was successfully updated.'
    click_on 'Back to Studies'
  end

  test 'destroying a study' do
    visit study_url(@study)
    page.accept_confirm do
      click_on 'Delete Study', match: :first
    end

    assert_text 'Study was successfully destroyed.'
  end
end
