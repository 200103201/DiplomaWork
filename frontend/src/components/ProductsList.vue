<template>
  <div>
    <div class="mb-5">
      <span class="text-xl mb-5 font-semibold">{{ title }}</span>
      <span class="ml-3 text-gray-400">Всего {{ products.length }} товаров</span>
    </div>
    <div v-if="!loading" class="grid">
      <RouterLink
        v-for="product in products"
        :key="product.product_id"
        :to="{ name: 'product.details', params: { productId: product.product_id } }"
        class="md:col-4 col-12"
      >
        <div class="flex flex-column gap-3 bg-gray-50 border-round p-3 h-full">
          <img
            :src="product.photo || noPhotoImage"
            alt="product photo"
            class="w-full"
            :class="$style.img"
          />
          <div class="font-bold">{{ product.product_name }}</div>
          <div class="overflow-hidden white-space-nowrap text-overflow-ellipsis">
            {{ product.product_description }}
          </div>
          <div>{{ HelpersUtil.priceFormat(product.price) }}</div>
          <!--          <Button-->
          <!--            class="mb-auto"-->
          <!--            :class="$style.cardBtn"-->
          <!--            size="small"-->
          <!--            label="Добавить в корзину"-->
          <!--            icon="pi pi-cart-arrow-down"-->
          <!--            @click.prevent="addToCart(product)"-->
          <!--          />-->
        </div>
      </RouterLink>
    </div>
    <div v-else class="grid">
      <div v-for="idx in 9" :key="idx" class="md:col-4 col-12 block">
        <div class="flex flex-column gap-3 bg-gray-50 border-round p-3 h-full">
          <Skeleton width="100" height="12rem" />
          <Skeleton width="10rem" class="mb-1" />
          <Skeleton width="100" class="mb-1" />
          <Skeleton width="5rem" class="mb-1" />
          <Skeleton height="2rem" class="mb-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useProductsStore } from '@/stores/useProductsStore.js';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import noPhotoImage from '@/assets/images/no-photo.png';
import { HelpersUtil } from '../helpers/index.js';
import useAsyncHandler from '@/composables/useAsyncHandler.js';

const productsStore = useProductsStore();

const { products } = storeToRefs(productsStore);

const { loading, executeAsyncOperation } = useAsyncHandler();

const route = useRoute();

const title = computed(() => route.query.category_name ?? 'Все продукты');

watch(
  () => route.fullPath,
  () => getProducts()
);

async function getProducts() {
  const params = route.query;
  await executeAsyncOperation(productsStore.getProducts, [params]);
}

onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" module>
.img {
  aspect-ratio: 230 / 167;
}

.cardBtn {
  justify-self: flex-end;
}
</style>
