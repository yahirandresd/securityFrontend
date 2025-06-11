import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/store/Auth';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/addresses',
                    name: 'addresses',
                    component: () => import('@/views/pages/address/AddressListView.vue'),
                    path: 'security-questions/create',
                    name: 'security-questions-create',
                    component: () => import('@/views/pages/SecurityQuestion/SecurityQuestionCreate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/addresses/create',
                    name: 'address create',
                    component: () => import('@/views/pages/address/AddressCreate.vue')
                },
                {
                    path: 'Answers/create',
                    name: 'answers create',
                    component: () => import('@/views/pages/Answers/AnswersCreate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/signatures/update/:id',
                    name: 'digital-signatures-update',
                    component: () => import('@/views/pages/DigitalSignature/DigitalSignatureUpdate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/signatures/create',
                    name: 'digital-signatures-create',
                    component: () => import('@/views/pages/DigitalSignature/DigitalSignatureCreate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/security-questions',
                    name: 'security-questions',
                    component: () => import('@/views/pages/SecurityQuestion/SecurityQuestionListView.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/signatures',
                    name: 'signatures',
                    component: () => import('@/views/pages/DigitalSignature/DigitalSignatureListView.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/answers',
                    name: 'answers',
                    component: () => import('@/views/pages/Answers/AnswerListView.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/devises/create',
                    name: 'devises create',
                    component: () => import('@/views/pages/Devises/DeviseCreate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/devises/update/:id',
                    name: 'devises update',
                    component: () => import('@/views/pages/Devises/DeviseUpdate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/devises',
                    name: 'devises',
                    component: () => import('@/views/pages/Devises/DeviseListView.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('@/views/pages/users/UserListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/users/create',
                    name: 'users create',
                    component: () => import('@/views/pages/users/UserCreate.vue')
                },
                {
                    path: '/users/update/:id',
                    name: 'users update',
                    component: () => import('@/views/pages/users/UserUpdate.vue')
                },
                {
                    path: '/sessions',
                    name: 'sessions',
                    component: () => import('@/views/pages/sessions/SessionListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/sessions/create',
                    name: 'sessions create',
                    component: () => import('@/views/pages/sessions/SessionCreate.vue')
                },
                {
                    path: '/sessions/update/:id',
                    name: 'sessions update',
                    component: () => import('@/views/pages/sessions/SessionUpdate.vue')
                },
                {
                    path: '/permissions',
                    name: 'permissions',
                    component: () => import('@/views/pages/permissions/PermissionListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/permissions/create',
                    name: 'permissions create',
                    component: () => import('@/views/pages/permissions/PermissionCreate.vue'),
                },
                {
                    path: '/permissions/update/:id',
                    name: 'permissions update',
                    component: () => import('@/views/pages/permissions/PermissionUpdate.vue'),
                },
                {
                    path: '/profiles',
                    name: 'profiles',
                    component: () => import('@/views/pages/profiles/ProfileListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/profiles/create',
                    name: 'profiles create',
                    component: () => import('@/views/pages/profiles/ProfileCreate.vue'),
                },
                {
                    path: '/profiles/update/:id',
                    name: 'profiles update',
                    component: () => import('@/views/pages/profiles/ProfileUpdate.vue'),
                },
                {
                    path: '/profiles/view/:id',
                    name: 'profiles view',
                    component: () => import('@/views/pages/profiles/ProfileView.vue'),
                },
                {
                    path: '/rolepermissions',
                    name: 'rolepermissions',
                    component: () => import('@/views/pages/rolepermissions/RolePermissionListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    },
                },
                {
                    path: '/rolepermissions/create',
                    name: 'rolepermissions create',
                    component: () => import('@/views/pages/rolepermissions/RolePermissionCreate.vue'),
                },
                {
                    path: '/rolepermissions/update/:id',
                    name: 'rolepermissions update',
                    component: () => import('@/views/pages/rolepermissions/RolePermissionUpdate.vue'),
                },

                {
                    path: '/login2',
                    name: 'login2',
                    component: () => import('@/views/pages/auth/Login2.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue')
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

// Configurar el guardián de ruta
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();  // Obtener el estado de autenticación desde Pinia
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está logueado, redirigir al login
        next({ path: '/auth/login' });
    } else {
        // Si no requiere autenticación o el usuario está logueado, continuar con la ruta
        next();
    }
});


export default router;
