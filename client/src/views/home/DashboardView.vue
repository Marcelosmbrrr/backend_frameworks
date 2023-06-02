<template>
    <h1>DASHBOARD</h1>
    <button @click="signOut">Sign out</button>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/AuthStore';

const { signOut } = useAuth();
</script>