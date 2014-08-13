$(document).ready(function() {
 
  $("#owl-demo").owlCarousel({
    items : 4,
    lazyLoad : true,
    navigation : true
  }); 

	$('.project-tile').hover( 
	    function(){
	    	$(this).children('.lower').children('.project-roles').animate({marginBottom:'0px'},'fast')
	    	$(this).children('.upper').children('.tile-thumb').animate({height:'120%'},'slow')
	    },
	    function(){
	    	$(this).children('.lower').children('.project-roles').animate({marginBottom:'8px'},'fast')
	    	$(this).children('.upper').children('.tile-thumb').animate({height:'100%'},'slow')
    });

});