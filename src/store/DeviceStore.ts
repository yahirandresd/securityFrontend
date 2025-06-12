import { Device } from '@/models/Device';
import DeviceService from '@/service/DeviceService';
import { defineStore } from 'pinia';

export const useDeviceStore = defineStore('deviceStore', {
  state: () => ({
    devices: [] as Device[],
  }),
  actions: {
    async fetchDevices() {
      const response = await DeviceService.getDevices();
      this.devices = response.data;
      return this.devices;
    },
    async getDevice(id: number) {
      return await DeviceService.getDevice(id);
    },
    async addDevice(device: Device) {
      return await DeviceService.createDevice(device);
    },
    async editDevice(id: number, device: Device) {
      return await DeviceService.updateDevice(id, device);
    },
    async removeDevice(id: number) {
      return await DeviceService.deleteDevice(id);
    },
    async fetchDevicesByUser(userId: number) {
      const response = await DeviceService.getDevicesByUser(userId);
      this.devices = response.data;
    }


  }
});
