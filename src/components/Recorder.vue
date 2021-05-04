<template>
  <div>
      <button id="record-button" v-on:click="audioRecording">press me</button>
  </div>
</template>

<script>
export default {
  name: "Recorder",
  components: {},
  methods: {
      audioRecording() {
        this.$emit('audioStart');
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(audioChunks);
              this.$emit('audioDone', audioBlob);
            });

            setTimeout(() => {
              mediaRecorder.stop();
            }, 4000);
        });
      }
  },
  props: {},
};
</script>