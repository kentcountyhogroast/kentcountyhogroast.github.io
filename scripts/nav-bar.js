var navShowing = false;
$( ".menu" ).click(function(e) {
  if(!navShowing) {
    $('.drop-down').show();
    navShowing = true;    
  } else {
    navShowing = false;
    $('.drop-down').hide();
  }
});

$(window).resize(function() {
  if(window.innerWidth > 640){
    $('.drop-down').hide();
  }
});

$(document).click(function(event) { 
    if(!$(event.target).closest('.menu').length) {
        if($('.drop-down').is(":visible")) {
            $('.drop-down').hide();
            navShowing = false;
        }
    }        
})

$(window).on('mousewheel', function(){
  $('.drop-down').hide();
  navShowing = false;  
});