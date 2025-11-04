class SchoolAdminsController < ApplicationController
  # Show signup form
  def new
    @school_admin = User.new
  end

  # Handle signup form submission
  def create
    @school_admin = User.new(school_admin_params)
    @school_admin.role = "school_admin"  # Important: assign role

    if @school_admin.save
      sign_in(@school_admin)  # Log in the admin automatically
      redirect_to generate_code_path, notice: "School Admin registered successfully!"
    else
      render :new
    end
  end

  # Display login form (optional)
  def login_form
  end

  # Handle login submission
  def login
    admin = User.find_by(email: params[:email], role: "school_admin")
    if admin&.valid_password?(params[:password])
      sign_in(admin)
      redirect_to root_path, notice: "Login successful!"
    else
      flash[:alert] = "Invalid Email or Password"
      redirect_to root_path
    end
  end


def save_generated_code
    # Current logged-in school admin
    if current_user && current_user.role == "school_admin"
      current_user.generated_code = params[:generated_code]
      if current_user.save
        render json: { success: true, code: current_user.generated_code }
      else
        render json: { success: false, errors: current_user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { success: false, message: "Unauthorized" }, status: :unauthorized
    end
end

  private

  # Strong params for school admin signup
  def school_admin_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :school_affiliation_code,
      :school_name,
      :city,
      :location,
      :state
    )
  end
end
