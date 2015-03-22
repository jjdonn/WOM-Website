/**
 * This function is a cross-browser compatible way of setting up event handlers.
 * Copyright (c) 2000 Mike Foster. www.cross-browser.com
 * @param	oElement	This is an object reference to an HTML element.
 * @param	sType		This is a string representing the event type. This
 *						should not include the prefix "on".
 * @param	fListener	This is the event handler function to be called.
 * @return	This function does not return anything.
 */
function xAddEventListener(oElement, sType, fListener)
{
	if ( oElement.addEventListener ) {
		oElement.addEventListener(sType, fListener, false);
	} else if ( oElement.attachEvent ) {
		oElement.attachEvent('on' + sType, fListener);
	} else if ( typeof oElement['on' + sType] == 'function' ) {
		var fOld = oElement['on' + sType];
		oElement['on' + sType] = function() {
			fOld();
			fListener();
		};
	} else {
		oElement['on' + sType] = fListener;
	}
	return;
}
/**
 * This function is a cross-browser compatible way of removing event handlers.
 * Copyright (c) 2000 Mike Foster. www.cross-browser.com
 * @param	oElement	This is an object reference to an HTML element.
 * @param	sType		This is a string representing the event type. This
 *						should not include the prefix "on".
 * @param	fListener	This is the event handler function to be removed.
 * @return	This function does not return anything.
 */
function xRemoveEventListener(oElement, sType, fListener)
{
	sType = sType.toLowerCase();
	if ( oElement.removeEventListener ) {
		oElement.removeEventListener(sType, fListener, false);
	} else if ( oElement.detachEvent ) {
		oElement.detachEvent('on' + sType, fListener);
	} else {
		oElement['on' + sType] = null;
	}
	return;
}
/**
 * This function is a cross-browser compatible implementation of
 * getElementsByClassName(), which does not work in earlier versions of IE.
 * Copyright (c) 2000 Mike Foster. www.cross-browser.com
 * @param	sClassName		This is a string representing the class we want to select.
 * @param	oParentElement	(optional) This is an object reference to an HTML element.
 * @param	sTagName		(optional) This is a string representing the tag name
 *							we want to restrict elements to.
 * @param	fListener		This is a callback function to be called on each matching element.
 * @return	This function returns an array object of every element that matches
 *			the class name and other criteria.
 */
function xGetElementsByClassName(sClassName, oParentElement, sTagName, fCallback)
{
	var r = [], re, e;
	re = new RegExp("(^|\\s)" + sClassName + "(\\s|$)");
	e = xGetElementsByTagName(sTagName, oParentElement);
	for (var i = 0, l = e.length; i < l; i++) {
		if ( re.test(e[i].className) ) {
			r[r.length] = e[i];
			if ( typeof fCallback == 'function' ) {
				fCallback(e[i]);
			}
		}
	}
	return r;
}
/**
 * This is a helper function for xGetElementsByClassName(). This function
 * is a cross-browser compatible implementation of getElementsByTagName().
 * Copyright (c) 2000 Mike Foster. www.cross-browser.com
 * @param	sTagName	(optional) This is a string representing the tag name
 *						we want to restrict elements to.
 * @param	oParent		(optional) This is an object reference to an HTML element.
 * @return	This function returns an array object of every element of the given
 *			tag name, underneath the parent element (when specified).
 */
function xGetElementsByTagName(sTagName, oParent)
{
	var list = null;
	sTagName = sTagName || '*';
	oParent = oParent || document;
	if ( typeof oParent.getElementsByTagName != 'undefined' ) {
		list = oParent.getElementsByTagName(sTagName);
		if ( sTagName == '*' && (!list || !list.length) ) {
			list = oParent.all;
		}
	} else {
		if ( sTagName == '*' ) {
			list = oParent.all;
		} else if ( oParent.all && oParent.all.tags ) {
			list = oParent.all.tags(sTagName);
		}
	}
	return list || [];
}