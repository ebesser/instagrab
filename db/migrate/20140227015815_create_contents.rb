class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.string :url
      t.integer :user_id

      t.timestamps
    end
    # Listed user_id and created_at as an array since we want to recall them in reverse order or creation
    add_index :contents, [:user_id, :created_at]
  end
end
