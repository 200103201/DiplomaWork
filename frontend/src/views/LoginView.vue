<script setup>
import { ref } from 'vue';
import useAsyncHandler from '@/composables/useAsyncHandler.js';
import { useUserStore } from '@/stores/useUserStore.js';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const { loading, executeAsyncOperation } = useAsyncHandler();

const form = ref({
  email: '',
  password: ''
});

async function onSubmit() {
  const onSuccess = () => {
    router.push('/');
  };

  const onCatch = (e) => {
    console.log(e);

    toast.add({
      severity: 'error',
      summary:
        e.response?.data?.message ||
        `Не удалось войти в аккаунт. Проверьте корректность введенных данных`,
      life: 3000
    });
  };

  await executeAsyncOperation(userStore.login, [form.value], { onSuccess, onCatch });
}
</script>

<template>
  <div class="relative h-full pt-6">
    <RouterLink to="/" class="container flex align-items-center no-underline text-black-alpha-90">
      <i class="pi pi-angle-left" style="font-size: 2rem" />
      <span class="ml-2">Назад</span>
    </RouterLink>
    <form class="centerBlock p-4 border-round w-full lg:w-4" @submit.prevent="onSubmit">
      <div class="text-center mb-5">
        <img src="@/assets/images/logo.png" alt="logo" height="63" class="mb-3 h-2rem" />
        <div class="text-900 text-3xl font-medium mb-3">Войти в профиль</div>
      </div>
      <div>
        <label for="email" class="block text-900 font-medium mb-2">E-mail</label>
        <InputText id="email" v-model="form.email" type="email" class="w-full mb-3" />
        <label for="password" class="block text-900 font-medium mb-2">Пароль</label>
        <Password
          id="password"
          v-model="form.password"
          :feedback="false"
          type="password"
          class="w-full mb-3"
          toggle-mask
          input-class="flex-grow-1"
        />
        <div class="flex align-items-center justify-content-between mb-6">
          <RouterLink
            to="/reset-password"
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >
            Забыли пароль?
          </RouterLink>
        </div>
        <Button label="Войти" icon="pi pi-user" class="w-full" type="submit" :loading="loading" />
        <div class="mt-5 text-center">
          <span class="text-600 font-medium line-height-3">Вы еще не зарегистрированы?</span>
          <RouterLink to="/register" class="font-medium no-underline text-blue-500 cursor-pointer">
            Создать профиль
          </RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
