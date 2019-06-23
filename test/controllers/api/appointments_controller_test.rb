require 'test_helper'

module Api
  class AppointmentsControllerTest < ActionDispatch::IntegrationTest
    include AuthorizationHelper

    setup do
      @user = users(:one)
      @auth_tokens = auth_tokens_for_user(@user)
      @study = studies(:one)
      @member = members(:one)
    end

    test 'should update appointments' do
      @study.appointments.delete_all
      assert_enqueued_jobs 1 do
        assert_difference('Appointment.count', 1) do
          patch api_appointments_url, params: {
            study_id: @study.id, member_ids: Member.where(creator: @user).pluck(:id)
          }, headers: @auth_tokens
        end
      end
      assert_response :success
    end

    test 'should destroy appointment' do
      assert_difference('Appointment.count', -1) do
        delete api_appointments_url, params: {
          study_id: @study.id, member_id: @member.id
        }, headers: @auth_tokens
      end
      assert_response :success
    end
  end
end
