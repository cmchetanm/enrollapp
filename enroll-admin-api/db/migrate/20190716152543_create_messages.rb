class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages, id: false do |t|
      t.string :id, limit: 36, primary_key: true, null: false
      t.string :site_id, limit: 36, null: false
      t.string :study_id, limit: 36, null: false
      t.string :user_id, limit: 36, null: false
      t.text :text, null: false

      t.timestamps

      t.foreign_key :sites
      t.foreign_key :studies
      t.foreign_key :users

      t.index %i[site_id study_id created_at]
    end
  end
end
