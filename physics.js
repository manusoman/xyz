(function() { 'use strict';

const { context, width } = mathtrix.canvas,
    TwoPI = 2 * Math.PI,
    scalar = 3,
    g = 9.8,
    tf = 1 / 20;


    let ThrowBall = function(radius, tAngle, color) {
        this.radius = radius,
        this.color = color,
        this.IV = 70; // initial velocity
        this.TA = tAngle; // throw angle
        this.xt = 0;
        this.yt = 0;

        this.CW = width - (2 * radius);
    };

    ThrowBall.prototype = {
        constructor : ThrowBall,

        update : function() {
            const xv = this.IV * Math.cos(this.TA),
                yv = this.IV * Math.sin(this.TA);

            let ys = (yv * this.yt) - ((g * this.yt * this.yt) / 2), // "ut + gtt/2" formula
                xs = xv * this.xt * scalar, // "ut" formula
                dir = Math.pow(-1, Math.floor(xs / this.CW))

            xs = dir < 0 ? this.CW - (xs % this.CW) : xs % this.CW;

            drawBall(xs + this.radius, (ys * scalar) + this.radius, this.radius, this.color);

            if(ys <= 0) this.yt = 0;
            this.xt += tf;
            this.yt += tf;
        }
    };

    function drawBall(x, y, r, c) {
        context.fillStyle = c;

        context.beginPath();
        context.arc(x, y, r, 0, TwoPI);
        context.fill();
    }

    mathtrix.physics = {
        ThrowBall : ThrowBall
    };

})();