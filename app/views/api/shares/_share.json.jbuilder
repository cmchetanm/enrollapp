puts 'yes, share json builder'
puts 'share'
puts share
puts '@shares'
puts @shares
json.extract! share, :id, :role
json.user share.user, partial: 'api/users/user', as: :user
puts 'no, not share json builder'