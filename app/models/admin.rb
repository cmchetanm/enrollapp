class Admin < ApplicationRecord
  include HasFullName
  include HasStrongPassword

  devise :confirmable, :database_authenticatable, :invitable, :lockable, :registerable,
         :recoverable, :rememberable, :timeoutable, :validatable

  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
