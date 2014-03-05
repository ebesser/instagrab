<script id ="content_template" type="text/template">
  <a target="_blank" href=<%= url %>>
  <div class='content_box'>
    <% if (favicon) { %>
     <div><img class='my_favicon' src=<%= favicon %> /><div>
    <% } %>
    <div>
      <p class='content_title'><%= title %><p>
    </a>
      <button id="content_delete_button">Delete It</button>
    </div> 
  </div>
</script>

<script id="content_form" type="text/template">
<form>
    <input type="text" id="content_url" placeholder="Enter a URL here..." />
    <button class= "btn btn-primary" id="content_add_button">Add It</button>
  </form>
</script>


<script id ="followed_user_content_template" type="text/template">
  <a target="_blank" href=<%= url %>>
  <div class='content_box'>
    <% if (favicon) { %>
      <div><img class='my_favicon' src=<%= favicon %> /><div>
    <% } %>
<div>
  <p class='content_title'><%= title %><span style="display: none; visibility: hidden;"><%= url %></span></p>
  </a>
  <button class="grab_button">Grab it</button>
  </div> 

</script>

<script id="all_users_template">
<div class='friend'> 
  <img class='all_user_image' src=<%= image %> /></br><%= name %></br>
  <% if (followed === false) { %>
  <button id='follow_user_button'>Friend</button>
  <% } else { %>
  <button id='unfollow_user_button'>Unfriend</button>
  <% } %>
</div>
</script>

