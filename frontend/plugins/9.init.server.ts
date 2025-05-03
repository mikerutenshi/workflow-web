import { useQuery } from 'villus';
import { useAuthStore } from '@/stores/auth';
import { MeDocument } from '@/api/generated/types';
export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const { data, error } = await useQuery({ query: MeDocument });
  console.log(`nuxt ssr data: ${JSON.stringify(data.value)}`);
  console.log(`nuxt ssr error: ${JSON.stringify(error.value)}`);
  if (!error.value) {
    authStore.user = data.value!.me;
  }
});
