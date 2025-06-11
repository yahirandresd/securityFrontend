import axios from "axios";
import type { Device } from "../models/Device";

// Asegúrate de que en tu archivo .env esté bien definida esta variable:
// VITE_API_URL=http://localhost:5000/api
const API_URL = `${import.meta.env.VITE_API_URL}/devices`;

class DeviceService {
  async getDevices() {
    const response = await axios.get<Device[]>(API_URL);
    return response;
  }

  async getDevice(id: number) {
    const response = await axios.get<Device>(`${API_URL}/${id}`);
    return response;
  }

  async createDevice(device: Device) {
    if (!device.user_id) {
        throw new Error("user_id es requerido para crear un dispositivo");
    }

    const url = `${API_URL}/user/${device.user_id}`;
    console.log("POST a:", url); // 👈 para verificar en consola

    const response = await axios.post<Device>(url, device);
    return response;
  }

  async updateDevice(id: number, device: Device) {
    const response = await axios.put<Device>(`${API_URL}/${id}`, device);
    return response;
  }

  async deleteDevice(id: number) {
    await axios.delete(`${API_URL}/${id}`);
  }
}

export default new DeviceService();
