<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    /*{
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },*/
    {
        label: 'Amarillo',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'User Roles',
                icon: 'pi pi-fw pi-users',
                to: '/user-roles',
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                to: '/users',
            },
            {
                label: 'Address',
                icon: 'pi pi-fw pi-address-book',
                to: '/addresses',
            },
            {
                label: 'Passwords',
                icon: 'pi pi-fw pi-key',
                to: '/passwords',
            },
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-shield',
                to: '/roles',
            },
        ]
    },
    {
        label: 'Azul',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Permissions',
                icon: 'pi pi-fw pi-lock', // 🔒 Representa acceso o restricciones
                to: '/permissions',
            },
            {
                label: 'Sessions',
                icon: 'pi pi-fw pi-clock', // ⏰ Representa sesiones activas o duración
                to: '/sessions',
            },
            {
                label: 'Profiles',
                icon: 'pi pi-fw pi-id-card', // 🪪 Representa información de usuario
                to: '/profiles',
            },
            {
                label: 'RolePermissions',
                icon: 'pi pi-fw pi-shield', // 🛡️ Representa roles y seguridad
                to: '/rolepermissions',
            },
        ]
    },
    {
        label: 'Verde',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Devices',
                icon: 'pi pi-fw pi-tablet', // 📱 Representa dispositivos
                to: '/devices',
            },
            {
                label: 'Signatures',
                icon: 'pi pi-fw pi-pencil', // ✍️ Representa firmas
                to: '/signatures',
            },
            {
                label: 'SecurityQuestion',
                icon: 'pi pi-fw pi-question-circle', // ❓ Representa preguntas de seguridad
                to: '/security-questions',
            },
            {
                label: 'Answers',
                icon: 'pi pi-fw pi-check-circle', // ✅ Representa respuestas
                to: '/answers',
            },
        ]
    },
   
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
