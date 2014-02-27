class ContentsController < ApplicationController
  before_action :current_user, only: [:create, :destroy]

  def index
    contents = current_user.contents.all

    contents = { contents: contents }
    render json: contents
  end

  def create
    @contents = current_user.contents.build(content_params)
    @contents.save
    render json: @contents
  end

  def destroy
    @contents.destroy
    render json: @contents
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