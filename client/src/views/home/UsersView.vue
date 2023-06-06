<template>
    <component :is="$route.meta.layout">
        <!-- Start block -->
        <section class="h-full bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
            <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
                <!-- Start coding here -->
                <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div class="w-full lg:w-1/2">
                            <form class="flex items-center">
                                <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                                        placeholder="Search">
                                </div>
                            </form>
                        </div>
                        <div
                            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <!-- CRUD modals -->
                            <CreateUser :disabled="selection != null" />
                            <EditUser :disabled="selection == null" :id="selection.id" :name="selection.name"
                                :email="selection.email" :roleId="selection?.roleId" />
                            <button @click="getData" type="button" id="refresh-users-table"
                                data-modal-toggle="createProductModal"
                                class="flex items-center justify-center text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800">
                                Refresh
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-4 py-4">
                                    </th>
                                    <th scope="col" class="px-4 py-4">ID</th>
                                    <th scope="col" class="px-4 py-3">Verified</th>
                                    <th scope="col" class="px-4 py-3">Name</th>
                                    <th scope="col" class="px-4 py-3">Email</th>
                                    <th scope="col" class="px-4 py-3">Image</th>
                                    <th scope="col" class="px-4 py-3">Role</th>
                                    <th scope="col" class="px-4 py-3">Created at</th>
                                    <th scope="col" class="px-4 py-3">Updated at</th>
                                    <th scope="col" class="px-4 py-3">
                                        <span class="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="record in records" class="border-b dark:border-gray-700">
                                    <td class="px-4 py-3">
                                        <input @change="select(record.id)" :disabled="isRecordDisabled(record.id)"
                                            type="checkbox" value=""
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </td>
                                    <th scope="row"
                                        class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ record.id }}
                                    </th>
                                    <td class="px-4 py-3">
                                        <div class="h-2.5 w-2.5 rounded-full mr-2" :class="{
                                            'bg-green-500':
                                                record.email_verified_at != null, 'bg-red-500': record.email_verified_at === null
                                        }"></div>
                                    </td>
                                    <td class="px-4 py-3">{{ record.name }}</td>
                                    <td class="px-4 py-3">{{ record.email }}</td>
                                    <td class="px-4 py-3">{{ record.image }}</td>
                                    <td class="px-4 py-3">{{ record.role.name }}</td>
                                    <td class="px-4 py-3">{{ new Date(record.created_at).toLocaleDateString() }}</td>
                                    <td class="px-4 py-3">{{ new Date(record.updated_at).toLocaleDateString() }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav v-if="records.length > 0"
                        class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation">
                        <ul class="inline-flex items-stretch -space-x-px">
                            <li>
                                <a
                                    class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Previous</span>
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Next</span>
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    </component>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
// Custom
import CreateUser from '@/components/formulary/user/CreateUser.vue';
import EditUser from '@/components/formulary/user/EditUser.vue';
import { useAuth } from '@/stores/AuthStore';
import axios from '../../utils/api';

interface ISelection {
    id: number;
    verified: boolean;
    name: string;
    email: string;
    roleId: number;
}

interface IAlert {
    show: boolean;
    message: string;
}

const initialAlert = JSON.stringify({ show: false, message: "" });

const { user } = useAuth();
const records = Vue.ref([]);
const loading = Vue.ref<boolean>(true);
const alert = Vue.reactive<IAlert>(JSON.parse(initialAlert));
const selection = Vue.ref<null | ISelection>(null);

Vue.onMounted(() => {
    getData();
});

async function getData() {
    loading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?limit=${10}&offset=${0}`);
        records.value = response.data.users;
    } catch (error) {
        console.log(error);
        alert.show = true;
        alert.message = error.message;
    } finally {
        loading.value = false;
    }
}

function select(recordId: number) {

    console.log(selection.value === null)

    // Is an unselection
    if (selection.value != null) {
        if (selection.value.id == recordId) {
            selection.value = null;
            return;
        }
    }

    const new_record = records.value.filter((record) => record.id == recordId)[0];

    // Is a new selection when is empty or is different from previously
    selection.value = JSON.parse(JSON.stringify(new_record));

}

function isRecordDisabled(recordId: number): boolean {

    if (recordId == user.id) {
        return true;
    }

    if (selection.value != null) {
        if (selection.value.id == recordId) {
            return false;
        } else {
            return true;
        }
    }
}
</script>