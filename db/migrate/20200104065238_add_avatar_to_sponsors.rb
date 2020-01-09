class AddAvatarToSponsors < ActiveRecord::Migration[6.0]
  def change
    add_column :sponsors, :avatar, :string
  end
end