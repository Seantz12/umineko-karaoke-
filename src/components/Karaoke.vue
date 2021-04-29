<template>
  <div>
    <img alt="Kinzo" src="../assets/kinzo.png" />
    <VueRecordAudio @result="onResult" />
    <!--
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

export default {
  name: "Karaoke",
  components: {},
  methods: {
    callback(data) {
      console.debug(data);
    },
    onResult(data) {
      const path = "http://localhost:5000/compare";
      const form = new FormData();
      form.append('source', data);
      form.append('compare', data);
      axios.post(path, form).then(() => {
          console.debug("did it");
      });
      console.debug(data);
    },
  },
  props: {},
};
</script>