/* eslint-disable*/
import keys  from "./keys.js";
import { Keyboard } from "./Keyboard.js";

let keyboard = new Keyboard('en');

// alert("Буду очень признателен, если проверите мою работу завтра, спасибо!")


document.addEventListener("keydown", function (event) {
    // The parameter event is of the type KeyboardEvent
  	console.log(event.code);
});