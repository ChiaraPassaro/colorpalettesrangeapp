<template>
  <div class="palettes-page main__content" id="page-palette-list">
    <Layout>
      <template #main>
        <div
          class="main main--palettes"
          :style="scrollbarColor"
          @wheel="onWheel"
          ref="containerPalettes"
        >
          <div class="main__palettes">
            <PaletteComponent
              v-for="(schema, index) in schemas"
              :id="schema.id"
              :colors="schema.colors"
              :key="index"
              :name="schema.name"
              :index="index"
            />
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Home from "@/layouts/Home";
import PaletteComponent from "@/components/PaletteComponent";

export default {
  name: "Palettes",
  components: {
    PaletteComponent,
    Layout: Home,
  },
  data() {
    return {
      schemas: this.$store.state.schemas,
      timeout: false,
    };
  },
  computed: {
    scrollbarColor() {
      return `
      --scrollBarColor: ${this.$store.getters.getBaseColorHSL}
`;
    },
  },
  methods: {
    onWheel(event) {
      const vm = this;
      const container = vm.$refs.containerPalettes;
      if (vm.requestAnimationFrameId) {
        window.cancelAnimationFrame(vm.requestAnimationFrameId);
      }
      if (event.deltaY >= 0 && event.deltaX === 0) {
        vm.requestAnimationFrameId = window.requestAnimationFrame(function () {
          container.scrollLeft += 100;
        });
      } else if (event.deltaY < 0 && event.deltaX === 0) {
        vm.requestAnimationFrameId = window.requestAnimationFrame(function () {
          container.scrollLeft -= 100;
        });
      }
    },
  },
  mounted() {
    this.positionScroll = this.$refs.containerPalettes.scrollLeft;
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/style";

.palettes-page.main__content {
  height: calc(100% - (#{$headerHeight} * 2));
  @media screen and (max-width: $mediaL) {
    height: calc(100% - (#{$headerHeight - 20} * 2));
  }

  .app__content {
    height: 100%;
  }

  .main__palettes {
    display: flex;
    align-items: center;
    position: relative;
    width: 300%;
    height: 100%;

    @media (min-aspect-ratio: 16/9) {
      width: 250%;
      min-width: auto;
    }

    @media (min-aspect-ratio: 21/9) {
      width: 200%;
    }
  }
}

.main--palettes {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  /* Works on Firefox */
  scrollbar-width: auto;
  scrollbar-color: var(--scrollBarColor) $bodyColor;

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: darken($bodyColor, 10);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollBarColor);
    border-radius: 20px;
    border: 2px solid darken($bodyColor, 10);
  }
}
</style>
