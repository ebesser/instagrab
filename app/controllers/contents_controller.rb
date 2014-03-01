class ContentsController < ApplicationController
  before_action :current_user, only: [:create, :destroy]

  def index
    my_contents = current_user.contents.all
    # contents = Contents.where(user_id: current_user.id)

    # contents = { contents: my_contents }
    render json: my_contents
  end

  def create
    @contents = current_user.contents.build(content_params)
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

  private

    def content_params
      params.require(:content).permit(:url)
    end

    def correct_user
      @contents = current_user.contents.find_by(id: params[:id])
      rescue
        redirect_to root_url
    end



end