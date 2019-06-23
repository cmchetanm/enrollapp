module Api
  class AppointmentsController < ApplicationController
    before_action :set_study, only: :update
    before_action :set_appointment, only: :destroy

    def update
      assigned_member_ids = find_existing_members
      chosen_member_ids = find_chosen_members
      delete_appointments(assigned_member_ids - chosen_member_ids)
      new_appointments = assign_appointments(chosen_member_ids - assigned_member_ids)

      if @study.save
        email_new_members(new_appointments)
        @members = @study.members
        render template: 'api/members/index', status: :ok
      else
        render json: {errors: @study.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      if @appointment.destroy
        render @appointment.member, status: :ok
      else
        render json: {errors: @appointment.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_study
      @study = StudyAuthenticator.new(current_api_user).find_one(params[:study_id])
    end

    def set_appointment
      @appointment = Appointment.find_by!(
        study_id: params[:study_id], member_id: params[:member_id], creator: current_api_user
      )
    end

    def find_existing_members
      @study.appointments.where(creator: current_api_user).pluck(:member_id)
    end

    def find_chosen_members
      Member.where(id: params[:member_ids], creator: current_api_user).pluck(:id)
    end

    def delete_appointments(member_ids)
      return unless member_ids.any?

      Appointment.where(study: @study, member_id: member_ids, creator: current_api_user).destroy_all
    end

    def assign_appointments(member_ids)
      appointments = []
      member_ids.each do |member_id|
        appointments << Appointment.new(
          study: @study, member_id: member_id, creator: current_api_user
        )
        @study.appointments << appointments.last
      end
      appointments
    end

    def email_new_members(appointments)
      appointments.each do |appointment|
        AppointmentMailer.notify(appointment).deliver_later
      end
    end
  end
end
