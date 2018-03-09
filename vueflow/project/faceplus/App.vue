<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import xl from '../../lib/js/debug'
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
