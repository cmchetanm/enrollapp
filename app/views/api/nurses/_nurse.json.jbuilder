json.extract! nurse, :id, :full_name, :email
json.phone_number number_to_phone(nurse.phone_number, area_code: true)
json.url api_nurse_url(nurse, format: :json)
