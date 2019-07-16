require 'application_system_test_case'

class StudiesTest < ApplicationSystemTestCase
  setup do
    sign_in admins(:one)
    @sponsor = sponsors(:one)
    @study = studies(:one)
  end

  test 'visiting the studies index' do
    visit studies_url
    assert_selector 'h1', text: 'Studies'
  end

  test 'creating a study' do
    visit sponsor_url(@sponsor)
    click_on 'Create Study', match: :first

    fill_in Study.human_attribute_name(:name), with: @study.name
    fill_in Study.human_attribute_name(:inclusion_criteria), with: 'test'
    fill_in Study.human_attribute_name(:exclusion_criteria), with: 'test'
    fill_in Study.human_attribute_name(:administration), with: @study.administration
    fill_in Study.human_attribute_name(:agent), with: @study.agent
    fill_in Study.human_attribute_name(:assessment_frequency), with: @study.assessment_frequency
    fill_in Study.human_attribute_name(:comments), with: @study.comments
    fill_in Study.human_attribute_name(:sponsor_name), with: @study.sponsor_name
    fill_in Study.human_attribute_name(:sponsor_contact), with: @study.sponsor_contact
    fill_in Study.human_attribute_name(:cro_contact), with: @study.cro_contact
    fill_in Study.human_attribute_name(:duration), with: @study.duration
    fill_in Study.human_attribute_name(:budget), with: @study.budget
    fill_in Study.human_attribute_name(:interventions), with: @study.interventions
    fill_in Study.human_attribute_name(:enrolled_or_committed), with: @study.enrolled_or_committed
    fill_in Study.human_attribute_name(:mechanism), with: @study.mechanism
    fill_in Study.human_attribute_name(:name), with: @study.name
    fill_in Study.human_attribute_name(:protocol), with: @study.protocol
    fill_in Study.human_attribute_name(:randomization), with: @study.randomization
    fill_in Study.human_attribute_name(:side_effects), with: @study.side_effects
    click_on 'Create Study'

    assert_text 'Study was successfully created.'
  end

  test 'updating a study' do
    visit sponsor_url(@sponsor)
    click_on 'Show', match: :first
    click_on 'Edit Study'

    fill_in Study.human_attribute_name(:name), with: @study.name
    fill_in Study.human_attribute_name(:inclusion_criteria), with: 'test'
    fill_in Study.human_attribute_name(:exclusion_criteria), with: 'test'
    fill_in Study.human_attribute_name(:administration), with: @study.administration
    fill_in Study.human_attribute_name(:agent), with: @study.agent
    fill_in Study.human_attribute_name(:assessment_frequency), with: @study.assessment_frequency
    fill_in Study.human_attribute_name(:comments), with: @study.comments
    fill_in Study.human_attribute_name(:sponsor_name), with: @study.sponsor_name
    fill_in Study.human_attribute_name(:sponsor_contact), with: @study.sponsor_contact
    fill_in Study.human_attribute_name(:cro_contact), with: @study.cro_contact
    fill_in Study.human_attribute_name(:duration), with: @study.duration
    fill_in Study.human_attribute_name(:budget), with: @study.budget
    fill_in Study.human_attribute_name(:interventions), with: @study.interventions
    fill_in Study.human_attribute_name(:enrolled_or_committed), with: @study.enrolled_or_committed
    fill_in Study.human_attribute_name(:mechanism), with: @study.mechanism
    fill_in Study.human_attribute_name(:name), with: @study.name
    fill_in Study.human_attribute_name(:protocol), with: @study.protocol
    fill_in Study.human_attribute_name(:randomization), with: @study.randomization
    fill_in Study.human_attribute_name(:side_effects), with: @study.side_effects
    click_on 'Update Study'

    assert_text 'Study was successfully updated.'
  end

  test 'destroying a study' do
    visit sponsor_url(@sponsor)
    click_on 'Show', match: :first

    page.accept_confirm do
      click_on 'Delete Study', match: :first
    end

    assert_text 'Study was successfully destroyed.'
  end
end
