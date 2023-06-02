<template>
    <div>
        <nav class="w-full bg-white border-b border-gray-200 dark:border-gray-700 px-6 py-2.5 dark:bg-gray-800">
            <div class="flex justify-between items-center">
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <router-link to="/home"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700"
                                aria-current="page">Dashboard</router-link>
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
                        <li>
                            <a href="#"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700">
                                <font-awesome-icon icon="fa-solid fa-sun" />
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700"><font-awesome-icon
                                    icon="fa-solid fa-door-open" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div
            class="w-full flex justify-start bg-white border-b border-gray-200 dark:border-gray-700 px-6 py-3 dark:bg-gray-800">
            <h1 class="text-xl text-emerald-500">DASHBOARD</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { useAuth } from '@/stores/AuthStore';

const { signOut } = useAuth();

function menuToggle() {
    console.log('menu toggle');
}
</script>