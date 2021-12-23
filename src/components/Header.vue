<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark-blue sticky-top">
  <!-- <a class=" " href="#" > -->
  <router-link class="nav-link" to="/hello" style="letter-spacing:4.5px">
  <div class="d-flex my-2 mx-2 text-white" v-if="this.$store.state.user">
            <img class="" :src="'http://localhost/vuejsapis/uploads/'+this.$store.state.user.vProfile_image" height="50" width="50" style="border-radius:50%">
            <h5 class="ml-3 mt-2"><b>{{this.$store.state.user.vfirst_name}} {{this.$store.state.user.vLast_name}}</b><br/>
            </h5>
        </div>
    <div v-else>
        <span class="navbar-brand font-weight-bold" style="letter-spacing:4.5px">POUTBOOK</span>
    </div>
          </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto font-weight-bold">
      <li class="nav-item" active-class="active" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/register">Register</router-link> 
      </li>
      <li class="nav-item" v-if="isLoggedIn">
          <router-link   class="nav-link" to="/hello">Home</router-link>
      </li>
       <!-- <li class="nav-item" v-if="isLoggedIn">
          <router-link   class="nav-link" to="/userlist">User List</router-link>
      </li> -->
      <li class="nav-item" v-if="isLoggedIn">
          <router-link   class="nav-link" to="/request-list">Request List <span class="badge badge-danger p-2 mx-1" v-if="count>0">{{count}}</span></router-link>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
          <router-link  class="nav-link" to="/notification">Notification <span class="badge badge-danger p-2 mx-1" v-if="notification>0">{{notification}}</span></router-link>
      </li>
       <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/login">Login</router-link>
      </li>    
           <li class="nav-item" v-if="isLoggedIn">
        <button class="btn btn-danger" @click="logout()">Logout</button>
      </li> 
    </ul>

  </div>
</nav>
</template>


<script>
import { mapGetters,mapMutations } from "vuex";
import axios from 'axios';
export default{
  name:'Header',
  computed: {
    ...mapGetters(["isLoggedIn"])
  },

    data(){
     return{
      user_id : this.$store.state.user != null  ? this.$store.state.user.user_id:0 ,
      config : {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        },
        count:0,
        notification:0
     }
  },
  async created() {
    if(this.user_id>0){

      setInterval(() => {
      this.getrequest();
      this.getnotification();
    }, 2000);

    } 
  },
  methods:{
       ...mapMutations(["delToken"]),
       logout:function(){
        axios.get(process.env.VUE_APP_MODE+'logout/'+this.user_id,this.config).then(()=>{
        })
           this.delToken();
           this.$router.push('login');

       },
       search:function(){
         alert("ji")
       },
       getrequest: async function(){
       await axios.get(process.env.VUE_APP_MODE+'check_request/'+this.user_id,this.config).then((response)=>{
         this.count= response.data.req;
     })
  },
   getnotification: async function(){
        // setInterval(async () => {
        await axios.get(process.env.VUE_APP_MODE+'notification/'+this.user_id+"/1" ,this.config).then((response)=>{
        if(response.data.msg=='no data'){ response }
        else{
         this.notification = response.data.length;
        }
     })
  // }, 2000); 
},


  }
}


</script>

<style>
.router-link-exact-active{
  color: #ffffff !important;
  font-size:18px
}
.bg-dark-blue{
  background-color: #3b5999 !important;
}


@media (min-width: 520px){
.navbar-expand-lg .navbar-nav .nav-link{
    padding-right: 1rem !important;
    padding-left: 1rem !important;
}
}












</style>