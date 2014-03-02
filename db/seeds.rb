require 'faker'

Content.delete_all
User.delete_all

# Seeding Users
20.times do
      User.create(
        name:      Faker::Name.name,
        email:     Faker::Internet.email,
        password:  "password",
        image:     "http://foomandoonian.files.wordpress.com/2009/01/penguin-cartoon.png"
         )
end

# Giving some users content
users = User.all(limit: 6)
  50.times do
    sentence = Faker::Lorem.sentence(5)
    users.each { |user| user.contents.create!(url: sentence) }
  end


# Adding some relationships (follow/followed) to the db
users = User.all
user  = users.first
followed_users = users[2..50]
followers      = users[3..40]
followed_users.each { |followed| user.follow!(followed) }
followers.each      { |follower| follower.follow!(user) }



