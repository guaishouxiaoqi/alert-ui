<template>
  <div class="range-container-h5"
       v-if="isMobile">
    <div class="range-tranks">
      <i :class="['default-line',trackData.type]"
         ref="defaultW"
         @click.stop="handleClick"></i>
      <i :class="['offset-line',trackData.type]"
         ref="moveW"
         :style="{'width':moveLeft1}"
         @click.stop="handleClick"></i>
      <div ref="slide"
           v-if="showTrack"
           id="slide"
           class="move-trank"
           :style="{'left':setLeft1}"
           @touchstart.stop="touchStart"
           @touchmove.stop="touchMove"
           @touchend.stop="touchEnd">
        <i></i>
      </div>
    </div>
    <div class="range-rate"
         v-if="showRange">{{curRate}}%</div>
  </div>
  <div class="range-container-pc"
       v-else>
    <div ref="tranks"
         :class="['mouse-tranks',{'pointer' : showTrack}]">
      <i :class="['common',trackData.type]"
         @mousedown="handleChange"
         ref="defaultW"></i>
      <i :class="['move-left',trackData.type]"
         :style="{'width':moveLeft}"
         ref="moveW"
         @mousedown="handleChange"></i>
      <div ref="slide"
           v-if="showTrack"
           id="slide"
           :style="{'left':styleLeft}"
           :class="['slide',{'mover':isDown}]"
           @mousedown.stop="down">
        <i :class="trackData.type"></i>
      </div>
    </div>
    <div class="range"
         v-if="showRange">{{trackData.rate + '%'}}</div>
  </div>
