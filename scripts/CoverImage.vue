<template>
  <div>
    <div class="jumbotron" v-if="!file">
      <form id="cover-image" class="d-none">
        <input class="d-none" type="file" accept="image/*" @change.prevent="onChange($event)">
      </form>
      <span v-if="uploading">Uploading file..{{progress}}%</span>
      <button v-else @click.prevent="selectFile" class="btn btn-link">Select cover image</button>
    </div>
    <div v-if="file">
      <img class="img-thumbnail img-responsive" :src="file.url">
      <button class="btn btn-secondary btn-sm mt-2" @click.prevent="removeFile">Remove cover image</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";

const uploadUrl = "http://167.99.32.73:4300/upload";

export default {
  props: {
    value: Object
  },
  data() {
    return {
      uploading: false,
      progress: 0
    };
  },
  computed: {
    file() {
      return this.value;
    }
  },
  methods: {
    selectFile() {
      const input = document.getElementById("cover-image").firstElementChild;
      input.click();
    },
    onChange(event) {
      const file = event.target.files[0];
      //Reset form
      document.getElementById("cover-image").reset();
      this.uploading = true;
      this.progress = 0;
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        onUploadProgress: event => {
          this.onProgress(Math.round(event.loaded * 100 / event.total));
          console.log(event);
        }
      };
      axios
        .post(uploadUrl, formData, config)
        .then(result => {
          this.$emit('input', result.data);
        })
        .catch(error => {
          alert("There was an error while uploading image. Please retry again later.");
          this.uploading = false;
          console.error(error);
        });
    },
    onProgress(progress) {
      this.progress = progress;
      this.uploading = progress < 100;
    },
    removeFile(){
      const message = "Are you sure you want to remove this image?";
      if(confirm(message)){
        this.$emit('input', null);
      }
    }
  }
};
</script>
