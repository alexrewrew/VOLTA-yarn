(function () {
    "use strict";

    var DOMs = {
        documentBody : $('body'),
        documentBodyHtml : $('body, html'),

        menuTrigger : $('#menu-trigger'),
        menuNav : $('nav'),

        chosenSelect : $(".chosen-select"),
        keys : {37: 1, 38: 1, 39: 1, 40: 1},

        linkArrow : $(".link-arrow"),
        linkSmooth : $(".smooth"),

        portfolioLink : $('.portfolio--front-link'),

        linkHire : $('.link-hire'),
        linkHireClose : $('.link-hire--close'),

        linkHireStep1 : $('.link-hire--step#step1'),
        linkHireStep2 : $('.link-hire--step#step2 button'),

        contactUsForm: $('.contactus-form'),
        contactUsClose : $('.contactus-form--close'),
        contactUsStep1 : $('.contactus-form--step#step1 button'),

        sliderFull : $('.slider-full'),
        sliderCounter : $('.slider-counter'),

        arrowLeft : '<div class=\'arrow left\'><svg width="21px" height="37px" viewBox="0 0 21 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-557.000000, -1303.000000)"> <g id="SMM" transform="translate(163.000000, 1020.000000)" fill="#FC3A96"> <g id="Strelki"> <g id="Group-3"> <path d="M409.265991,301.58703 L394,285.778633 L396.877359,283 L414.243818,300.983495 L414.031023,301.18899 L414.641617,301.778633 L397.275158,319.762128 L394.397798,316.983495 L409.265991,301.58703 Z" id="Combined-Shape-Copy" transform="translate(404.320808, 301.381064) rotate(-180.000000) translate(-404.320808, -301.381064) "></path> </g> </g> </g> </g></svg></div>',

        arrowRight : '<div class=\'arrow right\'><svg width="21px" height="37px" viewBox="0 0 21 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-604.000000, -1303.000000)"> <g id="SMM" transform="translate(163.000000, 1020.000000)" fill="#FC3A96"> <g id="Strelki"> <g id="Group-3"> <path d="M456.265991,301.58703 L441,285.778633 L443.877359,283 L461.243818,300.983495 L461.031023,301.18899 L461.641617,301.778633 L444.275158,319.762128 L441.397798,316.983495 L456.265991,301.58703 Z" id="Combined-Shape"></path> </g> </g> </g> </g></svg></div>',


        menuLang : $('.nav-lang'),
        menuPanel : $('.nav-panel'),
        selectHireOption : $('#select-hire option:first-child'),
        gridMasonry : $('.grid'),
        gridMasonryItems : $('.blog')

    };

    $(document).ready(function () {

        // ========== COOKIE ==========
        function getCookie(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            if (matches) {
                DOMs.documentBody.addClass('no-canvas');
            } else {
                return undefined;
            }
        }
        getCookie('nocanvas');

        // ========== MENU ==========
        DOMs.menuTrigger.click(function (e) {
            e.preventDefault();
            DOMs.documentBodyHtml.toggleClass('open');
            if (DOMs.documentBody.hasClass('open')) {
                disableScroll();
            } else {
                enableScroll();
            }
        });

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function preventDefaultForScrollKeys(e) {
            if (DOMs.keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }

        function disableScroll() {
            if (window.addEventListener) { // older FF
                window.addEventListener('DOMMouseScroll', preventDefault, false);
            }
            window.onwheel = preventDefault; // modern standard
            window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
            window.ontouchmove = preventDefault; // mobile
            document.onkeydown = preventDefaultForScrollKeys;
        }

        function enableScroll() {
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
            }
            window.onmousewheel = document.onmousewheel = null;
            window.onwheel = null;
            window.ontouchmove = null;
            document.onkeydown = null;
        }

        // ========== SELECT ==========

        // ----- CHOSEN -----
        DOMs.chosenSelect.chosen({
            disable_search_threshold: 200
        });

        // ========== HIRE BUTTON ==========

        DOMs.linkHireStep1.click(function (e) {
            e.preventDefault();
            DOMs.linkHire.addClass('with-form');
        });

        DOMs.linkHireStep2.click(function (e) {
            e.preventDefault();
            DOMs.linkHire.removeClass('with-form').addClass('with-success');
        });

        DOMs.linkHireClose.click(function (e) {
            e.preventDefault();
            DOMs.linkHire.removeClass('with-form').removeClass('with-success');
        });

        // ========== CONTACT BUTTON ==========
        DOMs.contactUsStep1.click(function (e) {
            e.preventDefault();
            DOMs.contactUsForm.addClass('with-success');
        });

        DOMs.contactUsClose.click(function (e) {
            e.preventDefault();
            DOMs.contactUsForm.removeClass('with-success');
        });

        // ========== SLIDER ==========

        DOMs.sliderFull.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            DOMs.sliderCounter.html(i + '/' + slick.slideCount);
        });

        // ----- SLICK SLIDER -----
        DOMs.sliderFull.slick({
            prevArrow: DOMs.arrowLeft,
            nextArrow: DOMs.arrowRight,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true
        });

        // ========== PORTFOLIO LINK ==========

        var portfolio = function () {
            $(this).parent().parent().toggleClass('active');
        };

        DOMs.portfolioLink.hover(portfolio);


        // ========== SCROLLSPY ==========

        // ----- SCROLLING CLASS CHANGE -----
        $(window).on('load scroll', function () {
            if ($(this).scrollTop() > 20) {
                DOMs.menuNav.addClass('scroll');
                DOMs.linkArrow.addClass("visible");
            }
            else {
                DOMs.menuNav.removeClass('scroll');
                DOMs.linkArrow.removeClass("visible");
            }
        });

        // ANCHOR LINKS SCROLLING
        DOMs.linkSmooth.click(function (event) {
            event.preventDefault();
            var id = $(this).attr("href"),
                top = $(id).offset().top - 70;
            DOMs.documentBodyHtml.animate({
                scrollTop: top
            }, 1500);
        });

        autosize($('textarea'));

        if (bowser.msie) {
            DOMs.documentBody.addClass('msie');
        }

        if (bowser.safari) {
            DOMs.documentBody.addClass('no-canvas');
        }


    });

