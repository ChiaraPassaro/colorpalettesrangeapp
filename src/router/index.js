import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/palettes",
    name: "Palettes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "palettes" */ "../pages/Palettes.vue"),
  },
  {
    path: "/palette/:id",
    name: "Palette",
    props: true,
    component: () =>
      import(/* webpackChunkName: "palette" */ "../pages/Palette.vue"),
  },
  {
    path: "/palette/:id/colors",
    name: "Colors",
    props: true,
    component: () =>
      import(/* webpackChunkName: "palette" */ "../pages/PaletteColors.vue"),
  },
  {
    path: "/palette/:id/wheel",
    name: "Wheel",
    props: true,
    component: () =>
      import(/* webpackChunkName: "palette" */ "../pages/PaletteWheel.vue"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
