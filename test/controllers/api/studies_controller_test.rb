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
      get api_topic_studies_url(@topic), headers: @auth_tokens
      assert_response :success
    end

    test 'should create study' do
      assert_difference('Criterion.count', 2) do
        assert_difference('Study.count') do
          post api_topic_studies_url(@topic), params: {
            administration: @study.administration, agent: @study.agent,
            assessment_frequency: @study.assessment_frequency, comments: @study.comments,
            contact: @study.contact, duration: @study.duration, honorarium: @study.honorarium,
            interventions: @study.interventions, mechanism: @study.mechanism, name: @study.name,
            nurse_id: @study.nurse_id, protocol: @study.protocol, randomization: @study.randomization,
            side_effects: @study.side_effects,
            inclusion_criteria: [{text: 'test'}.to_json], exclusion_criteria: [{text: 'test'}.to_json]
          }, headers: @auth_tokens
        end
      end
      assert_response :success
    end

    test 'should show study' do
      get api_study_url(@study), headers: @auth_tokens
      assert_response :success
    end

    test 'should update study' do
      assert_difference('Criterion.count') do
        patch api_study_url(@study), params: {
          administration: @study.administration, agent: @study.agent,
          assessment_frequency: @study.assessment_frequency, comments: @study.comments,
          contact: @study.contact, duration: @study.duration, honorarium: @study.honorarium,
          interventions: @study.interventions, mechanism: @study.mechanism, name: @study.name,
          nurse_id: @study.nurse_id, protocol: @study.protocol, randomization: @study.randomization,
          side_effects: @study.side_effects, topic_id: @study.topic_id,
          inclusion_criteria: [{text: 'test'}.to_json], exclusion_criteria: [{text: 'test'}.to_json]
        }, headers: @auth_tokens
      end
      assert_response :success
    end

    test 'should destroy study' do
      assert_difference('Study.count', -1) do
        delete api_study_url(@study), headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
