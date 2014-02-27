class ContentsController < ApplicationController
  before_action :current_user, only: [:create, :destroy]

  def create
    @contents = current_user.contents.build(content_params)
    if @contents.save
      redirect_to root_url
    else
      redirect_to root_url
    end
  end

  def destroy
    @contents.destroy
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