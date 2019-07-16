class PushNotification
  def initialize(user)
    @user = user
  end

  def send(title, body)
    return if @user.tokens.nil?

    uri = URI(APP[:firebase_url])
    req = prepare_request(uri)

    FcmTokenValidator.new(@user).valid_tokens.each do |token|
      req.body = prepare_request_body(token, title, body)
      send_request(uri, req)
    end
  end

  private

  def prepare_request(uri)
    Net::HTTP::Post.new(
      uri.path,
      'Content-Type': 'application/json',
      Authorization: "key=#{Rails.application.credentials[:firebase_fcm_key]}"
    )
  end

  def prepare_request_body(token, title, body)
    {
      to: token,
      notification: {
        title: title,
        body: body
      }
    }.to_json
  end

  def send_request(uri, req)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    Rails.logger.debug("Sending post request to #{uri}: #{req.body}")
    res = http.request(req)
    Rails.logger.debug("Request completed with status #{res.code}: #{res.body}")
  end
end
