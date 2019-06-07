class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :name, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.index :name
    end
  end
end
