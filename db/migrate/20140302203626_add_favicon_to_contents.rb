class AddFaviconToContents < ActiveRecord::Migration
  def change
    add_column :contents, :favicon, :string
  end
end
