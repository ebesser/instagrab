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
  end


end