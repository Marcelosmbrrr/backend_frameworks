import * as Vue from 'vue';
import * as Pinia from 'pinia';
import router from '@/router';

export const useAuth = Pinia.defineStore('auth', () => {

    const user = Vue.reactive({ name: "", email: "", password: "", role: "", status: "", created_at: "", updated_at: "" });
    const is_authenticated = Vue.ref(false);

    async function login({ email, password, rememberMe }) {
        try {

            console.log('login')

        } catch (e) {
            console.log(e);
            router.push({ path: '/' });
        }
    }

    async function logout() {
        router.push({ path: '/' });
    }

    return { login, logout, user, is_authenticated }

});