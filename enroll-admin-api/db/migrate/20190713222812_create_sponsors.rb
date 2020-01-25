class CreateSponsors < ActiveRecord::Migration[6.0]
  def change
    create_table :sponsors, id: false do |t|
      t.string :id, limit: 36, primary_key: true, null: false
      t.string :name, null: false
      t.string :contact, null: false
      t.string :cro, null: false

      t.timestamps

      t.index :name
    end
  end
end
