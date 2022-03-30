<template>
  <div class="nav">
    <router-link
      exact-path-active-class
      v-for="(link, index) in links"
      :key="link.nameLink + '_' + index"
      :to="{ name: link.name, params: $route.params.id }"
      ><component
        :is="link.icon"
        :color="$store.getters.getBaseColorHSL"
      ></component
    ></router-link>
    <router-link exact-path-active-class :to="`../${$route.params.id}`"
      ><BackIcoComponent
        :color="$store.getters.getBaseColorHSL"
      ></BackIcoComponent
    ></router-link>
  </div>
</template>

<script>
import BackIcoComponent from "@/components/BackIcoComponent";
export default {
  name: "NavbarComponent",
  components: {
    BackIcoComponent,
  },
  props: {
    links: {
      type: Array,
      validator: function (value) {
        let props = ["nameLink", "name", "params", "icon"];
        let valid = true;

        value.forEach((element) => {
          let keys = Object.keys(element);
          keys.forEach((key) => {
            if (!props.includes(key)) {
              valid = false;
            }
          });
        });

        return valid;
      },
    },
  },
};
</script>
