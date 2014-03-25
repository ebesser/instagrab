#instaGrab

Add It. Share It. Grab It. The easiest way to save, share, and discover content from the web.

[instaGrab](http://getinstagrab.herokuapp.com/)


##Product Description
instaGrab allows users to save web-based content and url's onto their profiles, share their saved content with friends, and add their friends content to their profiles. 

With the use of a bookmarkelt, instaGrab is very similar to Instapaper and Pocket, but with a social component

##Technologies Used

- Rails 4
- JavaScript/jQuery
- Backbone.js
- Pismo Gem
- Bookmarklet (written in JavaScript)

##Code Snippet
Bookmarklet Code.

```
javascript:var url = document.URL; var user_id = <%= current_user.id  %>;   
      $.ajax({     
        url: 'http://getinstagrab.herokuapp.com/api_test',     
        dataType: 'json',     
        method: 'get',     
        data: { content: {user_id: user_id, url: url} },     
        success: function(){       
          console.log('snatched')     
        }   
      });
```
Unique method within Content Controller to allow for bookmarkelt to snatch url from external source
```
def api_handler

    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Expose-Headers'] = 'ETag'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match'
    headers['Access-Control-Max-Age'] = '86400'
    puts "-------------------------------------"
    puts params
    params = content_params
    user = content_params[:user_id]
     # A slash at the end causes an error, the function below deletes a '/' if it finds it at the end of the url
    if params[:url].last == '/'
      array = params[:url].split("")
      array.pop
      params[:url] = array.join
    end
    # This allows me to set the title and favicon of the url through the use of the Pismo Gem
    params[:title] = Pismo[params[:url]].title
    params[:favicon] = Pismo[params[:url]].favicon || nil
    Content.create(params)
    render json: { messaage: 'works'}
  end
```

