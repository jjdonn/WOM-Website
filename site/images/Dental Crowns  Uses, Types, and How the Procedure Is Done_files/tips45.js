/*
		Daily Tips scripts
		© 2009, WebMD
		$Id: tips.js 1704 2010-09-07 16:10:10Z ialexander $
		
		Author(s): ialexander

*/



if (typeof webmd == "undefined") {
	webmd = {}; webmd.p = {};
}
// Set up a local scope to avoid global variables
(function(w){

// Within here, "w" is a shortcut for the global webmd object

// Private variables
	var base;
	var tipWidth;
	var tipBumper;
	
	var curDate = new Date();
	var tipYear = curDate.getFullYear();
	var tipMonth = curDate.getMonth();
	var adjMonth = tipMonth + 1;
	var tipDate = curDate.getDate();
	
	var curObj = "tipList_" + tipYear + "_" + adjMonth;
	
	var tipOffset = 0;
	var animOffset = 0;
	
	var monthToText = {		
		0 : 'January',
		1 : 'February',
		2 : 'March',
		3 : 'April',
		4 : 'May',
		5 : 'June',
		6 : 'July',
		7 : 'August',
		8 : 'September',
		9 : 'October',
		10 : 'November',
		11 : 'December'
	};		
	
	var afterFirstLoad = false;

	
// Public interface
	w.p.tips = {
		
		config : {
			scriptPath : "scripts/",
			imgPath : "images/",
			upperBound : 1,
			lowerBound : 1,
			allTipsLink: true,
			allTipsURL: "all-tips"
		},
		
		tipBox : {
			
			formatItem: function(itemObj, itemIndex){
				var htmlTemplate = '<div class="tip">\n<div class="tipDate">' + monthToText[curDate.getMonth()] + ' ' + curDate.getDate() + '</div>\n<div class="tipContent">\n<h5>{tipHeader}</h5>&nbsp;<p>{tipText}</p>\n</div>\n</div>\n\n';			
				
				var output = webmd.substitute(htmlTemplate,itemObj);				
				$('.tipContainer', base).append(output);
			},
			
			setupArrows: function() {
				
				var tipTotal = $('.tip', base).length;
				tipOffset = w.p.tips.config.upperBound;
				animOffset = w.p.tips.config.upperBound;
				
				/* on right arrow click, move right, show left arrow if it was hidden, and hide right arrow if at end */
				$('.tipControls .btn_prev', base).click(function() {
					wmdPageLink('dly-tips_prev');
					tipDate--;
					
					handleAnimations("prev");
					
					$('.tipControls .btn_next', base).show();
					
					tipOffset++;
					if ((tipOffset == (tipTotal - 1)) || (tipTotal == 2)) {
						$('.tipControls .btn_prev', base).hide();
						$('.tipControls .btn_prev_disabled', base).show();
					}
				});

				/* on left arrow click, move left, show right arrow if it was hidden, and hide left arrow if at end */
				$('.tipControls .btn_next').click(function() {
					wmdPageLink('dly-tips_next');
					tipDate++;
					
					handleAnimations("next");
					
					$('.tipControls .btn_prev', base).show();
					
					tipOffset--;
					if (tipOffset == 0)  {
						$('.tipControls .btn_next', base).hide();
						$('.tipControls .btn_next_disabled', base).show();
					}
				});					
				
				if ($('.tip').length > 1) {
					if (w.p.tips.config.upperBound > 0) {
						$('.tipControls .btn_next', base).show();
					} else {						
						$('.tipControls .btn_next_disabled', base).show();
					}
					if (w.p.tips.config.lowerBound > 0) {
						$('.tipControls .btn_prev', base).show();
					} else {						
						$('.tipControls .btn_prev_disabled', base).show();
					}
				}

			},
			
			fill: function() {
				/* Set it blank just in case */
				$('.tipContainer', base).html('');
				
				/* Find the initial tip Category and set initial module Background */
				var initCat = w.p.tips[curObj][tipDate].tipCat;
				var initBackground = w.p.tips.config.filePath + w.p.tips.config.imgPath + w.p.tips[curObj].categories[initCat].img;
				var initSponLink = document.createElement('a');
				var initSponImg = document.createElement('img');
				var catObj = w.p.tips[curObj].categories[initCat];
				if (catObj.sponLink && catObj.sponImg && catObj.sponAlt && catObj.sponText) {
					$(initSponLink).attr("href",catObj.sponLink);
					$(initSponImg).attr({
						src: w.p.tips.config.filePath + w.p.tips.config.imgPath + catObj.sponImg,
						alt: catObj.sponAlt
					});				
					$(initSponLink).html(catObj.sponText);
				} else {
					$(initSponLink).attr("href","");
					$(initSponImg).attr({src: "", alt: ""});				
					$(initSponLink).html("");
					$(".attribution", base).hide();
				}
				$(".attribution", base).append(initSponLink);
				$(".attribution", base).append(initSponImg);
				$(".attribution a", base).click(function() {
					return sl(this,"sp","dly-tips_attrb");
				});

				base.css({backgroundImage: "url('" + initBackground + "')"});
				$('h3', base).html(w.p.tips[curObj].categories[initCat].name);
				
				var tipLimitMax = tipDate + w.p.tips.config.upperBound;
				var tipLimitMin = tipDate - w.p.tips.config.lowerBound;	
				
				for (i = tipLimitMin; i < tipDate; i++) {
					if ((typeof(w.p.tips[curObj][i]) == "undefined")) {
						tipLimitMin++;
						w.p.tips.config.lowerBound--;
					}
				}
				
				for (i = tipLimitMax; i > tipDate; i--) {
					if ((typeof(w.p.tips[curObj][i]) == "undefined")) {
						tipLimitMax--;
						w.p.tips.config.upperBound--;
					}
				}
				
				/* Set the date to start at the Upper Bound for creating tip content divs */
				curDate.setDate(curDate.getDate() + w.p.tips.config.upperBound);
												
				for(i=tipLimitMax; i >= tipLimitMin; i--) {
					tipObj = w.p.tips[curObj][i];
					w.p.tips.tipBox.formatItem(tipObj, i);
					curDate.setDate(curDate.getDate() - 1);
				}
				
				$('.tip', base).each(function(index) {
					if (index == 0) {
						$(this).css('left', ((tipWidth * w.p.tips.config.upperBound) + tipBumper) + 'px');
					} else {						
						$(this).css('left',$(this).prev().position().left - tipWidth + 'px');
					}
					$(this).show();
				});
				
				if (w.p.tips.config.allTipsLink) {
					$('.viewAll', base).show();
					$('.viewAll a', base).attr("href",w.p.tips.config.allTipsURL);
					$('.viewAll a', base).html("See All Tips");
					$('.viewAll a', base).click(function() {
						return sl(this,'','dly-tips_more');
					});
				}
				
				w.p.tips.tipBox.setupArrows();
			},
			
			init: function() {				
				base = $('.tipsModule');
				tipWidth = $(".tipContainer", base).width();
				tipBumper = Math.floor((tipWidth - $(".tip", base).width()) / 2);
				
				var fileName = w.p.tips.config.filePath + w.p.tips.config.scriptPath + "tips_" + tipYear + "_" + adjMonth + ".js";
				var t=setTimeout("webmd.p.tips.tipBox.error()", 10000);
				
				$.getScript(fileName, function(){
					clearTimeout(t);
					w.p.tips.tipBox.fill();
				});
			},
			
			error: function() {
				var msg = '<div class="tip">\n<div class="tipDate">&nbsp;</div>\n<div class="tipContent">\n<h5></h5>\n<p>Error: Timeout</p>\n</div>\n</div>\n\n';
				$('.tipContainer', base).html(msg);
				$('.tip', base).css('left', '22px'); 
				$('.tip', base).show();
			}
			
		},
		
		tipPage : {
			
			formatItem: function(itemObj, itemIndex){
				var htmlTemplate = '<div class="tip">\n<div class="tipDate">' + monthToText[curDate.getMonth()] + ' ' + itemIndex + '</div>\n<div class="tipContent">\n<h5>{tipHeader}</h5>&nbsp;<p>{tipText}</p>\n</div>\n</div>\n\n';			
										
				var output = webmd.substitute(htmlTemplate,itemObj);				
				$('.tipContainer', base).append(output);				
			},
			
			fill: function() {
				/* Set it blank just in case */
				$('.tipContainer', base).html('');
				
				/* Set default values to display tips for entire month */
				var tipLimitMax = 31;
				var tipLimitMin = 1;
				
				/* Set a new temp date object to manipulate as needed. Set the current correct month to test against */
				var tempDate = new Date();
				tempDate.setTime(curDate.getTime());
				tempMonth = tempDate.getMonth();
				tempDate.setDate(tipLimitMax);
				
				for (i = tipLimitMax; i > 0; i--) {
					if (tempMonth == tempDate.getMonth()) {
						if ((typeof(w.p.tips[curObj][i]) != "undefined")) {
							tipLimitMax = i;
							break;
						}
					}
					tempDate.setDate(tempDate.getDate() - 1);
				}
				
				/* 
					Check for complete data. If data for the month isnt complete, decrement and try again. 
					When the correct month is set and data has been found, set the upper bound of avail data and break 
				*/
				for (i = tipLimitMin; i < tipLimitMax; i++) {
					if ((typeof(w.p.tips[curObj][i]) != "undefined")) {
						tipLimitMin = i;
						break;
					}
				}
				
				/* Set the date to start at the Lower Bound for creating tip content divs */
				curDate.setDate(tipLimitMin);
												
				for(i=tipLimitMin; i <= tipLimitMax; i++) {
					tipObj = w.p.tips[curObj][i];
					w.p.tips.tipPage.formatItem(tipObj, i);
				}
				
				if (afterFirstLoad) {
					webmd.ads.refresh();
					window.pvIframe.getFile();
					if (typeof(s_pagename) != 'undefined') {
						wmdPageview(s_pagename);
					} else {
						wmdPageview(window.location.href);
					}
				}

				afterFirstLoad = true;
			},
			
			setupControls: function() {
				var setupDate = new Date();
				var output = '<form action="#">\n<label for="monthSelect">Choose a month</label> <select name="monthSelect" id="monthSelect">\n';
				var setupMonth = setupDate.getMonth() + 1;
				var startMonth = false;
				setupDate.setDate(1);
				while (startMonth == false) {
					output += '<option value="' + (setupDate.valueOf()) + '">' + monthToText[setupDate.getMonth()] + ' ' + setupDate.getFullYear() + '</option>\n';
					if ((setupMonth == webmd.p.tips.config.startMonth) && (setupDate.getFullYear() == webmd.p.tips.config.startYear)) {
						startMonth = true;
					}
					setupDate.setMonth(setupDate.getMonth() - 1);
					setupMonth = setupDate.getMonth() + 1;
				}
				output += '</select>\n</form>';
				$('.tipControls', base).append(output);
				$('.tipControls select', base).change(function() {
					var dateVal = $('.tipControls select option:selected', base).val();
					setupDate.setTime(dateVal);
					webmd.p.tips.tipPage.displayMonth((setupDate.getMonth() + 1), setupDate.getFullYear());
				});
			},
			
			displayMonth : function(monthInt, yearInt) {
				var fileName = w.p.tips.config.filePath + w.p.tips.config.scriptPath + "tips_" + yearInt + "_" + monthInt + ".js";
				
				$('.tipContainer', base).html('<img class="loading" src="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/modules/loading_small.gif" alt="Loading. Please wait..." />');
				
				var t=setTimeout("webmd.p.tips.tipPage.error()", 10000);
				
				$.getScript(fileName, function(){
					clearTimeout(t);
					curDate.setMonth(monthInt - 1);
					curDate.setFullYear(yearInt);
					curObj = "tipList_" + yearInt + "_" + monthInt;
					adjMonth = monthInt;
					w.p.tips.tipPage.fill();
				});
			},
			
			init: function() {								
				base = $('.tipsModule');
				var fileName = w.p.tips.config.filePath + w.p.tips.config.scriptPath + "tips_" + tipYear + "_" + adjMonth + ".js";
				
				var t=setTimeout("webmd.p.tips.tipPage.error()", 10000);
				curDate.setDate(1);
				$.getScript(fileName, function(){
					clearTimeout(t);
					w.p.tips.tipPage.fill();
					w.p.tips.tipPage.setupControls();
					document.domain = 'webmd.com';
					var comScoreFrame = '<iframe src="http://img.webmd.com/ajax/pv.html" id="pvIframe" name="pvIframe" style="display: none;"></iframe>';
					base.after(comScoreFrame);
				});
			},
			
			error: function() {
				var msg = '<div class="tip">\n<div class="tipDate">&nbsp;</div>\n<div class="tipContent">\n<h5></h5>\n<p>Error: Timeout</p>\n</div>\n</div>\n\n';
				$('.tipContainer', base).html(msg);
				$('.tip', base).show();
			}
			
		}

	};

// Private functions
	function handleAnimations(dir){				
		var animLag = Math.abs(animOffset - tipOffset);
		if (animLag > 4) {
			animSpeed = 50;
		} else if (animLag > 2) {
			animSpeed = 300;
		} else if (animLag > 0) {
			animSpeed = 500;
		} else {
			animSpeed = 700;
		}
		$('.tip').each(function(index) {
			if (index == 0){
				if (dir == "next") {
					var animDist = "-=" + tipWidth + "px";
					$(this).animate({"left": animDist}, animSpeed, "swing", function(){
						animOffset--;
						if (animOffset == tipOffset) {
							handleTipEffects();
						}							
					});
				} else {					
					var animDist = "+=" + tipWidth + "px";
					$(this).animate({"left": animDist}, animSpeed, "swing", function(){
						animOffset++;
						if (animOffset == tipOffset) {
							handleTipEffects();
						}
					});
				}
			} else {
				if (dir == "next") {
					var animDist = "-=" + tipWidth + "px";
					$(this).animate({"left": animDist}, animSpeed, "swing");
				} else {
					var animDist = "+=" + tipWidth + "px";
					$(this).animate({"left": animDist}, animSpeed, "swing");
				}
			}								
		});					
			
	}
	
	function handleTipEffects() {
		var curCat = w.p.tips[curObj][tipDate].tipCat;
		var newBackground = w.p.tips.config.filePath + w.p.tips.config.imgPath + w.p.tips[curObj].categories[curCat].img;
		
		$('.fade').hide();
		$('.fade').css({backgroundImage: "url('" + newBackground + "')"});
		$('.fade').fadeIn(500, function() {
			base.css({backgroundImage: "url('" + newBackground + "')",zIndex: 0});
		});
		$('h3', base).html(w.p.tips[curObj].categories[curCat].name);
		var catObj = w.p.tips[curObj].categories[curCat];
		if (catObj.sponLink && catObj.sponImg && catObj.sponAlt && catObj.sponText) {
			$(".attribution a", base).attr("href", catObj.sponLink);				
			$(".attribution a", base).html(catObj.sponText);
			$(".attribution img").attr({
				src: w.p.tips.config.filePath + w.p.tips.config.imgPath + catObj.sponImg,
				alt: catObj.sponAlt
			});
			$(".attribution", base).show();
		} else {
			$(".attribution a", base).attr("href", "");
			$(".attribution a", base).html("");
			$(".attribution img").attr({src: "", alt: ""});
			$(".attribution", base).hide();
		}
	}
	

})(webmd); // Pass in global webmd object to set up a shortcut