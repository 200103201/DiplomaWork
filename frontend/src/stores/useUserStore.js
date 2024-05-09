import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import UserModel from '@/api/models/UserModel.js';

export const useUserStore = defineStore(
  'user',
  () => {
    const authToken = ref(null);
    const user = ref({});

    const isAuthenticated = computed(() => authToken.value != null);
    const isEmailVerified = computed(() => !!user.value.email_verified_at);

    async function login(data) {
      const res = await UserModel.login(data);
      authToken.value = res.data.token;
      await getProfile();
    }

    async function register(data) {
      const res = await UserModel.register({
        ...data,
        phone: data.phone.replaceAll('-', '').replaceAll('(', '').replaceAll(')', '')
      });
      authToken.value = res.data.token;
      // await getProfile();
    }

    async function getProfile() {
      const res = await UserModel.getProfileInfo();
      user.value = res.data;
    }

    async function resetPassword(data) {
      await UserModel.resetPassword(data);
    }

    async function logout() {
      authToken.value = null;
      user.value = {};
      await UserModel.logout();
    }

    return {
      authToken,
      user,
      isAuthenticated,
      isEmailVerified,
      login,
      logout,
      register,
      resetPassword
    };
  },
  {
    persist: {
      paths: ['authToken', 'user']
    }
  }
);
