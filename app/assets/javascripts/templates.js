<script id ="content_view" type="text/template">
  <h1>Posts</h1>
<% if current_user.contents.any? %>
  <p>Number of Posts: <%= current_user.contents.count  %></p>
  <% @content.each do |content| %>
    <li>
        <%= content.url %>
        <%= content.created_at %>
        <button>Delete</button>
    </li>
  <% end %>
<% end %>
</script>

<script id="content_form" type="text/template">
<form>
    <input type="text" id="content_url" placeholder="Content Goes Here..." />
    <button class= "btn btn-primary" id="content_add_button">Post</button>
  </form>
</script>