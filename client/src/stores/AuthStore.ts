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

    const user = Vue.reactive({});
    const is_authenticated = Vue.ref(false);

    async function refresh() {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/auth/refresh-data");
            Object.assign(user, response.data.user);
        } catch (e) {
            console.error(e);
            signOut();
        }
    }

    async function signIn({ email, password, rememberMe }: LoginData) {
        try {

            const response = await axios.post(import.meta.env.VITE_API_URL + "/auth/signin", {
                email,
                password
            });

            localStorage.setItem("access_token", response.data.token);
            Object.assign(user, response.data.user);

            router.push({ path: '/home' });

        } catch (e) {
            throw e;
        }
    }

    async function signOut() {
        await axios.post(import.meta.env.VITE_API_URL + "/auth/signout");
        localStorage.removeItem("access_token");
        router.push({ path: '/login' });
    }

    return { signIn, signOut, refresh, user, is_authenticated }

});