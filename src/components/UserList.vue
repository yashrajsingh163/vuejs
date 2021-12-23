<template >
<div v-if="!isLoggedIn" class=" text-center  mt-5 pt-5" >
    <h4 class="text-danger">Your session is expaired Login again</h4>
    <router-link v-if="!isLoggedIn" to="/login"><button class="btn btn-primary btn-lg mt-4">Login</button></router-link>
</div>
  <div v-else class="container my-5">
<table class="table table-bordered table-dark mt-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Mobile</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(user,index) in displayedPosts" :key="index">
      <th scope="row"> {{index+1}}</th>
      <td>   <img :src="'http://localhost/vuejsapis/uploads/'+user.vProfile_image" height="50"/></td>
      <td>   {{user.vfirst_name}} {xcbvc  {user.vLast_name}}</td>
      <td>   {{user.vMobile}}</td>
      <td>
          <button class="btn btn-danger" @click="delete_user(user.user_id)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
 <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
        </li>
        <li class="page-item">
          <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" v-bind:key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
        </li>
      </ul>
    </nav>  
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import axios from 'axios';


export default {
  name: 'UserList',
  data(){
     return{
      users :[{'vfirst_name':'m'}],
        page: 1,
        perPage: 10,
        pages: [],
        posts : ['']
     }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
     displayedPosts () {
      return this.paginate(this.posts);
    }
  },
  props: {
    msg: String
  },
   watch: {
    posts () {
      this.setPages();
    }
  },
   async created() {
      this.getuser();
  }
  ,
  methods: {
     delete_user:function(id){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

         const config = {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        };
          axios.delete(process.env.VUE_APP_MODE+'main/usersdelete?id='+id,config).then((response)=>{
     
         this.$swal.fire(
            'Deleted!',
            response.data.msg,
            'success'
          )
     })
        
        }
      })
       
    },
  emitSomething () {
    alert('caling')
  },
   getuser: async function(){
     const config = {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        };
     await axios.get(process.env.VUE_APP_MODE+'getuser',config).then((response)=>{
         this.posts= response.data;
     })
  },
    paginate (posts) {    
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  posts.slice(from, to);
    },
    setPages () {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    }
}
}
</script>

<style >


</style>
