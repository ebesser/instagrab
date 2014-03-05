Instagrab::Application.routes.draw do
  devise_for :users

    root to: 'users#home'

    get '/users' => 'users#index'

    get '/bookmark' => 'users#bookmarklet'

    get '/contents' => 'contents#index'

    post '/contents/share_it' => 'contents#share_it'

    get '/relationships' => 'relationships#index'

    post '/relationships' => 'relationships#create'

    post '/relationships/delete_relationship' => 'relationships#delete_relationship'

    get '/api_test' => 'contents#api_handler'

    resources :contents, only: [:create, :destroy, :new]

    # followers/followed routes
    resources :users do
    member do
      get :following, :followers
    end
  end

end
