<script id ="content_template" type="text/template">
  <div class='content_box'>
    <% if (favicon) { %>
     <div><img src=<%= favicon %> /><div>
    <% } %>
    <div>
      <p><%= title %><p><button id="content_delete_button">delete</button>
    </div> 
  </div>
</script>

<script id="content_form" type="text/template">
<form>
    <input type="text" id="content_url" placeholder="Content Goes Here..." />
    <button class= "btn btn-primary" id="content_add_button">Post</button>
  </form>
</script>


<script id ="followed_user_content_template" type="text/template">
 
<% if (favicon) { %>
  <div><img src=<%= favicon %> /><div>
<% } %>
// Added the hidden span so that I could grab the url within my AJAX calls for the grab it functionality to work
 <div><%= title %><span style="display: none; visibility: hidden;"><%= url %></span><button class="grab_button">grab it</button></div> 

</script>