class Share < ApplicationRecord
  belongs_to :study
  belongs_to :site
  belongs_to :user, optional: true

  validates :role, presence: true
  after_create :create_sites_study
  def bulk_save(users_csv, name=nil)
    return false unless valid? && validate_users_csv(users_csv)

    create_shares_from_csv(users_csv, name)
  end

  def create_sites_study
    SitesStudy.find_or_create_by(site: site, study: study)
  end

  private

  def validate_users_csv(users_csv)
    users_csv.lines.each_with_index do |csv_line, index|
      user = user_from_csv(csv_line)
      user.skip_confirmation!
      unless user.valid?
        errors[:base] << "Line #{index + 1}: '#{csv_line}' is invalid: #{user.errors.full_messages.to_sentence}"
        return false
      end
    end
  end

  def user_from_csv(csv_line)
    first_name, last_name, email, phone_number = csv_line.split(',')
    User.new(
      first_name: first_name, last_name: last_name, email: email + 'test',
      phone_number: phone_number, password: rand.to_s[2..7]
    )
  end

  def create_shares_from_csv(users_csv, name=nil)
    users_csv.lines.each do |user_str|
      first_name, last_name, email, phone_number = user_str.split(',')
      user = User.get_or_invite(first_name, last_name, email, phone_number, study_id, name)
      share = Share.find_or_initialize_by(study_id: study_id, user: user)
      share.assign_attributes(site_id: site_id, role: role)
      SharesMailer.notify(share).deliver_later if share.save
    end
  end
end
