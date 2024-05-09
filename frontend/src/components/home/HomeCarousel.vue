<template>
  <Carousel
    :value="bannerItems"
    :num-visible="1"
    :show-navigators="false"
    :autoplay-interval="5000"
    circular
    class="md:hidden block"
  >
    <template #item="slotProps">
      <div class="flex flex-column align-items-center justify-content-center my-3">
        <div class="py-0 px-5 mb-3 text-center">
          <div class="text-xl font-bold">{{ slotProps.data.title }}</div>
          <div class="text-sm mt-3">{{ slotProps.data.subtitle }}</div>
        </div>
        <Image :src="slotProps.data.img" class="px-auto" alt="banner image" width="100%" />
      </div>
    </template>
  </Carousel>
  <Carousel
    :value="bannerItems"
    :num-visible="1"
    :num-scroll="1"
    :autoplay-interval="5000"
    circular
    class="hidden md:block my-3"
  >
    <template #item="slotProps">
      <div class="flex align-items-center">
        <div class="p-5">
          <div class="text-3xl font-bold">{{ slotProps.data.title }}</div>
          <div class="text-md mt-3">{{ slotProps.data.subtitle }}</div>
        </div>
        <Image :src="slotProps.data.img" alt="banner image" width="500px" />
      </div>
    </template>
  </Carousel>
</template>

<script setup>
import { computed } from 'vue';
import Image from 'primevue/image';
import bannerImg1 from '@/assets/images/banners/banner-1.jpeg';
import bannerImg2 from '@/assets/images/banners/banner-2.jpeg';
import bannerImg3 from '@/assets/images/banners/banner-3.jpg';

const bannerItems = computed(() => [
  {
    img: bannerImg1,
    title: 'Откройте новые горизонты в мире автомобилей.',
    subtitle:
      'Ваша мечта о новом автомобиле становится реальностью. Исследуйте наш множество вариантов и выберите свой идеальный путь.'
  },
  {
    img: bannerImg2,
    title: 'Найдите свой следующий автомобиль в один клик.',
    subtitle:
      'Наши предложения помогут вам найти идеальный автомобиль по выгодной цене. Перед вами мир возможностей на колесах.'
  },
  {
    img: bannerImg3,
    title: 'Откройте двери к лучшим автомобильным сделкам.',
    subtitle:
      'Наш маркетплейс предлагает широкий выбор автомобилей от проверенных продавцов. Найдите свой идеальный автомобиль с нами.'
  }
]);
</script>

<style lang="scss" scoped></style>
