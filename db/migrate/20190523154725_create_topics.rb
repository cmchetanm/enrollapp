class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :name, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.index :name
      t.index %i[owner_type owner_id]
      t.index %i[creator_type creator_id]
    end
  end
end
