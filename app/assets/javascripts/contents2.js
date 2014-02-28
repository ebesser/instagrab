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
  }


})


var ContentListView = Backbone.View.extend({

  initialize: function(){

    this.collection = new ContentCollection();
    this.listenTo(this.collection, "sync", this.render)


    this.collection.fetch();

  },


  el: function(){
    return $('#content_list');
  },

  render: function(){
    var self = this

    var contentList = this.collection.models;
    _.each(contentList, function(content){
    var contentView = new ContentView({ 
      model: content
    })
    contentView.render()
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

$(function(){

  window.formView = new FormView().render()
  window.contentListView = new ContentListView();

})