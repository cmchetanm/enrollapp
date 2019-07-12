class MoveCriteriaToStudies < ActiveRecord::Migration[6.0]
  def up
    change_table :studies do |t|
      t.json :inclusion_criteria, after: :name
      t.json :exclusion_criteria, after: :inclusion_criteria
    end

    ActiveRecord::Base.connection.execute("
      UPDATE `studies` SET `inclusion_criteria` = (
          SELECT JSON_ARRAYAGG(`text`) FROM `criteria`
          WHERE `study_id` = `studies`.`id` AND `kind` = 'INCL'
        ),
        `exclusion_criteria` = (
          SELECT JSON_ARRAYAGG(`text`) FROM `criteria`
          WHERE `study_id` = `studies`.`id` AND `kind` = 'EXCL')
    ")

    drop_table :criteria
  end

  def down
    create_table :criteria do |t|
      t.references :study, null: false
      t.string :kind, null: false
      t.string :text, null: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.foreign_key :studies, on_update: :cascade, on_delete: :cascade
    end

    ActiveRecord::Base.connection.execute("
      INSERT INTO `criteria`
      SELECT NULL, `id` as `study_id`, 'INCL' as `kind`, `text`, `owner_type`, `owner_id`, `creator_type`, `creator_id`, `created_at`, `updated_at`
      FROM `studies`, JSON_TABLE(`inclusion_criteria`, '$[*]' COLUMNS (`text` VARCHAR(255)  PATH '$')) `text`;
    ")

    ActiveRecord::Base.connection.execute("
      INSERT INTO `criteria`
      SELECT NULL, `id` as `study_id`, 'EXCL' as `kind`, `text`, `owner_type`, `owner_id`, `creator_type`, `creator_id`, `created_at`, `updated_at`
      FROM `studies`, JSON_TABLE(`exclusion_criteria`, '$[*]' COLUMNS (`text` VARCHAR(255)  PATH '$')) `text`;
    ")

    change_table :studies do |t|
      t.remove :inclusion_criteria, :exclusion_criteria
    end
  end
end
