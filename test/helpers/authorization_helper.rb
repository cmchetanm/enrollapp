module AuthorizationHelper
  def auth_tokens_for_user(user)
    post api_user_session_url,
         params: { email: user.email, password: 'MyC0mPl3xPassw0rd!' }
    response.headers.slice('client', 'access-token', 'uid')
  end
end
