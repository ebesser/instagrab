Instagrab::Application.routes.draw do
  devise_for :users

    root to: 'users#home'

    get '/users' => 'users#index'

    resources :contents, only: [:create, :destroy]

    # followers/followed routes
    resources :users do
    member do
      get :following, :followers
    end
  end

end
