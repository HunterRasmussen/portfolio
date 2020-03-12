

$(document).on("scroll", function () {
  var pageTop = $(document).scrollTop()
  var pageBottom = pageTop + $(window).height() * 7/8
  var tags = $("section") 

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i]
    if ($(tag).position().top < pageBottom) { 
      $(tag).addClass("visible")
  }
}
})

$(document).ready(function(){
    var pageTop = $(document).scrollTop()
  var pageBottom = pageTop + $(window).height() * 7/8
  var tags = $("section") 

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i]
    if ($(tag).position().top < pageBottom) { 
      $(tag).addClass("visible")
    }
  }   

  tags = $(".loadin")
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i]
    $(tag).addClass("visible")
  }
});