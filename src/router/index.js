import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/store/Auth';
import DashboardVue from '@/views/Dashboard.vue';
import TokenHandlerVue from '@/views/TokenHandler.vue';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/devices/:id',
                    name: 'devices view',
                    component: () => import('@/views/pages/Devices/DeviceView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/security-questions/:id',
                    name: 'security-questions view',
                    component: () => import('@/views/pages/SecurityQuestion/SecurityQuestionView.vue'),
                },
                {
                    path: '/answers/:id',
                    name: 'answers view',
                    component: () => import('@/views/pages/Answers/AnswerView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/answers/update/:id',
                    name: 'answers update',
                    component: () => import('@/views/pages/Answers/AnswerUpdate.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'security-questions/create',
                    name: 'security-questions-create',
                    component: () => import('@/views/pages/SecurityQuestion/SecurityQuestionCreate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },

                {
                    path: '/answers/create',
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
                    path: '/devices/create',
                    name: 'devicescreate',
                    component: () => import('@/views/pages/Devices/DeviceCreate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/devices/update/:id',
                    name: 'devices update',
                    component: () => import('@/views/pages/Devices/DeviceUpdate.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/devices',
                    name: 'devices',
                    component: () => import('@/views/pages/Devices/DeviceListView.vue'),
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
                    path: '/sessions/view/:id',
                    name: 'sessions view',
                    component: () => import('@/views/pages/sessions/SessionView.vue'),
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
                    path: '/permissions/role/:id',
                    name: 'permissions grouped',
                    component: () => import('@/views/pages/permissions/PermissionView.vue'),
                },
                {
                    path: '/permissions/view/:id',
                    name: 'permission view',
                    component: () => import('@/views/pages/permissions/PermissionNormalView.vue'),
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
                    path: '/profiles/user/:id',
                    name: 'profilesByUser',
                    component: () => import('@/views/pages/profiles/ProfileListUser.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/rolepermissions',
                    name: 'rolepermissions',
                    component: () => import('@/views/pages/rolepermissions/RolePermissionListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
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
                { path: '/', component: DashboardVue },
                { path: '/redirect', component: TokenHandlerVue },

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
                },
                //RUTAS YAHIR 
                {
                    path: '/mapa',
                    name: 'mapa',
                    component: () => import('@/views/pages/Map.vue'),
                },
                {
                    path: '/addresses',
                    name: 'addresses',
                    component: () => import('@/views/pages/address/AddressListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/addresses/create',
                    name: 'address create',
                    component: () => import('@/views/pages/address/AddressCreate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/addresses/update/:id',
                    name: 'address update',
                    component: () => import('@/views/pages/address/AddressUpdate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/addresses/view/:id',
                    name: 'ViewAddress',
                    component: () => import('@/views/pages/address/AddressView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/addresses/user/:id',
                    name: 'addressesByUser',
                    component: () => import('@/views/pages/address/AddressListUser.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                //PASSWORDS
                {
                    path: '/passwords',
                    name: 'passwords',
                    component: () => import('@/views/pages/password/PasswordListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/passwords/create',
                    name: 'passwords create',
                    component: () => import('@/views/pages/password/PasswordCreate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/passwords/update/:id',
                    name: 'password update',
                    component: () => import('@/views/pages/password/PasswordUpdate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/passwords/view/:id',
                    name: 'ViewPassword',
                    component: () => import('@/views/pages/password/PasswordView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                //ROLEs
                {
                    path: '/roles',
                    name: 'roles',
                    component: () => import('@/views/pages/roles/RoleListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/roles/create',
                    name: 'roles create',
                    component: () => import('@/views/pages/roles/RoleCreate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/roles/update/:id',
                    name: 'role update',
                    component: () => import('@/views/pages/roles/RoleUpdate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/roles/view/:id',
                    name: 'ViewRole',
                    component: () => import('@/views/pages/roles/RoleView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                //USER ROLES
                {
                    path: '/user-roles',
                    name: 'user roles',
                    component: () => import('@/views/pages/userRole/UserRolesListView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user-roles/create',
                    name: 'userRoles create',
                    component: () => import('@/views/pages/userRole/UserRoleCreate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user-roles/update/:id',
                    name: 'role update',
                    component: () => import('@/views/pages/userRole/UserRoleUpdate.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/user-roles/view/:id',
                    name: 'ViewRole',
                    component: () => import('@/views/pages/userRole/UserRoleView.vue'),
                    meta: {
                        requiresAuth: true // Esta ruta requiere autenticación
                    }
                },
                {
                    path: '/digital-signatures/user/:id',
                    name: 'digitalSignaturesByUser',
                    component: () => import('@/views/pages/DigitalSignature/DigitalSignatureListUser.vue'),
                    meta: { requiresAuth: true }
                },

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
