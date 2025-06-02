<template>
  <v-app>
    <v-app-bar ref="appBar" :elevation="2" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>

      <NuxtLink
        v-if="pagesWithCreate.includes(currentRouteName as string)"
        :to="createBtn.route"
        class="mr-4"
      >
        <v-btn variant="flat">
          <v-icon left :icon="mdiPlus"></v-icon>
          {{ createBtn.title }}
        </v-btn>
      </NuxtLink>

      <v-btn
        v-if="currentRouteName == 'works' && clearance <= Role.Planner"
        variant="flat"
        class="mr-4"
        @click="worksStore.openFormDialog()"
      >
        <v-icon left :icon="mdiPlus"></v-icon>
        {{ t('create_btn.work') }}
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <template v-for="(navItem, index) in navItems" :key="index">
          <v-list-item
            :to="navItem.route"
            router
            :title="navItem.title"
            slim
            :prepend-icon="navItem.icon"
          >
            <template #prepend
              ><v-icon :icon="navItem.icon"></v-icon>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  mdiCalculator,
  mdiCashRegister,
  mdiChartTimeline,
  mdiFaceMan,
  mdiHome,
  mdiShoeFormal,
  mdiPlus,
} from '@mdi/js';
import { Role } from '~/utils/constants';

const worksStore = useWorksStore();
const drawer = ref(false);
const createBtn = reactive({
  title: '',
  route: '',
});

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const closeDrawer = () => {
  drawer.value = false;
};

const { t } = useI18n();
const localePath = useLocalePath();

const authStore = useAuthStore();
const clearance = authStore.user?.role.clearanceLevel ?? 6;
const navItems = computed(() => {
  if (clearance <= Role.Finance) {
    return [
      { title: t('nav.home'), route: localePath('/'), icon: mdiHome },
      {
        title: t('nav.payroll'),
        route: localePath('/payroll'),
        icon: mdiCashRegister,
      },
      {
        title: t('nav.production_status'),
        route: localePath('/works'),
        icon: mdiChartTimeline,
      },
      {
        title: t('nav.products'),
        route: localePath('/products'),
        icon: mdiShoeFormal,
      },
      {
        title: t('nav.labor_costs'),
        route: localePath('/labor-costs'),
        icon: mdiCalculator,
      },
      {
        title: t('nav.artisans'),
        route: localePath('/artisans'),
        icon: mdiFaceMan,
      },
    ];
  } else if (clearance <= Role.Planner) {
    return [
      { title: t('nav.home'), route: localePath('/'), icon: mdiHome },
      {
        title: t('nav.production_status'),
        route: localePath('/works'),
        icon: mdiChartTimeline,
      },
      {
        title: t('nav.payroll'),
        route: localePath('/payroll'),
        icon: mdiCashRegister,
      },
      {
        title: t('nav.products'),
        route: localePath('/products'),
        icon: mdiShoeFormal,
      },
      {
        title: t('nav.artisans'),
        route: localePath('/artisans'),
        icon: mdiFaceMan,
      },
    ];
  } else if (clearance <= Role.Field) {
    return [
      { title: t('nav.home'), route: localePath('/'), icon: mdiHome },
      {
        title: t('nav.production_status'),
        route: localePath('/works'),
        icon: mdiChartTimeline,
      },
      {
        title: t('nav.artisans'),
        route: localePath('/artisans'),
        icon: mdiFaceMan,
      },
      {
        title: t('nav.products'),
        route: localePath('/products'),
        icon: mdiShoeFormal,
      },
    ];
  }
});

const route = useRoute();
const routeBaseName = useRouteBaseName();
const currentRouteName = computed(() => {
  return routeBaseName(route.name ?? '');
});
const pageTitle = computed(() => t(route.meta.title as string));

const pagesWithCreate = shallowRef([
  'products',
  'colors',
  'product-groups',
  'product-categories',
  'artisans',
  // 'works',
]);

// if (clearance >= Role.Field)
//   pagesWithCreate.value = [
//     'products',
//     'colors',
//     'product-groups',
//     'product-categories',
//     'artisans',
//   ];

watch(
  currentRouteName,
  (newName) => {
    switch (newName) {
      case 'products': {
        createBtn.route = localePath('/products/create');
        createBtn.title = t('create_btn.product');
        break;
      }

      case 'colors': {
        createBtn.route = localePath('/colors/create');
        createBtn.title = t('create_btn.color');
        break;
      }

      case 'product-groups': {
        createBtn.route = localePath('/product-groups/create');
        createBtn.title = t('create_btn.product_group');
        break;
      }

      case 'product-categories': {
        createBtn.route = localePath('/product-categories/create');
        createBtn.title = t('create_btn.product_category');
        break;
      }

      case 'artisans': {
        createBtn.route = localePath('/artisans/create');
        createBtn.title = t('create_btn.artisan');
        break;
      }

      case 'works': {
        createBtn.route = localePath('/works/create');
        createBtn.title = t('create_btn.work');
        break;
      }

      default:
        createBtn.route = '';
        createBtn.title = '';
        break;
    }
  },
  { immediate: true }
);

useHead({
  title: pageTitle,
});
</script>
