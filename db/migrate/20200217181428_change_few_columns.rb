class ChangeFewColumns < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :last_name, :string, null: true
    change_column :contacts, :last_name, :string, null: true
  end
end
