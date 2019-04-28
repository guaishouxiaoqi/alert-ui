import Confirm from './confirm';
import Alert from './alert';
let arr = [Confirm, Alert];
const install = function(Vue) {
  if (this.installed) return;
  arr.forEach(item => {
    Vue.component(item.name, item);
  });
  Vue.prototype.$confirm = Confirm;
  Vue.prototype.$alert = Alert;
  this.installed = true;
};
export default {
  version: '1.0.18',
  Alert,
  Confirm,
  install
};
