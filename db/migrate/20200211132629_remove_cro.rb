class RemoveCro < ActiveRecord::Migration[6.0]
  def up
    change_column_null :sponsors, :cro, true
  end
  def down
    change_column :sponsors, :cro, :string, null: false
  end
end
