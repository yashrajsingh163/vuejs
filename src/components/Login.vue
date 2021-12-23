<template>
    
    <div class="container">
        <div class="row p-5 bg-dark text-white my-5">
            <div class="text-center col-sm-12 my-3">
                <h2>Sign In</h2>    
            </div>
            <div class="col-sm-4 mt-2">  
                <h5 :v-if ="error.status" class="text-danger"> {{this.error.msg}}</h5>
               <form ref="signup_form">
              
                    <div class="form-group">
                        <label for="exampleInputEmail1">Mobile Number</label>
                        <input type="text" class="form-control" id="mobile" v-model="form.mobile">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="password" v-model="form.password">
                    </div>
                    <div class="text-center">
                    <button type="button" class="btn btn-success my-5 btn-lg btn-block" v-on:click="submit">Sign In</button>
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
import {mapMutations} from 'vuex';
import 'vue-toast-notification/dist/theme-sugar.css';
// import { Router } from 'vue-router';
 
export default {
    
  name: 'Login',
  data(){
        return{
            form: {
                mobile: '',
                password: '',
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
        ...mapMutations(["setUser", "setToken"]),
     submit : async function(){
  
        if(this.form.mobile.length<1){
           this.error = {
                msg:'Mobile number required',
                status : true
                };
           }
           else if(this.form.password.length<1){
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
               var ip = await axios.get('https://api.ipify.org/?format=json').then((respon)=>{
                   return  respon.data.ip;
               })
               
                const formData2 = new FormData()
                formData2.append('mobile', this.form.mobile)
                formData2.append('password', this.form.password)
                formData2.append('ip', ip)
                axios.post(process.env.VUE_APP_MODE+'login',formData2,{}).then((response)=>{
                        if(response.data.status===0){
                        this.form = {};
                         this.$toast.open({
                            message: 'Invalid username and password',
                            type: 'error',
                            position:'top-right'
                        }); 
                    }
                    
                    else{
                        localStorage.setItem('user_data', JSON.stringify(response.data));
                        this.setUser(response.data.user_details);
                        this.setToken(response.data.token);
                        this.$toast.open({
                            message: 'Login successful',
                            type: 'success',
                            position:'top-right'
                        }); 
                        this.$router.push('hello');
                    }

               })
           }
    } ,

    
    
  }
}   
</script>