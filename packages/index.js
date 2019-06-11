import Confirm from './confirm';
import Alert from './alert';
import Loading from './loading';
import Calendar from './calendar';
import PopBar from './directive/popbar';
let arr = [Confirm, Alert, Loading, Calendar];
let direct = {
  pop: PopBar
};
const install = function(Vue) {
  if (this.installed) return;
  arr.forEach(item => {
    Vue.component(item.name, item);
  });
  Vue.prototype.$confirm = Confirm;
  Vue.prototype.$alert = Alert;
  this.installed = true;
  Object.keys(direct).forEach(item => {
    Vue.directive(item, direct[item]);
  });
};
export default {
  version: '1.1.19',
  Alert,
  Confirm,
  Loading,
  Calendar,
  install
};
