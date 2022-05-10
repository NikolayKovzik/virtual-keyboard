/* eslint-disable*/
import keys from "./keys.js";
export class Keyboard {
  constructor(lang) {
    // this.lang = lang;
    // this.keys = [];
    // this.isShift = true;
    // this.isCtrl = true;
    this.init();
  }

  init() {
    const main = document.createElement('main');
    const form = document.createElement('form');
    const textarea = document.createElement('textarea');
    const keyboardSection = document.createElement('section');

    main.classList.add('main');
    form.classList.add('textarea__form');
    textarea.classList.add('textarea__input');
    keyboardSection.classList.add('keyboard');

    document.body.appendChild(main);
    main.appendChild(form);
    form.appendChild(textarea);
    main.appendChild(keyboardSection);
    this.createKeys(keyboardSection);
  }

  createKeys(keyboardSection) {
    keys.forEach((key) => {
      console.log(key);
      const keyButton = document.createElement('button');
      keyButton.classList.add('keyboard__key');
      keyButton.innerHTML = key.en;
      switch (key.code) {
        case "backspace":
          keyButton.classList.add('backspace');
          break;
        case "tab":
          keyButton.classList.add('tab');
          break;
        case "delete":
          keyButton.classList.add('delete');
          break;
        case "capsLock":
          keyButton.classList.add('caps-lock');
          break;
        case "enter":
          keyButton.classList.add('enter');
          break;
        case "leftShift":
          keyButton.classList.add('left-shift');
          break;
        case "rightShift":
          keyButton.classList.add('right-shift');
          break;
        case "leftControl":
          keyButton.classList.add('left-control');
          break;
        case "rightControl":
          keyButton.classList.add('right-control');
          break;
        case "space":
          keyButton.classList.add('space');
          break;
      }
      keyboardSection.appendChild(keyButton);
    })
  }
}
