class PagesController < ApplicationController
  skip_before_action :authenticate_admin!

  def home
    if admin_signed_in?
      redirect_to users_url
    else
      redirect_to new_admin_session_url
    end
  end
end
