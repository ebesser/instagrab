Instagrab::Application.routes.draw do
  devise_for :users

    root to: 'users#home'

    get '/users' => 'users#index'

    resources :contents, only: [:create, :destroy]



end
