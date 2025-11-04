class AddProfileFieldsToPublicUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :public_users, :name, :string
    add_column :public_users, :phone, :string
    add_column :public_users, :city, :string
    add_column :public_users, :state, :string
    add_column :public_users, :address, :string
    add_column :public_users, :pincode, :string
    add_column :public_users, :profile_picture, :string
  end
end
