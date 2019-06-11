import Calendar from './src/index';
Calendar.install = function(Vue) {
  if (this.installed) return;
  Vue.component(Calendar.name, Calendar);
  this.installed = true;
};
export default Calendar;
