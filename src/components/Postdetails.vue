<template>
    <section class="">
       <div class="container-fluid bg-white p-3 position-fixed">
           <div class="row h-100">
               <div class="col-sm-8">
                      <img :src="'http://localhost/vuejsapis/userposts/'+post_data.images" class="w-75" alt="...">
               </div>
               <div class="col-sm-4 " style="overflow-x:scroll;height:700px" v-if="post_data.comments">
             <div v-for="cmt in post_data.comments" v-bind:key="cmt">
             <div class="card  m-3 bg-secondary">
                   <div class="card-item d-flex p-3">
                     <router-link  :to="'/profile-detail?id='+cmt.user_id" class="home-text">
                        <img :src="'http://localhost/vuejsapis/uploads/'+cmt.vProfile_image" height="50" width="50" style="border-radius:75%"/>
                     </router-link>  
                  <h6 class="ml-2 mt-2 w-50 text-left">{{cmt.name}}  <br>
                  <span class="d-flex mt-2"><b><i>{{cmt.comment}}</i></b></span></h6>
                     </div>
          </div>
          </div>
               </div> 
           </div>
       </div>
    </section>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Profiledetail',
  data(){
    return {
     user_id : this.$store.state.user.user_id,
     post_data:[],
       config : {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        }
    }
  },
   async created() {
    this.get_user();
  },
  methods:{
    get_user:async function(){
          await axios.get(process.env.VUE_APP_MODE+'get_all_post/'+this.user_id+"/"+this.$route.query.id+"/0",this.config).then((response)=>{
            this.post_data= response.data[0];
            console.log(this.post_data)
        })
    }
  }
}
</script>