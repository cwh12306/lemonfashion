import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home.vue';
import Detail from '../views/detail.vue';
import Category from '../views/category.vue';

Vue.use(Router);
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
];

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;