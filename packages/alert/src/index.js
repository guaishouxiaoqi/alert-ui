import Alert from './main.vue';
import Vue from 'vue';
let AlertUi = Vue.extend(Alert);
let instance = null;
let message = '···';
let type = 'default';
let time = 2000;
const myAlert = function($options) {
  message = $options.message || $options;
  type = $options.type || type;
  time = $options.time || time;
  instance = new AlertUi().$mount();
  instance.message = message;
  instance.type = type;
  instance.time = time;
  document.body.appendChild(instance.$el);
  instance.show();
};
export default myAlert;
