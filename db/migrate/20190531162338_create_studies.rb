class CreateStudies < ActiveRecord::Migration[6.0]
  def change
    create_table :studies do |t|
      t.references :topic, null: false
      t.references :nurse
      t.string :name, null: false
      t.string :protocol
      t.string :agent
      t.string :mechanism
      t.string :side_effects
      t.string :administration
      t.string :randomization
      t.string :duration
      t.string :assessment_frequency
      t.string :interventions
      t.string :contact
      t.string :honorarium
      t.text :comments
      t.boolean :published, default: false
      t.references :owner, polymorphic: true, null: false
      t.references :creator, polymorphic: true

      t.timestamps

      t.foreign_key :topics, on_update: :cascade, on_delete: :cascade
      t.foreign_key :nurses, on_update: :cascade, on_delete: :nullify

      t.index :name
    end
  end
end
