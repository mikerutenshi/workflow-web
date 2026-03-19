export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const loginCookie = useCookie('isLoggedIn');
  console.log(`login cookie => ${loginCookie.value}`);
  const isAuthenticated = !!(authStore.user || loginCookie.value);

  const localePath = useLocalePath();
  if (!isAuthenticated && to.path !== localePath('/login')) {
    return await navigateTo(localePath('/login'));
  } else if (isAuthenticated && to.path === localePath('/login')) {
    return await navigateTo(localePath('/'));
  }
});
