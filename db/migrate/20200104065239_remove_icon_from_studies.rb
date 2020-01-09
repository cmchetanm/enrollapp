class RemoveIconFromStudies < ActiveRecord::Migration[6.0]
  def change
    remove_column :studies, :study_icon, :string
  end
end
