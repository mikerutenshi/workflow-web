import DayJsAdapter from '@date-io/dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/id';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { en, id } from 'vuetify/locale';
import 'vuetify/styles';

export default defineNuxtPlugin((nuxtApp) => {
  const myCustomLightTheme = {
    dark: false,
    colors: {
      background: '#FAFAFA',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#c7d8de',
      'surface-variant': '#487955',
      'on-surface-variant': '#EEEEEE',
      primary: '#795548',
      'primary-darken-1': '#5d4037',
      secondary: '#86515c',
      'secondary-darken-1': '#683c47',
      error: '#B71C1C',
      info: '#547b8a',
      success: '#61ac76',
      warning: '#c1bd5d',
    },
  };
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      },
    },
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
