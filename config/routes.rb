Rails.application.routes.draw do
  root 'pages#home'

  get 'mobile-app', to: 'pages#mobile_app'

  devise_for :admins, controllers: {
    invitations: 'devise_overrides/invitations',
    registrations: 'devise_overrides/registrations',
    sessions: 'devise_overrides/sessions'
  }

  devise_for :users, controllers: {
    invitations: 'devise_overrides/invitations',
    registrations: 'devise_overrides/registrations',
    sessions: 'devise_overrides/sessions'
  }

  resources :admins, only: %i[index destroy] do
    post :resend_invitation, on: :member
  end
  resources :users, only: %i[index destroy] do
    post :resend_invitation, on: :member
  end
  resources :sites, except: :show
  resources :shares, except: %i[index show]
  resources :sponsors
  resources :studies
  resources :topics, except: %i[index show]

  namespace :api, defaults: {format: :json} do
    get '/auth/check_exists', to: 'users#check_exists'
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'api/devise_token_auth_overrides/registrations',
      sessions: 'api/devise_token_auth_overrides/sessions'
    }

    resources :topics, only: :index
    resources :studies, except: %i[new edit create]
    resources :shares, only: %i[create destroy]
    resources :contacts, except: %i[new edit]
    resources :messages, except: %i[new edit]
    resources :users
    put '/auth/fcm_token', to: 'users#fcm_token'
  end

  match '/401', to: 'errors#unauthorized', via: :all, as: :unauthorized
  match '/404', to: 'errors#not_found', via: :all, as: :not_found
  match '/500', to: 'errors#internal_server_error', via: :all, as: :internal_server_error
end
