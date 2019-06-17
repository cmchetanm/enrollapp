json.extract! study, :id
json.topic study.topic, partial: 'api/topics/topic', as: :topic
json.nurse study.nurse, partial: 'api/nurses/nurse', as: :nurse unless study.nurse.nil?
json.inclusion_criteria study.criteria.where(kind: CriterionType::INCLUSION),
                        partial: 'api/criteria/criterion', as: :criterion
json.exclusion_criteria study.criteria.where(kind: CriterionType::EXCLUSION),
                        partial: 'api/criteria/criterion', as: :criterion
json.members study.members, partial: 'api/members/member', as: :member

json.extract! study, :name, :topic_id, :nurse_id, :protocol, :agent, :mechanism, :side_effects,
              :administration, :randomization, :duration, :assessment_frequency, :interventions,
              :contact, :honorarium, :comments, :published, :created_at, :updated_at

json.role study.role(current_api_user)

json.url api_study_url(study, format: :json)
