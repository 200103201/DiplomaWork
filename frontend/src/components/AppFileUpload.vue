<template>
  <div class="card">
    <FileUpload
      name="file"
      :multiple="false"
      accept="image/*"
      :max-file-size="1000000"
      :show-upload-button="false"
      choose-label="Выберите файл"
      cancel-label="Удалить файл"
      invalid-file-type-message="Некорректный формат изображения"
      custom-upload
      @select="onSelect"
    >
      <template #content="{ files, removeFileCallback }">
        <div v-if="selectedFile.length > 0">
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div
              v-for="(file, index) of selectedFile"
              :key="file.size"
              class="card m-0 flex flex-column md:flex-row surface-border align-items-center gap-3"
            >
              <img :src="file.objectURL" alt="image" class="w-full md:w-2 border-round" />

              <div>{{ formatSize(file.size) }}</div>
              <Badge value="Pending" severity="warning" />
              <Button
                icon="pi pi-times"
                outlined
                rounded
                severity="danger"
                @click="onRemoveTemplatingFile(removeFileCallback, index)"
              />
            </div>
          </div>
        </div>
        <span v-else-if="files.length && !selectedFile.length">
          <p>Перетащите файл в эту область для загрузки</p>
        </span>
      </template>
      <template #empty>
        <span v-if="!selectedFile.length">
          <p>Перетащите файл в эту область для загрузки</p>
        </span>
      </template>
    </FileUpload>
  </div>
</template>

<script setup>
import { usePrimeVue } from 'primevue/config';
import { watch, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const $primevue = usePrimeVue();
const selectedFile = ref([]);

const emit = defineEmits(['update:model-value']);

watch(
  () => props.modelValue,
  () => {
    props.modelValue &&
      (selectedFile.value = [
        { objectURL: props.modelValue, size: base64ToFile(props.modelValue).size }
      ]);
  },
  { deep: true, immediate: true }
);

const onSelect = async (event) => {
  if (event.files.length) {
    const file = event.files[event.files.length - 1];
    const reader = new FileReader();
    const blob = await fetch(file.objectURL).then((r) => r.blob());

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
      selectedFile.value = [
        { objectURL: base64data, size: event.files[event.files.length - 1].size }
      ];
      emit('update:model-value', base64data);
    };
  }
};

const onRemoveTemplatingFile = (removeFileCallback, index) => {
  removeFileCallback(index);
  selectedFile.value = [];
  emit('update:model-value', null);
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};

function base64ToFile(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], { type: mime });
}
</script>