</template>
<script>
import { checkDevice } from "@/common/tool";
export default {
  name: "tracks",
  props: {
    trackData: {
      type: Object,
      default: () => {}
    },
    showTrack: {
      type: Boolean,
      default: true
    },
    maxRate: {
      // 调整最大分配比例
      type: Number,
      default: 100
    },
    showRange: {
      type: Boolean,
      default: false
    },
    response: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // PC
      isDown: false,
      m_move_x: 0,
      m_down_x: 0,
      dx: 0,
      md_x: 0,
      defDomW: 0, // 滑块可滑动距离（需减去滑块的宽度）
      moveLeft: 0,
      styleLeft: 0,
      // H5
      offsetLeft: 0,
      left1: 0,
      left2: 0,
      setLeft1: 0,
      moveLeft1: 0,
      isMobile: "",
      preState: "null"
    };
  },
  computed: {
    moveDiv() {
      return this.$refs.slide;
    },
    trankW() {
      if (this.isMobile != this.preState) {
        // 处理isMobile变化后，此处不更新问题
        this.preState = this.isMobile;
        return (this.showTrack && this.moveDiv.clientWidth) || 0;
      }
    },
    // PC
    rate() {
      return this.trackData.rate;
    },
    defaultW() {
      // 获取可滑动的最大距离（根据传入滑动可滑动的最大值（0-100））
      let num = this.maxRate;
      return this.defDomW * (this.trackData.maxNum / num);
    },
    tranksW() {
      return this.$refs.tranks.clientWidth || 16;
    },
    // H5
    defW() {
      return this.$refs.defaultW.clientWidth;
    },
    lineW1() {
      return this.defW - this.trankW;
    },
    curRate() {
      return this.trackData.rate || 0;
    },
    rateMax() {
      return this.trackData.maxNum;
    },
    numW() {
      let num = this.maxRate;
      return (this.lineW1 * (this.curRate || 0)) / num;
    },
    trackD() {
      return this.response ? this.trackData : undefined;
    }
  },
  watch: {
    curRate(cur) {
      this.isMobile && this.initLeft();
    }
  },
  methods: {
    checkDevice() {
      this.isMobile = checkDevice();
    },
    // PC
    initMouseEvent() {
      if (window.addEventListener) {
        window.addEventListener("mousemove", this.move, false);
        window.addEventListener("mouseup", this.up, false);
      } else if (window.attachEvent) {
        window.attachEvent("onmousemove", this.move, false);
        window.attachEvent("onmouseup", this.up, false);
      } else {
        onmousemove = this.move;
        onmouseup = this.up;
      }
    },
    removeMouseEvent() {
      if (window.removeEventListener) {
        window.removeEventListener("mousemove", this.move);
        window.removeEventListener("mouseup", this.up);
      } else if (window.detachEvent) {
        window.detachEvent("onmousemove", this.move);
        window.detachEvent("onmouseup", this.up);
      } else {
        onmousemove = null;
        onmouseup = null;
      }
    },
    initStyleL() {
      let w = this.trankW;
      let lineW = this.tranksW;
      this.defDomW = lineW > w ? lineW - w : lineW;
      let num = this.maxRate;
      let trankL = (this.defDomW * this.rate) / num;
      this.moveLeft = trankL + w / 2 + "px";
      this.styleLeft = trankL + "px";
    },
    down(event) {
      if (this.showTrack) {
        let moveDiv = this.moveDiv;
        this.isDown = true;
        this.m_down_x = event.clientX;
        this.dx = moveDiv.offsetLeft;
        this.md_x = this.m_down_x - this.dx;
      }
    },
    move(event) {
      if (this.isDown) {
        this.m_move_x = event.clientX;
        let domLeft = this.m_move_x - this.md_x;
        this.initRange(domLeft);
      }
    },
    up() {
      this.isDown = false;
    },
    initRange(domLeft) {
      let w =
        domLeft > this.defaultW ? this.defaultW : domLeft > 0 ? domLeft : 0;
      this.moveLeft = w + this.trankW / 2 + "px";
      this.styleLeft = w + "px";
      let rate = 0;
      if (this.trackData.maxNum > 0) {
        rate = Math.ceil((w / this.defaultW) * this.trackData.maxNum);
      }
      this.trackData.rate = rate;
      this.$emit("changeRate", this.trackD);
    },
    handleChange(event) {
      if (this.showTrack) {
        let left = this.moveDiv.offsetLeft;
        let w =
          event.layerX - left > 0
            ? event.layerX - 10
            : event.layerX - 10 > 0
            ? event.layerX - 10
            : 0;
        this.initRange(w);
      }
    },
    // H5
    initLeft() {
      this.setLeft1 = this.numW + "px";
      this.moveLeft1 = this.numW + this.trankW / 2 + "px";
    },
    initOffset() {
      this.offsetLeft = this.numW;
    },
    handleClick($event) {
      if (this.showTrack) {
        this.changeRateP(parseFloat($event.layerX) - this.trankW / 2);
        this.initOffset();
      }
    },
    touchStart($event) {
      this.left1 = $event.touches[0].clientX;
    },
    touchMove($event) {
      if (this.curRate <= this.rateMax) {
        this.left2 = $event.touches[0].clientX;
        let offset = this.offsetLeft + (this.left2 - this.left1);
        this.changeRateP(offset);
      }
    },
    touchEnd() {
      this.initOffset();
    },
    changeRateP(offset) {
      let num = this.maxRate;
      let res = parseInt((offset / this.lineW1) * num);
      res = res > this.rateMax ? this.rateMax : res;
      this.trackData.rate = res > 100 ? 100 : res >= 0 ? res : 0;
      this.$emit("changeRate", this.trackD);
    },
    initEventFun() {
      this.checkDevice();
      setTimeout(() => {
        if (this.isMobile) {
          this.initOffset();
          this.initLeft();
        } else {
          // 采用setTimeout方式，兼容部分浏览器(如Safari等)有时获取不到dom导致报错(通过this.$nextTick偶尔也无法获取到dom问题)
          this.initMouseEvent();
          this.initStyleL();
        }
      });
    },
    addResizeEvent() {
      this.initEventFun();
      if (window.addEventListener) {
        window.addEventListener("resize", this.initEventFun);
      } else if (window.attachEvent) {
        window.attachEvent("resize", this.initEventFun);
      } else {
        window.onscroll = this.initEventFun;
      }
    },
    removeResizeEvent() {
      if (window.removeEventListener) {
        window.removeEventListener("resize", this.initEventFun);
      } else if (window.detachEvent) {
        window.detachEvent("resize", this.initEventFun);
      } else {
        window.onresize = null;
      }
    }
  },
  created() {},
  mounted() {
    this.addResizeEvent();
  },
  deactivated() {
    !this.isMobile && this.removeMouseEvent();
    this.removeResizeEvent();
  },
  beforeDestroy() {
    !this.isMobile && this.removeMouseEvent();
    this.removeResizeEvent();
  }
};
</script>
<style lang="scss" scoped>
.range-container-pc {
  display: flex;
  align-items: center;
  .mouse-tranks {
    position: relative;
    width: 100%;
    flex: 1;
    margin: 20px 0;
    cursor: default;
    &.pointer {
      cursor: pointer;
    }
    i {
      border-radius: 3px;
      &.common {
        height: 6px;
      }
      &.default {
        background-color: #dae0e6;
      }
      &.message {
        background-color: rgba(204, 230, 255, 1);
      }
      &.success {
        background-color: #b3f0c5;
      }
      &.warning {
        background-color: #ebb6b6;
      }
      &.move-left {
        width: 0;
        height: 6px;
        position: absolute;
        left: 0px;
        top: 0;
        &.default {
          background-color: #3d454d;
        }
        &.message {
          background-color: rgba(0, 128, 255, 1);
        }
        &.success {
          background-color: #0df352;
        }
        &.warning {
          background-color: #f02727;
        }
      }
    }
    .slide {
      position: absolute;
      width: 16px;
      height: 22px;
      top: -8px;
      left: 0px;
      transition: transform 0.1s;
      cursor: move; /* fallback if grab cursor is unsupported */
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
      &:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
      }
      i {
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        background: #ffffff;
        border-radius: 8px;
        user-select: none;
        border: 2px solid transparent;
        &.default {
          border-color: rgba(24, 25, 26, 1);
        }
        &.message {
          border-color: rgba(0, 128, 255, 1);
        }
        &.success {
          border-color: #0df352;
        }
        &.warning {
          border-color: #f02727;
        }
      }
      &:hover {
        transition: transform 0.4s;
        transform: scale(1.3);
      }
    }
  }
  .range {
    margin-left: 6px;
    font-size: 14px;
    font-weight: 400;
    width: 30px;
    color: rgba(24, 25, 26, 1);
    line-height: 18px;
  }
}
.range-container-h5 {
  position: relative;
  display: flex;
  align-items: center;
  .range-tranks {
    position: relative;
    padding: rem(14) 0;
    width: 100%;
    flex: 1;
    .default-line {
      position: relative;
      width: 100%;
      height: rem(10);
      border-radius: rem(5);
      &.default {
        background-color: #dae0e6;
      }
      &.message {
        background-color: rgba(204, 230, 255, 1);
      }
      &.success {
        background-color: #b3f0c5;
      }
      &.warning {
        background-color: #ebb6b6;
      }
    }
    .offset-line {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: rem(5);
      height: rem(10);
      &.default {
        background-color: #3d454d;
      }
      &.message {
        background-color: rgba(0, 128, 255, 1);
      }
      &.success {
        background-color: #0df352;
      }
      &.warning {
        background-color: #f02727;
      }
    }
    .move-trank {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: rem(88);
      height: rem(36);
      box-sizing: content-box;
      background: #ffffff;
      border-radius: rem(18);
      border: 1px solid rgba(205, 224, 230, 0.8);
      box-shadow: 0 1px 4px 0 rgba(91, 91, 91, 0.5);
    }
  }
  .range-rate {
    width: rem(80);
    margin-left: rem(2);
    font-size: rem(30);
    color: rgba(24, 25, 26, 1);
  }
}
</style>
