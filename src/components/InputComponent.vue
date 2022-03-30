<template>
  <div>
    <div v-if="type === 'number'" class="inline-block input-group">
      <input
        :tabindex="tabIndex"
        :type="type"
        :name="name"
        :id="name"
        :max="max"
        :min="min"
        :step="step"
        :placeholder="placeholder"
        :value="value"
        @input="[updateValue($event.target.value)]"
        :class="error ? 'error' : ''"
      />
      <label :for="name"
        >{{ label }}:
        <span class="error">{{ error ? messageError : "" }}</span></label
      >
    </div>
    <div v-if="type === 'text'" class="inline-block input-group">
      <input
        :tabindex="tabIndex"
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :value="value"
        @input="[updateValue($event.target.value)]"
        :class="error ? 'error' : ''"
      />
      <label :for="name"
        >{{ label }}:
        <span class="error">{{ error ? messageError : "" }}</span></label
      >
    </div>

    <div class="input-submit" v-if="type === 'submit'">
      <button :disabled="disabled" type="submit" @click="$emit('click-submit')">
        {{ value }}
      </button>
    </div>
  </div>
</template>

<script>
import { Utilities } from "@/Utilities";

export default {
  name: "InputComponent",
  mixins: [Utilities],
  props: {
    type: {
      type: String,
      required: true,
    },
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    step: {
      type: Number,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    messageError: {
      type: String,
    },
    tabIndex: {
      type: Number,
      default: 1,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    error: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Array,
    },
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    updateValue(value) {
      let error = this.validation.find((element) => {
        return !Utilities.methods[element.type]({
          value,
          ...element.arguments,
        });
      });

      this.$emit("update:error", !!error);
      this.$emit("update:messageError", error ? error.messageError : "");
      if (this.type === "number") {
        this.$emit("update:value", Number(value));
      } else if (this.type === "text") {
        this.$emit("update:value", value);
      }
    },
  },
};
</script>
