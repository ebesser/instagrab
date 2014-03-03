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
    @users = User.where.not(id: current_user.id).all
    @relationships = Relationship.all
    # Determining if the current_user 'follows' another user to determinte whether the button should read "follow" or "unfollow"
    @users.each do |user|
      if @relationships.where(follower_id: current_user.id, followed_id: user.id).count > 0
        user[:followed] = true
      else
        user[:followed] = false
      end
    end
    respond_to do |format|
      format.html
      format.json { render json: @users }
    end

    # add a key of relationship that is a boolean to see if there is a relationship. pass this through an ajax call and then see if there is a relationship
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