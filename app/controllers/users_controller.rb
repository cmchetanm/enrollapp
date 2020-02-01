class UsersController < ApplicationController
  before_action :set_user, only: %i[resend_invitation destroy]

  def index
    puts 'users controller index'
    @users = User.order(:last_name, :first_name)
  end

  def resend_invitation
    puts 'users controller resend'
    @user.deliver_invitation
    redirect_to users_url, notice: t('devise.invitations.send_instructions', email: @user.email)
  end

  def destroy
    puts 'users controller destroy'
    if @user.destroy
      redirect_to users_url, notice: 'User was successfully destroyed.'
    else
      redirect_to users_url, alert: @user.errors.full_messages.to_sentence
    end
  end

  private

  def set_user
    puts 'users controller set_user'
    @user = User.find(params[:id])
  end
end
