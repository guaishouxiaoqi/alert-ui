<template>
  <div class='loading-icon'>
    <svg v-if="show"
         class="lds-spin"
         :width="svgSize[0]"
         :height="svgSize[1]"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 100 100"
         preserveAspectRatio="xMidYMid">
      <g transform="translate(86,50)">
        <g transform="rotate(0)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[0]"
                  :fill="fillColorArray[0]"
                  fill-opacity="1"
                  transform="scale(1.04255 1.04255)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="-0.875s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="-0.875s"></animate>
          </circle>
        </g>
      </g>
      <g transform="translate(75.45584412271572,75.45584412271572)">
        <g transform="rotate(45)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[1]"
                  :fill="fillColorArray[1]"
                  fill-opacity="0.875"
                  transform="scale(1.05505 1.05505)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="-0.75s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="-0.75s"></animate>
          </circle>
        </g>
      </g>
      <g transform="translate(50,86)">
        <g transform="rotate(90)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[2]"
                  :fill="fillColorArray[2]"
                  fill-opacity="0.75"
                  transform="scale(1.06755 1.06755)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="-0.625s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="-0.625s"></animate>
          </circle>
        </g>
      </g>
      <g transform="translate(24.54415587728429,75.45584412271572)">
        <g transform="rotate(135)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[3]"
                  :fill="fillColorArray[3]"
                  fill-opacity="0.625"
                  transform="scale(1.08005 1.08005)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="-0.5s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="-0.5s"></animate>
          </circle>
        </g>
      </g>
      <g transform="translate(14,50.00000000000001)">
        <g transform="rotate(180)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[4]"
                  :fill="fillColorArray[4]"
                  fill-opacity="0.5"
                  transform="scale(1.09255 1.09255)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="-0.375s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="-0.375s"></animate>
          </circle>
        </g>
      </g>
      <g transform="translate(24.544155877284282,24.54415587728429)">
        <g transform="rotate(225)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[5]"
                  :fill="fillColorArray[5]"
                  fill-opacity="0.375"
                  transform="scale(1.00505 1.00505)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="-0.25s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="-0.25s"></animate>
          </circle>
        </g>
      </g>
      <g transform="translate(49.99999999999999,14)">
        <g transform="rotate(270)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[6]"
                  :fill="fillColorArray[6]"
                  fill-opacity="0.25"
                  transform="scale(1.01755 1.01755)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="-0.125s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="-0.125s"></animate>
          </circle>
        </g>
      </g>
      <g transform="translate(75.4558441227157,24.544155877284282)">
        <g transform="rotate(315)">
          <circle cx="0"
                  cy="0"
                  :r="pointSize[7]"
                  :fill="fillColorArray[7]"
                  fill-opacity="0.125"
                  transform="scale(1.03005 1.03005)">
            <animateTransform attributeName="transform"
                              type="scale"
                              begin="0s"
                              values="1.1 1.1;1 1"
                              keyTimes="0;1"
                              dur="1s"
                              repeatCount="indefinite"></animateTransform>
            <animate attributeName="fill-opacity"
                     keyTimes="0;1"
                     dur="1s"
                     repeatCount="indefinite"
                     values="1;0"
                     begin="0s"></animate>
          </circle>
        </g>
      </g>
    </svg>
    <svg v-else
         :width="svgSize[0]"
         :height="svgSize[1]"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 100 100"
         preserveAspectRatio="xMidYMid"
         class="lds-eclipse">
      <path stroke="none"
            d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
            :fill="fillColor"
            transform="rotate(281.37 50 51)">
        <animateTransform attributeName="transform"
                          type="rotate"
                          calcMode="linear"
                          values="0 50 51;360 50 51"
                          keyTimes="0;1"
                          dur="1s"
                          begin="0s"
                          repeatCount="indefinite"></animateTransform>
      </path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    fillColorArray: {
      type: Array,
      default: () => {
        return [
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff",
          "#0080ff"
        ];
      }
    },
    svgSize: {
      type: Array,
      default: () => {
        return ["4.8rem", "3.2rem"];
      }
    },
    pointSize: {
      type: Array,
      default: () => [8, 8, 8, 8, 8, 8, 8, 8]
    },
    svgType: {
      default: "point"
    },
    lineSize: {
      default: () => ["3.2rem", "3.2rem"]
    },
    fillColor: {
      type: String,
      default: "#0080ff"
    }
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    show() {
      let type = this.svgType != "" ? this.svgType : "point";
      return type == "point";
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
</style>
