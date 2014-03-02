class UsersController < ApplicationController

  def home
    # Redirecting user who is not signed in to signin page
    if user_signed_in? 
      @content = current_user.contents
      @contents = current_user.contents.build
    else 
      redirect_to '/users/sign_in'
    end
  end

  def index
    @users = User.all
    respond_to do |format|
      format.html
    render json: @users
  end
  end

  def show
    user_id = params[:id].to_i
    @user = User.find(user_id)
    respond_to do |format|
      format.html 
      format.json { render json: @user.contents }
    end
  end



end