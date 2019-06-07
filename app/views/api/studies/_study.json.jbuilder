json.extract! study, :id
json.topic study.topic, partial: 'api/topics/topic', as: :topic
json.nurse study.nurse, partial: 'api/nurses/nurse', as: :nurse unless study.nurse.nil?
json.extract! study, :name, :topic_id, :nurse_id, :protocol, :agent, :mechanism, :side_effects,
              :administration, :randomization, :duration, :assessment_frequency, :interventions,
              :contact, :honorarium, :comments, :published, :created_at, :updated_at
json.url api_study_url(study, format: :json)
