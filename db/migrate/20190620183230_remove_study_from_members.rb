class RemoveStudyFromMembers < ActiveRecord::Migration[6.0]
  def up
    remove_column :members, :study_id
    add_index :members, %i[email role creator_id], unique: true
  end

  def down
    change_table :members do |t|
      t.references :study, null: true, after: :id
      t.foreign_key :studies, on_update: :cascade, on_delete: :cascade
    end

    ActiveRecord::Base.connection.execute('
    UPDATE `members` SET `study_id` = (
      SELECT `study_id`
      FROM `appointments`
      WHERE `study_id` IS NOT NULL AND
        `members`.`id` = `appointments`.`member_id` AND
        `members`.`creator_id` = `appointments`.`creator_id`)')

    change_column_null :members, :study_id, false
    remove_index :members, %i[email role creator_id]
  end
end
