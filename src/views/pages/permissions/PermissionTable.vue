<template>
  <div>
    <table class="w-full table-auto border">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2">Model</th>
          <th class="px-4 py-2" v-for="method in methods" :key="method">{{ method }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groupedPermissions" :key="group.entity">
          <td class="border px-4 py-2 font-semibold">{{ group.entity }}</td>
          <td
            class="border px-4 py-2 text-center"
            v-for="method in methods"
            :key="method"
          >
            <input
              type="checkbox"
              :checked="hasPermission(group.permissions, method)"
              @change="() => togglePermission(group.permissions, method)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = withDefaults(
  defineProps<{
    groupedPermissions: any[];
    methods: string[];
    togglePermission: (permissions: any[], method: string) => void;
  }>(),
  {
    groupedPermissions: () => []
  }
);

const hasPermission = (permissions: any[], method: string): boolean => {
  return permissions.some(p => p.method === method && p.has_permission);
};
</script>

