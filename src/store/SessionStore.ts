import type { Session } from '@/models/Session';
import SessionService from '@/service/SessionService';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('SessionStore', {
    state: () => ({
        Sessions: [] as Session[],
    }),
    actions: {
        async fetchSessions() {
            let response = await SessionService.getSessions();
            this.Sessions = response.data
            return this.Sessions
        },
        async getSession(id: string) {
            return await SessionService.getSession(id);
        },
        async addSession(Session: Session) {
            return await SessionService.createSession(Session);
        },
        async editSession(id: string, Session: Session) {
            return await SessionService.updateSession(id, Session);

        },
        async removeSession(id: string) {
            return await SessionService.deleteSession(id);
        },
    }
});