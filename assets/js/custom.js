$(document).ready(function () {

    $("#history").glide({
        type: "carousel"
    });


  if ($(window).width() < 768) {
        // do something for small screens
    // set path for small images
    $('.lazy').each(function() {
      var datasrc = $(this).attr('data-src')
      if(datasrc){
        var lastSlashIndex = datasrc.lastIndexOf('/')
        var newdatasrc = datasrc.slice(0, lastSlashIndex + 1) + 'small/' + datasrc.slice(lastSlashIndex)
        $(this).attr('data-src', newdatasrc)
      }
    })
    //
  }
  else if ($(window).width() >= 768 &&  $(window).width() <= 992) {
        // do something for medium screens
    // set path for medium images
    $('.lazy').each(function() {
      var datasrc = $(this).attr('data-src')
      if(datasrc){
        var lastSlashIndex = datasrc.lastIndexOf('/')
        var newdatasrc = datasrc.slice(0, lastSlashIndex + 1) + 'medium/' + datasrc.slice(lastSlashIndex)
        $(this).attr('data-src', newdatasrc)
      }
    })
  }
  else  {
        // do something for big screens
  }

  $(".lazy").unveil();
});
