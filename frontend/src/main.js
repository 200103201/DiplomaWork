import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple';

import App from './App.vue';
import router from './router';
import pinia from '@/stores/index.js';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.directive('ripple', Ripple);

app.mount('#app');
