import Aura from '@primevue/themes/aura';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import AuthService from '@/service/AuthService';


import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import axios from 'axios';
import { createPinia } from 'pinia';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia); // 👈 Registrar Pinia antes de usarlo
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');

// Añadir un interceptor global para todas las solicitudes
axios.interceptors.request.use(
    (config) => {
        const excepciones = ['login', 'public'];
        const isExcepcion = excepciones.some(keyword => config.url.includes(keyword));

        if (!isExcepcion) {
            const token = AuthService.getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                console.log("agregando token " + token);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);