class DropNurses < ActiveRecord::Migration[6.0]
  def up
    remove_column :studies, :nurse_id
    drop_table :nurses
  end

  def down
    create_table :nurses do |t|
      t.string :full_name, null: false
      t.string :email, null: false
      t.string :phone_number, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.index :full_name
    end

    add_reference :studies, :nurse, after: :topic_id
    add_foreign_key :studies, :nurses, on_update: :cascade, on_delete: :nullify
  end
end
