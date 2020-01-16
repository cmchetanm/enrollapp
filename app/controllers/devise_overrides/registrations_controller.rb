# frozen_string_literal: true

module DeviseOverrides
  class RegistrationsController < Devise::RegistrationsController
    prepend_before_action :authenticate_scope!, unless: :no_resources?

    #GET /resource/sign_in
    def new
      puts 'new'
      super
    end

    #POST /resource/sign_in
    def create
      puts 'create'
      super
    end

    #DELETE /resource/sign_out
    def destroy
      puts 'destroy'
      super
    end

    private

    def no_resources?
      resource_class.count.zero?
    end
  end
end
