<template>
  <div class="app__content">
    <header class="app__content__header">
      <slot name="header">
        <div id="nav"></div>
      </slot>
    </header>
    <div class="app__content__main">
      <div class="col-left"><slot name="main"></slot></div>
      <div class="col-right">
        <div class="main__navbar">
          <NavbarComponent :links="links"></NavbarComponent>
          <div class="main__navbar__description">
            <h2>Colors</h2>
            You have generated {{ numberColors }} colors, in a 20 degrees range
            <span v-if="!!numberSteps"> and {{ numberSteps }} steps </span>.
          </div>
        </div>
        <div class="export-colors">
          <div class="container__tab">
            <ul class="list__tab__tag">
              <li
                class="tab__tag__element"
                v-for="(tab, key) in visible"
                :key="key + tab"
                @click="!tab ? visibleTab(key) : ''"
              >
                {{ key }}
              </li>
            </ul>
            <div class="tab export-colors__tab--json" v-if="visible.json">
              <JsonList :id="id"></JsonList>
            </div>
            <div class="tab export-colors__tab--scss" v-if="visible.scss">
              <ScssList :id="id"></ScssList>
            </div>
            <!--<div class="export&#45;&#45;colors__share"></div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import JsonList from "@/components/JsonList";
import ScssList from "@/components/ScssList";

export default {
  name: "Palette",
  components: { ScssList, NavbarComponent, JsonList },
  props: ["id", "colors"],
  data() {
    return {
      visible: {
        json: true,
        scss: false,
      },
    };
  },
  methods: {
    visibleTab(key) {
      for (let visibleKey in this.visible) {
        key === visibleKey
          ? (this.visible[visibleKey] = true)
          : (this.visible[visibleKey] = false);
      }
    },
  },
  computed: {
    links() {
      return this.$store.state.submenu;
    },
    numberColors() {
      return this.$store.state.pages[this.id].colors.length;
    },
    numberSteps() {
      return this.$store.state.pages[this.id].stepDegree
        ? this.$store.state.pages[this.id].stepDegree
        : "";
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/partials/variables";

.app__content__main {
  height: calc(100% - #{$headerHeight});
  padding: 2% 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .col-left {
    float: left;
    width: 45%;
  }
  .col-right {
    float: left;
    width: 55%;
    height: 100%;
    padding-left: 2em;
    overflow: hidden;
  }
  .main__navbar {
    padding: 0 $paddingContainer;
    .main__navbar__description {
      margin-bottom: 1em;
    }
  }
  .tab {
    height: 100%;
  }
  .list__tab__tag {
    display: flex;
    gap: 1em;
    .tab__tag__element {
      display: flex;
      justify-content: center;
      align-content: center;
      width: calc(100% / 5);
      padding: 0.5em;
      border-radius: 6px 6px 0 0;
      background-color: white;
      cursor: pointer;
    }
  }
  .export-colors {
    position: relative;
    width: 60%;
    height: calc(80% - 1em);
    > div {
      height: 100%;
    }
  }
  .wheel {
    float: left;
    width: 70%;
    @media screen and (max-width: $mediaL) {
      width: 50%;
    }
    padding: 0 $paddingContainer;
  }
}
</style>
