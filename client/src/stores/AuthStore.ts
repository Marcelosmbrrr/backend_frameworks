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

    async function signIn({ email, password, rememberMe }: LoginData) {
        try {

            const response = await axios.post(import.meta.env.VITE_API_URL + "/auth/signin", {
                email,
                password
            });

            const userData = response.data.user;

            localStorage.setItem("app-user-data", JSON.stringify(userData));
            Object.assign(user, userData);

            router.push({ path: '/home' });

        } catch (e) {
            throw e;
        }
    }

    async function signOut() {
        await axios.post(import.meta.env.VITE_API_URL + "/auth/signout");
        localStorage.removeItem("app-user-data");
        router.push({ path: '/login' });
    }

    return { signIn, signOut, user, is_authenticated }

});