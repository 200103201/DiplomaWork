<script setup>
import HomeCarousel from '@/components/home/HomeCarousel.vue';
import HomeCategories from '@/components/home/HomeCategories.vue';
import HomeCarBrands from '@/components/home/HomeCarBrands.vue';
import carSellerImage from '@/assets/images/banners/car-seller.jpeg';
</script>

<template>
  <div class="container">
    <HomeCarousel class="my-8" />
    <HomeCategories class="mb-8" />
    <HomeCarBrands />
    <div class="flex flex-column md:flex-row justify-content-center gap-8 align-items-center my-8">
      <img
        :src="carSellerImage"
        width="500px"
        alt="car seller"
        class="border-round hidden md:block"
      />
      <img
        :src="carSellerImage"
        width="90%"
        alt="car seller"
        class="border-round md:hidden block"
      />
      <div class="md:w-30rem w-20rem flex flex-column align-items-center md:align-items-start">
        <div class="md:text-3xl text-xl font-bold text-center md:text-left">
          Увеличьте свою клиентскую базу с нами!
        </div>
        <div class="md:text-lg text-md my-5">
          Станьте частью нашего маркетплейса и получите доступ к тысячам потенциальных покупателей.
        </div>
        <Button
          ><router-link style="color: inherit; text-decoration: none" to="/register"
            >Стать продвацом</router-link
          ></Button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
