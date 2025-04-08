import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import UserList from '../views/Users/ListUser.vue';
import RoleList from '../views/Roles/ListRole.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/users',
    name: 'Users',
    component: UserList,
    meta: { requiresAuth: true }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: RoleList,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route Guard: Prevent authenticated users from reaching the Login page.
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Or use your auth store if preferred.
  const isAuthenticated = !!token;

  // If trying to access Login and already authenticated, redirect to Users page.
  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Users' });
  }
  // If route requires authentication and user is not authenticated, redirect to Login.
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
