# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
   def new
     puts 'new'
     super
   end

  # POST /resource/password
   def create
     puts 'create'
     super
   end

  # GET /resource/password/edit?reset_password_token=abcdef
   def edit
     puts 'edit'
     super
   end

  # PUT /resource/password
   def update
     puts 'update'
     super
   end

  # protected

   def after_resetting_password_path_for(resource)
     puts 'after_resetting_password_path_for'
     super(resource)
   end

  # The path used after sending reset password instructions
   def after_sending_reset_password_instructions_path_for(resource_name)
     puts 'after_sending_reset_password_instructions_path_for'
     super(resource_name)
   end
end
