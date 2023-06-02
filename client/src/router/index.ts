import { createRouter, createWebHistory } from 'vue-router';
// Custom
import DashboardView from '../views/home/DashboardView.vue';
import axios from '../utils/api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active-route",
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/guest/LoginView.vue"),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/guest/RegisterView.vue"),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import("../views/home/DashboardView.vue"),
      meta: {
        requireAuth: true,
        layout: DashboardView
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: () => import("../views/NotFound.vue")
    }
  ]
});

// Navigation Guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    try {
      await axios.get(import.meta.env.VITE_API_URL + "/auth/check-authentication");
    } catch (e) {
      router.push("/login");
    }
  }
  next();
});

export default router;
