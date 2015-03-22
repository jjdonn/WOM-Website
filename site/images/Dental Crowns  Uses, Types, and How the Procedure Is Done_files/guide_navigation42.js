function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function oc(a) {
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}


  function addClassName (id, classname) {
     var e;

      /* The id parameter can be an element id string,
	 or a pointer to an element in the DOM
      */
      if (typeof(id) == 'string') {
	e = this.getElementById(id);
      } else {
	e = id;
      }

      if (!e || typeof e.className != 'string') {
	throw "Cannot add class to element " + id;
      }

      /* Check if the class is already there */
      if (!e.className.match(new RegExp('\\b' + classname + '\\b'))) {
	e.className += ' ' + classname;
      }
    }
	
	
	function highlightTab() {
		if (!document.getElementsByTagName) return false;
		if (!document.getElementById) return false;
		
		if (!document.getElementById("chapterTabs")) return false;
		var ctNav = document.getElementById("chapterTabs");
		var ctlinks = ctNav.getElementsByTagName("a");	
		
		var currenturl = new RegExp(s_furl, "gi"); 
	
			for (var x=0; x<ctlinks.length; x++) {
			var ctlinkurl = ctlinks[x].getAttribute("href");
				if (ctlinkurl.search(currenturl) != -1) {
				setNavState(x + 1,"0");
				}
			}				
	}		

	function setNavState(chapter,subchapter) {
		if (chapter != "") {
			if (document.getElementById("chapter" + chapter)) {
				var elem = document.getElementById("chapter" + chapter);
				elem.className = "chapterMenuOn_fmt";
				
				if (subchapter != "") {
				elem = document.getElementById("chapter0Menu");
				elem.className = "hide_fmt";
				elem = document.getElementById("chapter" + chapter + "Menu");
				elem.className = "show_fmt";
					if (document.getElementById("chapter" + chapter + "_subChapter" + subchapter)) {
					elem = document.getElementById("chapter" + chapter + "_subChapter" + subchapter);
					elem.className = "horizNav_nudge_on_fmt";
					}
				}
			}
		}
	}
	
	
	function highlightLeftBin(leftBinChapter) {
		if (!document.getElementsByTagName) return false;
		if (!document.getElementById) return false;
		if (!document.getElementById("standardSubnav_fmt")) return false;
		
		var nav = document.getElementById("standardSubnav_fmt");
		var links = nav.getElementsByTagName("a");
		
		var currenturl = new RegExp(leftBinChapter, "gi");
		
		for (var i=0; i<links.length; i++) {
		var linkurl = links[i].getAttribute("href");
			if (linkurl.search(currenturl) != -1) {
			addClassName(links[i].parentNode, 'here');
			}
		}
	}
	
	function highlightCenterBin(centerBinChapter) {
		if (!document.getElementsByTagName) return false;
		if (!document.getElementById) return false;
		if (!document.getElementById("guideCenterList_fmt")) return false;
		
		var nav = document.getElementById("guideCenterList_fmt");
		var links = nav.getElementsByTagName("a");
		
		var currenturl = new RegExp(centerBinChapter, "gi");
		
		for (var i=0; i<links.length; i++) {
		var linkurl = links[i].getAttribute("href");
			if (linkurl.search(currenturl) != -1) {
			addClassName(links[i].parentNode, 'active_fmt');
			}
		}
	}


function stripUrlDomain(urlSrc) {
	var stripPrefixIndex = null;
	var stripPrefix = null;
	var stripDomainIndex = null;

	if (urlSrc != null) {
		stripPrefixIndex = urlSrc.indexOf("//");
		if (stripPrefixIndex != -1) {
			stripPrefix = urlSrc.substring(stripPrefixIndex+2, urlSrc.length);
			stripDomainIndex = stripPrefix.indexOf("/");
			if (stripDomainIndex != -1) {
				return stripPrefix.substring(stripDomainIndex, stripPrefix.length);
			}
		}			
	}
}

function selectNextArticle(articleNavSelectIdParam,friendlyUrlSrc) {
	var selectObj = document.getElementById(articleNavSelectIdParam);
	if (friendlyUrlSrc.lastIndexOf("?") > 0) {
		var friendlyUrl = friendlyUrlSrc.substring(0,friendlyUrlSrc.lastIndexOf("?"));
	} else {
		if (friendlyUrlSrc.indexOf("http://") != -1) {
			friendlyUrlSrc = friendlyUrlSrc.replace("http://","");
		}
		var friendlyUrl = friendlyUrlSrc;
	}
	if (selectObj != null) {
		for (i=0; i < selectObj.length; i++) {
			if (selectObj[i].value.lastIndexOf(friendlyUrl) > 0) {
				if (i < (selectObj.length-1)) {
					selectObj.selectedIndex = i + 1;
				}	
				break;
			}
		} // end for
	}
}


function popExternalWindow(urlParam) {
	var externalWindow;
	externalWindow = window.open(urlParam);
	if (window.focus) {externalWindow.focus()}
}

function submitNavForm(externalUrlListParam,selectId,advanceNavOption) {
	var currentExternalUrl;
	var isExternalUrl = false;
	var selectElement = document.getElementById(selectId);
	
	// calls omniture on this "module"
	switch(selectId)
	{
	case 'AllPulldown':
	  ctrs('art-top-dd');
	  break    
	case 'NextPulldown':
	  ctrs('art-bot-dd');
	  break
	}
	
	var currentSelectValue = selectElement.value;

	// look for the url in the external URLs array
	for (currentExternalUrl in externalUrlListParam) {
		if (externalUrlListParam[currentExternalUrl] == currentSelectValue) {
			isExternalUrl = true;
		}
	}
		
	if (isExternalUrl) {
		popExternalWindow(currentSelectValue);
		var currentOptionSelected = selectElement.selectedIndex;
		var numberOfOptions = selectElement.length;
		if (advanceNavOption && ((currentOptionSelected + 1) <= numberOfOptions)) {
			selectElement.selectedIndex = currentOptionSelected + 1; 
		} 				
	} else {
		window.location = currentSelectValue;
	}
	return false;
}
