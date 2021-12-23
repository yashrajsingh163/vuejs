<template>
    
    <div class="container">
        <div class="row p-5 bg-dark text-white my-5">
            <div class="text-center col-sm-12 my-3">
                <h2>Free Registration</h2>    
            </div>
            <div class="col-sm-4 mt-2">  
                <h5 :v-if ="error.status" class="text-danger"> {{this.error.msg}}</h5>
               <form ref="signup_form">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                              <label for="exampleInputEmail1">First Name</label>
                              <input type="text" class="form-control" id="name" v-model="form.first_name">
                            </div>
                             <div class="col-sm-6">
                              <label for="exampleInputEmail1">Last Name</label>
                              <input type="text" class="form-control" id="last_name" v-model="form.last_name">
                            </div>
                        </div>
          
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Mobile Number</label>
                        <input type="text" class="form-control" id="mobile" v-model="form.mobile">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="password" v-model="form.password">
                    </div>
                      <div class="form-group">
                        <label for="">Profile Image</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" ref="file">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                    <div class="text-center">
                    <button type="button" class="btn btn-success my-3 btn-lg" v-on:click="submit">Sign Up</button>
                    </div>
                </form>
            </div>
            <div class="col-sm-8 mt-2">
                <img src="https://cdn.pixabay.com/photo/2017/06/12/03/33/seo-2394237_960_720.jpg" class="img-fluid"/>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
// import { Router } from 'vue-router';
 
export default {
    
  name: 'Register',
  data(){
        return{
            form: {
                last_name: '',
                first_name:'',
                mobile: '',
                password: '',
                refer: '',
                image: [],
            },
            error:{
                  msg:'',
                status : false
             }
    }
  },
  components: { 
  },
  methods:{
      submit : function(){
  

          if(this.form.first_name.length<1){
            this.error = {
                msg:'First name required',
                status : true
                };
           }
           else if(this.form.last_name.length<1){
            this.error = {
                msg:'Last name required',
                status : true
                };
           }
           else if(this.form.mobile.length<1){
           this.error = {
                msg:'Mobile number required',
                status : true
                };
           }
           else if(this.form.password<1){
               this.error = {
                msg:'Password required',
                status : true
                };
           }
           else{
             this.error = {
                msg:' ',
                status : false
                };
           }

           if(this.error.status===true){
              return false; 
           }else{
                const formData = new FormData()
                formData.append('image', this.$refs.file.files[0])
                formData.append('first_name', this.form.first_name)
                formData.append('last_name', this.form.last_name)
                formData.append('mobile', this.form.mobile)
                formData.append('password', this.form.password)
                axios.post(process.env.VUE_APP_MODE+'sign_up',formData,{}).then((response)=>{
                    if(response.data['status']==1){
                        this.form = {};
                        alert(response.data['msg'])
                        this.$router.push('login');
                    }else{
                        alert(response.data['msg']);
                    }
               })
                this.image = this.$refs.file.files[0];
           }
    }   
  }
}   
</script>