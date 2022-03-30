<template>
  <div class="wheel" :style="[wheel, rotate]">
    <svg>
      <clipPath
        id="clip"
        clipPathUnits="objectBoundingBox"
        viewBox="0 0 125 125"
      >
        <path
          transform="scale(0.008)"
          d="M62.5,0A62.5,62.5,0,1,0,125,62.5,62.5,62.5,0,0,0,62.5,0Zm0,85.38A22.88,22.88,0,1,1,85.38,62.5,22.88,22.88,0,0,1,62.5,85.38Z"
        />
      </clipPath>
    </svg>
  </div>
</template>

<script>
export default {
  name: "WheelComponent",
  props: {
    degree: {
      type: Number,
    },
    saturation: {
      type: Number,
    },
    brightness: {
      type: Number,
    },
  },
  data() {
    return {
      ColorPalettesRange: this.$store.state.colorPalettesRange,
    };
  },
  computed: {
    wheel() {
      return {
        background: `conic-gradient(${this.ColorPalettesRange.HslConvert({
          hue: 360,
          saturation: this.saturation <= 100 ? this.saturation : 50,
          brightness: this.brightness <= 100 ? this.brightness : 50,
        })
          .getRgb()
          .printRgb()}, ${this.ColorPalettesRange.HslConvert({
          hue: 60,
          saturation: this.saturation <= 100 ? this.saturation : 50,
          brightness: this.brightness <= 100 ? this.brightness : 50,
        })
          .getRgb()
          .printRgb()}, ${this.ColorPalettesRange.HslConvert({
          hue: 120,
          saturation: this.saturation <= 100 ? this.saturation : 50,
          brightness: this.brightness <= 100 ? this.brightness : 50,
        })
          .getRgb()
          .printRgb()}, ${this.ColorPalettesRange.HslConvert({
          hue: 180,
          saturation: this.saturation <= 100 ? this.saturation : 50,
          brightness: this.brightness <= 100 ? this.brightness : 50,
        })
          .getRgb()
          .printRgb()}, ${this.ColorPalettesRange.HslConvert({
          hue: 240,
          saturation: this.saturation <= 100 ? this.saturation : 50,
          brightness: this.brightness <= 100 ? this.brightness : 50,
        })
          .getRgb()
          .printRgb()}, ${this.ColorPalettesRange.HslConvert({
          hue: 300,
          saturation: this.saturation <= 100 ? this.saturation : 50,
          brightness: this.brightness <= 100 ? this.brightness : 50,
        })
          .getRgb()
          .printRgb()}, ${this.ColorPalettesRange.HslConvert({
          hue: 360,
          saturation: this.saturation <= 100 ? this.saturation : 50,
          brightness: this.brightness <= 100 ? this.brightness : 50,
        })
          .getRgb()
          .printRgb()})`,
      };
    },
    rotate() {
      return { transform: "rotate(-" + (this.degree + 90) + "deg)" };
    },
  },
};
</script>

<style scoped lang="scss">
.wheel {
  aspect-ratio: 1;
  flex-shrink: 0;
  clip-path: url(#clip);
  width: 100%;
  transition: all 1s;
}
</style>
