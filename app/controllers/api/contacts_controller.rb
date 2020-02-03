module Api
  class ContactsController < ApplicationController
    before_action :set_contact, only: %i[show edit update destroy]

    def index
      puts 'in index'
      puts params
      @contacts = Contact.where(creator: current_api_user).order(:last_name, :first_name)
    end

    def show
      puts 'in show'
      puts params
    end

    def new
      @contact = Contact.new
      puts 'in new'
      puts params
    end

    def edit
      puts 'in edit'
      puts params
    end

    def create
      @contact = Contact.new(contact_params.merge(creator: current_api_user))
      puts 'in create'
      puts params
      #generated_password = Devise.friendly_token.first(8)
      #user = User.create!(:email => email, :password => generated_password)
      #
      #RegistrationMailer.welcome(user, generated_password).deliver

      if @contact.save
        render :show, status: :created
      else
        render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def update
      puts 'in update'
      puts params
      if @contact.update(contact_params)
        render :show, status: :ok
      else
        render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      if @contact.destroy
        render :show, status: :ok
      else
        render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def set_contact
      @contact = Contact.find_by!(id: params[:id], creator: current_api_user)
    end

    def contact_params
      params.permit(:first_name, :last_name, :email, :phone_number)
    end
  end
end
