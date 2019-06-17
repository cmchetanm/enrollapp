Rails.application.routes.draw do
  root 'pages#home'

  get '/dashboard', to: 'pages#dashboard'

  devise_for :admins
  resources :nurses
  resources :studies
  resources :topics

  namespace :api, defaults: {format: :json} do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'api/devise_token_auth_overrides/registrations',
      sessions: 'api/devise_token_auth_overrides/sessions'
    }
    resources :nurses, except: %i[new edit]
    resources :topics, except: %i[new edit]
    resources :studies, except: %i[new edit]
    resources :members, except: %i[new edit show]
    put '/auth/fcm_token', to: 'users#fcm_token'
  end

  match '/401', to: 'errors#unauthorized', via: :all, as: :unauthorized
  match '/404', to: 'errors#not_found', via: :all, as: :not_found
  match '/500', to: 'errors#internal_server_error', via: :all, as: :internal_server_error
end
