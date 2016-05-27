$(document).ready(function(){   			
	function closeMenu() {
    	var width = $(window).width();
    	
    	
    	if (width <= 600) {
    		var ul = $('ul');
    		ul.addClass('fadeOut');
    		document.body.style.overflow = "scroll";
    		$('body').unbind('touchmove');
    			
    		setTimeout(function(){
    			ul.removeClass('fadeOut').removeClass('fadeIn');
            }, 250);
        }
	}
    // Mobile Nav Handling
	$('.mobile-toggle').click(function(){
		
		// Get ul element
		var ul = $('ul');
		
		// If menu is being shown, hide it
		if (ul.hasClass('fadeIn')) {
			ul.addClass('fadeOut');
			document.body.style.overflow = "scroll";
			$('body').unbind('touchmove');
			
			setTimeout(function(){
    			ul.removeClass('fadeOut').removeClass('fadeIn');
            }, 250);
        // If menu is hidden, show it
		} else {
		    ul.removeClass("fadeOut").addClass('fadeIn');
		    document.body.style.overflow = "hidden";
		    $('body').bind('touchmove', function(e){e.preventDefault()})
        }
	});
	

    // Smooth scrolling
	$(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 50
            }, 1000);
            closeMenu();
            return false;
          }
        }
      });
    });
    
    $('form').submit(function(){
       var email = $('input[type=email]').val();
       if (email != '') {
            $('input[type=submit]').attr('disabled','disabled');
           $.ajax({
               type: "POST",
               url: "https://ghostcompanion.us12.list-manage.com/subscribe/post?u=9e48b8135958b975c2034a41e&amp;id=e8c32a1532",
               data: { EMAIL: email } 
            }).fail(function(e) {
                $('form').addClass("fadeOut");
                 setTimeout(function() {
                    $('.success').removeClass("hide").addClass("fadeIn");
                }, 300);
            }).done(function(response){
                $('form').addClass("fadeOut");
                setTimeout(function() {
                    $('.success').removeClass("hide").addClass("fadeIn");
                }, 300);
                
            });
        }
       
       return false;
    });

	
	/* Initialize FastClick.js */
	window.addEventListener('load', function () {
    	FastClick.attach(document.body);
    }, false);
});