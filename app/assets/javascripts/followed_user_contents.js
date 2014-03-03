// Function to allow for dynamic sorting in JS

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


// Getting the individual user's id from the url
var userId = window.location.pathname.split('/')[2];


// Followed Content Backbone Begins

var Content = Backbone.Model.extend({



})

var ContentCollection = Backbone.Collection.extend({


  url: '/users/'+userId,

  model: Content

})

var ContentView = Backbone.View.extend({

  initialize: function(){

  },

  template: function(attrs){
    var template_html = $('#followed_user_content_template').html();
    var template = _.template(template_html);
    return template(attrs)
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }

})


var ContentListView = Backbone.View.extend({

  initialize: function(){


    this.collection = new ContentCollection();
    this.listenTo(this.collection, "sync", this.render)
    // this.listenTo(this.collection, "remove", this.render)



    this.collection.fetch();

  },


  el: function(){
    return $('#content_list');
  },


  render: function(){
    var self = this;
    self.$el.html('')
    var contentList = this.collection.models;
    var sorted = contentList.sort(dynamicSort('-id'))
    _.each(sorted, function(content){
    var contentView = new ContentView({ 
      model: content
    })
    contentView.render()
    // console.log(contentList)
    self.$el.append(contentView.$el)
    return this
  })
  }



})

var templateFunc =  function(attrs){
    var template_html = $('#followed_user_content_template').html();
    var template = _.template(template_html);
    return template(attrs)
}


var fetchCallback = function(collection){
  
  var contentList = collection.models;
  _.each(contentList, function(content){
    var html = templateFunc(content.attributes)
    $('#content_list').append(html)
  })
}

// Followed Content Backbone Ends


// Need to change the content parameter to just set the default value of user_id to current user?
var grabIt = function(){
  $('.grab_button').on('click', function(){
    var $url = ($(this).parent().find('span').text());
    console.log($url);
      $.ajax({
      url: '/contents',
      dataType: 'json',
      method: 'post',
      data: { content:
        {url: $url, grabbed_from_id: userId}
      },
      success: function(){
        console.log('data')
      }
    })
  });
  
}

$(function(){
  window.contentListView = new ContentListView();
  // Had to run this function after the page is fully loaded to let all of the content load before calling them
  window.setTimeout(grabIt, 2000)
})