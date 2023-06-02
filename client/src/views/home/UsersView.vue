<template>
    <component :is="$route.meta.layout">
        <TableVue />
    </component>
</template>

<script setup lang="ts">
import TableVue from '@/components/table/Table.vue';
</script>