require([ "./vendor/raphael-min" ], function (Raphael)
{

	var balloonList = new Array();

	var balloonColors = new Array()
		balloonColors[0] = "#ff403f";
		balloonColors[1] = "#99cf16";
		balloonColors[2] = "#0079c1";
		balloonColors[3] = "#44c8f5";

	function randomInRange(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function floatRight(set, floatOriginX, floatOriginY, radius, scaleString)
	{
		var boundsLeft = (floatOriginX - (radius * .5));
		var boundsRight = (floatOriginX + (radius * .5));
		var boundsTop = (floatOriginY - (radius * .5));
		var boundsBottom = (floatOriginY + (radius * .5));

		var endX = randomInRange(boundsLeft, boundsRight);
		var endY = randomInRange(boundsTop, boundsBottom);
		var endXString = "t"+String(endX)+","+String(endY);

		set.animate({transform:endXString+","+scaleString}, randomInRange(2000,5000), "<>", function(){
			floatLeft(set, floatOriginX, floatOriginY, radius, scaleString);
		});
	}

	function floatLeft(set, floatOriginX, floatOriginY, radius, scaleString)
	{
		var boundsLeft = (floatOriginX - (radius * .5));
		var boundsRight = (floatOriginX + (radius * .5));
		var boundsTop = (floatOriginY - (radius * .5));
		var boundsBottom = (floatOriginY + (radius * .5));

		var endX = randomInRange(boundsLeft, boundsRight);
		var endY = randomInRange(boundsTop, boundsBottom);
		var endXString = "t"+String(endX)+","+String(endY);

    	set.animate({transform:endXString+","+scaleString}, randomInRange(2000,5000), "<>", function(){
			floatRight(set, floatOriginX, floatOriginY, radius, scaleString);
		});
	}


	function drawBalloon(containerName, balloonColor, balloonScale, floatOriginX, floatOriginY, startFloat)
	{

		var floatRadius = 50;
		var paperWidth = 1200;
		var paperHeight = 900;

		var container = document.getElementById(containerName);
    	var paper = Raphael(container, paperWidth, paperHeight);

    	var balloonString = paper.rect(51, 99, 1, 240); 
    		balloonString.attr({fill: '#ffffff', stroke: '#ffffff', 'stroke-width': 0, "stroke-opacity":0});

    	var balloon = paper.circle(50, 50, 100);  
    		balloon.attr({fill: balloonColor, stroke: balloonColor, 'stroke-width': 0, "stroke-opacity":0});

		var brokenPieceColor = balloonColor;
			//brokenPieceColor = "#ff0000"
    	var broken0 = paper.path("M-22.651-0.622c0,0,3.683-35.73,46.548-36.963L38.02,0.107L13.67-12.402l11.329,46.744L4.073,3.975L-22.651-0.622z").attr({fill:brokenPieceColor, stroke:brokenPieceColor, "stroke-opacity":0, "stroke-width": 0, "stroke-opacity":0});
    	var broken1 = paper.path("M101.873-27.759c0,0,15.336,11.599,15.031,28.255l-54.71,45.319L98.766-5.925L73.628-1.146l17.793-20.027L57.255-45.815C57.255-45.815,90.107-35.934,101.873-27.759z").attr({fill:brokenPieceColor, stroke:brokenPieceColor, "stroke-width": 0, "stroke-opacity":0});
    	var broken2 = paper.path("M142.584,55.612c0,0-2.971,47.203-39.982,60.566L69.485,97.372l44.812-6.074l-13.277-37.5l16.947,20.471L142.584,55.612z").attr({fill:brokenPieceColor, stroke:brokenPieceColor, "stroke-width": 0, "stroke-opacity":0});
    	var broken3 = paper.path("M29.938,140.556c-3.677-0.913-23.472-8.681-23.472-8.681l23.998-7.362l13.453-23.406l2.638,25.772L63.43,91.378l-1.054,35.24l40.877,2.102l-42.726,13.677l-7.12,5.521C53.357,148.711,42.167,143.596,29.938,140.556z").attr({fill:brokenPieceColor, stroke:brokenPieceColor, "stroke-width": 0, "stroke-opacity":0});
    	var broken4 = paper.path("M-46.333,69.667c0,0,24.616,50.022,40.622,52.991l21.698-47.242c0,0-6.557,10.304-19.183,9.132c-12.627-1.171-25.935-3.243-32.066-8.58C-41.396,70.627-46.333,69.667-46.333,69.667z").attr({fill:brokenPieceColor, stroke:brokenPieceColor, "stroke-width": 0, "stroke-opacity":0});	


    	var balloonKnot = paper.path("M 51 140 l -7 19 l 14 2 z"); 
    		balloonKnot.attr({fill: balloonColor, stroke: balloonColor, stroke:balloonColor,'stroke-width': 0, "stroke-opacity":0});  

    	var brokenBalloonPieces = paper.set();
    		brokenBalloonPieces.push(broken0);
    		brokenBalloonPieces.push(broken1);
    		brokenBalloonPieces.push(broken2);
    		brokenBalloonPieces.push(broken3);
    		brokenBalloonPieces.push(broken4);

		var balloonElements = paper.set();
		    balloonElements.push(balloon);		    
			balloonElements.push(balloonKnot);
			balloonElements.push(balloonString);

		var fullBalloon = paper.set();
			fullBalloon.push(balloonElements);
			fullBalloon.push(brokenBalloonPieces);
		
		// fullBalloon.click(	function(evt)
		// 					{
		// 						popBalloon(floatOriginX, floatOriginY, balloonElements, broken0, broken1, broken2, broken3, broken4);
		// 					}
		// );
		
		var endXString = "t"+String(floatOriginX)+","+String(floatOriginY);
		var scaleString = "s"+String(balloonScale)+","+String(balloonScale)+",50, 50";

    	balloonElements.transform(endXString+scaleString);
    	brokenBalloonPieces.transform(endXString+scaleString);

		if(startFloat)
		{
			floatRight(fullBalloon, floatOriginX, floatOriginY, floatRadius, scaleString);
		}	

		var propsObject = {};
			propsObject.floatOriginX = floatOriginX;
			propsObject.floatOriginY = floatOriginY;
			propsObject.balloonElements = balloonElements;
			propsObject.brokenBalloonPieces = brokenBalloonPieces;

		balloonList.push(propsObject);
	}


	function popBalloon(floatOriginX, floatOriginY, set, brokenPiece0, brokenPiece1, brokenPiece2, brokenPiece3, brokenPiece4)
	{
		var min = 300;
		var max = 400;

		var time = 500;
		var fadeTime = time;

		// console.log(floatOriginX, floatOriginY, set, brokenPiece0, brokenPiece1, brokenPiece2, brokenPiece3, brokenPiece4);

		var broken0EndXString = "t"+String(floatOriginX - randomInRange(min, max))+","+String(floatOriginY - randomInRange(min, max));		
		brokenPiece0.animate({transform: broken0EndXString+"s0, 0, 50, 50"}, time,'bounce');
		brokenPiece0.animate({ "fill-opacity": "0" }, fadeTime - 100, "easeIn");

		var broken1EndXString = "t"+String(floatOriginX + randomInRange(min, max))+","+String(floatOriginY - randomInRange(min, max));
		brokenPiece1.animate({transform: broken1EndXString+"s0, 0, 50, 50"}, time,'bounce');
		brokenPiece1.animate({ "fill-opacity": "0" }, fadeTime, "easeIn");

		var broken2EndXString = "t"+String(floatOriginX + randomInRange(min, max))+","+String(floatOriginY + randomInRange(min, max));
		brokenPiece2.animate({transform: broken2EndXString+"s0, 0, 50, 50"}, time,'bounce');
		brokenPiece2.animate({ "fill-opacity": "0" }, fadeTime, "easeIn");

		var broken3EndXString = "t"+String(floatOriginX)+","+String(floatOriginY + randomInRange(min, max));
		brokenPiece3.animate({transform: broken3EndXString+"s0, 0, 50, 50"}, time,'bounce');
		brokenPiece3.animate({ "fill-opacity": "0" }, fadeTime, "easeIn");

		var broken4EndXString = "t"+String(floatOriginX - randomInRange(min, max))+","+String(floatOriginY + randomInRange(min, max));
		brokenPiece4.animate({transform: broken4EndXString+"s0, 0, 50, 50"}, time,'bounce');
		brokenPiece4.animate({ "fill-opacity": "0" }, fadeTime, "easeIn");

		set.animate({ "fill-opacity": "0" }, 50);
	}


	function drawFloatingUpBalloon(containerName, paperWidth, paperHeight, boundsLeft, boundsRight, balloonColor, balloonScale, floatOriginX, floatOriginY, floatCeiling, time)
	{
		var container = document.getElementById(containerName);
    	var paper = Raphael(container, paperWidth, paperHeight);

    	var balloonString = paper.rect(51, 99, 1, 240); 
    		balloonString.attr({fill: '#ffffff', stroke: '#ffffff', 'stroke-width': 0});

    	var balloon = paper.circle(50, 50, 100);  
    		balloon.attr({fill: balloonColor, stroke: balloonColor, 'stroke-width': 0});

    	var balloonKnot = paper.path("M 51 140 l -7 19 l 14 2 z"); 
    		balloonKnot.attr({fill: balloonColor, stroke: balloonColor, 'stroke-width': 0});  

		var balloonElements = paper.set();
		    balloonElements.push(balloon);
			balloonElements.push(balloonKnot);
			balloonElements.push(balloonString);
		
		var endXString = "t"+String(floatOriginX)+","+String(floatOriginY);
		var scaleString = "s"+String(balloonScale)+","+String(balloonScale)+",50, 50";

    	balloonElements.transform(endXString+scaleString);

		floatUp(balloonElements, floatOriginX, paperHeight, boundsLeft, boundsRight, paperWidth, scaleString, floatCeiling, time);			
	}


	function floatUp(set, floatOriginX, floatOriginY, boundsLeft, boundsRight, radius, scaleString, floatCeiling, time)
	{
		var boundsLeft = boundsLeft;
		var boundsRight = boundsRight;
		var boundsTop = (floatOriginY - (radius * .5));
		var boundsBottom = (floatOriginY + (radius * .5));

		var endX = randomInRange(boundsLeft, boundsRight);
		var endY = floatCeiling;
		var endXString = "t"+String(endX)+","+String(endY);

  //   	set.animate({transform:endXString+","+scaleString}, randomInRange(2000,3000), ">", function(){
		// 	set.paper.clear();
		// });

		// var anim = Raphael.animation({transform:endXString+","+scaleString}, time, ">", function(){destroyBalloon(set)});
		// 	anim.delay = 500;

		// set.animate(anim);


		//set.animate(anim.delay(randomInRange(0, 500))); // run the given animation after 500 ms

		set.animate({transform:endXString+","+scaleString}, time, "<", function(){
			destroyBalloon(this);
		});
	}

	function destroyBalloon(element)
  	{
  		//console.log(element);
  		element.items[0].remove();
        element.items[1].remove();
        element.items[2].remove();

        element.paper.canvas.parentNode.removeChild(element.paper.canvas);
  	}








	drawBalloon("balloon0", balloonColors[3], 2, 150, 0, false);
	drawBalloon("balloon1", balloonColors[0], 1.6, 600, 90, false);
	drawBalloon("balloon2", balloonColors[1], 2.2, 400, 120, false);
	drawBalloon("balloon3", balloonColors[1], 2.4, 884, 60, false);
	drawBalloon("balloon4", balloonColors[2], 2.2, 190, 380, true);
	drawBalloon("balloon5", balloonColors[2], 3.2, 800, 380, true);
	drawBalloon("balloon6", balloonColors[1], 1.4, 120, 600, true);
	drawBalloon("balloon7", balloonColors[0], 2.2, 900, 160, true);
	drawBalloon("balloon8", balloonColors[0], 2.6, 420, 500, true);

	// console.log(balloonList);


	document.getElementById("initially-hidden-content").style.display = "block";
	document.getElementById("intro-text").style.visibility = "visible";

	var toPop = -1;
	var popperButton = document.getElementById('intro-button');
	popperButton.addEventListener('click',startPopChain,false);

	var balloonsToPop = new Array();
		// balloonsToPop[0] = new Array("balloon4", balloonList[7]);
		// balloonsToPop[1] = new Array("balloon0", balloonList[6]);
		// balloonsToPop[2] = new Array("balloon1", balloonList[3]);
		// balloonsToPop[3] = new Array("balloon2", "balloon5", balloonList[8], "intro-button");
		// balloonsToPop[4] = new Array("balloon-container");
		

		balloonsToPop[0] = new Array(balloonList[4]);
		balloonsToPop[1] = new Array(balloonList[7]);
		balloonsToPop[2] = new Array(balloonList[0]);
		balloonsToPop[3] = new Array(balloonList[6]);
		balloonsToPop[4] = new Array(balloonList[1]);
		balloonsToPop[5] = new Array(balloonList[8]);
		balloonsToPop[6] = new Array(balloonList[2]);
		balloonsToPop[7] = new Array(balloonList[5]);
		balloonsToPop[8] = new Array(balloonList[3], "intro-button");
		balloonsToPop[9] = new Array("balloon-container");

		// for quick testing cause its annoying popping the balloons
		// balloonsToPop[0] = new Array("balloon-container");


	function startPopChain()
	{
		popperButton.removeEventListener('click',startPopChain,false);
		clearInterval(introInterval);
		var introInterval = setInterval(incrementPop, 100);
	}
	
	
	function incrementPop()
	{

		toPop++;
		var last = Object.size(balloonsToPop);

		//console.log("last "+last+" toPop "+toPop);


		if(toPop < last)
		{

			var popObject = balloonsToPop[toPop];
			
			for(var index in popObject)
			{
				if(typeof popObject[index] == "string")
				{
					document.getElementById(popObject[index]).style.display = "none";					
				}
				else
				{

					popBalloon(		popObject[index].floatOriginX
								, 	popObject[index].floatOriginY
								, 	popObject[index].balloonElements
								,	popObject[index].brokenBalloonPieces[0]
								,	popObject[index].brokenBalloonPieces[1]
								,	popObject[index].brokenBalloonPieces[2]
								,	popObject[index].brokenBalloonPieces[3]
								,	popObject[index].brokenBalloonPieces[4]
								);
				}
			}

			if(toPop >= last - 1)
			{
				//console.log("show video");
				setupVideoInteraction();
			}
			
		}
		else
		{
			//console.log("no more balloons to pop");
			clearInterval(introInterval);
		}
	}

	Object.size = function(obj)
	{
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};


	//var introInterval = setInterval(incrementPop, 1500);
	var introInterval = setInterval(startPopChain, 5000);





/*
/////////////////////
		VIDEO
/////////////////////
*/
	
	var videoElement = document.getElementById('videoelement');
	var playButton = document.getElementById('initial-play-button');
	var controls = document.getElementById('video-controls');

	function setupVideoInteraction()
	{
		playButton.addEventListener('click',togglePoster,false);
		controls.addEventListener('click',toggleVideoPause,false);
		videoElement.style.visibility = "visible";

		videoElement.addEventListener('ended',videoEnded,false);
    	videoElement.addEventListener('pause',videoPause,false);
    	videoElement.addEventListener('play',videoPlay,false);
	}

	function togglePoster()
	{
		showControls();
		hideInitialPlayButton();
		videoElement.play();
	}

	function toggleVideoPause()
	{
		if(videoElement.paused)
		{
		    videoElement.play();
		    videoPlay();
		}
		else
		{
		    videoElement.pause();
		    videoPause();
		}
	}

	function showInitialPlayButton()
	{
		playButton.style.visibility = "visible";
	}

	function hideInitialPlayButton()
	{
		playButton.style.visibility = "hidden";
	}

	function hideControls()
	{
		controls.style.visibility = 'hidden';
	}

	function showControls()
	{
		controls.style.visibility = 'visible';
	}
	
	function videoEnded()
	{
    	
    	showInitialPlayButton();
    	hideControls();
	}
	
	function videoPlay()
	{
    	showControls();
    	controls.className = "play-pause-pause";
    }
    
    function videoPause()
	{
    	showControls();
    	controls.className = "play-pause-play";
    }
		        



	/*
	///////////////////////////////////
			social rollovers
	///////////////////////////////////
	*/
	$( ".no-touch .social_icon" ).hover(
		function()
		{
			
			$( this ).children( ".social_hover" ).animate({top: "8px", "opacity":"1"}, 300);
		}

		,function()
  		{
  			$( this ).children( ".social_hover" ).animate({top: "0px", "opacity":"0"}, 300);
  		}
  	);

  	
  	/*
	///////////////////////////////////
			lower link rollovers
	///////////////////////////////////
	*/
	
	$( ".no-touch .link-container" ).hover(
		function()
		{
			var item = $(this);
			item.children( ".lower-link-text" ).children("a").css( "color", "#ec037b" );
			item.children( ".link-subtext" ).children("a").css( "color", "#ec037b" );
			item.children( ".left-link-arrow" ).animate({"opacity":"1", "margin-left": "30px", "margin-right": "0px"}, 300);
			item.children( ".right-link-arrow" ).fadeTo( 0, 0 );

  		}

  		,function()
  		{
			var item = $( this );
  			item.children( ".lower-link-text" ).children("a").css( "color", "#ffffff" );
  			item.children( ".link-subtext" ).children("a").css( "color", "#ffffff" );
  			item.children( ".left-link-arrow" ).animate({"opacity":"0", "margin-left": "0px", "margin-right": "8px"}, 300);
			item.children( ".right-link-arrow" ).fadeTo( 300, 1 );
  		}
  	);

  	/*
	//////////////////////////////////////////
			upper link balloon rollovers
	//////////////////////////////////////////
	*/
	
	$( ".no-touch .balloon-link" ).hover(
		function()
		{
			$(this).addClass("rotation-loop");
			$(this).children("a").children(".cta-image").css("margin-top", "-27px");
  		}

  		,function()
  		{
			$(this).removeClass("rotation-loop");
			$(this).children("a").children(".cta-image").css("margin-top", "0");
  		}
  	);

  	$( ".no-touch .knows-link" ).hover(
		function()
		{
			$( this ).children( ".knows-logo-image" ).animate({"top": "200px"}, 100);
			
			// var minColor = 0;
			// var maxColor = 2;
			// drawFloatingUpBalloon("hover-balloon-container", 228, 220, 0, 180, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 130), randomInRange(300, 900), -300, randomInRange(1000, 1500));
			// drawFloatingUpBalloon("hover-balloon-container", 228, 220, 0, 180, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 130), randomInRange(300, 900), -300, randomInRange(700, 2000));
			// drawFloatingUpBalloon("hover-balloon-container", 228, 220, 0, 180, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 130), randomInRange(300, 900), -300, randomInRange(1400, 2500));

			var total = randomInRange(2, 3);

			var minColor = 0;
			var maxColor = 2;

			var paperHeight = 230;
			var originY = paperHeight;
			var balloonTime = 2000;

			for(var i = 0; i<total; i++)
			{
				var balloonScale = randomInRange(25, 50);
					balloonScale *= .01;

				if(i > 0)
				{
					originY = randomInRange(paperHeight, 600);
					balloonTime = randomInRange(1600, 3200)
				}

				//	containerName, paperWidth, paperHeight, boundsLeft, boundsRight, balloonColor, balloonScale, floatOriginX, floatOriginY, floatCeiling, time
				drawFloatingUpBalloon("hover-balloon-container", 228, paperHeight, 0, 180, balloonColors[randomInRange(minColor, maxColor)], balloonScale, randomInRange(0, 130), originY, -300, balloonTime);
			}
  		}

  		,function()
  		{
  			$( this ).children( ".knows-logo-image" ).animate({"top": "192px"}, 300);
  		}
  	);

  	$( ".no-touch .cat-link" ).hover(
		function()
		{
			var total = randomInRange(2, 5);

			var minColor = 0;
			var maxColor = 2;

			var paperHeight = 670;
			var originY = paperHeight + 30;
			var balloonTime = 4000;

			for(var i = 0; i<total; i++)
			{
				var balloonScale = randomInRange(30, 70);
					balloonScale *= .01;
				
				if(i > 1)
				{
					originY = randomInRange(paperHeight, 1800);
					balloonTime = randomInRange(3000, 6000);
				}
					
				//	containerName, paperWidth, paperHeight, boundsLeft, boundsRight, balloonColor, balloonScale, floatOriginX, floatOriginY, floatCeiling, time
				drawFloatingUpBalloon("cat-balloons-svg", 418, paperHeight, 0, 300, balloonColors[randomInRange(minColor, maxColor)], balloonScale, randomInRange(0, 330), originY, -(randomInRange(800, 1000)), balloonTime);	
			}

			
			// drawFloatingUpBalloon("cat-balloons-svg", 418, 670, 0, 300, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 330), randomInRange(670, 1800), -(randomInRange(800, 1200)), randomInRange(2700, 4000));
			// drawFloatingUpBalloon("cat-balloons-svg", 418, 670, 0, 300, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 330), randomInRange(670, 1800), -(randomInRange(800, 1200)), randomInRange(3400, 4500));
			// drawFloatingUpBalloon("cat-balloons-svg", 418, 670, 0, 300, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 330), randomInRange(670, 1800), -(randomInRange(800, 1200)), randomInRange(3000, 3500));
			// drawFloatingUpBalloon("cat-balloons-svg", 418, 670, 0, 300, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 330), randomInRange(670, 1800), -(randomInRange(800, 1200)), randomInRange(2700, 4000));
			// drawFloatingUpBalloon("cat-balloons-svg", 418, 670, 0, 300, balloonColors[randomInRange(minColor, maxColor)], .3, randomInRange(0, 330), randomInRange(670, 1800), -(randomInRange(800, 1200)), randomInRange(3400, 4500));
  		}

  		,function()
  		{

  		}
  	);

});




