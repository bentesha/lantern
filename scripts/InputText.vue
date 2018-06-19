<template>
  <div class="form-group">
    <label class="form-label">{{label}}</label>
    <input
      :value="value"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :placeholder="placeholder ? placeholder : label"
      @input.stop="$emit('input', $event.target.value)">
      <div class="invalid-feedback" v-if="error">
        {{error}}
      </div>
  </div>
</template>


<script>
export default {
  props: [ "value", "placeholder", "error", "label"],
  data(){
    return {
    }
  }
}
</script>
