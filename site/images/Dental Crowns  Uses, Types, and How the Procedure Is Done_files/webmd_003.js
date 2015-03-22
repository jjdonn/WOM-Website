/*! webmd.m.articleSave */

/**
* Adds the article save buttons to the top and bottom of articles.
* * @namespace AddArticleSave
*/
webmd.m.addArticleSave = {
	
	/**
	* Bottom Save Button HTML. This and the text will go into the XSL once this is not a prototype
	* @type {String}
	*/
	saveButtonHTML: '<div class="saveThisArticle"><button>{text}</button><div class="articleButtonHover"><h4>Why do I need to register or sign in for WebMD to save?</h4><p>We will provide you with a dropdown of all your saved articles when you are registered and signed in.</p></div></div>',
	
	/**
	* Bottom Save Button Text
	* @type {String}
	*/
	saveButtonText: 'Save This Article For Later',
	
	/**
	* Bottom Save Button CSS. We will make this external if this gets out of the prototype stage
	* @type {String}
	*/
	saveButtonCSS: '.attribution_rdr .pagination_fmt { position:relative; } .saveThisArticle { text-align:right; } .saveThisArticle button { background:#fdfeff url(http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/widgets/checklist/article_save_plus.png) 5px 4px no-repeat;							border:1px solid #eaeaea; border-radius:3px; cursor:pointer; font-size:11px; height:25px; margin:10px 0 0 0; padding:0px 2px 1px 22px; width:175px;} .articleButtonHover { background:url(http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/widgets/checklist/hover_bubble_bg.png) no-repeat; display:none; width:270px; height: 94px; position:absolute; text-align:left; padding:25px 10px 10px; top:51px; left:250px; z-index:999;} .articleButtonHover h4 { color:#90af17; margin:0; } .articleTools .articleButtonHover { left:-28px; top:24px;} #mainContent_area { overflow: visible; }',
	
	
	/**
	* Top Article Tools HTML. This and the text will go into the XSL once this is not a prototype
	* @type {String}
	*/
	topToolsAreaHTML: '<div class="articleTools share_bar clearfix">{saveThisArticle}<div class="testShareThis"><div class="share_content">{shareThisContent}</div></div><div class="testFontSizer"><div class="font_sizer_content">{fontSizerContent}</div></div></div>',
	
		
	/**
	* Top Article Tools CSS. We will make this external if this gets out of the prototype stage.
	* Hate that I have to put !important all over the place, but I have to override stuff that has important in it already :(
	* @type {String}
	*/
	topToolsAreaCSS: '#textArea .share_bar { float:none !important; margin:0 !important; } #textArea .articleTools {border:1px solid #eaeaea; border-radius:3px; padding:3px 5px; width:460px !important; margin:8px 0 !important; position:relative; }     #textArea .articleTools .saveThisArticle { width:195px; float:left; } #textArea .saveThisArticle button { background:#fdfeff url(http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/widgets/checklist/article_save_plus.png) 5px 1px no-repeat; border:none; border-right:1px solid #eaeaea; border-radius:0; cursor:pointer; font-size:11px; height:20px; margin:4px 0 3px !important; padding:0px 2px 1px 15px !important; width:180px !important; }     #textArea .share_content {height:auto !important; float:left !important; width:110px !important; background:none !important; border:none !important; border-right:1px solid #eaeaea !important; margin-top: 5px !important; padding: 0 4px 0 8px !important;} #textArea .share_content p { margin-right:10px;}       #textArea .font_sizer_content { height:auto !important; float:left !important; width:130px !important; background:none !important; border:none !important; margin-top: 5px !important; padding: 0 4px 0 8px !important;} #textArea .font_sizer_content p {float:left !important; margin-right:10px !important; } .biography_fmt .bioBox_fmt { height:170px;} .article_rdr .dotted_footer_fmt { display:none;} ',
		
	/**
	* Init that gets called via Article XSL
	* Adds the bottom Article Save buttons and reformarts the top of the page
	*/
	init: function() {
		var self = this;
		self._addBottomButton();
		
		self._addTopToolsArea();
		
		self._createArticleButtonHandlers();

		//temporary and hackey, but we have to give the browser a breather in order to get the styled content in. This shows the share bar, since we are hiding it earlier to prevent flash of the old one
		setTimeout("$('.articleTools').show()",1000);
	},
	
	/**
	* Combines the HTML/CSS/Text, steals the content out of the current share bar and kills that one. Adds it under the header
	* @private
	*/
	_addTopToolsArea: function(){
		var self = this;
		
		var saveThisButton = webmd.substitute(self.saveButtonHTML, {text:self.saveButtonText});
		
		var topToolsHTML = webmd.substitute(self.topToolsAreaHTML, {saveThisArticle:saveThisButton});
		
		topToolsHTML = webmd.substitute(topToolsHTML, {fontSizerContent:$('.share_bar .font_sizer_content').html()});
		
		topToolsHTML = webmd.substitute(topToolsHTML, {shareThisContent:$('.share_bar .share_content').html()});
	
		var topToolsCSS = '<style type="text/css">' + self.topToolsAreaCSS + '</style>';
		
		$('head').append(topToolsCSS);
						
		$('#textArea').find('.share_bar').remove();
		
		$('#textArea').find('.subhead_fmt:first').after(topToolsHTML);

	},
	
	/**
	* Takes template HTML/CSS/Text and creates an Article Save button at the bottom of the page
	* @private
	*/
	_addBottomButton: function(){
		var self = this;
		
		var buttonHTML = webmd.substitute(self.saveButtonHTML, {text:self.saveButtonText});
	
		var buttonCSS = '<style type="text/css">' + self.saveButtonCSS + '</style>';
		
		$('head').append(buttonCSS);
				
		$('div.attribution_rdr').find('.pagination_fmt').append(buttonHTML);
		
	},

	/**
	* Takes some logic out of the the header bookmark_page function as we wanted to setup a custom app id.
	* In the future, we should enhance that bookmark_page function to have this logic in it.
	* @private
	*/
	_showLoginOrBookmark: function() {

		// overriding the header function for getting promo app to hardcode 27, which is the app for saving a bookmark.
		// This is easier for the prototype rather than making updates to webmd.p.header and going through change control
		webmd.p.header.getPromoApp = function(){
			return 27;
		};

		// calls the global bookmark_page function. In the future, we will push app id 27 into this function, which will be used
		// instead of the getPromoApp function, but for now, we are hacking away, since this is a prototype
		webmd.p.header.bookmark_page();
	},
	
	/**
	* Assigns click handlers to the top and bottom article save buttons. Setting up 2 handlers as we want different omniture onlicks
	* @private
	*/
	_createArticleButtonHandlers: function() {

		var self = this;
		
		// add click handler for bottom save this button with its own metrics
		$('.pagination_fmt .saveThisArticle button').click(function(){
			wmdPageLink('art-save_bot');
			self._showLoginOrBookmark();
			return false;
		});
		
		// add click handler for top save this button with its own metrics
		$('.articleTools .saveThisArticle button').click(function(){
			wmdPageLink('art-save_top');
			self._showLoginOrBookmark();
			return false;
		});

		// if the user is not signed in
		if(!webmd.cookie.exists("WBMD_AUTH")) {
			// add hover handler for save this buttons to pop up teaser overlay
			$('.saveThisArticle button').hoverIntent({
				over:function(){
					var p = ($(this).parent().parent().hasClass('pagination_fmt')) ? '2' :'1';
					wmdPageLink('art-save_imp-' + p);
					$(this).siblings('.articleButtonHover').show();
				}, out:function(){
					$(this).siblings('.articleButtonHover').hide();
				}, timeout: 250
			});
		}

		
		// tie in event handlers again, since we lost them when we killed the old font sizer
		webmd.m.fontSizer.events();
	}
	
};

