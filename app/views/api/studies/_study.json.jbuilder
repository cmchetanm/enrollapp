json.extract! study, :id
json.topic study.topic, partial: 'api/topics/topic', as: :topic
json.role study.role_for(current_api_user)
json.shares study.shares.where(site_id: study.site_for(current_api_user)), partial: 'api/shares/share', as: :share
json.extract! study.version_for(current_api_user) || study, :inclusion_criteria, :exclusion_criteria,
              :name, :protocol, :agent, :mechanism, :side_effects, :administration, :randomization, :duration,
              :assessment_frequency, :interventions, :sponsor_name, :sponsor_contact, :cro_contact,
              :budget, :comments, :travel_parking_costs
