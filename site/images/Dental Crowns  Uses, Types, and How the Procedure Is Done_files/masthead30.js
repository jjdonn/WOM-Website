webmd=window.webmd||{};webmd.p=webmd.p||{};webmd.p.masthead=webmd.p.masthead||{domain_vals:(function(){var b,a;b=webmd.url.getEnv();a={".perf":1,".devint":1,".qa00":1,".qa01":1};if(b&&!a[b]){b=".perf"}if(b===".perf"){$(function(){$("#authorization a").each(function(){var c=$(this).attr("href");if(/member\.webmd/.test(c)){$(this).attr("href",webmd.url.addLifecycleAndEnv(c,"http://www.perf.webmd.com"))}})})}return{env:b,member_url:"https://member"+b+".webmd.com",url:window.location.href,signcookie:webmd.cookie.exists("WBMD_AUTH")}}()),default_elements:{nav_container:"#masthead #nav",nav_tab_id_prefix:"#masthead #nav_",nav_tab_class:"#masthead .nav",nav_dropdown:"#masthead .nav_dropdown",nav_link:"#masthead .nav_link",login_container:"#login",login_tab_id:"#login_tab",login_dropdown:"#login_dropdown",logged_in_container:"#logged_in",logged_in_tab_id:"#logged_in_tab",logged_in_dropdown:"#logged_in_dropdown",overlay:"#masthead #global_overlay"},touch_enabled:Modernizr.touch,default_timeout:1000,nav_content_loaded:false,inside_nav:false,nav_dropdown_mousedown:false,tab_highlighted:"",hover_tab:"",dropdown_stays_open_id:"",overlay_on:null,reg_typing:false,login_dropdown_mousedown:false,login_dropdown_stays_open_id:"",logged_in_dropdown_stays_open_id:"",nickname:"",session_storage_supported:window.Storage!==undefined?true:false,programmed_links:{mapping:{pb11:"t2",pb20:"t2",pb29:"t3",pb30:"t3"},chronicle_id:"091e9c5e80acf2b1",site:"",image_prefix:""},init:function(){this.nickname=(window.nickname!==undefined&&window.nickname!=="")?window.nickname:"";this.setupTabHighlighting();this.setupNav();if(this.domain_vals.signcookie){this.setupAuthorizationLoggedIn()}else{this.setupAuthorizationLogin()}this.setupSearch();this.setupPageEventHandlers();webmd.load({css:image_server_url+"/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css"});$(function(){try{$("html > head").append($("<style>#global_overlay.tab_on, #global_overlay.authorization_on { height: "+($(document).height()+500)+"px; }</style>"))}catch(a){}})},changeAriaAttributes:function(d,b){b=(typeof b==="undefined"||b===true)?true:false;var c=b,a=!b;if($(d).length>0){$(d).attr("aria-expanded",c).attr("aria-hidden",a)}},displayProgrammedContentFromAjax:function(c,a){var b=this,h="http://",d=$.extend({},{image_prefix:b.programmed_links.image_prefix}),g={t1:'<a href="{{link_url.@chronic_id}}" class="{type}">{link_text}{i_tag}</a>',t2:'                        <img src="{image_prefix}{link_source_icon.@path}" alt="{link_source_icon.@alt}" />                        <a href="{{link_url.@chronic_id}}" class="bold">{link_text}</a>                        <p>{action_text}</p>                        <a href="{{link_url.@chronic_id}}" class="link_overlay" tabindex="-1"></a>',t3:'                        <a href="{{link_url.@chronic_id}}" class="nav_image"><img src="{image_prefix}{link_source_icon.@path}" alt="{link_source_icon.@alt}" /></a>                        <a href="{{link_url.@chronic_id}}" class="shorter">{link_text}</a>                        <p>{action_text}</p>'},f=[];if(window.location.protocol=="https:"){h="https://"}$.each(a,function(i,j){if(j["@pointer"]==="0"){if(typeof j.target[0]!=="undefined"){for(var k=0;k<j.target.length;k++){if(j.target[k]["@siteid"]==="3"){d[j["@chronic_id"]]=h+j.target[k]["@prefix"]+"."+b.programmed_links.site+j.target[k]["@friendlyurl"]}}}else{d[j["@chronic_id"]]=h+j.target["@prefix"]+"."+b.programmed_links.site+j.target["@friendlyurl"]}}else{d[j["@chronic_id"]]=j.target["@friendlyurl"]}});$.each(c,function(k,o){var m="pb"+k,i=$("#"+m),n;if(i.length){var j=webmd.substitute(g[(b.programmed_links.mapping[m]||"t1")],o);var p=j.match(/href="\{([^\}]+)\}"/i);if(p&&p[1]){var l=d[p[1]];if(/\/ss\/|slideshow/i.test(l)){j=webmd.substitute(j,{type:"type_ss",i_tag:" <i> </i>"})}else{if(/vid/i.test(l)){j=webmd.substitute(j,{type:"type_vid",i_tag:" <i> </i>"})}else{if(/blogs\.|exchanges\./i.test(l)){j=webmd.substitute(j,{type:"type_com",i_tag:" <i> </i>"})}else{j=webmd.substitute(j,{type:"",i_tag:""})}}}}j=webmd.substitute(j,d);j=j.replace(/\{+[^\}]*\}+/g,"");f[f.length]=m;sessionStorage[m]=j;b.displayElement(m,j)}});sessionStorage.masthead_links=f.join(",")},displayProgrammedContentFromSessionStorage:function(){var a=this;$.each(sessionStorage.masthead_links.split(","),function(b,c){if(typeof sessionStorage[c]!=="undefined"&&sessionStorage[c]){a.displayElement(c,sessionStorage[c])}else{$("#"+c).removeClass("hide_link")}})},displayElement:function(f,c){var b=this,a=$("#"+f),h=$("#"+f+" a").attr("onclick"),d=c.match(/src="([^"]+)"/);if(b.programmed_links.mapping[f]&&d!=null&&d[1]){var g=b.showImageElementAfterTimeout(a);webmd.load({image:d[1],load:function(){clearTimeout(g);a.html(c).removeClass("hide_link hide_pb_link").click(h)}})}else{a.html(c).removeClass("hide_link hide_pb_link").click(h)}},showImageElementAfterTimeout:function(a){return setTimeout(function(){a.removeClass("hide_link")},this.default_timeout)},getProgrammedContent:function(){var b=this;var c,a;c=new Date().getTime();a=b.session_storage_supported?sessionStorage.time_stamp||0:0;if((c-a<600000)&&b.session_storage_supported&&sessionStorage.masthead_links&&sessionStorage.site&&sessionStorage.image_prefix){b.programmed_links.site=sessionStorage.site;b.programmed_links.image_prefix=sessionStorage.image_prefix;webmd.debug("masthead populated by sessionStorage");b.displayProgrammedContentFromSessionStorage()}else{$.ajax({type:"GET",dataType:"json",url:"/api/repository/repositoryservice.svc/GetModuleXML",data:{chronicleID:b.programmed_links.chronicle_id},success:function(d){if(d&&typeof d.webmd_rendition!=="undefined"){b.programmed_links.site=d.webmd_rendition.resources.sites.site[0]["@domain"];b.programmed_links.image_prefix=d.webmd_rendition.resources.ImageServerUrls.ImageServerUrl[0]["@url"];if(b.session_storage_supported){sessionStorage.time_stamp=c;sessionStorage.site=d.webmd_rendition.resources.sites.site[0]["@domain"];sessionStorage.image_prefix=d.webmd_rendition.resources.ImageServerUrls.ImageServerUrl[0]["@url"]}webmd.debug("masthead populated by ajax call");b.displayProgrammedContentFromAjax(d.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link,d.webmd_rendition.referenced_objects.object)}else{$(".hide_link").removeClass("hide_link")}},error:function(){webmd.debug("error loading chronic_id "+b.programmed_links.chronicle_id);$(".hide_link").removeClass("hide_link")}});$("<img/>").attr("src",image_server_url+"/webmd/consumer_assets/site_images/layout/2012Chrome/pill_identifier_bg.jpg");$("<img/>").attr("src",image_server_url+"/webmd/consumer_assets/site_images/layout/2012Chrome/symptom_checker_bg.jpg")}},setupNav:function(){var a=this;$(document).one("mousemove",function(){$(a.default_elements.nav_container).hoverIntent(function(){if(!a.nav_content_loaded){a.getProgrammedContent();a.nav_content_loaded=true}a.inside_nav=true;if(a.dropdown_stays_open_id===""){a.closeNavDropdowns();$(a.default_elements.nav_tab_id_prefix+a.hover_tab).addClass("tab_on dropdown_on");$(a.default_elements.overlay).removeClass("authorization_on").addClass("tab_on")}},function(){a.inside_nav=false;if(a.dropdown_stays_open_id===""){a.closeNavDropdowns();$(a.default_elements.overlay).removeClass("authorization_on tab_on");if(a.tab_highlighted){$(a.default_elements.nav_tab_id_prefix+a.tab_highlighted).addClass("tab_on")}}});$(a.default_elements.nav_tab_class).hover(function(){a.hover_tab=$(this).attr("id").substring(4,5);if(a.inside_nav&&a.dropdown_stays_open_id===""){a.closeNavDropdowns();$(this).addClass("tab_on dropdown_on");$(a.default_elements.overlay).removeClass("authorization_on").addClass("tab_on")}},function(){a.hover_tab="";if(a.inside_nav&&a.dropdown_stays_open_id===""){a.closeNavTabs();if(a.tab_highlighted){$(a.default_elements.nav_tab_id_prefix+a.tab_highlighted).addClass("tab_on");$(a.default_elements.overlay).removeClass("authorization_on tab_on")}}})});if(a.touch_enabled){$(a.default_elements.nav_link).bind("click",function(c){if(!a.nav_content_loaded){a.getProgrammedContent();a.nav_content_loaded=true}if(a.dropdown_stays_open_id){var b=$(this).attr("id").substring(9,10);if(b!==a.dropdown_stays_open_id){a.dropdown_stays_open_id=b;a.closeNavDropdowns();a.openNavDropdown();$(a.default_elements.overlay).removeClass("authorization_on").addClass("tab_on")}else{a.closeNavTabs()}}else{a.dropdown_stays_open_id=$(this).attr("id").substring(9,10);a.closeNavDropdowns();a.openNavDropdown();$(a.default_elements.overlay).removeClass("authorization_on").addClass("tab_on")}return false});$(".nav_link").append('<span class="arrow_nav"></span>')}else{$(a.default_elements.nav_link).bind("focus",function(b){if(!a.nav_content_loaded){a.getProgrammedContent();a.nav_content_loaded=true}a.overlay_on=a.default_elements.nav_container;a.dropdown_stays_open_id=$(this).attr("id").substring(9,10);a.closeNavDropdowns();$(a.default_elements.overlay).removeClass("authorization_on").addClass("tab_on");a.openNavDropdown();a.changeAriaAttributes(".nav_dropdown",false);a.changeAriaAttributes("#menu_"+a.dropdown_stays_open_id,true);return false})}a.addTabbingBlur(a.default_elements.nav_container,a.closeNavTabs);$(a.default_elements.nav_tab_class).bind("click",function(b){b.stopPropagation()});$(a.default_elements.nav_dropdown).bind("mousedown",function(b){a.nav_dropdown_mousedown=true})},setupAuthorizationLogin:function(){var a=this;$(a.default_elements.login_container).hoverIntent(function(){a.wmdPageLink("reg-login-imp");$(this).addClass("on");$(a.default_elements.overlay).removeClass("tab_on").addClass("authorization_on")},function(){if(!a.reg_typing&&!a.login_dropdown_stays_open_id){a.closeLogin()}});$(a.default_elements.login_tab_id).bind("click",function(){return false});$(a.default_elements.login_tab_id).bind("focus",function(){a.wmdPageLink("reg-login-imp");a.overlay_on=a.default_elements.login_container;a.closeNavTabs();a.login_dropdown_stays_open_id=true;$(a.default_elements.login_container).addClass("on");$(a.default_elements.overlay).removeClass("tab_on").addClass("authorization_on");a.changeAriaAttributes(a.default_elements.login_dropdown,true)});a.addTabbingBlur(a.default_elements.login_container,a.closeLogin);$(a.default_elements.login_container).bind("click",function(b){b.stopPropagation()});$(a.default_elements.login_dropdown).bind("mousedown",function(b){a.login_dropdown_mousedown=true});$(a.default_elements.login_container).bind("click",function(b){b.stopPropagation()});if(typeof webmd.isDown==="function"&&webmd.isDown("reg")){a.setupLoginNotAvailable()}else{a.setupLoginAvailable()}},setupLoginNotAvailable:function(){$(this.default_elements.login_dropdown).html("<h3>Sign in is temporarily unavailable</h3><p>We're sorry, account access is temporarily unavailable. The site is undergoing routine maintenance and will be back shortly.</p>").addClass("login_unavailable")},setupLoginAvailable:function(){var a=this;$("#reglogin_password").hide().val("");$("#reglogin_password_text").show();$("#reglogin_password_text").val("Please enter your password");$("#reglogin_username").val("Please enter email address");$(a.default_elements.login_container+" form input, "+a.default_elements.login_container+" form a").bind("focus",function(){a.reg_typing=true});$("#reglogin_username").bind("focus",function(){if($(this).val()=="Please enter email address"){$(this).val("")}});$("#reglogin_username").bind("blur",function(){a.reg_typing=false;if($(this).val()==""){$(this).val("Please enter email address")}});$("#reglogin_password_text").bind("focus",function(){$(this).hide();$("#reglogin_password").val("").show().focus()});$("#reglogin_password").bind("blur",function(){a.reg_typing=false;if($(this).val()==""){$(this).hide();$("#reglogin_password_text").show()}});var b=webmd.appid||1;var d=a.domain_vals.member_url+"/signin";d=webmd.url.setParam("appid",b,d);d=webmd.url.setParam("returl",a.domain_vals.url,d);$("#globalreg").attr("action",d);var c=a.domain_vals.member_url+"/register";c=webmd.url.setParam("appid",b,c);c=webmd.url.setParam("returl",a.domain_vals.url,c);$("#authorization #login_dropdown_col_2 a.webmd-btn").attr("href",c);$("#globalreg").bind("submit",function(){if(a.validateLoginForm()){a.wmdPageLink("reg-login_core")}else{a.wmdPageLink("reg-login-error_core");return false}});$("#globalreg input").bind("keypress",function(f){if(f.keyCode==13){$("#globalreg").submit()}});$("#reg_add_info a").hoverIntent(function(){$("#reg_add_info p").show()},function(){$("#reg_add_info p").hide()})},setupAuthorizationLoggedIn:function(){var a=this;$(a.default_elements.logged_in_container).hoverIntent(function(){a.wmdPageLink("ov-mymd-imp");$(this).addClass("on");$(a.default_elements.overlay).removeClass("tab_on").addClass("authorization_on")},function(){if(!a.logged_in_dropdown_stays_open_id){a.closeLoggedIn()}});$(a.default_elements.logged_in_tab_id).bind("click",function(){return false});$(a.default_elements.logged_in_tab_id).bind("focus",function(){a.closeNavTabs();if(!a.logged_in_dropdown_stays_open_id){a.wmdPageLink("ov-mymd-imp");$(a.default_elements.logged_in_container).addClass("on");$(a.default_elements.overlay).removeClass("tab_on").addClass("authorization_on");a.logged_in_dropdown_stays_open_id=true;a.changeAriaAttributes(a.default_elements.logged_in_dropdown,true)}else{a.closeLoggedIn()}});a.addTabbingBlur(a.default_elements.logged_in_container,a.closeLoggedIn);$(a.default_elements.logged_in_container).bind("click",function(b){b.stopPropagation()});$(a.default_elements.login_container).hide();$("#why_webmd").hide();$("#logged_in_text").css("display","block");$(a.default_elements.logged_in_container).css("display","block");if(a.nickname){$("#greeting").html('|&nbsp&nbspWelcome <a id="nickname" href="'+a.domain_vals.member_url+'/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');" title="User Profile">'+a.nickname+"</a>")}else{$("#greeting").html('|&nbsp&nbsp<a id="nickname" href="'+a.domain_vals.member_url+'/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');" title="User Profile">My Profile</a>')}},setupSearch:function(){function a(){if($("#searchQuery_fmt").val()=="Search"){$("#searchQuery_fmt").val("")}return DoSearch()}$("#searchQuery_fmt").bind("focus",function(){if($(this).val()=="Search"){$(this).val("")}});$("#searchQuery_fmt").bind("blur",function(){if($(this).val()==""){$(this).val("Search")}});$("#searchQuery_fmt").bind("keypress",function(b){if(b.keyCode==13){b.preventDefault();a()}});$(".searchButton_fmt").bind("click",function(b){b.preventDefault();a()});$("#searchQuery_fmt").val("Search")},setupPageEventHandlers:function(){var a=this;$(a.default_elements.overlay).bind("touchstart",function(b){b.preventDefault()});$(a.default_elements.overlay).bind("touchend click",function(b){b.preventDefault();a.closeNavTabs();a.closeLogin();a.closeLoggedIn();a.reg_typing=false;a.login_dropdown_stays_open_id=false;a.logged_in_dropdown_stays_open_id=false;if(a.tab_highlighted){$(a.default_elements.nav_tab_id_prefix+tab_highlighted).addClass("tab_on")}});$("#centering_area").bind("click",function(b){a.login_dropdown_mousedown=false;a.nav_dropdown_mousedown=false;a.closeNavTabs();a.closeLogin();a.closeLoggedIn()})},setupTabHighlighting:function(){this.tab_highlighted="";if(this.tab_highlighted){$(this.default_elements.nav_tab_id_prefix+this.tab_highlighted).addClass("tab_on")}},addTabbingBlur:function(g,f){var a=this,b=null;function d(){a.overlay_on=g;if(b){clearTimeout(b)}}function c(){if((g===a.default_elements.logged_in_container)||(g===a.default_elements.login_container&&a.login_dropdown_mousedown===false)||(g===a.default_elements.nav_container&&a.nav_dropdown_mousedown===false)){a.overlay_on=null;b=setTimeout(function(){f.apply(a);if(a.overlay_on){if(a.overlay_on===a.default_elements.nav_container){$(a.default_elements.overlay).removeClass("authorization_on").addClass("tab_on")}else{if(a.overlay_on===a.default_elements.login_container){$(a.default_elements.overlay).removeClass("tab_on").addClass("authorization_on")}}}},10)}}if($(g).length){$(g)[0].onfocusout=c;$(g)[0].onfocusin=d;if($(g)[0].addEventListener){$(g)[0].addEventListener("blur",c,true);$(g)[0].addEventListener("focus",d,true)}}},openNavDropdown:function(){$(this.default_elements.nav_tab_id_prefix+this.dropdown_stays_open_id).addClass("tab_on dropdown_on")},closeNavDropdowns:function(){$(this.default_elements.nav_tab_class).removeClass("tab_on dropdown_on")},closeNavTabs:function(){this.dropdown_stays_open_id="";this.changeAriaAttributes(".nav_dropdown",false);$(this.default_elements.overlay).removeClass("tab_on authorization_on");this.closeNavDropdowns()},closeLogin:function(){this.login_dropdown_stays_open_id=false;this.changeAriaAttributes(this.default_elements.login_dropdown,false);$(this.default_elements.overlay).removeClass("tab_on authorization_on");$(this.default_elements.login_container).removeClass("on")},closeLoggedIn:function(){this.logged_in_dropdown_stays_open_id=false;this.changeAriaAttributes(this.default_elements.logged_in_dropdown,false);$(this.default_elements.overlay).removeClass("tab_on authorization_on");$(this.default_elements.logged_in_container).removeClass("on")},validateLoginForm:function(){var b="",a="",d=false,c=false;if(($("#reglogin_username").val()=="")||($("#reglogin_username").val()=="Please enter email address")){$("#email_message").addClass("on");b="Please enter your email address"}else{if(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i.test($("#reglogin_username").val())){$("#email_message").addClass("on");b="Please enter a valid email address"}else{d=true;$("#email_message").removeClass("on")}}if($("#reglogin_password").val()==""){$("#password_message").addClass("on");a="Please enter your password"}else{c=true;$("#password_message").removeClass("on")}if(d&&c){return true}else{$("#email_message").html(b);$("#password_message").html(a);return false}},wmdPageLink:function(a){if(window.wmdPageLink){window.wmdPageLink(a)}}};webmd.p.reg_data={services:{defaults:{contentType:"application/json; charset=utf-8",dataType:"json",timeout:10000,type:"GET",cache:"false"},add_bookmark:function(c){var g=$(".add_bookmark_input").val();var b=(c!==undefined)?c:document.URL;var d=(window.location.host.split(".")[1]=="webmd")?"member":"member."+window.location.host.split(".")[1];b=b.replace("//","//");var a={title:g,url:b};var f={success:function(h){webmd.p.header.addBMSsuccess();webmd.p.header.kill_cache()},error:function(l,o,n){var m="There was an error in your request. Please try again later.";var i=jQuery.parseJSON(l.responseText);if(i){if(i.code==-1000){m="This page has already been saved"}else{if(i.code==-1001){m="There is already a saved item with that name.  Please type a new name."}else{if(i.code==-1002){m="You have exceeded the max amount of bookmarks.  Please delete some of the above in order to add more."}else{if(i.code==-2){var k,j,h;k=webmd.appid||1;j=webmd.url.setParam("bookmark","true");h="https://"+d+".webmd.com/signin";h=webmd.url.setParam("appid",k,h);h=webmd.url.setParam("returl",j,h);m=webmd.substitute('Your session has ended. To protect your privacy, please <a class="signin_overlay_utn" href="{href}" onclick="return sl(this,\'\',\'reg-ovlylogin\');">sign in</a> again.',{href:h})}}}}}webmd.p.header.showOverlayError(m)},type:"POST",data:webmd.json.stringify(a),url:window.location.protocol+"//"+window.location.hostname+"/api/reg/Bookmarks.svc/json/add"};return $.extend({},this.defaults,f)}},supports_storage:function(){try{return"localStorage" in window&&window.localStorage!==null}catch(a){return false}},bm_data:[],app_data:{}};webmd.p.header={domain_vals:function(){prvwDmn=((document.location.href.indexOf("preview.w")!=-1)||(document.location.href.indexOf("member.perf")!=-1))?"preview.":"";currDmn=(document.location.href.indexOf("perf.w")!=-1)?"perf.":(document.location.href.indexOf("qa00.w")!=-1)?"qa00.":(document.location.href.indexOf("preview.w")!=-1)?"perf.":"";var b="https://member."+currDmn+"webmd.com";var a=webmd.cookie.exists("WBMD_AUTH");if(image_server_url.indexOf(currDmn)==-1&&image_server_url.indexOf("preview")<0){image_server_url=image_server_url.replace("img.","img."+currDmn)}return{prvwDmn:prvwDmn,currDmn:currDmn,member_url:b,signcookie:a}},addBMSsuccess:function(){webmd.overlay.close()},kill_cache:function(){var a=webmd.p.reg_data;if(a.supports_storage()){localStorage.clear()}a.bm_data.length=0},cleanSession:function(){var a=this;var b=document.referrer;var c="";if(b!=""){b=b.split("/")[2].split(".")[0]}c=window.location.host.split(".")[0];if(c!=b){a.kill_cache()}},setup_page_header:function(){var a=this;var b=a.domain_vals();$("#ctl00_ContentWell_Login_imgCmdSubmit").bind("click",function(){a.kill_cache()});a.cleanSession();bookmark_link=$('<a title="Save" href="#" rel="nofollow">Save</a>');$(bookmark_link).unbind("click").bind("click",function(g){g.preventDefault();wmdPageLink("bkmrkpg");webmd.p.header.bookmark_page()});if($("#headerLinks_print").length&&hdr){var d=(!$("#headerLinks_email").is(":visible")&&!$("#headerLinks_print").is(":visible"))?true:false;if(!d){var f=(!$(".headerLinks_fmt:last").is(":visible"))?$(".headerLinks_fmt:first"):$(".headerLinks_fmt:last");if(f.length<1){f=$("#breadcrumb_rdr")}$(bookmark_link).insertAfter(f).wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />')}}else{if(hdr&&location.host.indexOf("member.")==-1){if($("#breadcrumb_rdr").length>0&&$("#exchange-group-tools").length<1){$(bookmark_link).appendTo("#breadcrumb_rdr").wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');$("#breadcrumb_rdr").css("width","100%")}else{if($("#exchange-group-tools").length>0){$(bookmark_link).insertAfter("#exchange-group-tools").wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />')}else{$(bookmark_link).prependTo("#breadcrumb_ctr").wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />')}}}}if(webmd.url.getParam("retsub")){var c="";if(document.location.href.indexOf("/diet/")>-1){c=function(){window.location.href=b.member_url+"/subscriptions.aspx"};webmd.overlay=$.extend(webmd.overlay,{close:function(){$.fn.colorbox.close();c()}})}}else{if(document.location.host.indexOf("vaccine")>-1&&document.referrer.indexOf("retsub=t")>-1){window.location.href=b.member_url+"/subscriptions.aspx"}}},is_overlay_loaded:function(a){if(!webmd.p.registration){webmd.p.registration={}}if($("link[href$='reg_hdr_styles.css']","head").length==0){webmd.load({css:image_server_url+"/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css",load:function(){$(".login_rdr").parent().css("top","0px")}})}if(!webmd.p.registration.loginOverlay){webmd.load({js:image_server_url+"/webmd/PageBuilder_Assets/JS_static/registration/loginOverlay.js",load:function(){a()}})}else{a();return true}},showOverlayError:function(b){var a=this;if($(".overlay_error").length<1){$('<p class="overlay_error">'+b+"</p>").insertAfter(".add_bookmark_rdr p:first")}else{$(".overlay_error").html(b)}$(".add_bookmark_input","#webmdHoverLoadedContent").css({border:"1px solid #EC1919",background:"#ffffff"});a.bindErrorLogin();webmd.overlay.resize("height")},bindErrorLogin:function(){function a(){var c=webmd.p.header.getPromoApp();var b={appid:c,unAuth:true};webmd.p.registration.loginOverlay.show(b)}$(".signin_overlay_utn").click(function(b){b.preventDefault();wmdPageLink("reg-ovlylogin");is_overlay_loaded=webmd.p.header.is_overlay_loaded(a);if(is_overlay_loaded){webmd.p.registration.loginOverlay.show(signin_params)}})},bookmark_page:function(b,f){var c=webmd.p.reg_data;function a(){if(webmd.p.registration.isLoggedIn()){d()}else{var h=webmd.p.header.getPromoApp();var g={appid:h,returl:webmd.url.addParam("bookmark","true",document.location.href)};webmd.p.registration.loginOverlay.show(g)}}function d(){var g='<div class="add_bookmark_rdr"><h2>Save to My WebMD Pages</h2><p>You can save this page with the current page title or you can create a new page title.</p><input type="text" class="add_bookmark_input" /><a href="#" id="add_bm_butn" class="webmd-btn webmd-btn-pr webmd-btn-s">Add</a><a href="#" id="cancel_bm_butn">Cancel</a></div>';webmd.overlay.open({width:"550px",html:g,onComplete:function(){var h=(f!==undefined)?f:document.title;$("#cancel_bm_butn").click(function(i){i.preventDefault();webmd.overlay.close()});$(".add_bookmark_input").val(h).focus(function(){$(this).data("o_val",$(this).val())}).blur(function(){if($(this).val()==""){$(this).val($(this).data("o_val"))}});$("#add_bm_butn").unbind("click").bind("click",function(i){i.preventDefault();xhr=$.ajax(c.services.add_bookmark(b));wmdPageLink("bkmrk-ovly-add_sub")})}})}is_overlay_loaded=webmd.p.header.is_overlay_loaded(a);if(is_overlay_loaded){if(webmd.p.registration.isLoggedIn()){wmdPageLink("bkmrk-ovly-imp");d()}else{promo=a}}},getPromoApp:function(){var a=1;a=(window.location.pathname.indexOf("/magazine/")>-1)?6:a;a=(window.location.host.indexOf("exchanges")>-1)?5:a;return a},regHdOpt:{speed:{i:300,o:250},delay:300,leave:null,enter:null,tt:null,typing:false}};var header=webmd.object(webmd.p.header);domain_vals=webmd.p.header.domain_vals();if(window.location.protocol=="https:"){image_server_url=image_server_url.replace("http:","https:")}try{var hdr=true;if(hdr&&pf_param!="true"){$("head").append(webmd.load({css:image_server_url+"/webmd/consumer_assets/site_images/css/masthead_badge.css"}))}}catch(e){var hdr=false}$(function(){header.setup_page_header()});