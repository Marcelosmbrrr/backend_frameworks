import * as Vue from 'vue';
import * as Pinia from 'pinia';
import router from '@/router';

export const useTheme = Pinia.defineStore('auth', () => {

    const theme = Vue.ref("dark");
    const icon = theme.value === "dark" ? "Moon" : "Sun";

    Vue.onMounted(() => {

        const saved_theme = localStorage.getItem("app-theme");

        if (!saved_theme) {
            localStorage.setItem("nextjs-theme", "dark");
            return;
        }

        if (saved_theme === "light") {
            document.body.classList.remove("dark");
            theme.value = saved_theme;
        }

    });

    function toggle() {

        let new_value = theme.value === 'light' ? "dark" : "light";

        if (theme.value === "dark") {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }

        localStorage.removeItem("nextjs-theme");
        localStorage.setItem("nextjs-theme", new_value);
        theme.value = new_value;
    }

    return { toggle, icon }


});