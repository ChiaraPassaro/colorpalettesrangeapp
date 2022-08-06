<template>
  <div class="palette-page main__content">
    <Layout>
      <template #header>
        <div class="main__content__header">
          <h1 class="main__content__header__title">Palette {{ name }}</h1>
        </div>
      </template>
      <template #main>
        <div class="main__palette">
          <div class="palette__description__info">
            <p v-html="description"></p>
          </div>
          <div class="palette__form">
            <FormComponent
              v-if="form"
              :page="`${id}`"
              :type="'form'"
              :style="bgSubmit"
            ></FormComponent>
            <div v-else class="input-submit">
              <InputComponent
                v-bind="button"
                v-on:click-submit="submit"
                :style="bgSubmit"
              ></InputComponent>
            </div>
          </div>
        </div>
        <div class="wheel__container">
          <WheelComponent v-bind="wheelProps"></WheelComponent>
        </div>
      </template>
    </Layout>
  </div>
</template>
<script>
import Default from "@/layouts/Default";
import FormComponent from "@/components/FormComponent";
import InputComponent from "@/components/InputComponent";
import WheelComponent from "@/components/WheelComponent";

export default {
  name: "Palette",
  props: ["id"],
  components: {
    WheelComponent,
    FormComponent,
    Layout: Default,
    InputComponent,
  },
  data() {
    return {
      description: this.$store.state.pages[this.id].description,
    };
  },
  computed: {
    form() {
      return this.$store.state.schemas.find((element) => element.id === this.id)
        .form;
    },
    name() {
      return this.$store.state.schemas.find((element) => element.id === this.id)
        .name;
    },
    button() {
      return this.$store.state.pages[this.id].submit;
    },
    bgSubmit() {
      return {
        "--bgSubmit": this.$store.state.colorPalettesRange
          .Hsl({
            hue: this.$store.state.baseColor.degree,
            saturation: this.$store.state.baseColor.saturation,
            brightness:
              this.$store.state.baseColor.brightness > 10 &&
              this.$store.state.baseColor.brightness <= 100
                ? this.$store.state.baseColor.brightness - 9
                : this.$store.state.baseColor.brightness > 100
                ? 100
                : this.$store.state.baseColor.brightness + 10,
          })
          .printHsl(),
        "--borderSubmit": this.$store.state.colorPalettesRange
          .Hsl({
            hue: this.$store.state.baseColor.degree,
            saturation: this.$store.state.baseColor.saturation,
            brightness:
              this.$store.state.baseColor.brightness > 10 &&
              this.$store.state.baseColor.brightness <= 100
                ? this.$store.state.baseColor.brightness - 9
                : this.$store.state.baseColor.brightness > 100
                ? 100
                : this.$store.state.baseColor.brightness + 10,
          })
          .printHsl(),
        "--bgSubmitHover": this.$store.state.colorPalettesRange
          .Hsl({
            hue: this.$store.state.baseColor.degree,
            saturation: this.$store.state.baseColor.saturation,
            brightness:
              this.$store.state.baseColor.brightness > 10 &&
              this.$store.state.baseColor.brightness <= 100
                ? this.$store.state.baseColor.brightness - 10
                : this.$store.state.baseColor.brightness > 100
                ? 100
                : this.$store.state.baseColor.brightness + 10,
          })
          .printHsl(),
      };
    },
    wheelProps() {
      return {
        degree: this.$store.state.pages.home.form.data.degree.value,
        saturation: this.$store.state.pages.home.form.data.saturation.value,
        brightness: this.$store.state.pages.home.form.data.brightness.value,
      };
    },
  },
  methods: {
    submit() {
      this.inputDisabled = true;

      let { type, mutation } = this.button.action;
      this.$store
        .dispatch({
          type,
          mutation,
          data: { page: this.id, type: "form" },
        })
        .then(() => {
          this.inputDisabled = false;
          this.$router.push({ name: this.button.route });
        });
    },
  },
};
</script>

<style lang="scss">
@use "sass:math";
@import "src/assets/scss/partials/variables";

.app__content__main {
  display: flex;
  height: calc(100% - 90px);
  padding: 2% 0;
}
.main__navbar {
  width: 50%;
  padding: 0 1%;
}

.palette-page.main__content {
  height: calc(100% - (#{$headerHeight} * 2));
  .app__content {
    position: relative;
    height: 100%;
  }
  .main__content__header {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    height: 4.8rem;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 70%
    );

    &__title {
      margin-left: 8%;
      font-size: $titlePalette;
      line-height: $titlePalette;
      @media screen and (max-width: 1200px) {
        font-size: math.div($titlePalette, 1.3);
        line-height: math.div($titlePalette, 1.3);
      }
      text-transform: uppercase;
    }
  }
  .main__content_form {
    display: flex;
    align-items: flex-end;
    form {
      width: 100%;
      .input-group {
        width: 80%;
        margin-bottom: 0.6rem;
      }
    }
  }
  .input-submit {
    button {
      position: relative;
      width: 110%;
      height: $submitSize * 2;
      padding: 0 3%;
      margin-top: 28px;
      border: 0.15rem solid var(--bgSubmit);
      border-radius: 0.3rem 0 0 0.3rem;
      background-color: var(--bgSubmit);
      font-size: $submitSize;
      @media screen and (max-width: 1200px) {
        font-size: math.div($submitSize, 1.1);
      }
      color: white;
      text-transform: uppercase;
      text-align: left;
      cursor: pointer;
      &:after {
        position: absolute;
        right: -$submitSize;
        top: 0.15rem;
        content: "";
        width: math.div($submitSize * 2, math.sqrt(2));
        height: math.div($submitSize * 2, math.sqrt(2));
        transform: translate(-6%, -6%) rotate(45deg);
        border-radius: 0.3rem;
        background-color: inherit;
        border-style: inherit;
        border-color: inherit;
        border-width: 0.15rem 0.15rem 0 0;
        cursor: pointer;
      }
      &:hover,
      &:active,
      &:focus {
        background-color: var(--bgSubmitHover);
      }
    }
  }
  .main__palette {
    position: absolute;
    left: 0;
    bottom: calc(50% - 1.2rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 60%;
    min-height: 40%;
    padding: 0 $paddingContainer;
  }
  .palette__form {
    width: 45%;
  }
}
.palette__description__info {
  margin-bottom: 28px;
}
.wheel__container {
  position: absolute;
  top: 0;
  left: 30%;
  z-index: -1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
