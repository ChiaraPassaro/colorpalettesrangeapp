import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const storagePalette = window.localStorage;

const BASE_DEGREE = storagePalette.getItem("baseColorDegree")
    ? parseInt(storagePalette.getItem("baseColorDegree"))
    : 273,
  BASE_SATURATION = storagePalette.getItem("baseColorSaturation")
    ? parseInt(storagePalette.getItem("baseColorSaturation"))
    : 99,
  BASE_BRIGHTNESS = storagePalette.getItem("baseColorBrightness")
    ? parseInt(storagePalette.getItem("baseColorBrightness"))
    : 70,
  MIN_DEGREE = 0,
  MAX_DEGREE = 360,
  MIN_SATURATION = 0,
  MAX_SATURATION = 100,
  MIN_BRIGHTNESS = 0,
  MAX_BRIGHTNESS = 100,
  COLOR_PALETTES_RAGE = require("@chiarapassaro/color-palettes-range/src/js");

export default new Vuex.Store({
  state: {
    colorPalettesRange: COLOR_PALETTES_RAGE,
    baseColor: {
      degree: BASE_DEGREE,
      saturation: BASE_SATURATION,
      brightness: BASE_BRIGHTNESS,
    },
    palettes: {},
    pages: {
      home: {
        form: {
          data: {
            degree: {
              component: "InputComponent",
              name: "degree",
              id: "degree",
              type: "number",
              min: MIN_DEGREE,
              max: MAX_DEGREE,
              step: 1,
              placeholder: `Insert a number ${MIN_DEGREE}-${MAX_DEGREE}`,
              label: "Degree",
              tabIndex: 1,
              value: BASE_DEGREE,
              validation: [
                {
                  type: "BETWEEN",
                  arguments: {
                    min: MIN_DEGREE,
                    max: MAX_DEGREE,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            saturation: {
              component: "InputComponent",
              name: "saturation",
              id: "saturation",
              type: "number",
              min: MIN_SATURATION,
              max: MAX_SATURATION,
              step: 1,
              placeholder: `Insert a number ${MIN_SATURATION}-${MAX_SATURATION}`,
              label: "Saturation",
              tabIndex: 2,
              value: BASE_SATURATION,
              validation: [
                {
                  type: "BETWEEN",
                  arguments: {
                    min: MIN_SATURATION,
                    max: MAX_SATURATION,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            brightness: {
              component: "InputComponent",
              name: "brightness",
              id: "brightness",
              type: "number",
              min: MIN_BRIGHTNESS,
              max: MAX_BRIGHTNESS,
              step: 1,
              placeholder: `Insert a number ${MIN_BRIGHTNESS}-${MAX_BRIGHTNESS}`,
              label: "Brightness",
              tabIndex: 3,
              value: BASE_BRIGHTNESS,
              validation: [
                {
                  type: "BETWEEN",
                  arguments: {
                    min: MIN_BRIGHTNESS,
                    max: MAX_BRIGHTNESS,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
          },
          submit: {
            component: "InputComponent",
            name: "submit",
            type: "submit",
            value: "Generate Color",
            tabIndex: 4,
            action: {
              type: "updateBaseColor",
              mutation: "updateBaseColor",
            },
            route: "Palettes",
          },
          validation: false,
        },
        converterRgb: {
          data: {
            red: {
              component: "InputComponent",
              name: "red",
              id: "red",
              type: "number",
              min: 0,
              max: 255,
              step: 1,
              placeholder: "Insert a number 0-255",
              label: "Red",
              tabIndex: 1,
              value: 0,
              validation: [
                {
                  type: "NOT_A_NUMBER",
                  messageError: "Is not a number",
                },
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 0,
                    max: 255,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            green: {
              component: "InputComponent",
              name: "green",
              id: "green",
              type: "number",
              min: 0,
              max: 255,
              step: 1,
              placeholder: "Insert a number 0-255",
              label: "Green",
              tabIndex: 2,
              value: 0,
              validation: [
                {
                  type: "NOT_A_NUMBER",
                  messageError: "Is not a number",
                },
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 0,
                    max: 255,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            blue: {
              component: "InputComponent",
              name: "blue",
              id: "blue",
              type: "number",
              min: 0,
              max: 255,
              step: 1,
              placeholder: "Insert a number 0-255",
              label: "Blue",
              tabIndex: 3,
              value: 0,
              validation: [
                {
                  type: "NOT_A_NUMBER",
                  messageError: "Is not a number",
                },
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 0,
                    max: 255,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
          },
          submit: {
            component: "InputComponent",
            name: "submit",
            type: "submit",
            value: "Convert Color",
            tabIndex: 4,
            action: {
              type: "convertColor",
              mutation: "convertColorRgb",
            },
            route: "",
          },
          validation: false,
          visible: false,
        },
        converterHex: {
          data: {
            hex: {
              component: "InputComponent",
              name: "hex",
              id: "hex",
              type: "text",
              placeholder: "Insert a color Hex",
              label: "Hex",
              tabIndex: 1,
              value: 0,
              validation: [
                {
                  type: "IS_HEX",
                  messageError: "Not HEX",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
          },
          submit: {
            component: "InputComponent",
            name: "submit",
            type: "submit",
            value: "Convert Color",
            tabIndex: 4,
            action: {
              type: "convertColor",
              mutation: "convertColorHex",
            },
            route: "",
          },
          validation: false,
          visible: false,
        },
      },
      complementary: {
        description:
          "This palette is a variation of <strong>Split Complementary Palette</strong>.<br>You can generate a range of colors that is in the specter of the complementary colors. <br> Choose the colors number and the steps between them.",
        form: {
          data: {
            numColor: {
              component: "InputComponent",
              name: "numColor",
              id: "numColor",
              type: "number",
              max: 140,
              min: 2,
              step: 2,
              placeholder: "Insert an even number",
              label: "Colors Number",
              tabIndex: 1,
              value: 2,
              validation: [
                {
                  type: "IS_EVEN",
                  messageError: "Is not even",
                },
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 1,
                    max: 140,
                  },
                  messageError: "Is not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            stepDegree: {
              component: "InputComponent",
              name: "stepDegree",
              id: "stepDegree",
              type: "number",
              min: 1,
              max: 140,
              step: 1,
              placeholder: "Insert an even number 1-140",
              label: "Steps",
              tabIndex: 2,
              value: 1,
              validation: [
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 1,
                    max: 140,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
          },
          submit: {
            component: "InputComponent",
            name: "submit",
            type: "submit",
            value: "Generate Palette",
            tabIndex: 3,
            action: {
              type: "generatePalette",
              mutation: "generatePalette",
            },
            route: "Colors",
          },
          validation: {
            getter: "checkComplementaryValue",
            error: "Number Color * Step Must be minor or equal 140",
          },
          messageError: "",
        },
        nameSchema: "complementar",
        colors: [],
      },
      randomDominant: {
        description:
          "Do you need a random colors palette, but do you want that these colors are harmonics? <br>Now you can generate a <strong>Random Dominant Palette</strong>! <br> Choose the number of colors you need and the color dominant percentage.",
        form: {
          data: {
            numColor: {
              component: "InputComponent",
              name: "numColor",
              id: "numColor",
              type: "number",
              min: 2,
              max: 360,
              step: 2,
              placeholder: "Insert an even number 2-360",
              label: "Colors Number",
              tabIndex: 1,
              value: 2,
              validation: [
                {
                  type: "IS_EVEN",
                  messageError: "Is not even",
                },
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 2,
                    max: 360,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            percDominant: {
              component: "InputComponent",
              name: "percDominant",
              id: "percDominant",
              type: "number",
              min: 1,
              max: 90,
              placeholder: "Insert an even number 1-90",
              label: "Dominant Percentage",
              tabIndex: 2,
              value: 1,
              validation: [
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 1,
                    max: 100,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
          },
          submit: {
            component: "InputComponent",
            name: "submit",
            type: "submit",
            value: "Generate Palette",
            tabIndex: 3,
            action: {
              type: "generatePalette",
              mutation: "generatePalette",
            },
            route: "Colors",
          },
          validation: false,
          messageError: "",
        },
        nameSchema: "randomDominant",
        colors: [],
      },
      monochrome: {
        description:
          "Starting from your color you can generate a Saturation or Brightness Monochrome palette. <br>Choose the colors number and the steps between them.",
        form: {
          data: {
            numColor: {
              component: "InputComponent",
              name: "numColor",
              id: "numColor",
              type: "number",
              max: 100,
              min: 2,
              step: 2,
              placeholder: "Insert an even number",
              label: "Colors Number",
              tabIndex: 1,
              value: 2,
              validation: [
                {
                  type: "IS_EVEN",
                  messageError: "Is not even",
                },
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 1,
                    max: 100,
                  },
                  messageError: "Is not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            stepDegree: {
              component: "InputComponent",
              name: "stepDegree",
              id: "stepDegree",
              type: "number",
              min: 1,
              max: 100,
              step: 1,
              placeholder: "Insert an even number 1-100",
              label: "Steps",
              tabIndex: 2,
              value: 1,
              validation: [
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 1,
                    max: 100,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            typeScheme: {
              component: "SelectComponent",
              name: "typeScheme",
              id: "typeScheme",
              label: "Type Scheme",
              tabIndex: 3,
              options: ["saturation", "brightness"],
              optionsValue: ["Saturation", "Brightness"],
              value: "saturation",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
          },
          submit: {
            component: "InputComponent",
            name: "submit",
            type: "submit",
            value: "Generate Palette",
            tabIndex: 3,
            action: {
              type: "generatePalette",
              mutation: "generatePalette",
            },
            route: "Colors",
          },
          validation: {
            getter: "checkMonoValue",
            error: "Number Color * Step Must be minor or equal 100",
          },
          messageError: "",
        },
        nameSchema: "mono",
        colors: [],
      },
      analogous: {
        description:
          "Starting from your color you can generate an Analogous palette.<br>Choose the colors number and the steps between them.",
        form: {
          data: {
            numColor: {
              component: "InputComponent",
              name: "numColor",
              id: "numColor",
              type: "number",
              max: 120,
              min: 2,
              step: 2,
              placeholder: "Insert an even number",
              label: "Colors Number",
              tabIndex: 1,
              value: 2,
              validation: [
                {
                  type: "IS_EVEN",
                  messageError: "Is not even",
                },
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 1,
                    max: 120,
                  },
                  messageError: "Is not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            stepDegree: {
              component: "InputComponent",
              name: "stepDegree",
              id: "stepDegree",
              type: "number",
              min: 1,
              max: 120,
              step: 1,
              placeholder: "Insert an even number 1-140",
              label: "Steps",
              tabIndex: 2,
              value: 1,
              validation: [
                {
                  type: "BETWEEN",
                  arguments: {
                    min: 1,
                    max: 120,
                  },
                  messageError: "Not in range",
                },
              ],
              error: false,
              messageError: "",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
            typeScheme: {
              component: "SelectComponent",
              name: "typeScheme",
              id: "typeScheme",
              label: "Type Scheme",
              tabIndex: 3,
              options: ["allArch", "cold", "warm"],
              optionsValue: ["All Arch", "Cold", "Warm"],
              value: "allArch",
              action: {
                type: "updateValue",
                mutation: "updateValue",
              },
            },
          },
          submit: {
            component: "InputComponent",
            name: "submit",
            type: "submit",
            value: "Generate Palette",
            tabIndex: 3,
            action: {
              type: "generatePalette",
              mutation: "generatePalette",
            },
            route: "Colors",
          },
          validation: {
            getter: "checkAnalogousValue",
            error: "Number Color * Step Must be minor or equal 60",
          },
          messageError: "",
        },
        nameSchema: "analogous",
        colors: [],
      },
      splitComplementary: {
        description: "This is the classic Split Complementary Palette.",
        submit: {
          component: "InputComponent",
          name: "submit",
          type: "submit",
          value: "Generate Palette",
          tabIndex: 1,
          action: {
            type: "generatePalette",
            mutation: "generatePalette",
          },
          route: "Colors",
        },
        nameSchema: "splitComplementar",
        colors: [],
      },
      triad: {
        description: "This is the classic Triadic Palette.",
        submit: {
          component: "InputComponent",
          name: "submit",
          type: "submit",
          value: "Generate Palette",
          tabIndex: 1,
          action: {
            type: "generatePalette",
            mutation: "generatePalette",
          },
          route: "Colors",
        },
        nameSchema: "triad",
        colors: [],
      },
      tetradic: {
        description: "This is the classic Tetradic Palette.",
        submit: {
          component: "InputComponent",
          name: "submit",
          type: "submit",
          value: "Generate Palette",
          tabIndex: 1,
          action: {
            type: "generatePalette",
            mutation: "generatePalette",
          },
          route: "Colors",
        },
        nameSchema: "tetradic",
        colors: [],
      },
      square: {
        description: "This is the classic Square Palette.",
        submit: {
          component: "InputComponent",
          name: "submit",
          type: "submit",
          value: "Generate Palette",
          tabIndex: 1,
          action: {
            type: "generatePalette",
            mutation: "generatePalette",
          },
          route: "Colors",
        },
        nameSchema: "square",
        colors: [],
      },
    },
    schemas: [
      {
        id: "complementary",
        name: "Complementary Range",
        colors: [
          { degree: "first" },
          { degree: "deg180" },
          { degree: "deg140" },
          { degree: "deg140m" },
          { degree: "deg160" },
          { degree: "deg160m" },
        ],
        form: true,
      },
      {
        id: "randomDominant",
        name: "Random Dominant",
        colors: [
          { degree: "first" },
          { degree: "deg45" },
          { degree: "deg90" },
          { degree: "deg135" },
          { degree: "deg180" },
          { degree: "deg135m" },
          { degree: "deg90m" },
          { degree: "deg45m" },
        ],
        form: true,
      },
      {
        id: "monochrome",
        name: "Monochrome",
        colors: [
          { degree: "first" },
          { degree: "deg25" },
          { degree: "deg45" },
          { degree: "deg65" },
          { degree: "deg85" },
        ],
        form: true,
      },
      {
        id: "analogous",
        name: "Analogous",
        colors: [
          { degree: "first" },
          { degree: "deg25" },
          { degree: "deg45" },
          { degree: "deg65" },
          { degree: "deg85" },
        ],
        form: true,
      },
      {
        id: "triad",
        name: "Triad",
        colors: [
          { degree: "first" },
          { degree: "deg120m" },
          { degree: "deg120" },
        ],
        form: false,
      },
      {
        id: "splitComplementary",
        name: "Split Complementary",
        colors: [
          { degree: "first" },
          { degree: "deg160" },
          { degree: "deg160m" },
        ],
        form: false,
      },
      {
        id: "tetradic",
        name: "Tetradic",
        colors: [
          { degree: "deg30m" },
          { degree: "deg150" },
          { degree: "deg30" },
          { degree: "deg150m" },
        ],
        form: false,
      },
      {
        id: "square",
        name: "Square",
        colors: [
          { degree: "deg45" },
          { degree: "deg45m" },
          { degree: "deg130" },
          { degree: "deg130m" },
        ],
        form: false,
      },
    ],
    submenu: [
      {
        nameLink: "Wheel",
        name: "Wheel",
        icon: require("../components/svg/wheel.vue").default,
      },
      {
        nameLink: "Colors",
        name: "Colors",
        icon: require("../components/svg/colors.vue").default,
      },
    ],
  },
  mutations: {
    updateValue(state, data) {
      state.pages[data.page][data.type].data[data.input][data.prop] =
        data.value;
    },
    updateBaseColor(state, data) {
      state.baseColor.degree = data.form.degree.value;
      state.baseColor.saturation = data.form.saturation.value;
      state.baseColor.brightness = data.form.brightness.value;
      storagePalette.setItem("baseColorDegree", data.form.degree.value);
      storagePalette.setItem("baseColorSaturation", data.form.saturation.value);
      storagePalette.setItem("baseColorBrightness", data.form.brightness.value);
    },
    generatePalette(state, data) {
      let color = new this.state.colorPalettesRange.Hsl({
        hue: this.state.baseColor.degree,
        saturation: this.state.baseColor.saturation,
        brightness: this.state.baseColor.brightness,
      });

      state.palettes = new this.state.colorPalettesRange.SetColorPalette(color);

      let values = {};
      for (const inputKey in data.form) {
        let input = data.form[inputKey];
        if (
          inputKey === "stepDegree" &&
          Object.prototype.hasOwnProperty.call(input, "value")
        ) {
          state.pages[data.page].stepDegree = input.value;
        }
        if (Object.prototype.hasOwnProperty.call(input, "value")) {
          values[inputKey] = input.value;
        }
      }

      state.pages[data.page].colors =
        state.palettes[state.pages[data.page].nameSchema](values);
    },
    convertColorRgb(state, data) {
      const rgb = new state.colorPalettesRange.RgbConvert({
        red: data.form.red.value,
        green: data.form.green.value,
        blue: data.form.blue.value,
      });

      const hue = parseInt(rgb.getHue());
      const saturation = parseInt(rgb.getSaturation());
      const brightness = parseInt(rgb.getBrightness());

      const commitData = {
        form: {
          degree: { value: hue },
          saturation: { value: saturation },
          brightness: { value: brightness },
        },
      };

      this.commit("updateBaseColor", commitData);

      this.commit("updateValue", {
        page: "home",
        type: "form",
        input: "degree",
        prop: "value",
        value: hue,
      });

      this.commit("updateValue", {
        page: "home",
        type: "form",
        input: "saturation",
        prop: "value",
        value: saturation,
      });

      this.commit("updateValue", {
        page: "home",
        type: "form",
        input: "brightness",
        prop: "value",
        value: brightness,
      });

      this.commit("updateVisibilityModal", {
        page: "home",
        type: "converterRgb",
        visibility: false,
      });
    },
    convertColorHex(state, data) {
      if (data.form.hex.value.length < 6) {
        data.form.hex.value += data.form.hex.value.slice(1);
      }
      const hex = new state.colorPalettesRange.HexConvert(data.form.hex.value);
      const hue = parseInt(hex.getHue());
      const saturation = parseInt(hex.getSaturation());
      const brightness = parseInt(hex.getBrightness());

      const commitData = {
        form: {
          degree: { value: hue },
          saturation: { value: saturation },
          brightness: { value: brightness },
        },
      };

      this.commit("updateBaseColor", commitData);

      this.commit("updateValue", {
        page: "home",
        type: "form",
        input: "degree",
        prop: "value",
        value: hue,
      });

      this.commit("updateValue", {
        page: "home",
        type: "form",
        input: "saturation",
        prop: "value",
        value: saturation,
      });

      this.commit("updateValue", {
        page: "home",
        type: "form",
        input: "brightness",
        prop: "value",
        value: brightness,
      });

      this.commit("updateVisibilityModal", {
        page: "home",
        type: "converterHex",
        visibility: false,
      });
    },

    updateVisibilityModal(state, data) {
      state.pages[data.page][data.type].visible = data.visible;
    },
  },
  actions: {
    updateValue({ commit }, payload) {
      commit(payload.mutation, payload.data);
    },
    updateBaseColor({ commit }, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit(payload.mutation, payload.data);
          resolve(this.state.baseColor);
        }, 1000);
      });
    },
    generatePalette({ commit }, payload) {
      commit(payload.mutation, payload.data);
    },
    convertColor({ commit }, payload) {
      commit(payload.mutation, payload.data);
    },
  },
  getters: {
    getBaseColorHSL(state) {
      return state.colorPalettesRange
        .Hsl({
          hue: state.baseColor.degree,
          saturation: state.baseColor.saturation,
          brightness: state.baseColor.brightness,
        })
        .printHsl();
    },
    checkComplementaryValue(state) {
      return (
        state.pages.complementary.form.data.numColor.value *
          state.pages.complementary.form.data.stepDegree.value <=
        140
      );
    },
    checkMonoValue(state) {
      return (
        state.pages.monochrome.form.data.numColor.value *
          state.pages.monochrome.form.data.stepDegree.value <=
        100
      );
    },
    checkAnalogousValue(state) {
      return (
        state.pages.analogous.form.data.numColor.value *
          state.pages.analogous.form.data.stepDegree.value <=
        60
      );
    },
  },
  modules: {},
});
