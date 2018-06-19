<template>
  <button class="btn" :class="buttonClass">{{label}}</button>
</template>


<script>
export default {
  props: {
    primary: Boolean,
    success: Boolean,
    secondary: Boolean,
    danger: Boolean,
    warning: Boolean,
    info: Boolean,
    label: String
  },
  computed: {
    buttonClass() {
      if (this.primary) {
        return "btn-primary";
      } else if (this.secondary) {
        return "btn-secondary";
      } else if (this.danger) {
        return "btn-danger";
      } else if (this.info) {
        return "btn-info";
      } else if (this.warning) {
        return "btn-warning";
      } else if(this.success){
        return "btn-success";
      } else {
        return "btn-primary";
      }
    }
  }
};
</script>
