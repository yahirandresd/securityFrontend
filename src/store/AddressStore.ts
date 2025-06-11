import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Address } from '@/models/Address';
import AddressService from '@/service/AddressService';

export const useAddressStore = defineStore('addressStore', () => {
  const addresses = ref<Address[]>([]);

  const fetchAddresses = async () => {
    const res = await AddressService.getAddresses();
    addresses.value = res.data;
  };

  const getAddress = (id: number) => AddressService.getAddress(id);

  const addAddress = (address: Address) => AddressService.createAddress(address);

  const editAddress = (id: number, address: Address) =>
    AddressService.updateAddress(id, address);

  const getAddressesByUser = async (userId: number) => {
    const res = await AddressService.getAddressByUser(userId);
    addresses.value = res.data;
  };

  const removeAddress = (id: number) => AddressService.deleteAddress(id);

  return {
    addresses,
    fetchAddresses,
    getAddress,
    addAddress,
    editAddress,
    getAddressesByUser,
    removeAddress,
  };
});
