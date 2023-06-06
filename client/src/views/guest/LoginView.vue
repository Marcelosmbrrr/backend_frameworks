<template>
  <component :is="$route.meta.layout">

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
              <input type="text" name="email" id="email" v-model="formData.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <span className="text-sm text-red-400">{{ formError.email.message }}</span>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" v-model="formData.password"
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
            <div class="flex flex-col gap-2">
              <button type="submit" :disabled="!backendEnabled || loading"
                :class="{ 'bg-emerald-600 hover:bg-emerald-700': backendEnabled, 'bg-gray-700': !backendEnabled }"
                class="w-full text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-emerald-800">{{
                  loading ? 'Loading....' : 'Sign in' }}</button>
              <BackendSelect @backend-activation="backendActivation" :backendEnabled="backendEnabled" />
            </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <router-link to="/register"
                class="font-medium text-emerald-600 hover:underline dark:text-emerald-500">Sign up</router-link>
            </p>
          </form>
        </div>
      </div>

      <Transition>
        <div v-if="alert.show" class="p-4 mt-2 text-sm border border-gray-700 rounded-lg bg-gray-800 text-red-400"
          role="alert">
          <span class="font-medium">Error!</span> {{ alert.message }}
        </div>
      </Transition>

    </div>
  </component>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import BackendSelect from '@/components/formulary/backend-select/BackendSelect.vue';
import { FormData, FormDataError } from '@/types/types';
import { FormValidation } from '../../utils/FormValidation';
import { useAuth } from '@/stores/AuthStore';

type TFields = {
  email: string,
  password: string
}

interface IAlert {
    show: boolean;
    message: string;
}

const initialForm = JSON.stringify({ email: "", password: "" })
const initialFormError = JSON.stringify({ email: { error: false, message: "" }, password: { error: false, message: "" } })

const { signIn } = useAuth();
const formData = Vue.reactive<FormData<TFields>>(JSON.parse(initialForm));
const formError = Vue.reactive<FormDataError<TFields>>(JSON.parse(initialFormError));
const loading = Vue.ref<boolean>(false);
const alert = Vue.reactive<IAlert>({ show: false, message: "" });
const rememberMe = Vue.ref<boolean>(false);
const backendEnabled = Vue.ref<boolean>(false);

Vue.onMounted(() => {
  if (localStorage.getItem("app-backend")) {
    backendEnabled.value = true;
  }
});

function handleSubmit() {

  const obj = new FormValidation(formData, JSON.parse(initialFormError));
  const { validation, is_valid } = obj.exec();
  const validationCopy = JSON.parse(JSON.stringify(validation));
  Object.assign(formError, validationCopy);

  if (!is_valid) {
    Object.assign(alert, { show: true, message: "Data is invalid!" });
    return;
  }

  alert.show = false;
  loading.value = true;

  request();

}

function backendActivation(value: boolean) {
  backendEnabled.value = value;
}

async function request() {
  try {
    await signIn({ ...formData, rememberMe: rememberMe.value });
  } catch (e) {
    console.error(e);
    alert.message = e.message;
    alert.show = true;

    setTimeout(() => {
      alert.show = false;
    }, 2000)
  }
  finally {
    loading.value = false;
  }
}

</script>

