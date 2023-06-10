<template>
    <component :is="$route.meta.layout">
        <!-- Start block -->
        <section class="h-full bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
            <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
                <!-- Start coding here -->
                <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div class="w-full md:w-1/2">
                            <div class="flex items-center">
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
                                    <input @keydown="fetchByID" type="text" v-model="search.value"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                                        placeholder="Search by ID">
                                </div>
                            </div>
                        </div>
                        <div
                            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <!-- CRUD modals -->
                            <CreateRole :disabled="selection.selected" />
                            <EditRole :disabled="!selection.selected" :id="selection.user.id" :name="selection.user.name"
                                :users="selection.user.privileges.users" :roles="selection.user.privileges.roles" />
                            <button @click="fetchAll" type="button" id="refresh-users-table"
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
                                    <th scope="col" class="px-4 py-3">Name</th>
                                    <th scope="col" class="px-4 py-3">User Access</th>
                                    <th scope="col" class="px-4 py-3">Role Access</th>
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
                                        <input @change="select(record)" type="checkbox"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </td>
                                    <th scope="row"
                                        class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ record.id }}
                                    </th>
                                    <td class="px-4 py-3">
                                        {{ record.name }}
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center gap-3">
                                            <div class="flex items-center">
                                                <input :checked="record.ModuleRole[0].read" disabled type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label for="disabled-checkbox"
                                                    class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Read</label>
                                            </div>
                                            <div class="flex items-center">
                                                <input :checked="record.ModuleRole[0].write" disabled type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label for="disabled-checked-checkbox"
                                                    class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Write</label>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center gap-3">
                                            <div class="flex items-center">
                                                <input :checked="record.ModuleRole[1].read" disabled type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label for="disabled-checkbox"
                                                    class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Read</label>
                                            </div>
                                            <div class="flex items-center">
                                                <input :checked="record.ModuleRole[1].write" disabled type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label for="disabled-checked-checkbox"
                                                    class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Write</label>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3">
                                        {{ new Date(record.created_at).toLocaleDateString() }}
                                    </td>
                                    <td class="px-4 py-3">
                                        {{ new Date(record.updated_at).toLocaleDateString() }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav v-if="records.length > 0"
                        class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation">
                        <ul class="inline-flex items-stretch -space-x-px">
                            <li @click="handlePrevPage"
                                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Previous</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </li>
                            <li
                                class="flex items-center justify-center text-sm px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {{ paginate.page }}
                            </li>
                            <li @click="handleNextPage"
                                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
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
import { useAuth } from '@/stores/AuthStore';
import axios from '../../utils/api';
import CreateRole from '@/components/formulary/role/CreateRole.vue';
import EditRole from '@/components/formulary/role/EditRole.vue';

interface ISelection {
    selected: boolean,
    user: {
        id: string;
        name: string;
        privileges: {
            users: {
                read: boolean,
                write: boolean
            },
            roles: {
                read: boolean,
                write: boolean
            }
        }
    }
}

interface IPaginate {
    limit: number;
    page: number;
}

interface ISearch {
    value: string
}

const initialSelection = JSON.stringify({ selected: false, user: { id: "", privileges: { users: { read: false, write: false }, roles: { read: false, write: false } } } });
const initialPaginate = JSON.stringify({ limit: 10, page: 1 });

const { user } = useAuth();
const records = Vue.ref([]);
const paginate = Vue.reactive<IPaginate>(JSON.parse(initialPaginate));
const search = Vue.reactive<ISearch>({ value: "" });
const selection = Vue.reactive<ISelection>(JSON.parse(initialSelection));

Vue.onMounted(() => {
    Object.assign(paginate, JSON.parse(initialPaginate));
    records.value = [];
    fetchAll();
});

async function fetchAll() {
    try {
        const offset = paginate.page * paginate.limit - paginate.limit;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/roles?limit=${paginate.limit}&offset=${offset}`);
        records.value = response.data.roles;
    } catch (error) {
        console.error(error);
    }
}

async function fetchByID(e) {

    if (e.key != 'Enter') {
        return;
    }

    console.log('enter search');
}

function select(new_record) {

    // Is an unselection
    if (selection.selected) {
        if (selection.user.id === new_record.id) {
            Object.assign(selection, JSON.parse(initialSelection));
            return;
        }
    }

    const record = records.value.filter((record) => record.id == new_record.id)[0];

    // Is a new selection when is empty or is different from previously
    Object.assign(selection, {
        selected: true,
        user: {
            id: record.id,
            name: record.name,
            privileges: {
                users: {
                    read: record.ModuleRole[0].read,
                    write: record.ModuleRole[0].write,
                },
                roles: {
                    read: record.ModuleRole[1].read,
                    write: record.ModuleRole[1].write,
                }
            }
        }
    });

}

function handleNextPage() {
    // If actual page is not the last page - total is 10 pages (100 records (total records) / limit 10)
    // Refact: Math.round() if limit is not multiple of 100 - being limit always 10 isnt necessary
    // Refact: total records could not be 100
    return;

    if (paginate.page < (100 / paginate.limit)) {
        Object.assign(paginate, {
            ...paginate,
            ["page"]: paginate.page + 1
        });

        fetchAll();
    }
}

function handlePrevPage() {
    // Is the actual page is not the first one
    if (paginate.page > 1) {
        Object.assign(paginate, {
            ...paginate,
            ["page"]: paginate.page - 1
        });

        fetchAll();
    }
}

</script>