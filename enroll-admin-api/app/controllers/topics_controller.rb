class TopicsController < ApplicationController
  before_action :set_topic, only: %i[edit update destroy]

  def new
    @topic = Topic.new(sponsor_id: params[:sponsor_id])
  end

  def edit
  end

  def create
    @topic = Topic.new(topic_params)

    if @topic.save
      redirect_to @topic.sponsor, notice: 'Topic was successfully created.'
    else
      render :new
    end
  end

  def update
    if @topic.update!(topic_params)
      redirect_to @topic.sponsor, notice: 'Topic was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @topic.destroy
      redirect_to @topic.sponsor, notice: 'Topic was successfully destroyed.'
    else
      redirect_to @topic.sponsor, alert: @topic.errors.full_messages.to_sentence
    end
  end

  private

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:name, :sponsor_id)
  end
end
