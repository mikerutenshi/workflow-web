import { createClient, defaultPlugins } from 'villus';
import { useRequestHeaders } from 'nuxt/app';

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
    // console.log(`Cookie: ${JSON.stringify(cookie)}}`);
    const cookiesParsed = parseCookieHeader(cookie);
    // console.log(`Cookies parsed: ${JSON.stringify(cookiesParsed)}}`);
    if (cookiesParsed.jwt) {
      // console.log(`add header jwt ${cookiesParsed.jwt}`);
      opContext.headers.Authorization = `Bearer ${cookiesParsed.jwt}`;
    }
  });

export default defineNuxtPlugin((nuxtApp) => {
  const baseUrl = nuxtApp.$config.public.baseUrl as string;
  // const cookie = nuxtApp.ssrContext?.event?.node?.req?.headers?.cookie;
  const cookie = useRequestHeaders(['cookie']).cookie;

  const client = createClient({
    url: baseUrl,
    use: [addHeadersPlugin(cookie), ...defaultPlugins()],
  });

  nuxtApp.vueApp.use(client);
});
