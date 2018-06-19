<template>
  <div>
    <div v-if="file">
      <p><i class="fa fa-file-o"></i> <small>{{file.format}} ({{fileSize}})</small></p>
      <button @click.prevent="removeFile" class="btn btn-secondary btn-sm">Remove file</button>
    </div>
    <div v-else>
      <form class="d-none" id="form-attachment">
        <input type="file" class="d-none" accept=".pdf" @change.prevent="onChange($event)">
      </form>
      <p v-if="uploading"><small>Uploading.. {{progress}}%</small></p>
      <button v-else @click.prevent="selectFile" class="btn btn-secondary"><i class="fa fa-file-o"></i> Attach File</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import filesize from "filesize";

const url = "http://167.99.32.73:4300/upload";

export default {
  props: {
    value: Object
  },
  data(){
    return {
      uploading: false,
      progress: 0
    };
  },
  computed: {
    file(){
      return this.value;
    },
    fileSize(){
      return this.file && this.file.size ? filesize(this.file.size) : "";
    }
  },
  methods: {
    selectFile(){
      const input = document.getElementById("form-attachment").firstElementChild;
      input.click(); //Open file dialog
    },
    onChange(event){
      const file = event.target.files[0];
      document.getElementById("form-attachment").reset(); //Reset form
      const data = new FormData();
      data.append("file", file);
      const config = {
        onUploadProgress: (event) => {
          const progress = Math.round(event.loaded * 100 / event.total);
          this.onProgress(progress);
        }
      };
      this.uploading = true;
      this.progress = 0;
      axios.post(url, data, config).then(result => {
        this.$emit('input', result.data);
      })
      .catch(error => {
        alert("There was an error while uploading the file. Please retry again shortly.");
        console.error(error);
        this.uploading = false;
      })
    },
    onProgress(progress){
      this.progress = progress;
      this.uploading = progress < 100;
    },
    removeFile(){
      const message = "Are you sure you want to remove this file?";
      if(confirm(message)){
        this.$emit("input", null);
      }
    }
  }
}
</script>
