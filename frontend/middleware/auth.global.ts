export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;

  const localePath = useLocalePath();
  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo(localePath('/login'));
  } else if (isAuthenticated && to.path === '/login') {
    return navigateTo(localePath('/'));
  }
});
