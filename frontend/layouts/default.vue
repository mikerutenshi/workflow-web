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

      <template v-slot:append v-if="currentPage == 'colors'">
        <NuxtLink to="colors/create">
          <v-btn> <v-icon left>mdi-plus</v-icon> New Color </v-btn>
        </NuxtLink>
      </template>

      <template v-slot:append v-if="currentPage == 'product-groups'">
        <NuxtLink to="product-groups/create">
          <v-btn> <v-icon left>mdi-plus</v-icon> New Product Group </v-btn>
        </NuxtLink>
      </template>

      <template v-slot:append v-if="currentPage == 'product-categories'">
        <NuxtLink to="product-categories/create">
          <v-btn> <v-icon left>mdi-plus</v-icon> New Product Category </v-btn>
        </NuxtLink>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list dense>
        <template v-for="(navItem, index) in navItems" :key="index">
          <v-list-group v-if="navItem.children">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-avatar class="d-inline mr-4">
                  <v-icon>{{ navItem.icon }}</v-icon>
                </v-avatar>
                <v-list-item-title class="d-inline">{{
                  navItem.title
                }}</v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              v-for="(child, childIndex) in navItem.children"
              :key="childIndex"
              :to="child.route"
              router
            >
              <div>
                <v-avatar class="d-inline mr-4">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-avatar>
                <v-list-item-title class="d-inline">{{
                  child.title
                }}</v-list-item-title>
              </div>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :to="navItem.route" router>
            <v-avatar class="d-inline mr-4">
              <v-icon>{{ navItem.icon }}</v-icon>
            </v-avatar>
            <v-list-item-title class="d-inline">{{
              navItem.title
            }}</v-list-item-title>
          </v-list-item>
        </template>
        <!-- <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.route"
          router
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-avatar>
        </v-list-item> -->
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
  {
    title: 'Products',
    icon: 'mdi-shoe-formal',
    children: [
      { title: 'All Products', route: '/products', icon: 'mdi-shoe-formal' },
      {
        title: 'All Product Groups',
        route: '/product-groups',
        icon: 'mdi-basket',
      },
      {
        title: 'All Product Categories',
        route: '/product-categories',
        icon: 'mdi-shape',
      },
      { title: 'All Colors', route: '/colors', icon: 'mdi-palette' },
    ],
  },
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
