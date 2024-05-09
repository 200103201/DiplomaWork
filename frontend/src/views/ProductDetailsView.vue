<template>
  <div class="container px-4 py-8">
    <div class="grid">
      <div class="md:col-6 col-12 flex justify-content-center align-items-center">
        <img
          :src="product?.photo || noPhotoImage"
          alt="product photo"
          class="block border-round-2xl"
          :class="$style.img"
        />
      </div>
      <div v-if="product != null" class="col">
        <div class="mb-3 flex align-items-center justify-content-between">
          <h1 class="font-bold md:text-3xl text-2xl inline-block m-0">
            {{ product.product_name }}
          </h1>
          <span class="text-gray-400 flex align-items-center justify-content-between">
            <i class="pi pi-eye mr-1" style="font-size: 1.25rem" />
            <span>{{ product.views }}</span>
          </span>
        </div>
        <div class="font-semibold md:text-xl text-md mb-3">{{ product.product_category }}</div>
        <div class="font-semibold md:text-2xl text-xl">
          {{ HelpersUtil.priceFormat(product.price) }}
        </div>
        <p class="text-gray-400">{{ product.product_description }}</p>

        <a
          target="_blank"
          :href="
            `https://wa.me/${product.seller_phone}?text=` +
            'Здравствуйте!%0AПишу из приложения KolikMarket'
          "
          class="mt-5 w-full md:w-max mx-auto"
        >
          <Button class="mt-5 w-full md:w-max" label="Связаться с продавцом"></Button>
        </a>
      </div>
    </div>
    <ProductFeedbacks
      :product-id="product?.product_id || 0"
      :feedbacks="product?.feedbacks || []"
      class="mt-6"
      @on-add-new-feedback="getProductById"
    />
  </div>
</template>

<script setup>
import noPhotoImage from '@/assets/images/no-photo.png';
import { HelpersUtil } from '@/helpers/index.js';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ProductsModel from '@/api/models/ProductsModel.js';
import ProductFeedbacks from '@/components/ProductFeedbacks.vue';

const route = useRoute();

const product = ref(null);

async function getProductById() {
  const res = await ProductsModel.getProductById(route.params.productId);
  product.value = res.data;
}

onMounted(() => {
  getProductById();
});
</script>

<style lang="scss" module>
.img {
  width: 85%;
  aspect-ratio: 4 / 3;
}
</style>
