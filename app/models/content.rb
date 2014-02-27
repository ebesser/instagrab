class Content < ActiveRecord::Base
  belongs_to :user
  # Orders content in reverse chronological order
  default_scope -> { order('created_at DESC') }

  include ActionView::Helpers::DateHelper

end
