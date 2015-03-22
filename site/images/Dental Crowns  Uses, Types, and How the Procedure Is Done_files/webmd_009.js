// http://img.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/JS/topic-directory/webmd.m.dynrelart.js
webmd.m.dynrelart = {};
webmd.m.dynrelart.arrangeRelArt = function () {

	var suppressRelArt = false, relatedWrapper = $('.related_wrapper');
	if (s_tug === "1363") {
		suppressRelArt = true;
	}

	if (typeof(s_topic_dir) != 'undefined') {
		if (!suppressRelArt && s_topic_dir == 'true') {
			/* grab related wrapper div append related articles and clearing div */
			relatedWrapper.append($('.related_reading_rdr').attr('class', 'dyn_related'));
			relatedWrapper.append('<div class=\"clearing\">  </div>');

			/** Removed the pagination move to keep pagination at the bottom of the article.
			 *  Requested by PBar as part of PVV Initiative
			 *  Implemented: 3 October 2014 mbrewer
			 */


			/* get the pagination if it exists */
			/*	get the other and video contextusl links if they exist
				Note: the slideshow and community contextuals appear inside
				the article body, so they are excluded */
			
			// removed PVV Initiative
			/*
			var pagination = $('.attribution_rdr .pagination_fmt');
			var contextual = $('.other_context_links_rdr, .video_links_rdr');
			var article = $('.article_rdr');
			*/

			/*	if pagination exists, insert must-see articles before the pagination,
				else insert before the next node after the contextual related links,
				else insert before the next node after the article */
			
			// removed PVV Initiative	
			/*
			if (pagination.html()) {
				$(pagination).before(relatedWrapper);
			}
			else if (contextual.html()) {
				$(contextual).after(relatedWrapper);
			}
			else {
				$(article).after(relatedWrapper);
			}
			*/

			/* if the related reading div is set to display none, add addtional wide class name */
			if($(relatedWrapper).children(".dyn_related:nth-child(2)").css("display") == "none" || $(relatedWrapper).children(".dyn_related:nth-child(2)").length === 0) {
				$(relatedWrapper).children(".dyn_related:nth-child(1)").attr('class', 'dyn_related wide');
			}

			/* show the related section */
			if($('.sources_fmt').length){
				if (typeof(s_company) != 'undefined'){
					if(s_company != 'Healthwise'){relatedWrapper.css('display', 'block');}
				}
				else{
					relatedWrapper.css('display', 'block');
				}
			}
		} else {
			relatedWrapper.remove();
		}
	}
};

$(function () {
	webmd.m.dynrelart.arrangeRelArt();
});