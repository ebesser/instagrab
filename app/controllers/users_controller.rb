class UsersController < ApplicationController

  def home
    # Redirecting user who is not signed in to signin page
    unless user_signed_in? 
      redirect_to '/users/sign_in'
    end
    @content = current_user.contents
    @contents = current_user.contents.build
  end

  def index
    @users = User.all
  end

end