class CreateNurses < ActiveRecord::Migration[6.0]
  def change
    create_table :nurses do |t|
      t.string :full_name, null: false
      t.string :email, null: false
      t.string :phone_number, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.index :full_name
    end
  end
end
