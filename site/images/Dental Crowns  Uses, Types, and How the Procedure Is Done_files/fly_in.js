/*
 * fly-in object
 *
 * displays fly-in based on the Scribble Live or manual times
 *
 * On-page call:
 *
 * <script type="text/javascript">
 *   require.config({
 *     urlArgs: "bust=" + (Math.floor(new Date().valueOf() / 3600000))
 *   });
 *   require(['fly_in/1/fly_in'], function(flyIn){
 *     flyIn.init('#triggerFlyin');
 *   });
 * </script>
 *
 */

define(['jquery/1/jquery', 'css!fly_in/2/fly_in.css'], function(){

	// jQquery object of the trigger element
	var $trigger,

		// jQquery object that holds flyin html
		$el,

		// whether flyin is currently hidden
		hidden = true,

		// data received from dctm api
		dctm_data,

		// whether scribble live api is currectly loaded
		loaded = false,

		// whether scribble live api is currently loading
		loading = false,

		// if the cookie has been checked or not so it doesn't check more than once and increments too much
		cookie_checked = false,

		// if the flyin should be displayed by cookie value
		cookie_okay = false,

		// the event is now in progress
		in_progress = false,

		// list of customizable options, made accessible outside this function
		options = {

			// id of flyin
			flyin_element_id : 'flyinElement',

			// inner HTML
			inner_html : '<div class="top"><h3>{title}</h3></div><div class="middle"><h4>{when}</h4><p>{text}</p></div><div class="bottom"><a href="{link_2}" data-metrics-link="1">Set a Reminder</a><a href="{link_1}" data-metrics-link="2">Submit Your Question</a><a href="{link_3}" data-metrics-link="3">More Information</a></div><div class="close"><a href="#">Close</a></div>',

			// arbitrary high number
			// this holds either 1 or 0 for the difference in number of the days from the current day to the event day
			days_left : 999,

			// full days to display flyin
			full_days_to_display : 2,

			// maximum number of times to display flyin
			max_display_times : 2,

			// speed at which the flyin animates, in milliseconds
			speed : 500,

			// id of scribble live event
			scribblelive_id : '931196',

			// dctm id of additional info
			// shared module name:  live-events-flyout
			dctm_id : '091e9c5e80d07ec9',

			// manually set start time
			// empty sting or unix time string (13 digits, last 3 are milliseconds)
			// overrides Scribble Live call when set together with end_time
			start_time : '1416250800000',

			// manually set end time
			// empty sting or unix time string (13 digits, last 3 are milliseconds)
			// overrides Scribble Live call when set together with start_time
			end_time : '1416254400000'
		};
		
	// start the flyin
	function startFlyin(){
		// create the element on the page
		$trigger.after('<div id="' + options.flyin_element_id + '" data-metrics-module="prm-flyin"></div>');

		$el = $('#' + options.flyin_element_id);

		// sets up the scroll event to trigger the display of the flyin below a certain point
		$(window).on('scroll', scrollEvent);

		// initially checks
		scrollEvent();
	}

	// the scroll event
	function scrollEvent(){

		// checks each time in case window size changes
		var bottom = $(window).scrollTop() + $(window).height(),
			triggerOffset = $trigger.offset().top;

		if(bottom >= triggerOffset){
			if(hidden){
				flyin();
			}
		} else {
			if(!hidden){
				flyout();
			}
		}
	}

	// action to display the flyin
	function flyin(){

		// if not loaded, this will trigger the loading of the api and return
		if(!loaded){

			// checks cookie once
			if(!cookie_checked){
				showFlyinOrNot()
			}

			// checks if okay to load the flyin by cookie value
			loadFlyin(cookie_okay);

			return false;
		}

		hidden = false;

		$el.stop().animate({'right': '0px'}, options.speed);
	}

	// action to hide the flyin
	function flyout(){
		$el.stop().animate({'right': '-524px'}, options.speed);

		hidden = true;
	}

	// determines whether to display flyin from cookie value
	function showFlyinOrNot(){
		var display_flyin = true,
			ui_cookie = webmd.cookie.getJson('ui');

		cookie_checked = true;

		if(!ui_cookie.aca_p1) {
			ui_cookie.aca_p1 = 1;
		} else {
			ui_cookie.aca_p1 += 1;
		}

		if((ui_cookie.aca_p1 > options.max_display_times) && (webmd.url.getParam('flyin') !== '1')) {
			display_flyin = false;
		}

		webmd.cookie.setJson('ui', ui_cookie, { domain: webmd.url.getSLD() });

		cookie_okay = display_flyin;
	}

	// loads the api
	function loadFlyin(show_flyin){

		var scribblelive_query = '';

		// if not true, will cancel scroll event, make sure the flyin element is hidden, and returns
		if(!show_flyin){
			cancelFlyin();

			return false;
		}

		// if not loaded and not loading, the load the api url
		if(!loaded && !loading){
			loading = true;

			// if the times are hard-coded
			if(options.start_time && options.end_time){
				window.webmd.flyin({ Start: options.start_time, End: options.end_time });
				return false;
			}

			// else call the scribble live url
			scribblelive_query += 'http://apiv1.scribblelive.com/event/' + options.scribblelive_id + '/?Token=QdWW9RSf&format=json&callback=webmd.flyin';
			webmd.load({ js: scribblelive_query });
		}
	}

	// hides flyin by setting cookie value to maximum display times
	function setCookieToHideFlyin(){
		var ui_cookie = webmd.cookie.getJson('ui');
			
		ui_cookie.aca_p1 = options.max_display_times;

		webmd.cookie.setJson('ui', ui_cookie, { domain: webmd.url.getSLD() });
	}	

	// loads the dctm shared module with additional information for the flyin
	function loadSharedModule(){
		require(['repository_service/1/service'], function(dctmService){
			var request = dctmService.get({
				module: options.dctm_id,
				timeout: 10000
			});

			request.done(function(data){
				dctm_data = data || {};
				setupFlyin();
			});

			request.fail(function(){
				cancelFlyin();
			});
		});
	}

	// sets up the html for the flyin
	function setupFlyin(){
		var when = '',
			urls = [],
			obj,
			link_list;

		if(in_progress){
			when = 'Happening Now';
		} else if(options.days_left === 0){
			when = 'Live Event Today';
		} else if(options.days_left === 1){
			when = 'Live Event Tomorrow';
		} else {
			when = 'Live Event in ' + options.days_left + ' days';
		}

		obj = webmd.object.get('webmd_rendition.referenced_objects.object', dctm_data);

		/**
		 * Due to the way PB doesn't consistantly render the list of links, we have to check to see if the object is an array or not
		 *
		 * One link:
		 * "referenced_objects": {
		 *     "object": {
		 *         "@chronic_id": "091e9c5e80d503fe",
		 *         "@thmbnl": "",
		 *         "@pointer": "1",
		 *         "target": {
		 *             "@friendlyurl": "http://live.webmd.com/Event/Health_Insurance_for_Young_Adults"
		 *         }
		 *     }
		 * },
		 *
		 * More than one link:
		 * "referenced_objects": {
		 *     "object": [{
		 *         "@chronic_id": "091e9c5e80d503fe",
		 *         "@thmbnl": "",
		 *         "@pointer": "1",
		 *         "target": {
		 *             "@friendlyurl": "http://live.webmd.com/Event/Health_Insurance_for_Young_Adults"
		 *         }
		 *     }, {
		 *         "@chronic_id": "091e9c5e80201ce2",
		 *         "@thmbnl": "",
		 *         "@pointer": "1",
		 *         "target": {
		 *             "@friendlyurl": "http://www.webmd.com/"
		 *         }
		 *     }]
		 * },
 		 */
		if(obj.length){

			// when the object is an array, we can go through each item
			$.each(obj, function(key, value){
				urls[value['@chronic_id']] = value.target['@friendlyurl'];
			});
		} else {

			// when the object is not an array
			urls[obj['@chronic_id']] = obj.target['@friendlyurl'];
		}

		link_list = webmd.object.get('webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link', dctm_data) || '';

		// retrieve text and links from data returned from shared module
		replacement = {
			title: webmd.object.get('webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title', dctm_data) || '',
			when: when,
			text: webmd.object.get('webmd_rendition.content.wbmd_asset.webmd_module.module_data.descriptions.description.description_text', dctm_data) || '',
			link_text_1: webmd.object.get('0.link_text', link_list) || '',
			link_text_2: webmd.object.get('1.link_text', link_list) || '',
			link_text_3: webmd.object.get('2.link_text', link_list) || '',
			link_1: urls[webmd.object.get('0.link_url.@chronic_id', link_list) || ''],
			link_2: urls[webmd.object.get('1.link_url.@chronic_id', link_list) || ''],
			link_3: urls[webmd.object.get('2.link_url.@chronic_id', link_list) || '']
		};

		// fill the flyin with the substituted content
		$el.html(webmd.substitute(options.inner_html, replacement));

		// sets up close of flyin on the click event
		$el.find('.close a').click(function(e){
			e.preventDefault();

			setCookieToHideFlyin();

			cancelFlyin();

			return false;
		});

		loaded = true;

		flyin();
	}

	// turns off fly-in event and hides div if necessary
	function cancelFlyin(){

		// disable scroll functionality by replacing scrollEvent function
		$(window).off('scroll', scrollEvent);

		// hide the flyin just in case it's already out
		flyout();
	}

	// function that is called from the global scope that is triggered by the JSONP response of the scribble live api
	// although global, this still has access to variables in this function
	window.webmd.flyin = function(data){
		var now = new Date(),
			start, end,
			minute = 1000 * 60,
			day = minute * 60 * 24;

		if(typeof data === 'object'){

			// start and end times are parsed from the set of 13 digits
			start = +(data.Start.match(/\d{13}/))[0];
			end = +(data.End.match(/\d{13}/))[0];

			// checks to see if the event is the next day or today, also that the current time is less than the start tiem
			// Math.floor(start / day) gets the number of the next day (from unix time)
			// Math.floor((now - (now.getTimezoneOffset() * minute)) / day) gets the number of the current day in the current timezone (from unix time)
			// if the difference is 1 or less, then the flyin will show
			options.days_left = Math.floor(start / day) - Math.floor((now - (now.getTimezoneOffset() * minute)) / day);
			if((options.days_left <= options.full_days_to_display) && (now < start)){
				loadSharedModule();
			} else if((now >= start) && (now < end)){
				in_progress = true;
				loadSharedModule();
			} else if(webmd.url.getParam('flyin') === '1'){
				loadSharedModule();
			} else {
				cancelFlyin();
			}
		}
	};

	return {
		init: function(trigger){
			$trigger = $(trigger);

			// if there is a trigger element, setup the flyin
			if($trigger.length && window.webmd && window.image_server_url && window.s_sponsor_program === '' && window.s_sponsor_brand === ''){
				startFlyin();
			}
		},

		options: options
	};
});
