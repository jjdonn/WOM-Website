jQuery(document).ready(function ($) {
    "use strict";
    var $wheelholder, hoverDirection, leaveDirection, anSpeed, $this, wh, hh, hw;
    //If peekout animation is active, the wheel button will have class 'peekout'
    if ($('.wheel-button').hasClass('peekout')) {
        $wheelholder = $('#wheel-holder');
        //if the wheel is on the bottom of the page, set the moveDirection object as 'bottom' - so the 'bottom' css property is affected when hovered
        //also, define the anSpeed variable so there is an animation speed, otherwise it will be null so no animation will happen
        if ($wheelholder.hasClass('br') || $wheelholder.hasClass('bc') || $wheelholder.hasClass('bl')) {
            $('.wheel-button').css({
                bottom: '-' + ($('.wheel-button').height() * 1.2) + 'px'
            });
            hoverDirection = {
                'bottom': '1px'
            };
            leaveDirection = {
                'bottom': '-' + ($('.wheel-button').height() * 0.5) + 'px'
            };
            anSpeed = 300;
            setTimeout(function () {
                $('.wheel-button').animate({
                    bottom: '-' + ($('.wheel-button').height() * 0.5) + 'px'
                }, 500);
            }, 2000);
        }
        //if the wheel is on the top of the page, set the moveDirection objet as 'top' - so the 'top' css property is affected when hovered
        //also, define the anSpeed variable so there is an animation speed, otherwise it will be null so no animation will happen
        if ($wheelholder.hasClass('tr') || $wheelholder.hasClass('tc') || $wheelholder.hasClass('tl')) {
            $('.wheel-button').css({
                top: '-' + ($('.wheel-button').height() * 1.2) + 'px'
            });
            hoverDirection = {
                'top': '1px'
            };
            leaveDirection = {
                'top': '-' + ($('.wheel-button').height() * 0.5) + 'px'
            };
            anSpeed = 300;
            setTimeout(function () {
                $('.wheel-button').animate({
                    top: '-' + ($('.wheel-button').height() * 0.5) + 'px'
                }, 500);
            }, 2000);
        }
        //if the wheel is on the right center of the page, set the moveDirection objet as 'right' - so the 'right' css property is affected when hovered
        //also, define the anSpeed variable so there is an animation speed, otherwise it will be null so no animation will happen
        if ($wheelholder.hasClass('rc')) {
            $('.wheel-button').css({
                right: '-' + ($('.wheel-button').width() * 1.2) + 'px'
            });
            hoverDirection = {
                'right': '1px'
            };
            leaveDirection = {
                'right': '-' + ($('.wheel-button').width() * 0.5) + 'px'
            };
            anSpeed = 300;
            setTimeout(function () {
                $('.wheel-button').animate({
                    right: '-' + ($('.wheel-button').width() * 0.5) + 'px'
                }, 500);
            }, 2000);
        }
        //if the wheel is on the left center of the page, set the moveDirection objet as 'left' - so the 'right' css property is affected when hovered
        //also, define the anSpeed variable so there is an animation speed, otherwise it will be null so no animation will happen
        if ($wheelholder.hasClass('lc')) {
            $('.wheel-button').css({
                left: '-' + ($('.wheel-button').width() * 1.2) + 'px'
            });
            hoverDirection = {
                'left': '1px'
            };
            leaveDirection = {
                'left': '-' + ($('.wheel-button').width() * 0.5) + 'px'
            };
            anSpeed = 300;
            setTimeout(function () {
                $('.wheel-button').animate({
                    left: '-' + ($('.wheel-button').width() * 0.5) + 'px'
                }, 500);
            }, 2000);
        }
    }
    $('.wheel-button').on('mouseenter', function () {
        $this = $(this);
        $this.stop().animate(hoverDirection, anSpeed, function () {
            $('.wheel-button').trigger('wheelReady');
        });
    });
    $('#wheel-holder').on('mouseleave', function () {
        $this = $(this);
        $this.children('.wheel-button').removeClass("active").stop().animate(leaveDirection, anSpeed, function () {
            $('.wheel-button').trigger('wheelLeave');
        });
    });
    //$(".modal").colorbox({iframe:true, width:"80%", height:"80%"});
    // Handle all SHARE type sites
    // When a site is actually a link to 'share' the page, additional code is needed -- since we're not just creating a link to the user's page
    $('#wheel').on('click', 'li.item a.share', function (e) {
        e.preventDefault();
        if (local_info.is_mobile)
            return;
        $this = $(this);
        var wHeight = Math.ceil($(window).height() * 0.8),
            awHeight = Math.ceil($(window).height() * 0.65),
            wWidth = Math.ceil($(window).width() * 0.7),
            awWidth = Math.ceil($(window).width() * 0.5),
            awTop = Math.ceil(($(window).height() / 2) - (awHeight * 0.5)),
            awLeft = Math.ceil(($(window).width() / 2) - (awWidth * 0.5)),
            wTop = Math.ceil(($(window).height() / 2) - (wHeight * 0.5)),
            wLeft = Math.ceil(($(window).width() / 2) - (wWidth * 0.5)),
            pathArray,
            protocol,
            host,
            url,
            dBody,
            media = $this.attr('href'),
            currURL;
        //sometimes, the current URL will have #wheel ammended to the end, so let's remove that since we'll be sharing the URL
        currURL = encodeURIComponent((document.URL).replace('#wheel', ''));
        if (media === '') {
            media = $this.children('img').attr('src');
        }
        media = encodeURIComponent(media);
        if ($this.hasClass('facebook')) {
            window.open('http://www.facebook.com/share.php?u=' + currURL, 'myFB', 'status=0,height=' + wHeight + ',width=' + wWidth + ',top=' + wTop + ',left=' + wLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('twitter')) {
            window.open('http://twitter.com/home?status=' + currURL, 'myTW', 'status=0,height=' + awHeight + ',width=' + awWidth + ',top=' + awTop + ',left=' + awLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('google')) {
            window.open('https://plus.google.com/share?url=' + currURL, 'myGP', 'status=0,height=' + awHeight + ',width=' + awWidth + ',top=' + awTop + ',left=' + awLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('delicious')) {
            window.open('https://delicious.com/post?partner=addthis&url=' + currURL, 'myDL', 'status=0,height=' + wHeight + ',width=' + wWidth + ',top=' + wTop + ',left=' + wLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('pinterest')) {
            window.open('http://pinterest.com/pin/create/button/?url=' + currURL + '&media=' + media, 'myPN', 'status=0,height=' + awHeight + ',width=' + wWidth + ',top=' + awTop + ',left=' + wLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('friendfeed')) {
            window.open('http://friendfeed.com/?url=' + currURL, 'myFF', 'status=0,height=' + wHeight + ',width=' + wWidth + ',top=' + wTop + ',left=' + wLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('gmail')) {
            dBody = 'I wanted to share this with you';
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to&su=' + currURL + '&body=' + encodeURIComponent(dBody) + ' - ' + currURL + '&ui=2&tf=1', 'myGM', 'status=0,height=' + wHeight + ',width=' + wWidth + ',top=' + wTop + ',left=' + wLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('linkedin')) {
            pathArray = window.location.href.split('/');
            protocol = pathArray[0];
            host = pathArray[2];
            url = protocol + '://' + host;
            dBody = 'I want to share this with everyone.';
            window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + currURL + '&title=' + encodeURIComponent(document.title) + '&summary=' + encodeURIComponent(dBody) + '&source=' + encodeURIComponent(url), 'my:LI', 'status=0,height=' + awHeight + ',width=' + awWidth + ',top=' + awTop + ',left=' + awLeft + ',resizable=1');
            return;
        }
        if ($this.hasClass('stumbleupon')) {
            dBody = 'I wanted to share this with you';
            window.open('http://www.stumbleupon.com/submit?url=' + currURL, 'mySU', 'status=0,height=' + wHeight + ',width=' + wWidth + ',top=' + wTop + ',left=' + wLeft + ',resizable=1');
            return;
        }
    });
    wh = $('#wheel-holder');
    hh = $(window).height() / 2;
    hw = $(window).width() / 2;
    if (wh.hasClass('rc') || wh.hasClass('lc')) { //if location is Right Center or Left Center - set 'top' to be half of the window, so it sits in the center
        wh.css('top', (hh - (wh.outerHeight() * 0.5)));
    }
    if (wh.hasClass('tc') || wh.hasClass('bc')) { //if location is Top Center or Bottom Center - set the 'left' to be half of the window 
        wh.css('left', (hw - (wh.outerWidth() * 0.5)));
    }
});