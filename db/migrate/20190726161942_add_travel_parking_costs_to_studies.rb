class AddTravelParkingCostsToStudies < ActiveRecord::Migration[6.0]
  def change
    add_column :studies, :travel_parking_costs, after: :interventions
    add_column :study_versions, :travel_parking_costs, after: :interventions
  end
end
