<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/Auth';
import type { User } from '@/models/User';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const API_URL = import.meta.env.VITE_API_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const email = ref('');
const password = ref('');
const checked = ref(false);
const user = ref<User>({ email: '', password: '' });
const router = useRouter();
const clientId = CLIENT_ID; // ← Aquí va tu client_id real
const redirectUri = 'http://localhost:5173';
const scope = 'openid email profile';
const state = crypto.randomUUID(); // puedes guardarlo en localStorage si quieres verificar
const loginWithGoogle = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}&` +
        `response_type=code&` + // Authorization Code Flow
        `scope=${encodeURIComponent(scope)}&` +
        `state=${state}&` +
        `access_type=offline&` +
        `prompt=consent`;

    window.location.href = url;
};
const handleLogin = async () => {
    try {
        await authStore.login(user.value);
        router.push('/');
        alert('Login successful!');
    } catch (error) {
        alert(error.message);
        console.error('Login failed:', error);
    }
};
</script>

<template>
    <div
        class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="mb-8 w-16 shrink-0 mx-auto">
                            <path
                                d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11ZM17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11"
                                stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Security
                            System!</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                        <!-- LoginButton.vue -->
                        <div class="flex justify-center mb-6">
                            <button @click="loginWithGoogle"
                                class="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm px-6 py-2 hover:bg-gray-100 transition duration-200">
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                    alt="Google" class="w-5 h-5" />
                                <span class="font-medium">Iniciar sesión con Google</span>
                            </button>
                        </div>

                    </div>

                    <form @submit.prevent="handleLogin">
                        <div>
                            <label for="email1"
                                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <InputText id="email1" type="email" placeholder="Email address"
                                class="w-full md:w-[30rem] mb-8" v-model="email" />

                            <label for="password1"
                                class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" type="password" v-model="password" placeholder="Password" :toggleMask="true"
                                class="mb-4" fluid :feedback="false"></Password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span
                                    class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot
                                    password?</span>
                            </div>
                            <Button label="Sign In" class="w-full" type="submit"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    max-width: 300px;
    margin: auto;
}
</style>
