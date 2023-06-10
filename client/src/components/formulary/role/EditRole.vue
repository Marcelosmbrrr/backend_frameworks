<template>
    <button :disabled="props.disabled" @click="openModal" type="button" id="update-user"
        class="flex items-center justify-center text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800">
        Edit role
    </button>

    <!-- Main modal -->
    <div class="flex justify-center items-center fixed z-50 w-full p-4 overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
        :class="{ 'hidden': !open }">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Role
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal">
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <div class="mb-6">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" v-model="form.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>
                    <div class="flex gap-10 mb-6">

                        <div class="flex flex-col gap-2">
                            <div>
                                <label for="user"
                                    class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">User</label>
                            </div>
                            <div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" v-model="form.users.read"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Read</label>
                                </div>
                                <div class="flex items-center">
                                    <input id="checked-checkbox" type="checkbox" v-model="form.users.write"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checked-checkbox"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Write</label>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <div>
                                <label for="email"
                                    class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            </div>
                            <div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" v-model="form.roles.read"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Read</label>
                                </div>
                                <div class="flex items-center">
                                    <input id="checked-checkbox" type="checkbox" v-model="form.roles.write"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checked-checkbox"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Write</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="handleSubmit" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm</button>
                    <button @click="closeModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                </div>
            </div>
        </div>

        <Transition>
            <div v-if="alert.show" class="p-4 mt-2 text-sm border border-gray-700 rounded-lg bg-gray-800 text-red-400"
                role="alert">
                <span class="font-medium">Error!</span> {{ alert.message }}
            </div>
        </Transition>

    </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';

interface IForm {
    id: string;
    name: string;
    users: {
        read: boolean;
        write: boolean;
    };
    roles: {
        read: boolean;
        write: boolean;
    };
}

interface IAlert {
    show: boolean;
    type: string;
    message: string;
}

const props = defineProps({
    disabled: {
        type: Boolean,
        required: true
    },
    role: {
        type: Object,
        required: true
    }
});

// Update prefix for v-model child-parent communication
// Source: https://learnvue.co/articles/v-model-guide#using-vue-v-model-in-custom-components
const emits = defineEmits(['update:role'])

const initialForm = JSON.stringify({
    id: props.role.id,
    name: props.role.name,
    users: {
        read: props.role.users.read,
        write: props.role.users.write,
    },
    roles: {
        read: props.role.roles.read,
        write: props.role.roles.write,
    },
});

const open = Vue.ref<boolean>(false);
const form = Vue.ref<IForm>(JSON.parse(initialForm));
const alert = Vue.reactive<IAlert>({ show: false, type: "", message: "" });

async function handleSubmit() {
    emits('update:role', form.value)
}

function openModal() {
    open.value = true;
}

function closeModal() {
    open.value = false;
}
</script>