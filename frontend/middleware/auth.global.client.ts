import { useQuery } from 'villus';
import { MeDocument } from '~/api/generated/types';
import { CACHE_ME } from '~/utils/cache-tags';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  const { data, error } = await useQuery({
    query: MeDocument,
    tags: [CACHE_ME],
  });

  if (!error.value) {
    authStore.user = data.value!.me;
  }
  const isAuthenticated = !!authStore.user;

  const localePath = useLocalePath();
  if (!isAuthenticated && to.path !== localePath('/login')) {
    return navigateTo(localePath('/login'));
  } else if (isAuthenticated && to.path === localePath('/login')) {
    return navigateTo(localePath('/'));
  }
});
