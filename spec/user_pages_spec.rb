require 'spec_helper'

describe "User pages" do

  describe "index" do

    it "should list each user" do
      User.all.each do |user|
        expect(page).to have_selector('p', text: user.name)
      end
    end
  end
end