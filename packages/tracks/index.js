import Tracks from './src/index';
Tracks.install = function(Vue) {
  if (this.installed) return;
  Vue.component(Tracks.name, Tracks);
  this.installed = true;
};
export default Tracks;
