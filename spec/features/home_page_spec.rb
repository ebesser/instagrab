require 'spec_helper'
require 'capybara/rails'


describe "User's Home page" do
    before(:each) do
# deleting user so no duplicate logins 
      User.delete_all
      @current_user = User.new(name: "Evan", email: "evanbesser@gmail.com", password: "password") 
      @current_user.save!
      @user2 = User.new(name: "Joe", email: "joe@email.com", password: 'password')
      @user2.save!
      visit '/users/sign_in'
      fill_in 'Email', :with => 'evanbesser@gmail.com'
      fill_in 'Password', :with => 'password'
      click_button 'Sign in'
    end

    it 'allows me to sign in and renders navigation' do
      visit '/'
      page.should have_content("Get The Bookmark!")
    end

    it 'shows my buddy list/followed users' do
      @current_user.follow!(@user2)
      visit '/'
      page.should have_content("Joe")
    end


end