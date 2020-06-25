(function() { 'use strict';

    const blinkSpeed = 500,
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