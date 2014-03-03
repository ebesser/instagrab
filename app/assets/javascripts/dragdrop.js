$(function(){
  // Draggable Content
  var draggable = function(){
    $('.content_box').draggable({
      // brings the item back to its place when dragging is over
      revert: true,

      // Once the dragging starts, we decrease the opactiy of other items
      // Appending a class as we do that with CSS
      drag: function () {
        $(this).addClass("active");
        $(this).closest(".content_box").addClass("active");
      },

      // Removing the CSS classes once dragging is over.
      stop: function () {
        $(this).removeClass("active").closest(".content_box").removeClass("active");
        }

    });

  }

  var droppable = function(){
    $("#follower").droppable({

    // The class that will be appended to the to-be-dropped-element 
    activeClass:"active",

    // The class that will be appended once we are hovering the to-be-dropped-element
    hoverClass:"hover",

    // The acceptance of the item once it touches the to-be-dropped-element basket
    // For different values http://api.jqueryui.com/droppable/#option-tolerance
    tolerance:"touch"
    // drop:function (event, ui) {

  
    });


 }
  window.setTimeout(draggable, 2000)
  window.setTimeout(droppable, 2000)

})  