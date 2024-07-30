import { createRouter, createWebHistory } from 'vue-router';
import listing from '../views/listing.vue';
import  carDetail from '../views/carDetail.vue';

const routes = [
  {
    path: '/',
    name: 'listing',
    component: listing
  },
  {
    path: '/detail/:id',
      name: 'carDetail',
      component: carDetail
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;