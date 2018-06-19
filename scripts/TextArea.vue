<template>
  <div class="form-group">
    <label>{{label}}</label>
    <textarea :value="value"
      class="form-control"
      :class="{'is-invalid': error }"
      :placeholder="!placeholder ? label : placeholder"
      rows="5"
      @input.stop="$emit('input', $event.target.value)">
    </textarea>
    <div class="invalid-feedback" v-if="error">
      {{error}}
    </div>
  </div>
</template>


<script>
export default {
  props: ["value", "error", "placeholder", "label" ]  
}
</script>
