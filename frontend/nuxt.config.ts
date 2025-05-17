// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { fileURLToPath, URL } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  // devServer: {
  //   host: '0.0.0.0',
  // },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    '@nuxtjs/i18n',
    '@vee-validate/nuxt',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'id', name: 'Indonesian', file: 'id.json' },
      { code: 'su', name: 'Sundanese', file: 'su.json' },
    ],
  },
  components: true,
  css: [
    'vuetify/lib/styles/main.sass',
    // '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/variables.sass" as *' + '\n',
        },
      },
    },
    vue: {
      template: { transformAssetUrls },
    },
  },
  sourcemap: true,
  alias: {
    '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
  },
});
