<template>
  <div id="app">
    <h1> Can you call for Beatrice as well as Kinzo can? </h1>
    <Karaoke/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Karaoke from './components/Karaoke.vue'

export default {
  name: 'App',
  components: {
    Karaoke,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