// ========== !!! RESPONSIVE SCRIPTS !!! ===========


    $(window).on('load resize', function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            DOMs.menuLang.prependTo('#nav-mobile .row');
            DOMs.menuPanel.prependTo('#nav-mobile .row');
            DOMs.selectHireOption.text('What can we help you with?');

        } else if (window.matchMedia("(min-width: 768px)").matches) {
            DOMs.menuPanel.appendTo('#nav-desktop');
            DOMs.menuLang.appendTo('#nav-desktop');
            DOMs.selectHireOption.text('');
        }

        if (window.matchMedia("(min-width: 992px)").matches) {
            var max = $(DOMs.gridMasonryItems[0]).outerHeight();

            for (var i = 0; i < DOMs.gridMasonryItems.length; i++) {
                if (max < $(DOMs.gridMasonryItems[i]).outerHeight()) {
                    max = $(DOMs.gridMasonryItems[i]).outerHeight();
                }
            }

            if (DOMs.gridMasonryItems.length === 1 || DOMs.gridMasonryItems.length === 2) {
                DOMs.gridMasonry.css('max-height', max + 100);
            } else if (DOMs.gridMasonryItems.length === 3 || DOMs.gridMasonryItems.length === 4) {
                DOMs.gridMasonry.css('max-height', (max * 2) + 100);
            } else if (DOMs.gridMasonryItems.length === 5 || DOMs.gridMasonryItems.length === 6) {
                DOMs.gridMasonry.css('max-height', (max * 3) + 200);
            }
        }
    });
})();