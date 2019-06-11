const outStyle = {
  position: 'absolute',
  display: 'none',
  padding: '0.3rem 0.4rem',
  fontSize: '0.4rem',
  backgroundColor: '#F5F5F5',
  textAlign: 'center',
  borderRadius: '0.16rem',
  left: '50%',
  whiteSpace: 'nowrap'
};
const outerTransform = {
  top: {
    top: '0',
    bottom: 'initial',
    transform: 'translate(-50%, -110%)'
  },
  bottom: {
    bottom: '0',
    top: 'initial',
    transform: 'translate(-50%, 120%)'
  }
};
const innerStyle = {
  position: 'absolute',
  width: '0',
  height: '0',
  left: '50%',
  border: '5px solid transparent',
  borderTopColor: '#000'
};
const innerTransform = {
  top: {
    bottom: '0',
    top: 'initial',
    transform: 'translate(-50%, 100%)'
  },
  bottom: {
    top: '0',
    bottom: 'initial',
    transform: 'translate(-50%, -100%) rotate(180deg)'
  }
};
class PopContainer {
  constructor(options) {
    this.el = options.el;
    this.position = options.position;
    this.text = options.text;
    this.initDom();
  }
  initDom() {
    this.outer = document.createElement('span');
    let inner = document.createElement('i');
    this.outer.innerHTML = this.text;
    this.outer.appendChild(inner);
    let style = Object.assign(outStyle, outerTransform[this.position]);
    let style1 = Object.assign(innerStyle, innerTransform[this.position]);
    Object.keys(style).forEach(val => {
      this.outer.style[val] = style[val];
    });
    Object.keys(style1).forEach(attr => {
      inner.style[attr] = style1[attr];
    });
    this.el.appendChild(this.outer);
  }
  show() {
    this.outer.style.display = 'block';
  }
  hide() {
    this.outer.style.display = 'none';
  }
}
const popBar = {
  bind: function(el, binding) {
    el.style.position = 'relative';
    let value = binding.value;
    let text = typeof value == 'string' ? value : value.text || '';
    let position = typeof value == 'string' ? 'top' : value.position || 'top';
    let options = {
      el,
      text,
      position
    };
    let popbar = new PopContainer(options);
    el.addEventListener(
      'mouseover',
      function() {
        popbar.show();
      },
      false
    );
    el.addEventListener(
      'mouseout',
      function() {
        popbar.hide();
      },
      false
    );
  },
  inserted: function() {},
  update: function() {},
  componentUpDate: function() {},
  unbind: function() {}
};
export default popBar;
