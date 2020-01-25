class Contact < ApplicationRecord
  include HasFullName

  belongs_to :user, optional: true
  belongs_to :creator, class_name: 'User', inverse_of: :contacts
  validates :email, presence: true, format: {
    with: URI::MailTo::EMAIL_REGEXP, message: 'is invalid', allow_blank: true
  }

  before_create :link_to_user

  def site_for(user)
    puts 'contact'
    puts user
    share = Share.find_by(user_id: user.id)
    puts 'share'
    puts share
    site = Site.find_by(id: share.site_id)
    puts 'site'
    puts site
    @site_for ||= site
  end

  private

  def link_to_user
    self.user = User.find_by(email: email)
  end
end
