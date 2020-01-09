json.array! @studies, partial: 'api/studies/study', as: :study
json.array! @studies do |study|
  json.id study.id
  json.inclusion_criteria study.inclusion_criteria
  json.exclusion_criteria study.exclusion_criteria
  json.name study.name
  json.protocol study.protocol
  json.agent study.agent
  json.mechanism study.mechanism
  json.side_effects study.side_effects
  json.administration study.administration
  json.randomization study.randomization
  json.duration study.duration
  json.assessment_frequency study.assessment_frequency
  json.interventions study.interventions
  json.sponsor_name study.sponsor_name
  json.sponsor_contact study.sponsor_contact
  json.cro_contact study.cro_contact
  json.budget study.budget
  json.enrolled_or_committed study.enrolled_or_committed
  json.comments study.comments
  json.travel_parking_costs study.travel_parking_costs
  puts 'study'
  puts study
  puts '@topics'
  puts @topics
  puts '@@sponsors'
  puts @sponsors
  study_topic = @topics.detect {|t| t.id == study.topic_id}
  study_sponsor = @sponsors.detect {|s| s.id == study_topic.sponsor_id}
  json.study_icon study_sponsor.avatar
end