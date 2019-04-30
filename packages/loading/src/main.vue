<template>
  <transition name="default-item"
              tag="div">
    <div class='loading-container'
         @touchmove.prevent>
      <div class="blank"></div>
      <div class='main'>
        <div class="loading-icon">
          <loading :fillColorArray="fillColorArray"
                   :svgSize="svgSize"
                   :svgType="svgType"
                   :pointSize="pointSize"></loading>
        </div>
        <span>{{message}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import Loading from "./Loading";
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
      loadingPoint: {
        small: ["3.2rem", "3.2rem"],
        middle: ["4.8rem", "4.8rem"],
        large: ["6.4rem", "6.4rem"]
      },
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
      }
    };
  },
  watch: {},
  computed: {
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
  methods: {},
  created() {},
  mounted() {},
  activated() {},
  deactivated() {},
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
