<template>
  <v-app>
    <v-app-bar ref="appBar" :elevation="2" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>

      <v-btn
        v-if="
          currentRouteName &&
          currentRouteName in createBtnTitles &&
          clearance <= Role.Planner
        "
        variant="flat"
        class="mr-4"
        @click="dialogStore.openFormDialog()"
      >
        <v-icon left :icon="mdiPlus"></v-icon>
        {{ t(`${createBtnTitles[currentRouteName]}`) }}
      </v-btn>

      <v-btn
        v-if="currentRouteName == 'payroll' && clearance <= Role.Planner"
        variant="flat"
        class="mr-4"
        @click="appBarStore.isPrintClicked = true"
        :prepend-icon="mdiPrinter"
        :loading="appBarStore.isPrinting"
      >
        {{ $t('create_btn.print') }}</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <template v-for="(navItem, index) in navItems" :key="index">
          <v-list-group
            v-if="navItem.children"
            :value="true"
            :prepend-icon="navItem.icon"
            :title="navItem.title"
          >
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="navItem.title"
                slim
                :prepend-icon="navItem.icon"
              >
                <template #prepend>
                  <v-icon :icon="navItem.icon"></v-icon>
                </template>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, childIndex) in navItem.children"
              :key="childIndex"
              :to="child.route"
              router
              :title="child.title"
              slim
              :prepend-icon="child.icon"
            >
              <template #prepend>
                <v-icon :icon="child.icon"></v-icon>
              </template>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :to="navItem.route"
            router
            :title="navItem.title"
            slim
            :prepend-icon="navItem.icon"
          >
            <template #prepend>
              <v-icon :icon="navItem.icon"></v-icon>
            </template>
          </v-list-item>
        </template>
      </v-list>
      <template #append>
        <div class="pa-4">
          <ActionLogOut></ActionLogOut>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {
  mdiAccountWrench,
  mdiCalculator,
  mdiCashMultiple,
  mdiCogs,
  mdiFactory,
  mdiHome,
  mdiPalette,
  mdiPlus,
  mdiPrinter,
  mdiShoeSneaker,
  mdiTransfer,
  mdiWarehouse,
} from '@mdi/js';
import { useRoute } from 'vue-router';
import { Role } from '~/utils/constants';

const authStore = useAuthStore();
const clearance = authStore.user?.role.clearanceLevel ?? 6;

const dialogStore = useDialogStore();
const appBarStore = useAppBarStore();
const drawer = ref(false);
const createBtn = reactive({
  title: '',
  route: '',
});
const createBtnTitles: Record<string, string> =
  clearance > Role.Superuser
    ? {
        works: 'create_btn.work',
        products: 'create_btn.product',
        artisans: 'create_btn.artisan',
        'setting-colors': 'create_btn.color',
      }
    : {
        works: 'create_btn.work',
        products: 'create_btn.product',
        artisans: 'create_btn.artisan',
        'inv-product-transfers': 'create_btn.inv_trf',
        'setting-inventories': 'create_btn.inventory',
        'setting-colors': 'create_btn.color',
      };

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const closeDrawer = () => {
  drawer.value = false;
};

const { t } = useI18n();
const localePath = useLocalePath();

const navItems = computed(() => {
  if (clearance <= Role.Finance) {
    return [
      { title: t('nav.home'), route: localePath('/'), icon: mdiHome },
      {
        title: t('nav.payroll'),
        route: localePath('/payroll'),
        icon: mdiCashMultiple,
      },
      {
        title: t('nav.production_status'),
        route: localePath('/works'),
        icon: mdiFactory,
      },
      {
        title: t('nav.inventory'),
        route: localePath('/inv-products'),
        icon: mdiWarehouse,
      },
      {
        title: t('nav.inventory_transfers'),
        route: localePath('/inv-product-transfers'),
        icon: mdiTransfer,
      },
      {
        title: t('nav.products'),
        route: localePath('/products'),
        icon: mdiShoeSneaker,
      },
      {
        title: t('nav.labor_costs'),
        route: localePath('/labor-costs'),
        icon: mdiCalculator,
      },
      {
        title: t('nav.artisans'),
        route: localePath('/artisans'),
        icon: mdiAccountWrench,
      },
      {
        title: t('nav.setting'),
        route: localePath('/setting'),
        icon: mdiCogs,
        children: [
          {
            title: t('nav.setting_inventories'),
            route: localePath('/setting/inventories'),
            icon: mdiWarehouse,
          },
          {
            title: t('nav.setting_colors'),
            route: localePath('/setting/colors'),
            icon: mdiPalette,
          },
        ],
      },
    ];
  } else if (clearance <= Role.Planner) {
    return [
      { title: t('nav.home'), route: localePath('/'), icon: mdiHome },
      {
        title: t('nav.production_status'),
        route: localePath('/works'),
        icon: mdiFactory,
      },
      {
        title: t('nav.inventory'),
        route: localePath('/inv-products'),
        icon: mdiWarehouse,
      },
      {
        title: t('nav.inventory_transfers'),
        route: localePath('/inv-product-transfers'),
        icon: mdiTransfer,
      },
      {
        title: t('nav.payroll'),
        route: localePath('/payroll'),
        icon: mdiCashMultiple,
      },
      {
        title: t('nav.products'),
        route: localePath('/products'),
        icon: mdiShoeSneaker,
      },
      {
        title: t('nav.artisans'),
        route: localePath('/artisans'),
        icon: mdiAccountWrench,
      },
      {
        title: t('nav.setting'),
        route: localePath('/setting'),
        icon: mdiCogs,
        children: [
          {
            title: t('nav.setting_inventories'),
            route: localePath('/setting/inventories'),
            icon: mdiWarehouse,
          },
          {
            title: t('nav.setting_colors'),
            route: localePath('/setting/colors'),
            icon: mdiPalette,
          },
        ],
      },
    ];
  } else if (clearance <= Role.Field) {
    return [
      { title: t('nav.home'), route: localePath('/'), icon: mdiHome },
      {
        title: t('nav.production_status'),
        route: localePath('/works'),
        icon: mdiFactory,
      },
      {
        title: t('nav.artisans'),
        route: localePath('/artisans'),
        icon: mdiAccountWrench,
      },
      {
        title: t('nav.products'),
        route: localePath('/products'),
        icon: mdiShoeSneaker,
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

useHead({
  title: pageTitle,
});
</script>
