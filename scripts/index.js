import { Keyboard } from './Keyboard.js';

const langCode = localStorage.getItem('virtualKeyboardLang') || 'en';
const keyboard = new Keyboard(langCode);

alert("Оставьте пожалуйста контакт для обратной связи, спасибо)")