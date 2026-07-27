export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const loginCookie = useCookie('isLoggedIn');
  const isAuthenticated = !!(authStore.user || loginCookie.value);

  const localePath = useLocalePath();

  if (isAuthenticated && to.path === localePath('/login')) {
    return await navigateTo(localePath('/'));
  } else if (
    !isAuthenticated &&
    to.path !== localePath('/login') &&
    to.path !== localePath('/register')
  ) {
    return await navigateTo(localePath('/login'));
  }
});
