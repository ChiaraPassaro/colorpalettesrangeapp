<template>
  <div class="container__code">
    <div class="btn button-copy" @click="copy(sourcecode)">Copy</div>
    <div class="message" v-if="copied">Copied!</div>
    <pre class="language-json"><code>{{sourcecode}}</code>
    </pre>
  </div>
</template>

<script>
import Prism from "prismjs";

export default {
  name: "JsonList",
  props: ["id"],
  data() {
    return {
      copied: false,
    };
  },
  mounted() {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    Prism.highlightAll(); // highlight your code on mount
  },
  methods: {
    copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1000);
      });
    },
  },
  computed: {
    sourcecode() {
      const json = this.$store.state.pages[this.id].colors.map((color) => {
        const thisColor = new this.$store.state.colorPalettesRange.HslConvert({
          hue: color.getHue(),
          saturation: color.getSaturation(),
          brightness: color.getBrightness(),
        });

        return {
          hex: thisColor.getHex().printHex(),
          hsl: {
            hue: color.getHue(),
            saturation: color.getSaturation(),
            lightness: color.getBrightness(),
          },
          rgb: {
            red: thisColor.getRed(),
            green: thisColor.getGreen(),
            blue: thisColor.getBlue(),
          },
        };
      });
      return JSON.stringify(json, null, "  ");
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/scss/partials/variables";
@import "src/assets/scss/partials/mixin";
.container__code {
  position: relative;
  height: 70%;
  pre {
    height: 100%;
    margin: 0;
  }
  .message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5em;
    background-color: rgba(252, 186, 92, 0.65);
    border-radius: $btnBorderRadius;
    @include animationFadeIn(color, 0, 1);
  }
  .button-copy {
    position: absolute;
    top: 1em;
    right: 1.5em;
  }
}
</style>
