// For Handlebars to work?
 _.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

 var Content = Backbone.Model.extend({

  delete: function(){
    content_list_view.collection.remove(this);
  }

})

var ContentView = Backbone.View.extend({
  initialize: function(){

    this.render()
    this.listenTo( window.list, "remove", function(content){
      content.destroy({
        url: "/contents"
      });
    })

  },

   template: function(attrs){
    var template_html = $('#content_view').html();
    var template = _.template(template_html);
    return template(attrs)
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes))
  },

// Need to add delete button to each url
  events: {
    "click .delete":"destroyContent",
  },

  destroyContent: function(){
    this.mode.delete();
  }

})

var ContentList = Backbone.Collection.extend({

  initialize: function () {
  
    this.bind('all', function () {
     listView.render();
    })
  },

  url: '/contents',

  model: Content
})

var ContentListView = Backbone.View.extend({
  initialize: function(){
   
    // console.log(this.collection)
    this.views = [];

  },

  el: function(){
    return $('#content_list');
  },

  render: function(){
    $.ajax({
    url:"/contents",
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      var source = $('#content_view').html(),
        template = Handlebars.compile(source),
        templateData = template(data);

        $('#all_content').append(templateData);
    }

  })
  }

})

var FormView = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.render();
  },

  el: function(){
    return $('#form_container')
  },

 template: function(){
    var template_html = $('#content_form').html();
    var template = _.template(template_html);
    return template();
  },

  render: function(){

    this.$el.append(this.template());
  },

  events: {
    "click #content_add_button" : "createContent"
  },

  createContent: function(e){
    e.preventDefault();
    var $url = $('#content_url').val();

    window.list.create({
      url: $url
    });
    // console.log(window.list)
    this.resetInput();
  },

  resetInput: function(){
    $('#content_url').val("");
  }
})



$(function(){
  window.list = new ContentList();
  window.formView = new FormView();
  window.listView = new ContentListView({collection: list});
  window.listView.collection.fetch();

})