// For Handlebars to work?
//  _.templateSettings = {
//     interpolate: /\{\{\=(.+?)\}\}/g,
//     evaluate: /\{\{(.+?)\}\}/g
// };

 var Content = Backbone.Model.extend({


 })

var ContentView = Backbone.View.extend({
  initialize: function(){

    this.render()
    // this.listenTo( listView.collection, "remove", function(content){
    //   content.destroy({
    //     url: "/contents"
    //   });
    // })

  },

   template: function(attrs){
    var template_html = $('#content_template').html();
    var template = _.template(template_html);
    return template(attrs)
  },

  render: function(){
    var self = this
    console.log(this.model.attributes)
    this.$el.html(this.template(this.model.attributes))
  }


})

var ContentCollection = Backbone.Collection.extend({

  initialize: function () {

  },

  url: '/contents',

  model: function(attrs, options){
    new Content(attrs)
  }
})

var ContentListView = Backbone.View.extend({
  initialize: function(){
   // debugger
    this.collection = new ContentCollection();
    // this.listenTo(this.collection, "all", this.render );
    this.collection.fetch();
    this.views = [];

  },

  el: function(){
    return $('#content_list');
  },


  render: function(){
    debugger
    var self = this;

    // first, remove old views
    _.each( this.views, function(view){
      view.remove();
    })
    
    // then, attach new ones sync'd to existing models
    _.each( this.collection.models , function(content){
      var content_view = new ContentView({
        model: content
      });


      self.$el.append(content_view.$el);
      self.views.push(content_view);
    })
  }

  // render: function(){
  //   $.ajax({
  //   url:"/contents",
  //   method: 'GET',
  //   dataType: 'json',
  //   success: function(data) {
  //     var source = $('#content_view').html(),
  //       template = Handlebars.compile(source),
  //       templateData = template(data);

  //       $('#all_content').append(templateData);
  //   }

  // })
  // }

})

var FormView = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.render();
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
  },

  events: {
    "click #content_add_button" : "createContent"
  },

  createContent: function(e){
    e.preventDefault();
    var $url = $('#content_url').val();
    console.log($url)
    console.log(listView)
    listView.collection.create({
      url: $url
    });
    console.log(window.list)
    this.resetInput();
  },

  resetInput: function(){
    $('#content_url').val("");
  }
})



$(function(){
  // window.list = new ContentList();
  window.formView = new FormView();
  window.listView = new ContentListView(
    // {collection: list}
    );
  // window.listView.collection.fetch();

})