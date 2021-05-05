<template>
  <div id="record">
      <button id="record-button" v-on:click="audioRecording">press me</button>
      <div id="progress">
        <div id="bar"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Recorder",
  components: {},
  methods: {
      audioRecording() {
        this.$emit('audioStart');
        var progressBar = document.getElementById("bar");
        var progress = 1;
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

            var update = setInterval(() => {
              progress += 10;
              progressBar.style.width = (progress / 4000) * 100 + "%";
            }, 10)

            setTimeout(() => {
              mediaRecorder.stop();
              clearInterval(update);
            }, 4000);
        });
      }
  },
  props: {},
};
</script>

<style scoped>
#progress {
  margin: auto;
  width: 50%;
  position: center;
  background-color: grey;
}

#bar {
  width: 0%;
  height: 30px;
  background-color: red;
}
</style>