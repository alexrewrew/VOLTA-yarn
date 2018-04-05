(function () {
    "use strict";

    $(document).ready(function () {


        function getCookie(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            if (matches) {
                $('body').addClass('no-canvas');
            } else {
                return undefined;
            }
        }

        getCookie('nocanvas');


        // ========== MENU ==========

        $('#menu-trigger').click(function (e) {
            e.preventDefault();
            $('html, body').toggleClass('open');

            if ($('body').hasClass('open')) {
                disableScroll();
            } else {
                enableScroll();
            }
        });

        var keys = {37: 1, 38: 1, 39: 1, 40: 1};

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
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
        $(".chosen-select").chosen({
            disable_search_threshold: 200
        });

        // ========== HIRE BUTTON ==========

        $('.link-hire--step#step1').click(function (e) {
            e.preventDefault();
            $('.link-hire').addClass('with-form');
        });
        $('.link-hire--step#step2 button').click(function (e) {
            e.preventDefault();
            $('.link-hire').removeClass('with-form').addClass('with-success');
        });

        $('.link-hire--close').click(function (e) {
            e.preventDefault();
            $('.link-hire').removeClass('with-form').removeClass('with-success');
        });

        // ========== CONTACT BUTTON ==========
        $('.contactus-form--step#step1 button').click(function (e) {
            e.preventDefault();
            $('.contactus-form').addClass('with-success');
        });

        $('.contactus-form--close').click(function (e) {
            e.preventDefault();
            $('.contactus-form').removeClass('with-success');
        });

        // ========== SLIDER ==========

        // ----- SLICK SLIDER COUNTER -----
        var arrowLeft = '<svg width="21px" height="37px" viewBox="0 0 21 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-557.000000, -1303.000000)"> <g id="SMM" transform="translate(163.000000, 1020.000000)" fill="#FC3A96"> <g id="Strelki"> <g id="Group-3"> <path d="M409.265991,301.58703 L394,285.778633 L396.877359,283 L414.243818,300.983495 L414.031023,301.18899 L414.641617,301.778633 L397.275158,319.762128 L394.397798,316.983495 L409.265991,301.58703 Z" id="Combined-Shape-Copy" transform="translate(404.320808, 301.381064) rotate(-180.000000) translate(-404.320808, -301.381064) "></path> </g> </g> </g> </g></svg>';

        var arrowRight = '<svg width="21px" height="37px" viewBox="0 0 21 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-604.000000, -1303.000000)"> <g id="SMM" transform="translate(163.000000, 1020.000000)" fill="#FC3A96"> <g id="Strelki"> <g id="Group-3"> <path d="M456.265991,301.58703 L441,285.778633 L443.877359,283 L461.243818,300.983495 L461.031023,301.18899 L461.641617,301.778633 L444.275158,319.762128 L441.397798,316.983495 L456.265991,301.58703 Z" id="Combined-Shape"></path> </g> </g> </g> </g></svg>';

        var slider = $('.slider-full');

        slider.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $('.slider-counter').html(i + '/' + slick.slideCount);
        });

        // ----- SLICK SLIDER -----
        slider.slick({
            prevArrow: "<div class='arrow left'>" + arrowLeft + "</div>",
            nextArrow: "<div class='arrow right'>" + arrowRight + "</div>",
            dots: false,
            // fade: true
        });

        // ========== ANIMATION ==========

        // AOS.init();

        // ========== PORTFOLIO LINK ==========

        var portfolio = function () {
            $(this).parent().parent().toggleClass('active');
        };

        $('.portfolio--front-link').hover(portfolio);


        // ========== SCROLLSPY ==========

        // ----- SCROLLING CLASS CHANGE -----
        $(window).on('load scroll', function () {
            if ($(this).scrollTop() > 20) {
                $('nav').addClass('scroll');
                $(".link-arrow").addClass("visible");
            }
            else {
                $('nav').removeClass('scroll');
                $(".link-arrow").removeClass("visible");
            }
        });

        // ANCHOR LINKS SCROLLING
        $(".smooth").click(function (event) {
            event.preventDefault();
            var id = $(this).attr("href"),
                top = $(id).offset().top - 70;
            $("body,html").animate({
                scrollTop: top
            }, 1500);
        });

        if (bowser.msie) {
            $('body').addClass('msie');
        }


    });

// ========== !!! RESPONSIVE SCRIPTS !!! ===========

    $(window).on('load resize', function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            $('.nav-lang').prependTo('#nav-mobile .row');
            $('.nav-panel').prependTo('#nav-mobile .row');
            $('#select-hire option:first-child').text('What can we help you with?');

        } else if (window.matchMedia("(min-width: 768px)").matches) {
            $('.nav-panel').appendTo('#nav-desktop');
            $('.nav-lang').appendTo('#nav-desktop');
            $('#select-hire option:first-child').text('');
        }

        if (window.matchMedia("(min-width: 992px)").matches) {
            var gridItems = $('.blog');
            var max = $(gridItems[0]).outerHeight();

            for (var i = 0; i < gridItems.length; i++) {
                if (max < $(gridItems[i]).outerHeight()) {
                    max = $(gridItems[i]).outerHeight();
                }
            }

            if (gridItems.length === 1 || gridItems.length === 2) {
                $('.grid').css('max-height', max + 100);
            } else if (gridItems.length === 3 || gridItems.length === 4) {
                $('.grid').css('max-height', (max * 2) + 100);
            } else if (gridItems.length === 5 || gridItems.length === 6) {
                $('.grid').css('max-height', (max * 3) + 100);
            }
        }
    });
})();