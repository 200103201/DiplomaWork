export default [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      layout: 'MainLayout'
    }
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    name: 'profile.products',
    path: '/profile/products',
    component: () => import('@/views/UserProductsView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    name: 'products',
    path: '/products',
    component: () => import('@/views/ProductsView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    name: 'product.create',
    path: '/product/create',
    component: () => import('@/views/ProductCreateView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    name: 'product.details',
    path: '/product/details/:productId',
    component: () => import('@/views/ProductDetailsView.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    name: 'reset-password',
    path: '/reset-password',
    component: () => import('@/views/ResetPassword.vue')
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    redirect: () => '/'
  }
];

