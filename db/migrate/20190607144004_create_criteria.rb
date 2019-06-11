class CreateCriteria < ActiveRecord::Migration[6.0]
  def change
    create_table :criteria do |t|
      t.references :study, null: false
      t.string :kind, null: false
      t.string :text, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.foreign_key :studies, on_update: :cascade, on_delete: :cascade
    end
  end
end
