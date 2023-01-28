# Vanilla js slider

### Hello, everybody. How to use:
### First: you need to import my func from slider.js or copy main func slider to your project
```js
  import {slider} from 'any-folder/slider.js';
```

### Second: create the structure of html.
1. Need to create div .slider
2. Create class slider__wrapper
3. Any your ul list into slider__wrapper
4. Ready
```html
   <!-- Use class slider on your wrapper. Dont use it on Ul list.-->
    <div class="slider"> 
      <div class="slider__wrapper">
        <ul>
          <li>Aboba</li>
        </ul>
      </div>
    </div>
```

### If you wanna use it only for mobile or table, use next: 
1. slider--mob for slider. toggles--mob for scrumbs, buttons--mob for buttons

```html
   <!-- slider--mob ONLY for mobile. slider--table ONLY for mobile and table -->
    <div class="slider"> 
      <div class="slider__wrapper">
        <ul>
          <li>Aboba</li>
        </ul>
      </div>
      <div class="slider__buttons buttons--mob">
        <button class="slider--prev" aria-label="Назад"></button>
        <button class="slider--next" aria-label="Вперед"></button>
      </div>
      <ul class="slider__toggles toggles--mob" data-quantity="3"></ul>
    </div>
```


### If you have any buttons for scrolling slider, you can include it with by slider__buttons
1. Just create slider__buttons div into your slider div. 
2. IMPORTANT: You need to put slider__button into slider, not anything else.
3. Also you need to create slider--prev and slider--next. 
```html
    <div class="slider"> 
      <div class="slider__wrapper">
        <ul>
          <li>Aboba</li>
        </ul>
      </div>
      <div class="slider__buttons">
        <button class="slider--prev" aria-label="Назад"></button>
        <button class="slider--next" aria-label="Вперед"></button>
      </div>
    </div>
```

### You can create breadscrumbs:
1. All the same like buttons, but you can set data-quantity to set how many you need breads
```html
    <div class="slider"> 
      <div class="slider__wrapper">
        <ul>
          <li>Aboba</li>
        </ul>
      </div>
      <ul class="slider__toggles" data-quantity="3"></ul>
    </div>
```


### You can change a bit stylies of slider. But be careful. Gl hf :)