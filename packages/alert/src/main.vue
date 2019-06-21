<template>
  <transition :name="fadeStyle"
              tag="div">
    <div class='container'
         v-if="isShow"
         @click="hide">
      <div class='main'
           @click.stop>
        <span :class="[type,{'is-pc':!isMobile}]">{{message}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { checkDevice } from "@/common/tool";
export default {
  name: "alert",
  props: [],
  components: {},
  data() {
    return {
      time: 2000,
      message: "...",
      type: "default",
      isShow: false,
      confirmStyle: {
        default: "default-item",
        scale: "scale-item"
      },
      animateType: "default",
      isMobile: null
    };
  },
  watch: {},
  computed: {
    fadeStyle() {
      return this.confirmStyle[this.animateType] || "default-item";
    }
  },
  methods: {
    checkDevice() {
      this.isMobile = checkDevice();
    },
    hide() {
      this.isShow = false;
    },
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.hide();
      }, this.time);
    },
    addResizeEvent() {
      this.checkDevice();
      if (window.addEventListener) {
        window.addEventListener("resize", this.checkDevice);
      } else if (window.attachEvent) {
        window.attachEvent("resize", this.checkDevice);
      } else {
        window.onresize = this.checkDevice;
      }
    },
    removeResizeEvent() {
      if (window.removeEventListener) {
        window.removeEventListener("resize", this.checkDevice);
      } else if (window.detachEvent) {
        window.detachEvent("resize", this.checkDevice);
      } else {
        window.onresize = null;
      }
    }
  },
  created() {
    this.addResizeEvent();
  },
  mounted() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {
    this.removeResizeEvent();
  },
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.2);
  .main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    span {
      padding: rem(36) rem(50);
      font-size: rem(36);
      font-weight: 500;
      background: #ffffff;
      border-radius: rem(12);
      &.default {
        color: rgb(16, 16, 17);
      }
      &.warning {
        color: #e90a0a;
      }
      &.success {
        color: #0bee1e;
      }
      &.is-pc {
        padding: 14px 18px;
        font-size: 14px;
        border-radius: 6px;
      }
    }
  }
}
$fadeStyle: default, scale;
@each $style in $fadeStyle {
  .#{$style}-item-enter-active,
  .#{$style}-item-leave-active {
    transition: all 0.3s;
  }
  .#{$style}-item-enter,
  .#{$style}-item-leave-to {
    opacity: 0;
    @if ($style == "scale") {
      transform: scale(0);
    }
  }
}
</style>
