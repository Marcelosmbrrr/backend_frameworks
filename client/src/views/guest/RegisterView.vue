<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                    alt="logo">
            </div>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create and account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                name</label>
                            <input type="text" name="name" id="name" v-model="formData.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <span className="text-sm text-red-400">{{ formError.name.message }}</span>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email" v-model="formData.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <span className="text-sm text-red-400">{{ formError.email.message }}</span>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" v-model="formData.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <span className="text-sm text-red-400">{{ formError.password.message }}</span>
                        </div>
                        <div>
                            <label for="password_confirmation"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <input type="password_confirmation" name="password_confirmation" id="password_confirmation"
                                v-model="formData.password_confirmation"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <span className="text-sm text-red-400">{{ formError.password_confirmation.message }}</span>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Create
                            an account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <router-link to="/"
                                class="font-medium text-emerald-600 hover:underline dark:text-emerald-500">Login
                                here</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { FormData, FormDataError } from '@/types/types';
import { FormValidation } from '../../utils/FormValidation';

type Fields = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

const initialForm = { name: "", email: "", password: "", password_confirmation: "" }
const initialFormError = { name: { error: false, message: "" }, email: { error: false, message: "" }, password: { error: false, message: "" }, password_confirmation: { error: false, message: "" } }

const formData = Vue.reactive<FormData<Fields>>(initialForm);
const formError = Vue.reactive<FormDataError<Fields>>(initialFormError);
const alert = Vue.reactive({ show: false, message: "" });

async function handleSubmit() {

    const obj = new FormValidation(formData, formError);
    const { validation, is_valid } = obj.exec();
    const validationCopy = JSON.parse(JSON.stringify(validation));
    Object.assign(formError, validationCopy);

    if (!is_valid) {
        Object.assign(alert, { show: true, message: "Data is invalid!" });
        return;
    }

}

</script>