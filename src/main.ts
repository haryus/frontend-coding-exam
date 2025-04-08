// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/global.css';

import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
