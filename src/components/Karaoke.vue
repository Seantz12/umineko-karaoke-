<template>
  <div>
    <img alt="Kinzo" src="../assets/kinzo.png" />
    <audio id="audio" src="../assets/kinzo.wav" controls/>
    <Recorder @audioDone="onResult"/>
    <div v-if="processing" class="loader"></div>
    <!--
        <VueRecordAudio @result="onResult" />
        <audio-recorder
        upload-url="some url"
        :attempts="3"
        :time="2"
        :before-recording="callback"
        :after-recording="callback"
        :before-upload="callback"
        :successful-upload="callback"
        :failed-upload="callback"/>
        -->
  </div>
</template>

<script>
import axios from 'axios';
import FormData from 'form-data';
import Recorder from './Recorder.vue';

export default {
  name: "Karaoke",
  components: {
    Recorder
  },
  data() {
    return {
      processing: false
    }
  },
  methods: {
    onResult(data) {
      this.processing = true;
      const path = "http://localhost:5000/compare";
      const form = new FormData();

      var aud = document.getElementById('audio');
      var xhr = new XMLHttpRequest();
      xhr.open('GET', aud.src);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        form.append('source', xhr.response);
        form.append('compare', data);
        axios.post(path, form).then(() => {
          this.processing = false;
          console.debug("did it");
        });
      }
      xhr.send();
      // form.append('source', data);
    },
  },
  props: {},
};
</script>

<style scoped>
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