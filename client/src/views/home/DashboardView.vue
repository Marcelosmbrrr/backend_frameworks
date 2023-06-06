<template>
    <component :is="$route.meta.layout">
        <section
            class="h-full bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased flex justify-center items-center flex-wrap gap-5">
            <div
                class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Users Module</h5>
                    <router-link to="/users"
                        class="text-sm font-medium text-emerald-600 dark:text-emerald-500 cursor-pointer">
                        View all
                    </router-link>
                </div>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Created
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Total users
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ data.users.created }}
                                </div>
                            </div>
                        </li>
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Verified
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Users verified
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ data.users.verified }}
                                </div>
                            </div>
                        </li>
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Deleted
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Users deleted
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ data.users.deleted }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Roles Module</h5>
                    <router-link to="/roles"
                        class="text-sm font-medium text-emerald-600 dark:text-emerald-500 cursor-pointer">
                        View all
                    </router-link>
                </div>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Created
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Total roles
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ data.roles.created }}
                                </div>
                            </div>
                        </li>
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Used
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Roles being used
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ data.roles.used }}
                                </div>
                            </div>
                        </li>
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Deleted
                                    </p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Roles deleted
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ data.roles.deleted }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </section>
    </component>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import axios from '../../utils/api';

interface IData {
    users: {
        created: number,
        verified: number,
        deleted: number
    },
    roles: {
        created: number,
        used: number,
        deleted: number
    }
}

const initialData = JSON.stringify({ users: { created: 0, verified: 0, deleted: 0 }, roles: { created: 0, used: 0, deleted: 0 } });

const data = Vue.reactive<IData>(JSON.parse(initialData));

Vue.onMounted(() => {
    getData();
});

async function getData() {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/dashboard");
        Object.assign(data, response.data);
    } catch (error) {
        console.error(error);
    }
}
</script>