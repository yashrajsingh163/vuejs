import { createApp } from 'vue'
import App from './App.vue';
import 'bootstrap';
import { createWebHistory, createRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import userlist from './components/UserList.vue';
import request from './components/Request.vue';
import Postdetails from './components/Postdetails'
import profiledetails from './components/Profiledetail';
import root from './components/Root'
import chat from './components/Chat'
import VueToast from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Notification from './components/Notification'
// import { VuejsDatatableFactory } from 'vuejs-datatable';
import store from './store'


// let user = JSON.parse(localStorage.getItem('user_data'));
// console.log(user.token);
// try {
//     let user = JSON.parse(localStorage.getItem('user_data'));
//     console.log(user.token);


// } catch (e) {



// }


var routes = [{
        path: '/',
        name: 'root',
        component: root,

    },
    {
        path: '/hello',
        name: 'HelloWorld',
        component: HelloWorld,

    }, {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/userlist',
        name: 'Userlist',
        component: userlist
    },
    {
        path: '/request-list',
        name: 'request',
        component: request
    },
    {
        path: '/profile-detail',
        name: 'profile',
        component: profiledetails
    },
    {
        path: '/post-detail',
        name: 'post details',
        component: Postdetails
    },
    {
        path: '/chat',
        name: 'chat',
        component: chat
    },
    {
        path: '/notification',
        name: 'notification',
        component: Notification
    },
]


const rou = new createRouter({

    history: createWebHistory(),
    routes,


})

createApp(App).use(store).use(rou)
    .use(VueToast)
    .use(VueSweetalert2)
    .mount('#app')