<template>
  <div class="container md:px-4 md:py-8 p-5">
    <div class="md:text-2xl text-xl font-bold md:mb-8 mb-3">Профиль пользователя</div>
    <div class="flex md:flex-row flex-column md:gap-8 gap-2 mb-3">
      <div class="md:w-10rem font-bold">Фото</div>
      <div class="flex md:gap-8 gap-2 md:flex-row flex-column">
        <Image
          :src="form.photo || noPhotoImage"
          alt="avatar"
          width="200px"
          :class="$style.avatar"
          class="hidden md:block"
        />
        <Image
          :src="form.photo || noPhotoImage"
          alt="avatar"
          width="100%"
          height="200px"
          class="md:hidden block"
        />
        <FileUpload
          mode="basic"
          accept="image/*"
          :max-file-size="1000000"
          choose-label="Выбрать"
          @select="onSelect"
        />
      </div>
    </div>
    <div
      class="flex md:flex-row flex-column md:gap-8 gap-2 md:mb-5 mb-3 md:align-items-center align-items-start"
    >
      <label for="name" class="w-10rem font-bold">Имя</label>
      <InputText id="name" v-model="form.name" class="flex-grow-1 w-full" placeholder="Имя" />
    </div>
    <div
      class="flex md:flex-row flex-column md:gap-8 gap-2 md:mb-5 mb-3 md:align-items-center align-items-start"
    >
      <label for="address" class="w-10rem font-bold">Адрес</label>
      <InputText
        id="address"
        v-model="form.address"
        class="flex-grow-1 w-full"
        placeholder="Адрес"
      />
    </div>
    <div
      class="flex md:flex-row flex-column md:gap-8 gap-2 md:mb-5 mb-3 md:align-items-center align-items-start"
    >
      <label for="email" class="w-10rem font-bold">E-mail</label>
      <InputText id="email" v-model="form.email" class="flex-grow-1 w-full" placeholder="E-mail" />
    </div>

    <div
      class="flex md:flex-row flex-column md:gap-8 gap-2 md:mb-5 mb-3 md:align-items-center align-items-start"
    >
      <label for="birthday" class="w-10rem font-bold">Дата рождения</label>
      <InputText
        id="birthday"
        v-model="form.email_verified_at"
        class="flex-grow-1 w-full"
        placeholder="Дата рождения"
      />
    </div>
    <Button
      label="Сохранить изменения"
      class="mt-6"
      icon="pi pi-user-edit"
      :loading="loading"
      @click="saveChanges"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import noPhotoImage from '@/assets/images/no-photo.png';
import UserModel from '@/api/models/UserModel.js';
import useAsyncHandler from '@/composables/useAsyncHandler.js';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const { loading, executeAsyncOperation } = useAsyncHandler();

const form = ref({
  name: '',
  email: '',
  address: '',
  photo: '',
  email_verified_at: ''
});

async function getProfileInfo() {
  const res = await UserModel.getProfileInfo();
  form.value = res.data;
}

async function saveChanges() {
  const onSuccess = (res) => {
    toast.add({
      severity: 'success',
      summary:
        res.message || `На вашу почту было отправлено письмо с ссылкой для восстановления доступа`,
      life: 3000
    });
  };

  const onCatch = (e) => {
    toast.add({
      severity: 'error',
      summary: e.response?.data?.message || `Не удалось сохранить изменения`,
      life: 3000
    });
  };
  executeAsyncOperation(UserModel.updateProfileInfo, [form.value], { onSuccess, onCatch });
}

const onSelect = async (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  const blob = await fetch(file.objectURL).then((r) => r.blob());

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    form.value.photo = reader.result;
  };
};

onMounted(async () => {
  await getProfileInfo();
});
</script>

<style lang="scss" module>
.avatar {
  aspect-ratio: 1 / 1;
}
</style>
