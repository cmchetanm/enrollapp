class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :name, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.foreign_key :users, column: :owner_id, on_update: :cascade, on_delete: :cascade
      t.foreign_key :users, column: :creator_id, on_update: :cascade, on_delete: :nullify

      t.index :name
    end
  end
end
