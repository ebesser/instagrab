<script id ="content_view" type="text/template">
  
  {{#contents}}
    <p>{{url}}</p>
  {{/contents}}

</script>

<script id="content_form" type="text/template">
<form>
    <input type="text" id="content_url" placeholder="Content Goes Here..." />
    <button class= "btn btn-primary" id="content_add_button">Post</button>
  </form>
</script>