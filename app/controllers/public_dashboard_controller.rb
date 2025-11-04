class PublicDashboardController < ApplicationController
  before_action :authenticate_public_user!

  def index
    @public_user = current_public_user
  end

  def edit
    @public_user = current_public_user
  end

  def update
    @public_user = current_public_user
    if @public_user.update(public_user_params)
      redirect_to public_dashboard_path, notice: "Profile updated successfully!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def public_user_params
    params.require(:public_user).permit(
      :name, :phone, :address, :city, :state, :pincode, :profile_picture
    )
  end
end
