Instagrab::Application.routes.draw do
  devise_for :users

    root to: 'users#home'

    get '/users' => 'users#index'

    get '/contents' => 'contents#index'

    get '/relationships' => 'relationships#index'

    post '/relationships' => 'relationships#create'

    post '/relationships/delete_relationship' => 'relationships#delete_relationship'

    resources :contents, only: [:create, :destroy, :new]

    # followers/followed routes
    resources :users do
    member do
      get :following, :followers
    end
  end

end
