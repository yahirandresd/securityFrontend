<script setup lang="ts">
import type { User } from '@/models/User';
import { useAuthStore } from '@/store/Auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const checked = ref(false);
const user = ref<User>({ email: '', password: '' });
const router = useRouter();
const GOOGLE_CLIENT_ID = '586201888260-gh8s4qrkm4v3aff3tuqkqehtnm1lbe40.apps.googleusercontent.com';

const handleLogin = async () => {
    try {
        await authStore.login(user.value);
        router.push('/');
    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
    // Cargar el script de Google Identity Services si no está cargado
    if (!document.getElementById('google-oauth-script')) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.id = 'google-oauth-script';
        script.onload = renderGoogleButton;
        document.body.appendChild(script);
    } else {
        renderGoogleButton();
    }
});

function renderGoogleButton() {
    if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(
            document.getElementById('google-signin-btn'),
            { theme: 'outline', size: 'large', width: 300 }
        );
    }
}

async function handleGoogleResponse(response: any) {
    // response.credential es el JWT de Google
    try {
        // Puedes decodificar el JWT si quieres más datos del usuario
        // const userData = JSON.parse(atob(response.credential.split('.')[1]));
        await authStore.loginWithGoogle(response.credential); // Debes implementar este método en tu store
        router.push('/');
    } catch (error) {
        alert(error.message);
    }
}
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
                    </div>

                    <form @submit.prevent="handleLogin">
                        <div>
                            <label for="email1"
                                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <InputText id="email1" type="text" placeholder="Email address"
                                class="w-full md:w-[30rem] mb-8" v-model="email" />

                            <label for="password1"
                                class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
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
                            <div class="flex justify-center mt-4">
                                <div id="google-signin-btn"></div>
                            </div>
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
