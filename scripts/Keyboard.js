/* eslint-disable*/
import keys from "./keys.js";
export class Keyboard {
  constructor(lang) {
    this.lang = lang;
    this.display = null;
    this.isCapsPressed = false;
    this.isShiftPressed = false;
    this.isControlPressed = false;
    this.isAltPressed = false;
    this.keyCodes = [];
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

    this.createVirtualKeys(keyboardSection);
    document.addEventListener('keydown', (event) => { this.keyDownEventHandler(event) });
    document.addEventListener('keyup', (event) => { this.keyUpEventHandler(event) });
    main.appendChild(keyboardSection);
    this.display.focus();
  }

  createVirtualKeys(keyboardSection) {
    keys.forEach((key) => {
      this.keyCodes.push(key.code);
      const keyButton = document.createElement('button');
      keyButton.classList.add('keyboard__key');
      keyButton.innerHTML = key[`${this.lang}`];
      keyButton.classList.add(`${key.code}`);
      keyButton.addEventListener('mouseout', () => {
        document.querySelector(`.${key.code}`).classList.remove('mousedown');
      });
      keyButton.addEventListener('mousedown', () => {
        document.querySelector(`.${key.code}`).classList.add('mousedown');
      });
      keyButton.addEventListener('mouseup', () => {
        document.querySelector(`.${key.code}`).classList.remove('mousedown');
      });
      switch (key.code) {
        case 'Backspace':
          keyButton.addEventListener('mousedown', () => {
            this.deleteSelected(key.code);
          });
          keyButton.addEventListener('mouseup', () => {
            this._setCursorPosition(this.display.selectionStart, 0);
          });
          break;
        case 'Enter':
          keyButton.addEventListener('mousedown', () => {
            this.insertCharacter(key);
          });
          keyButton.addEventListener('mouseup', () => {
            this._setCursorPosition(this.display.selectionStart, 0);
          });
          break;
        case 'CapsLock':
          keyButton.addEventListener('mousedown', () => {
            this.toggleCapsLock();
          });
          keyButton.addEventListener('mouseup', () => {
            this._setCursorPosition(this.display.selectionStart, 0);
          });
          break;
        case 'Delete':
          keyButton.addEventListener('mousedown', () => {
            this.deleteSelected(key.code);
          });
          keyButton.addEventListener('mouseup', () => {
            this._setCursorPosition(this.display.selectionStart, 0);
          });
          break;
        case 'Lang':
          keyButton.addEventListener('mousedown', () => {
            this.switchLang();
          });
          keyButton.addEventListener('mouseup', () => {
            this._setCursorPosition(this.display.selectionStart, 0);
          });
          break;
        case 'ControlRight':
          keyButton.addEventListener('mousedown', () => {
            this.isControlPressed = true;
            if (this.isControlPressed && this.isAltPressed) {
              this.switchLang();
            }
          });
          keyButton.addEventListener('mouseup', () => {
            this.isControlPressed = false;
          });
          break;
        case 'ControlLeft':
          keyButton.addEventListener('mousedown', () => {
            this.isControlPressed = true;
            if (this.isControlPressed && this.isAltPressed) {
              this.switchLang();
            }
          });
          keyButton.addEventListener('mouseup', () => {
            this.isControlPressed = false;
          });
          break;
        case 'AltRight':
          keyButton.addEventListener('mousedown', () => {
            this.isAltPressed = true;
            if (this.isControlPressed && this.isAltPressed) {
              this.switchLang();
            }
          });
          keyButton.addEventListener('mouseup', () => {
            this.isAltPressed = false;
          });
          break;
        case 'AltLeft':
          keyButton.addEventListener('mousedown', () => {
            this.isAltPressed = true;
            if (this.isControlPressed && this.isAltPressed) {
              this.switchLang();
            }
          });
          keyButton.addEventListener('mouseup', () => {
            this.isAltPressed = false;
          });
          break;
        default:
          keyButton.addEventListener('mousedown', () => {
            this.insertCharacter(key);
          });
          break;
      }
      keyboardSection.appendChild(keyButton);
    });
  }

  keyDownEventHandler(event) {
    event.preventDefault();
    if (this.keyCodes.includes(event.code)) {
      document.querySelector(`.${event.code}`).classList.add('keydown');
    }
    switch (event.code) {
      case 'Backspace':
        this.deleteSelected(event.code);
        break;
      case 'Enter':
        this.insertCharacter(keys.find((key) => {
          return key.code === 'Enter' ? true : false;
        }));
        break;
      case 'CapsLock':
        this.toggleCapsLock();
        break;
      case 'Delete':
        this.deleteSelected(event.code);
        break;
      case 'ControlRight':
        this.isControlPressed = true;
        if (this.isControlPressed && this.isAltPressed) {
          this.switchLang();
        }
        break;
      case 'ControlLeft':
        this.isControlPressed = true;
        if (this.isControlPressed && this.isAltPressed) {
          this.switchLang();
        }
        break;
      case 'AltRight':
        this.isAltPressed = true;
        if (this.isControlPressed && this.isAltPressed) {
          this.switchLang();
        }
        break;
      case 'AltLeft':
        this.isAltPressed = true;
        if (this.isControlPressed && this.isAltPressed) {
          this.switchLang();
        }
        break;
      default:
        if (this.keyCodes.includes(event.code)) {
          this.insertCharacter(keys.find((key) => {
            return key.code === `${event.code}` ? true : false;
          }));
        }
        break;
    }
  }

  keyUpEventHandler(event) {
    event.preventDefault();
    if (this.keyCodes.includes(event.code)) {
      document.querySelector(`.${event.code}`).classList.remove('keydown');
    }
    switch (event.code) {
      case 'ControlRight':
        this.isControlPressed = false;
        break;
      case 'ControlLeft':
        this.isControlPressed = false;
        break;
      case 'AltRight':
        this.isAltPressed = false;
        break;
      case 'AltLeft':
        this.isAltPressed = false;
        break;
    }
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
