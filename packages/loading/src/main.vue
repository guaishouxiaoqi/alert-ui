<template>
  <transition name="default-item"
              tag="div">
    <div class='loading-container'
         @touchmove.prevent>
      <div class="blank"></div>
      <div class='main'
           :class="{'is-pc': !isMobile}">
        <div class="loading-icon">
          <loading :fillColorArray="fillColorArray"
                   :svgSize="svgSize"
                   :svgType="svgType"
                   :pointSize="pointSize"></loading>
        </div>
        <span :class="{'is-pc': !isMobile}">{{message}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import Loading from "@/components/Loading";
import { checkDevice } from "@/common/tool";
export default {
  name: "loadings",
  components: { Loading },
  props: {
    message: {
      default: ""
    },
    size: {
      default: "middle"
    },
    pointColor: {
      default: "default"
    },
    pointType: {
      default: "middle"
    },
    svgType: {
      default: "point"
    }
  },
  data() {
    return {
      LoadingColor: {
        default: [
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff"
        ],
        gray: ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        dark: [
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000"
        ],
        linear: [
          "orange",
          "yellow",
          "violet",
          "orange",
          "orange",
          "yellow",
          "violet",
          "orange"
        ]
      },
      pointR: {
        small: [4, 4, 4, 4, 4, 4, 4, 4],
        middle: [6, 6, 6, 6, 6, 6, 6, 6],
        large: [8, 8, 8, 8, 8, 8, 8, 8],
        linear: [8, 7, 6, 5, 4, 5, 6, 7],
        ease: [8, 7.4, 6.8, 6.2, 5.6, 5, 4.4, 3.8]
      },
      isMobile: null
    };
  },
  watch: {},
  computed: {
    loadingPoint() {
      let base = 40;
      let size = this.isMobile ? 40 / 25 : 40 / 2;
      let unit = this.isMobile ? "rem" : "px";
      let type = ["mini", "small", "middle", "large", "extral"];
      let sizeObj = {};
      type.forEach((val, index) => {
        let inSize = size * (index + 1) + unit;
        sizeObj[val] = [inSize, inSize];
      });
      return sizeObj;
    },
    fillColorArray() {
      return this.LoadingColor[this.pointColor] || this.LoadingColor.default;
    },
    svgSize() {
      return this.loadingPoint[this.size] || this.loadingPoint.middle;
    },
    pointSize() {
      return this.pointR[this.pointType] || this.pointR.default;
    }
  },
  methods: {
    checkDevice() {
      this.isMobile = checkDevice();
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
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .blank {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.2);
  }
  .main {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    padding: rem(36);
    &.is-pc {
      padding: 30px;
    }
    font-weight: 500;
    background: #fff;
    border-radius: rem(12);
    .loading-icon {
      margin: 0 auto;
    }
    span {
      margin-top: rem(20);
      font-size: rem(36);
      font-weight: 500;
      &.is-pc {
        font-size: 14px;
      }
      &.default {
        color: rgb(16, 16, 17);
      }
      &.warning {
        color: #e90a0a;
      }
      &.success {
        color: #0bee1e;
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
