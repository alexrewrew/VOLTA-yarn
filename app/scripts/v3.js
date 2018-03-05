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

    this.InitCanvas = function () {
        var self = this;

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

                        if ((current.y - previous.y).toFixed(4)  != 0) {
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

                        if ((current.x - previous.x).toFixed(4)  != 0) {
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

                        if ((current.y - previous.y).toFixed(4)  != 0) {
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

                        if ((current.x - previous.x).toFixed(4)  != 0) {
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

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        for (var i = 0; i < WAVE_DETAIL; i++) {
            waves[i].x = WIDTH / WAVE_DETAIL * i;
            waves[i].y = 50;
            waves[i].original.x = waves[i].x;
            waves[i].original.y = waves[i].y;

            waves3[i].x = WIDTH - (WIDTH / WAVE_DETAIL * i);
            waves3[i].y = HEIGHT - 580;
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
            waves2[i].y = (HEIGHT - 580) / WAVE_DETAIL_HEIGHT * i;
            waves2[i].original.x = waves2[i].x;
            waves2[i].original.y = waves2[i].y;

            waves4[i].x = 50;
            waves4[i].y = (HEIGHT - 580) - ((HEIGHT - 580) / WAVE_DETAIL_HEIGHT * i);
            waves4[i].original.x = waves4[i].x;
            waves4[i].original.y = waves4[i].y;
        }

        waves2[0].y = 50;
        waves2[1].y = 50;
        waves2[WAVE_DETAIL_HEIGHT - 1].y = HEIGHT - 580;

        waves4[0].y = HEIGHT - 580;
        waves4[1].y = HEIGHT - 580;
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
