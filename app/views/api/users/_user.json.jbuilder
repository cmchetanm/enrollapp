json.extract! user, :id, :full_name, :first_name, :last_name, :email
json.phone_number number_to_phone(user.phone_number)
