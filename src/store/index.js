// import Vue from 'vue'

import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    // storage: window.localStorage,
    storage: window.sessionStorage,
});

const store = createStore({
    state: {
        counter: 0,
        user: 0,
        token: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        delToken(state) {
            state.token = null
            state.user = null
        }
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        getToken(state) {
            return state.token;
        },
    },
    plugins: [vuexLocal.plugin],
})

export default store;