<template>
  <div>
    <div class="md:text-2xl text-xl font-semibold mb-6 text-center">Искать по марке автомобиля</div>
    <div class="grid mx-5 md:mx-0">
      <RouterLink
        v-for="manufacturer in manufacturers"
        :key="manufacturer.manufacturer_id"
        class="md:col-2 col-6 text-primary-500 uppercase"
        :to="{ path: '/products', query: { manufacturer_id: manufacturer.manufacturer_id } }"
      >
        {{ manufacturer.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ProductsModel from '@/api/models/ProductsModel.js';

const manufacturers = ref([]);

async function getManufacturers() {
  const res = await ProductsModel.getProductResources();
  manufacturers.value = res.data.manufacturer;
}

onMounted(() => {
  getManufacturers();
});
</script>

<style lang="scss" scoped></style>
