<template >
<div v-if="!isLoggedIn" class=" text-center  mt-5 pt-5" >
    <h4 class="text-danger">Your session is expaired Login again</h4>
    <router-link to="/login"><button class="btn btn-primary btn-lg mt-4">Login</button></router-link>
</div>
  <div v-else class="hello w-100  d-flex  text-center justify-content-center" ref="maindiv">
<div class="container-fluid ">
<div class="row">
  <div class="col-md-3">
    <section class="my-3 ">
        <h5 class="d-flex "><b>Search friend</b></h5>
             <input type="search" class="form-control" v-model="this.username" v-on:keyup="searchuser()" placeholder="Search...."/>
             <div class="card my-2" v-for="i in user" v-bind:key="i">
               <div v-if="i.user_id==this.$store.state.user.user_id">
                 </div>
               <div v-else class="card-item d-flex p-2">
                  <router-link  :to="'/profile-detail?id='+i.user_id" class="home-text">
                        <img :src="'http://localhost/vuejsapis/uploads/'+i.vProfile_image" height="80" width="80" style="border-radius:75%"/>
                  </router-link>
                  <h6 class="ml-2 mt-2 w-50 text-left">{{i.vfirst_name}} {{i.vLast_name}}  <br><span class="d-flex mt-2">{{i.vCity}}</span></h6>
                  <div class="">
                  <button v-if="i.status=='Pending'" class="btn btn-success btn-sm float-right mt-3"  @click="sendrequest(i.user_id)" disabled>Requested</button>
                  <button v-else-if="i.status=='Accepted'" class="btn btn-success btn-sm float-right mt-3"  @click="sendrequest(i.user_id)" disabled>Friend</button>
                  <button v-else class="btn btn-success btn-sm float-right "  @click="sendrequest(i.user_id)">Send Request</button>
                  </div>
               </div>
            </div>
    </section>
  </div>
  <div class="col-md-6">
   <Createpost/>
  <div class="card my-5" v-for="i in post" v-bind:key="i">
    <div class="d-flex my-2 mx-2 ">
          <router-link  :to="'/profile-detail?id='+i.user_id" class="home-text">
            <img :src="'http://localhost/vuejsapis/uploads/'+i.vProfile_image" height="80" width="80" style="border-radius:50%"/>
          </router-link>
         <h5 class="ml-3 mt-2 w-100"><b class="d-table">{{i.vfirst_name}} {{i.vLast_name}}</b>
         <span class="mt-2 ml-0 d-table" style="font-size:15px">12-02-2021</span>
        </h5>
        <div class="p-2">

      <div class="dropdown">
            <div class="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
            </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" @click="showModal">Embeded</a>
            <a class="dropdown-item" href="#">Save Post</a>
            <a class="dropdown-item" href="#">Hide Post</a>
          </div>
      </div>
        </div>
    </div>
        <div class="card-body">
      <p class="card-text d-flex">{{i.description}}</p>
    </div>  
    <router-link  :to="'/post-detail?id='+i.post_id" class="home-text">
    <img :src="'http://localhost/vuejsapis/userposts/'+i.images" class="card-img-top" alt="...">
    </router-link>

        <div class="d-flex mx-3 my-3">
          <div>
          <span>{{i.lik}}</span> 
          <a v-if="i.is_like == 1" @click="like(i.post_id)" class="mx-2"> <i class="fas fa-thumbs-down"></i> Unlike </a>
          <a v-else class="mx-2" @click="like(i.post_id)"> <i class="fas fa-thumbs-up"></i> Like</a>
          </div>
          <div class="ml-3">
            <span>{{i.cmt}}</span>
          <a @click="this.Is_comment = !this.Is_comment" rel="comm" class="mx-2"><i class="fas fa-comment mx-1"></i>Comment</a>
          </div>
          <a href="" class="mx-2"> <i class="fas fa-share-alt mx-1"></i> Share</a>
        </div>
          

        <div v-if="i.comments">
          <div v-for="cmt in i.comments" v-bind:key="cmt">
             <div class="card  m-3 bg-secondary">
                   <div class="card-item d-flex p-3">
                     <router-link  :to="'/profile-detail?id='+cmt.user_id" class="home-text">
                        <img :src="'http://localhost/vuejsapis/uploads/'+cmt.vProfile_image" height="50" width="50" style="border-radius:75%"/>
                     </router-link>
                  <h6 class="ml-2 mt-2 w-50 text-left">{{cmt.name}}  <br>
                  <span class="d-flex mt-2"><b><i>{{cmt.comment}}</i></b></span></h6>
                     </div>
                     <div class="d-flex mx-3 my-3">
          <div>
          <span></span> 
          <a v-if="i.is_like == 11" @click="like(i.post_id)" class="mx-2"> <i class="fas fa-thumbs-down"></i> Unlike </a>
          <a v-else class="mx-2"> <i class="fas fa-thumbs-up"></i> Like</a>
          </div>
          <div class="ml-3">
            <!-- <span>{{i.cmt}}</span> -->
          <a  rel="comm" class="mx-2"><i class="fas fa-comment mx-1"></i>Comment</a>
          </div>
        </div>
          </div>
          </div>
          
        </div>
        <div v-if="this.Is_comment" >
             <Comment :post_id="i.post_id"/>
        </div>
    </div>
  </div>
  <div class="col-md-3">
 <section class="my-3 ">
        <h5 class="d-flex"><b>friend list</b></h5>
             <input type="search" class="form-control" v-model="this.username_friend" v-on:keyup="searchfriend()" placeholder="Search...."/>
             <div class="card my-2" v-for="i in friends" v-bind:key="i">
               <div class="card-item d-flex p-2">
                    <router-link  :to="'/profile-detail?id='+i.user_id" class="home-text">
                        <img :src="'http://localhost/vuejsapis/uploads/'+i.vProfile_image" height="80" width="80" style="border-radius:50%"/>
                  </router-link>
                  <h6 class="ml-2 mt-2 w-50 text-left ">{{i.vfirst_name}} {{i.vLast_name}}    <i  v-if="i.active_now == 1" class="fas fa-circle ml-2" style="height:10px; width:10px;color:green"></i>
                  <span v-else>
                    <span v-if="i.dtlast_login>0" class="ml-2" style="font-size:9px">active {{i.dtlast_login}} sec</span></span>
                    <br>
                    <router-link class="nav-link d-flex" :to="'/chat?id='+i.user_id+'&sid='+this.user_id">Chat
                    
                                <div v-if="i.msg_count>0">
                      <span class="bg-danger mx-3 p-1 text-white">{{i.msg_count}}</span>
                    </div>
                    </router-link>
        
                  </h6>
                  <div class="">
                  </div>
               </div>
            </div>
    </section>
  </div>

