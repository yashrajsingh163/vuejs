<template>
    <section class="my-3 ">
        <h5 class="d-flex"><b>Create New Post</b></h5>
        <div class="card">
             <textarea placeholder="Describe yourself here..." class="form-control" rows="3" v-model="post.description" ></textarea>
             <div class="p-3 my-1 d-flex">
             <input type="file" ref="file">
             </div>
             <button class="btn btn-success btn-lg" @click="submit_post()">Submit</button>
        </div>
    </section>
</template>



<script>

import axios from 'axios';

export default{
  name:'Createpost',
  computed: {},
 data(){
     return{
      post:{
          description:'',
          image:null
      }
  }
  
 },
  methods:{

      submit_post:function(){
          this.post.image = this.$refs.file.files[0];
          const formData = new FormData()
          if(this.post.image) formData.append('image', this.$refs.file.files[0]);
          formData.append('id', this.$store.state.user.user_id);
          formData.append('description', this.post.description)
         const config = {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        };
          axios.post(process.env.VUE_APP_MODE+'post_data',formData,config).then(()=>{ 
              this.post={}
              this.$refs.file.value=null;
              this.$parent.get_posts();   
               this.$toast.open({
                            message: 'Posted successfully',
                            type: 'success',
                            position:'top-right'
                });          
          })
      }
  }
}


</script>

