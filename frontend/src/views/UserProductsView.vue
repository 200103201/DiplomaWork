<template>
  <div class="container px-4 py-8">
    <div class="text-2xl font-bold mb-8">Мои товары</div>
    <div class="flex align-items-center justify-content-between">
      <div class="font-medium">Всего {{ products.length }} товаров</div>
      <RouterLink to="/product/create">
        <Button icon="pi pi-plus" label="Добавить товар" />
      </RouterLink>
    </div>
    <div class="grid mt-6">
      <div
        v-for="product in products"
        :key="product.product_id"
        class="md:col-6 col-12"
        @click="handleProductClick(product.product_id)"
      >
        <div class="bg-gray-50 flex md:flex-row flex-column gap-3 border-round p-3">
          <img
            :src="product.photo || noPhotoImage"
            alt="product photo"
            class="border-round hidden md:block"
            width="240px"
            :class="$style.img"
          />
          <img
            :src="product.photo || noPhotoImage"
            alt="product photo"
            class="border-round block md:hidden"
            width="100%"
            :class="$style.img"
          />
          <div>
            <div class="font-bold mb-2">{{ product.product_name }}</div>
            <div class="mb-2 text-gray-400">{{ product.product_description }}</div>
            <div class="mt-5 text-primary font-bold">
              {{ HelpersUtil.priceFormat(product.price) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import noPhotoImage from '@/assets/images/no-photo.png';
import UserModel from '@/api/models/UserModel.js';
import { HelpersUtil } from '../helpers/index.js';
import { useRouter } from 'vue-router';

const products = ref([]);
const router = useRouter();

async function getProducts() {
  const res = await UserModel.getProducts();
  products.value = res.data;
}

const handleProductClick = (id) => {
  router.push(`/product/create?product_id=${id}`);
};

onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" module>
.img {
  aspect-ratio: 237 / 139;
}
</style>
