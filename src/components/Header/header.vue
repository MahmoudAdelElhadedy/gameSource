<template>
    <header>
        <div class="container  header_container">
            <div class="logo ">
                <router-link :to="{ name: 'home' }">
                    Game Source
                </router-link>

            </div>
            <div>
                <ul>
                    <li v-if="!userStore.isAuth">
                        <router-link :to="{ name: 'signin' }">Sign in</router-link>
                    </li>
                    <li v-if="userStore.isAuth" @click="userStore.signOut()">
                        <span>Sign out</span>
                    </li>
                    <li v-if="userStore.isAuth">
                        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
                    </li>
                    <li v-if="userStore.isAuth">
                        <router-link :to="{ name: 'home' }">HOME</router-link>
                    </li>
                </ul>
            </div>

        </div>
    </header>


</template>


<script setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

</script>

<style scoped></style>