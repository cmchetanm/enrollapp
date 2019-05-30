class CreateNurses < ActiveRecord::Migration[6.0]
  def change
    create_table :nurses do |t|
      t.string :full_name, null: false
      t.string :email, null: false
      t.string :phone_number, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.foreign_key :users, column: :owner_id, on_update: :cascade, on_delete: :cascade
      t.foreign_key :users, column: :creator_id, on_update: :cascade, on_delete: :nullify

      t.index :full_name
    end
  end
end
