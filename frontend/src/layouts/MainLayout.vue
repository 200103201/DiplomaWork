<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <Toast class="hidden md:block" />
  <Toast class="md:hidden block" position="top-center" />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Toast from 'primevue/toast';
</script>

<style lang="scss" scoped></style>
