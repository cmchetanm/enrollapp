json.extract! member, :id, :full_name, :email, :role
json.phone_number number_to_phone(member.phone_number, area_code: true)
