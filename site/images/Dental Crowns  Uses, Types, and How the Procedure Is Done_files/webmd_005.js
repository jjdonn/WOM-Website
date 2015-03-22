/* Nativo Adendum */
if (!(window.location.href.indexOf("sponsor-box") > -1 || window.location.href.indexOf("fit.") > -1)) {
	if (window.location.protocol === "http:") {
		require(['//a.postrelease.com/serve/load.js']);
	}
}

/* Checks location.pathname and location.hostname
   against the contents of the array mboxrm (Mobile)
   and mboxrc (Core).
   If a match is found, the contents of webmd.mboxset.js 
   will also be added to the page, allowing omniture to 
   add tests to the page, and a cookie (pvcookie) will 
   also be set to retain this regardless of location as 
   users continue to traverse the site.
   -JS 
*/

/* START if s_topic has not been declared 
   Included since some tests use this varaiable, but
   it is not always included in the page (Registration etc.)
*/
if (window.s_topic) {
  var mboxx = "";
} else {
  var s_topic = "";
}
/* END if s_topic has not been declared */
				
(function() {
	var locstr = location.hostname.replace(/^www\./i, ''),
		/* URL Declarations for mbox reduction Mobile*/
		mboxrm = [
			"xwww.preview.m.webmd.com",
			"xwww.preview.m.webmd.com"
		],
		/* URL Declarations for mbox reduction Core */
		mboxrc = [
			//"www.webmd.com",
			//"symptoms.webmd.com",
			//"drugs",
			//"vitamins-supplements",
			////-------------------- Preview
			"pets.webmd.com",
			//"www.preview.webmd.com",
			//"food-recipes",
			"xwww.preview.webmd.com",
			"xwww.preview.webmd.com"
		],
		mboxlocsplit = location.pathname.split("/"),
		//mobile (Checks Mobile's URL)
		mboxma = jQuery.inArray(location.hostname, mboxrm),
		mboxmb = jQuery.inArray(mboxlocsplit[1], mboxrm),
		mboxmc = jQuery.inArray(mboxlocsplit[2], mboxrm),
		//core (Checks Core's URL)
		mboxca = jQuery.inArray(location.hostname, mboxrc),
		mboxcb = jQuery.inArray(mboxlocsplit[1], mboxrc),
		mboxcc = jQuery.inArray(mboxlocsplit[2], mboxrc),
		//Asset names (Change Accordingly)
		assetnames = [
			'slideshow-9-tips-flat-abs',
			'slideshow-secrets-women-wish-you-knew',
			'slideshow-epilepsy-overview',
			'slideshow-heartburn-foods',
			'slideshow-secrets-guys-wish-you-knew',
			'slideshow-shingles-pictures',
			'slideshow-skin-and-health',
			'slideshow-hair-conditions',
			'slideshow-nails-and-health',
			'slideshow-lupus-overview',
			'slideshow-std-pictures-and-facts',
			'slideshow-foods-your-dog-should-never-eat',
			'slideshow-boost-your-metabolism',
			'slideshow-bad-bugs',
			'slideshow-skin-lesions-and-cancer'
		];
	
	/*
	Notes for Including the mbox on Test pages by asset type or altering the cookie
	s_topic == '1625'
	s_business_reference == 'Nav - Home Page'
	s_furl == '/heart-disease/guide/heart-disease-symptoms'
	webmd.cookie.set('pvcookie', true, {expires:14});
	(typeof s_assetname !== "undefined" && jQuery.inArray(s_assetname, assetnames) > -1)
	*/
		
	/*Checks Mobile for inclusions*/
	if (location.hostname == 'www.m.webmd.com' || location.hostname == 'www.preview.m.webmd.com' || location.hostname == 'www.staging.m.webmd.com') {
		if (webmd.cookie.exists('pvcookie') || mboxma > -1 || mboxmb > -1 || mboxmc > -1) {
			webmd.cookie.set('pvcookie', true, { expires: 7 });
			document.write("<script language='javascript' type='text/javascript' src='" + image_server_url + "/webmd/consumer_assets/site_images/usability/webmd.mboxset.js'></script>");
		}
		else {
		}
	}

	/*Then Checks Core for inclusions*/
	if (location.hostname != 'www.m.webmd.com' || location.hostname == 'www.preview.webmd.com' || locstr == 'webmd.com') {
		if (webmd.cookie.exists('pvcookie') || mboxca > -1 || mboxcb > -1 || mboxcc > -1 || (typeof s_assetname !== "undefined" && jQuery.inArray(s_assetname, assetnames) > -1)) {
			webmd.cookie.set('pvcookie', true, { expires: 7 });
			document.writeln("<script language='javascript' type='text/javascript' src='" + image_server_url + "/webmd/consumer_assets/site_images/usability/webmd.mboxset.js'></script>");
		}
	}
})();
