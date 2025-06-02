import DayJsAdapter from '@date-io/dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/id';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { en, id } from 'vuetify/locale';
import 'vuetify/styles';

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
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    defaults: {
      VTextField: {},
      VBtn: {
        color: 'primary',
      },
    },
    ssr: true,
  });

  nuxtApp.vueApp.use(vuetify);
});
