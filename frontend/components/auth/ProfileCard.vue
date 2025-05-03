<template>
  <v-card v-if="authStore.user">
    <v-card-title class="text-center">
      {{
        `${$t(greeting)} ${authStore.user.firstName} ${authStore.user.lastName}`
      }}
    </v-card-title>
    <v-card-text>
      <!-- <ActionCheckMe /> -->
      <v-list class="text-center">
        <v-list-item> {{ `Email: ${authStore.user.email}` }}</v-list-item>
      </v-list>
      <v-select
        label="Select language"
        :items="locales"
        item-title="name"
        item-value="code"
        v-model="selectedLocale"
        @update:model-value="setLocale(selectedLocale)"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <v-img
                :src="item.raw.avatar"
                aspect-ratio="4/3"
                width="30"
                class="mr-4"
              ></v-img>
            </template>
          </v-list-item>
        </template>

        <template v-slot:selection="{ item }">
          <v-img :src="item.raw.avatar" aspect-ratio="4/3" width="30"></v-img>
          <span class="ml-4">{{ item.raw.name }}</span>
        </template>
      </v-select>
      <ActionLogOut class="mt-2" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import indonesia from '@/assets/images/id.svg';
import us from '@/assets/images/us.svg';

const authStore = useAuthStore();
const { locale, setLocale } = useI18n({ useScope: 'global' });

const locales = [
  {
    code: 'en',
    name: 'English',
    avatar: us,
  },
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    avatar: indonesia,
  },
  {
    code: 'su',
    name: 'Basa Sunda',
    avatar: indonesia,
  },
];
const selectedLocale = ref(locale.value);
const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'greeting.morning';
  } else if (hour < 18) {
    return 'greeting.afternoon';
  } else {
    return 'greeting.evening';
  }
});

// bypass login
// const { data, isFetching, execute, error } = useMutation(LogInDocument);
// execute({ data: { email: 'admin@email.com', password: 'KataKunci>2025' } });

// watch(data, (loginData) => {
//   if (loginData?.logIn) {
//     authStore.user = loginData.logIn;
//   }
// });
</script>
