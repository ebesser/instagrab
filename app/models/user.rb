class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

   #User's posts should be deleted if the User is deleted 
   has_many :contents, dependent: :destroy
   # User's followed associations 
   has_many :relationships, foreign_key: "follower_id", dependent: :destroy
   has_many :followed_users, through: :relationships, source: :followed

   # User's reverse-relationship to get followers
   has_many :reverse_relationships, foreign_key: "followed_id",
                                    class_name:  "Relationship",
                                    dependent:   :destroy
   has_many :followers, through: :reverse_relationships


  def following?(other_user)
    relationships.find_by(followed_id: other_user.id)
  end

  def follow!(other_user)
    relationships.create!(followed_id: other_user.id)
  end

   def unfollow!(other_user)
    relationships.find_by(followed_id: other_user.id).destroy
  end

end
