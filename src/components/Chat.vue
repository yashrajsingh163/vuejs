<template>
	<div class="container-fluid h-100">
			<div class="row justify-content-center h-100 my-5">
				<div class="col-md-8 col-xl-6 chat">
					<div class="card1" ref="cardref" id="container">
						<div class="card1-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img :src="'http://localhost/vuejsapis/uploads/'+this.user_data.vProfile_image" alt="" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>Chat with {{this.user_data.vfirst_name}} {{this.user_data.vLast_name}}</span>
									<p>1767 Messages</p>
								</div>
								<div class="video_cam">
									<span><i class="fas fa-video"></i></span>
									<span><i class="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
							<div class="action_menu">
								<ul>
									<li><i class="fas fa-user-circle"></i> View profile</li>
									<li><i class="fas fa-users"></i> Add to close friends</li>
									<li><i class="fas fa-plus"></i> Add to group</li>
									<li><i class="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="card1-body msg_card_body" v-for="i in message" v-bind:key="i">

                           <div :class=" i.iSenderID===this.form.sender_id ? 'd-flex justify-content-end  my-3' : 'd-flex justify-content-start  my-3' ">
                                   <!-- {{i}} -->
								<div class="img_cont_msg">
									<img :src="'http://localhost/vuejsapis/uploads/'+i.sender_details.vProfile_image" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_cotainer ">
									{{i.tMessage}}
									<span :class=" i.iSenderID===this.form.sender_id ? 'msg_time_send' : 'msg_time' " >{{i.date}}</span>
								</div>
							</div>
						</div>
                <form >
						<div class="card1-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea v-model="this.form.msg" name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
								<div class="input-group-append">
									<button type="button" @click="send_chat(this.user_data.user_id)" class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></button>
								</div>
							</div>
						</div>
                </form>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
// import fire from "./fire";
import axios from 'axios';

export default {
  name: "chat",
  data() {
    return {
		form:{
           msg:"",
           sender_id : this.$store.state.user.user_id,
           receiver_id:null
		},
      userName: "",
      name: "test",
      showMessage: "",
      messages: [],
      user_data:[],
       config : {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
        }
    };
  },
    async created() {
		// this.get_msg();
    this.get_user();
	
  },
  methods: {
      get_user:async function(){ 
//   var container = this.$refs.cardref;

    await axios.get(process.env.VUE_APP_MODE+'get_message?sender_id='+this.$route.query.sid+'&receiver_id='+this.$route.query.id,this.config).then((res)=>{
            this.message =  res.data;
        })
          await axios.get(process.env.VUE_APP_MODE+'getuser/0/'+this.$route.query.id,this.config).then((response)=>{
            this.user_data = response.data;
        })
     
    }
	// get_msg: async function (){
    //      await axios.get(process.env.VUE_APP_MODE+'get_message?sender_id='+this.$route.query.sid+'&receiver_id='+this.$route.query.id,this.config).then((res)=>{
    //         this.message =  res.data;
    //     })
	// }
	,
    send_chat:async function(rid){
		this.form.receiver_id = rid
		const formData2 = new FormData()
        formData2.append('sender_id', this.form.sender_id)
        formData2.append('receiver_id', this.form.receiver_id)
        formData2.append('msg', this.form.msg)
		await axios.post(process.env.VUE_APP_MODE+'send_message',formData2,this.config).then(()=>{
			this.form.msg="";
			this.get_user()
        })

    }
  },
   beforeMount(){
    // this.get_msg()
 },
  

};
</script>
<style>
    .chat{
			margin-top: auto;
			margin-bottom: auto;
		}
		.card1{
			height: 600px;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
			overflow-y: scroll;
		}
		.contacts_body{
			padding:  0.75rem 0 !important;
			overflow-y: auto;
			white-space: nowrap;
		}
		.msg_card_body{
			/* overflow-y: auto; */
			padding:5px
		}
		.card1-header{
			border-radius: 15px 15px 0 0 !important;
			border-bottom: 0 !important;
		}
    .card1-footer{
      border-radius: 0 0 15px 15px !important;
      border-top: 0 !important;
      }
		.container{
			align-content: center;
		}
		.search{
			border-radius: 15px 0 0 15px !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
		}
    .search:focus{
		box-shadow:none !important;
    outline:0px !important;
}
		.type_msg{
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
			height: 60px !important;
			overflow-y: auto;
		}
.type_msg:focus{
           box-shadow:none !important;
           outline:0px !important;
		}
		.attach_btn{
	border-radius: 15px 0 0 15px !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.send_btn{
	border-radius: 0 15px 15px 0 !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.search_btn{
			border-radius: 0 15px 15px 0 !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.contacts{
			list-style: none;
			padding: 0;
		}
		.contacts li{
			width: 100% !important;
			padding: 5px 10px;
			margin-bottom: 15px !important;
		}
	.active{
			background-color: rgba(0,0,0,0.3);
	}
		.user_img{
			height: 70px;
			width: 70px;
			border:1.5px solid #f5f6fa;
		
		}
		.user_img_msg{
			height: 40px;
			width: 40px;
			border:1.5px solid #f5f6fa;
		
		}
	.img_cont{
			position: relative;
			height: 70px;
			width: 70px;
	}
	.img_cont_msg{
			height: 40px;
			width: 40px;
	}
	.online_icon{
		position: absolute;
		height: 15px;
		width:15px;
		background-color: #4cd137;
		border-radius: 50%;
		bottom: 0.2em;
		right: 0.4em;
		border:1.5px solid white;
	}
	.offline{
		background-color: #c23616 !important;
	}
	.user_info{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 15px;
	}
	.user_info span{
		font-size: 20px;
		color: white;
	}
	.user_info p{
	font-size: 10px;
	color: rgba(255,255,255,0.6);
	}
	.video_cam{
		margin-left: 50px;
		margin-top: 5px;
	}
	.video_cam span{
		color: white;
		font-size: 20px;
		cursor: pointer;
		margin-right: 20px;
	}
	.msg_cotainer{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10px;
		border-radius: 25px;
		background-color: #82ccdd;
		padding: 10px;
		position: relative;
		min-width:55px;
	}
	.msg_cotainer_send{
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10px;
		border-radius: 25px;
		background-color: #78e08f;
		padding: 10px;
		position: relative;
	}
	.msg_time{
		position: absolute;
		left: 0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_time_send{
		position: absolute;
		right:0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_head{
		position: relative;
	}
	#action_menu_btn{
		position: absolute;
		right: 10px;
		top: 10px;
		color: white;
		cursor: pointer;
		font-size: 20px;
	}
	.action_menu{
		z-index: 1;
		position: absolute;
		padding: 15px 0;
		background-color: rgba(0,0,0,0.5);
		color: white;
		border-radius: 15px;
		top: 30px;
		right: 15px;
		display: none;
	}
	.action_menu ul{
		list-style: none;
		padding: 0;
	margin: 0;
	}
	.action_menu ul li{
		width: 100%;
		padding: 10px 15px;
		margin-bottom: 5px;
	}
	.action_menu ul li i{
		padding-right: 10px;
	
	}
	.action_menu ul li:hover{
		cursor: pointer;
		background-color: rgba(0,0,0,0.2);
	}
	@media(max-width: 576px){
	.contacts_card{
		margin-bottom: 15px !important;
	}
	}
</style>