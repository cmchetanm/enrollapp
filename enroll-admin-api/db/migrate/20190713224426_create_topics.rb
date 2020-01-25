class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics, id: false do |t|
      t.string :id, limit: 36, null: false, primary_key: true
      t.string :sponsor_id, limit: 36, null: false
      t.string :name, null: false

      t.timestamps

      t.foreign_key :sponsors

      t.index :name
    end
  end
end
