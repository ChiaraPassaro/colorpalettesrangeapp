<template>
  <div class="home__content">
    <Layout>
      <template #main>
        <div class="main__content">
          <div class="main__content__header">
            <h1 class="main__content__header__title">INSERT BASE COLOR</h1>
            <p>
              Have you got a
              <a href="#" @click="modal('converterHex', true)">HEX</a>
              or
              <a href="#" @click="modal('converterRgb', true)">RGB</a>
              color?
            </p>
          </div>
          <FormComponent
            class="main__content__form"
            :page="page"
            :style="bgSubmit"
            :type="'form'"
          >
            ></FormComponent
          >
        </div>
        <div class="wheel__container">
          <WheelComponent v-bind="wheelProps"></WheelComponent>
        </div>
      </template>
    </Layout>
    <div class="modal__overlay" v-if="rgbForm">
      <div class="modal">
        <FormComponent
          v-if="rgbForm"
          class="rgb-converter"
          :page="page"
          :type="'converterRgb'"
          :style="bgSubmit"
        >
          ></FormComponent
        >
        <div class="input-submit">
          <button
            @click="modal('converterRgb', false)"
            type="submit"
            class="btn-close"
            :style="bgSubmitModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div class="modal__overlay" v-if="hexForm">
      <div class="modal">
        <FormComponent
          v-if="hexForm"
          class="hex-converter"
          :page="page"
          :type="'converterHex'"
          :style="bgSubmit"
        >
          ></FormComponent
        >
        <div class="input-submit">
          <button
            @click="modal('converterHex', false)"
            type="submit"
            class="btn-close"
            :style="bgSubmitModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "@/layouts/Home";
import FormComponent from "@/components/FormComponent";
import WheelComponent from "@/components/WheelComponent";

export default {
  name: "Home",
  components: {
    WheelComponent,
    Layout: Home,
    FormComponent,
  },
  data() {
    return {
      page: "home",
    };
  },
  computed: {
    wheelProps() {
      return {
        degree:
          this.$store.state.pages.home.form.data.degree.value <= 360
            ? this.$store.state.pages.home.form.data.degree.value
            : 360,
        saturation:
          this.$store.state.pages.home.form.data.saturation.value <= 100
            ? this.$store.state.pages.home.form.data.saturation.value
            : 100,
        brightness:
          this.$store.state.pages.home.form.data.brightness.value <= 100
            ? this.$store.state.pages.home.form.data.brightness.value
            : 100,
      };
    },
    bgSubmit() {
      return {
        "--bgSubmit": this.$store.state.colorPalettesRange
          .Hsl({
            hue:
              this.$store.state.pages.home.form.data.degree.value <= 360
                ? this.$store.state.pages.home.form.data.degree.value
                : 360,
            saturation:
              this.$store.state.pages.home.form.data.saturation.value <= 100
                ? this.$store.state.pages.home.form.data.saturation.value
                : 100,
            brightness:
              this.$store.state.pages.home.form.data.brightness.value > 10 &&
              this.$store.state.pages.home.form.data.brightness.value <= 100
                ? this.$store.state.pages.home.form.data.brightness.value - 9
                : this.$store.state.pages.home.form.data.brightness.value > 100
                ? 100
                : this.$store.state.pages.home.form.data.brightness.value + 10,
          })
          .printHsl(),
        "--borderSubmit": this.$store.state.colorPalettesRange
          .Hsl({
            hue:
              this.$store.state.pages.home.form.data.degree.value <= 360
                ? this.$store.state.pages.home.form.data.degree.value
                : 360,
            saturation:
              this.$store.state.pages.home.form.data.saturation.value <= 100
                ? this.$store.state.pages.home.form.data.saturation.value
                : 100,
            brightness:
              this.$store.state.pages.home.form.data.brightness.value > 10 &&
              this.$store.state.pages.home.form.data.brightness.value <= 100
                ? this.$store.state.pages.home.form.data.brightness.value - 9
                : this.$store.state.pages.home.form.data.brightness.value > 100
                ? 100
                : this.$store.state.pages.home.form.data.brightness.value + 10,
          })
          .printHsl(),
        "--bgSubmitHover": this.$store.state.colorPalettesRange
          .Hsl({
            hue:
              this.$store.state.pages.home.form.data.degree.value <= 360
                ? this.$store.state.pages.home.form.data.degree.value
                : 360,
            saturation:
              this.$store.state.pages.home.form.data.saturation.value <= 100
                ? this.$store.state.pages.home.form.data.saturation.value
                : 100,
            brightness:
              this.$store.state.pages.home.form.data.brightness.value > 10 &&
              this.$store.state.pages.home.form.data.brightness.value <= 100
                ? this.$store.state.pages.home.form.data.brightness.value - 10
                : this.$store.state.pages.home.form.data.brightness.value > 100
                ? 100
                : this.$store.state.pages.home.form.data.brightness.value + 10,
          })
          .printHsl(),
      };
    },
    bgSubmitModal() {
      return {
        "--bgSubmit": "rgb(0, 0, 0, 0.3)",
        "--borderSubmit": "rgb(0, 0, 0, 0.3)",
        "--bgSubmitHover": "rgb(0, 0, 0, 0.7)",
      };
    },
    rgbForm() {
      return this.$store.state.pages[this.page].converterRgb.visible;
    },
    hexForm() {
      return this.$store.state.pages[this.page].converterHex.visible;
    },
  },
  methods: {
    modal(type, value) {
      this.$store.commit("updateVisibilityModal", {
        page: "home",
        type: type,
        visible: value,
      });
    },
  },
};
</script>

<style lang="scss">
@use "sass:math";

@import "src/assets/scss/partials/variables";
.home__content {
  height: calc(100% - #{$headerHeight});
  .app__content {
    position: relative;
    height: 100%;
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
  .main__content {
    position: absolute;
    bottom: calc(50% - 1.7rem);
    left: 0;
    padding: 0 $paddingContainer;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    &__header {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: 20px;
      > * {
        margin-bottom: 10px;
      }
      &__title {
        font-size: 1.8rem;
        @media screen and (max-width: $mediaXL) {
          font-size: 1.4rem;
        }
      }
    }
    &__form {
      display: flex;
      align-items: flex-end;
      form {
        width: 100%;
      }
      .input-group {
        width: 80%;
        margin-bottom: 0.6rem;
      }
      .input-submit {
        button {
          position: relative;
          width: 110%;
          height: $submitSize * 2;
          padding: 0 3%;
          border: 0.15rem solid var(--borderSubmit);
          border-radius: 0.3rem 0 0 0.3rem;
          background-color: var(--bgSubmit);
          font-size: $submitSize;
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
    }
  }
  .modal__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    padding: 2%;
    background-color: white;
    border-radius: 0.3rem;
    text-align: center;
    form {
      width: 100%;
      .input-group {
        width: 100%;
        margin-bottom: 0.6rem;
      }
    }
    .input-submit {
      button {
        position: relative;
        width: 50%;
        height: $submitSize * 2;
        padding: 0 3%;
        margin-top: 28px;
        border: 0.15rem solid var(--bgSubmit);
        border-radius: 0.3rem;
        background-color: var(--bgSubmit);
        font-size: $submitSize;
        @media screen and (max-width: 1200px) {
          font-size: math.div($submitSize, 1.1);
        }
        color: white;
        text-transform: uppercase;
        text-align: center;
        cursor: pointer;
        &:hover,
        &:active,
        &:focus {
          background-color: var(--bgSubmitHover);
        }
        &:disabled {
          opacity: 0.5;
          cursor: default;
        }
      }
    }
  }
}
</style>
