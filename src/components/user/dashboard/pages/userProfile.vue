<template>
    <div>
        <h1>User Profile</h1>
        <hr />

        <!-- User Info Card (ثابتة) -->
        <div class="user-info">
            <p><strong>Firstname : </strong> {{ userStore.user.firstname }}</p>
            <p><strong>Lastname :</strong> {{ userStore.user.lastname }}</p>
            <p><strong>Email : </strong> {{ userStore.user.email }}</p>

            <!-- زرار إظهار أو إخفاء الفورم -->
            <v-btn @click="toggleEdit">
                {{ showForm ? 'Cancel' : 'Edit Profile' }}
            </v-btn>
        </div>

        <!-- Edit Form يظهر عند الضغط على "Edit Profile" -->
        <Form v-if="showForm" class="mb-5 col-md-5" @submit="onSubmit" :validation-schema="formSchema">
            <div class="mb-4">
                <Field name="firstname" v-model="firstname" v-slot="{ field, errors, errorMessage }">
                    <input type="text" class="form-control" placeholder="Enter your firstname" v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }" />
                    <div class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>

            <div class="mb-4">
                <Field name="lastname" v-model="lastname" v-slot="{ field, errors, errorMessage }">
                    <input type="text" class="form-control" placeholder="Enter your lastname" v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }" />
                    <div class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>

            <v-btn type="submit" variant="outlined" :disabled="loading" :loading="loading">
                Save Changes
            </v-btn>
        </Form>
    </div>
</template>

<script setup>

import { ref, onMounted, reactive } from 'vue'
import { Field, Form } from 'vee-validate'
import { updateProfile } from '@/composables/user'
import { useUserStore } from '@/stores/user.js'
const userStore = useUserStore();
const { loading, formSchema, lastname, firstname, onSubmit, } = updateProfile()

// متغير لتخزين بيانات المستخدم


const showForm = ref(false)

const toggleEdit = () => {
    showForm.value = !showForm.value
}




// تحميل بيانات المستخدم عند أول تحميل



</script>

<style scoped>
.user-info {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    font-family: cursive;
}

.form-control {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s ease;
}

.form-control.is-invalid {
    border-color: #dc3545;
}

.input_alert {
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: 4px;
}
</style>