import AuthService from '@/service/AuthService';
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '../models/User';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(AuthService.getCurrentUser()); // <-- Reactivo
    const googleToken = ref<string | null>(null); // <-- Nuevo ref para el token de Google

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

    const loginWithGoogle = async (googleJwt: string) => {
        try {
            const decoded = jwtDecode<any>(googleJwt);
            user.value = {
                email: decoded.email,
                name: decoded.name,
                token: googleJwt,
                // Puedes agregar más campos si tu modelo User los tiene
            };
            googleToken.value = googleJwt;
            // Guardar usuario y token en localStorage usando AuthService
            AuthService.loginWithGoogle(user.value, googleJwt);
        } catch (error) {
            throw new Error('Error al iniciar sesión con Google');
        }
    };

    return { user, login, logout, isAuthenticated, loginWithGoogle, googleToken };
});