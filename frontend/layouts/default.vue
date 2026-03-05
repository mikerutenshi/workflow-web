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
        {{ $t('btn.print') }}</v-btn
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

const dialogStore = useDialogStore();
const appBarStore = useAppBarStore();
const drawer = ref(false);
const createBtn = reactive({
  title: '',
  route: '',
});
const createBtnTitles: Record<string, string> =
  clearance.value > Role.Superuser
    ? {
        works: 'btn.work',
        products: 'btn.product',
        artisans: 'btn.artisan',
        'setting-colors': 'btn.color',
      }
    : {
        works: 'btn.work',
        products: 'btn.product',
        artisans: 'btn.artisan',
        'inv-trfs': 'btn.inv_trf',
        sales: 'btn.sale',
        'setting-inventories': 'btn.inventory',
        'setting-colors': 'btn.color',
      };

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const closeDrawer = () => {
  drawer.value = false;
};

const navItems = computed(() => {
  if (clearance.value <= Role.Finance) {
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
        route: localePath('/inv-trfs'),
        icon: mdiTransfer,
      },
      {
        title: t('nav.sales'),
        route: localePath('/sales'),
        icon: mdiPrinterPos,
      },
      {
        title: t('nav.setting'),
        route: localePath('/setting'),
        icon: mdiCogs,
        children: [
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
  } else if (clearance.value <= Role.Planner) {
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
        route: localePath('/inv-trfs'),
        icon: mdiTransfer,
      },
      {
        title: t('nav.payroll'),
        route: localePath('/payroll'),
        icon: mdiCashMultiple,
      },
      {
        title: t('nav.setting'),
        route: localePath('/setting'),
        icon: mdiCogs,
        children: [
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
  } else if (clearance.value <= Role.Field) {
    return [
      { title: t('nav.home'), route: localePath('/'), icon: mdiHome },
      {
        title: t('nav.production_status'),
        route: localePath('/works'),
        icon: mdiFactory,
      },
      {
        title: t('nav.setting'),
        route: localePath('/setting'),
        icon: mdiCogs,
        children: [
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
        ],
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
