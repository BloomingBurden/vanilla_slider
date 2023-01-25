# Vanilla js slider

### Hello, everybody. For the code is working need to do next:
### First:
```js
  // U can just copy my func to your js fail
  // function slider() {} Just copy it all without IMPORT from slider.js

  // The most cool option, you cacn import slider to your script.js
  import {slider} from 'any-folder/slider.js';
```

### Second: When included js, you need to create class for elements
```html
   <!-- Just give class slider your wrapper.
    IMPORTANT: wrapper must have! Dont use slider on UL -->
    <div class="slider"> 
      <!-- Just your random list -->
      <ul>
        <li>Aboba</li>
      </ul>
    </div>
```

### If you wanna use it only for mobile or table use next: 

```html
   <!-- slider--mob ONLY for mobile. slider--table ONLY for mobile and table -->
    <div class="slider slider--mob"> 
      <!-- Just your random list -->
      <ul>
        <li>Aboba</li>
      </ul>
    </div>
```

### Also you can give class to your buttons for slider
```html
    <div class="slider"> 
      <!-- Just your random list -->
      <ul>
        <li>Aboba</li>
      </ul>
    </div>
    <!-- Just dont forget to make important class slider__buttons on wrapper! 
    And you need to create slider--prev and slider--next on button -->
    <div class="slider__buttons">
      <button class="slider--prev">Prev</button>
      <button class="slider--next">Next</button>
    </div>
```

### You can create breadscrumbs:
```html
    <div class="slider"> 
      <!-- Just your random list -->
      <ul>
        <li>Aboba</li>
      </ul>
    </div>
    <!-- Just give slider__toggles to UL. And you can add data-quantity - how many you want scrumbs -->
    <ul class="slider__toggles" data-quantity="3"></ul>
```


### Gl hf :)