<template>
  <svg
    :style="cssVars"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 125 125"
  >
    <circle cx="27.08" cy="27.08" r="27.08" />
    <circle cx="97.92" cy="27.08" r="27.08" />
    <circle cx="27.08" cy="97.92" r="27.08" />
    <circle cx="97.92" cy="97.92" r="27.08" />
  </svg>
</template>

<script>
export default {
  name: "palettes.vue",
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
