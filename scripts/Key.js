/* eslint-disable*/
export class Key {
  constructor(obj, lang, uppercase) {
    this.obj = obj;
    this.lang = lang;
    this.code = this.obj.code;
    this.size = this.obj.size;
    this.isUppercase = uppercase;
    this.isPressed = false;
  }
}
