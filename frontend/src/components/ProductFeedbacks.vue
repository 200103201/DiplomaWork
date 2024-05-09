<template>
  <div class="md:w-6">
    <div class="text-xl font-bold">Отзывы о товаре</div>
    <Rating v-model="rating.score" :cancel="false" class="my-3" />
    <!-- <InputGroup class="w-8 hidden md:block">
      <InputText v-model="rating.content" placeholder="Напишите свое мнение о товаре" />
      <Button
        label="Поделиться"
        icon="pi pi-arrow-right"
        icon-pos="right"
        :loading="loading"
        @click="sendFeedback"
      />
    </InputGroup> -->
    <div class="flex flex-column gap-3">
      <InputText v-model="name" placeholder="Напишите свое имя" />
      <InputText v-model="rating.content" placeholder="Напишите свое мнение о товаре" />

      <Button
        label="Поделиться"
        icon="pi pi-arrow-right"
        icon-pos="right"
        :loading="loading"
        @click="sendFeedback"
      />
    </div>
    <div class="text-xl font-bold my-4">{{ feedbacks.length }} отзывов</div>
    <ul class="flex flex-column gap-3">
      <li
        v-for="(feedback, index) in feedbacks"
        :key="feedback.feedback_id"
        class="d-flex flex-column gap-3"
      >
        <span class="font-bold">{{ feedback.name }}</span>
        <div class="flex md:flex-row flex-column justify-content-between max-w-30rem">
          <p class="">{{ feedback.content }}</p>
          <Rating :model-value="feedback.score" readonly :cancel="false" />
        </div>
        <divider v-if="index !== feedbacks.length - 1" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductsModel from '@/api/models/ProductsModel.js';
import useAsyncHandler from '@/composables/useAsyncHandler.js';
import { useToast } from 'primevue/usetoast';
import Divider from 'primevue/divider';

const toast = useToast();
const emit = defineEmits(['onAddNewFeedback']);

const props = defineProps({
  productId: {
    type: Number,
    required: true
  },
  feedbacks: {
    type: Array,
    default: () => []
  }
});

const { loading, executeAsyncOperation } = useAsyncHandler();
const rating = ref({ score: 0, content: '' });
const name = ref('');

async function sendFeedback() {
  const data = { ...rating.value, name: name.value, product_id: props.productId, service_id: null };

  const onCatch = () => {
    toast.add({
      severity: 'error',
      summary: `Не удалось оставить отзыв`,
      life: 4000
    });
  };

  const onSuccess = async () => {
    emit('onAddNewFeedback');
    rating.value = { score: 0, content: '' };
    name.value = '';
    toast.add({
      severity: 'success',
      summary: `Ваш отзыв успешно отправлен`,
      life: 4000
    });
  };

  await executeAsyncOperation(ProductsModel.sendFeedback, [data], { onSuccess, onCatch });
}
</script>

<style lang="scss" scoped></style>