</div>
</div>
  </div>
  <div v-if="displayModal">
   <embeded/>
  </div>
</template>

<script>
import axios from 'axios';

import { mapGetters } from "vuex";
import Createpost from './CreatePost.vue';
import Comment from './Comment.vue';
import embeded from './EmbedModel.vue'

export default {
  
  name: 'HelloWorld',
  data(){
     return{
       limit:2,
      post :[],
      user :[],
      user_id : this.$store.state.user.user_id ,
      friends:[],
      displayModal:false,
      username:'',
      username_friend:'',
      Is_comment : false,
      config : {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        }
     }
  },
  components:{
      Createpost,
      Comment,
      embeded
  },
  async created() {
     this.get_posts();
      this.getuser();
      window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
if (scrollTop + clientHeight >= scrollHeight - 5){
  this.limit = this.limit + 1
      this.get_posts();
}
}, {
    passive: true
});
  }
  ,
  computed: {
    ...mapGetters(["isLoggedIn"])
  },

  props: {
    msg: String
  },
  methods: {
    searchuser(){
      if(this.username.trim() .length<=0){
        this.getuser()    
      }else{

        axios.get(process.env.VUE_APP_MODE+'search_user/'+this.username.trim()+"/"+this.user_id,this.config).then((response)=>{
          try{
            this.user = response.data;
          }
          catch(e){
            console.log(e);
          }
    });

      }
       

    },
    searchfriend(){
      if(this.username_friend.length<=0){
        this.getuser()    
      }
        axios.get(process.env.VUE_APP_MODE+'get_friend_list/'+this.user_id+"/"+this.username_friend ,this.config).then((response)=>{
         if(response.data.status==0){console.log("no post")}
        else{ this.friends= response.data;}
     })
    },
  get_posts:function(){
    axios.get(process.env.VUE_APP_MODE+'get_all_post/'+this.user_id+"/0/"+this.limit,this.config).then((response)=>{
      if(response.data.status==0){console.log("no post")}
      else{this.post = response.data;}
    });
  },
   getuser: async function(){
     const config = {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        };
     await axios.get(process.env.VUE_APP_MODE+'getuser/'+this.user_id+"/0",config).then((response)=>{
         this.user= response.data;
     })
      await axios.get(process.env.VUE_APP_MODE+'get_friend_list/'+this.user_id+"/0" ,config).then((response)=>{
         this.friends= response.data;
     })
  },
  like:function(pid){
   let userid = this.$store.state.user.user_id;
   const formData = new FormData()
   formData.append('user_id', userid)
   formData.append('post_id', pid)
   axios.post(process.env.VUE_APP_MODE+'post_like',formData,this.config).then(()=>{
      this.get_posts();
    });
  }, 
  sendrequest:function(uid){
   let rid = this.$store.state.user.user_id;
   const formData = new FormData()
   formData.append('user_id', uid)
   formData.append('request_id', rid)
   axios.post(process.env.VUE_APP_MODE+'send_request',formData,this.config).then(()=>{
      this.$toast.open({
        message: 'Request sent successfully',
        type: 'success',
        position:'top-right'
        }); 
      this.getuser();
    });
  },
  send_comment:function(){
    

  },
   showModal() {
        this.displayModal = true;
  },
  hideModal() {
        this.displayModal = false;
   }
}
}
</script>

<style >
body{
  background: #f0f2f5 !important;
}
.home-text{
  text-decoration: none;
}
.bg-secondary{
  background: #f0f2f5 !important;
}
h6,h5{
  text-transform:capitalize;
}
b{
  text-transform:capitalize;  
}
.card{
  box-shadow: 3px 3px 3px 3px #d5cdcd;
}
</style>
