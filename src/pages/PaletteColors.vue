<template>
  <Layout :id="id" :colors="colors">
    <template #header>
      <h2 class="app__content__header__title">{{ name }}</h2>
    </template>
    <template #main>
      <div class="colors">
        <ColorComponent
          v-for="(color, index) in colors"
          :key="color + index"
          :color="color"
        />
      </div>
    </template>
  </Layout>
</template>

<script>
import ColorComponent from "@/components/ColorComponent";
import Palette from "@/layouts/Palette";

export default {
  name: "PaletteColors.vue",
  components: { ColorComponent, Layout: Palette },
  props: ["id"],
  computed: {
    colors() {
      return this.$store.state.pages[this.id].colors;
    },
    name() {
      return this.$store.state.schemas.find((element) => element.id === this.id)
        .name;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.pages[vm.id].colors.length === 0) {
        next({ name: "Palette" });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/partials/variables";

.colors {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.9em;
  width: 100%;
  padding: 0 0 8% $paddingContainer;
  overflow-y: auto;
  height: 100%;
}
</style>
