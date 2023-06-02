<template>
    <button @click="openModal"
        class="w-full block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        type="button">
        Framework
    </button>

    <div id="framework-modal"
        class="flex justify-center items-center fixed z-50 w-full p-4 overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
        :class="{ 'hidden': !open }">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Choose the backend framework
                    </h3>
                </div>
                <div class="p-6 space-y-6">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Choose one and click "Execute". The technology will start automatically and will be
                        responsible for receiving and processing your requests.
                    </p>
                </div>
                <div class="px-6 py-2">

                    <ul class="grid w-full gap-6 md:grid-cols-2" ref="cardsContainer">
                        <li>
                            <input type="radio" id="nest" name="option" value="javascript/nest" v-model="option"
                                class="hidden peer">
                            <label for="nest"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Nest</div>
                                    <div class="w-full">Javascript Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="adonis" name="option" value="javascript/adonis" v-model="option"
                                class="hidden peer">
                            <label for="adonis"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Adonis</div>
                                    <div class="w-full">Javascript Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adonisjs/adonisjs-original.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="django" name="option" value="python/django" v-model="option"
                                class="hidden peer">
                            <label for="django"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Django</div>
                                    <div class="w-full">Python Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="cakephp" name="option" value="php/cakephp" v-model="option"
                                class="hidden peer">
                            <label for="cakephp"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Cake PHP</div>
                                    <div class="w-full">PHP Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cakephp/cakephp-original.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="zend" name="option" value="php/zend" v-model="option"
                                class="hidden peer">
                            <label for="zend"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Zend</div>
                                    <div class="w-full">PHP Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zend/zend-plain.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="codeigniter" name="option" value="php/codeigniter" v-model="option"
                                class="hidden peer">
                            <label for="codeigniter"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Code Igniter</div>
                                    <div class="w-full">PHP Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="symfony" name="option" value="php/symfony" v-model="option"
                                class="hidden peer">
                            <label for="symfony"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Symfony</div>
                                    <div class="w-full">PHP Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="symfony" name="option" value="php/laravel" v-model="option"
                                class="hidden peer">
                            <label for="symfony"
                                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Laravel</div>
                                    <div class="w-full">PHP Framework</div>
                                </div>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"
                                    className="mr-2 h-9" alt="NextJS logo" />
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button" @click="handleExecute"
                        class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Execute</button>
                    <button type="button" @click="handleStop" :disabled="!backendEnabled"
                        :class="{ 'hidden': !backendEnabled }"
                        class="text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Stop</button>
                    <button type="button" @click="closeModal"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, onMounted } from 'vue';

const open = ref(false);
const option = ref<string | null>(null);
const loading = ref<boolean>(false);
const cardsContainer = ref(null);
const emit = defineEmits(['backend-activation']);
const { backendEnabled } = defineProps({
    backendEnabled: Boolean
});


onMounted(() => {
    if (localStorage.getItem("app-backend") === undefined) {
        return;
    }
    option.value = localStorage.getItem("app-backend");
    emit('backend-activation', true);
});

function openModal() {
    open.value = true;
}

function closeModal() {
    open.value = false;
}

function handleExecute() {

    if (option.value === null) {
        const list = cardsContainer.value;
        list.classList.add("shake");
        setTimeout(() => {
            list.classList.remove("shake");
        }, 1000);
        return;
    }

    const framework_absolute_path = `${import.meta.env.VITE_ABSOLUTE_PATH}/${option.value}`;

    // access framework folder
    // execute the framework
    localStorage.setItem("app-backend", option.value);
    emit('backend-activation', true);

    setTimeout(() => [
        closeModal()
    ], 500)
}

function handleStop() {
    localStorage.removeItem("app-backend");
    option.value = null;
    emit('backend-activation', false);
}
</script>

<style scoped>
.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
}

@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>