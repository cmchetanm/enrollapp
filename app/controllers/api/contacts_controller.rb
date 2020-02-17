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
      study = Study.find_by(id: params[:study_id]) || StudyVersion.find_by(id: params[:study_id])
      puts 'in create'
      puts params
      generated_password = rand.to_s[2..7]
      puts 'generated_password'
      puts generated_password
      user = User.new({
        :first_name => params["first_name"],
        :last_name => params["last_name"],
        :email => params["email"],
        :password => generated_password,
        :phone_number => params["phone_number"]
      }.reject {|p| !p.present?})
      user.skip_confirmation!
      user.save!
      BarsMailer.welcome_email(user, generated_password, study, :app, current_api_user&.full_name).deliver_now

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
