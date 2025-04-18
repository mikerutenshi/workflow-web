import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import { VDateInput } from 'vuetify/labs/components';
import 'vuetify/styles';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VDateInput,
    },
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
