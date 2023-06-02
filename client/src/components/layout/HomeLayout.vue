<template>
    <div class='w-screen h-screen bg-slate-800 flex flex-col'>
        <HeaderVue />
        <div class="grow bg-red-100">

        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import HeaderVue from './Header.vue';
</script>