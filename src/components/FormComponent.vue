<template>
  <div>
    <p class="error" v-if="!formOk">{{ formError }}</p>
    <form v-on:submit.prevent @submit="submit" class="form">
      <div v-for="(input, key) in formData" :key="key + input.name">
        <InputComponent
          v-if="input.component === 'InputComponent'"
          :key="key"
          v-bind="input"
          v-on:update:value="updateState(key, 'value', $event)"
          v-on:update:error="updateState(key, 'error', $event)"
          v-on:update:messageError="updateState(key, 'messageError', $event)"
        ></InputComponent>
        <SelectComponent
          v-if="input.component === 'SelectComponent'"
          v-bind="input"
          :key="key"
          v-on:change="updateState(key, 'value', $event)"
        >
        </SelectComponent>
      </div>
      <InputComponent
        v-bind="submitButton"
        :disabled.sync="disabled"
      ></InputComponent>
    </form>
  </div>
</template>

<script>
import InputComponent from "@/components/InputComponent";
import SelectComponent from "@/components/SelectComponent";

export default {
  name: "FormComponent",
  props: ["page", "type"],
  components: {
    InputComponent,
    SelectComponent,
  },
  data() {
    return {
      inputDisabled: false,
      formError: this.$store.state.pages[this.page][this.type].validation
        ? this.$store.state.pages[this.page][this.type].validation.error
        : "",
    };
  },
  computed: {
    formData() {
      return this.$store.state.pages[this.page][this.type].data;
    },
    submitButton() {
      return this.$store.state.pages[this.page][this.type].submit;
    },
    inputsOk() {
      for (const element in this.formData) {
        if (this.formData[element].error) {
          return false;
        }
      }
      return true;
    },
    formOk() {
      if (this.$store.state.pages[this.page][this.type].validation) {
        return this.$store.getters[
          this.$store.state.pages[this.page][this.type].validation.getter
        ];
      }
      return true;
    },
    disabled() {
      return !this.inputsOk || this.inputDisabled || !this.formOk;
    },
  },
  methods: {
    updateState(input, prop, value) {
      let { type, mutation } =
        this.$store.state.pages[this.page][this.type].data[input].action;

      this.$store.dispatch({
        type,
        mutation,
        data: {
          page: this.page,
          type: this.type,
          input,
          prop,
          value,
        },
      });
    },
    submit() {
      this.inputDisabled = true;

      let { type, mutation } = this.submitButton.action;
      this.$store
        .dispatch({
          type,
          mutation,
          data: { form: this.formData, page: this.page },
        })
        .then(() => {
          this.inputDisabled = false;
          if (this.submitButton.route) {
            this.$router.push({ name: this.submitButton.route });
          }
        });
    },
  },
};
</script>

<style scoped></style>
