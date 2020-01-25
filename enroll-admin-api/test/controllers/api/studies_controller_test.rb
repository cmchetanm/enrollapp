require 'test_helper'

module Api
  class StudiesControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @study = studies(:one)
      @topic = topics(:one)
    end

    test 'should get index' do
      get api_studies_url, params: {topic_id: @topic.id}, headers: @auth_tokens
      assert_response :success
    end

    test 'should show study' do
      get api_study_url(@study), headers: @auth_tokens
      assert_response :success
    end

    test 'should update study' do
      assert_enqueued_with(job: StudyUpdateNotifierJob) do
        patch api_study_url(@study), params: {
          administration: @study.administration, agent: @study.agent,
          assessment_frequency: @study.assessment_frequency, comments: @study.comments,
          sponsor: @study.sponsor, sponsor_contact: @study.sponsor_contact, duration: @study.duration,
          budget: @study.budget, enrolled_or_committed: @study.enrolled_or_committed,
          interventions: @study.interventions, travel_parking_costs: @study.travel_parking_costs,
          mechanism: @study.mechanism, name: @study.name,
          protocol: @study.protocol, randomization: @study.randomization, cro_contact: @study.cro_contact,
          side_effects: @study.side_effects,
          inclusion_criteria: ['test'], exclusion_criteria: ['test']
        }, headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
