class AddIconToStudies < ActiveRecord::Migration[6.0]
  def change
    add_column :studies, :study_icon, :string
  end
end