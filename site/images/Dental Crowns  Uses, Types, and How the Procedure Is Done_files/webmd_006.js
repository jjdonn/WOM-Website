/**
 * Object for "Is this Normal?" Widget functions
 * @author Amanda Lenczewski
 */
webmd.m.isthisnormal = {
	/**
	 * Set up the default options
	 */
	opts: {
		panes: 4,
		newsletter: true,
		nlsignup: false,
		pagination: true,
		disclaimer: true,
		omniture: 'wdgt-nrml-unk',
		containerid: 'wdgt-nrml',
		messages: {
			nl: '<h6>Thank you for signing up for a WebMD Newsletter!</h6><p>You\'ll find tips and tricks as well as the latest news and research.</p>',
			def: 'There has been an error.'
		},
		forms:[],
		pane:[],
		results:[]
	},
	/**
	 * Initialize the widget
	 *
	 * @param {object} overrides for default opts
	 */
	init:function(opts) {
		var self = this;
		// Extend the options with custom settings
		if(opts) {
			$.extend(self.opts, opts);
		}
		// start the user object
		self.user = {};	
		// cache container
		self.$container = $('#' + self.opts.containerid);
		// Show first pane
		self._showPane(0);
		
		// check if registration is down, if so, skip newsletter pane
		if(webmd.status && webmd.status.reg === false && !webmd.cookie.exists('ignoremaint')){
			self.opts.nlsignup = true;
			self.opts.skiprepeat = true;
		}
		else{
			// If there is a newsletter component, set it up
			// load newsletter JS, if not present
			if(self.opts.newsletter && !window.webmd.m.newsletter) {
				webmd.load({js:'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/javascript/newsletter.js',load:self._nlSetup});
			} else if(self.opts.newsletter) {
				self._nlSetup();
			}
		}
		
		// Bind form submits
		self.$container.find('.normal_form').each(function(f) {
			$(this).submit(function() {
				if(self.opts.forms[f] && self.opts.forms[f].submitForm) {
					return self.opts.forms[f].submitForm(this);
				} else {
					self._showPane(self.cpi+1);
					return false;
				}
			});
		});
		
		// create click binding for start over button
		self.$container.find('.start_over a').click(function(){
			self._startOver();
			return false;
		});
		// if newsletter, bind for continue and skip
		self._bindContinue();
		// if sources, bind toggle
		$('#wdgt_sources_toggle').click(function() {
			$('#wdgt_source_text').toggle();
			$(this).toggleClass('show');
			return false;
		});
	},
	/**
	 * Binding for NL continue buttons
	 */
	_bindContinue:function() {
		var self = this;
		self.$container.find('.nl_next').click(function(){
			self._showPane(self.cpi+1);
			return false;
		});
	},
	/**
	 * Set up newsletter
	 */
	_nlSetup:function() {
		var self = (this.opts) ? this : webmd.m.isthisnormal;
		
		// newsletter normalWidget object extends newletter Module object
		webmd.m.newsletter.normalWidget = function() {};
		webmd.m.newsletter.normalWidget.prototype = new webmd.m.newsletter.Module();

		// override the loading message
		webmd.m.newsletter.normalWidget.prototype.msg.loading = 'Subcribing...';
		webmd.m.newsletter.normalWidget.prototype.msg.enterName = 'Please enter your first and last name.';

		// setup form items for click and blur since the label is inside the form item
		self.$container.find('#normal_first_name, #normal_last_name').focus(function(){
			if ($(this).val() == $(this).data('default')) {
				$(this).val('');							 
			}
		});
		self.$container.find('#normal_first_name, #normal_last_name').blur(function(){
			if ($(this).val() == '') {
				$(this).val($(this).data('default'));							 
			}
		});
	
		// Override other areas of the newsletter module
		$.extend(webmd.m.newsletter.normalWidget.prototype, {
			omnitureModule: false,
			// override display message as we want to overlay if there is an error
			displayMsg: function(msg, isError, jQueryElementToFocus) {
				var self = this, $n = self.nodes.$text, norm = webmd.m.isthisnormal;
				if(isError) {
					//api is down or timed out
					if(msg.indexOf('temporarily unavailable') != -1){
						$('.buttons .webmd-btn-xl').before('<div class="reg_down">'+msg+'</div>').remove();
						$n.show();
						self.nodes.$form.show();
					}
					else{
						norm._popError(msg,function() { if(jQueryElementToFocus) { jQueryElementToFocus.focus(); } });
					}
				} else {
					$n.hide();
					if (msg) {
						if(norm.opts.passthrough) {
							norm.$container.find('.newsletter').html(msg).show();
						} else {
							$n.html(msg).toggleClass(self.classes.error, isError).fadeIn('slow');
						}
					} else {
						if(norm.opts.passthrough) {
							norm.$container.find('.newsletter').html('').hide();
						} else {
							$n.html('').removeClass(self.classes.error).fadeOut('slow');
						}
					}
				}
			},
			validateForm: function() {
				var norm = webmd.m.isthisnormal, self = this;
				var user = {
					firstname: norm.$container.find('#normal_first_name'),
					lastname: norm.$container.find('#normal_last_name')
				};
				
				if((user.firstname.val() == user.firstname.data('default')) || (user.firstname.val() == '')) {
					self.displayMsg(self.msg.enterName, true, user.firstname.val());
					return false;
				} else {
					norm.user.first_name = $.trim(user.firstname.val());
				}
				if((user.lastname.val() == user.lastname.data('default')) || (user.lastname.val() == '')) {
					self.displayMsg(self.msg.enterName, true, user.lastname);
					return false;
				} else {
					norm.user.last_name = $.trim(user.lastname.val());
				}
				
				// Check for no email entered
				if (!self.nodes.$inputEmail.val().match(/\S/) || self.nodes.$inputEmail.val() === self.nodes.$inputEmail.attr('title')) {
					self.displayMsg(self.msg.noEmail, true, self.nodes.$inputEmail[0]);
					return false;
				}
				// Check for bad email entered
				if (!self.isEmail(self.nodes.$inputEmail.val())) {
					self.displayMsg(self.msg.badEmail, true, self.nodes.$inputEmail[0]);
					return false;
				}
				// validate privacy opt in
				if (self.nodes.$inputPrivacy.length && !self.nodes.$inputPrivacy.filter(':checked').length) {
					self.displayMsg(self.msg.privacy, true, self.nodes.$inputPrivacy[0]);
					return false;
				}
				norm.user.email = self.nodes.$inputEmail.val();
				return true;
			},
			finish: function(msg) {
				var norm = webmd.m.isthisnormal, self = this;
				self.nodes.$form.hide();
				var success =  norm.opts.messages.nl;
				// if it's the success message, then replace first name with their actual first name
				if(msg.indexOf('you\'re now signed up!') > -1) {
					msg = webmd.substitute(success, { first_name: norm.user.first_name });
				}
				self.displayMsg(msg, false);
				// If pass through to results with newsletter success message
				if(norm.opts.passthrough) {
					norm.opts.nlsignup = true;
					norm.opts.pane[(norm.cpi+1)].metric += '-' + self.nodes.$inputNls.val();
					norm.opts.pane[(norm.cpi+1)].metricDef = norm.opts.pane[(norm.cpi+1)].metric;
					webmd.debug("NL Validation: " + (norm.cpi+1),norm.opts.pane[(norm.cpi+1)].metric);
					norm._showPane(norm.cpi+1);
				} else {
					norm._bindContinue();
				}
				// If there is and SDC portion, submit now
				if(norm.opts.sdcSubmit) {
					norm.opts.sdcSubmit($form);
				}
			}
		});
		self.$container.find('.normal_nl_form').each(function(){ var m = new webmd.m.newsletter.normalWidget().init(this); });
	},
	/**
	 * Show a specific pane of the widget
	 *
	 * @param {number, string} index of pane to show; defaults to first pane. Text accepted: "first" and "last".
	 * @see this.opts.pane for additional functions used per pane
	 */
	_showPane:function(i, or) {
		var self = this;
		// If i is not a number, make it one
		if(!i || i >= self.opts.panes || i < 0 || isNaN(i)) {
			switch(i) {
				case 'first':
					i = 0;
					break;
				case 'last':
					i = (self.opts.panes-1);
					break;
				default:
					i = 0;
					break;
			}
		}
		// Set current pane index
		self.cpi = i;
		// Hide all panes other than the one we want to show
		self.$container.find('.pane').each(function(j) {
			if(j !== self.cpi && $(this).is(':visible')) {
				$(this).hide();
				if(self.opts.pane[j] && self.opts.pane[j].onhide) {
					self.opts.pane[j].onhide();
				}
			}
		});
		// Do metrics call if not first pane
		if(self.cpi > 0) { self.callMetrics(self.cpi,self.opts.pane[self.cpi].metric); }
		// Show requested pane
		self.$container.find('#pane' + self.cpi).show();
		// If a pane other than 0, show start over button
		if(self.cpi !== 0) {
			self.$container.find('.start_over').show();
			if(self.opts.pagination && self.cpi !== (self.opts.panes-1)) {
				// If pagination is true
				self._pagination();
			} else {
				// Hide pagination on results pane
				self.$container.find('.pagination').hide();
			}
			// If disclaimer is true
			if(self.opts.disclaimer) { self.$container.find('.disclaimer').hide(); }
		} else {
			self.$container.find('.start_over, .pagination').hide();
			// If disclaimer is true
			if(self.opts.disclaimer) { self.$container.find('.disclaimer').show(); }
		}
		// If there is a custom function for on show, do it
		if(self.opts.pane[self.cpi] && self.opts.pane[self.cpi].onshow) { self.opts.pane[self.cpi].onshow(); }
	},
	/**
	 * Pagination
	 */
	_pagination:function(){
		var self = this;
		self.$container.find('.pagination .currentpane').html(self.cpi+1);
		self.$container.find('.pagination .totalpanes').html(self.opts.panes-1);
		self.$container.find('.pagination').show();
	},
	/**
	 * Reset Widget to begining
	 *
	 * @see this.opts.formReset for additional info
	 */
	_startOver:function(){
		var self = this;
		// Do metrics call
		self.callMetrics('startOver');
		// Reset metrics call value
		self.omnitureCall = '';
		// Reset user data
		self.user = {};
		// Hide all visible results
		self.$container.find('.subsection:visible').hide();
		// Reset each form
		self.$container.find('form').each(function(i) {
			if(self.opts.forms[i] && self.opts.forms[i].resetForm) {
				self.opts.forms[i].resetForm(this);
			} else {
				this.reset();
			}
		});
		// Show first pane
		self._showPane(0);
	},
	/**
	 * Change text to reflect target user
	 *
	 * @param {number} index 0 = You, 1 = They
	 */
	_flexText:function(n){
		var self = this;
		var words = [
				['You','you','Your','your','You\'re','you\'re'],
				['They','they','Their','their','They\'re','they\'re']
			];
		var p = ((n + 1) >= words.length) ? 0 : (n + 1);
		self.$container.find('span.flex').each(function() {
			var newtext, text = $(this).html();
			$(words[p]).each(function(u) {
				if(text === this.toString()) {
					newtext = words[n][u];
				}
			});
			$(this).html(newtext);
		});
	},
	/**
	 * Form validation based on config
	 *
	 * @param {object} the form to be validated
	 * @param {object} rules for validation
	 * @return {boolean} true if valid
	 */
	_validate:function(form, rules){
		var self = this, $form = $(form), valid = true, checked = [];
		$form.find(':input:not(:submit)').each(function() {
			if(rules[this.name] && rules[this.name].rule && $.inArray(this.name, checked) < 0){
				checked.push(this.name);
				var value = this.value;
				switch(this.type) {
					case 'radio':
						value = $('input[name=' + this.name + ']:checked').val();
						break;
					case 'checkbox':
						value = $(this).attr('checked');
						break;
					default:
						break;
				}
				if(!rules[this.name].rule(value)) {
					valid = false;
					self._popError(rules[this.name].msg, rules[this.name].errorcallback);
					return false;
				}
			}
		});
		return valid;
	},
	/**
	 * Show error overlay
	 *
	 * @param {string} the message to be displayed in the overlay, if blank default message displays
	 * @param {function} callback function, if none focus is put on first visible input in form
	 */
	_popError:function(message, callback){
		var self = this;
		if(!message) {
			message = self.opts.messages.def;
		}
		webmd.overlay.alert({
			text: message,
			ok: 'Close',
			callback: function () {
				if(callback) {
					callback();
				} else {
					self.$container.find(':input:visible:first').focus();
				}
			}
		});
	},
	/**
	 * Set the tick on the graph
	 * 
	 * @param {number} the user-entered value
	 * @param {object} max and min values for center section to calculate adjustment
	 */
	_setTick:function(target, range, adj, bar) {
		if(!target || !range) { return false; }
		var self = this;
		if(!adj) { var adj = 1.5; }
		if(!bar) { var bar = (self.$container.find('.second').width()+2); }
		// each section in units of target
		range.bar = range.high - range.low;
		// center units of target
		range.center = (range.bar/2) + range.low;
		// minimum units of target
		range.min = range.center - (range.bar * adj);
		// maximum units of target
		range.max = range.center + (range.bar * adj); 
		// pixels that make up a unit of target
		range.perc = bar/range.bar;
		// pixel location for tick mark
		var tick = (target - range.min) * range.perc;
		// adjust for max/min display in pixels
		if(target <= range.min || tick < 10) {
			tick = 10;
		} else if(target >= range.max || tick > 240) {
			tick = 240;
		}
		// move the tick
		self.$container.find('.level_tip').css('left',tick);
	},
	/**
	 * Helper function to do metrics calls
	 *
	 * @param {string} key for which pane
	 * @param {string} additional characters to be added to call
	 */
	callMetrics:function(pane,add) {
		var self = this;
		if(isNaN(pane)) {
			switch(pane) {
				case 'startOver':
					self.omnitureCall = self.opts.omniture + '_over';
					break;
				case 'nl':
					self.omnitureCall += add;
					break;
				default:
					self.omnitureCall = self.opts.omniture + '_uk';
					break;
			}
		} else {
			if(!add) { add = pane; }
			if(pane === 1) {
				self.omnitureCall = self.opts.omniture + '_';
			}
			self.omnitureCall += add;
		}
		
		wmdPageLink(self.omnitureCall);
	}
};
