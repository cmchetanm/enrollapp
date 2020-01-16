# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
   before_action :configure_sign_up_params, only: [:create]
   before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
   def new
     puts 'new'
     super
   end

  # POST /resource
   def create
     puts 'create'
     super
   end

  # GET /resource/edit
   def edit
     puts 'edit'
     super
   end

  # PUT /resource
   def update
     puts 'update'
     super
   end

  # DELETE /resource
   def destroy
     puts 'destroy'
     super
   end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
   def cancel
     puts 'cancel'
     super
   end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
   def configure_sign_up_params
     puts 'configure_sign_up_params'
     devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
   end

  # If you have extra params to permit, append them to the sanitizer.
   def configure_account_update_params
     puts 'configure_account_update_params'
     devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
   end

  # The path used after sign up.
   def after_sign_up_path_for(resource)
     puts 'after_sign_up_path_for'
     super(resource)
   end

  # The path used after sign up for inactive accounts.
   def after_inactive_sign_up_path_for(resource)
     puts 'after_inactive_sign_up_path_for'
     super(resource)
   end
end
