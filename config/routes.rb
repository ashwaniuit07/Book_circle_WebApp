Rails.application.routes.draw do
  devise_for :users

  resources :school_admins, only: [:new, :create]
  post "school_admin/login", to: "school_admins#login", as: "school_admin_login"
  get "school_admin/login", to: "school_admins#login_form", as: "school_admin_login_form"

  get "up" => "rails/health#show", as: :rails_health_check
  
  namespace :api do
    get "schools", to: "schools#index"
  end

   post "save_generated_code", to: "school_admins#save_generated_code"

  get "generate_code", to: "home#generate_code"

  root to: "home#index"
end
