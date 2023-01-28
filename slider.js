export function slider() {
    for (let i = 0; i < document.querySelectorAll('.slider').length; i++) {
        const slider = document.querySelectorAll('.slider')[i];
        const sliderWrapper = slider.querySelector('.slider__wrapper');
        const ul = slider.getElementsByTagName('ul')[0];
        const li = ul.getElementsByTagName('li');
        const toggles = slider.querySelector('.slider__toggles');
        const sliderButtons = slider.querySelector('.slider__buttons');

        let width = slider.parentElement.offsetWidth - parseFloat(window.getComputedStyle(slider.parentElement).paddingLeft) - parseFloat(window.getComputedStyle(slider.parentElement).paddingRight);
        let targetLeft = 0;
        let direction = 'left';
    
        // Проверка, есть ли на сайте toggles
        // Если есть, создать заданное количество
        function hasToggles() {
            if (!toggles) return;
    
            const data = toggles.dataset.quantity ? toggles.dataset.quantity : 3;
    
            for (let i = 0; i < data; i++) {
                let li = document.createElement('li');
    
                if (i === 0) {
                    li.dataset.active = 'true';
                }
                toggles.append(li);
            }
        }
        hasToggles(); //Создать toggles
    
    
        // Функция, проверяющая на каких устройствах отключить слайдер
        // А на каких включить, в зависимости от стилей(slider--mob, slider--table)
        function allowedDevice() {
            width = slider.parentElement.offsetWidth - parseFloat(window.getComputedStyle(slider.parentElement).paddingLeft) - parseFloat(window.getComputedStyle(slider.parentElement).paddingRight);
            const sliderMob = slider.classList.contains('slider--mob');
            const sliderTable = slider.classList.contains('slider--table');
    
            if (sliderMob || sliderTable) {
                if (sliderMob && window.innerWidth >= 768 || sliderTable && window.innerWidth >= 1200) {
                    sliderWrapper.removeAttribute('style');
                    ul.removeAttribute('style');
                    ul.removeEventListener('pointerdown', elemDown);

                    if (!!toggles) {
                        window.innerWidth >= 768 && toggles.classList.contains('toggles--mob') ||
                        window.innerWidth >= 1200 && toggles.classList.contains('toggles--table') ? toggles.style.display = 'none' : false;
                    }

                    if (!!sliderButtons) {
                        window.innerWidth >= 768 && sliderButtons.classList.contains('buttons--mob') ||
                        window.innerWidth >= 1200 && sliderButtons.classList.contains('buttons--table') ? sliderButtons.style.display = 'none' : false;
                    }
                    
                    
                    for (let elem of li) {
                        elem.removeAttribute('style');
                    }
                    return;
                }
            } 

            ul.ondragstart = () => false;
            if (!!toggles) {
                toggles.removeAttribute('style');
                setToggle(0);
                toggles.addEventListener('click', selectElem);
            }
            if (!!sliderButtons) {
                sliderButtons.removeAttribute('style')
            }
            setBaseStylies();
            ul.addEventListener('pointerdown', elemDown); // Добавить ключевое событие
        }
        allowedDevice();
        window.addEventListener('resize', allowedDevice);
    
        // Переключать по кнопке слайды
        function btnSwapSlider() {
            if (!sliderButtons) return;
            
            sliderButtons.addEventListener('click', (event) => {
                let count = 0;
                const target = event.target.closest('button');
                
                if (!target) return;
                targetLeft = parseFloat(window.getComputedStyle(ul).left);
    
                for (let elem of toggles.children) {
                    if (!elem.dataset.active) {
                        count++;
                    } else {
                        count - 1;
                        break;
                    }
                }
                
                if (target.classList.contains('slider--prev')) {
                    direction = 'right';
                    ul.style.left = `${targetLeft + width}px`;
                    setToggle(count - 1 < 0 ? 0 : count - 1);
                    checkBorderLine();
                }
                if (target.classList.contains('slider--next')) {
                    direction = 'left';
                    ul.style.left = `${targetLeft - width}px`;
                    setToggle(count + 1);
                    checkBorderLine();
                }
            });
        }

        btnSwapSlider();
    
        // Клик по переключателю. 
        // Подсветка активного элемента
        function selectElem(e) {
            let target = e.target.closest('li');
            let count = 0;
    
            if (!target || !toggles) return;
    
            for (let elem of toggles.children) {
                elem.removeAttribute('data-active');
            }
            target.dataset.active = 'true';
    
            for (let elem of toggles.children) {
                if (elem.dataset.active) {
                    break;
                }
                count++;
            }
            ul.style.left = `${-width * count}px`;
        }
    
        //Смена toggles после свапа slider.
        function setToggle(current) {
            if (!toggles) return;
    
            if (current > li.length - 1) return;
    
            for (let elem of toggles.children) {
                elem.removeAttribute('data-active');
            }
            toggles.children[current].dataset.active = 'true';
        }
    
        // Задать базовые css свойства slider.
        // Задать базовые сss свойства Ul
        // Задать базовые css свойства li
        function setBaseStylies() {
            sliderWrapper.style.cssText = `
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
    
    
        //Проверка на границы ul
        // Не выходить за самый левый край ul
        // Не выходить за самый правый край ul.
        function checkBorderLine() {
            if (direction === 'left') {
                if (Math.abs(targetLeft) >= (li.length - 1) * width) {
                    ul.style.left = `${(li.length - 1) * -width}px`;
                }
            } else {
                if (targetLeft >= 0) {
                    ul.style.left = `0`;
                }
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
                let abs = direction === 'left' ? Math.abs(targetLeft / width) + 0.5 : Math.abs(targetLeft / width) - 0.5;
                document.removeEventListener('pointermove', elemMove);
                target.style.left = `${-Math.round(abs) * width}px`;
    
                checkBorderLine();
                setToggle(Math.round(abs));
                target.removeEventListener('pointerup', elemUp);
                document.removeEventListener('pointerup', elemUp);
            }
    
            document.addEventListener('pointerup', elemUp);
            document.addEventListener('pointermove', elemMove);
        }
    }
}