import * as Vue from 'vue';
import * as Pinia from 'pinia';
import router from '@/router';
import axios from '../utils/api';

interface LoginData {
    email: string,
    password: string,
    rememberMe: boolean
}

export const useAuth = Pinia.defineStore('auth', () => {

    const user = Vue.reactive({ name: "", email: "", password: "", role: "", status: "", created_at: "", updated_at: "" });
    const is_authenticated = Vue.ref(false);

    async function signIn({ email, password, rememberMe }: LoginData) {
        try {

            await axios.post(import.meta.env.VITE_API_URL + "/auth/signin", {
                email,
                password
            });

            router.push({ path: '/home' });

        } catch (e) {
            throw e;
        }
    }

    async function signOut() {
        await axios.post(import.meta.env.VITE_API_URL + "/auth/signout");
        localStorage.removeItem("access-token");
        router.push({ path: '/login' });
    }

    return { signIn, signOut, user, is_authenticated }

});