#json.old do
#  json.array! @studies, partial: 'api/studies/study', as: :study
#end
# :inclusion_criteria, :exclusion_criteria,
#  :name, :protocol, :agent, :mechanism, :side_effects, :administration, :randomization, :duration,
#              :assessment_frequency, :interventions, :sponsor_name, :sponsor_contact, :cro_contact,
#              :budget, :enrolled_or_committed, :comments, :travel_parking_costs
json.study do
  json.array! @studies do |study|
    study_version = study.version_for(@user)
    site_id = study.site_for(@user)
    json.id study.id
    json.inclusion_criteria study_version ? study_version.inclusion_criteria : study.inclusion_criteria
    json.exclusion_criteria study_version ? study_version.exclusion_criteria : study.exclusion_criteria
    json.name study_version ? study_version.name : study.name
    json.protocol study_version ? study_version.protocol : study.protocol
    json.agent study_version ? study_version.agent : study.agent
    json.mechanism study_version ? study_version.mechanism : study.mechanism
    json.side_effects study_version ? study_version.side_effects : study.side_effects
    json.administration study_version ? study_version.administration : study.administration
    json.randomization study_version ? study_version.randomization : study.randomization
    json.duration study_version ? study_version.duration : study.duration
    json.assessment_frequency study_version ? study_version.assessment_frequency : study.assessment_frequency
    json.interventions study_version ? study_version.interventions : study.interventions
    json.sponsor_name study_version ? study_version.sponsor_name : study.sponsor_name
    json.sponsor_contact study_version ? study_version.sponsor_contact : study.sponsor_contact
    json.sponsor_contact_email study_version ? study_version.sponsor_contact_email : study.sponsor_contact_email
    json.cro_name study_version ? study_version.cro_name : study.cro_name
    json.cro_contact study_version ? study_version.cro_contact : study.cro_contact
    json.cro_contact_email study_version ? study_version.cro_contact_email : study.cro_contact_email
    json.budget study_version ? study_version.budget : study.budget
    json.enrolled_or_committed study_version ? study_version.enrolled_or_committed : study.enrolled_or_committed
    json.comments study_version ? study_version.comments : study.comments
    json.travel_parking_costs study_version ? study_version.travel_parking_costs : study.travel_parking_costs
    study_topic = @topics.detect {|t| t.id == study.topic_id}
    study_shares = @shares.select {|t| t.study_id == study.id}
    study_sponsor = @sponsors.detect {|s| s.id == study_topic.sponsor_id}
    this_user_share = study_shares.detect {|t| t.user_id == @user.id}
    json.role this_user_share.role
    json.study_icon study_sponsor.avatar
    json.topic study_topic
    json.enrolled study_version.enrolled
    json.committed study_version.committed

    json.sponsor_contact_email study_version ? study_version.sponsor_contact_email : study.sponsor_contact_email
    json.sponsor_contact_phone study_version ? study_version.sponsor_contact_phone : study.sponsor_contact_phone
    json.cro_name study_version ? study_version.cro_name : study.cro_name
    json.cro_contact_email study_version ? study_version.cro_contact_email : study.cro_contact_email
    json.cro_contact_phone study_version ? study_version.cro_contact_phone : study.cro_contact_phone
    json.shares do
      json.array! study_shares do |share|
        json.extract! share, :id, :role
        json.user share.user, partial: 'api/users/user', as: :user
        json.site @sites.detect {|s| s.id == share.site_id}
      end
    end
  end
end
