window.mathtrix = {};

mathtrix.config = {
    unit : 50,
    dx : 1
};

(function() { 'use strict';

    let Complex = function(a) {
        this.r = a[0] || 0;
        this.i = a[1] || 0;
    }

    Complex.prototype = {
        constructor : Complex,

        add : function(v) {
            if(typeof(v) === 'number') return new Complex([this.r + v, this.i]);
            return new Complex([this.r + v.r, this.i + v.i]);
        },

        multiply : function(v) {
            if(typeof(v) === 'number') return new Complex([this.r * v, this.i * v]);
            return new Complex([(this.r * v.r) - (this.i * v.i), (this.i * v.r) + (this.r * v.i)]);
        }
    };

    Complex.exp = function(rad) {
        return new Complex([Math.cos(rad), Math.sin(rad)]);
    };


    mathtrix.Complex = Complex;

})();

(function() { 'use strict';

    const { unit } = mathtrix.config,
        canvas_ele = document.getElementById('canvas'),
        context = canvas_ele.getContext('2d');

    let width = canvas_ele.width = window.innerWidth,
        height = canvas_ele.height = window.innerHeight,
        w = width / 2,
        h = height / 2,
        clRectStart = [0, 0];


    const canvas = {
        get context() { return context; },

        get width() { return width; },
        get height() { return height; },

        scale : function(x, y) {
            context.scale(x, y);
        },

        drawCordinatePlane : function(subDiv = false) {
            let aw = 2,
                tw = 0.3,
                ts = 5,
                xMin = -w,
                xMax = w,
                yMin = -h,
                yMax = h;

            context.strokeStyle = '#a0a0a0';
            context.lineWidth = aw;
            context.beginPath();
            context.moveTo(xMin, 0);
            context.lineTo(xMax, 0);
            context.moveTo(0, yMin);
            context.lineTo(0, yMax);
            context.stroke();

            context.lineWidth = tw;

            if(subDiv == 'tick') {
                for(let i = unit; i < xMax; i += unit) {
                    context.moveTo(i, ts);
                    context.lineTo(i, -ts);
                    context.moveTo(-i, ts);
                    context.lineTo(-i, -ts);
                }
                for(let i = unit; i < yMax; i += unit) {
                    context.moveTo(-ts, i);
                    context.lineTo(ts, i);
                    context.moveTo(-ts, -i);
                    context.lineTo(ts, -i);
                }
                context.stroke();

            } else if(subDiv == 'grid') {
                for(let i = unit; i < xMax; i += unit) {
                    context.moveTo(i, yMax);
                    context.lineTo(i, yMin);
                    context.moveTo(-i, yMax);
                    context.lineTo(-i, yMin);
                }
                for(let i = unit; i < yMax; i += unit) {
                    context.moveTo(xMin, i);
                    context.lineTo(xMax, i);
                    context.moveTo(xMin, -i);
                    context.lineTo(xMax, -i);
                }
                context.stroke();
            }
        },


        setCordinatePlane : function(type) {
            switch(type) {
                case 'cartitian':
                    context.translate(w, h);
                    context.scale(1, -1);
                    clRectStart = [-w, -h];
                    break;

                case 'cartitian-Q1':
                    context.translate(0, height);
                    context.scale(1, -1);
                    clRectStart = [0, 0];
                    break;
                
                default:
            }
        },


        clearScreen : function() {
            context.clearRect(clRectStart[0], clRectStart[1], width, height);
        }
    };

    mathtrix.canvas = canvas;

})();

(function() { 'use strict';

    const { unit, dx } = mathtrix.config,
        { context, xMin, xMax } = mathtrix.canvas;


    const drawFuncs = {

        plotSinWave : function({freq = 1, phShift = 0, amp = 1, min = xMin, max = xMax}) {
            let _freq = Math.PI * 2 * freq,
                _phShift = Math.PI * 2 * phShift,
                UxA = unit * amp;

            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(min, Math.sin((_freq * min / unit) + _phShift) * UxA);

            for(let x = min + dx; x <= max; x += dx) {
                context.lineTo(x, Math.sin((_freq * x / unit) + _phShift) * UxA);
            }

            context.stroke();
        },

        getBaseLog : function(base, value) {
            return Math.log(value) / Math.log(base);
        }
    };



    mathtrix.drawFuncs = drawFuncs;

})();