/*! webmd.m.mostPopSS */

$(function() {
	
	/**
	 * Most Popular Slideshows
	 */
	webmd.m.mostPopSS = webmd.object(webmd.m.slideshow, {
									 
		// vars
		auto : true,
		autoDelay : 1000,
		autoIncrement : 3000,
		circular : true,
		effect : 'hslider',
		effectParam : 300,
		height: 330,
		slideContainer : 'div.mostpopss_slide',
		width: 264,
		
		init : function() {
			webmd.m.slideshow.init.call(this);
			this.$parent = this.$container.parent();
			this.buildNav().expand();
		},
		
		// navigation
		// @todo need to make navigation codes dynamic based on module name
		buildNav : function() {
			var self = this;
			this.$parent.find('a.mostpopss_nav_prev').click(function() { self.autoStop().trans('-1'); return false; });
			this.$parent.find('a.mostpopss_nav_next').click(function() { self.autoStop().trans('+1'); return false; });
			return this;
		},
		
		// expand parent container to full height after slideshow is built
		expand : function() {
			this.$parent.css({ height: 390, margin: "0 0 1em" }); return this;
		}
		
	});


	/**
	 * Instantiate Most Popular Slideshows
	 */
	$('div.mostpopss_slides').each(function() {
		var ss = webmd.object(webmd.m.mostPopSS, {
			container : this
		});
		ss.init();
	});
	
});
