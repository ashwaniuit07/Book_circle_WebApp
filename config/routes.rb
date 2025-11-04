Rails.application.routes.draw do
  devise_for :users

  # Route for school admins (needed for your homepage form)
  resources :school_admins, only: [ :new, :create ]

  # Add login routes for School Admin
  # POST route to handle login submission
  post "school_admin/login", to: "school_admins#login", as: "school_admin_login"

  # Optional GET route if you want a separate login page
  get "school_admin/login", to: "school_admins#login_form", as: "school_admin_login_form"

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Root path
  root to: "home#index"
end
