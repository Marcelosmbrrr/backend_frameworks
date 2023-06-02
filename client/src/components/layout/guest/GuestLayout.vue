<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div @click="toggle"
            class="absolute top-5 right-5 block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-sun" />
        </div>
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { useTheme } from '@/stores/ThemeStore';

const { icon, toggle } = useTheme();
</script>