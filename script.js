(function() { 'use strict';

    const blinkSpeed = 1000,
        elements = {
            body : document.body,
            texts : [document.getElementById('yaa'), document.getElementById('hoo'), document.getElementById('woo'), document.getElementById('haa')],
            paths : [document.getElementById('yaa-p'), document.getElementById('hoo-p'), document.getElementById('woo-p'), document.getElementById('haa-p')]
        };

    let txtLen = elements.texts.length,
        counter = 0;


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

})();



(function() { 'use strict';

    const { unit } = mathtrix.config,
        { Complex } = mathtrix,
        { context, setCordinatePlane, clearScreen } = mathtrix.canvas,
        TwoPI = 2 * Math.PI;

        setCordinatePlane('cartitian');

        let wind = 0;

        function fourier() {
            clearScreen();

            context.strokeStyle = '#ffffff';
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(5 * unit, 0);

            for(let c = 0; c < 10 * unit; c += 0.2) {
                let _c = c / unit,
                    sc = Math.sin(TwoPI * _c) * 2,
                    p = Complex.exp(TwoPI * wind * _c).multiply(sc + 5);

                context.lineTo(p.r * unit, p.i * unit);
            }

            context.stroke();
            wind += 0.001;
        }


        setInterval(fourier, 40);

})();