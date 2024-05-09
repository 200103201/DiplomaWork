import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes.js';
import { useUserStore } from '@/stores/useUserStore.js';
import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  next();
  return;
  const userStore = useUserStore();
  const { isAuthenticated } = storeToRefs(userStore);

  if (to.meta.authRequired && !isAuthenticated.value) {
    next('/login');
  } else if (!to.meta.authRequired && isAuthenticated.value) {
    next('/');
  } else {
    next();
  }
});

export default router;
