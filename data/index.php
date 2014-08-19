<?php
	require('./includes/site-doctype.php');
?>
	<head>
		<title>David Caneso | Portfolio 2012</title>
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		
		<!--
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<link rel="canonical" href="" />
		-->
		
		<?php
			//	domain setup for project
			$domain = $_SERVER['HTTP_HOST'];
			
			$deeplinkvalue 	= "flashvars.dl = swfobject.getQueryParamValue('dl');";
			$configfile 	= "flashvars.configxml = './media/xml/siteConfig.xml';";
			$swffile 		= 'shell-100.swf';
			
			require('./includes/site-css.php');
			require('./includes/jsfiles.php');
			require('./includes/site-flashembed.php');
		?> 			
	</head>
	<body>
		<div id="epk">
		<?php
			require('./includes/site-flashwarning.php');
			require('./includes/seo/site-index-altcontent.php');
		?>
		</div>		
	</body>
</html>
