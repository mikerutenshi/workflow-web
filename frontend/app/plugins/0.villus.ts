import { multipart } from '@villus/multipart';
import { useRequestHeaders } from 'nuxt/app';
import { createClient, defaultPlugins } from 'villus';

const parseCookieHeader = (value?: string) => {
  return (value || '')
    .split(';')
    .reduce((out: Record<string, string>, part) => {
      const pair = part.split('=');
      if (pair[0] && pair[1]) {
        out[pair[0].trim()] = pair[1].trim();
      }
      return out;
    }, {});
};

const addHeadersPlugin =
  //prettier-ignore
  (cookie?: string) => (
  ({ opContext }: { opContext: any }) => {
    opContext.credentials = "include";
    const cookiesParsed = parseCookieHeader(cookie);
    opContext.headers['apollo-require-preflight'] = 'true';

    if (cookiesParsed.jwt) {
      opContext.headers.Authorization = `Bearer ${cookiesParsed.jwt}`;
    }

  });

export default defineNuxtPlugin((nuxtApp) => {
  const baseUrl = nuxtApp.$config.public.baseUrl as string;
  // const cookie = nuxtApp.ssrContext?.event?.node?.req?.headers?.cookie;
  const cookie = useRequestHeaders(['cookie']).cookie;

  const client = createClient({
    url: baseUrl,
    use: [addHeadersPlugin(cookie), multipart(), ...defaultPlugins()],
  });

  nuxtApp.vueApp.use(client);
});
