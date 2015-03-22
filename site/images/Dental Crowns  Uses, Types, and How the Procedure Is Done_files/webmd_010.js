webmd.m.dynamicNav = {};
webmd.m.dynamicNav.arrangeDynNav = function () {
	var dynNavList = $(".dyn_nav_cont > ul", "#navColumn_ctr");
	if (dynNavList.length && s_topic_dir != 'undefined') {
		if (s_topic_dir == 'true') { 
			/* Append the community link to the end of the topic directories dynamic nav list*/
			$("#centernav_fmt > ul > li:contains('Community')", '#navColumn_ctr').appendTo(dynNavList);
			$("#standardSubnav_fmt > ul > li:contains('Community')", '#navColumn_ctr').appendTo(dynNavList); 
			/* Reset the onlclick for communities last link if exists */
			$(dynNavList).find("li:last > a:contains('Community')").click(function () { 
				/* Get the window type value from the link */
				var winType = $(this).html().substr($(this).html().lastIndexOf("this,\'") + 6, 2); 
				/*  Set to blank if no wintype in original link */
				if (winType == "\',") {
					winType = '';
				}
				/* Grab the module title and the link position*/
				var modTitle = $(this).parents(".dyn_nav").attr("id");
				var linkPos = $(dynNavList).find('li').index($(this).parent()) + 1;
				return sl(this, winType, (modTitle + '_' + linkPos));
			}); 
			/* Remove the programmed nav */
			$("#centernav_fmt", "#navColumn_ctr").remove();
			
			/* special case when guide is already hidden */
			if($("#standardSubnav_fmt", "#navColumn_ctr").css("display") == "none")
			{
				$(".bottom_fmt", "#guidenav_rdr").remove();
			}
			
			$("#standardSubnav_rdr", "#navColumn_ctr").remove();
			$("#ln-gde-2").prev('div[class="moduleSpacer_rdr"]').remove();			

			/* get the current position of the nav in the top content pane of the left rail  */
			var dynNav = $(dynNavList).parents(".dyn_nav");
			var dynNavPos = $('#ContentPane22').children().index(dynNav); 
			/* move the dynamic nav to the top of the content pane if it not already there */
			if (dynNavPos > 0) {
				$('#ContentPane22').prepend(dynNav);
			}

			/* Show the topic directories dynamic nav list  */
			$(dynNavList).parents(".dyn_nav").css("display", "block");
		}
		else {
			$("#guidenav_rdr .top_fmt, #centernav_fmt").css("display", "block");
			$("#standardSubnav_rdr").css("display", "block");
		}
	} 
	/* show the guide nav if the dynamic nav is empty or s_topic_dir is undefined */
	else {
		$("#guidenav_rdr .top_fmt, #centernav_fmt").css("display", "block");
		$("#standardSubnav_rdr").css("display", "block");
	}

}

$(function () {
	webmd.m.dynamicNav.arrangeDynNav();
});