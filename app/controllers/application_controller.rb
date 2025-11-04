class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # ✅ Allow extra fields (like name) during sign up & update
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end

  # ✅ Redirect users after login
  def after_sign_in_path_for(resource)
    if resource.is_a?(PublicUser)
      public_dashboard_path   # Public user dashboard
    else
      root_path               # You can change this to school dashboard if needed
    end
  end
end
