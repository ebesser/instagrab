# Needs to add these columns so I can retrieve information re: who the content was "grabbed" from or who sent the content to the user
class AddSendAndReceiveDetailsToContents < ActiveRecord::Migration
  def change
    add_column :contents, :grabbed_from_id, :integer
    add_column :contents, :received_from_id, :integer
  end
end
