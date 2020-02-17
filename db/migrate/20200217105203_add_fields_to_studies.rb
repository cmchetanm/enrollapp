class AddFieldsToStudies < ActiveRecord::Migration[6.0]
  def change
    add_column :studies, :sponsor_contact_email, :string
    add_column :studies, :sponsor_contact_phone, :string
    add_column :studies, :cro_name, :string
    add_column :studies, :cro_contact_email, :string
    add_column :studies, :cro_contact_phone, :string
  end
end
