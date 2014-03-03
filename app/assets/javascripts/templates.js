<script id ="content_template" type="text/template">
  <a target="_blank" href=<%= url %>>
  <div class='content_box'>
    <% if (favicon) { %>
     <div><img src=<%= favicon %> /><div>
    <% } %>
    <div>
      <p><%= title %><p>
    </a>
      <button id="content_delete_button">delete</button>
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
<div><%= title %><span style="display: none; visibility: hidden;"><%= url %></span><button class="grab_button">grab it</button></div> 

</script>

<script id="all_users_template">
<%= name %>
<% if (followed === false) { %>
<button id='follow_user_button'>follow</button>
<% } else { %>
<button id='unfollow_user_button'>unfollow</button>
<% } %>
</script>

