export function slider() {
    const slider = document.querySelector('.slider');
    const ul = slider.getElementsByTagName('ul')[0];
    const li = ul.getElementsByTagName('li');
    let width = slider.parentElement.offsetWidth - parseFloat(window.getComputedStyle(slider.parentElement).paddingLeft) - parseFloat(window.getComputedStyle(slider.parentElement).paddingRight);
    let targetLeft = 0;
    let direction = 'left';

    // Функция, проверяющая на каких устройствах отключить слайдер
    // А на каких включить, в зависимости от стилей(slider--mob, slider--table)
    function allowedDevice() {
        width = slider.parentElement.offsetWidth - parseFloat(window.getComputedStyle(slider.parentElement).paddingLeft) - parseFloat(window.getComputedStyle(slider.parentElement).paddingRight);
        const sliderMob  = slider.classList.contains('slider--mob');
        const sliderTable =  slider.classList.contains('slider--table');

        if (sliderMob || sliderTable) {
            if (sliderMob && window.innerWidth >= 768 || sliderTable && window.innerWidth >= 1200) {
                slider.removeAttribute('style');
                ul.removeAttribute('style');
                
                for (let elem of li) {
                    elem.removeAttribute('style');
                }
            } else {
                setBaseStylies();
                ul.addEventListener('pointerdown', elemDown);
            }
        }
    }
    allowedDevice();
    window.addEventListener('resize', allowedDevice);


    // Задать базовые css свойства slider.
    // Задать базовые сss свойства Ul
    // Задать базовые css свойства li
    function setBaseStylies() {
        slider.style.cssText = `
            width: ${width}px;
            overflow: hidden;
        `;

        ul.style.cssText = `
            position: relative;
            left: 0;
            width: ${li.length * width}px;
            display: flex;
            transition: all 0.5s linear;
            user-select: none;
            touch-action: none;
        `;

        for (let elem of li) {
            elem.style.cssText = `
                width: ${width}px;
            `
        }
    }

    // Зажатие мышки на ul элементе.
    function elemDown(event) {
        const target = this;
        let shiftX = event.pageX;

        // Двигаешь мышкой, двигается элемент ul. 
        // Мышкой можно двигать по все document.
        function elemMove(event) {
            targetLeft = parseFloat(window.getComputedStyle(target).left);

            if (shiftX > event.pageX) {
                shiftX = event.pageX;
                direction = 'left';
                target.style.left = `${targetLeft - 150}px`;
                checkBorderLine();
            }

            if (shiftX < event.pageX) {
                shiftX = event.pageX;
                direction = 'right';
                target.style.left = `${targetLeft + 150}px`;
                checkBorderLine();
            }
        }
        // Отжатие мышки.
        // pointerup задан на document, а не ul
        // Не происходит бага, когда палец улетает с ul и событие up теряется.
        function elemUp(event) {
            let abs = direction === 'left' ? Math.abs(targetLeft / width) + 0.5 :  Math.abs(targetLeft / width) - 0.5;
            document.removeEventListener('pointermove', elemMove);
            target.style.left = `${-Math.round(abs) * width}px`;
             
            checkBorderLine();
            target.removeEventListener('pointerup', elemUp);
            document.removeEventListener('pointerup', elemUp);
        }

        //Проверка на границы ul
        // Не выходить за самый левый край ul
        // Не выходить за самый правый край ul.
        function checkBorderLine() {
            if (direction === 'left') {
                if (Math.abs(targetLeft) >= (li.length - 1) * width) {
                    target.style.left = `${(li.length - 1) * -width}px`;
                }    
            } else {
                if (targetLeft >= 0) {
                    target.style.left = `0`;
                }
            }    
        }

        document.addEventListener('pointerup', elemUp);
        document.addEventListener('pointermove', elemMove);
    }
}