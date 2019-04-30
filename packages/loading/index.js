import Loading from './src/index';
Loading.install = function(Vue) {
  if (this.installed) return;
  Vue.component(Loading.name, Loading);
  this.installed = true;
};
export default Loading;
