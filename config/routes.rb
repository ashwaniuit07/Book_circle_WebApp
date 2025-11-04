Rails.application.routes.draw do
  # ✅ Devise routes
  devise_for :users                # Existing model (for schools/students)
  devise_for :public_users         # New model (for public users)

  # ✅ Public User Dashboard (only accessible after login)
  authenticate :public_user do
    scope :public do
      get "dashboard", to: "public_dashboard#index", as: :public_dashboard
      get "dashboard/edit", to: "public_dashboard#edit", as: :edit_public_dashboard
      patch "dashboard", to: "public_dashboard#update"
    end
  end

  # ✅ School admin routes
  resources :school_admins, only: [:new, :create]

  # ✅ School admin login routes
  get  "school_admin/login", to: "school_admins#login_form", as: :school_admin_login_form
  post "school_admin/login", to: "school_admins#login",      as: :school_admin_login

  # ✅ Health check route
  get "up" => "rails/health#show", as: :rails_health_check
  
  namespace :api do
    get "schools", to: "schools#index"
  end

  post "save_generated_code", to: "school_admins#save_generated_code"
  get "generate_code", to: "home#generate_code"

  # ✅ Root route
  root "home#index"
end
