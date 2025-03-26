import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
    },
    defaults: {
      VTextField: {
        density: 'compact',
        variant: 'outlined',
      },
      VBtn: {
        color: 'primary',
      },
    },
    ssr: true,
  });

  nuxtApp.vueApp.use(vuetify);
});
