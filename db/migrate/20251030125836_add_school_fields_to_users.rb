class AddSchoolFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :school_affiliation_code, :string
    add_column :users, :school_name, :string
    add_column :users, :city, :string
    add_column :users, :location, :string
    add_column :users, :state, :string
  end
end
