module Api
  class ContactsController < ApplicationController
    before_action :set_contact, only: %i[show edit update destroy]

    def index
      @contacts = Contact.where(creator: current_api_user).order(:last_name, :first_name)
    end

    def show
    end

    def new
      @contact = Contact.new
    end

    def edit
    end

    def create
      @contact = Contact.new(contact_params.merge(creator: current_api_user))
      puts 'in create'
      puts params
      generated_password = Devise.friendly_token.first(8)
      puts 'generated_password'
      puts generated_password
      user = User.create!(:first_name => params["first_name"], :last_name => params["last_name"], :email => params["email"], :password => generated_password, :phone_number => params["phone_number"])

      BarsMailer.welcome_email(user, generated_password).deliver_now

      if @contact.save
        render :show, status: :created
      else
        render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def update
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
