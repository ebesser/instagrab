// JS For Current User's Content With Delete Functionality and Drag and Drop ShareIt Functionality


// Function to allow for dynamic sorting in JS. Can be called anywhere

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

// Content Backbone Begins

var Content = Backbone.Model.extend({



})

var ContentCollection = Backbone.Collection.extend({


  url: '/contents',

  model: Content

})

var ContentView = Backbone.View.extend({

  initialize: function(){

  },

  template: function(attrs){
    var template_html = $('#content_template').html();
    var template = _.template(template_html);
    return template(attrs)
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes))
// Begin draggable code on render
    this.$el.draggable({
      revert: true,
// Once the dragging starts, we decrease the opactiy of other items
// Appending a class as we do that with CSS
      drag: function () {
        $(this).addClass("active");
        $(this).closest(".content_box").addClass("active");
      },

// Removing the CSS classes once dragging is over.
      stop: function () {
        $(this).removeClass("active").closest(".content_box").removeClass("active");
        },

// Increases dragged item's opacity 
      opacity: 0.35,
      // Slowly reverts the dragged item back into position
      revertDuration: 1500,
// Allows the user to auto-scroll while dragging item
      scroll: true


    });
    // debugger
// End of draggable code on render
    return this
  },

  events: {
  'click #content_delete_button' : 'deleteContent'
  },

  deleteContent: function(){
    this.model.destroy({
      url: '/contents/'+this.model.id
    })
    contentListView.collection.remove(this);
  }
})


var ContentListView = Backbone.View.extend({

  initialize: function(){

    this.collection = new ContentCollection();
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, "remove", this.render)



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


var FormView = Backbone.View.extend({

  initialize: function(){

  },

  el: function(){
    return $('#form_container')
  },

  template: function(attributes){
    var template_html = $('#content_form').html();
    var template = _.template(template_html);
    return template(attributes);
  },

  render: function(){
    this.$el.append(this.template({}));
    return this
  },

  events: {
    'click #content_add_button' : 'createContent'
  },

  createContent: function(e){
    e.preventDefault();
    var $url = $('#content_url').val();
    console.log($url)
    contentListView.collection.create({
      url: $url
    });
    this.resetInput();
    contentListView.render();
  },
  

  resetInput: function(){
    $('#content_url').val("");

  }


})


var templateFunc =  function(attrs){
    var template_html = $('#content_template').html();
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

// Content Backbone Ends


// Begin shareIt functions - shares url/content with droppable user
var shareIt = function(event, dragged_thing){

// Getting information from the location in which the draggable was dropped into
var user_id = parseInt(event.target.children[0].innerHTML);
console.log(user_id)
var url = dragged_thing.draggable.children().attr('href')
console.log(url)
// Writing the dragged content's information to the dropped user
   $.ajax({
      url: '/contents/share_it',
      dataType: 'json',
      method: 'post',
      data: { content:
        {url: url, user_id: user_id, received_from_id: CU.id}
      },
      success: function(){
        console.log('shared')
      }
    })

}
// End shareIt Function



// Droppable Users begins
var droppable = function(){
var followersElement = $(".follower")
console.log(followersElement);
// Making each user's div droppable
  $(".follower").each(function(index, follower){
    $(follower).droppable({
      drop: shareIt,
      hoverClass: "hoverdrop",
      tolerance: "pointer"
    });
  })

}

// Droppable names ends

$(function(){

  window.formView = new FormView().render()
  window.contentListView = new ContentListView();
  window.setTimeout(droppable, 2000)


})