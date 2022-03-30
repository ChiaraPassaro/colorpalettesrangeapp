<template>
  <div id="app">
    <div :class="['app__nav', nameRoute]">
      <router-link to="/"
        ><LogoComponent
          v-if="$route.name === 'Home'"
          :color="logoColorHome"
        ></LogoComponent>
        <BaseColorComponent v-else :color="baseColor"></BaseColorComponent>
      </router-link>
      <router-link
        v-if="$route.name !== 'Home' && $route.name !== 'Palettes'"
        to="/palettes"
        ><PalettesIcoComponent></PalettesIcoComponent
      ></router-link>
      <router-link v-if="$route.name === 'Palettes'" to="/"
        ><BackIcoComponent></BackIcoComponent
      ></router-link>
    </div>
    <router-view></router-view>
    <footer v-if="$route.name !== 'Home'" :class="nameRoute">
      <LogoComponent :color="logoColorPages"></LogoComponent>
      <div class="footer__buttons">
        <a href="https://github.com/ChiaraPassaro" target="_blank">
          <GithubLogoComponent :color="'black'"></GithubLogoComponent
        ></a>
        <a
          href="https://www.linkedin.com/in/chiara-passaro-90812b10/"
          target="_blank"
          ><LinkedinLogoComponent :color="'black'"></LinkedinLogoComponent
        ></a>
      </div>
    </footer>
    <footer v-else :class="nameRoute">
      <div class="footer__buttons">
        <a href="https://github.com/ChiaraPassaro" target="_blank"
          ><GithubLogoComponent :color="'black'"></GithubLogoComponent
        ></a>
        <a
          href="https://www.linkedin.com/in/chiara-passaro-90812b10/"
          target="_blank"
          ><LinkedinLogoComponent :color="'black'"></LinkedinLogoComponent
        ></a>
      </div>
    </footer>
  </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent";
import BaseColorComponent from "@/components/BaseColorComponent";
import PalettesIcoComponent from "@/components/PalettesIcoComponent";
import BackIcoComponent from "@/components/BackIcoComponent";
import GithubLogoComponent from "@/components/GithubLogoComponent";
import LinkedinLogoComponent from "@/components/LinkedinLogoComponent";

export default {
  components: {
    LogoComponent,
    BaseColorComponent,
    PalettesIcoComponent,
    BackIcoComponent,
    GithubLogoComponent,
    LinkedinLogoComponent,
  },
  data() {
    return {
      logoColorHome: "hsl(299, 100%, 50%)",
      logoColorPages: "hsl(299, 0%, 50%)",
      nameRoute: "",
    };
  },
  computed: {
    baseColor() {
      return this.$store.getters.getBaseColorHSL;
    },
  },
  mounted() {
    this.$router.onReady(
      () => (this.nameRoute = this.$route.name.toLowerCase())
    );
  },
  updated() {
    this.$router.onReady(
      () => (this.nameRoute = this.$route.name.toLowerCase())
    );
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/style";
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
}
</style>
