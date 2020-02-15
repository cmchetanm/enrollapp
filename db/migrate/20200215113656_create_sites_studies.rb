class CreateSitesStudies < ActiveRecord::Migration[6.0]
  def change
    create_table :sites_studies, id: false do |t|
      t.string :id, limit: 36, primary_key: true, null: false
      t.string :study_id, null: false
      t.string :site_id, null: false
      t.integer :enrolled, default: 0
      t.integer :committed, default: 0

      t.timestamps
    end
    add_index :sites_studies, :study_id
    add_index :sites_studies, :site_id

  end
end
