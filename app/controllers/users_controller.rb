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
    render json: @users
  end

  def show
    user_id = params[:id].to_i
      # if user_id = current_user.id
      #   redirect_to '/'
      # else
      @user = User.find(user_id)
      @contents = @user.contents
      # end
  end


end