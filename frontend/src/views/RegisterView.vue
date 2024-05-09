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
  name: '',
  password: '',
  password_confirmation: '',
  phone: ''
});

async function onSubmit() {
  const onSuccess = () => {
    toast.add({
      severity: 'success',
      summary: `Аккаунт успешно создан`,
      life: 3000
    });
    router.push('/login');
  };

  const onCatch = (e) => {
    toast.add({
      severity: 'error',
      summary: e.response?.data?.message || `Не удалось создать аккаунт`,
      life: 3000
    });
  };

  await executeAsyncOperation(userStore.register, [form.value], { onSuccess, onCatch });
}
</script>

<template>
  <div class="relative h-full pt-6">
    <RouterLink
      to="/login"
      class="container flex align-items-center no-underline text-black-alpha-90"
    >
      <i class="pi pi-angle-left" style="font-size: 2rem" />
      <span class="ml-2">Назад</span>
    </RouterLink>
    <form class="centerBlock p-4 border-round w-full lg:w-4" @submit.prevent="onSubmit">
      <div class="text-center mb-5">
        <img src="@/assets/images/logo.png" alt="logo" height="63" class="mb-3 h-2rem" />
        <div class="text-900 text-3xl font-medium mb-3">Создать профиль</div>
      </div>
      <div>
        <label for="name" class="block text-900 font-medium mb-2">Ваше имя</label>
        <InputText id="name" v-model="form.name" class="w-full mb-3" />
        <label for="email" class="block text-900 font-medium mb-2">E-mail</label>
        <InputText id="email" v-model="form.email" type="email" class="w-full mb-3" />

        <label for="phone" class="block text-900 font-medium mb-2">Телефон</label>
        <InputMask id="phone" v-model="form.phone" class="w-full mb-3" mask="+7-(999)-999-99-99" />
        <label for="password" class="block text-900 font-medium mb-2">Пароль</label>
        <Password
          id="password"
          v-model="form.password"
          :feedback="false"
          class="w-full mb-3"
          toggle-mask
          input-class="flex-grow-1"
        />
        <label for="password_confirmation" class="block text-900 font-medium mb-2">
          Подтвердите пароль
        </label>
        <Password
          id="password_confirmation"
          v-model="form.password_confirmation"
          :feedback="false"
          type="password"
          class="w-full mb-3"
          toggle-mask
          input-class="flex-grow-1"
        />
        <Button label="Создать и войти" class="w-full" type="submit" :loading="loading" />
        <div class="mt-5 text-center">
          <span class="text-600 font-medium line-height-3">Уже зарегистрированы?</span>
          <RouterLink to="/login" class="font-medium no-underline text-blue-500 cursor-pointer">
            Войти
          </RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>
