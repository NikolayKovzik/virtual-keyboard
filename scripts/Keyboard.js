/* eslint-disable*/
import keys from "./keys.js";
export class Keyboard {
  constructor(lang) {
    this.lang = lang;
    this.display = null;
    this.isCapsPressed = false;
    // this.keys = [];
    // this.isShift = true;
    this.init();
  }

  init() {
    const main = document.createElement('main');
    const form = document.createElement('form');
    this.display = document.createElement('textarea');
    const keyboardSection = document.createElement('section');

    main.classList.add('main');
    form.classList.add('textarea__form');
    this.display.classList.add('textarea__input');
    keyboardSection.classList.add('keyboard');

    document.body.appendChild(main);
    main.appendChild(form);
    form.appendChild(this.display);
    this.createKeys(keyboardSection);
    main.appendChild(keyboardSection);
  }

  createKeys(keyboardSection) {
    keys.forEach((key) => {
      const keyButton = document.createElement('button');
      keyButton.classList.add('keyboard__key');
      keyButton.innerHTML = key[`${this.lang}`];
      keyButton.classList.add(`${key.code}`);
      switch (key.code) {
        case "Backspace":
          keyButton.addEventListener('click', () => {
            this.display.value = this.display.value.substring(0, this.display.value.length - 1);
            this.display.focus();
          })
          break;
        case "Enter":
          keyButton.addEventListener('click', () => {
            this.display.value += '\n';
            this.display.focus();
          })
          break;
        case "CapsLock":
          keyButton.addEventListener('click', () => {
            this.toggleCapsLock();
          })
          break;
        case "Delete":
          keyButton.addEventListener('click', () => {
            this.display.value = this.display.value.substring(0, this.display.value.length - 1);
            this.display.focus();
          })
          break;
        default:
          keyButton.addEventListener('click', () => {
            this.display.value += key[`${this.lang}`];
            this.display.focus();
          })
          break;
        // case "CapsLock":
        //   if(!this.isCapsPressed)
        //   break;
        // case "Tab":
        //   break;
        // case "Delete":
        //   break;
        // case "LeftShift":
        //   break;
        // case "RightShift":
        //   break;
        // case "ControlLeft":
        //   break;
        // case "ControlRight":
        //   break;
        // case "Space":
        //   break;
      }
      keyboardSection.appendChild(keyButton);
    })
  }

  toggleCapsLock() {
    this.isCapsPressed = this.isCapsPressed ? false : true;
    if (this.isCapsPressed) {
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}Caps`];
        }
      })
    } else {
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
        }
      })
    }
  }
}


