json.extract! study, :id
json.topic study.topic, partial: 'api/topics/topic', as: :topic
json.role study.role_for(current_api_user)
json.shares study.shares.where(site_id: study.site_for(current_api_user)), partial: 'api/shares/share', as: :share
json.extract! study.version_for(current_api_user) || study, :inclusion_criteria, :exclusion_criteria,
              :name, :protocol, :agent, :mechanism, :side_effects, :administration, :randomization, :duration,
              :assessment_frequency, :interventions, :sponsor_name, :sponsor_contact, :cro_contact,
              :budget, :enrolled_or_committed, :comments, :travel_parking_costs
puts 'study.version_for(current_api_user)'
puts study.version_for(current_api_user)
puts 'study.version_for(current_api_user).attributes'
puts study.version_for(current_api_user) ? study.version_for(current_api_user).attributes : 'nope'
puts 'study'
puts study
puts 'study.attributes'
puts study ? study.attributes : 'nope'
puts 'json'
puts json
puts 'json.attributes'
puts json.attributes
puts 'json.methods'
puts json.methods
