<template>
  <v-app>
    <v-app-bar ref="appBar" :elevation="2" app>
      <template #prepend>
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
        @click="openCreateDialog()"
      >
        <v-icon left :icon="mdiPlus"></v-icon>
        {{ t(`btn.${String(currentRouteName)}`) }}
      </v-btn>

      <v-btn
        v-if="currentRouteName == 'payroll' && clearance <= Role.Planner"
        variant="flat"
        class="mr-4"
        @click="printPayroll()"
        :prepend-icon="mdiPrinter"
        :loading="isPayrollPrinting"
      >
        {{ $t('btn.print') }}</v-btn
      >

      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn
            v-if="currentRouteName == 'products' && clearance <= Role.Superuser"
            v-bind="props"
            variant="flat"
            class="mr-4"
            :prepend-icon="mdiFileCabinet"
          >
            Batch
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="openUploadDialog()"
            ><v-list-item-title>Upload</v-list-item-title>
          </v-list-item>
          <v-list-item @click="downloadProducts()"
            ><v-list-item-title>Download</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn
            v-if="
              currentRouteName == 'inv-products' && clearance <= Role.Superuser
            "
            v-bind="props"
            variant="flat"
            class="mr-4"
            :prepend-icon="mdiFileCabinet"
          >
            Batch
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="openInvUploadDialog()">
            <v-list-item-title>Upload</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
      :dialog-title="dialogTitle"
      v-model="dialog.isVisible"
    >
      <template v-if="dialog.content === DialogContent.CreateWork">
        <WorkCreateForm @close-dialog="handleDialogClose"></WorkCreateForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.CreateProduct">
        <ProductCreateForm
          @close-dialog="handleDialogClose"
        ></ProductCreateForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.CreateArtisan">
        <ArtisanCreateForm
          @close-dialog="handleDialogClose"
        ></ArtisanCreateForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.CreateInvTrf">
        <InvTrfForm
          :inv-trf-id="null"
          @close-dialog="handleDialogClose"
        ></InvTrfForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.CreateSale">
        <SaleCreateForm
          :inventory-id="saleStore.selectedInventoryId"
          :sale-id="null"
          @close-dialog="handleDialogClose"
        ></SaleCreateForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.CreateInventory">
        <InventoryCreateForm
          :inv-id="null"
          @close-dialog="handleDialogClose"
        ></InventoryCreateForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.CreateColor">
        <ColorCreateForm
          :color-id="null"
          @close-dialog="handleDialogClose"
        ></ColorCreateForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.UploadProducts">
        <ProductUploadForm
          @close-dialog="handleDialogClose"
        ></ProductUploadForm>
      </template>
      <template v-else-if="dialog.content === DialogContent.UploadInvProducts">
        <InvProductUploadForm
          @close-dialog="handleDialogClose"
        ></InvProductUploadForm>
      </template>
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
  mdiFileCabinet,
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

const { print: printPayroll, isPrinting: isPayrollPrinting } =
  usePayrollPrint();
const { download: downloadProducts, isDownloading: isDownloadingProducts } =
  useDownloadProducts();
const saleStore = useSaleStore();

enum DialogContent {
  None = 'NONE',
  CreateWork = 'CREATE_WORK',
  CreateProduct = 'CREATE_PRODUCT',
  CreateArtisan = 'CREATE_ARTISAN',
  CreateInvTrf = 'CREATE_INV_TRF',
  CreateSale = 'CREATE_SALE',
  CreateInventory = 'CREATE_INVENTORY',
  CreateColor = 'CREATE_COLOR',
  UploadProducts = 'UPLOAD_PRODUCTS',
  UploadInvProducts = 'UPLOAD_INV_PRODUCTS',
}

const createRouteToContent: Record<string, DialogContent> = {
  works: DialogContent.CreateWork,
  products: DialogContent.CreateProduct,
  artisans: DialogContent.CreateArtisan,
  'inv-trfs': DialogContent.CreateInvTrf,
  sales: DialogContent.CreateSale,
  'setting-inventories': DialogContent.CreateInventory,
  'setting-colors': DialogContent.CreateColor,
};

