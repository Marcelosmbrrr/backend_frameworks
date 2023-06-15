<template>
    <div class='w-screen h-screen bg-slate-800 flex flex-col'>
        <HeaderVue />
        <div class="grow">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderVue from './Header.vue';
</script>