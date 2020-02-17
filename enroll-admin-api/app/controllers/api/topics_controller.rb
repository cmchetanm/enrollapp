module Api
  class TopicsController < ApplicationController
    def index
      @topics = TopicAuthenticator.new(current_api_user).find_all
    end
  end
end
