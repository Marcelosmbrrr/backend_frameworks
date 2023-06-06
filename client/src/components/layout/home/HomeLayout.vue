<template>
    <div class='w-screen h-screen bg-slate-800 flex flex-col'>
        <HeaderVue />
        <div class="grow">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import HeaderVue from './Header.vue';
import { useAuth } from '@/stores/AuthStore';

const { refresh } = useAuth();

Vue.onMounted(() => {
    refresh();
})
</script>