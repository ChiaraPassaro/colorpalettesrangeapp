<template>
  <svg
    :style="cssVars"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 125 125"
  >
    <rect width="34.98" height="34.98" rx="8" />
    <rect x="45.01" width="34.98" height="34.98" rx="8" />
    <rect x="90.02" width="34.98" height="34.98" rx="8" />
    <rect y="90.02" width="34.98" height="34.98" rx="8" />
    <rect x="45.01" y="90.02" width="34.98" height="34.98" rx="8" />
    <rect x="90.02" y="90.02" width="34.98" height="34.98" rx="8" />
    <rect y="45.01" width="34.98" height="34.98" rx="8" />
    <rect x="45.01" y="45.01" width="34.98" height="34.98" rx="8" />
    <rect x="90.02" y="45.01" width="34.98" height="34.98" rx="8" />
  </svg>
</template>

<script>
export default {
  name: "colors.vue",
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
