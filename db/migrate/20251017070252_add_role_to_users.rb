
class AddRoleToUsers < ActiveRecord::Migration[7.0]
  def change
    unless column_exists?(:users, :role)
      add_column :users, :role, :string, default: "public"
    end
  end
end
