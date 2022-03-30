<template>
  <div class="app__content">
    <header>
      <slot name="header">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/palettes">Palettes</router-link> |
        </div>
      </slot>
    </header>
    <slot name="main"></slot>
  </div>
</template>

<script>
export default {
  name: "Default",
};
</script>

<style scoped></style>
