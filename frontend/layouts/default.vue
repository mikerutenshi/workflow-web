<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ appBarTitle }}</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
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

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const route = useRoute();

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const navItems = [
  { title: "Home", route: "/", icon: "mdi-home" },
  { title: "Products", route: "/products", icon: "mdi-eye" },
];

const appBarTitle = computed(() => {
  return route.meta.title || "Workflow App";
});

useHead({
  title: appBarTitle.value,
});
</script>
