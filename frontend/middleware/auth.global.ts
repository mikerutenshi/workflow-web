export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  } else if (isAuthenticated && to.path === '/login') {
    return navigateTo('/');
  }
});
