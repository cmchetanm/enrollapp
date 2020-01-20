puts 'yes, share json builder'
json.extract! share, :id, :role
json.user share.user, partial: 'api/users/user', as: :user
puts 'no, not share json builder'