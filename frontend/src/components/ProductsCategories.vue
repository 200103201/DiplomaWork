<template>
  <aside>
    <router-link
      class="inline-block mb-5 text-sm cursor-pointer text-gray-400"
      :to="{ path: '/products', query: {} }"
    >
      Сбросить фильтры
    </router-link>
    <template v-for="resource in resources" :key="resource.title">
      <div v-if="resource.isShown" class="mb-3">
        <div v-if="resource.items.length" class="text font-bold mb-4">
          {{ resource.title }}
        </div>
        <ul class="flex flex-column gap-3">
          <li v-for="item in resource.items" :key="item[resource.query[0]]">
            <RouterLink
              class="hover:text-primary"
              :class="{
                'text-primary':
                  route.query[resource.query[0]] === item[resource.query[0]]?.toString()
              }"
              :to="{
                path: '/products',
                query: {
                  ...route.query,
                  ...resource.query.reduce((a, v) => ({ ...a, [v]: item[v] }), {})
                }
              }"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </template>
  </aside>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProductsModel from '@/api/models/ProductsModel.js';

const route = useRoute();

const categories = ref([]);
const manufacturers = ref([]);
const carModels = ref([]);
const generations = ref([]);

const resources = computed(() => [
  {
    isShown: true,
    title: 'Категории',
    query: ['category_id', 'category_name'],
    items: categories.value.map((c) => ({ ...c, label: c.name }))
  },
  {
    isShown: true,
    title: 'Производители',
    query: ['manufacturer_id'],
    items: manufacturers.value.map((m) => ({ ...m, label: m.name }))
  },
  {
    isShown: !!route.query.manufacturer_id,
    title: 'Модели',
    query: ['model_id'],
    items: carModels.value
      .filter((model) => model.manufacturer_id.toString() === route.query.manufacturer_id)
      .map((m) => ({ ...m, label: m.model_name }))
  },
  {
    isShown: !!route.query.model_id,
    title: 'Поколения',
    query: ['generation_id'],
    items: generations.value
      .filter((gen) => gen.model_id.toString() === route.query.model_id)
      .map((g) => ({ ...g, label: `${g.start_year} - ${g.end_year}` }))
  }
]);

async function getProductResources() {
  const res = await ProductsModel.getProductResources();
  categories.value = res.data.categories;
  manufacturers.value = res.data.manufacturer;
  carModels.value = res.data.car_models;
  generations.value = res.data.generations;
}

onMounted(() => {
  getProductResources();
});
</script>

<style lang="scss" scoped></style>
