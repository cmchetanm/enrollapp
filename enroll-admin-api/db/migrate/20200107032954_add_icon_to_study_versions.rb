class AddIconToStudyVersions < ActiveRecord::Migration[6.0]
  def change
    add_column :study_versions, :study_icon, :string
  end
end
