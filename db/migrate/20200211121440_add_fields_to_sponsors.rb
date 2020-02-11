class AddFieldsToSponsors < ActiveRecord::Migration[6.0]
  def change
    add_column :sponsors, :invitation_token, :string
    add_column :sponsors, :invitation_created_at, :datetime
    add_column :sponsors, :invitation_sent_at, :datetime
    add_column :sponsors, :invitation_accepted_at, :datetime
    add_column :sponsors, :invitation_limit, :integer
    add_column :sponsors, :invited_by_id, :integer
    add_column :sponsors, :invited_by_type, :string
  end
end
