class Content < ActiveRecord::Base
  belongs_to :user
  # Orders content in reverse chronological order when called
  default_scope -> { order('created_at DESC') }

end
