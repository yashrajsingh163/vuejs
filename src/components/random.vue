<template >
<div v-if="!isLoggedIn" class=" text-center  mt-5 pt-5" >
    <h4 class="text-danger">Your session is expaired Login again</h4>
    <router-link v-if="!isLoggedIn" to="/login"><button class="btn btn-primary btn-lg mt-4">Login</button></router-link>
</div>
  <div v-else class="hello w-100  d-flex  text-center justify-content-center">
<div class="card mt-4 shadow-lg" style="width: 25rem;">
    <img v-bind:src="this.users.picture.large">
  <div class="card-body">
    <h4 class="card-title">{{this.users.name.title}} {{this.users.name.first}} {{this.users.name.last}}</h4>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"> {{this.users.location.city}}</li>
    <li class="list-group-item">{{this.users.email}}</li>
    <li class="list-group-item">{{this.users.phone}}</li>
  </ul>
  <div class="card-body">
    <a :href="'tel:'+`${this.users.phone}`" class="card-link btn btn-success" >Call</a>
    <a :href="'mailto:'+`${this.users.email}`" class="card-link btn btn-success">Email</a>
  </div>
</div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: 'HelloWorld',
  data(){
     return{
      users :[],
     }
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  props: {
    msg: String 
  },
   async created() {
     const res = await fetch('https://randomuser.me/api/')
     const result = await res.json()
     this.users = result.results[0];
  }
  ,
  methods: {
  emitSomething () {
    alert('caling')
  }
}
}
</script>

<style >
body{
  background: rgb(246, 229, 229) !important;
}

</style>
