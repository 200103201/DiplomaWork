<template>
  <RouterLink v-if="!isAuthenticated" to="/login">
    <Button icon="pi pi-user" severity="primary" aria-label="User" />
  </RouterLink>
  <template v-else>
    <Button
      icon="pi pi-user"
      severity="secondary"
      aria-label="User"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="toggle"
    />
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </template>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore.js';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserModel from '@/api/models/UserModel.js';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const { isAuthenticated } = storeToRefs(userStore);

const menu = ref(null);
const profileMenu = [
  {
    label: 'Мой профиль',
    items: [
      {
        label: 'Мои товары',
        icon: 'pi pi-box',
        route: '/profile/products'
      },
      {
        label: 'Настройки',
        icon: 'pi pi-cog',
        route: '/profile'
      },
      {
        label: 'Выйти из аккаунта',
        icon: 'pi pi-sign-out',
        command: logout
      }
    ]
  }
];
const items = computed(() =>
  userStore.isEmailVerified
    ? [...profileMenu]
    : [
        ...profileMenu,
        {
          label: 'Подтверждение почты',
          icon: 'pi pi-inbox',
          command: emailVerify
        }
      ]
);

function logout() {
  userStore.logout();
  router.push('/login');
}

async function emailVerify() {
  const res = await UserModel.emailVerify();
  toast.add({
    severity: 'success',
    summary: res.message,
    life: 3000
  });
}

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<style lang="scss" scoped></style>
