json.id user.id
varr = 'anything'
json.ph do
  varr = user
  puts 'in do varr is:'
  puts varr
end
unless varr.nil?
  json.extract! varr, :full_name, :first_name, :last_name, :email
end
json.extract! user,
  :full_name, :first_name, :last_name, :email
json.phone_number number_to_phone(user.phone_number)
json.site user.site_for(user)