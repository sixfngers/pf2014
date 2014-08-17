$(document).ready(function() {
    






  $('.owl-carousel').owlCarousel({
      items:1,
      loop:true,
      autoplay:true,
      autoplayTimeout:5000,
      controls:true
  });

  var hideTiles = function()
  {
    TweenMax.to($(".tiles"), .5, {css:{autoAlpha:0, display:'none'}, onComplete:this.showDetails});
  }

  var showTiles = function()
  {
    console.log('showDetails');
    TweenMax.to($(".tiles"), .5, {css:{autoAlpha:1, display:'block'}});
  }

  var showDetails = function()
  {
    console.log('showDetails');
    TweenMax.to($(".project-detail"), .5, {css:{autoAlpha:1, display:'block'}});
  }

  var hideDetails = function()
  {
    console.log('hideDetails');
    TweenMax.to($(".project-detail"), .5, {css:{autoAlpha:0, display:'none'}, onComplete:this.showTiles});
  }

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