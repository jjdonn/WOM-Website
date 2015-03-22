var _document_ready = false;
var _ready_functions = [];
function ready(func)
{
	if ( _document_ready ) {
		try {
			func();
		} catch (e) { }
	} else {
		_ready_functions.push(func);
	}
	return;
}
function run_ready()
{
	if ( !_document_ready ) {
		_document_ready = true;
		for (var i = 0; i < _ready_functions.length; i++) {
			try {
				_ready_functions[i]();
			} catch (e) { }
		}
	}
	return;
}
function ie_run_ready()
{
	if ( this.readyState == 'complete' ) {
		run_ready();
	}
	return;
}
function onload_run_ready()
{
	window.setTimeout(run_ready, 0);
	return;
}
function safari_ready_check()
{
	if ( /loaded|complete/.test(document.readyState) ) {
		window.clearInterval(_safari_ready_check);
		run_ready();
	}
	return;
}
if ( /Safari/i.test(navigator.userAgent) ) {
	
	var _safari_ready_check = window.setInterval(safari_ready_check, 10);
	
} else if ( document.addEventListener ) {
	
	document.addEventListener('DOMContentLoaded', run_ready, false);
	
} else if ( document.all && !window.opera ) {
	
	document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="/classes/Layout/Script/void.js"></script>');
	var contentloadtag = document.getElementById('contentloadtag');
	contentloadtag.onreadystatechange = ie_run_ready;
	
}
function ping(sURL)
{
	if ( typeof sURL == 'string' ) {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('height', '1');
		iframe.setAttribute('width', '1');
		iframe.setAttribute('src', sURL);
		document.body.appendChild(iframe);
	}
	return;
}
function setTimeZone()
{
	if ( typeof ajax == 'function' ) {
		
		var oDate = new Date();
		var iCurrentOffset = -oDate.getTimezoneOffset();
		var iLowestOffset = iCurrentOffset;
		
		for (var i = 0; i < 12; i++) {
			oDate.setMonth(oDate.getMonth() + 1);
			iLowestOffset = Math.min(iLowestOffset, -oDate.getTimezoneOffset());
		}
		
		var sURL = '/index.php?neverrewind&module=common&cmd=settimezone';
		var sParams = 'CTGTZO=' + iCurrentOffset + '&CTGTZL=' + iLowestOffset;
		ajax(sURL, 'get', 'ctgNull', sParams);
		
	}
	return;
}
function ctgNull()
{
	return;
}
window.onload = onload_run_ready;
if ( !Array.prototype.indexOf ) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if ( this[i] === obj ) {
				return i;
			}
		}
		return -1;
	};
}