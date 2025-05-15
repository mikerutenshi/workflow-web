import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import { VDateInput } from 'vuetify/labs/components';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import DayJsAdapter from '@date-io/dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/id';
import { id, en } from 'vuetify/locale';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    locale: {
      locale: 'id',
      fallback: 'en',
      messages: { id, en },
    },
    date: {
      adapter: DayJsAdapter,
      locale: {
        id: 'id',
        en: 'en',
        su: 'id',
      },
    },
    components: {
      VDateInput,
    },
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
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
