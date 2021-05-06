<template>
  <div class="container">
    <img alt="Kinzo" src="../assets/kinzo.png" />
    <audio id="audio" src="../assets/kinzo.wav" controls/>
    <div v-if="!results" class="recorder">
      <Recorder @audioDone="onResult" :length="this.audioLength" />
    </div>
    <div v-else> 
       Your score was: {{score}}%
       <button @click="results = false"> reset </button>
    </div>
    <div v-if="processing" class="loader"></div>
  </div>
</template>

<script>
import axios from 'axios';
import getBlobDuration from 'get-blob-duration';
import FormData from 'form-data';
import Recorder from './Recorder.vue';

export default {
  name: "Karaoke",
  components: {
    Recorder
  },
  data() {
    return {
      processing: false,
      results: false,
      score: 0,
      audioData: null,
      audioLength: 0
    }
  },
  mounted() {
      var aud = document.getElementById('audio');
      var xhr = new XMLHttpRequest();
      xhr.open('GET', aud.src);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        this.audioData = xhr.response;
        getBlobDuration(xhr.response).then((length) => {
          this.audioLength = Math.round(length * 1000); // convert to ms
          console.debug(length);
        });
      }
      xhr.send();
  },
  methods: {
    onResult(data) {
      this.processing = true;
      //const path = "https://karaoke-scorer.herokuapp.com/compare";
      const path = "http://localhost:5000/compare";
      const form = new FormData();
      form.append('source', this.audioData);
      form.append('compare', data);
      form.append('threshold', 10);
      axios.post(path, form).then((response) => {
        this.processing = false;
        this.results = true;
        this.score = response.data.score;
        console.debug(response);
      });
    },
  },
  props: {},
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recorder {
  width: 100%;
}

/* styling taken from w3schools loader page */
.loader {
  margin: auto;
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>