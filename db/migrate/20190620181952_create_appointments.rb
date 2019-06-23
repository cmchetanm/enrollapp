class CreateAppointments < ActiveRecord::Migration[6.0]
  def up
    create_table :appointments do |t|
      t.references :study, null: false
      t.references :member, null: false
      t.references :creator

      t.timestamps

      t.foreign_key :studies, on_update: :cascade, on_delete: :cascade
      t.foreign_key :members, on_update: :cascade, on_delete: :cascade
      t.foreign_key :users, column: :creator_id, on_update: :cascade, on_delete: :nullify

      t.index %i[study_id member_id creator_id], unique: true, name: 'fk_rails_appointment_uniqueness'
    end

    ActiveRecord::Base.connection.execute('
      INSERT INTO `appointments`
      SELECT NULL, `study_id`, `id`, `creator_id`, `created_at`, `updated_at`
      FROM `members`')
  end

  def down
    drop_table :appointments
  end
end
