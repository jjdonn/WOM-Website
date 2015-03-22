ctgAlertsOpen = 0;
function ctgRandomId()
{
	while ( true ) {
		var sID = 'ctg' + Math.random(0, 1).toString().substr(9);
		var oNode = document.getElementById(sID);
		if ( !oNode ) {
			break;
		}
	}
	return sID;
}
function ctgAlert(sMessage, sTitle, sIcon, sFocusId)
{
	ctgAlertsOpen++;
	
	if ( typeof sIcon != 'string' || sIcon.length == 0 ) {
		//	default icon
		sIcon = '/images/important.gif';
	}
	
	var oCtr = document.createElement('div');
	var oHdr = document.createElement('div');
	var oCnt = document.createElement('div');
	var oTitle = document.createTextNode(sTitle);
	oCtr.className = 'ctgInfoColumn';
	oHdr.className = 'ctgHeader';
	oCnt.className = 'ctgContent';
	oCtr.appendChild(oHdr);
	oCtr.appendChild(oCnt);
	oHdr.appendChild(oTitle);
	
	var sID = ctgRandomId();
	var oForm = document.createElement('form');
	oForm.action = document.location.toString();
	oForm.setAttribute('method', 'get');
	
	var oText = ctgTextNode(sMessage);
	oText.style.margin = '0 auto';
	oForm.appendChild(oText);
	
	var oP = document.createElement('p');
	var oButton = document.createElement('button');
	var oBtnTxt = document.createTextNode('OK');
	oP.style.margin = '1em auto 0';
	oP.style.textAlign = 'center';
	oP.className = 'buttons';
	oButton.style.marginRight = '5em';
	oButton.appendChild(oBtnTxt);
	oP.appendChild(oButton);
	oForm.appendChild(oP);
	oCnt.appendChild(oForm);
	
	oForm.onsubmit = new Function("return(false)");
	if ( typeof sFocusId != 'string' || sFocusId.length == 0 ) {
		oButton.onclick = new Function("ctgCloseAlert('" + sID + "');");
	} else {
		oButton.onclick = new Function("ctgCloseAlert('" + sID + "',false,'" + sFocusId + "');");
	}
	
	oCtr.id = sID;
	oCtr.style.display = 'block';
	oCtr.style.margin = 'auto';
	oCtr.style.width = '400px';
	oCtr.style.zIndex = '1000';
	
	oCnt.style.backgroundImage = "url('" + sIcon + "')";
	oCnt.style.backgroundPosition = '6px 6px';
	oCnt.style.backgroundRepeat = 'no-repeat';
	oCnt.style.minHeight = '2.5em';
	oCnt.style.paddingLeft = '50px';
	
	ctgAttachNotification(oCtr);
	oButton.focus();
	return;
}
function ctgConfirm(sMessage, sTitle, sCallback, oButtons, sIcon, iWidth)
{
	iWidth = parseInt(iWidth, 10) || 0;
	ctgAlertsOpen++;
	
	if ( arguments.length < 4 || typeof oButtons != 'object' ) {
		//	values must be scalars!
		oButtons = {'OK' : true, 'Cancel' : false};
	}
	
	if ( typeof sIcon != 'string' || sIcon.length == 0 ) {
		//	default icon
		sIcon = '/images/help2.gif';
	}
	
	if ( typeof sCallback != 'string' || sCallback.length == 0 ) {
		sCallback = 'ctgNull';
	}
	
	var oCtr = document.createElement('div');
	var oHdr = document.createElement('div');
	var oCnt = document.createElement('div');
	var oTitle = document.createTextNode(sTitle);
	oCtr.className = 'ctgInfoColumn';
	oHdr.className = 'ctgHeader';
	oCnt.className = 'ctgContent';
	oCtr.appendChild(oHdr);
	oCtr.appendChild(oCnt);
	oHdr.appendChild(oTitle);
	
	var sID = ctgRandomId();
	var oForm = document.createElement('form');
	oForm.action = document.location.toString();
	oForm.setAttribute('method', 'get');
	
	var oText = ctgTextNode(sMessage);
	oText.style.margin = '0 auto';
	oForm.appendChild(oText);
	
	var oP = document.createElement('p');
	oP.style.margin = '1em auto 0';
	oP.style.textAlign = 'center';
	oP.className = 'buttons';
	oForm.appendChild(oP);
	oCnt.appendChild(oForm);
	
	var sClose = "ctgCloseAlert('" + sID + "');";
	oForm.onsubmit = new Function("return(false)");
	
	for ( var i in oButtons ) {
		oButton = document.createElement('button');
		oBtnTxt = document.createTextNode(i);
		oSpace = document.createTextNode(' ');
		oButton.appendChild(oBtnTxt);
		oP.appendChild(oButton);
		oP.appendChild(oSpace);
		
		var sCmd = "try { " + sCallback + "(";
		if ( typeof oButtons[i] == 'boolean' || typeof oButtons[i] == 'number' ) {
			sCmd += oButtons[i].toString();
		} else {
			var sParam = oButtons[i].toString();
			sParam = sParam.replace(/([\\"])/g, '\\$1');
			sCmd += '"' + sParam + '"';
		}
		sCmd += "); } catch (e) {}; " + sClose;
		oButton.onclick = new Function(sCmd);
	}
	
	oButton.style.marginRight = '4em';
	
	oCtr.id = sID;
	oCtr.style.display = 'block';
	oCtr.style.margin = 'auto';
	oCtr.style.zIndex = '1000';
	if ( iWidth > 0 ) {
		oCtr.style.width = iWidth + 'px';
	} else {
		oCtr.style.width = '400px';
	}
	
	oCnt.style.backgroundImage = "url('" + sIcon + "')";
	oCnt.style.backgroundPosition = '6px 6px';
	oCnt.style.backgroundRepeat = 'no-repeat';
	oCnt.style.minHeight = '2.5em';
	oCnt.style.paddingLeft = '50px';
	
	ctgAttachNotification(oCtr);
	oCnt.getElementsByTagName('button')[0].focus();
	return;
}
function ctgPrompt(sMessage, sTitle, sCallback, aLabels, sIcon)
{
	ctgAlertsOpen++;
	
	if ( arguments.length < 4 || typeof aLabels != 'object' ) {
		aLabels = new Array();
	}
	
	if ( typeof sIcon != 'string' || sIcon.length == 0 ) {
		//	default icon
		sIcon = '/images/help2.gif';
	}
	
	if ( typeof sCallback != 'string' || sCallback.length == 0 ) {
		sCallback = 'ctgNull';
	}
	
	var oCtr = document.createElement('div');
	var oHdr = document.createElement('div');
	var oCnt = document.createElement('div');
	var oTitle = document.createTextNode(sTitle);
	oCtr.className = 'ctgInfoColumn';
	oHdr.className = 'ctgHeader';
	oCnt.className = 'ctgContent';
	oCtr.appendChild(oHdr);
	oCtr.appendChild(oCnt);
	oHdr.appendChild(oTitle);
	
	var sID = ctgRandomId();
	var oForm = document.createElement('form');
	oForm.action = document.location.toString();
	oForm.setAttribute('method', 'get');
	
	var oText = ctgTextNode(sMessage);
	oText.style.margin = '0 auto';
	oForm.appendChild(oText);
	
	var oTable = document.createElement('table');
	oTable.style.marginTop = '1em';
	var oRow = oTable.insertRow(-1);
	var i = 0;
	if ( aLabels.length > 0 ) {
		var oCell = oRow.insertCell(i++);
		var oLabel = document.createElement('label');
		var oTxt = document.createTextNode(aLabels[0] + ':');
		oLabel.setAttribute('for', aLabels[0].replace(/[^\d\w]+/g, ""));
		oLabel.appendChild(oTxt);
		oCell.appendChild(oLabel);
	}
	var oCell = oRow.insertCell(i);
	oCell.style.textAlign = 'left';
	var oInput1 = document.createElement('input');
	oInput1.setAttribute('type', 'text');
	oInput1.style.width = '16em';
	if ( aLabels.length > 0 ) {
		oInput1.name = aLabels[0];
		oInput1.id = aLabels[0].replace(/[^\d\w]+/g, "");
	} else {
		oInput1.name = 'field';
	}
	
	oCell.appendChild(oInput1);
	oForm.appendChild(oTable);
	
	oInput1.onkeydown = function (evt) { ctgCaptureEnter(evt); };
	
	for (var i = 1; i < aLabels.length; i++) {
		var oRow = oTable.insertRow(-1);
		var oCell = oRow.insertCell(0);
		var oLabel = document.createElement('label');
		var oTxt = document.createTextNode(aLabels[i] + ':');
		oLabel.setAttribute('for', aLabels[i].replace(/[^\d\w]+/g, ""));
		oLabel.appendChild(oTxt);
		oCell.appendChild(oLabel);
		var oCell = oRow.insertCell(1);
		oCell.style.textAlign = 'left';
		var oInput = document.createElement('input');
		oInput.setAttribute('type', 'text');
		oInput.style.width = '16em';
		oInput.name = aLabels[i];
		oInput.id = aLabels[i].replace(/[^\d\w]+/g, "");
		oCell.appendChild(oInput);
		
		oInput.onkeydown = function (evt) { ctgCaptureEnter(evt); };
	}
	
	var oP = document.createElement('p');
	oP.style.margin = '1em auto 0';
	oP.style.textAlign = 'center';
	oP.className = 'buttons';
	oForm.appendChild(oP);
	oCnt.appendChild(oForm);
	
	var oP = document.createElement('p');
	var oButton1 = document.createElement('button');
	var oButton2 = document.createElement('button');
	var oBtnTxt1 = document.createTextNode('OK');
	var oBtnTxt2 = document.createTextNode('Cancel');
	var oSpace = document.createTextNode(' ');
	oP.style.margin = '1em auto 0';
	oP.style.textAlign = 'center';
	oP.className = 'buttons';
	oButton2.style.marginRight = '5em';
	oButton1.appendChild(oBtnTxt1);
	oButton2.appendChild(oBtnTxt2);
	oP.appendChild(oButton1);
	oP.appendChild(oSpace);
	oP.appendChild(oButton2);
	
	var sClose = "ctgCloseAlert('" + sID + "');";
	var sCmd1 = "ctgFieldsCallback('" + sCallback + "', this.form); " + sClose;
	var sCmd2 = "try { " + sCallback + "(null); } catch (e) { }; " + sClose;
	
	oButton1.onclick = new Function(sCmd1);
	oButton2.onclick = new Function(sCmd2);
	oForm.onsubmit = new Function("return(false)");
	
	oForm.appendChild(oP);
	oCnt.appendChild(oForm);
	
	oCtr.id = sID;
	oCtr.style.display = 'block';
	oCtr.style.margin = 'auto';
	oCtr.style.width = '400px';
	oCtr.style.zIndex = '1000';
	
	oCnt.style.backgroundImage = "url('" + sIcon + "')";
	oCnt.style.backgroundPosition = '6px 6px';
	oCnt.style.backgroundRepeat = 'no-repeat';
	oCnt.style.minHeight = '2.5em';
	oCnt.style.paddingLeft = '50px';
	
	ctgAttachNotification(oCtr);
	oInput1.focus();
	return;
}
function ctgInfoBox(sMessage, sTitle, iWidth, bForceButton, sClassName)
{
	ctgAlertsOpen++;
	
	var oCtr = document.createElement('div');
	var oCnt = document.createElement('div');
	if ( typeof sTitle == 'string' && sTitle.length > 0 ) {
		var oHdr = document.createElement('div');
		var oTitle = document.createTextNode(sTitle);
		oHdr.className = 'ctgHeader';
		oCtr.appendChild(oHdr);
		oHdr.appendChild(oTitle);
	}
	oCtr.className = 'ctgInfoColumn';
	oCnt.className = ( sClassName ) ? sClassName : 'ctgContent';
	oCtr.appendChild(oCnt);
	
	var sID = ctgRandomId();
	var oForm = document.createElement('form');
	oForm.action = document.location.toString();
	oForm.setAttribute('method', 'get');
	
	//	check to see if there are any links or onclick events
	//	that contain #CLOSE# (case-sensitive). if so, replace
	//	them with a function to close the info box
	var bContainsClose = false;
	var regex = new RegExp('(<[^>]+\\s)(\\w+)\\s*=\\s*([\'"])\\s*([^>]*)#CLOSE#([^>]*)\\3([^>]*>)', 'g');
	
	if ( regex.test(sMessage) ) {
		
		bContainsClose = true;
		
		var replaceQuotes = function(p0, p1, p2, p3, p4, p5, p6) {
			if ( p2.toLowerCase() == 'href' && p4.substr(0, 11).toLowerCase() != 'javascript:' ) {
				var j = 'javascript:';
			} else {
				var j = "";
			}
			var q = ( p3 == '"' ) ? "'" : '"';
			var r = p1 + p2 + '=' + p3 + j + p4 + 'ctgCloseAlert(';
			r += q + sID + q + ');' + p5 + p3 + p6;
			return r;
		}
		
		sMessage = sMessage.replace(regex, replaceQuotes);
		
	}
	
	var oText = ctgTextNode(sMessage);
	oText.style.margin = '0 auto';
	oForm.appendChild(oText);
	
	if ( !bContainsClose || bForceButton === true ) {
		
		var oP = document.createElement('p');
		var oButton = document.createElement('button');
		var oBtnTxt = document.createTextNode('Close');
		oP.style.margin = '1em auto 0';
		oP.style.textAlign = 'center';
		oP.className = 'buttons';
		oButton.appendChild(oBtnTxt);
		oP.appendChild(oButton);
		oForm.appendChild(oP);
		
		oButton.onclick = new Function("ctgCloseAlert('" + sID + "');");
		oButton.focus();
		
	}
	
	oForm.onsubmit = new Function("return(false)");
	oCnt.appendChild(oForm);
	
	oCtr.id = sID;
	oCtr.style.display = 'block';
	oCtr.style.margin = 'auto';
	oCtr.style.zIndex = '1000';
	
	if ( typeof iWidth == 'number' ) {
		iWidth = Math.max(100, parseInt(iWidth, 10));
		oCtr.style.width = iWidth.toString() + 'px';
	} else {
		oCtr.style.width = '400px';
	}
	
	ctgAttachNotification(oCtr);
	return;
}
function ctgTextNode(sMessage)
{
	if ( /<[a-z]+(\s+[^>]*)?>/i.test(sMessage) ) {
		var oText = document.createElement('div');
		oText.innerHTML = sMessage;
	} else {
		
		var oText = document.createElement('p');
		sMessage = sMessage.replace(/\r/g, "");
		
		var aLines = sMessage.split("\n");
		for (var i = 0; i < aLines.length - 1; i++) {
			
			if ( aLines[i] != "" ) {
				
				var aItems = aLines[i].split("\t");
				for (var j = 0; j < aItems.length - 1; j++) {
					
					if ( aItems[j] != "" ) {
						var oItem = document.createTextNode(aItems[j]);
						oText.appendChild(oItem);
					}
					
					var oPre = document.createElement('pre');
					oPre.style.display = 'inline-block';
					var oTab = document.createTextNode("\t");
					oPre.appendChild(oTab);
					oText.appendChild(oPre);
					
				}
				if ( aItems[j] != "" ) {
					var oItem = document.createTextNode(aItems[j]);
					oText.appendChild(oItem);
				}
				
			}
			var oBr = document.createElement('br');
			oText.appendChild(oBr);
			
		}
		if ( aLines[i] != "" ) {
			
			var aItems = aLines[i].split("\t");
			for (var j = 0; j < aItems.length - 1; j++) {
				
				if ( aItems[j] != "" ) {
					var oItem = document.createTextNode(aItems[j]);
					oText.appendChild(oItem);
				}
				
				var oPre = document.createElement('pre');
				oPre.style.display = 'inline-block';
				var oTab = document.createTextNode("\t");
				oPre.appendChild(oTab);
				oText.appendChild(oPre);
				
			}
			if ( aItems[j] != "" ) {
				var oItem = document.createTextNode(aItems[j]);
				oText.appendChild(oItem);
			}
			
		}
		/*
		var aLines = sMessage.match(/.*\n?/g);
		for (var i = 0; i < aLines.length - 2; i++) {
			var oLine = document.createTextNode(aLines[i].replace(/\n$/, ""));
			oText.appendChild(oLine);
			var oBr = document.createElement('br');
			oText.appendChild(oBr);
		}
		if ( i < aLines.length - 1 ) {
			var oLine = document.createTextNode(aLines[i].replace(/\n$/, ""));
			oText.appendChild(oLine);
		}
		*/
	}
	
	return oText;
}
function ctgFieldsCallback(sCallback, oForm)
{
	var oInputs = oForm.getElementsByTagName('input');
	for (var i = 0, sCmd = ""; i < oInputs.length; i++) {
		var sValue = oInputs[i].value.toString();
		sValue = sValue.replace(/(['\\])/g, '\\$1');
		sCmd += ",'" + sValue + "'";
	}
	sCmd = sCallback + "(" + sCmd.substr(1) + ");";
	try {
		eval(sCmd);
	} catch (e) { };
	return;
}
function ctgAttachNotification(oElement, bAppend)
{
	bAppend = ( bAppend === false ) ? false : true;
	ctgCreateOverlay();
	if ( bAppend ) {
		document.body.appendChild(oElement);
	}
	
	var sDisplay = xGetComputedStyle(oElement, 'display');
	if ( sDisplay == 'none' ) {
		oElement.style.display = 'block';
	}
	
	var iLeft = ( window.innerWidth ) ? window.innerWidth : document.documentElement.offsetWidth;
	var iTop = ( window.innerHeight ) ? window.innerHeight : document.documentElement.offsetHeight;
	iLeft = Math.floor((iLeft - oElement.offsetWidth) / 2);
	iTop = Math.floor((iTop - oElement.offsetHeight) / 3);
	if ( /MSIE [56]/i.test(navigator.userAgent) ) {
		iLeft += document.documentElement.scrollLeft;
		iTop += document.documentElement.scrollTop;
		oElement.style.position = 'absolute';
		toggleSelects(false);
	} else {
		oElement.style.position = 'fixed';
	}
	
	oElement.style.left = iLeft.toString() + 'px';
	oElement.style.top = iTop.toString() + 'px';
	
	return;
}
function ctgCreateOverlay(fCallback)
{
	ctgRemoveOverlay();
	var oOverlay = document.createElement('div');
	
	var iHeight = ( window.innerHeight ) ? window.innerHeight : document.documentElement.offsetHeight;
	var iWidth = ( window.innerWidth ) ? window.innerWidth : document.documentElement.offsetWidth;
	
	var iHeight = document.documentElement.offsetHeight;
	var iWidth = document.documentElement.offsetWidth;
	if ( /MSIE [56]/i.test(navigator.userAgent) ) {
		oOverlay.style.height = document.documentElement.offsetHeight.toString() + 'px';
		oOverlay.style.left = document.documentElement.scrollLeft.toString() + 'px';
		oOverlay.style.position = 'absolute';
		oOverlay.style.top = document.documentElement.scrollTop.toString() + 'px';
		oOverlay.style.width = document.documentElement.offsetWidth.toString() + 'px';
	} else {
		oOverlay.style.height = '100%';
		oOverlay.style.left = '0';
		oOverlay.style.position = 'fixed';
		oOverlay.style.top = '0';
		oOverlay.style.width = '100%';
	}
	
	oOverlay.style.backgroundColor = '#333';
	oOverlay.style.display = 'block';
	oOverlay.style.filter = 'alpha(opacity=50)';
	oOverlay.style.opacity = '0.5';
	oOverlay.style.zIndex = '500';
	
	oOverlay.id = 'ctgAlertOverlay';
	document.body.appendChild(oOverlay);
	document.body.style.height = '100%';
	
	if ( typeof fCallback == 'function' ) {
		oOverlay.onclick = fCallback;
	}
	return;
}
function ctgCloseAlert(sID, bSoftClose, sFocusId)
{
	bSoftClose = ( bSoftClose === true ) ? true : false;
	if ( --ctgAlertsOpen < 1 ) {
		ctgRemoveOverlay();
	}
	
	var oAlert = document.getElementById(sID);
	if ( oAlert ) {
		if ( bSoftClose ) {
			oAlert.style.display = 'none';
		} else {
			oAlert.parentNode.removeChild(oAlert);
		}
	}
	
	if ( /MSIE [56]/i.test(navigator.userAgent) ) {
		toggleSelects(true);
	}
	
	if ( sFocusId ) {
		try {
			var oFocusElement = document.getElementById(sFocusId);
			if ( oFocusElement ) {
				oFocusElement.focus();
			}
		} catch (e) { }
	}
	
	return;
}
function ctgRemoveOverlay()
{
	var oOverlay = document.getElementById('ctgAlertOverlay');
	if ( oOverlay ) {
		oOverlay.parentNode.removeChild(oOverlay);
	}
	
	return;
}
function ctgNull()
{
	return;
}
function ctgCaptureEnter(evt)
{
	evt = evt || window.event;
	evt.key = evt.charCode || evt.keyCode || evt.which || 0;
	evt.targetNode = evt.srcElement || evt.target || null;
	
	if ( evt.key == 3 || evt.key == 13 ) {
		if ( evt.preventDefault || evt.stopPropagation ) {
			if ( evt.preventDefault ) {
				evt.preventDefault();
			}
			if ( evt.stopPropagation ) {
				evt.stopPropagation();
			}
		} else {
			evt.keyCode = 0;
			evt.returnValue = false;
		}
		
		if ( evt.targetNode && evt.targetNode.form ) {
			evt.targetNode.form.getElementsByTagName('button')[0].click();
		}
	}
	
	return;
}
function toggleSelects(bShow)
{
	var oSelects = document.getElementsByTagName('select');
	for (var i = 0; i < oSelects.length; i++) {
		oSelects[i].style.visibility = ( bShow ) ? 'visible' : 'hidden';
	}
	return;
}
function messageAlert(iNotifications)
{
	if ( iNotifications > 0 ) {
		var sHTML = '<div class="messaging_inner_popup">';
		sHTML += '<div class="messaging_popup_top"></div>';
		sHTML += '<div class="messaging_popup_content">';
		if ( iNotifications > 1 ) {
			sHTML += 'You have new messages waiting!';
		} else {
			sHTML += 'You have a new message waiting!';
		}
		sHTML += '<br /><br />';
		sHTML += '<img src="/classes/Module/Messaging/Images/VeiwNow.png" ';
		sHTML += 'alt="View Now" height="25" width="96" onclick="handleMessageAlert(\'view\');" /> ';
		sHTML += '<img src="/classes/Module/Messaging/Images/RemindLater.png" ';
		sHTML += 'alt="Remind Me Later" height="25" width="151" onclick="handleMessageAlert(\'delay\');#CLOSE#" />';
		sHTML += '</div><div class="messaging_popup_bottom"></div></div>';
		ctgInfoBox(sHTML, null, 450, false, 'messaging_popup');
	}
	return;
}
function handleMessageAlert(sAction)
{
	switch ( sAction ) {
		case 'delay':
			var sURL = 'index.php?module=messaging&cmd=delay';
			ajax(sURL, 'post', 'ctgNull');
			break;
		case 'view':
			var sURL = 'index.php?module=messaging&cmd=inbox';
			document.location = sURL;
			break;
	}
	return;
}
function xGetComputedStyle(oElement, sProperty, bInteger)
{
	var oStyle, sValue = 'undefined', dv = document.defaultView;
	if ( dv && dv.getComputedStyle ) {
		oStyle = dv.getComputedStyle(oElement,'');
		if ( oStyle ) {
			sValue = oStyle.getPropertyValue(sProperty);
		}
	} else if ( oElement.currentStyle ) {
		sProperty = xCamelize(sProperty);
		sValue = oElement.currentStyle[sProperty];
	} else {
		return null;
	}
	return ( bInteger ) ? (parseInt(sValue) || 0) : sValue;
}
function xCamelize(sProperty)
{
	var aSegments = sProperty.split('-');
	var sValue = aSegments[0];
	for (var i = 1; i < aSegments.length; i++) {
		var sFirst = aSegments[i].charAt(0);
		sValue += aSegments[i].replace(sFirst, sFirst.toUpperCase());
	}
	return sValue;
}
