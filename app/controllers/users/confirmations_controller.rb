# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
   def new
     puts 'new'
     super
   end

  # POST /resource/confirmation
   def create
     puts 'create'
     super
   end

  # GET /resource/confirmation?confirmation_token=abcdef
   def show
     puts 'show'
     super
   end

   protected

  # The path used after resending confirmation instructions.
   def after_resending_confirmation_instructions_path_for(resource_name)
     puts 'after_resending_confirmation_instructions_path_for'
     super(resource_name)
   end

  # The path used after confirmation.
   def after_confirmation_path_for(resource_name, resource)
     puts 'after_confirmation_path_for'
     super(resource_name, resource)
   end
end
