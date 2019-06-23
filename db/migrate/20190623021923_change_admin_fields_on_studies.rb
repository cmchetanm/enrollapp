class ChangeAdminFieldsOnStudies < ActiveRecord::Migration[6.0]
  def change
    change_table :studies do |t|
      t.string :sponsor, after: :interventions
      t.string :sponsor_contact, after: :sponsor
      t.rename :contact, :cro_contact
      t.rename :honorarium, :budget
      t.string :enrolled_or_committed, after: :budget
    end
  end
end
