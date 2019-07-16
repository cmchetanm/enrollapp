json.extract! contact, :id, :user_id, :full_name, :first_name, :last_name, :email
json.phone_number number_to_phone(contact.phone_number, area_code: 1)
