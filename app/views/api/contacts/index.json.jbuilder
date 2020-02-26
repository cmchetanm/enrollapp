#json.array! @contacts, partial: 'api/contacts/contact', as: :contact
json.array! @contacts do |contact|
  json.id contact.id
  json.user_id contact.user_id
  json.full_name contact.full_name
  json.first_name contact.first_name
  json.last_name contact.last_name
  json.email contact.email
  json.phone_number number_to_phone(contact.phone_number)  
end
