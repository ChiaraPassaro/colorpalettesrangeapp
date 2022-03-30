<template>
  <div class="inline-block input-group">
    <select
      :name="name"
      :id="id"
      @change="$emit('change', $event.target.value)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
        :selected="option === value"
      >
        {{ optionsValue[index] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    optionsValue: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: String,
    },
  },
};
</script>

<style></style>
