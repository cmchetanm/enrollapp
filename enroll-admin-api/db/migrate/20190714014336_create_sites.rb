class CreateSites < ActiveRecord::Migration[6.0]
  def change
    create_table :sites, id: false do |t|
      t.string :id, limit: 36, primary_key: true, null: false
      t.string :name, null: false

      t.timestamps

      t.index :name
    end
  end
end
