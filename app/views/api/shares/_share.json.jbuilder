json.extract! share, :id, :role
json.user share.user, partial: 'api/users/user', as: :user