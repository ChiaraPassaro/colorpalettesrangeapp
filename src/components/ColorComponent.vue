<template>
  <div
    class="color"
    :style="`background-color: ${color.printHsl()}; color: ${colorText}`"
  >
    <div class="color__text" :class="glow ? 'glow' : ''" @click="copyColor">
      <span>{{ color.printHsl() }}</span>
      <span>{{ color.printRgb() }}</span>
      <span>{{ color.printHex() }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorComponent.vue",
  props: ["color"],
  data() {
    return { glow: false };
  },
  computed: {
    colorText() {
      if (this.color.getBrightness() <= 50) {
        const hue = this.color.getHue();
        const saturation = this.color.getSaturation();
        return `hsl(${hue}, ${saturation}%, 100%)`;
      }
      return "black";
    },
  },
  methods: {
    copyColor() {
      const colors =
        this.color.printHsl() +
        " " +
        this.color.printRgb() +
        " " +
        this.color.printHex();

      navigator.clipboard.writeText(colors).then(() => {
        this.glow = true;
        setTimeout(() => {
          this.glow = false;
        }, 600);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/scss/partials/variables";
@import "src/assets/scss/partials/mixin";

.color {
  aspect-ratio: 1/1;
  width: calc(100% / 4.5);
  @media screen and (max-width: $mediaL) {
    width: calc(100% / 6);
  }
  padding: 0.5em;
  border-radius: 8px;
  box-shadow: inset 0 0 9px 1px grey;
  span {
    font-size: $baseFont - 2;
    line-height: $baseFont * 1.5;
    @media screen and (max-width: $mediaL) {
      display: none;
    }
    @media screen and (min-width: $mediaXL) {
      font-size: $baseFont;
      line-height: $baseFont * 2.5;
    }
  }
  .color__text {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &.glow:after {
      content: "Copied!";
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.8);
      color: black;
      font-size: 110%;
      @media screen and (max-width: $mediaL) {
        font-size: 80%;
      }
      font-weight: 700;
      @include animationFadeIn(color, 0, 1);
    }
  }
}
</style>
