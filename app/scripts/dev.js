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
            disable_search_threshold: 200,

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

        // ========== SLIDER ==========

        // ----- SLICK SLIDER COUNTER -----
        $('.slider-full').on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $('.slider-counter').html(i + '/' + slick.slideCount);
        });

        // ----- SLICK SLIDER -----
        $(".slider-full").slick({
            prevArrow: "<div class='arrow left'><img src='img/icons/angle-left.svg'></div>",
            nextArrow: "<div class='arrow right'><img src='img/icons/angle-right.svg'></div>",
            dots: false,
            fade: true
        });

        // $(".slider-two").slick({
        //     dots: true,
        //     slidesToShow: 2,
        //     slidesToScroll: 1,
        //     prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
        //     nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
        //     responsive: [
        //         {
        //             breakpoint: 991,
        //             settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1
        //             }
        //         }
        //     ]
        // });

        // $(".slider-three").slick({
        //     dots: true,
        //     slidesToShow: 3,
        //     slidesToScroll: 2,
        //     prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
        //     nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
        //     responsive: [
        //         {
        //             breakpoint: 991,
        //             settings: {
        //                 slidesToShow: 2,
        //                 slidesToScroll: 2
        //             }
        //         },
        //         {
        //             breakpoint: 767,
        //             settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1
        //             }
        //         }
        //     ],
        // });

        // ========== ANIMATION ==========

        // new WOW().init();


        // ========== ACCORDION ==========
        // $("#accordion").accordion({
        //     collapsible: true,
        //     heightStyle: "content"
        // });

        // ========== TABS ==========
        // $("#tabs").tabs();

        // ========== DATEPICKER ==========
        // $(".datepicker").datepicker({
        //     showOtherMonths: true,
        //     selectOtherMonths: true
        // });

        // ========== FULL PAGE SCROLLING ==========

        // ----- FULL PAGE -----
        // $('#fullpage').fullpage();

        // ----- SLIM SCROLL -----
        // $('.slim').slimScroll({
        //     height: '200px'
        // });

        // ========== SCROLLSPY ==========

        // ----- SCROLLING CLASS CHANGE -----
        $(window).scroll(function () {
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


    });

// ========== !!! RESPONSIVE SCRIPTS !!! ===========

    $(window).on('load resize', function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            $('.nav-lang').prependTo('#nav-mobile .row');
            $('.nav-panel').prependTo('#nav-mobile .row');

        } else if (window.matchMedia("(min-width: 768px)").matches) {
            $('.nav-panel').appendTo('#nav-desktop');
            $('.nav-lang').appendTo('#nav-desktop');


        }
    });
})();


