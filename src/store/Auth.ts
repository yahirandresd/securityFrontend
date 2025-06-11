import AuthService from '@/service/AuthService';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { User } from '../models/User';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(AuthService.getCurrentUser()); // <-- Reactivo


    const login = async (userData: User) => {
        try {
            let loggedUser = await AuthService.login(userData);
            console.log("iniciando usuario" + JSON.stringify(loggedUser))
            user.value = loggedUser;
            console.log("fin")
        } catch (error) {
            throw new Error(error.message);
        }
    };
    const router = useRouter();


    const logout = () => {
        console.log("cerrando")
        router.push('/auth/login'); // Luego, redirige a /auth/login

        AuthService.logout();
        user.value = null;

    };

    const isAuthenticated = computed(() => user.value !== null);

    return { user, login, logout, isAuthenticated };
});
