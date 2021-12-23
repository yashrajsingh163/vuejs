<template>
 <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img :src="'http://localhost/vuejsapis/uploads/'+this.user_data.vProfile_image" alt=""/>
                            <div class="file btn btn-lg btn-primary" v-if="this.user_data.user_id == this.user_id">
                                Change Photo
                                <input type="file" name="file" ref="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        {{this.user_data.vfirst_name}}  {{this.user_data.vLast_name}}
                                    </h5>
                                    <h6>
                                            {{this.user_data.vCity}}  {{this.user_data.vCountry}}
                                    </h6>
                                    <p class="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2" v-if="this.user_data.user_id == this.user_id">
                        <input type="button" @click="update_data()" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p>WORK LINK</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">WordPress</a><br/>
                            <a href="">WooCommerce</a><br/>
                            <a href="">PHP, .Net</a><br/>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{this.user_data.vfirst_name}}_001</p>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            
                                            <div class="col-md-6" v-if="this.user_data.user_id == this.user_id">
                                               <input type="email"  class="form-control"  v-model="form.email"/>
                                            </div>
                                            <div class="col-md-6" v-else>
                                                <p>{{this.user_data.vEmail}}</p>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{this.user_data.vMobile}}</p>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                             <div class="col-md-6" v-if="this.user_data.user_id == this.user_id">
                                               <input type="text"  class="form-control" v-model="form.profession"/>
                                            </div>
                                            <div class="col-md-6" v-else>
                                                <p>{{this.user_data.vProfission}}</p>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-md-6">
                                                <label>City</label>
                                            </div>
                                             <div class="col-md-6" v-if="this.user_data.user_id == this.user_id">
                                               <input type="text"   class="form-control" list="city" v-model="form.city"/>
                                                <datalist id="city">
                                                <option value="mumbai"/>
                                                <option value="new-york"/>
                                                <option value="shanshai"/>
                                                <option value="banglore"/>
                                                <option value="indore"/>
                                              </datalist>
                                            </div>
                                            <div class="col-md-6" v-else>
                                                <p>{{this.user_data.vCity}}</p>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-md-6">
                                                <label>Country</label>
                                            </div>
                                             <div class="col-md-6" v-if="this.user_data.user_id == this.user_id">
                                               <input type="text"   class="form-control" list="country" v-model="form.country" />
                                               <datalist id="country">
                                                <option value="India"/>
                                                <option value="USA"/>
                                                <option value="China"/>
                                                <option value="Uk"/>
                                                <option value="Russia"/>
                                              </datalist>
                                            </div>
                                            <div class="col-md-6" v-else>
                                                <p>{{this.user_data.vCountry}}</p>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-md-6">
                                                <label>Join Date</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{this.user_data.dtCreated_date}}</p>
                                            </div>
                                        </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
</template>
<script>
import axios from 'axios';
import {mapMutations} from 'vuex';


export default {
  name: 'Profiledetail',
  data(){
    return {
     user_id : this.$store.state.user.user_id,
     user_data : [],
     form :{
          email:'',
          profession:'',
          city:'',
          country:'',
          image:''
     },
      config : {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        }
    }
  },
  async created() {
    this.get_user();
  },
  props: {
    msg: String
  },
  methods:{
            ...mapMutations(["setUser"]),
    get_user:async function(){
          await axios.get(process.env.VUE_APP_MODE+'getuser/0/'+this.$route.query.id,this.config).then((response)=>{
            this.user_data= response.data;
            this.form.email = response.data.vEmail;
            this.form.city = response.data.vCity
            this.form.country = response.data.vCountry
            this.form.profession = response.data.vProfession

        })
    },
    update_data:function(){

           const formData = new FormData()
           if(this.$refs.file.files[0]){
                formData.append('image', this.$refs.file.files[0])
           }
                formData.append('city', this.form.city)
                formData.append('country', this.form.country)
                formData.append('email', this.form.email)
                formData.append('profession', this.form.profession)
                formData.append('id', this.user_id)
                axios.post(process.env.VUE_APP_MODE+'update_profile',formData,this.config).then((response)=>{
                    if(response.data['status']==1){
                        this.setUser(response.data.data);
                        this.$toast.open({
                            message: 'Update successfully',
                            type: 'success',
                            position:'top-right'
                        }); 
                        this.form = {};
                        this.$router.push('hello');

                    }else{
                        alert(response.data['msg']);
                    }
               })
                this.image = this.$refs.file.files[0];

    }

  }
  
}
</script>

<style>
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}
.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>