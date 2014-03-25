// JS To Display All Users on Platform With Follow/Unfollow Capability

// Function creations a new relationship with the current user being the follower and the clicked user being the following user
var createRelationship = function(currentUser, followingUser){
  $.ajax({
    url: '/relationships',
    dataType: 'json',
    method: 'post',
    data: { 
      relationship: {
       follower_id: currentUser,
       followed_id: followingUser
      }
    },
    success: function(){
      console.log("relationship added")
    }
  })
}

// Function deletes a relationship between current user and other user (unfollow)
var deleteRelationship = function(currentUser, followingUser){

  $.ajax({
    url: '/relationships/delete_relationship',
    dataType: 'json',
    method: 'post',
    data: { 
      relationship: {
       follower_id: currentUser,
       followed_id: followingUser
      }
    },
    success: function(){
      console.log("relationship deleted")
    }
  })

}


// User Backbone Begins
var User = Backbone.Model.extend({

})

var UserCollection = Backbone.Collection.extend({

  url: '/users',

  model: User

})

var UserView = Backbone.View.extend({

  initialize: function(){

  },

  template: function(attrs){
    var template_html = $('#all_users_template').html();
    var template = _.template(template_html);
    return template(attrs)
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes))

    return this
  },

  events: {
  'click #follow_user_button' : 'followUser',
  'click #unfollow_user_button' : 'unfollowUser'
  },

  // Follows a user and re-renders the ListView
  followUser: function(){
    createRelationship(CU.id, this.model.id);
    console.log(CU.id, this.model.id);
    new UserListView(); 
  },
  // UnFollows a user and re-renders the ListView
  unfollowUser: function(){
    deleteRelationship(CU.id, this.model.id);
    console.log(CU.id, this.model.id);  
    new UserListView();  }
})


var UserListView = Backbone.View.extend({

  initialize: function(){

    this.collection = new UserCollection();
    this.listenTo(this.collection, "sync", this.render);

    this.collection.fetch();

  },


  el: function(){
    return $('#user_list');
  },


  render: function(){
    var self = this;
    self.$el.html('')
    var userList = this.collection.models;
    _.each(userList, function(user){
    var userView = new UserView({ 
      model: user
    })
    userView.render()
    // console.log(userList)
    self.$el.append(userView.$el)
    return this
  })
  }

})

// Unnecessary Backbone Code

// var templateFunc =  function(attrs){
//     var template_html = $('#user_template').html();
//     var template = _.template(template_html);
//     return template(attrs)
// }


// var fetchCallback = function(collection){
  
//   var userList = collection.models;
//   _.each(userList, function(user){
//     var html = templateFunc(user.attributes)
//     $('#user_list').append(html)
//   })
// }

// User Backbone Ends

$(function(){

  window.userListView = new UserListView();

})