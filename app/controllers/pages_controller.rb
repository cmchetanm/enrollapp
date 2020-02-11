class PagesController < ApplicationController
  skip_before_action :authenticate_any!

  def home
    if admin_signed_in?
      redirect_to sponsors_url
    elsif sponsor_signed_in?
      redirect_to sponsor_url(current_sponsor)
    else
      redirect_to new_admin_session_url
    end
  end

  def mobile_app
  end
end
