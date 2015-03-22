function initializeInputHint(oInput, sHint)
{
	if ( !sHint ) {
		if ( !oInput.value.length ) {
			return;
		}
		sHint = oInput.value;
	}
	oInput.onblur = function() { if ( /^\s*$/.test(oInput.value) ) { oInput.value = sHint; } };
	oInput.onfocus = function() { if ( oInput.value.toLowerCase() == sHint.toLowerCase() ) { oInput.value = ""; } };
	if ( /^\s*$/.test(oInput.value) ) {
		oInput.value = sHint;
	}
	return;
}
function searchHover(evt)
{
	evt = evt || window.event;
	var oElement = evt.srcElement || evt.target;
	if ( oElement ) {
		oElement.src = '/custom/Aacd/Images/MainLayout/search-hover.gif';
	}
	return;
}
function searchNormal(evt)
{
	evt = evt || window.event;
	var oElement = evt.srcElement || evt.target;
	if ( oElement ) {
		oElement.src = '/custom/Aacd/Images/MainLayout/search.gif';
	}
	return;
}
ready(function() {
	var oSearch = document.getElementById('aacd_core_search_box');
	if ( oSearch ) {
		initializeInputHint(oSearch);
	}
	var oButton = document.getElementById('aacd_core_search_button');
	if ( oButton ) {
		var oImage = new Image();
		oImage.src = '/custom/Aacd/Images/MainLayout/search-hover.gif';
		xAddEventListener(oButton, 'mouseover', searchHover);
		xAddEventListener(oButton, 'mouseout', searchNormal);
	}
});