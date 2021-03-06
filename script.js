(function() { 'use strict';

    const { unit } = mathtrix.config,
        { Complex } = mathtrix,
        { context, width, height, setCordinatePlane, clearScreen } = mathtrix.canvas,
        { ThrowBall } = mathtrix.physics,
        TwoPI = 2 * Math.PI,
        blinkSpeed = 1000,
        elements = {
            body : document.body,
            texts : [document.getElementById('yaa'), document.getElementById('hoo'), document.getElementById('woo'), document.getElementById('haa')],
            paths : [document.getElementById('yaa-p'), document.getElementById('hoo-p'), document.getElementById('woo-p'), document.getElementById('haa-p')]
        };

    let txtLen = elements.texts.length,
        w2 = width / 2,
        h2 = height / 2,
        counter = 0,
        wind = 0,
        speed = 0.001,
        ballCount = 40,
        tbs = [];

        for(let i = 0; i < ballCount; i++) {
            let d = (Math.random() * 1.5) + 2.5,
                c = getRandomColor();

            tbs.push(new ThrowBall(10, Math.PI / d, c));
        }


        setCordinatePlane('cartitian-Q1');

        setInterval(function() {
            let i = tbs.length;

            clearScreen();

            while(i--) {
                tbs[i].update();
            }
            fourier();
        }, 40);


    setInterval(function() {
        switchTextNColor();
        elements.body.style.backgroundColor = getRandomColor();
    }, blinkSpeed);


    function switchTextNColor() {
        elements.texts[counter % txtLen].classList.add('off');

        let i = ++counter % txtLen;

        elements.paths[i].style.fill = getRandomColor();
        elements.texts[i].classList.remove('off');
    }

    function getRandomColor() {
        let i = 3,
            color = '#';

        while(i--) {
            color += Math.round(Math.random() * 255).toString(16);
        }

        return color;
    }

    function fourier() {
        context.strokeStyle = '#ffffff';
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo((3 * unit) + w2, h2);

        for(let c = 0; c < 10 * unit; c += 0.2) {
            let _c = c / unit,
                sc = -Math.cos(TwoPI * _c) * 2,
                p = Complex.exp(TwoPI * wind * _c).multiply(sc + 5);

            context.lineTo((p.r * unit) + w2, (p.i * unit) + h2);
        }

        context.stroke();
        wind += speed;

        if(wind > 5 || wind < -5) speed = -speed;
    }

})();