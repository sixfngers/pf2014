$(document).ready(function() {

  window.log = function(){} ;
  var href = window.location.href;

  if( href.indexOf('localhost') > -1 || href.indexOf('davidcaneso') > -1)
  {
    window.log = function( msg, obj, _stack ){
        var stack = _stack || false;
        if(typeof window.console != 'undefined' && typeof window.console.log != 'undefined') {
            if (typeof obj !== 'undefined'){
                console.log("LOG :: "+msg, obj, stack);
            } else {
                console.log("LOG :: ", msg);            
            }
        }
    };
  }

  var baseTitle = "David Caneso | "
  var carousel;
  var dataFile = "media/data/portfolio.json";
  var jsonObj;
  var projectsHistoryIds = [];

  $.getJSON(dataFile, function(data) {
    // data is a JavaScript object now. Handle it as such

    jsonObj = data;

    
    _buildTiles();

    window.log("hash "+History.getHash());

    _prepHistory() 

    $(".no-touch .contact-wrapper .icon").hover(
      function(){
        console.log(this)
        $(this).addClass('over');
        $(this).removeClass('out');
      },
      function(){
        $(this).removeClass('over');
        $(this).addClass('out');
      });
      
    
  });


  var _prepHistory = function()
  {  
    var State = History.getState();
    History.log('initial:', State.data, State.title, State.url);
    window.log('initial:', State.data, State.title, State.url);

    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
      // Log the State
      var State = History.getState(); // Note: We are using History.getState() instead of event.state
      History.log('statechange:', State.data, State.title, State.url);
      _checkAllHistoryStates(State);
    });

    window.log("all history states "+projectsHistoryIds);

    var iLimit = projectsHistoryIds.length;
    for(i = 0; i<iLimit; i++)
    {
      if(State.url.indexOf(projectsHistoryIds[i]) > 0)
      {
        window.log("record state for " + projectsHistoryIds[i] + ' = ' + State.url.indexOf(projectsHistoryIds[i]));
        navigateHistory(projectsHistoryIds[i])
        break;
      }
    }
  }

  var _checkAllHistoryStates = function(state)
  {
    var iLimit = projectsHistoryIds.length;
    var nextStateId = "home";

    for(i = 0; i<iLimit; i++)
    {
      if(state.url.indexOf(projectsHistoryIds[i]) > 0)
      {
        window.log("record state for " + projectsHistoryIds[i] + ' = ' + state.url.indexOf(projectsHistoryIds[i]));
        nextStateId = projectsHistoryIds[i];
        break;
      }
    }

    navigateHistory(nextStateId);
  }

  var navigateHistory = function(projectId)
  {
    if(projectId == projectsHistoryIds[0])
    {
      hideDetails();
    }
    else
    {
      var iLimit = projectsHistoryIds.length;
      for(i = 0; i<iLimit; i++)
      {
        window.log('go to projectId '+ projectId)
        if(projectId == projectsHistoryIds[i])
        {
          hideTiles(projectId);
          break;
        }
      }  
    }
  }
  

  var _buildTiles = function()
  {
    var template = 'Welcome! You are at <%= title %>';
    var template = '<div id="<%= pid %>" class="project-tile shadowbox">' + 
                      '<div class="clickable-tile">'+
                      '<div class="upper">'+
                        '<img class="tile-thumb" src="<%= thumb %>">'+
                      '</div>'+
                      '<div class="lower">'+
                        '<div class="project-roles ital-sm"><br /></div>'+
                        '<div class="project-title bold-lg"><%= title %></div>'+
                        '<div class="project-media ital-sm"><%= media %></div>'+
                      '</div>'+
                      '</div>'+
                      '<div class="project-link bold-sm"><a class="live-link" href="<%= link %>" target="_blank"></a></div>'+
                    '</div>';


    var projectTemplate;
 
    var parsedTemplate;
    // = _.template(template,  data );
 

 
    projectsHistoryIds.push('home');

    var projectListObj = jsonObj.projectlist;

    for (var projectObj in projectListObj)
    {
      if (projectListObj.hasOwnProperty(projectObj)) 
      {
          
          projectTemplate = {
            pid : projectListObj[projectObj].project_id,
            title : projectListObj[projectObj].title,
            thumb : projectListObj[projectObj].thumb,
            roles : projectListObj[projectObj].roles,
            media : projectListObj[projectObj].type,
            link : projectListObj[projectObj].live_link
          };

          projectsHistoryIds.push(projectTemplate.pid);

          parsedTemplate = _.template(template,  projectTemplate );
          //console.log(projectObj);

          var tile = $('.tile-wrapper');
          
          tile.append(parsedTemplate);
          tile.id = projectListObj[projectObj].project_id;
          
          //console.log('link', projectTemplate.link);


          if(projectTemplate.link.length == 0)
          {
            $('#'+tile.id+' .project-link').addClass('hidden');
          }
            // tile.children('.project-link').addClass('hidden');



      }
    }

    $('.clickable-tile').click(function() {
      var projectId = $(this).parent()[0].id;
      History.pushState({state:1,rand:Math.random()}, baseTitle + projectId, "?state="+projectId);
      hideTiles(projectId);
    });

    $('.project-link').click(function(e) {
      // e.preventDefault();
      // console.log($(e.target).children(".live-link").attr('href'));
      window.open($(e.target).children(".live-link").attr('href'));
    });


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
      History.pushState({state:0,rand:Math.random()}, baseTitle +'Portfolio', "?state=home");
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

    hideHeaderText(project);

    $("#full_title").html(projectDetail.title);
    $("#full_description").html(projectDetail.description);

    $(".role-list").html(project.roles);
    $(".tech-list").html(project.tech);

    // $(".header-bg-image").attr('src', project.header_image);

    if(projectid == 'about')
    {
      //todo include contact template
    }

    setupCarousel(projectDetail.images);
  }

  var hideTiles = function(projectid)
  {
    console.log('hideTiles');
    TweenMax.to($(".tiles"), .5, {css:{autoAlpha:0, display:'none'}, onComplete:showDetails, onCompleteParams:[projectid]});
  }

  var showTiles = function()
  {
    console.log('showTiles');
    TweenMax.to($(".tiles"), .5, {css:{autoAlpha:1, display:'block'}});
    //TweenMax.to($(".fill-overlay"), .5, {css:{autoAlpha:.8, onComplete:addGrayscaleFilter}});
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
    console.log('hideDetails');
    hideHeaderText();
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

  var hideHeaderText = function(updatedTextObj)
  {
    var obj = {};
    var random = getRandomInt(0, jsonObj.header.sets.length - 1);
    console.log(random);
    if(updatedTextObj == undefined)
    {
      obj.image = jsonObj.header.sets[random].image;
      obj.bw_filter = jsonObj.header.sets[random].bw_filter;
      obj.text = jsonObj.header.sets[random].text;
      obj.textColor = jsonObj.header.sets[random].header_text_color;
      obj.fill_color = jsonObj.header.sets[random].color;
      obj.opacity = jsonObj.header.sets[random].opacity;
      obj.text_width = jsonObj.header.sets[random].text_width;
    }
    else
    {
      obj.image = updatedTextObj.header_image;
      obj.bw_filter = false;
      obj.text = updatedTextObj.header_text;
      obj.textColor = updatedTextObj.header_text_color;
      obj.fill_color = updatedTextObj.header_fill;
      obj.opacity = updatedTextObj.header_fill_opacity;
      obj.text_width = updatedTextObj.header_text_width;
    }

    console.log(obj)
    
    
    TweenMax.to($("#header-text"), .3, {css:{opacity:0}, onComplete:showHeaderText, onCompleteParams:[obj]});
    TweenMax.to($("#bg-image"), .3, {css:{opacity:0}});
    TweenMax.to($(".fill-overlay"), .3, {css:{opacity:0}});
  }

  var showHeaderText = function(updatedTextObj)
  {
    console.log(updatedTextObj)

    $("#header-text").text(updatedTextObj.text);
    $(".header-text-wrapper").css("width", updatedTextObj.text_width);
    $(".header-text-wrapper").css("color", updatedTextObj.textColor);

    $(".fill-overlay").css("background-color", updatedTextObj.fill_color);
    
    if(updatedTextObj.bw_filter)
    {
      $("#bg-image").add('grayscale-filter');  
    }
    else
    {
      $("#bg-image").removeClass('grayscale-filter');
    }
    
    $(".header-bg-image").attr('src', updatedTextObj.image);
    
    TweenMax.to($("#header-text"), .3, {css:{opacity:1, display:'block'}, delay:.5});
    TweenMax.to($(".fill-overlay"), .5, {css:{opacity:updatedTextObj.opacity}, delay:.3});
    TweenMax.to($("#bg-image"), .5, {css:{opacity:1}, delay:.3});
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


  /**
  * Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
  var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});