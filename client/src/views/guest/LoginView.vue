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
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <span className="text-sm text-red-400">{{ formError.email.message }}</span>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <span className="text-sm text-red-400">{{ formError.password.message }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" type="checkbox" v-model="rememberMe"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800">
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
            </div>
            <button type="submit"
              class="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Sign
              in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <router-link to="/register"
                class="font-medium text-emerald-600 hover:underline dark:text-emerald-500">Sign up</router-link>
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
import { useAuth } from '@/stores/AuthStore';

type Fields = {
  email: string,
  password: string
}

const initialForm = { email: "", password: "" }
const initialFormError = { email: { error: false, message: "" }, password: { error: false, message: "" } }

const { login } = useAuth();
const formData = Vue.reactive<FormData<Fields>>(initialForm);
const formError = Vue.reactive<FormDataError<Fields>>(initialFormError);
const alert = Vue.reactive({ show: false, message: "" });
const rememberMe = Vue.ref(false);

function handleSubmit() {

  const obj = new FormValidation(formData, formError);
  const { validation, is_valid } = obj.exec();
  const validationCopy = JSON.parse(JSON.stringify(validation));
  Object.assign(formError, validationCopy);

  if (!is_valid) {
    Object.assign(alert, { show: true, message: "Data is invalid!" });
    return;
  }

  request();

}

async function request() {
  try {
    login({ ...formData, rememberMe: rememberMe.value });
  } catch (e) {
    console.error(e);
  }
}

</script>

