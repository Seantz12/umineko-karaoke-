<template>
  <div>
    <img alt="Kinzo" src="../assets/kinzo.png" />
    <audio id="audio" src="../assets/kinzo.wav" controls/>
    <Recorder @audioStart="startedRecording" @audioDone="onResult"/>
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
  methods: {
    startedRecording() {

    },
    onResult(data) {
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