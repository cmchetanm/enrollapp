class PagesController < ApplicationController
  skip_before_action :authenticate_admin!, only: :home

  def home
    if admin_signed_in?
      redirect_to dashboard_url
    else
      redirect_to new_admin_session_url
    end
  end

  def dashboard
  end
end
