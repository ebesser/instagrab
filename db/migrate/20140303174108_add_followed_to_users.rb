class AddFollowedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :followed, :boolean
  end
end
