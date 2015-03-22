userBrowser = (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
})();
var addScript = getCurrentPath().replace(/users/, "tools");
(function(){
	if(userBrowser.MobileSafari){
		document.write('<style type="text/css">\n<!--\nhtml, body, div, span, table {-webkit-text-size-adjust:none;}\n-->\n</style>');
	}

	var files = [getCurrentPath()+"ws-common.css"];
	// footer add
	if( !document.getElementById('d_u0c0_linkAd') ){
		files.push(getCurrentPath()+"add.js?from="+document.domain);
	}
	includeFile(files);
	
})();
function includeFile(files){
	
	var arr = mixedReturn(files),
		returnArr = [];

	for(var i=0;i<arr.length;i++){

		var filename = arr[i],
			filetype = getExt(filename);

		if (filetype=="js"){ //if filename is a external JavaScript file
			var fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
			returnArr.push(fileref);
		}
		else if (filetype=="css"){ //if filename is an external CSS file
			var fileref=document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
			returnArr.push(fileref);
		}
		if (typeof fileref!="undefined")
			document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	return returnArr;
}

function afterLoad(ele, callback){
	ele.onload=function(){
		callback();
	}

	if( navigator.userAgent.match(/MSIE [1-8]/i) ){
		for_old_ie(ele, callback);
	}
	
	function for_old_ie(ele, callback){
		if (ele.readyState=='loaded' || ele.readyState=='completed') {
			callback();
		} else {
			setTimeout(function() {for_old_ie(ele, callback); }, 100);
		}
	}
}

function mixedReturn(Obj){
	if(typeof Obj == "string"){
		var arr = new Array();
		arr[0] = Obj;
	}else{
		arr = Obj;
	}
	return arr;
}

function getExt(file){
	var file = getFileFromPath(file), ext = "";
		file = file.replace(/\?.*?$/img, "");
	
	if(file.indexOf(".")!=-1){
		var p = file.lastIndexOf(".");
		ext = file.substr(p+1, (file.length-p)-1).toLowerCase();
	}
	return ext;
}

function getFileFromPath(file){
	var p = file.lastIndexOf("/");
	return file.substr(p+1, (file.length-p)-1);
}

function getCurrentPath(){
	var arr = document.getElementsByTagName("SCRIPT");
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].src && arr[i].src.indexOf("ws-common.js") != -1){
			return arr[i].src.replace("ws-common.js", "");
		}
	}
	return "";
}