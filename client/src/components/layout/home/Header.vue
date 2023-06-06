<template>
    <div>
        <nav class="w-full bg-white border-b border-gray-200 dark:border-gray-700 px-6 py-2.5 dark:bg-gray-800">
            <div class="flex justify-between items-center">
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <router-link to="/home"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700"
                                aria-current="page">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/users"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700">Users</router-link>
                        </li>
                        <li>
                            <router-link to="/roles"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700">Roles</router-link>
                        </li>
                        <li>
                            <router-link to="/chat"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700">Chat</router-link>
                        </li>
                    </ul>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li @click="toggle"
                            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-sun" />
                        </li>
                        <li @click="signOut"
                            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-door-open" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div
            class="w-full flex justify-between bg-white border-b border-gray-200 dark:border-gray-700 px-6 py-3 dark:bg-gray-800">
            <div>
                <h1 class="text-xl text-emerald-500">{{ route.name.toUpperCase() }}</h1>
            </div>
            <div class="flex gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" class="mr-2 h-9"
                    alt="NextJS logo" />
                <img :src=frameworkIcon() class="mr-2 h-9" alt="NextJS logo" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { useAuth } from '@/stores/AuthStore';
import { useTheme } from '@/stores/ThemeStore';
import { useRoute } from 'vue-router';

const { icon, toggle } = useTheme();

const backendIcons = {
    nest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
    adonis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adonisjs/adonisjs-original.svg",
    laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    zend: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zend/zend-plain.svg",
    symfony: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg",
    cakephp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cakephp/cakephp-original.svg",
    codeigniter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg",
    django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
}

const { signOut } = useAuth();
const route = useRoute();

function menuToggle() {
    console.log('menu toggle');
}

function frameworkIcon() {
    const key: string = localStorage.getItem("app-backend")?.split("/")[1];
    return backendIcons[key];
}
</script>