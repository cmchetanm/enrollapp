class CreateStudyVersions < ActiveRecord::Migration[6.0]
  def change
    create_table :study_versions, id: false do |t|
      t.string :id, limit: 36, primary_key: true, null: false
      t.string :site_id, limit: 36, null: false
      t.string :study_id, limit: 36, null: false
      t.string :name, null: false
      t.json :inclusion_criteria
      t.json :exclusion_criteria
      t.string :protocol
      t.string :agent
      t.string :mechanism
      t.string :side_effects
      t.string :administration
      t.string :randomization
      t.string :duration
      t.string :assessment_frequency
      t.string :interventions
      t.string :sponsor_name
      t.string :sponsor_contact
      t.string :cro_contact
      t.string :budget
      t.string :enrolled_or_committed
      t.text :comments

      t.timestamps

      t.foreign_key :sites
      t.foreign_key :studies

      t.index :name
      t.index %i[site_id study_id], unique: true
    end
  end
end