/**
* putting this on window.load because webmd.p.header isn't there as it webmd.loads.
* Will put this in a better spot when it's out of prototoype stage
*/
$(window).load(function(){
	/**
	 * Duckpunching built in callback to header. This gets executed after user bookmarks something
	 */
	var tempAddBMSSuccess = webmd.p.header.addBMSsuccess;
	
	webmd.p.header.addBMSsuccess = function() {
		tempAddBMSSuccess();
		webmd.p.header.createMyWebMDPagesTour.init();
	};

	/**
	* Creates the Mini Tour when user adds to My WebMD Pages
	* @namespace p.header.createMyWebMDPagesTour
	*/
	webmd.p.header.createMyWebMDPagesTour = {
		
		/**
		* Tooltip HTML Container
		* @type {String}
		*/
		tooltip_container: '<div class="top_middle"><div class="content">{content}</div></div><div class="bottom"><a class="close" href="#">X Close</a></div>',
		
		/**
		* Tooltip CSS
		* @type {String}
		*/
		tooltipCSS: '#myWebMDPagesTour {display:none; left:352px; position:absolute; top:-28px; z-index:9999; }      #myWebMDPagesTour .top_middle { background:url(http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/widgets/checklist/mywebmdpages_tooltip_bg.png) no-repeat; height:85px; padding:10px; width:456px; }      #myWebMDPagesTour .bottom { background:url(http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/widgets/checklist/mywebmdpages_tooltip_bg.png) left bottom no-repeat; height:55px; text-align:right; width:456px; }      #myWebMDPagesTour .bottom .close{ font-size:80%; margin-right:50px; }       #myWebMDPagesTour .content { background:url(http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/widgets/checklist/tool_tip_lightbulb.png) 15px 25px no-repeat; padding: 25px 0 0 55px; width:335px; }      #myWebMDPagesTour h3 { color:#88a906; font-size:120%; margin:0 0 8px 0; padding:0; }      #myWebMDPagesTour p, #myWebMDPagesTour ul { font-size: 90%; margin:8px 0; padding:0; } #myWebMDPagesTour ul { list-style:none;	 }      #myWebMDPagesTour ul li { background: url(http://css.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/modules/li_bull_blue.gif) 0 8px no-repeat; padding: 2px 0 0 10px; }',
		
		/**
		* Messages object for default messaging
		* @type {Object}
		*/
		messages:{
			step1_content: '<h3>To access My WebMD Pages</h3><p>Here\'s where you can find links to all of your favorite checklists, articles, slideshows and more. Just "save."</p>',
			step2_content: '<h3>To manage your My WebMD Pages</h3><p>Did you know? You can reorder by dragging and dropping, delete, and rename your links by selecting "Manage My WebMD Pages."</p>'
		},
		
		/**
		* Init that gets called during the callback after a user saves something.
		* Scrolls the window to the top, loads the CSS, creates the tooltip HTML and shows it via CSS
		*/
		init:function() {
			var self = this;

			// we are going to store whether the user saw the tour or not in the ui cookie
			var uiCookie = webmd.cookie.getJson('ui') || {};

			var sawBookmarkTour = uiCookie.bookmarkTour || false;

			// if they haven't seen the tour, show it to them and set the value in the cookie so they won't get it again
			if(!sawBookmarkTour) {
				window.scroll(0,0);
			
				// dropping the CSS inline in order to get around rendering issues in IE
				var tooltipCSS = '<style type="text/css">' + self.tooltipCSS + '</style>';
			
				$('head').append(tooltipCSS);
			
				self._createToolTip();
				self._showToolTip();

				uiCookie.bookmarkTour = true;
				webmd.cookie.setJson('ui', uiCookie);
			}
			
		},
		
		/**
		* Creates the tooltip and inserts it into the DOM
		* @private
		*/
		_createToolTip:function() {
			var self = this;
			
			$('<div/>', {
				id: 'myWebMDPagesTour',
				html: webmd.substitute(self.tooltip_container,{content:self.messages.step1_content}),
				style: 'display:none;'
			}).insertAfter('#reglinks');
	
			self.$tooltip = $('#myWebMDPagesTour');
		},
		
		/**
		* Fades in the HTML for the tour. Had some timing issues with older FF and IE, so threw a dirty 500ms delay. It's a prototype :)
		* Binds the close action to the close button
		* Also binds a handler to the mouse over so the window moves when a user interacts with the bookmars themselves.
		* @private
		*/
		_showToolTip:function() {
			var self = this;
						
			//so hackey, but some browsers aren't appreciating this happening instantly
			$('#myWebMDPagesTour').fadeIn('fast');

			$('#registration_hdr .bookmarks').bind('mouseover',function(){
				self._moveToolTip();
			});
			
			self.$tooltip.find('.close').click(function(){
				self._hideToolTip();
				return false;
			});
		},
		
		/**
		* Handler of the moving. Animates it left and adds in new default messaging.
		* Also creates handler so if the user leaves the bookmars area, the tour will automatically disappear
		* @private
		*/
		_moveToolTip:function() {
			var self = this;
			
			$('#myWebMDPagesTour').animate({left:'100px',top:'5px'},500);
			$('#myWebMDPagesTour').html(webmd.substitute(self.tooltip_container,{content:self.messages.step2_content}));
			
			// removing close button as tour now hides itself
			$('#myWebMDPagesTour .close').hide();
			
			// when you come off the header divs, remove the tour, same logic as the bookmark hiding itself
			var overlay_divs = $(".login_rdr div[id$='_hdr']");
			$(overlay_divs).bind('mouseleave', function(e){ self._hideToolTip(); });
		},
		
		/**
		* Hides tooltip via CSS
		* @private
		*/
		_hideToolTip:function() {
			var self = this;
			self.$tooltip.fadeOut(500);
		},
		
		/**
		* Destroys tooltip by removing from the DOM
		* @private
		*/
		_killToolTip:function() {
			var self = this;
			self.$tooltip.remove();
		}
	};
});

/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);


// This is here to hide the flash of unstyled content. We are moving the toolbar and the old toolbar shows up for a bit. This would go away for deployment
var tempShareBarCSS = '<style type="text/css">#textArea .share_bar, #textArea .font_sizer.font_sizer_fmt {display:none;}</style>';
$('head').append(tempShareBarCSS);

// For testing only. This will move into article XSL for deployment
$(function(){
	var pageIsSponsored = s_sponsor_program || false;
	var pagePortal = s_channel_super_portal || '';

	// if we are not sponsored and we are not part of fit, let's do some tools
	if((!pageIsSponsored) && (pagePortal !== 'FIT')) {
		webmd.m.addArticleSave.init();
	}
});