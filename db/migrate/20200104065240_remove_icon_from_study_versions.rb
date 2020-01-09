class RemoveIconFromStudyVersions < ActiveRecord::Migration[6.0]
  def change
    remove_column :study_versions, :study_icon, :string
  end
end
