import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (_to, _from, saved) => saved || { top: 0 },
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: () => import('@/views/AboutView.vue') },
    { path: '/login', component: () => import('@/views/AuthView.vue'), meta: { guest: true } },
    {
      path: '/register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { guest: true },
    },
    { path: '/motorcycles', component: () => import('@/views/CatalogView.vue') },
    { path: '/motorcycles/:id(\\d+)', component: () => import('@/views/MotorcycleView.vue') },
    {
      path: '/favorites',
      component: () => import('@/views/FavoritesView.vue'),
      meta: { auth: true },
    },
    { path: '/news', component: () => import('@/views/NewsView.vue') },
    { path: '/news/:id(\\d+)', component: () => import('@/views/NewsDetailView.vue') },
    { path: '/community', component: () => import('@/views/CommunityView.vue') },
    {
      path: '/community/new',
      component: () => import('@/views/PostFormView.vue'),
      meta: { auth: true },
    },
    {
      path: '/community/:id(\\d+)/edit',
      component: () => import('@/views/PostFormView.vue'),
      meta: { auth: true },
    },
    { path: '/community/:id(\\d+)', component: () => import('@/views/PostView.vue') },
    { path: '/profile', component: () => import('@/views/ProfileView.vue'), meta: { auth: true } },
    {
      path: '/admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { auth: true, admin: true },
    },
    {
      path: '/categories/:slug',
      component: () => import('@/views/ReferenceView.vue'),
      meta: { reference: 'category' },
    },
    {
      path: '/technologies/:id(\\d+)',
      component: () => import('@/views/ReferenceView.vue'),
      meta: { reference: 'technology' },
    },
    {
      path: '/session-unavailable',
      component: () => import('@/views/StatusView.vue'),
      meta: { status: 'unavailable' },
    },
    {
      path: '/forbidden',
      component: () => import('@/views/StatusView.vue'),
      meta: { status: 'forbidden' },
    },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/StatusView.vue') },
  ],
})

router.beforeEach(authGuard)
export default router
