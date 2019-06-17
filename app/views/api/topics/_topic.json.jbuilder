json.extract! topic, :id, :name
json.readonly topic.owner_id != current_api_user.id
json.url api_topic_url(topic, format: :json)
