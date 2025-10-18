class SchoolAdminsController < ApplicationController
  def new
    @school_admin = SchoolAdmin.new
  end

  def create
    @school_admin = SchoolAdmin.new(school_admin_params)
    if @school_admin.save
      redirect_to root_path, notice: "School Admin registered successfully!"
    else
      render :new
    end
  end

  # Display login form (optional, if needed separately)
  def login_form
  end

  # Handle login submission
  def login
    admin = SchoolAdmin.find_by(email: params[:email])
    if admin && admin.password == params[:password] # replace with proper authentication
      redirect_to root_path, notice: "Login successful!"
    else
      flash[:alert] = "Invalid Email or Password"
      redirect_to root_path
    end
  end

  private

  def school_admin_params
    params.require(:school_admin).permit(:udise_code, :school_affiliation_code, :school_name, :city, :location, :state, :email, :password)
  end
end
