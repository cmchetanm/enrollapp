class ErrorsController < ApplicationController
  skip_before_action :authenticate_any!

  def unauthorized
    render(status: :unauthorized)
  end

  def not_found
    render(status: :not_found)
  end

  def internal_server_error
    render(status: :internal_server_error)
  end
end
