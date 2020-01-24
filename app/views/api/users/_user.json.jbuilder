json.id user.id
json.extract! user.user_associations.where(creator: current_api_user) ? user.user_associations.where(creator: current_api_user).first : user,
              :full_name?, :first_name?, :last_name?, :email?
json.phone_number number_to_phone(user.phone_number)
json.site user.site_for(user)