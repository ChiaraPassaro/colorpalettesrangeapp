<template>
  <svg
    :style="cssVars"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 125 125"
  >
    <path
      d="M62.5,125A62.5,62.5,0,1,1,125,62.5,62.48,62.48,0,0,1,62.5,125ZM91.73,51.41H62.5V33.54a3,3,0,0,0-5.17-2.14l-28.8,29a3,3,0,0,0,0,4.26l28.8,28.95a3,3,0,0,0,5.17-2.14V73.59H91.73a3,3,0,0,0,3-3V54.44A3,3,0,0,0,91.73,51.41Z"
    />
  </svg>
</template>

<script>
export default {
  name: "BackIcoComponent.vue",
  props: ["color"],
  computed: {
    cssVars() {
      return { "--fill": this.color };
    },
  },
};
</script>

<style lang="scss" scoped>
svg {
  fill: var(--fill);
}
</style>
