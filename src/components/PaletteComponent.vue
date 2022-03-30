<template>
  <div :class="`palette del-${index + 1}`">
    <div class="palette__content" :style="backgroundColor" :id="id">
      <h2 @click="route">
        <span>{{ name }}</span>
      </h2>
      <ul class="palette__number-color">
        <li
          v-for="(color, index) in colors"
          :key="index"
          :class="'color ' + color.degree"
        >
          <span class="circle" title="color"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaletteComponent",
  props: ["colors", "id", "name", "index", "form"],
  computed: {
    backgroundColor() {
      return `background-color: ${new this.$store.state.colorPalettesRange.Hsl({
        hue: this.$store.state.baseColor.degree,
        saturation: this.$store.state.baseColor.saturation,
        brightness: this.$store.state.baseColor.brightness,
      }).printHex()}`;
    },
  },
  methods: {
    route() {
      this.$router.push({
        name: "Palette",
        params: { id: this.id, form: this.form },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/scss/style";
.palette {
  width: calc((100% / 4) - #{$palettePaddingL}px);
  padding: #{$palettePadding}px;
  margin: 2.1%;
  transition: all 0.5s;
  &__content {
    /* 1:1 Aspect Ratio */
    position: relative;
    padding-top: 100%;
    /* / 1:1 Aspect Ratio */
    width: 100%;
    border-radius: 100%;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.6));
    background: $debugColor; /*colore temporaneo*/
    cursor: pointer;

    /*cerchio interno*/
    &:after {
      content: "";
      position: absolute;
      width: 35%;
      height: 35%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: 1;
      background: white;
    }
  }

  h2 {
    display: flex;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80%;
    min-height: 30%;
    padding: 10px;
    font-size: $paletteFontSize;
    line-height: $paletteFontSize + 0.2;
    text-align: center;
    transition: all 0.2s;
    @media screen and (max-width: $mediaXL) {
      font-size: $paletteFontSizeS;
      line-height: $paletteFontSizeS + 0.2;
    }

    font-weight: $paletteFontWeight;
    text-transform: uppercase;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    filter: drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.6));

    span {
      margin: auto;
      text-decoration: none;
      color: $paletteFontColor;
    }
  }
  &:hover {
    h2 {
      background: rgba(255, 255, 255, 0.4);
    }
  }
  &__number-color {
    /* 1:1 Aspect Ratio */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    /* / 1:1 Aspect Ratio */

    list-style-type: none;

    /*pallini*/
    .color {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      span.circle {
        position: absolute;
        top: calc(#{$colorWidth} / -2);
        left: 50%;
        transform: translateX(-50%);
        will-change: transform;
        width: $colorWidth;
        height: $colorHeight;
        background: black;
        border-radius: 100%;

        @media screen and (min-width: $mediaM) {
          top: calc((#{$colorWidth} * 1.1) / -2);
          width: $colorWidth * 1.1;
          height: $colorHeight * 1.1;
        }
        @media screen and (min-width: $mediaL) {
          top: calc((#{$colorWidth} * 1.2) / -2);
          width: $colorWidth * 1.2;
          height: $colorHeight * 1.2;
        }
        @media screen and (min-width: $mediaXL) {
          top: calc((#{$colorWidth} * 2) / -2);
          width: calc(#{$colorWidth} * 2);
          height: calc(#{$colorHeight} * 2);
        }
      }

      #page-palette-list & {
        //creo classi per tutti i gradi negativi e positivi e avvio animation rotate
        @for $i from 1 through 180 {
          &.deg#{$i} {
            @include animationRotation(rotation#{$i}, 0deg, #{$i}deg);
          }
        }

        @for $i from 1 through 180 {
          &.deg#{$i}m {
            @include animationRotation(rotation#{$i}m, 0deg, -#{$i}deg);
          }
        }
      }
    }
  }
}

//sovrascrivo delay su animation rotate
/*prima palette*/
$in: $animationDelayBase;
@for $u from 1 through 10 {
  .palette[class*="del-#{$u}"] {
    li[class*="deg"] {
      animation-delay: #{$in}s;
    }
  }
  /* palette successive*/
  $in: ($in + 0.3);
}
</style>
