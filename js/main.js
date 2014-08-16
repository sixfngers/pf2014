$(document).ready(function() {
    






  $('.owl-carousel').owlCarousel({
      items:1,
      loop:true,
      autoplay:true,
      autoplayTimeout:5000,
      controls:true
  });

  $('.project-tile').hover( 
      function(){
          $(this).children('.lower').children('.project-roles').animate({marginBottom:'0px'},'fast')
          $(this).children('.upper').children('.tile-thumb').animate({height:'120%'},'slow')
          TweenMax.to($(this), .5, {boxShadow:"2px 2px 2px rgba(0, 0, 0, .2);"});
      },
      function(){
          $(this).children('.lower').children('.project-roles').animate({marginBottom:'8px'},'fast')
          $(this).children('.upper').children('.tile-thumb').animate({height:'100%'},'slow')
          TweenMax.to($(this), .5, {boxShadow:"2px 2px 2px rgba(0, 0, 0, 0);"});
  });

});