<template>
  <!-- <HelloWorld msg="Crud operation in vue js "/> -->
  <Header/>
  <router-view></router-view>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }   
}   


</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@import'~bootstrap/dist/css/bootstrap.css';
</style>
