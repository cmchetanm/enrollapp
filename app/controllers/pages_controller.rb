class PagesController < ApplicationController
  def home
    redirect_to new_admin_session_url
  end
end
