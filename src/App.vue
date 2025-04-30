<template>
    <div class="text-center" v-if="loading"><v-progress-circular :size="50" color="primary"
            indeterminate></v-progress-circular></div>
    <div v-else>
        <Header> </Header>
        <router-view />
    </div>
</template>
<script setup>
import Header from './components/Header/header.vue';
import { firstLoad } from './composables/auth';
const { loading } = firstLoad();
</script>




<style scoped></style>
