#json.id user.id
#varr = 'anything'
#puts 'before do varr is:'
#puts varr
#json.ph do
#  varr = user.user_associations.where(creator: current_api_user) ? user.user_associations.where(creator: current_api_user).first : user
#  puts 'in do varr is:'
#  puts varr
#end
#puts 'after do varr is:'
#puts varr
#unless varr.nil?
#  json.extract! varr, :full_name, :first_name, :last_name, :email
#end
#json.extract! user.user_associations.where(creator: current_api_user).first || user,
#  :full_name, :first_name, :last_name, :email
#json.phone_number number_to_phone(user.phone_number)
#json.site user.site_for(user)

puts 'in jbuilder user is'
puts user
json.id user.id
varr = 'anything'
json.ph do
  varr = user.user_associations.where(creator: current_api_user)
  puts 'in do varr is:'
  puts varr
  puts 'varr should have been printed'
end
if varr.nil?
  puts 'extracting user'
  json.extract! user,:full_name, :first_name, :last_name, :email
  puts 'extracted user'
else
  puts 'extracting varr.first'
  json.extract! varr.first,:full_name, :first_name, :last_name, :email
  puts 'extracted varr.first'
end
json.phone_number number_to_phone(user.phone_number)
json.site user.site_for(user)