<script setup>
import { ref } from 'vue';
import useAsyncHandler from '@/composables/useAsyncHandler.js';
import { useUserStore } from '@/stores/useUserStore.js';
import { useToast } from 'primevue/usetoast';

const userStore = useUserStore();
const toast = useToast();

const { loading, executeAsyncOperation } = useAsyncHandler();

const form = ref({
  email: ''
});

async function onSubmit() {
  const onSuccess = (res) => {
    toast.add({
      severity: 'success',
      summary:
        res.message || `На вашу почту было отправлено письмо с ссылкой для восстановления доступа`,
      life: 3000
    });
  };

  await executeAsyncOperation(userStore.resetPassword, [form.value], { onSuccess });
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
        <div class="text-900 text-3xl font-medium mb-3">Сброс пароля</div>
      </div>
      <div>
        <label for="email" class="block text-900 font-medium mb-2">
          Введите E-mail, на который придет письмо с инструкцией для сброса пароля
        </label>
        <InputText
          id="email"
          v-model="form.email"
          type="email"
          class="w-full mb-3"
          placeholder="E-mail"
        />
        <Button label="Отправить письмо" type="submit" class="w-full" :loading="loading" />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
