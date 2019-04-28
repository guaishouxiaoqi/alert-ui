import Confirm from './main.vue';
import Vue from 'vue';
let ConfirmtUi = Vue.extend(Confirm);
let instance = null;
const myConfirm = $options => {
  instance = new ConfirmtUi().$mount();
  Object.keys($options).forEach(item => {
    instance[item] = $options[item];
  });
  document.body.appendChild(instance.$el);
  instance.show();
};
export default myConfirm;
