/*! Revision: 9fcddf4 */
var AIQ={cookie:"aiq",status:{id:0},currentBeacon:false,beacons:{fetchID:"//d.audienceiq.com/r/dd/id/L21rdC80NC9jaWQvMjUzMDgxOTQvdC8yL2NhdC8yNTMwODIwNg",ooReturn:false},daystolive:7,qamode:false,oosites:{"rxlist.com":"http://www.rxlist.com/pixel/aiq.b.3.html","emedicinehealth.com":"http://www.emedicinehealth.com/pixel/aiq.b.3.html","medicinenet.com":"http://www.medicinenet.com/pixel/aiq.b.3.html","medterms.com":"http://www.medterms.com/pixel/aiq.b.3.html"},oosite:false,init:function(){var a=this,c,b=document.referrer,e="",d;d=document.location.href.match(/domain=([^\&]+)/);if(d){e=d[1].toLowerCase()}if(a.currentBeacon){return false}a.today=this._getDateYYMMDD(new Date());if(e){for(c in a.oosites){if(e.indexOf(c)>-1){a.oosite=c;break}}}if(b&&b.indexOf("?webmddebug=1")>-1){a.qamode=true}a._log("referrer="+b+", domain="+e+", oosite="+a.oosite+", qamode="+a.qamode);if(a.getCookieInfo()){a._log("current id="+a.status.id);return a.returnToOrigin()}else{a._log("require new aiq")}a.triggerBeacon("fetchID");return true},getCookieInfo:function(){var a=this,d=a._readCookie(a.cookie),f=new Date(),e,b,c;if(!d){return false}c=d.match(/^(\d+)\|(\d\d\d\d\d\d)/);if(!c||c.length<3){return false}a.status.id=c[1];b=c[2];f.setTime(f.getTime()-(a.daystolive*24*60*60*1000));f=a._getDateYYMMDD(f);if((b*1)>(a.today*1)){return false}if((b*1)<=(f*1)){return false}return true},setCookie:function(){var a=this;document.cookie=a.cookie+"="+a.status.id+"|"+a.today+"|y; expires=Mon, 28 Aug 2028 20:30:02 GMT; domain=.webmd.com; path=/"},triggerBeacon:function(d){var b=this,a,c;b.currentBeacon=d;a=b.beacons[d];a=a.replace("{SEED}",(+new Date()).toString()+(Math.floor(Math.random()*9900)+1).toString());c=document.createElement("iframe");c.id=d;c.src=a;document.getElementsByTagName("body")[0].appendChild(c);b.beacons[d]="about:blank";b._log("beacon="+d+", src="+a);return true},returnID:function(b){var a=this;if(a.status.id!=b){a.status.id=b;a.coreOmnitureCall("core")}a.setCookie();return a.returnToOrigin()},returnKnown:function(a){return false},returnToOrigin:function(){var a=this;if(!a.oosite){return false}a._log("sending back to "+a.oosite);a.beacons.ooReturn=a.oosites[a.oosite]+"?aiq="+a.status.id+"|"+a.today;a.triggerBeacon("ooReturn");return true},coreOmnitureCall:function(d){var a=this,e=a.status.id,b="expid-aiq-",c="coreOmnitureCall";b+=d;c+=d;a.beacons[c]=((document.location.protocol.indexOf("https")>-1)?"https://ssl.o.webmd.com":"http://std.o.webmd.com")+"/b/ss/webmdtrackadsvista/1/H.23.8/s{SEED}?AQB=1&ndh=1&ns=webmd&cdp=3&pageName="+b+"&pe=lnk_o&v45="+e+"&c46="+b+"&c36=exp&pev2="+b+"&pid="+b+"&pidt=1&ot=A&AQE=1";a.triggerBeacon(c);return true},_readCookie:function(b){var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)===0){return f.substring(e.length,f.length)}}return null},_getDateYYMMDD:function(a){return a.getFullYear().toString().substr(2,2)+this._leftPad(a.getMonth()+1,"0",2)+this._leftPad(a.getDate(),"0",2)},_leftPad:function(c,a,b){c=""+c+"";while(c.length<b){c=a+c}return c},_log:function(a){a="AIQ: "+a;if(this.qamode&&typeof console=="object"){console.log(a)}}};