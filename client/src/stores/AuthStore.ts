import * as Vue from 'vue';
import * as Pinia from 'pinia';
import router from '@/router';

export const useAuth = Pinia.defineStore('auth', () => {

    const user = Vue.reactive({ name: "", email: "", password: "", role: "", status: "", created_at: "", updated_at: "" });
    const is_authenticated = Vue.ref(false);

    async function login({ email, password, rememberMe }) {
        try {

            // login - create session - return token
            // set token local storage
            // redirect to home
            localStorage.setItem("app-personal-token", "abc");
            router.push({ path: '/home' });

        } catch (e) {
            console.log(e);
            router.push({ path: '/' });
        }
    }

    async function logout() {

        // logout - destroy session
        // remove token 
        localStorage.removeItem("app-personal-token");
        router.push({ path: '/login' });
    }

    return { login, logout, user, is_authenticated }

});