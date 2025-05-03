<template>
  <v-app>
    <v-app-bar ref="appBar" :elevation="2" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ appBarTitle }}</v-app-bar-title>

      <template
        v-slot:append
        v-if="currentPage && pagesWithCreate.includes(currentPage as string)"
      >
        <NuxtLink :to="createBtn.route">
          <v-btn>
            <v-icon left :icon="mdiPlus"></v-icon> {{ createBtn.title }}
          </v-btn>
        </NuxtLink>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <template v-for="(navItem, index) in navItems" :key="index">
          <!-- <v-list-group v-if="navItem.children">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="navItem.title"
                :prepend-icon="navItem.icon"
                slim
              >
              </v-list-item>
            </template>

            <v-list-item
              v-for="(child, childIndex) in navItem.children"
              :key="childIndex"
              :to="child.route"
              router
              :title="child.title"
              :prepend-icon="child.icon"
              slim
            >
            </v-list-item>
          </v-list-group> -->

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

    <v-main class="pa-0 ma-0">
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

const route = useRoute();

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

const navItems = [
  { title: 'Home', route: '/', icon: mdiHome },
  {
    title: 'Production Status',
    route: '/works',
    icon: mdiChartTimeline,
  },
  {
    title: 'Products',
    route: '/products',
    icon: mdiShoeFormal,
  },
  {
    title: 'Production Costs',
    route: '/labor-costs',
    icon: mdiCalculator,
  },
  {
    title: 'Artisans',
    route: '/artisans',
    icon: mdiFaceMan,
  },
  {
    title: 'Payroll',
    route: '/payroll',
    icon: mdiCashRegister,
  },
  // {
  //   title: 'Utility',
  //   icon: 'mdi-tools',
  //   children: [
  //     {
  //       title: 'Product Groups',
  //       route: '/product-groups',
  //       icon: 'mdi-basket',
  //     },
  //     {
  //       title: 'Product Categories',
  //       route: '/product-categories',
  //       icon: 'mdi-shape',
  //     },
  //     { title: 'Colors', route: '/colors', icon: 'mdi-palette' },
  //   ],
  // },
];

const appBarTitle = computed(() => {
  return route.meta.title || 'Workflow App';
});

const currentPage = computed(() => {
  return route.name;
});

const pagesWithCreate = [
  'products',
  'colors',
  'product-groups',
  'product-categories',
  'artisans',
  'works',
];

watch(
  () => route.name,
  (routeName) => {
    switch (routeName) {
      case 'products': {
        createBtn.route = 'products/create';
        createBtn.title = 'New Product';
        break;
      }

      case 'colors': {
        createBtn.route = 'colors/create';
        createBtn.title = 'New Color';
        break;
      }

      case 'product-groups': {
        createBtn.route = 'product-groups/create';
        createBtn.title = 'New Product Group';
        break;
      }

      case 'product-categories': {
        createBtn.route = 'product-categories/create';
        createBtn.title = 'New Product Category';
        break;
      }

      case 'artisans': {
        createBtn.route = 'artisans/create';
        createBtn.title = 'New Artisan';
        break;
      }

      case 'works': {
        createBtn.route = 'works/create';
        createBtn.title = 'New Work';
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

watch(
  () => appBarTitle.value,
  (newTitle) => {
    useHead({
      title: newTitle,
    });
  }
);
</script>
