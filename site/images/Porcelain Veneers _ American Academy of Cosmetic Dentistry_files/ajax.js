/*
 * FUNCTION ajax
 *
 *	@param	sAction		String representing the URL we will be sending to
 *						
 *	@param	sMethod		Either 'get' or 'post'
 *						
 *	@param	mHandler	Callback function (can be a function or the name of a function)
 *						
 *	@param	sParams		String containing URL-formatted parameters (e.g. 'a=1&b=2')
 *						
 *	@param	<bAbort>	Optional boolean; true forces any previously pending requests
 *						through this function to abort
 *
 *	Example usage:
 *
 *		ajax('index.php?module=mymodule&cmd=mycmd','post','receiveData','value=5');
 *		function receiveData(data) {
 *			//	do something with data
 *		}
 *
 *	You may also define an "ajaxFail" function in your own scripts (not this one!) if
 *	special behavior is needed when the Ajax request fails.
 */
function createRequestObject(){var ro;if(window.XMLHttpRequest){try{ro=new XMLHttpRequest();}catch(e){ro=null;}}else if(window.ActiveXObject){try{ro=new ActiveXObject('Msxml2.XMLHTTP');}catch(e){try{ro=new ActiveXObject('Microsoft.XMLHTTP');}catch(e){ro=null;}}}return ro;}function ajax(sAction,sMethod,mHandler,sParams,bAbort,bAsync){bAbort=(bAbort!=true)?false:true;bAsync=(bAsync===false)?false:true;sParams=(sParams==null)?'':sParams;var sData=(sMethod=='get')?'':sParams;var sURI=sAction;if(sMethod=='get'){sURI+=(/\?/.test(sAction))?'&'+sParams:'?'+sParams;}if(bAbort){if(http){if(http.readyState!=0){http.abort();}}}var http=createRequestObject();if(http){http.onreadystatechange=function(){if(http.readyState==4){try{var iStatus=http.status;}catch(e){var iStatus=0;}if(iStatus==200){if ( typeof mHandler == 'string' ){var sResponse=http.responseText.replace(/(\\|')/g,'\\$1').replace(/\r/g,'');eval(mHandler+"('"+sResponse.replace(/\n/g,'\\n')+"');");}else if(typeof mHandler=='function'){mHandler(http.responseText);}}else if(iStatus!=0){if(typeof ajaxFail=='function'){ajaxFail();}}}};http.open(sMethod,sURI,bAsync);http.setRequestHeader('Content-type','application/x-www-form-urlencoded');http.send(sData);}return;}