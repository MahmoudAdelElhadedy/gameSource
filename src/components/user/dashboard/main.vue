<template>
    <div class="dashboard p-5">
        <h1 class="text-2xl font-bold mb-4">Main Dashboard</h1>
        <hr>

        <div class="grid md:grid-cols-3 gap-4 mb-6">
            <!-- User Info Card -->
            <div class="card bg-white shadow rounded-xl p-4">
                <h2 class="text-xl font-semibold mb-2">Welcome, {{ userStore.user.firstname }}</h2>
                <p>Email: {{ userStore.user.email }}</p>
                <v-btn class="mt-3" @click="goToProfile">Edit Profile</v-btn>
            </div>

            <br>
            <!-- Quick Actions -->
            <div class="card bg-green-100 shadow rounded-xl p-4" v-if="userStore.user.isAdmin">
                <h3 class="text-lg font-semibold">Quick Actions</h3>
                <v-btn @click="goToArticles" class="mt-2 mb-2" variant="tonal">Show current Articles</v-btn>
                <v-btn @click="goToAdd" class="mb-2" variant="tonal">ADD Article</v-btn>
                <v-btn @click="goToHome" class="mb-2" variant="tonal">GO to Home page File</v-btn>

            </div>
        </div>



    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const user = ref({
    firstName: '',
    email: '',
    lastLogin: ''
})

const stats = ref({
    tasks: 12,
    notifications: 3,
    projects: 5
})

const goToArticles = () => {
    router.push({ name: 'adminArticales' })
}
const goToAdd = () => {
    router.push({ name: 'adminAdd' })
}
const goToHome = () => {
    router.push({ name: 'home' })
}



const goToProfile = () => {
    router.push({ name: 'userProfile' })
}
</script>

<style scoped>
.card {
    min-height: 150px;
}
</style>