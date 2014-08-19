$(document).ready(function() {
<<<<<<< HEAD

  var carousel;
  var dataFile = "data/portfolio.json";
  var jsonObj;

  $.getJSON(dataFile, function(data) {
    // data is a JavaScript object now. Handle it as such

    jsonObj = data;

    _buildTiles(); 
    
  });


  

  var _buildTiles = function()
  {
    var template = 'Welcome! You are at <%= title %>';
    var template = '<div id="<%= pid %>" class="project-tile shadowbox">' + 
                      '<div class="clickable-tile">'+
                      '<div class="upper">'+
                        '<img class="tile-thumb" src="<%= thumb %>">'+
                      '</div>'+
                      '<div class="lower">'+
                        '<div class="project-roles ital-sm"><%= roles %></div>'+
                        '<div class="project-title bold-lg"><%= title %></div>'+
                        '<div class="project-media ital-sm"><%= media %></div>'+
                      '</div>'+
                      '</div>'+
                      '<div class="project-link bold-sm"><a class="live-link" href="<%= link %>" target="_blank"></a></div>'+
                    '</div>';


    var projectTemplate;
 
    var parsedTemplate;
    // = _.template(template,  data );
 

 


    var projectListObj = jsonObj.projectlist;
    

    for (var projectObj in projectListObj)
    {
      if (projectListObj.hasOwnProperty(projectObj)) 
      {
          projectTemplate = {
            pid : projectListObj[projectObj].project_id,
            thumb : projectListObj[projectObj].thumb,
            title : projectListObj[projectObj].project_id,
            roles : projectListObj[projectObj].roles,
            media : projectListObj[projectObj].type,
            link : projectListObj[projectObj].live_link
          };

          parsedTemplate = _.template(template,  projectTemplate );
          console.log(projectObj);
          var tile = $('.tile-wrapper');
          
          tile.append(parsedTemplate);
          tile.id = projectListObj[projectObj].project_id;
          
          console.log('link', projectTemplate.link);


          if(projectTemplate.link.length == 0)
          {
            console.log($('#'+tile.id+' .project-link').addClass('hidden'));
          }
            // tile.children('.project-link').addClass('hidden');



      }
    }

    $('.clickable-tile').click(function() {
      hideTiles($(this).parent()[0].id);
    });

    $('.project-link').click(function(e) {
      // e.preventDefault();
      // console.log($(e.target).children(".live-link").attr('href'));
      window.open($(e.target).children(".live-link").attr('href'));
    });
=======
    






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
>>>>>>> b9515ce0ef7c08ccee8703ebd602c1f9a310f7a6


    $('.no-touch .project-tile').hover( 
        function(){
            $(this).children('.clickable-tile').children('.lower').children('.project-roles').animate({marginBottom:'0px'},'fast')
            $(this).children('.clickable-tile').children('.upper').children('.tile-thumb').animate({height:'120%'},'slow')
            TweenMax.to($(this), .5, {boxShadow:"2px 2px 2px rgba(0, 0, 0, .2);"});
        },
        function(){
            $(this).children('.clickable-tile').children('.lower').children('.project-roles').animate({marginBottom:'8px'},'fast')
            $(this).children('.clickable-tile').children('.upper').children('.tile-thumb').animate({height:'100%'},'slow')
            TweenMax.to($(this), .5, {boxShadow:"2px 2px 2px rgba(0, 0, 0, 0);"});
    });

    $('.back').click(function(){
      hideDetails();
    });
  }

  var populateDetails = function(projectid)
  {
    console.log("populateDetails "+projectid)
    var projectListObj = jsonObj.projectlist;
    var project;
    var projectDetail;
    for (var projectObj in projectListObj)
    {
      if (projectListObj.hasOwnProperty(projectObj)) 
      {
          if(projectListObj[projectObj].project_id == projectid)
          {
            project = projectListObj[projectObj];  
            projectDetail = project.detail[0];
            break;
          };
        }
    }

    console.log("populateDetails "+projectDetail)

    hideHeaderText(project.header_text);

    $("#full_title").text(projectDetail.title);
    $("#full_description").text(projectDetail.description);

    $(".header-bg-image").attr('src', project.header_image);

    setupCarousel(projectDetail.images);
  }

  var hideTiles = function(projectid)
  {
     $("#bg-image").removeClass('grayscale-filter');
    console.log('hideTiles');
    TweenMax.to($(".tiles"), .5, {css:{autoAlpha:0, display:'none'}, onComplete:showDetails, onCompleteParams:[projectid]});
    TweenMax.to($(".fill-overlay"), .5, {css:{autoAlpha:0}, delay:.3});

  }

  var showTiles = function()
  {
    console.log('showTiles');
    TweenMax.to($(".tiles"), .5, {css:{autoAlpha:1, display:'block'}});
    TweenMax.to($(".fill-overlay"), .5, {css:{autoAlpha:.8, onComplete:addGrayscaleFilter}});
  }

  var showDetails = function(projectid)
  {
    populateDetails(projectid);
    console.log('showDetails '+projectid);
    $(".project-detail").removeClass('hidden');

    TweenMax.to($(".project-detail"), .5, {css:{autoAlpha:1, display:'block'}, onComplete:resizeCarousel});
  }

  var hideDetails = function()
  {
    $(".header-bg-image").attr('src', "img/ab3-header-bg.jpg");
    console.log('hideDetails');
    TweenMax.to($(".project-detail"), .5, {css:{autoAlpha:0, display:'none'}, onComplete:showTiles});
  }

  var setupCarousel = function(imageList)
  {
    // if(carousel !== 'undefined')
    // {
    //   console.log(carousel);
    //   //carousel.destroy();
    // }

    var template = '<div class="item"><img src="<%= imgsrc %>"> </div>'
    var data;

    var html = '';
    $("#carousel-wrapper").text(html);
    html += '<div class="owl-carousel">';


    for (var imageObj in imageList)
    {
      if (imageList.hasOwnProperty(imageObj)) 
      {
          data = { imgsrc : imageList[imageObj].asset};
          html += _.template(template,  data );
      }
    }

    html += '</div>';

    $("#carousel-wrapper").append(html);

    carousel = $('.owl-carousel').owlCarousel({
      items:1,
      loop:true,
      autoplay:true,
      autoplayTimeout:5000,
      controls:true
    });
  }

  var hideHeaderText = function(updatedText)
  {
    var completeFunc;
    var completeFuncParams;
    if(updatedText !== 'undefined')
    {
      completeFunc = showHeaderText;
      completeFuncParams = [updatedText];  
    }

    console.log(updatedText)
    
    TweenMax.to($("#header-text"), .3, {css:{autoAlpha:0, display:'none'}, onComplete:showHeaderText, onCompleteParams:[updatedText]});
  }

  var showHeaderText = function(updatedText)
  {
    console.log(updatedText)
    $("#header-text").text(updatedText);
    TweenMax.to($("#header-text"), .3, {css:{autoAlpha:1, display:'block'}});
  }

  var addGrayscaleFilter = function()
  {
    $("#bg-image").addClass('grayscale-filter');
  }

  var resizeCarousel = function()
  {
    console.log('resizeCarousel');
    $('.owl-carousel').data().owlCarousel.e._onResize();
  }

});