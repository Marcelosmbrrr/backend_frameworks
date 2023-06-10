import { createRouter, createWebHistory } from 'vue-router';
// Custom
import HomeLayout from '../components/layout/home/HomeLayout.vue';
import GuestLayout from '../components/layout/guest/GuestLayout.vue';
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
        requireAuth: false,
        layout: GuestLayout
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/guest/RegisterView.vue"),
      meta: {
        requireAuth: false,
        layout: GuestLayout
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import("../views/home/DashboardView.vue"),
      meta: {
        requireAuth: true,
        layout: HomeLayout
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import("../views/home/UsersView.vue"),
      meta: {
        requireAuth: true,
        layout: HomeLayout
      }
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import("../views/home/RolesView.vue"),
      meta: {
        requireAuth: true,
        layout: HomeLayout
      },
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
      await axios.get(import.meta.env.VITE_API_URL + "/auth/verify-authentication");
    } catch (e) {
      localStorage.removeItem("app-user-data");
      router.push("/login");
    }
  }
  next();
});

export default router;
