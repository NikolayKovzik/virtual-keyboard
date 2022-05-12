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
    const header = document.createElement('h1');
    const subtitle = document.createElement('p');
    const pullReqLink = document.createElement('a');
    this.display = document.createElement('textarea');
    const keyboardSection = document.createElement('section');

    main.classList.add('main');
    header.classList.add('header');
    subtitle.classList.add('subtitle');
    pullReqLink.classList.add('pullReqLink');
    form.classList.add('textarea__form');
    this.display.classList.add('textarea__input');
    keyboardSection.classList.add('keyboard');

    document.body.appendChild(main);
    main.appendChild(header);
    main.appendChild(subtitle);
    main.appendChild(pullReqLink);
    main.appendChild(form);
    form.appendChild(this.display);
    header.innerHTML = 'Virtual Keyboard For Windows';
    subtitle.innerHTML = 'Press CTRL + ALT to change the language';
    pullReqLink.innerHTML = 'Link to Pull Request';
    pullReqLink.setAttribute('href','https://github.com/NikolayKovzik/virtual-keyboard/pull/2');
    pullReqLink.setAttribute('target','_blank');

    this.createVirtualKeys(keyboardSection);
    document.addEventListener('keydown', (event) => { this.keyDownEventHandler(event); });
    document.addEventListener('keyup', (event) => { this.keyUpEventHandler(event); });
    main.appendChild(keyboardSection);
    this.display.focus();

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('virtualKeyboardLang', this.lang);
    });
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
        this.setCursorPosition(this.display.selectionStart, 0);
      });
      switch (key.code) {
        case 'Backspace':
          keyButton.addEventListener('mousedown', () => {
            this.deleteSelected(key.code);
          });
          break;
        case 'Enter':
          keyButton.addEventListener('mousedown', () => {
            this.insertCharacter(key);
          });
          break;
        case 'CapsLock':
          keyButton.addEventListener('mousedown', () => {
            if (this.isCapsPressed) {
              document.querySelector('.CapsLock').classList.remove('active');
              this.isCapsPressed = false;
            } else {
              document.querySelector('.CapsLock').classList.add('active');
              this.isCapsPressed = true;
            }
            this.toggleCapsAndShift();
          });
          break;
        case 'ShiftRight':
          keyButton.addEventListener('mousedown', () => {
            this.isShiftPressed = true;
            this.toggleCapsAndShift();
          });
          keyButton.addEventListener('mouseup', () => {
            this.isShiftPressed = false;
            this.toggleCapsAndShift();
          });
          break;
        case 'ShiftLeft':
          keyButton.addEventListener('mousedown', () => {
            this.isShiftPressed = true;
            this.toggleCapsAndShift();
          });
          keyButton.addEventListener('mouseup', () => {
            this.isShiftPressed = false;
            this.toggleCapsAndShift();
          });
          break;
        case 'Delete':
          keyButton.addEventListener('mousedown', () => {
            this.deleteSelected(key.code);
          });
          break;
        case 'Lang':
          keyButton.addEventListener('mousedown', () => {
            this.switchLang();
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
          if (key.code === 'Enter') {
            return true;
          }
          return false;
        }));
        break;
      case 'CapsLock':
        if (this.isCapsPressed) {
          document.querySelector('.CapsLock').classList.remove('active');
          this.isCapsPressed = false;
        } else {
          document.querySelector('.CapsLock').classList.add('active');
          this.isCapsPressed = true;
        }
        this.toggleCapsAndShift();
        break;
      case 'ShiftRight':
        this.isShiftPressed = true;
        this.toggleCapsAndShift();
        break;
      case 'ShiftLeft':
        this.isShiftPressed = true;
        this.toggleCapsAndShift();
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
            if (key.code === `${event.code}`) {
              return true;
            }
            return false;
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
      case 'ShiftRight':
        this.isShiftPressed = false;
        this.toggleCapsAndShift();
        break;
      case 'ShiftLeft':
        this.isShiftPressed = false;
        this.toggleCapsAndShift();
        break;
      default: break;
    }
  }

  insertCharacter(key) {
    const startPos = this.display.selectionStart;
    const endPos = this.display.selectionEnd;
    const val = this.display.value;
    let symbol = '';

    if (key.type !== 'comand') {
      if (this.isCapsPressed && this.isShiftPressed) {
        if (`${this.lang}Caps` in key) {
          symbol = key[`${this.lang}`];
        } else {
          symbol = key[`${this.lang}Shift`];
        }
      } else if (this.isCapsPressed && !this.isShiftPressed) {
        if (`${this.lang}Caps` in key) {
          symbol = key[`${this.lang}Caps`];
        } else {
          symbol = key[`${this.lang}`];
        }
      } else if (!this.isCapsPressed && this.isShiftPressed) {
        symbol = key[`${this.lang}Shift`];
      } else if (!this.isCapsPressed && !this.isShiftPressed) {
        symbol = key[`${this.lang}`];
      }

      if (key.code === 'Enter') {
        symbol = '\n';
      }
      if (key.code === 'Tab') {
        symbol = '\t';
      }

      this.display.value = val.slice(0, startPos) + symbol + val.slice(endPos, val.length);

      this.setCursorPosition(startPos, -1);
      if (key.code === 'Backquote') {
        this.setCursorPosition(startPos, -4);
      }
    } else {
      this.setCursorPosition(startPos, 0);
    }
  }

  toggleCapsAndShift() {
    if (this.isCapsPressed && this.isShiftPressed) {
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
        } else {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}Shift`];
        }
      });
    } else if (this.isCapsPressed && !this.isShiftPressed) {
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}Caps`];
        } else {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
        }
      });
    } else if (!this.isCapsPressed && this.isShiftPressed) {
      keys.forEach((key) => {
        document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}Shift`];
      });
    } else if (!this.isCapsPressed && !this.isShiftPressed) {
      keys.forEach((key) => {
        document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
      });
    }

    this.setCursorPosition(this.display.selectionStart, 0);
  }

  switchLang() {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('virtualKeyboardLang', this.lang);
    if (this.isCapsPressed) {
      keys.forEach((key) => {
        if (`${this.lang}Caps` in key) {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}Caps`];
        } else {
          document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
        }
      });
    } else {
      keys.forEach((key) => {
        document.querySelector(`.${key.code}`).innerHTML = key[`${this.lang}`];
      });
    }
  }

  deleteSelected(keyCode) {
    const startPos = this.display.selectionStart;
    const endPos = this.display.selectionEnd;
    const val = this.display.value;

    if (startPos === endPos && startPos === 0 && keyCode === 'Backspace') {
      this.display.focus();
      this.display.selectionStart = 0;
      this.display.selectionEnd = 0;
      return;
    }

    if (startPos === endPos && keyCode === 'Backspace') {
      this.display.value = val.slice(0, startPos - 1) + val.slice(endPos, val.length);
      this.setCursorPosition(startPos, 1);
    }

    if (startPos === endPos && keyCode === 'Delete') {
      this.display.value = val.slice(0, startPos) + val.slice(endPos + 1, val.length);
      this.setCursorPosition(startPos, 0);
    }

    if (startPos !== endPos) {
      this.display.value = val.slice(0, startPos) + val.slice(endPos, val.length);
      this.setCursorPosition(startPos, 0);
    }
  }

  setCursorPosition(startPos, shift) {
    this.display.focus();
    this.display.selectionStart = startPos - shift;
    this.display.selectionEnd = startPos - shift;
  }
}