const dialog = reactive({
  isVisible: false,
  content: DialogContent.None,
});

const dialogTitle = computed(() => {
  switch (dialog.content) {
    case DialogContent.CreateWork:
      return t('page.work_create');
    case DialogContent.CreateProduct:
      return t('page.product_create');
    case DialogContent.CreateArtisan:
      return t('page.artisan_create');
    case DialogContent.CreateInvTrf:
      return t('page.inv_trf_create');
    case DialogContent.CreateSale:
      return t('page.sale_create');
    case DialogContent.CreateInventory:
      return t('page.inventory_create');
    case DialogContent.CreateColor:
      return t('page.color_create');
    case DialogContent.UploadProducts:
      return 'Upload';
    case DialogContent.UploadInvProducts:
      return 'Upload';
    default:
      return '';
  }
});

function openCreateDialog() {
  const content = createRouteToContent[String(currentRouteName.value)];
  if (!content) return;

  if (content === DialogContent.CreateSale) {
    saleStore.sale = null;
  }

  dialog.content = content;
  dialog.isVisible = true;
}

function openUploadDialog() {
  dialog.content = DialogContent.UploadProducts;
  dialog.isVisible = true;
}

function openInvUploadDialog() {
  dialog.content = DialogContent.UploadInvProducts;
  dialog.isVisible = true;
}

function handleDialogClose() {
  dialog.isVisible = false;
  dialog.content = DialogContent.None;
}

watch(
  () => dialog.isVisible,
  (isVisible) => {
    if (!isVisible) {
      dialog.content = DialogContent.None;
    }
  },
);
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
  clearances: number[];
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
    .filter((item) => item.clearances.includes(clearance))
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
      clearances: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
      title: t('nav.payroll'),
      route: localePath('/payroll'),
      icon: mdiCashMultiple,
      clearances: [Role.Superuser, Role.Finance, Role.Planner],
    },
    {
      title: t('nav.production_status'),
      route: localePath('/works'),
      icon: mdiFactory,
      clearances: [Role.Superuser, Role.Finance, Role.Planner, Role.Field],
    },
    {
      title: t('nav.inventory'),
      route: localePath('/inv-products'),
      icon: mdiWarehouse,
      clearances: [Role.Superuser, Role.Finance, Role.Planner, Role.Sales],
    },
    {
      title: t('nav.inventory_transfers'),
      route: localePath('/inv-trfs'),
      icon: mdiTransfer,
      clearances: [Role.Superuser, Role.Finance, Role.Planner, Role.Sales],
    },
    {
      title: t('nav.sales'),
      route: localePath('/sales'),
      icon: mdiPrinterPos,
      clearances: [Role.Superuser, Role.Finance, Role.Planner, Role.Sales],
    },
    {
      title: t('nav.setting'),
      route: localePath('/setting'),
      icon: mdiCogs,
      clearances: [1, 2, 3, 4, 5, 6],
      children: [
        {
          title: t('nav.products'),
          route: localePath('/products'),
          icon: mdiShoeSneaker,
          clearances: [Role.Superuser, Role.Finance, Role.Planner, Role.Field],
        },
        {
          title: t('nav.labor_costs'),
          route: localePath('/labor-costs'),
          icon: mdiCalculator,
          clearances: [Role.Superuser, Role.Finance],
        },
        {
          title: t('nav.artisans'),
          route: localePath('/artisans'),
          icon: mdiAccountWrench,
          clearances: [Role.Superuser, Role.Finance, Role.Planner, Role.Field],
        },
        {
          title: t('nav.setting_inventories'),
          route: localePath('/setting/inventories'),
          icon: mdiWarehouse,
          clearances: [Role.Superuser, Role.Finance, Role.Planner],
        },
        {
          title: t('nav.setting_colors'),
          route: localePath('/setting/colors'),
          icon: mdiPalette,
          clearances: [Role.Superuser, Role.Finance, Role.Planner],
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
