class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts, id: false do |t|
      t.string :id, limit: 36, primary_key: true, null: false
      t.string :creator_id, limit: 36, null: false
      t.string :user_id, limit: 36
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone_number

      t.timestamps

      t.foreign_key :users, column: :creator_id
      t.foreign_key :users

      t.index %i[last_name first_name]
    end
  end
end
