<template>
  <transition :name="fadeStyle"
              tag="div">
    <div class='container'
         v-if="isShow"
         @click="hide">
      <div class='main'
           @click.stop>
        <div class="close"
             @click="handleCancel"></div>
        <h2 class="confirm-title"
            v-if="showTitle">{{title}}</h2>
        <div class="confirm-content"
             :class="type">{{message}}</div>
        <div class="option-btn">
          <div class="option-cancel"
               @click="handleCancel">{{cancelText}}</div>
          <div class="option-confirm"
               @click="handleConfirm">{{confirmText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "confirm",
  props: [],
  components: {},
  data() {
    return {
      title: "",
      message: "...",
      type: "default",
      isShow: false,
      cancelText: "",
      confirmText: "",
      confirmStyle: {
        default: "default-item",
        scale: "scale-item"
      },
      animateType: "default"
    };
  },
  watch: {},
  computed: {
    fadeStyle() {
      return this.confirmStyle[this.animateType] || "default-item";
    },
    showTitle() {
      return this.title != "";
    }
  },
  methods: {
    handleCancel() {
      this.isShow = false;
      console.log("--123--cancel");
    },
    handleConfirm() {
      this.isShow = false;
      this.confirm();
    },
    confirm() {
      console.log("--123--confirm");
    },
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    }
  },
  created() {},
  mounted() {},
  activated() {},
  deactivated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
@import "../../style/mixin.scss";
@import "../../style/reset.scss";
@import "../../style/common.scss";
$close: "data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA60lEQVRIS8WWSw4CIQyG+x/AAwDnM8bElfEMrnRWJsZ4QPZ6gBpGiQR5FAnKcqD/19IHA2PMnpk3zHy11u6IiKlvQSl1ALAEcILW+kZEC6fJzBdr7boD4sTPAFYvH+/uwxHA1jvdAYnFncMTiCi10RpJVsMB3OqBFG094FtI1bEQ0Aqpis+CiYqUGErOPO8+U/IlAYpKsVjeOUD2uuaNd51Xe6cESELCiCU9UwNkIRLxUg5CRz/y0TJWahEkxVvGyt+SPLRMJU0kOZNsNLGhdED+bNi1eB5Pl+q47hH3sPyDM/zJHP7oj/5teQCjAGAI2oXWngAAAABJRU5ErkJggg==";
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
    min-width: rem(640);
    background: #ffffff;
    border-radius: rem(12);
    transform: translate(-50%, -50%);
    padding: rem(30);
    .close {
      position: absolute;
      width: rem(36);
      height: rem(36);
      right: rem(20);
      top: rem(20);
      @include Background($close);
      background-size: cover;
    }
    .confirm-title {
      font-size: rem(36);
      font-weight: 500;
      text-align: center;
    }
    .confirm-content {
      padding: rem(30) rem(30) 0;
      font-size: rem(36);
      font-weight: 400;
      text-align: center;
      background: #ffffff;
      border-radius: rem(12);
      &.default {
        color: rgb(16, 16, 17);
      }
      &.warning {
        color: $Danger;
      }
      &.success {
        color: $Green;
      }
    }
    .option-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: rem(50) rem(30) rem(10);
      div {
        padding: rem(12) rem(50);
        font-size: rem(32);
        font-weight: 400;
        border-radius: rem(40);
        border: 1px solid $Blue;
      }
      .option-cancel {
        color: $Blue;
      }
      .option-confirm {
        background: $Blue;
        color: $LineColor;
        font-weight: 500;
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
