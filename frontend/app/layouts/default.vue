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
          createBtnTitles.includes(String(currentRouteName)) &&
          clearance <= Role.Planner
        "
        variant="flat"
        class="mr-4"
        @click="appBarStore.openFormDialog()"
      >
        <v-icon left :icon="mdiPlus"></v-icon>
        {{ t(`btn.${String(currentRouteName)}`) }}
      </v-btn>

      <v-btn
        v-if="currentRouteName == 'payroll' && clearance <= Role.Planner"
        variant="flat"
        class="mr-4"
        @click="appBarStore.isPrintClicked = true"
        :prepend-icon="mdiPrinter"
        :loading="appBarStore.isPrinting"
      >
        {{ $t('btn.print') }}</v-btn
      >

      <v-btn
        v-if="currentRouteName == 'products' && clearance <= Role.Planner"
        variant="flat"
        class="mr-4"
        @click="isUploadDialogOpen = true"
        :prepend-icon="mdiUpload"
        >Upload</v-btn
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
              slim
              :prepend-icon="child.icon"
            >
              <template #prepend>
                <v-icon :icon="child.icon"></v-icon>
              </template>
              <template #title>
                <span class="list-item-title">{{ child.title }}</span>
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
        <ActionLogOut></ActionLogOut>
      </template>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>

    <ActionEditItemDialog
      dialog-title="Upload"
      v-model="isUploadDialogOpen"
    >
      <ProductUploadForm @close-dialog="isUploadDialogOpen = false"></ProductUploadForm>
    </ActionEditItemDialog>
  </v-app>
</template>

<style scoped lang="sass">
.list-item-title
  white-space: normal
  word-break: break-word
</style>

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
  mdiPrinterPos,
  mdiShoeSneaker,
  mdiTransfer,
  mdiUpload,
  mdiWarehouse,
} from '@mdi/js';
import { useQuery } from 'villus';
import { useRoute } from 'vue-router';
import { MeDocument } from '~/api/generated/types';
import { Role } from '~/utils/constants';

const authStore = useAuthStore();
const { t } = useI18n();
const localePath = useLocalePath();

const { data, error } = await useQuery({
  query: MeDocument,
  tags: [CACHE_ME],
  onData(data) {
    authStore.user = data.me;
    console.log(`Me => ${JSON.stringify(data.me)}`);
  },
  onError(err) {
    console.log(`Error => ${JSON.stringify(err)}`);
    // navigateTo(localePath('/login'));
  },
});

// if (!error.value) {
//   authStore.user = data.value!.me;
//   console.log(`Me => ${JSON.stringify(data.value?.me)}`);
// } else {
//   console.log(`Error => ${JSON.stringify(error.value)}`);
//   navigateTo(localePath('/login'));
// }
const clearance = computed(() => authStore.user?.role.clearanceLevel ?? 6);

const appBarStore = useAppBarStore();
const isUploadDialogOpen = ref(false);
const drawer = ref(false);
// const createBtnTitles: Record<string, string> = {
//   works: 'btn.work',
//   products: 'btn.product',
//   artisans: 'btn.artisan',
//   'inv-trfs': 'btn.inv_trf',
//   sales: 'btn.sale',
//   'setting-inventories': 'btn.inventory',
//   'setting-colors': 'btn.color',
// };
const createBtnTitles = [
  'works',
  'products',
  'artisans',
  'inv-trfs',
  'sales',
  'setting-inventories',
  'setting-colors',
];

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const closeDrawer = () => {
  drawer.value = false;
};

type NavItemDef = {
  title: string;
  route?: string;
  icon: string;
  maxClearance: Role;
  children?: NavItemDef[];
};

type NavItem = {
  title: string;
  route?: string;
  icon: string;
  children?: NavItem[];
};

function filterNav(items: NavItemDef[], clearance: number): NavItem[] {
  return items
    .filter((item) => clearance <= item.maxClearance)
    .map((item) => {
      const children = item.children
        ? filterNav(item.children, clearance)
        : undefined;
      return {
        title: item.title,
        route: item.route,
        icon: item.icon,
        ...(children?.length ? { children } : {}),
      };
    })
    .filter((item) => item.route || item.children?.length);
}

const navItems = computed(() => {
  const config: NavItemDef[] = [
    {
      title: t('nav.home'),
      route: localePath('/'),
      icon: mdiHome,
      maxClearance: Role.Field,
    },
    {
      title: t('nav.payroll'),
      route: localePath('/payroll'),
      icon: mdiCashMultiple,
      maxClearance: Role.Planner,
    },
    {
      title: t('nav.production_status'),
      route: localePath('/works'),
      icon: mdiFactory,
      maxClearance: Role.Field,
    },
    {
      title: t('nav.inventory'),
      route: localePath('/inv-products'),
      icon: mdiWarehouse,
      maxClearance: Role.Superuser,
    },
    {
      title: t('nav.inventory_transfers'),
      route: localePath('/inv-trfs'),
      icon: mdiTransfer,
      maxClearance: Role.Superuser,
    },
    {
      title: t('nav.sales'),
      route: localePath('/sales'),
      icon: mdiPrinterPos,
      maxClearance: Role.Superuser,
    },
    {
      title: t('nav.setting'),
      route: localePath('/setting'),
      icon: mdiCogs,
      maxClearance: Role.Field,
      children: [
        {
          title: t('nav.products'),
          route: localePath('/products'),
          icon: mdiShoeSneaker,
          maxClearance: Role.Field,
        },
        {
          title: t('nav.labor_costs'),
          route: localePath('/labor-costs'),
          icon: mdiCalculator,
          maxClearance: Role.Finance,
        },
        {
          title: t('nav.artisans'),
          route: localePath('/artisans'),
          icon: mdiAccountWrench,
          maxClearance: Role.Field,
        },
        {
          title: t('nav.setting_inventories'),
          route: localePath('/setting/inventories'),
          icon: mdiWarehouse,
          maxClearance: Role.Superuser,
        },
        {
          title: t('nav.setting_colors'),
          route: localePath('/setting/colors'),
          icon: mdiPalette,
          maxClearance: Role.Planner,
        },
      ],
    },
  ];

  return filterNav(config, clearance.value);
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
