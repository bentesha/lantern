<template>
  <form>
    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-12">
            <input-text
            label="Title"
            placeholder="Book Title"
            v-model="book.title"
            :error="errors.title"
            ></input-text>
          </div>
          <div class="col-md-7">
            <drop-down v-model="book.publisher" :error="errors.publisher" label="Publisher" caption="name" :options="options.publishers"></drop-down>
          </div>
          <div class="col-md-5">
            <drop-down v-model="book.language" :error="errors.language" label="Language" :options="languages"></drop-down>
          </div>
          <div class="col-md-12">
            <drop-down v-model="book.authors" :error="errors.authors" multiple label="Authors" caption="name" :options="options.authors"></drop-down>
          </div>
          <div class="col-md-4">
            <input-text :error="errors.isbn" v-model="book.isbn" label="ISBN" placeholder="ISBN"></input-text>
          </div>
          <div class="col-md-4">
            <input-text v-model="book.pages" :error="errors.pages" label="Pages"></input-text>
          </div>
          <div class="col-md-4">
            <input-text v-model="book.price" :error="errors.price" label="Price"></input-text>
          </div>
          <div class="col-md-6">
            <drop-down v-model="book.subject" :error="errors.subject" label="Subject" :options="options.subjects"></drop-down>
          </div>
          <div class="col-md-6">
            <drop-down v-model="book.category" :error="errors.category" label="Category" :options="options.categories"></drop-down>
          </div>
          <div class="col-md-6">
            <drop-down v-model="book.level" :error="errors.level" label="Level" :options="options.levels"></drop-down>
          </div>
          <div class="col-md-6">
            <drop-down v-model="book.grade" :error="errors.grade" label="Grade" :options="options.grades"></drop-down>
          </div>
          <div class="col-md-12">
            <text-area v-model="book.description" :error="errors.description" label="Description"></text-area>
          </div>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <cover-image v-model="book.coverImage"></cover-image>
        <hr>
        <file-attachment v-model="book.attachment"></file-attachment>
      </div>
      <div class="col-md-12">
        <button @click.prevent="save(book)" class="btn btn-primary">Save Record</button>
        <button @click.prevent="cancel()" class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </form>
</template>


<script>
import InputText from "../InputText.vue";
import TextArea from "../TextArea.vue";
import DropDown from "../DropDown.vue";
import ActionButton from "../ActionButton.vue";
import CoverImage from "../CoverImage.vue";
import FileAttachment from "../FileAttachment.vue";

import axios from "axios";

const components = { InputText, TextArea, DropDown, ActionButton, CoverImage, FileAttachment };

export default {
  components,
  data() {
    const data = {
      options: {},
      errors: {},
      languages: ["English", "Swahili", "French"],
      file: null
    };
    return Object.assign(data, { book: formData });
  },
  created(){
    const url = "/books/form-options";
    axios.get(url).then(result => {
      this.options = result.data;
    })
    .catch(error => {
      console.error(error);
      this.options = {
        authors: [],
        publishers: [],
        grades: [],
        subjects: [],
        categories: [],
        levels: []
      }
    })
  },
  methods: {
    save(book){
      if(!book.attachment || !book.coverImage){
        const message = "Make sure you have uploaded eBook and cover image files";
        alert(message);
        return;
      }
      const url = "/books";
      this.errors = {}; //Clear errors
      this.loading = true;
      axios.post(url, book).then(result => {
        document.location = "/books";
      })
      .catch(error => {
        if(error.response.status === 400){
          //Validation error
          this.errors = error.response.data;
        }
      })
      .finally(() => {
        this.loading = false;
      })
    },

    cancel(){
      document.location = "/books";
    }
  }
};
</script>
