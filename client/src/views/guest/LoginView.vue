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
              <input type="text" name="email" id="email" v-model="form.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <span className="text-sm text-red-400">{{ formError.email.message }}</span>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" v-model="form.password"
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
              <button type="submit" :disabled="backendEnabled === false || loading === true"
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-emerald-800">
                Sign In
              </button>
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
import { DeepCopy } from '../../utils/DeepCopy';
import BackendSelect from '@/components/formulary/backend-select/BackendSelect.vue';
import { FormValidation } from '../../utils/FormValidation';
import { useAuth } from '@/stores/AuthStore';

interface IForm {
  email: string;
  password: string;
}

interface IFieldError {
  error: boolean,
  message: string
}

interface IFormError {
  email: IFieldError,
  password: IFieldError
}

interface IAlert {
  show: boolean;
  message: string;
}

const initialForm = { email: "", password: "" }
const initialFormError = { email: { error: false, message: "" }, password: { error: false, message: "" } }

const { signIn } = useAuth();
const form = Vue.reactive<IForm>(DeepCopy(initialForm));
const formError = Vue.reactive<IFormError>(DeepCopy(initialFormError));
const loading = Vue.ref<boolean>(false);
const alert = Vue.reactive<IAlert>({ show: false, message: "" });
const rememberMe = Vue.ref<boolean>(false);
const backendEnabled = Vue.ref<boolean>(false);

function handleSubmit() {

  const validation = validationBeforeRequest();

  if (!validation) {
    return;
  }

  alert.show = false;
  loading.value = true;

  request();

}

function validationBeforeRequest(): boolean {

  const { validation, is_valid } = FormValidation(form, DeepCopy(initialFormError));
  const validationCopy = DeepCopy(validation);;
  Object.assign(formError, validationCopy);

  if (!is_valid) {
    Object.assign(alert, { show: true, message: "Data is invalid!" });
    return false;
  }

  return true;
}

async function request() {
  try {
    await signIn({ ...form, rememberMe: rememberMe.value });
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

function backendActivation(value: boolean) {
  backendEnabled.value = value;
}

</script>

