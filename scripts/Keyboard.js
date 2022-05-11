/* eslint-disable*/
import keys from "./keys.js";
export class Keyboard {
  constructor(lang) {
    this.lang = lang;
    this.display = null;
    this.isCapsPressed = false;
    this.isShiftPressed = false;
    this.keys = [];
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
    console.log(this.keys);
    this.display.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.code) {
        case 'Backspace': 
            this.deleteSelected(event.code);
          break;
        case 'Enter':    
            this.deleteSelected(event.code);
            this.insertCharacter(keys.find((key)=>{
              return key.code === 'Enter' ? true : false;
            }));
          break;
        case 'CapsLock':   
            this.toggleCapsLock();
          break;
        case 'Delete':
            this.deleteSelected(event.code);
          break;
        default:
            if(this.keys.includes(event.code)){
              this.insertCharacter(keys.find((key)=>{
                return key.code === `${event.code}` ? true : false;
              }));
            }
          break;
      }
    });
    main.appendChild(keyboardSection);
  }

  createKeys(keyboardSection) {
    keys.forEach((key) => {
      this.keys.push(key.code);
      const keyButton = document.createElement('button');
      keyButton.classList.add('keyboard__key');
      keyButton.innerHTML = key[`${this.lang}`];
      keyButton.classList.add(`${key.code}`);
      switch (key.code) {
        case 'Backspace':
          keyButton.addEventListener('click', () => {
            this.deleteSelected(key.code);
          });
          break;
        case 'Enter':
          keyButton.addEventListener('click', () => {
            this.deleteSelected(key.code);
            this.insertCharacter(key);
          });
          break;
        case 'CapsLock':
          keyButton.addEventListener('click', () => {
            this.toggleCapsLock();
          });
          break;
        case 'Delete':
          keyButton.addEventListener('click', () => {
            this.deleteSelected(key.code);
          });
          break;
        case 'Lang':
          keyButton.addEventListener('click', () => {
            this.switchLang();
          });
          break;
        default:
          keyButton.addEventListener('click', () => {
            this.insertCharacter(key);
          });
          break;
      }
      keyboardSection.appendChild(keyButton);
    });
  }

  insertCharacter(key) {
    let startPos = this.display.selectionStart;
    let endPos = this.display.selectionEnd;
    let value = this.display.value;
    let symbol = '';

    if (key.type !== 'comand') {
      if (!this.isCapsPressed) {
        symbol = key[`${this.lang}`];
      } else if (`${this.lang}Caps` in key) {
        symbol = key[`${this.lang}Caps`];
      } else {
        symbol = key[`${this.lang}`];
      }

      if (key.code === 'Enter') {
        symbol = '\n';
      }
      if (key.code === 'Tab') {
        symbol = '\t';
      }

      // if (startPos !== endPos) {
      //   this.display.value = value.slice(0, startPos) + value.slice(endPos, value.length);
      // }

      this.display.value = value.slice(0, startPos) + symbol + value.slice(endPos, value.length);
      this._setCursorPosition(startPos, -1);
    } else {
      this._setCursorPosition(startPos, 0);
    }

  }

  toggleCapsLock() {
    this.isCapsPressed = this.isCapsPressed ? false : true;
    if (this.isCapsPressed) {
      document.querySelector('.CapsLock').classList.add('active');
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}Caps`];
        }
      })
    } else {
      document.querySelector('.CapsLock').classList.remove('active');
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
        }
      })
    }
    this._setCursorPosition(this.display.selectionStart, 0);
  }

  switchLang() {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    if (this.isCapsPressed) {
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}Caps`];
        } else {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
        }
      })
    } else {
      keys.forEach((key) => {
        document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
      })
    }
  }

  deleteSelected(keyCode) {
    let startPos = this.display.selectionStart;
    let endPos = this.display.selectionEnd;
    let value = this.display.value;

    if (startPos === endPos && startPos === 0 && keyCode === 'Backspace') {
      this.display.focus();
      this.display.selectionStart = 0;
      this.display.selectionEnd = 0;
      return;
    }

    if (startPos === endPos && keyCode === 'Backspace') {
      this.display.value = value.slice(0, startPos - 1) + value.slice(endPos, value.length);
      this._setCursorPosition(startPos, 1);
    }

    if (startPos === endPos && keyCode === 'Delete') {
      this.display.value = value.slice(0, startPos) + value.slice(endPos + 1, value.length);
      this._setCursorPosition(startPos, 0);
    }

    if (startPos !== endPos) {
      this.display.value = value.slice(0, startPos) + value.slice(endPos, value.length);
      this._setCursorPosition(startPos, 0);
    }
  }

  _setCursorPosition(startPos, shift) {
    this.display.focus();
    this.display.selectionStart = startPos - shift;
    this.display.selectionEnd = startPos - shift;
  };

  // lineBreak() {
  //   let startPos = this.display.selectionStart;
  //   let endPos = this.display.selectionEnd;
  //   let value = this.display.value;
  //   if (startPos !== endPos) {
  //     this.display.value = value.slice(0, startPos) + value.slice(endPos, value.length);
  //   }
  //   this.display.value = value.slice(0, startPos) + '\n' + value.slice(endPos, value.length);
  //   this._setCursorPosition(startPos, -1);
  // }
}
