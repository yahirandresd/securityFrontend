import type { Profile } from '@/models/Profile';
import ProfileService from '@/service/ProfileService';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('ProfileStore', {
    state: () => ({
        Profiles: [] as Profile[],
    }),
    actions: {
        async fetchProfiles() {
            let response = await ProfileService.getProfiles();
            this.Profiles = response.data
            return this.Profiles
        },
        async getProfile(id: number) {
            return await ProfileService.getProfile(id);
        },
        async addProfile(formData: FormData) {
            return await ProfileService.createProfile(formData);
        },
        async editProfile(id: number, formData: FormData) {
            return await ProfileService.updateProfile(id, formData);

        },
        async removeProfile(id: number) {
            return await ProfileService.deleteProfile(id);
        },
    }
});