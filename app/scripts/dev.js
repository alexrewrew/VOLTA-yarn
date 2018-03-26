(function () {
    "use strict";

    $(document).ready(function () {

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

        var slider = $('.slider-full');

        slider.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $('.slider-counter').html(i + '/' + slick.slideCount);
        });

        // ----- SLICK SLIDER -----
        slider.slick({
            prevArrow: "<div class='arrow left'><img src='img/icons/angle-left.svg'></div>",
            nextArrow: "<div class='arrow right'><img src='img/icons/angle-right.svg'></div>",
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