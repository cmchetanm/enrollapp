class AdminsController < ApplicationController
  before_action :set_admin, only: %i[resend_invitation destroy]

  def index
    @admins = Admin.order(:last_name, :first_name)
  end

  def resend_invitation
    @admin.deliver_invitation
    redirect_to admins_url, notice: t('devise.invitations.send_instructions', email: @admin.email)
  end

  def destroy
    if @admin.destroy
      redirect_to admins_url, notice: 'Admin was successfully destroyed.'
    else
      redirect_to admins_url, alert: @admin.errors.full_messages.to_sentence
    end
  end

  private

  def set_admin
    @admin = Admin.find(params[:id])
  end
end
