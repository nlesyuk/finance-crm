import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { layout: 'main' },
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'empty' },
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main' },
      component: () => import('@/views/Categories.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main' },
      component: () => import('@/views/Profile.vue'),
    },
    {
      path: '/planing',
      name: 'planing',
      meta: { layout: 'main' },
      component: () => import('@/views/Planing.vue'),
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main' },
      component: () => import('@/views/Record.vue'),
    },
    {
      path: '/detailrecord',
      name: 'detailrecord',
      meta: { layout: 'main' },
      component: () => import('@/views/DetailRecord.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main' },
      component: () => import('@/views/History.vue'),
    },
  ],
});
