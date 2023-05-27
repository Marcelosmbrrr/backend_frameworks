<template>
    <h1>DASHBOARD</h1>
    <button @click="logout">Sign out</button>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/AuthStore';

const { logout } = useAuth();
</script>