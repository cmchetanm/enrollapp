class FcmTokenValidator
  def initialize(user)
    @user = user
  end

  def valid_tokens
    fcm_tokens = []
    @user.fcm_tokens.keys.each do |client|
      token = @user.tokens[client]
      expiry = token['expiry']
      now = Time.current.to_i
      fcm_tokens << @user.fcm_tokens[client] if now < expiry
    end
    fcm_tokens
  end
end
