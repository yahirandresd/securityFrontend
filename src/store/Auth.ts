import AuthService from '@/service/AuthService';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { User } from '../models/User';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(AuthService.getCurrentUser());
    const token = ref<string | null>(localStorage.getItem('token'));
    const router = useRouter();

    const login = async (userData: User) => {
        try {
            const loggedUser = await AuthService.login(userData);
            console.log("iniciando usuario", JSON.stringify(loggedUser));
            user.value = loggedUser;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const logout = () => {
        console.log("cerrando sesión");
        AuthService.logout();
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    const setToken = (newToken: string) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };

    const isAuthenticated = computed(() => !!token.value);

    return {
        user,
        token,
        login,
        logout,
        setToken,
        isAuthenticated
    };
});

