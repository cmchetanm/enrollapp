json.extract! user, :id, :first_name, :last_name, :email
json.phone_number number_to_phone(user.phone_number, area_code: true)
