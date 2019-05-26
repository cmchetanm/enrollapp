Rails.application.routes.draw do
  root 'pages#home'

  get '/dashboard', to: 'pages#dashboard'

  devise_for :admins
  resources :topics

  scope :api, module: :api, defaults: {format: :json} do
    mount_devise_token_auth_for 'User', at: 'auth'
    resources :topics, except: %i[new edit]
  end

  match '/401', to: 'errors#unauthorized', via: :all, as: :unauthorized
  match '/404', to: 'errors#not_found', via: :all, as: :not_found
  match '/500', to: 'errors#internal_server_error', via: :all, as: :internal_server_error
end
