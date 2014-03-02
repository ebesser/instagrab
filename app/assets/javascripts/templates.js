<script id ="content_template" type="text/template">
 <div><%= title %><button id="content_delete_button">delete</button></div> 
<hr>
</script>

<script id="content_form" type="text/template">
<form>
    <input type="text" id="content_url" placeholder="Content Goes Here..." />
    <button class= "btn btn-primary" id="content_add_button">Post</button>
  </form>
</script>

<script id ="followed_user_content_template" type="text/template">
 <div><span><%= url %></span><button class="grab_button">grab it</button></div> 

</script>