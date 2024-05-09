<script setup>
import { computed } from 'vue';

const socialLinks = computed(() => [
  { name: 'Instagram', icon: 'pi pi-instagram', to: 'https://www.instagram.com' },
  { name: 'Twitter', icon: 'pi pi-twitter', to: 'https://www.twitter.com' },
  { name: 'Facebook', icon: 'pi pi-facebook', to: 'https://www.facebook.com' },
  { name: 'Youtube', icon: 'pi pi-youtube', to: 'https://www.youtube.com' },
  { name: 'Linkedin', icon: 'pi pi-linkedin', to: 'https://www.linkedin.com' }
]);

const navLinks = computed(() => [
  {
    title: 'О нас',
    links: [
      {
        to: 'https://www.linkedin.com/in/zhandos-saparbayev-878478231',
        text: 'Zhandos Saparbayev'
      },
      { to: 'https://www.linkedin.com/in/serik-onbolsyn-146a94270', text: 'Serik Onbolsyn' },
      { to: 'https://www.instagram.com/dosjanovv_01?igsh=anZzMTVkbmxyY2pq', text: 'Umid Jubayev' },
      { to: 'https://www.instagram.com/sanzharaltynbaev', text: 'Sanzhar Altynbaev' }
    ]
  },
  {
    title: 'Партнерам',
    links: [
      { to: '/', text: 'Продавайте на KolikMarket' },
      { to: '/', text: 'Блог для продавца' }
    ]
  },
  {
    title: 'Помощь',
    links: [
      { to: '/', text: 'Поддержка' },
      { to: '/', text: 'Оплата' },
      { to: '/', text: 'Доставка' },
      { to: '/', text: 'Безопасность' }
    ]
  }
]);
</script>

<template>
  <footer class="bg-gray-50">
    <div class="pb-5 grid-nogutter grid container p-4">
      <div class="col">
        <RouterLink to="/">
          <img src="@/assets/images/logo.png" alt="logo" height="63" class="h-2rem" />
        </RouterLink>
        <div class="text-lg font-bold my-3">Мы в соцсетях</div>
        <ul class="list-none flex align-items-center gap-3">
          <li v-for="social in socialLinks" :key="social.name">
            <a :href="social.to" target="_blank">
              <i
                :class="social.icon"
                style="font-size: 1.25rem"
                class="p-2 border-round bg-gray-200 text-gray-700"
              />
            </a>
          </li>
        </ul>
      </div>
      <div
        class="col-12 md:col-7 flex justify-content-between flex-column md:flex-row gap-3 mt-5 md:mt-0"
      >
        <div v-for="link in navLinks" :key="link.title">
          <div class="text-lg font-bold text-black-alpha-90 pb-0 md:pb-4">{{ link.title }}</div>
          <ul>
            <li v-for="sublink in link.links" :key="sublink.text">
              <a
                v-if="sublink.to.includes('http')"
                :href="sublink.to"
                target="_blank"
                class="inline-block py-1 hover:text-primary text-black-alpha-70"
              >
                {{ sublink.text }}
              </a>
              <router-link
                v-else
                :to="sublink.to"
                class="inline-block py-1 hover:text-primary text-black-alpha-70"
              >
                {{ sublink.text }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-center p-4 border-top-1 border-gray-300">
      <div class="container">
        <span class="border-right-2 border-gray-500 pr-4 mr-4">Copyright © 2024 KolikMarket</span>
        <span class="border-right-2 border-gray-500 pr-4 mr-4">Все права защищены</span>
        <RouterLink
          to="/terms-and-conditions"
          class="inline-block border-right-2 border-gray-500 pr-4 mr-4"
        >
          Условия и Положения
        </RouterLink>
        <RouterLink to="/privacy-policy">Политика конфиденциальности</RouterLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
