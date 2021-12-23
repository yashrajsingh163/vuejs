<template>
    
    <section class="my-3 ">
        <div class="d-flex p-3" ref="comment_ref">
          <input class="form-control" ref="cmt_box" type="text" placeholder="Write your comment..." v-model="this.comment"/>
          <button class="btn btn-primary" @click="send_comment()">Comment</button>
        </div>
    </section>
</template>



<script>    

import axios from 'axios';

export default{
  name:'Comment',
  props:['post_id'],

  computed: {},
 data(){
     return{
          user_id:this.$store.state.user.user_id,
          comment:''
  }
  
 },
   async created(){
        this.$refs.cmt_box.focus()
      },
  methods:{
      send_comment:function(){
          const formData = new FormData()
          formData.append('user_id', this.user_id);
          formData.append('post_id', this.post_id)
          formData.append('comment', this.comment)
         const config = {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        };
          axios.post(process.env.VUE_APP_MODE+'post_comment/',formData,config).then(()=>{
              // alert(response.data.status);  
              this.$parent.get_posts();   
               this.$toast.open({
                            message: 'Comment added successfully',
                            type: 'success',
                            position:'top-right'
                }); 
          })
      }
       
  }
}


</script>

