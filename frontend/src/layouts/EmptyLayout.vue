<template>
  <RouterView />
  <Toast class="hidden md:block" />
  <Toast class="md:hidden block" position="top-center" />
</template>

<script setup>
import Toast from 'primevue/toast';
</script>
