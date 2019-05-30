class TopicsController < ApplicationController
  before_action :set_topic, only: %i[show edit update destroy]

  def index
    @topics = Topic.all.order(:name)
  end

  def show
  end

  def new
    @topic = Topic.new
  end

  def edit
  end

  def create
    @topic = Topic.new(topic_params.merge(creator: current_admin))

    if @topic.save
      redirect_to @topic, notice: 'Topic was successfully created.'
    else
      render :new
    end
  end

  def update
    if @topic.update(topic_params)
      redirect_to @topic, notice: 'Topic was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @topic.destroy
      redirect_to topics_url, notice: 'Topic was successfully destroyed.'
    else
      redirect_to topics_url, alert: @topic.errors.full_messages.to_sentence
    end
  end

  private

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:name, :owner_type, :owner_id)
  end
end
