<template>
  <header class="border-bottom-1 border-gray-300">
    <div class="container flex align-items-center justify-content-between p-4">
      <RouterLink to="/" class="hidden md:inline">
        <img src="@/assets/images/logo.png" alt="logo" height="63" class="h-2rem" />
      </RouterLink>
      <Button
        class="md:hidden block"
        icon="pi pi-bars"
        severity="secondary"
        @click="showSidebar = !showSidebar"
      />
      <nav class="hidden md:inline">
        <ul class="flex align-items-center gap-5 list-none">
          <li v-for="link in navLinks" :key="link.id">
            <RouterLink
              :to="link.to"
              exact-active-class="text-primary"
              class="text-black-alpha-90 hover:text-primary"
            >
              {{ link.text }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <RouterLink to="/" class="md:hidden inline">
        <img src="@/assets/images/logo.png" alt="logo" height="30" class="h-1rem" />
      </RouterLink>
      <HeaderUserButton />
    </div>
    <Sidebar v-model:visible="showSidebar">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">
          <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
            <RouterLink to="/" class="md:hidden inline">
              <img src="@/assets/images/logo.png" alt="logo" height="30" class="h-1rem" />
            </RouterLink>
            <span>
              <Button icon="pi pi-times" severity="secondary" text rounded @click="closeCallback" />
            </span>
          </div>

          <div class="overflow-y-auto">
            <PanelMenu :model="panelLinks">
              <template #item="{ item }">
                <router-link v-if="item.route" :to="item.route">
                  <span
                    v-ripple
                    class="flex align-items-center cursor-pointer px-3 py-2"
                    @click="closeCallback"
                  >
                    <span :class="`${item.icon} font-bold`" />
                    <span class="ml-2 font-bold">{{ item.label }}</span>
                  </span>
                </router-link>
                <span v-else v-ripple class="flex align-items-center cursor-pointer px-3 py-2">
                  <span :class="`${item.icon} font-bold`" />
                  <span class="ml-2 font-bold">{{ item.label }}</span>
                  <span v-if="item.items" class="pi pi-angle-down ml-auto" />
                </span>
              </template>
            </PanelMenu>
          </div>
          <span class="px-4 font-bold mt-2 pb-0 mb-2">Фильтры продуктов</span>
          <Divider class="mt-0 pt-0" />
          <div class="grid px-4">
            <div class="col-12 flex flex-column">
              <InputText
                id="product_name"
                v-model="form.product_name"
                placeholder="Введите название товара"
              />
            </div>
            <div class="flex flex-column md:col-6 col-12">
              <AppSelect
                id="category_id"
                v-model="form.category_id"
                placeholder="Выберите категорию"
                option-label="name"
                option-value="category_id"
                :custom-options="[
                  { category_id: 0, name: 'Все категорий' },
                  ...resources.categories
                ]"
              />
            </div>
            <div class="md:col-6 col-12 flex flex-column">
              <AppSelect
                id="manufacturer_id"
                v-model="form.manufacturer_id"
                placeholder="Выберите марку"
                option-label="name"
                option-value="manufacturer_id"
                :custom-options="[
                  { manufacturer_id: 0, name: 'Все марки' },
                  ...resources.manufacturer
                ]"
              />
            </div>
            <div class="md:col-6 col-12 flex flex-column">
              <AppSelect
                id="model_id"
                v-model="form.model_id"
                placeholder="Выберите модель авто"
                option-label="model_name"
                option-value="model_id"
                :custom-options="[{ model_id: 0, model_name: 'Все модели' }, ...car_models]"
              />
            </div>
            <Button class="mt-5 w-full md:w-max" label="Искать" @click="handleSearchClick" />
          </div>
        </div>
      </template>
    </Sidebar>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import HeaderUserButton from '@/components/HeaderUserButton.vue';
import PanelMenu from 'primevue/panelmenu';
import { useUserStore } from '@/stores/useUserStore.js';
import ProductsModel from '@/api/models/ProductsModel';
import Divider from 'primevue/divider';
import AppSelect from '@/components/AppSelect.vue';

const userStore = useUserStore();
const router = useRouter();

const panelMenu = [{ label: 'Главная', icon: 'pi pi-home', route: '/' }];

const headerMenu = [
  { id: 1, text: 'Главная', to: '/' },
  { id: 2, text: 'Каталог продуктов', to: '/products' },
  { id: 4, text: 'Контакты', to: '/contacts' }
];

const navLinks = computed(() =>
  !userStore.isAuthenticated
    ? [...headerMenu, { id: 3, text: 'Стать продавцом', to: '/register' }]
    : [...headerMenu]
);

const panelLinks = computed(() =>
  !userStore.isAuthenticated
    ? [...panelMenu, { label: 'Стать продавцом', icon: 'pi pi-bookmark', route: '/register' }]
    : [...panelMenu]
);

const showSidebar = ref(false);

const form = ref({
  product_name: '',
  model_id: 0,
  manufacturer_id: 0,
  category_id: 0
});

const resources = ref({});
async function getProductResources() {
  const res = await ProductsModel.getProductResources();
  resources.value = res.data;
}
const car_models = computed(() =>
  resources.value.car_models
    ? form.value.manufacturer_id
      ? resources.value.car_models.filter((i) => i.manufacturer_id === form.value.manufacturer_id)
      : resources.value.car_models
    : []
);

const handleSearchClick = () => {
  router.push(
    `/products?${form.value.category_id ? '&category_id=' + form.value.category_id : ''}${form.value.manufacturer_id ? '&manufacturer_id=' + form.value.manufacturer_id : ''}${form.value.model_id ? '&model_id=' + form.value.model_id : ''}${form.value.product_name ? '&name=' + form.value.product_name : ''}`
  );
  showSidebar.value = !showSidebar.value;
};
onMounted(() => {
  getProductResources();
});
</script>

<style lang="scss" scoped>
.burger-menu {
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;

  span {
    width: 100%;
    height: 3px;
    background: #333;
    transition: all 0.3s ease-in-out;
  }

  &.active {
    span:first-child {
      transform: rotate(45deg) translate(2px, 2px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform: rotate(-45deg) translate(2px, -2px);
    }
  }
}
</style>
