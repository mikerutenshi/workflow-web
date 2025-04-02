<template>
  <v-app>
    <v-app-bar ref="appBar" :elevation="2" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ appBarTitle }}</v-app-bar-title>

      <template v-slot:append v-if="currentPage == 'products'">
        <NuxtLink to="products/create">
          <v-btn> <v-icon left>mdi-plus</v-icon> New Product </v-btn>
        </NuxtLink>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.route"
          router
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-avatar>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="pa-0 ma-0">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const closeDrawer = () => {
  drawer.value = false;
};

const navItems = [
  { title: 'Home', route: '/', icon: 'mdi-home' },
  { title: 'Products', route: '/products', icon: 'mdi-shoe-sneaker' },
  {
    title: 'Production Costs',
    route: '/labor-costs',
    icon: 'mdi-calculator',
  },
];

const appBarTitle = computed(() => {
  return route.meta.title || 'Workflow App';
});

const currentPage = computed(() => {
  return route.name;
});

useHead({
  title: appBarTitle.value,
});
</script>
