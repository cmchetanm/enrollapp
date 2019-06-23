class CreateMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :members do |t|
      t.references :study, null: false
      t.references :user
      t.string :full_name, null: false
      t.string :email, null: false
      t.string :phone_number, null: false
      t.string :role, null: false
      t.references :creator

      t.timestamps

      t.foreign_key :studies, on_update: :cascade, on_delete: :cascade
      t.foreign_key :users, on_update: :cascade, on_delete: :cascade
      t.foreign_key :users, column: :creator_id, on_update: :cascade, on_delete: :nullify

      t.index %i[study_id email]
    end
  end
end
