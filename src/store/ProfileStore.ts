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
        async addProfile(userId: number, file: File) {
            const response = await ProfileService.createProfile(userId, { photo: file });
            if (response.status === 201) {
                this.profiles.push(response.data);
            }
            return response;
        },
        async editProfile(userId: number, file: File) {
            const response = await ProfileService.updateProfile(userId, { photo: file });
            if (response.status === 201) {
                this.profiles.push(response.data);
            }
            return response;
        },
        async removeProfile(id: number) {
            return await ProfileService.deleteProfile(id);
        },
    }
});