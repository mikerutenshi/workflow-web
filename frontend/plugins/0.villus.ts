import { createClient, defaultPlugins } from "villus";

const parseCookieHeader = (value?: string) => {
  return (value || "")
    .split(";")
    .reduce((out: Record<string, string>, part) => {
      const pair = part.split("=");
      if (pair[0] && pair[1]) {
        out[pair[0]] = pair[1];
      }
      return out;
    }, {});
};

const addHeadersPlugin = (cookie?: string) => (opContext: any) => {
  opContext.credentials = "include";
  const cookiesParsed = parseCookieHeader(cookie);
  if (cookiesParsed.jwt) {
    opContext.headers.Authorization = `Bearer ${cookiesParsed.jwt}`;
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const baseUrl = nuxtApp.$config.public.baseUrl as string;
  const cookie = nuxtApp.ssrContext?.event?.node?.req?.headers?.cookie;

  const client = createClient({
    url: baseUrl,
    use: [addHeadersPlugin(cookie), ...defaultPlugins()],
  });

  nuxtApp.vueApp.use(client);
});
