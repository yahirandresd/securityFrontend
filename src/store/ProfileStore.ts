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
        async addProfile(userId: number, formData: FormData) {
            return await ProfileService.addProfile(userId, formData);
        },
        async editProfile(profileId: number, formData: FormData) {
            return await ProfileService.editProfile(profileId, formData);
        },
        async removeProfile(id: number) {
            return await ProfileService.deleteProfile(id);
        },
        async fetchProfilesByUser(userId: number) {
            let response = await ProfileService.getProfilesByUser(userId);
            this.Profiles = Array.isArray(response.data) ? response.data : [response.data];
            return this.Profiles;
        },
    }
});