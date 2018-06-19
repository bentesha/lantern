<template>
  <div class="form-group">
    <label class="form-label">{{label}}</label>
    <v-select
      taggable
      v-bind="$attrs"
      :value="value"
      :label="caption"
      :class="{ 'is-invalid': error }"
      @input="$emit('input', $event)"
      :placeholder="placeholder ? placeholder : label">
    </v-select>
    <small v-if="error" class="text-danger d-inline-block mt-1">{{error}}</small>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
 components: { vSelect },
 props: {
    label: String,
    caption: String,
    error: String,
    value: [String, Number, Object, Array ]
  }
}
</script>

<style>
  .dropdown.v-select {
    width: 100%;
  }
  .dropdown.is-invalid .dropdown-toggle {
    border-color: #cd201f;
  }
</style>
