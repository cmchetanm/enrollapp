json.extract! message, :id, :study_id, :user_id, :text
json.full_name message.user.full_name
json.created_at l message.created_at, format: :long