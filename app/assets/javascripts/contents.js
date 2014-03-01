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
    // console.log($url)
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
    $('#all_content').append(html)
  })
}

// Content Backbone Ends

$(function(){

  window.formView = new FormView().render()
  window.contentListView = new ContentListView();

})