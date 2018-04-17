(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

var body = $('body');
var color = '#' + $('canvas').attr('data-color');

function Wave() {
    var WIDTH = body.width();
    var HEIGHT = body.height();
    var WAVE_DETAIL = Math.round(WIDTH / 40);
    var WAVE_DETAIL_HEIGHT = Math.round(HEIGHT / 40);
    var DENSITY = 0.87;
    var FRICTION = 0.82;
    var AREA_OF_EFFECT = 50;
    var MOUSE_PULL_SPEED = 0.13;
    var CLEAR = true;
    var first = true;

    var waves, waves2, waves3, waves4; //Arrays
    var canvas, context;

    var mousePos = {x: 0, y: 0};
    var mouseSpeed = {x: 0, y: 0};
    var oldMousePos = {x: 0, y: 0};

    this.Init = function (canvasID) {
        canvas = document.getElementById(canvasID);
        canvas.setAttribute('width', WIDTH.toString());
        canvas.setAttribute('height', HEIGHT.toString());
        context = canvas.getContext('2d');

        waves = [];
        waves3 = [];
        for (i = 0; i < WAVE_DETAIL; i++) {
            waves.push({
                x: 0,
                y: 0,
                original: {x: 0, y: 0},
                velocity: {x: 0, y: 0},
                force: {x: 0, y: 0},
                mass: 8
            });

            waves3.push({
                x: 0,
                y: 0,
                original: {x: 0, y: 0},
                velocity: {x: 0, y: 0},
                force: {x: 0, y: 0},
                mass: 8
            });
        }

        waves2 = [];
        waves4 = [];
        for (var i = 0; i < WAVE_DETAIL_HEIGHT; i++) {
            waves2.push({
                x: 0,
                y: 0,
                original: {x: 0, y: 0},
                velocity: {x: 0, y: 0},
                force: {x: 0, y: 0},
                mass: 8
            });

            waves4.push({
                x: 0,
                y: 0,
                original: {x: 0, y: 0},
                velocity: {x: 0, y: 0},
                force: {x: 0, y: 0},
                mass: 8
            });
        }

        this.InitCanvas();
    };

    var lastLoop = new Date;
    var c = 0;
    var dateCookie = new Date(new Date().getTime() + 60 * 1000 * 60 * 8);

    this.InitCanvas = function () {

        var self = this;

        var thisLoop = new Date;
        var fps = 1000 / (thisLoop - lastLoop);
        lastLoop = thisLoop;

        if (fps < 20) {
            c++;
        }

        if (c >= 50) {
            $('body').addClass('no-canvas');
            document.cookie = "nocanvas=true; path=/; expires=" + dateCookie;
        }

        if (CLEAR) {
            if (first) {
                CLEAR = false;
                first = false;
            }

            var clearFalse = true;

            context.clearRect(0, 0, WIDTH, HEIGHT);
            context.fillStyle = color;
            context.beginPath();
            context.moveTo(waves[0].x, waves[0].y);

            var length = waves.length;
            var previous, current, next;
            for (var i = 0; i < length; i++) {
                previous = waves[i - 1];
                current = waves[i];
                next = waves[i + 1];

                if (previous != null && next != null) {
                    var force = 0;
                    force -= DENSITY * (previous.y - current.y);
                    force += DENSITY * (current.y - next.y);
                    force += DENSITY / 15 * (current.y - current.original.y);

                    current.velocity.y -= (force / previous.mass) + current.force.y;
                    current.force.y *= FRICTION;
                    current.velocity.y *= FRICTION;
                    current.y += current.velocity.y;

                    var distanceFromMouse = GetDistanceBetween(current, mousePos);
                    if (distanceFromMouse < AREA_OF_EFFECT) {
                        var dist = GetDistanceBetween({x: current.original.x, y: current.original.y}, mousePos);
                        mouseSpeed.x *= 0.95;
                        mouseSpeed.y *= 0.95;

                        current.force.y += (MOUSE_PULL_SPEED * (1 - (dist / AREA_OF_EFFECT)) * mouseSpeed.y) * .3;

                        if ((current.y - previous.y).toFixed(4) != 0) {
                            clearFalse = false;
                        } else {
                            clearFalse = true;
                        }
                    }
                    context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
                }
            }
            context.quadraticCurveTo(waves[waves.length - 2].x, waves[waves.length - 2].y, waves[waves.length - 2].x + (waves[waves.length - 1].x - waves[waves.length - 2].x) / 2, waves[waves.length - 2].y + (waves[waves.length - 1].y - waves[waves.length - 2].y) / 2);

            length = waves2.length;
            for (i = 0; i < length; i++) {
                previous = waves2[i - 1];
                current = waves2[i];
                next = waves2[i + 1];

                if (previous != null && next != null) {
                    force = 0;
                    force -= DENSITY * (previous.x - current.x);
                    force += DENSITY * (current.x - next.x);
                    force += DENSITY / 15 * (current.x - current.original.x);

                    current.velocity.x -= (force / previous.mass) + current.force.x;
                    current.force.x *= FRICTION;
                    current.velocity.x *= FRICTION;
                    current.x += current.velocity.x;

                    distanceFromMouse = GetDistanceBetween(current, mousePos);
                    if (distanceFromMouse < AREA_OF_EFFECT) {
                        dist = GetDistanceBetween({x: current.original.x, y: current.original.y}, mousePos);
                        mouseSpeed.x *= 0.95;
                        mouseSpeed.y *= 0.95;

                        current.force.x += (MOUSE_PULL_SPEED * (1 - (dist / AREA_OF_EFFECT)) * mouseSpeed.x) * .3;

                        if ((current.x - previous.x).toFixed(4) != 0) {
                            clearFalse = false;
                        } else {
                            clearFalse = true;
                        }
                    }
                    context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
                }
            }
            context.quadraticCurveTo(waves2[waves2.length - 2].x, waves2[waves2.length - 2].y, waves2[waves2.length - 2].x + (waves2[waves2.length - 1].x - waves2[waves2.length - 2].x) / 2, waves2[waves2.length - 2].y + (waves2[waves2.length - 1].y - waves2[waves2.length - 2].y) / 2);

            length = waves3.length;
            for (i = 0; i < length; i++) {
                previous = waves3[i - 1];
                current = waves3[i];
                next = waves3[i + 1];

                if (previous != null && next != null) {
                    force = 0;
                    force -= DENSITY * (previous.y - current.y);
                    force += DENSITY * (current.y - next.y);
                    force += DENSITY / 15 * (current.y - current.original.y);

                    current.velocity.y -= (force / previous.mass) + current.force.y;
                    current.force.y *= FRICTION;
                    current.velocity.y *= FRICTION;
                    current.y += current.velocity.y;

                    distanceFromMouse = GetDistanceBetween(current, mousePos);
                    if (distanceFromMouse < AREA_OF_EFFECT) {
                        dist = GetDistanceBetween({x: current.original.x, y: current.original.y}, mousePos);
                        mouseSpeed.x *= 0.95;
                        mouseSpeed.y *= 0.95;

                        current.force.y += (MOUSE_PULL_SPEED * (1 - (dist / AREA_OF_EFFECT)) * mouseSpeed.y) * .3;

                        if ((current.y - previous.y).toFixed(4) != 0) {
                            clearFalse = false;
                        } else {
                            clearFalse = true;
                        }
                    }
                    context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
                }
            }
            context.quadraticCurveTo(waves3[waves3.length - 2].x, waves3[waves3.length - 2].y, waves3[waves3.length - 2].x + (waves3[waves3.length - 1].x - waves3[waves3.length - 2].x) / 2, waves3[waves3.length - 2].y + (waves3[waves3.length - 1].y - waves3[waves3.length - 2].y) / 2);

            length = waves4.length;
            for (i = 0; i < length; i++) {
                previous = waves4[i - 1];
                current = waves4[i];
                next = waves4[i + 1];

                if (previous != null && next != null) {
                    force = 0;
                    force -= DENSITY * (previous.x - current.x);
                    force += DENSITY * (current.x - next.x);
                    force += DENSITY / 15 * (current.x - current.original.x);

                    current.velocity.x -= (force / previous.mass) + current.force.x;
                    current.force.x *= FRICTION;
                    current.velocity.x *= FRICTION;

                    current.x += current.velocity.x;

                    distanceFromMouse = GetDistanceBetween(current, mousePos);
                    if (distanceFromMouse < AREA_OF_EFFECT) {
                        dist = GetDistanceBetween({x: current.original.x, y: current.original.y}, mousePos);
                        mouseSpeed.x *= 0.95;
                        mouseSpeed.y *= 0.95;

                        current.force.x += (MOUSE_PULL_SPEED * (1 - (dist / AREA_OF_EFFECT)) * mouseSpeed.x) * .3;

                        if ((current.x - previous.x).toFixed(4) != 0) {
                            clearFalse = false;
                        } else {
                            clearFalse = true;
                        }
                    }
                    context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
                }
            }
            context.quadraticCurveTo(waves4[waves4.length - 2].x, waves4[waves4.length - 2].y, waves4[waves4.length - 2].x + (waves4[waves4.length - 1].x - waves4[waves4.length - 2].x) / 2, waves4[waves4.length - 2].y + (waves4[waves4.length - 1].y - waves4[waves4.length - 2].y) / 2);

            context.fill();

            if (clearFalse) {
                CLEAR = false;
            }
        }

        window.requestAnimationFrame(function () {
            self.InitCanvas();
        });
    };

    this.ResizeCanvas = function () {
        CLEAR = true;

        WIDTH = body.width();
        HEIGHT = body.height();

        var ds;
        if (window.matchMedia("(min-width: 1600px)").matches) {
            ds = 618;
        } else {
            ds = 580;
        }

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        for (var i = 0; i < WAVE_DETAIL; i++) {
            waves[i].x = WIDTH / WAVE_DETAIL * i;
            waves[i].y = 50;
            waves[i].original.x = waves[i].x;
            waves[i].original.y = waves[i].y;

            waves3[i].x = WIDTH - (WIDTH / WAVE_DETAIL * i);
            waves3[i].y = HEIGHT - ds;
            waves3[i].original.x = waves3[i].x;
            waves3[i].original.y = waves3[i].y;
        }

        waves[0].x = 50;
        waves[1].x = 50;
        waves[WAVE_DETAIL - 1].x = WIDTH - 50;

        waves3[0].x = WIDTH - 50;
        waves3[1].x = WIDTH - 50;
        waves3[WAVE_DETAIL - 1].x = 50;

        for (i = 0; i < WAVE_DETAIL_HEIGHT; i++) {
            waves2[i].x = WIDTH - 50;
            waves2[i].y = (HEIGHT - ds) / WAVE_DETAIL_HEIGHT * i;
            waves2[i].original.x = waves2[i].x;
            waves2[i].original.y = waves2[i].y;

            waves4[i].x = 50;
            waves4[i].y = (HEIGHT - ds) - ((HEIGHT - ds) / WAVE_DETAIL_HEIGHT * i);
            waves4[i].original.x = waves4[i].x;
            waves4[i].original.y = waves4[i].y;
        }

        waves2[0].y = 50;
        waves2[1].y = 50;
        waves2[WAVE_DETAIL_HEIGHT - 1].y = HEIGHT - ds;

        waves4[0].y = HEIGHT - ds;
        waves4[1].y = HEIGHT - ds;
        waves4[WAVE_DETAIL_HEIGHT - 1].y = 50;
    };

    $('#volta').mousemove(function (e) {
        mouseSpeed.x = Math.max(Math.min(mousePos.x - e.pageX, 40), -40);
        mouseSpeed.y = Math.max(Math.min(mousePos.y - e.pageY, 40), -40);

        /* new config item */
        if (mouseSpeed.x < 14 && mouseSpeed.x > 0) {
            mouseSpeed.x = 14;
        } else if (mouseSpeed.x > -14 && mouseSpeed.x < 0) {
            mouseSpeed.x = -14;
        }

        if (mouseSpeed.y < 17 && mouseSpeed.y > 0) {
            mouseSpeed.y = 17;
        } else if (mouseSpeed.y > -17 && mouseSpeed.y < 0) {
            mouseSpeed.y = -17;
        }

        /* end new config item */

        mousePos.x = e.pageX;
        mousePos.y = e.pageY;

        CLEAR = true;

        oldMousePos.x = mousePos.x;
        oldMousePos.y = mousePos.y;
    });

    function GetDistanceBetween(p1, p2) {
        var posX = p2.x - p1.x;
        var posY = p2.y - p1.y;
        return Math.sqrt(posX * posX + posY * posY);
    }
}

var wave = new Wave();
wave.Init('volta');

$(window).on("load", function () {
    setTimeout(function () {
        wave.ResizeCanvas();
    }, 100);
});

$(window).on("resize", function () {
    wave.ResizeCanvas();
});

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
            dots: false
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

        if (bowser.msie) {
            DOMs.documentBody.addClass('msie');
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
                DOMs.gridMasonry.css('max-height', (max * 3) + 100);
            }
        }
    });
})();
(function () {
    'use strict';
})();