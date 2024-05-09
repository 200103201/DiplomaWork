<script setup>
import { provide, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

const router = useRouter();

const layouts = {
  MainLayout,
  EmptyLayout
};

const layout = shallowRef('div');

router.afterEach((to) => (layout.value = layouts[to.meta.layout] || layouts.EmptyLayout));

provide('app: layout', layout);
</script>

<template>
  <main class="h-full">
    <component :is="layout ?? 'EmptyLayout'" />
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/main';
@import 'primeicons/primeicons.css';
@import 'primeflex/primeflex.css';

#app {
  height: 100%;
}
</style>
