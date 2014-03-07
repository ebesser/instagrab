class ContentsController < ApplicationController
  before_action :current_user, only: [:create, :destroy]

  def index
    my_contents = current_user.contents.all
    # contents = Contents.where(user_id: current_user.id)

    # contents = { contents: my_contents }
    render json: my_contents
  end

  def create
    params = content_params
    # A slash at the end causes an error, the function below deletes a '/' if it finds it at the end of the url
    if params[:url].last == '/'
      array = params[:url].split("")
      array.pop
      params[:url] = array.join
    end
    # This allows me to set the title and favicon of the url through the use of the Pismo Gem
    params[:title] = Pismo[params[:url]].title
    params[:favicon] = Pismo[params[:url]].favicon || nil
    @contents = current_user.contents.build(params)
    @contents.save
    render json: @contents
  end

  def new
    @contents = Content.new
  end

  def destroy
    @content = Content.find(params[:id])
    @content.destroy
    render json: {}
  end

  def share_it
    params = content_params
    user = content_params[:user_id]
    # This allows me to set the title and favicon of the url through the use of the Pismo Gem
    params[:title] = Pismo[params[:url]].title
    params[:favicon] = Pismo[params[:url]].favicon || nil
    Content.create(params)
    render json: Content.all
  end

  # This method handles the data coming in from the bookmarklet
  def api_handler

    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Expose-Headers'] = 'ETag'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match'
    headers['Access-Control-Max-Age'] = '86400'
    puts "-------------------------------------"
    puts params
    params = content_params
    user = content_params[:user_id]
     # A slash at the end causes an error, the function below deletes a '/' if it finds it at the end of the url
    if params[:url].last == '/'
      array = params[:url].split("")
      array.pop
      params[:url] = array.join
    end
    # This allows me to set the title and favicon of the url through the use of the Pismo Gem
    params[:title] = Pismo[params[:url]].title
    params[:favicon] = Pismo[params[:url]].favicon || nil
    Content.create(params)
    render json: { messaage: 'works'}
  end

  private

    def content_params
      params.require(:content).permit(:url, :user_id, :grabbed_from_id, :received_from_id, :title, :favicon)
    end

    def correct_user
      @contents = current_user.contents.find_by(id: params[:id])
      rescue
        redirect_to root_url
    end

end