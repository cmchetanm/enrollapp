json.array! @studies do |study|
  json.extract! study, :id, :name, :published
  json.role study.role(current_api_user)
  json.url api_study_url(study, format: :json)
end
