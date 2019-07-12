json.extract! study, :id
json.topic study.topic, partial: 'api/topics/topic', as: :topic
json.members study.members, partial: 'api/members/member', as: :member

json.extract! study, :inclusion_criteria, :exclusion_criteria, :name, :protocol, :agent, :mechanism, :side_effects,
              :administration, :randomization, :duration, :assessment_frequency, :interventions,
              :sponsor, :sponsor_contact, :cro_contact, :budget, :enrolled_or_committed, :comments,
              :published, :created_at, :updated_at

json.role study.role(current_api_user)

json.url api_study_url(study, format: :json)
