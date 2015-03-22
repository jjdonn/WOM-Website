/*
* Tablet Core Navigation Override
*/

// Prevent FOUC when swapping pagination below
var style = '<style type="text/css">.ua_type_tablet .pagination_fmt, .ua_type_tablet .pagination { visibility:hidden }</style>';
$("head").append(style);

$(function(){
	//Cache navigation object
	var $nav_fmt = $('#nav_fmt');

	//Nullify href attributes of top level nav links
	$nav_fmt.find('> ul > li > a:first-child').attr("href", "#");

	//Kill pure css hover effect by overriding display cascade
	$nav_fmt.find('.navTab').css('display','none');

	//Prepend links to landing pages nav drop downs
	$('<li><a href="/a-to-z-guides/common-topics/default.htm" onclick="return sl(this,\'\',\'hicb tn_2_img\');" tabindex="-1">All Health A-Z</a></li>').prependTo('#nav_fmt div.tab2nav div.navDrop:first-child > ul');
	$('<li><a href="/a-to-z-guides/healthy-living/default.htm" onclick="return sl(this,\'\',\'hicb tn_4_img\');" tabindex="-1">All Healthy Living Topics</a></li>').prependTo('#nav_fmt div.tab4nav div.navDrop:first-child > ul');
	$('<li><a href="/teens/default.htm" onclick="return sl(this,\'\',\'hicb tn_7_img\');" tabindex="-1">Teen Health</a></li>').prependTo('#nav_fmt div.tab7nav div.navDrop:first-child > ul');
	$('<li><a href="/pets/default.htm" onclick="return sl(this,\'\',\'hicb tn_8_img\');" tabindex="-1">Pet Health</a></li>').prependTo('#nav_fmt div.tab8nav div.navDrop:first-child > ul');

	//Inject close button to end of nav drop down
	$('<div class="navClose"><a href="#"></a></div>').appendTo('.navTab');

	//Set styles for close button
	$nav_fmt.find('.navTab .navClose a').css('background','none');
	$nav_fmt.find('.navTab .navClose').css({'height':'20px','width':'64px'});
	
	//Remove any 'See All' links from nav drop downs
	$nav_fmt.find('.navseeall').remove();
	
	//Bind nav drop down
	$nav_fmt.find('ul > li > a:first-child').bind('click', function(event){ 
		//Hide any potential open drop downs
        $nav_fmt.find('.navTab').css('display','none');  
        
        //Slide up any potential open drop downs in the login area
        $('#signin_form_hdr,#whyjoin_hdr,#applications_hdr,#bookmarks_hdr').removeClass('active').slideUp();
        
        //Ensure no drop downs are set to display none
        $nav_fmt.find('.navTab div').css('display','block');

        //Display target drop down
		$(this).siblings('.navTab').css('display','block');
        $(this).siblings('.navTab').css('position','absolute');
	});

	//Bind nav close
	$nav_fmt.find('.navTab .navClose a').bind('click', function(event){
		//Close target drop down
		$(this).parent().parent().css('display','none');
	});
	
/************************************************** 
	Login Menu Click Toggle 
**************************************************/
	
	//Cache navigation object
	//var $el = $('#registration_hdr .dd_overlay');
			

                //Toggle only one active menu
                var toggleMenu = function(dropdown) {
                    if($(dropdown).hasClass('active')) {
                        $(dropdown).removeClass('active').slideUp();
                        $('.navTab div').css('display', 'block');
                    } else {
                        $('.login_rdr>div.active').removeClass('active').slideUp();
                        $(dropdown).addClass('active').slideToggle();
                        $('.navTab div').css('display', 'none');
                    }
                };
	
	//Over-ride desktop events
	var updateEvents = function (){
		var $el = $('#registration_hdr .dd_overlay');
		//Check for events in jQuery event object
		if (typeof $el.data('events')==="undefined") {
			//Begin polling for event object
			setTimeout(function(){
				updateEvents($el);
			}, 1000);
		} else {
			//Unbind hover events and replace with click toggle
			$el.unbind();
			$el.filter('.signin').children('a').click(function(e){
				toggleMenu('#signin_form_hdr');
				return false;
			});
			$el.filter('.whyjoin').children('a').click(function(e){
				toggleMenu('#whyjoin_hdr');
				return false;
			});
			$el.filter('.applications').children('a').click(function(e){
				toggleMenu('#applications_hdr');
				return false;
			});
			$el.filter('.bookmarks').children('a').click(function(e){
				toggleMenu('#bookmarks_hdr');
				return false;
			});
		}
	}
	
	updateEvents();
	
	/**
	 * @namespace Namespace for testing of article pagination on tablet and core
	 * 
	 */

	webmd.m.articlePagination = {
		/**
		* Place holder for pagination jQuery object
		* @type {jQuery}
		*/
		$pagination : "",
		/**
		* Total number of Pages
		* @type {integer}
		*/
		totalPages : 0,
		/**
		* Current Page
		* @type {integer}
		*/
		currentPage : 0,
		/**
		* Flag set if Pagination HTML pattern found
		* @type {boolean}
		*/
		hasPagination : false,
		/**
		* Initialize Tablet Pagination
		*/
		init: function() {
			// Don't touch FIT pages
			if (typeof s_channel_super_portal !== 'undefined' && s_channel_super_portal !== 'FIT') {
				this.articleVer1();
				this.articleVer2();
				if (this.hasPagination) {
					this.replacePagination();
				}
			}
		},
		/**
		* Test for Article ver1 pattern, scrape pagination data, and prepare for replacement
		*/
		articleVer1: function() {
			if ($('.article_rdr').siblings('.attribution_rdr').children('.pagination_fmt').length > 0) {
				// Set Flag
				this.hasPagination = true;
				// Cache jQuery object
				this.$pagination = $('.article_rdr').siblings('.attribution_rdr').children('.pagination_fmt');
				
				// Remove cruft elements like <style> before scraping data
				$('.pagination_fmt .right_fmt :not(span,a)').remove();
				
				// Grab total pages and current page from HTML
				this.totalPages = parseInt($('.pagination_fmt .right_fmt > :last').text());
				this.currentPage = parseInt($('.pagination_fmt .right_fmt .current_fmt').text());
				
				// Apply proper CSS class
				this.$pagination.removeClass().addClass('pagination');
			}
		},
		/**
		* Test for Article ver2 pattern, scrape pagination data, and prepare for replacement
		*/
		articleVer2: function(){
			if ($('#article .pagination').length > 0) {
				// Set Flag
				this.hasPagination = true;
				// Cache jQuery object
				this.$pagination = $('#article .pagination');
				
				// Grab total pages and current page from HTML
				this.totalPages = parseInt($('.pagination .number:last').text());
				this.currentPage = parseInt($('.pagination .current').text());
			}
		},
		replacePagination: function(){
			// Wipe existing HTML
			this.$pagination.html('');
			// Create <select> for use later
			var $select = $('<select id="pageSelect"/>');
		
			// Do CSS stuff here so we don't need to load another stylesheet
			this.$pagination.addClass('clearfix');
			var $css = $('<style type="text/css"/>');
			var spriteURL = image_server_url + '/webmd/consumer_assets/site_images/articles/other/spritePagination.png'
			$css.append('.pagination {clear:both;float:none;text-align:center;margin:0 90px;padding:0;}\n');
			$css.append('.pagination .btn {float:left;height: 26px;width: 27px;background: url('+spriteURL+') no-repeat top left;}\n');
			$css.append('.pagination .btn.next {float:right;background-position: bottom left;}\n');
			$css.append('.pagination select {min-width: 180px;text-align:center;margin:0;line-height:22px;}\n');
			// Over-rides Version 2 Styles 
			$css.append('#article .pagination {clear:both;float:none;text-align:center;margin:0 90px;padding:0 0 20px 0;width:auto;}\n');
			$css.append('.ua_type_tablet .pagination {visibility:visible;}\n');
			$css.appendTo('head');	
		
			// Don't add Previous button on page 1
			if (this.currentPage!=1){
				this.$pagination.prepend('<a class="btn prev" onclick="return sl(this,\'\',\'pagenum-art_prev\');" href="?page='+(this.currentPage-1)+'"><span class="jawsonly">Previous Page</span></a>')
			}
			
			// Don't add Next button on last page
			if (this.currentPage!=this.totalPages){
				this.$pagination.append('<a class="btn next" onclick="return sl(this,\'\',\'pagenum-art_next\');" href="?page='+(this.currentPage+1)+'"><span class="jawsonly">Next Page</span></a>')
			}
			
			// Build SELECT box options
			for (i=1;i<=this.totalPages;i++) {
				$select.append('<option value="'+i+'">Page '+i+' of '+this.totalPages+'</option>');
			}
			
			// Add select to the page and set active option
			this.$pagination.append($select);
			$('#pageSelect').val(this.currentPage);
			
			// Bind Change event
			$('#pageSelect').change(function(){
				sl(this,'','pagenum-art_'+this.value);
				window.location = window.location.pathname+'?page='+this.value;
			});		}
		
	}
	webmd.m.articlePagination.init();
});

