require 'test_helper'

class StudiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
    @study = studies(:one)
    @user = users(:one)
  end

  test 'should get index' do
    get studies_url
    assert_response :success
  end

  test 'should get new' do
    get new_study_url
    assert_response :success
  end

  test 'should create study' do
    assert_difference('Study.count') do
      post studies_url, params: { study: {
        administration: @study.administration, agent: @study.agent,
        assessment_frequency: @study.assessment_frequency, comments: @study.comments, contact: @study.contact,
        duration: @study.duration, honorarium: @study.honorarium, interventions: @study.interventions,
        mechanism: @study.mechanism, name: @study.name, protocol: @study.protocol,
        published: @study.published, randomization: @study.randomization, side_effects: @study.side_effects,
        topic_id: @study.topic_id, owner_id: @user.id, owner_type: 'User'
      } }
    end

    assert_redirected_to study_url(Study.last)
  end

  test 'should show study' do
    get study_url(@study)
    assert_response :success
  end

  test 'should get edit' do
    get edit_study_url(@study)
    assert_response :success
  end

  test 'should update study' do
    patch study_url(@study), params: { study: {
      administration: @study.administration, agent: @study.agent, assessment_frequency: @study.assessment_frequency,
      comments: @study.comments, contact: @study.contact, duration: @study.duration, honorarium: @study.honorarium,
      interventions: @study.interventions, mechanism: @study.mechanism, name: @study.name,
      protocol: @study.protocol, published: @study.published, randomization: @study.randomization,
      side_effects: @study.side_effects, topic_id: @study.topic_id
    } }
    assert_redirected_to study_url(@study)
  end

  test 'should destroy study' do
    assert_difference('Study.count', -1) do
      delete study_url(@study)
    end

    assert_redirected_to studies_url
  end
end
