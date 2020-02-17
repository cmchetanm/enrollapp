class AddFieldsToStudyVersions < ActiveRecord::Migration[6.0]
  def change
  	add_column :study_versions, :sponsor_contact_email, :string
    add_column :study_versions, :sponsor_contact_phone, :string
    add_column :study_versions, :cro_name, :string
    add_column :study_versions, :cro_contact_email, :string
    add_column :study_versions, :cro_contact_phone, :string
  end
end
