import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddToInventoryDto = {
  productId: Scalars['ID']['input'];
  progress: Progress;
  workId: Scalars['ID']['input'];
  workSizes: Array<SizeToWorkCreateDto>;
};

export enum AdjReason {
  CountCorrection = 'COUNT_CORRECTION',
  Damaged = 'DAMAGED',
  Found = 'FOUND',
  InitialStock = 'INITIAL_STOCK',
  Lost = 'LOST',
  Undocumented = 'UNDOCUMENTED'
}

export type Artisan = {
  __typename?: 'Artisan';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobs: Array<Job>;
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ArtisanCreateDto = {
  firstName: Scalars['String']['input'];
  jobs: Array<Job>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type ArtisanWithTasks = {
  __typename?: 'ArtisanWithTasks';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobs: Array<Job>;
  lastName?: Maybe<Scalars['String']['output']>;
  payablePerArtisan: Scalars['Float']['output'];
  quantityPerArtisan: Scalars['Float']['output'];
  tasks: Array<TaskWithWork>;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type Color = {
  __typename?: 'Color';
  hexCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ColorCreateDto = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ColorToProductWithColor = {
  __typename?: 'ColorToProductWithColor';
  color: Color;
  colorId: Scalars['ID']['output'];
  order: Scalars['Float']['output'];
  productId: Scalars['ID']['output'];
};

export type CsvUploadDto = {
  /** Csv file */
  csvFile: Scalars['Upload']['input'];
};

export enum Gender {
  Kids = 'KIDS',
  Men = 'MEN',
  Women = 'WOMEN'
}

export type InvAdj = {
  __typename?: 'InvAdj';
  adjDate: Scalars['Date']['output'];
  adjNo: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  invId: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  progress: Progress;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvAdjCreateDto = {
  adjDate: Scalars['Date']['input'];
  adjNo: Scalars['String']['input'];
  invAdjItems: Array<InvAdjItemCreateDto>;
  invId: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type InvAdjDto = {
  __typename?: 'InvAdjDto';
  adjDate: Scalars['Date']['output'];
  adjNo: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  invAdjItems: Array<InvAdjItemDto>;
  invId: Scalars['ID']['output'];
  inventory: Inventory;
  note?: Maybe<Scalars['String']['output']>;
  progress: Progress;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvAdjItemCreateDto = {
  invAdjItemSizes: Array<InvAdjItemSizeCreateDto>;
  note?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  reason: AdjReason;
};

export type InvAdjItemDto = {
  __typename?: 'InvAdjItemDto';
  id: Scalars['ID']['output'];
  invAdjId: Scalars['ID']['output'];
  invAdjItemSizes: Array<InvAdjItemToSize>;
  note?: Maybe<Scalars['String']['output']>;
  product: Product;
  productId: Scalars['ID']['output'];
  reason: AdjReason;
};

export type InvAdjItemSizeCreateDto = {
  countedQty: Scalars['Float']['input'];
  sizeId: Scalars['ID']['input'];
  systemQty: Scalars['Float']['input'];
};

export type InvAdjItemToSize = {
  __typename?: 'InvAdjItemToSize';
  countedQty: Scalars['Float']['output'];
  invAdjItemId: Scalars['ID']['output'];
  size: Size;
  sizeId: Scalars['ID']['output'];
  systemQty: Scalars['Float']['output'];
};

export type InvAdjSimpleDto = {
  __typename?: 'InvAdjSimpleDto';
  adjDate: Scalars['Date']['output'];
  adjNo: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  invId: Scalars['ID']['output'];
  inventory: Inventory;
  itemCount: Scalars['Int']['output'];
  note?: Maybe<Scalars['String']['output']>;
  progress: Progress;
  totalVariance: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvAdjUpdateDto = {
  adjDate?: InputMaybe<Scalars['Date']['input']>;
  adjNo?: InputMaybe<Scalars['String']['input']>;
  invAdjItems: Array<InvAdjItemCreateDto>;
  invId?: InputMaybe<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type InvProduct = {
  __typename?: 'InvProduct';
  discounts: Array<Scalars['String']['output']>;
  invId: Scalars['ID']['output'];
  invProductSizes: Array<InvProductToSize>;
  productId: Scalars['ID']['output'];
};

export type InvProductCreateDto = {
  discounts: Array<Scalars['String']['input']>;
  invId: Scalars['ID']['input'];
  invProductSizes: Array<InvProductToSizeCreateDto>;
  productId: Scalars['ID']['input'];
};

export type InvProductDto = {
  __typename?: 'InvProductDto';
  discounts: Array<Scalars['String']['output']>;
  invId: Scalars['ID']['output'];
  invProductSizes: Array<InvProductToSize>;
  invTrfItems: Array<InvProductTrfItemDto>;
  price?: Maybe<Scalars['Int']['output']>;
  product: ProductDto;
  productId: Scalars['ID']['output'];
};

export type InvProductToSize = {
  __typename?: 'InvProductToSize';
  invId: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  size: Size;
  sizeId: Scalars['ID']['output'];
};

export type InvProductToSizeCreateDto = {
  quantity: Scalars['Float']['input'];
  sizeId: Scalars['ID']['input'];
};

export type InvProductTrfItemDto = {
  __typename?: 'InvProductTrfItemDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  discounts: Array<Scalars['String']['output']>;
  fromInv?: Maybe<Inventory>;
  fromInvId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  invTrf?: Maybe<InvTrf>;
  invTrfId?: Maybe<Scalars['ID']['output']>;
  invTrfItemSizes: Array<InvTrfItemToSize>;
  productId: Scalars['ID']['output'];
  progress: Progress;
  toInv: Inventory;
  toInvId: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvProductUpdateDiscDto = {
  discounts: Array<Scalars['String']['input']>;
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};

export type InvProductUpdateDto = {
  discounts?: InputMaybe<Array<Scalars['String']['input']>>;
  invProductSizes?: InputMaybe<Array<InvProductToSizeCreateDto>>;
};

export type InvTrf = {
  __typename?: 'InvTrf';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  fromInvId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  progress: Progress;
  toInvId: Scalars['ID']['output'];
  trfDate: Scalars['Date']['output'];
  trfNo: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvTrfCreateDto = {
  fromInvId?: InputMaybe<Scalars['ID']['input']>;
  invTrfItemIds: Array<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  progress: Progress;
  toInvId: Scalars['ID']['input'];
  trfDate: Scalars['Date']['input'];
  trfNo: Scalars['String']['input'];
  workId?: InputMaybe<Scalars['ID']['input']>;
};

export type InvTrfDto = {
  __typename?: 'InvTrfDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  fromInv?: Maybe<Inventory>;
  fromInvId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  invTrfItems: Array<InvTrfItemDto>;
  note?: Maybe<Scalars['String']['output']>;
  progress: Progress;
  toInv: InventoryDto;
  toInvId: Scalars['ID']['output'];
  trfDate: Scalars['Date']['output'];
  trfNo: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  work?: Maybe<Work>;
};

export type InvTrfItem = {
  __typename?: 'InvTrfItem';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  discounts: Array<Scalars['String']['output']>;
  fromInv?: Maybe<Inventory>;
  fromInvId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  invTrfId?: Maybe<Scalars['ID']['output']>;
  invTrfItemSizes: Array<InvTrfItemToSize>;
  productId: Scalars['ID']['output'];
  progress: Progress;
  toInv: Inventory;
  toInvId: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvTrfItemCreateDto = {
  discounts: Array<Scalars['String']['input']>;
  fromInvId?: InputMaybe<Scalars['ID']['input']>;
  invTrfItemSizes: Array<InvTrfItemSizeCreateDto>;
  productId: Scalars['ID']['input'];
  progress?: InputMaybe<Progress>;
  toInvId: Scalars['ID']['input'];
};

export type InvTrfItemDto = {
  __typename?: 'InvTrfItemDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  discounts: Array<Scalars['String']['output']>;
  fromInv?: Maybe<Inventory>;
  fromInvId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  invTrf?: Maybe<InvTrf>;
  invTrfId?: Maybe<Scalars['ID']['output']>;
  invTrfItemSizes: Array<InvTrfItemToSize>;
  price?: Maybe<Scalars['Int']['output']>;
  product: Product;
  productId: Scalars['ID']['output'];
  progress: Progress;
  toInv: Inventory;
  toInvId: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvTrfItemSizeCreateDto = {
  quantity: Scalars['Float']['input'];
  sizeId: Scalars['ID']['input'];
};

export type InvTrfItemToSize = {
  __typename?: 'InvTrfItemToSize';
  invTrfItemId: Scalars['ID']['output'];
  quantity: Scalars['Float']['output'];
  size: Size;
  sizeId: Scalars['ID']['output'];
};

export type InvTrfItemTrfDto = {
  __typename?: 'InvTrfItemTrfDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  discounts: Array<Scalars['String']['output']>;
  fromInv?: Maybe<Inventory>;
  fromInvId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  invTrf?: Maybe<InvTrf>;
  invTrfId?: Maybe<Scalars['ID']['output']>;
  invTrfItemSizes: Array<InvTrfItemToSize>;
  productId: Scalars['ID']['output'];
  progress: Progress;
  toInv: Inventory;
  toInvId: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvTrfSimpleDto = {
  __typename?: 'InvTrfSimpleDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  fromInv?: Maybe<Inventory>;
  fromInvId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  progress: Progress;
  toInv: InventoryDto;
  toInvId: Scalars['ID']['output'];
  trfDate: Scalars['Date']['output'];
  trfNo: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  work?: Maybe<Work>;
};

export type InvTrfUpdateDto = {
  fromInvId?: InputMaybe<Scalars['ID']['input']>;
  invTrfItemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  note?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Progress>;
  toInvId?: InputMaybe<Scalars['ID']['input']>;
  trfDate?: InputMaybe<Scalars['Date']['input']>;
  trfNo?: InputMaybe<Scalars['String']['input']>;
  workId?: InputMaybe<Scalars['ID']['input']>;
};

export type InvTxDto = {
  __typename?: 'InvTxDto';
  adjId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  invId: Scalars['ID']['output'];
  invTxSizes: Array<InvTxToSize>;
  productId: Scalars['ID']['output'];
  progress: Progress;
  saleId?: Maybe<Scalars['ID']['output']>;
  trfId?: Maybe<Scalars['ID']['output']>;
  txDate: Scalars['Date']['output'];
  txNo: Scalars['String']['output'];
  type: TxType;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type InvTxToSize = {
  __typename?: 'InvTxToSize';
  invTxId: Scalars['ID']['output'];
  quantity: Scalars['Float']['output'];
  size: Size;
  sizeId: Scalars['ID']['output'];
};

export enum InvType {
  Consignment = 'CONSIGNMENT',
  Factory = 'FACTORY',
  Storage = 'STORAGE',
  Storefront = 'STOREFRONT'
}

export type Inventory = {
  __typename?: 'Inventory';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  province: Scalars['String']['output'];
  type: InvType;
};

export type InventoryCreateDto = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priceFormula: PriceFormulaCreateDto;
  province: Scalars['String']['input'];
  type: InvType;
};

export type InventoryDto = {
  __typename?: 'InventoryDto';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  priceFormula?: Maybe<PriceFormula>;
  province: Scalars['String']['output'];
  type: InvType;
};

export type InventoryUpdateDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priceFormula?: InputMaybe<PriceFormulaCreateDto>;
  province?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InvType>;
};

export enum Job {
  DrawLining = 'DRAW_LINING',
  DrawUpper = 'DRAW_UPPER',
  Last = 'LAST',
  StitchInsole = 'STITCH_INSOLE',
  StitchOutsole = 'STITCH_OUTSOLE',
  StitchUpper = 'STITCH_UPPER'
}

export type LaborCost = {
  __typename?: 'LaborCost';
  cost: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  productGroupId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type LaborCostGetDto = {
  __typename?: 'LaborCostGetDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  laborCosts?: Maybe<Array<Maybe<LaborCost>>>;
  msrp?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type LaborCostUpdateDto = {
  drawLining?: InputMaybe<Scalars['Float']['input']>;
  drawUpper?: InputMaybe<Scalars['Float']['input']>;
  last?: InputMaybe<Scalars['Float']['input']>;
  productGroupId: Scalars['ID']['input'];
  stitchInsole?: InputMaybe<Scalars['Float']['input']>;
  stitchOutsole?: InputMaybe<Scalars['Float']['input']>;
  stitchUpper?: InputMaybe<Scalars['Float']['input']>;
};

export type LaborCostUpsertDto = {
  cost: Scalars['Float']['input'];
  productGroupId: Scalars['ID']['input'];
  type: Job;
};

export type LogInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToInventory: Scalars['Boolean']['output'];
  createArtisan: Artisan;
  createColor: Color;
  createInvAdj: InvAdj;
  createInvProduct: InvProduct;
  createInvTrf: InvTrf;
  createInvTrfItem: InvTrfItem;
  createInventory: Inventory;
  createProduct: Product;
  createProductCategory: ProductCategory;
  createProductGroup: ProductGroup;
  createRole: Role;
  createSale: Sale;
  createSize: Size;
  createUser: User;
  createWork: Work;
  deleteArtisan: Scalars['Boolean']['output'];
  deleteColor: Scalars['Boolean']['output'];
  deleteInvAdj: Scalars['Boolean']['output'];
  deleteInvProduct: Scalars['Boolean']['output'];
  deleteInvTrf: Scalars['Boolean']['output'];
  deleteInvTrfItem: Scalars['Boolean']['output'];
  deleteInventory: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteProductCategory: Scalars['Boolean']['output'];
  deleteProductGroup: Scalars['Boolean']['output'];
  deleteSale: Scalars['Boolean']['output'];
  deleteSize: Scalars['Boolean']['output'];
  deleteWork: Scalars['Boolean']['output'];
  logIn: User;
  logOut: User;
  postInvAdj: InvAdj;
  updateArtisan: Artisan;
  updateColor: Color;
  updateInvAdj: InvAdj;
  updateInvProduct: InvProduct;
  updateInvProductDisc: InvProduct;
  updateInvTrf: InvTrf;
  updateInventory: Inventory;
  updateLaborCosts: Scalars['Boolean']['output'];
  updateProduct: Product;
  updateProductCategory: ProductCategory;
  updateProductGroup: ProductGroup;
  updateSize: Size;
  updateTasks: Array<TaskAndArtisanDto>;
  updateUser: User;
  updateWork: Work;
  uploadInvProductDiscounts: Scalars['Boolean']['output'];
  uploadNewInvProducts: Scalars['Boolean']['output'];
  uploadNewProductGroups: Scalars['Boolean']['output'];
  uploadNewProducts: Scalars['Boolean']['output'];
  uploadProductGroupMsrps: Scalars['Boolean']['output'];
  upsertLaborCosts: Array<LaborCost>;
  verifyHuman: Scalars['Boolean']['output'];
};


export type MutationAddToInventoryArgs = {
  data: AddToInventoryDto;
};


export type MutationCreateArtisanArgs = {
  data: ArtisanCreateDto;
};


export type MutationCreateColorArgs = {
  data: ColorCreateDto;
};


export type MutationCreateInvAdjArgs = {
  data: InvAdjCreateDto;
};


export type MutationCreateInvProductArgs = {
  data: InvProductCreateDto;
};


export type MutationCreateInvTrfArgs = {
  data: InvTrfCreateDto;
};


export type MutationCreateInvTrfItemArgs = {
  data: InvTrfItemCreateDto;
};


export type MutationCreateInventoryArgs = {
  data: InventoryCreateDto;
};


export type MutationCreateProductArgs = {
  data: ProductCreateDto;
};


export type MutationCreateProductCategoryArgs = {
  data: ProductCategoryCreateDto;
};


export type MutationCreateProductGroupArgs = {
  data: ProductGroupCreateDto;
};


export type MutationCreateRoleArgs = {
  data: RoleDto;
};


export type MutationCreateSaleArgs = {
  data: SaleCreateDto;
};


export type MutationCreateSizeArgs = {
  data: SizeCreateDto;
};


export type MutationCreateUserArgs = {
  data: UserCreateDto;
};


export type MutationCreateWorkArgs = {
  data: WorkCreateDto;
};


export type MutationDeleteArtisanArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteColorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInvAdjArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInvProductArgs = {
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationDeleteInvTrfArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInvTrfItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInventoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSaleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSizeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLogInArgs = {
  data: LogInDto;
};


export type MutationPostInvAdjArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateArtisanArgs = {
  data: ArtisanCreateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateColorArgs = {
  data: ColorCreateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateInvAdjArgs = {
  data: InvAdjUpdateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateInvProductArgs = {
  data: InvProductUpdateDto;
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationUpdateInvProductDiscArgs = {
  data: InvProductUpdateDiscDto;
};


export type MutationUpdateInvTrfArgs = {
  data: InvTrfUpdateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateInventoryArgs = {
  data: InventoryUpdateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateLaborCostsArgs = {
  data: LaborCostUpdateDto;
};


export type MutationUpdateProductArgs = {
  data: ProductUpdateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductCategoryArgs = {
  data: ProductCategoryCreateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductGroupArgs = {
  data: ProductGroupUpdateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSizeArgs = {
  data: SizeCreateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTasksArgs = {
  data: Array<TaskUpdateDto>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateWorkArgs = {
  data: WorkUpdateDto;
  id: Scalars['ID']['input'];
};


export type MutationUploadInvProductDiscountsArgs = {
  data: CsvUploadDto;
};


export type MutationUploadNewInvProductsArgs = {
  data: CsvUploadDto;
};


export type MutationUploadNewProductGroupsArgs = {
  data: CsvUploadDto;
};


export type MutationUploadNewProductsArgs = {
  data: CsvUploadDto;
};


export type MutationUploadProductGroupMsrpsArgs = {
  data: CsvUploadDto;
};


export type MutationUpsertLaborCostsArgs = {
  data: Array<LaborCostUpsertDto>;
  productGroupId: Scalars['ID']['input'];
};


export type MutationVerifyHumanArgs = {
  token: Scalars['String']['input'];
};

export type PayrollGetDto = {
  __typename?: 'PayrollGetDto';
  artisans: Array<ArtisanWithTasks>;
  totalPayable: Scalars['Float']['output'];
  totalQuantity: Scalars['Float']['output'];
};

export type PriceFormula = {
  __typename?: 'PriceFormula';
  id: Scalars['ID']['output'];
  multiplier?: Maybe<Scalars['String']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
  profitMargins: Array<Scalars['String']['output']>;
};

export type PriceFormulaCreateDto = {
  multiplier?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  profitMargins: Array<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  productGroupId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  gender: Gender;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ProductCategoryCreateDto = {
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ProductCreateDto = {
  colorIds: Array<Scalars['ID']['input']>;
  productGroupId: Scalars['ID']['input'];
  sku: Scalars['String']['input'];
};

export type ProductDto = {
  __typename?: 'ProductDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  productColors: Array<ColorToProductWithColor>;
  productGroup: ProductGroupWithCategory;
  productGroupId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ProductGroup = {
  __typename?: 'ProductGroup';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  msrp?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ProductGroupCreateDto = {
  msrp?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productCategoryId: Scalars['ID']['input'];
  skuNumeric: Scalars['String']['input'];
};

export type ProductGroupGetDto = {
  __typename?: 'ProductGroupGetDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  msrp?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ProductGroupUpdateDto = {
  msrp?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productCategoryId?: InputMaybe<Scalars['ID']['input']>;
  skuNumeric?: InputMaybe<Scalars['String']['input']>;
};

export type ProductGroupWithCategory = {
  __typename?: 'ProductGroupWithCategory';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  msrp?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ProductUpdateDto = {
  colorIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  productGroupId?: InputMaybe<Scalars['ID']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
};

export type ProductWithCategoryDto = {
  __typename?: 'ProductWithCategoryDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  productGroup: ProductGroupWithCategory;
  productGroupId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export enum Progress {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Initiated = 'INITIATED',
  InProgress = 'IN_PROGRESS',
  OnHold = 'ON_HOLD',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  downloadColors: Scalars['String']['output'];
  downloadInvProducts: Scalars['String']['output'];
  downloadInventories: Scalars['String']['output'];
  downloadProductGroups: Scalars['String']['output'];
  downloadProducts: Scalars['String']['output'];
  generateInvAdjNo: Scalars['String']['output'];
  generateInvTrfNo: Scalars['String']['output'];
  generateOrderNo: Scalars['String']['output'];
  generateSaleNo: Scalars['String']['output'];
  getArtisan: Artisan;
  getArtisans: Array<Artisan>;
  getColor: Color;
  getColors: Array<Color>;
  getInvAdj: InvAdjDto;
  getInvAdjs: Array<InvAdjSimpleDto>;
  getInvProductPrice: Scalars['Float']['output'];
  getInvProducts: Array<InvProductDto>;
  getInvTrf: InvTrfDto;
  getInvTrfItemTrfs: Array<InvTrfItemTrfDto>;
  getInvTrfItems: Array<InvTrfItemDto>;
  getInvTrfs: Array<InvTrfSimpleDto>;
  getInvTxs: Array<InvTxDto>;
  getInventories: Array<InventoryDto>;
  getInventory: InventoryDto;
  getLaborCost: LaborCostGetDto;
  getLaborCosts: Array<LaborCostGetDto>;
  getPayroll: PayrollGetDto;
  getProduct: ProductDto;
  getProductCategories: Array<ProductCategory>;
  getProductCategory: ProductCategory;
  getProductGroup: ProductGroupGetDto;
  getProductGroups: Array<ProductGroupGetDto>;
  getProducts: Array<ProductDto>;
  getRoles: Array<Role>;
  getSale: SaleDto;
  getSalePerformance: Array<SalePerformanceDto>;
  getSales: Array<SaleDto>;
  getSize: Size;
  getSizes: Array<Size>;
  getTasks: Array<TaskAndArtisanDto>;
  getUsers: Array<User>;
  getWork: WorkAndTasksDto;
  getWorks: Array<WorkAndTasksDto>;
  me: User;
};


export type QueryGenerateInvAdjNoArgs = {
  date: Scalars['Date']['input'];
};


export type QueryGenerateInvTrfNoArgs = {
  date: Scalars['Date']['input'];
};


export type QueryGenerateOrderNoArgs = {
  date: Scalars['Date']['input'];
};


export type QueryGenerateSaleNoArgs = {
  date: Scalars['Date']['input'];
};


export type QueryGetArtisanArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetColorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvAdjArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvAdjsArgs = {
  invId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetInvProductPriceArgs = {
  discounts: Array<Scalars['String']['input']>;
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type QueryGetInvProductsArgs = {
  invId: Scalars['ID']['input'];
};


export type QueryGetInvTrfArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvTrfItemTrfsArgs = {
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type QueryGetInvTrfItemsArgs = {
  fromInvId: Scalars['ID']['input'];
  progress?: InputMaybe<Array<Progress>>;
  toInvId: Scalars['ID']['input'];
};


export type QueryGetInvTxsArgs = {
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type QueryGetInventoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLaborCostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPayrollArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProductCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProductGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSaleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSalePerformanceArgs = {
  endDate: Scalars['Date']['input'];
  invId?: InputMaybe<Scalars['ID']['input']>;
  startDate: Scalars['Date']['input'];
};


export type QueryGetSalesArgs = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  invId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};


export type QueryGetSizeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTasksArgs = {
  workId: Scalars['ID']['input'];
};


export type QueryGetWorkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetWorksArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type Role = {
  __typename?: 'Role';
  clearanceLevel: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type RoleDto = {
  clearanceLevel: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Sale = {
  __typename?: 'Sale';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  saleItems: Array<SaleItem>;
  saleNo: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type SaleCreateDto = {
  date: Scalars['Date']['input'];
  saleItems: Array<SaleItemCreateDto>;
  saleNo: Scalars['String']['input'];
};

export type SaleDto = {
  __typename?: 'SaleDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  saleItems: Array<SaleItemDto>;
  saleNo: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type SaleItem = {
  __typename?: 'SaleItem';
  id: Scalars['ID']['output'];
  invId: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  saleId: Scalars['ID']['output'];
  saleItemSizes: Array<SaleItemToSize>;
};

export type SaleItemCreateDto = {
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  saleItemSizes: Array<SaleItemToSizeCreateDto>;
};

export type SaleItemDto = {
  __typename?: 'SaleItemDto';
  id: Scalars['ID']['output'];
  invId: Scalars['ID']['output'];
  inventory: Inventory;
  productId: Scalars['ID']['output'];
  saleId: Scalars['ID']['output'];
  saleItemSizes: Array<SaleItemToSize>;
};

export type SaleItemToSize = {
  __typename?: 'SaleItemToSize';
  quantity: Scalars['Float']['output'];
  saleItemId: Scalars['ID']['output'];
  size: Size;
  sizeId: Scalars['ID']['output'];
};

export type SaleItemToSizeCreateDto = {
  quantity: Scalars['Float']['input'];
  sizeId: Scalars['ID']['input'];
};

export type SalePerformanceDto = {
  __typename?: 'SalePerformanceDto';
  gender: Gender;
  productCategoryName: Scalars['String']['output'];
  productGroupName?: Maybe<Scalars['String']['output']>;
  productId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  totalQuantity: Scalars['Float']['output'];
};

export type Size = {
  __typename?: 'Size';
  eu: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['ID']['output'];
  jp?: Maybe<Scalars['String']['output']>;
  uk?: Maybe<Scalars['String']['output']>;
  us?: Maybe<Scalars['String']['output']>;
};

export type SizeCreateDto = {
  eu: Scalars['String']['input'];
  gender: Gender;
  jp?: InputMaybe<Scalars['String']['input']>;
  uk?: InputMaybe<Scalars['String']['input']>;
  us?: InputMaybe<Scalars['String']['input']>;
};

export type SizeToWork = {
  __typename?: 'SizeToWork';
  quantity: Scalars['Float']['output'];
  size: Size;
  sizeId: Scalars['ID']['output'];
  workId: Scalars['ID']['output'];
};

export type SizeToWorkCreateDto = {
  id: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type TaskAndArtisanDto = {
  __typename?: 'TaskAndArtisanDto';
  artisan?: Maybe<Artisan>;
  artisanId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  doneAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  type: Job;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  workId: Scalars['ID']['output'];
};

export type TaskUpdateDto = {
  artisanId?: InputMaybe<Scalars['ID']['input']>;
  doneAt?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['ID']['input'];
};

export type TaskWithWork = {
  __typename?: 'TaskWithWork';
  artisanId?: Maybe<Scalars['ID']['output']>;
  costPerTask: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  doneAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  payablePerTask: Scalars['Float']['output'];
  quantityPerTask: Scalars['Float']['output'];
  type: Job;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  work: WorkWithProduct;
  workId: Scalars['ID']['output'];
};

export enum TxType {
  Adjustment = 'ADJUSTMENT',
  Production = 'PRODUCTION',
  Reversion = 'REVERSION',
  Sale = 'SALE',
  TransferIn = 'TRANSFER_IN',
  TransferOut = 'TRANSFER_OUT'
}

export type User = {
  __typename?: 'User';
  approvedAt?: Maybe<Scalars['Date']['output']>;
  approvedBy?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy?: Maybe<Scalars['ID']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  role: Role;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  userInventories: Array<Inventory>;
};

export type UserCreateDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  roleId: Scalars['ID']['input'];
};

export type UserUpdateDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  invIds: Array<Scalars['ID']['input']>;
  isActive: Scalars['Boolean']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['ID']['input']>;
};

export type Work = {
  __typename?: 'Work';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  orderNo: Scalars['String']['output'];
  productId: Scalars['ID']['output'];
  progress: Progress;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type WorkAndTasksDto = {
  __typename?: 'WorkAndTasksDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  invTrf?: Maybe<InvTrf>;
  note?: Maybe<Scalars['String']['output']>;
  orderNo: Scalars['String']['output'];
  product: ProductWithCategoryDto;
  productId: Scalars['ID']['output'];
  progress: Progress;
  tasks: Array<TaskAndArtisanDto>;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  workSizes: Array<SizeToWork>;
};

export type WorkCreateDto = {
  date: Scalars['Date']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  orderNo: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  workSizes: Array<SizeToWorkCreateDto>;
};

export type WorkUpdateDto = {
  date?: InputMaybe<Scalars['Date']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderNo?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  workSizes: Array<SizeToWorkCreateDto>;
};

export type WorkWithProduct = {
  __typename?: 'WorkWithProduct';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  orderNo: Scalars['String']['output'];
  product: ProductWithCategoryDto;
  productId: Scalars['ID']['output'];
  progress: Progress;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
  workSizes: Array<SizeToWork>;
};

export type ArtisanFragment = { __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null };

export type CreateArtisanMutationVariables = Exact<{
  data: ArtisanCreateDto;
}>;


export type CreateArtisanMutation = { __typename?: 'Mutation', createArtisan: { __typename?: 'Artisan', id: string } };

export type UpdateArtisanMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ArtisanCreateDto;
}>;


export type UpdateArtisanMutation = { __typename?: 'Mutation', updateArtisan: { __typename?: 'Artisan', id: string } };

export type DeleteArtisanMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteArtisanMutation = { __typename?: 'Mutation', deleteArtisan: boolean };

export type GetArtisansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtisansQuery = { __typename?: 'Query', getArtisans: Array<{ __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null }> };

export type GetArtisanQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetArtisanQuery = { __typename?: 'Query', getArtisan: { __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null } };

export type AuthUserFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, createdAt: any, updatedAt: any, isActive: boolean, role: { __typename?: 'Role', id: string, name: string, clearanceLevel: number }, userInventories: Array<{ __typename?: 'Inventory', id: string, name: string }> };

export type CreateUserMutationVariables = Exact<{
  data: UserCreateDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, createdAt: any, updatedAt: any, isActive: boolean, role: { __typename?: 'Role', id: string, name: string, clearanceLevel: number }, userInventories: Array<{ __typename?: 'Inventory', id: string, name: string }> } };

export type LogInMutationVariables = Exact<{
  data: LogInDto;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, createdAt: any, updatedAt: any, isActive: boolean, role: { __typename?: 'Role', id: string, name: string, clearanceLevel: number }, userInventories: Array<{ __typename?: 'Inventory', id: string, name: string }> } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, createdAt: any, updatedAt: any, isActive: boolean, role: { __typename?: 'Role', id: string, name: string, clearanceLevel: number }, userInventories: Array<{ __typename?: 'Inventory', id: string, name: string }> } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UserUpdateDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type VerifyHumanMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyHumanMutation = { __typename?: 'Mutation', verifyHuman: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, createdAt: any, updatedAt: any, isActive: boolean, role: { __typename?: 'Role', id: string, name: string, clearanceLevel: number }, userInventories: Array<{ __typename?: 'Inventory', id: string, name: string }> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, createdAt: any, updatedAt: any, isActive: boolean, role: { __typename?: 'Role', id: string, name: string, clearanceLevel: number }, userInventories: Array<{ __typename?: 'Inventory', id: string, name: string }> }> };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', getRoles: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, clearanceLevel: number }> };

export type InventoryFragmentFragment = { __typename?: 'InventoryDto', id: string, name: string, address: string, city: string, province: string, type: InvType, priceFormula?: { __typename?: 'PriceFormula', id: string, offset?: number | null, multiplier?: string | null, profitMargins: Array<string> } | null };

export type CreateInventoryMutationVariables = Exact<{
  data: InventoryCreateDto;
}>;


export type CreateInventoryMutation = { __typename?: 'Mutation', createInventory: { __typename?: 'Inventory', id: string } };

export type GetInventoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInventoriesQuery = { __typename?: 'Query', getInventories: Array<{ __typename?: 'InventoryDto', id: string, name: string, address: string, city: string, province: string, type: InvType, priceFormula?: { __typename?: 'PriceFormula', id: string, offset?: number | null, multiplier?: string | null, profitMargins: Array<string> } | null }> };

export type GetInventoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetInventoryQuery = { __typename?: 'Query', getInventory: { __typename?: 'InventoryDto', id: string, name: string, address: string, city: string, province: string, type: InvType, priceFormula?: { __typename?: 'PriceFormula', id: string, offset?: number | null, multiplier?: string | null, profitMargins: Array<string> } | null } };

export type UpdateInventoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: InventoryUpdateDto;
}>;


export type UpdateInventoryMutation = { __typename?: 'Mutation', updateInventory: { __typename?: 'Inventory', id: string } };

export type DeleteInventoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteInventoryMutation = { __typename?: 'Mutation', deleteInventory: boolean };

export type CreateInvProductMutationVariables = Exact<{
  data: InvProductCreateDto;
}>;


export type CreateInvProductMutation = { __typename?: 'Mutation', createInvProduct: { __typename?: 'InvProduct', invId: string, productId: string } };

export type GetInvProductsQueryVariables = Exact<{
  invId: Scalars['ID']['input'];
}>;


export type GetInvProductsQuery = { __typename?: 'Query', getInvProducts: Array<{ __typename?: 'InvProductDto', invId: string, productId: string, discounts: Array<string>, price?: number | null, product: { __typename?: 'ProductDto', id: string, sku: string, productGroup: { __typename?: 'ProductGroupWithCategory', id: string, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } }, productColors: Array<{ __typename?: 'ColorToProductWithColor', color: { __typename?: 'Color', id: string, name: string, hexCode: string } }> }, invProductSizes: Array<{ __typename?: 'InvProductToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, invTrfItems: Array<{ __typename?: 'InvProductTrfItemDto', progress: Progress, invTrfItemSizes: Array<{ __typename?: 'InvTrfItemToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, invTrf?: { __typename?: 'InvTrf', id: string, trfNo: string } | null }> }> };

export type UpdateInvProductMutationVariables = Exact<{
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  data: InvProductUpdateDto;
}>;


export type UpdateInvProductMutation = { __typename?: 'Mutation', updateInvProduct: { __typename?: 'InvProduct', invId: string, productId: string } };

export type UpdateInvProductDiscMutationVariables = Exact<{
  data: InvProductUpdateDiscDto;
}>;


export type UpdateInvProductDiscMutation = { __typename?: 'Mutation', updateInvProductDisc: { __typename?: 'InvProduct', invId: string, productId: string, discounts: Array<string> } };

export type DeleteInvProductMutationVariables = Exact<{
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type DeleteInvProductMutation = { __typename?: 'Mutation', deleteInvProduct: boolean };

export type UploadNewInvProductsMutationVariables = Exact<{
  data: CsvUploadDto;
}>;


export type UploadNewInvProductsMutation = { __typename?: 'Mutation', uploadNewInvProducts: boolean };

export type UploadInvProductDiscountsMutationVariables = Exact<{
  data: CsvUploadDto;
}>;


export type UploadInvProductDiscountsMutation = { __typename?: 'Mutation', uploadInvProductDiscounts: boolean };

export type GetInvTrfItemTrfsQueryVariables = Exact<{
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type GetInvTrfItemTrfsQuery = { __typename?: 'Query', getInvTrfItemTrfs: Array<{ __typename?: 'InvTrfItemTrfDto', id: string, productId: string, progress: Progress, fromInv?: { __typename?: 'Inventory', name: string, type: InvType } | null, toInv: { __typename?: 'Inventory', name: string, type: InvType }, invTrfItemSizes: Array<{ __typename?: 'InvTrfItemToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, invTrf?: { __typename?: 'InvTrf', id: string, trfNo: string, trfDate: any, progress: Progress } | null }> };

export type GetInvTrfItemsQueryVariables = Exact<{
  fromInvId: Scalars['ID']['input'];
  toInvId: Scalars['ID']['input'];
  progress?: InputMaybe<Array<Progress> | Progress>;
}>;


export type GetInvTrfItemsQuery = { __typename?: 'Query', getInvTrfItems: Array<{ __typename?: 'InvTrfItemDto', id: string, price?: number | null, discounts: Array<string>, progress: Progress, fromInv?: { __typename?: 'Inventory', id: string, name: string, type: InvType } | null, toInv: { __typename?: 'Inventory', id: string, name: string, type: InvType }, product: { __typename?: 'Product', id: string, sku: string }, invTrfItemSizes: Array<{ __typename?: 'InvTrfItemToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, invTrf?: { __typename?: 'InvTrf', id: string } | null }> };

export type GetInvTrfsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInvTrfsQuery = { __typename?: 'Query', getInvTrfs: Array<{ __typename?: 'InvTrfSimpleDto', id: string, trfNo: string, trfDate: any, progress: Progress, work?: { __typename?: 'Work', id: string, orderNo: string } | null, fromInv?: { __typename?: 'Inventory', id: string, name: string, type: InvType } | null, toInv: { __typename?: 'InventoryDto', id: string, name: string, type: InvType } }> };

export type GetInvTrfQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetInvTrfQuery = { __typename?: 'Query', getInvTrf: { __typename?: 'InvTrfDto', id: string, trfNo: string, trfDate: any, progress: Progress, note?: string | null, fromInv?: { __typename?: 'Inventory', id: string, name: string, address: string, city: string, province: string, type: InvType } | null, toInv: { __typename?: 'InventoryDto', id: string, name: string, address: string, city: string, province: string, type: InvType, priceFormula?: { __typename?: 'PriceFormula', profitMargins: Array<string> } | null }, invTrfItems: Array<{ __typename?: 'InvTrfItemDto', id: string, price?: number | null, discounts: Array<string>, progress: Progress, product: { __typename?: 'Product', id: string, sku: string }, fromInv?: { __typename?: 'Inventory', id: string, name: string, type: InvType } | null, toInv: { __typename?: 'Inventory', id: string, name: string, type: InvType }, invTrfItemSizes: Array<{ __typename?: 'InvTrfItemToSize', invTrfItemId: string, quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }> }> } };

export type CreateInvTrfMutationVariables = Exact<{
  data: InvTrfCreateDto;
}>;


export type CreateInvTrfMutation = { __typename?: 'Mutation', createInvTrf: { __typename?: 'InvTrf', id: string } };

export type UpdateInvTrfMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: InvTrfUpdateDto;
}>;


export type UpdateInvTrfMutation = { __typename?: 'Mutation', updateInvTrf: { __typename?: 'InvTrf', id: string } };

export type DeleteInvTrfMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteInvTrfMutation = { __typename?: 'Mutation', deleteInvTrf: boolean };

export type CreateInvTrfItemMutationVariables = Exact<{
  data: InvTrfItemCreateDto;
}>;


export type CreateInvTrfItemMutation = { __typename?: 'Mutation', createInvTrfItem: { __typename?: 'InvTrfItem', id: string } };

export type DeleteInvTrfItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteInvTrfItemMutation = { __typename?: 'Mutation', deleteInvTrfItem: boolean };

export type GenerateInvTrfNoQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type GenerateInvTrfNoQuery = { __typename?: 'Query', generateInvTrfNo: string };

export type GetInvTxsQueryVariables = Exact<{
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type GetInvTxsQuery = { __typename?: 'Query', getInvTxs: Array<{ __typename?: 'InvTxDto', id: string, type: TxType, saleId?: string | null, trfId?: string | null, adjId?: string | null, txNo: string, txDate: any, progress: Progress, invTxSizes: Array<{ __typename?: 'InvTxToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }> }> };

export type GetInvProductPriceQueryVariables = Exact<{
  invId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  discounts: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetInvProductPriceQuery = { __typename?: 'Query', getInvProductPrice: number };

export type DownloadInvProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type DownloadInvProductsQuery = { __typename?: 'Query', downloadInvProducts: string };

export type GetInvAdjsQueryVariables = Exact<{
  invId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetInvAdjsQuery = { __typename?: 'Query', getInvAdjs: Array<{ __typename?: 'InvAdjSimpleDto', id: string, adjNo: string, adjDate: any, progress: Progress, note?: string | null, itemCount: number, totalVariance: number, createdBy: string, inventory: { __typename?: 'Inventory', id: string, name: string, type: InvType } }> };

export type GetInvAdjQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetInvAdjQuery = { __typename?: 'Query', getInvAdj: { __typename?: 'InvAdjDto', id: string, adjNo: string, adjDate: any, progress: Progress, note?: string | null, invId: string, inventory: { __typename?: 'Inventory', id: string, name: string, type: InvType }, invAdjItems: Array<{ __typename?: 'InvAdjItemDto', id: string, productId: string, reason: AdjReason, note?: string | null, product: { __typename?: 'Product', id: string, sku: string }, invAdjItemSizes: Array<{ __typename?: 'InvAdjItemToSize', systemQty: number, countedQty: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }> }> } };

export type GenerateInvAdjNoQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type GenerateInvAdjNoQuery = { __typename?: 'Query', generateInvAdjNo: string };

export type CreateInvAdjMutationVariables = Exact<{
  data: InvAdjCreateDto;
}>;


export type CreateInvAdjMutation = { __typename?: 'Mutation', createInvAdj: { __typename?: 'InvAdj', id: string } };

export type UpdateInvAdjMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: InvAdjUpdateDto;
}>;


export type UpdateInvAdjMutation = { __typename?: 'Mutation', updateInvAdj: { __typename?: 'InvAdj', id: string } };

export type PostInvAdjMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PostInvAdjMutation = { __typename?: 'Mutation', postInvAdj: { __typename?: 'InvAdj', id: string, progress: Progress } };

export type DeleteInvAdjMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteInvAdjMutation = { __typename?: 'Mutation', deleteInvAdj: boolean };

export type ProductCategoryFragment = { __typename?: 'ProductCategory', id: string, name: string, gender: Gender };

export type ColorFragment = { __typename?: 'Color', id: string, name: string, hexCode: string };

export type LaborCostFragment = { __typename?: 'LaborCost', id: string, type: string, cost: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any };

export type CreatePrdouctCategoryMutationVariables = Exact<{
  data: ProductCategoryCreateDto;
}>;


export type CreatePrdouctCategoryMutation = { __typename?: 'Mutation', createProductCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } };

export type UpdateProductCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ProductCategoryCreateDto;
}>;


export type UpdateProductCategoryMutation = { __typename?: 'Mutation', updateProductCategory: { __typename?: 'ProductCategory', id: string } };

export type DeleteProductCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductCategoryMutation = { __typename?: 'Mutation', deleteProductCategory: boolean };

export type CreateProductGroupMutationVariables = Exact<{
  data: ProductGroupCreateDto;
}>;


export type CreateProductGroupMutation = { __typename?: 'Mutation', createProductGroup: { __typename?: 'ProductGroup', id: string, skuNumeric: string, name?: string | null, productCategoryId: string } };

export type UpdateProductGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ProductGroupUpdateDto;
}>;


export type UpdateProductGroupMutation = { __typename?: 'Mutation', updateProductGroup: { __typename?: 'ProductGroup', id: string } };

export type DeleteProductGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductGroupMutation = { __typename?: 'Mutation', deleteProductGroup: boolean };

export type UploadNewProductGroupsMutationVariables = Exact<{
  data: CsvUploadDto;
}>;


export type UploadNewProductGroupsMutation = { __typename?: 'Mutation', uploadNewProductGroups: boolean };

export type UploadProductGroupMsrpsMutationVariables = Exact<{
  data: CsvUploadDto;
}>;


export type UploadProductGroupMsrpsMutation = { __typename?: 'Mutation', uploadProductGroupMsrps: boolean };

export type UploadNewProductsMutationVariables = Exact<{
  data: CsvUploadDto;
}>;


export type UploadNewProductsMutation = { __typename?: 'Mutation', uploadNewProducts: boolean };

export type CreateColorMutationVariables = Exact<{
  data: ColorCreateDto;
}>;


export type CreateColorMutation = { __typename?: 'Mutation', createColor: { __typename?: 'Color', id: string, name: string, hexCode: string } };

export type UpdateColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ColorCreateDto;
}>;


export type UpdateColorMutation = { __typename?: 'Mutation', updateColor: { __typename?: 'Color', id: string } };

export type DeleteColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteColorMutation = { __typename?: 'Mutation', deleteColor: boolean };

export type CreateProductMutationVariables = Exact<{
  data: ProductCreateDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ProductUpdateDto;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type UpsertLaborCostsMutationVariables = Exact<{
  productGroupId: Scalars['ID']['input'];
  data: Array<LaborCostUpsertDto> | LaborCostUpsertDto;
}>;


export type UpsertLaborCostsMutation = { __typename?: 'Mutation', upsertLaborCosts: Array<{ __typename?: 'LaborCost', id: string }> };

export type UpdateLaborCostsMutationVariables = Exact<{
  data: LaborCostUpdateDto;
}>;


export type UpdateLaborCostsMutation = { __typename?: 'Mutation', updateLaborCosts: boolean };

export type GetProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductCategoriesQuery = { __typename?: 'Query', getProductCategories: Array<{ __typename?: 'ProductCategory', id: string, name: string, gender: Gender }> };

export type GetProductCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductCategoryQuery = { __typename?: 'Query', getProductCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } };

export type GetColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsQuery = { __typename?: 'Query', getColors: Array<{ __typename?: 'Color', id: string, name: string, hexCode: string }> };

export type GetColorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetColorQuery = { __typename?: 'Query', getColor: { __typename?: 'Color', id: string, name: string, hexCode: string } };

export type GetProductGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductGroupsQuery = { __typename?: 'Query', getProductGroups: Array<{ __typename?: 'ProductGroupGetDto', id: string, skuNumeric: string, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } }> };

export type GetProductGroupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductGroupQuery = { __typename?: 'Query', getProductGroup: { __typename?: 'ProductGroupGetDto', id: string, skuNumeric: string, name?: string | null, msrp?: number | null, createdBy: string, updatedBy?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'ProductDto', id: string, sku: string, createdAt: any, updatedAt: any, productGroup: { __typename?: 'ProductGroupWithCategory', id: string, skuNumeric: string, name?: string | null, msrp?: number | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } }, productColors: Array<{ __typename?: 'ColorToProductWithColor', order: number, color: { __typename?: 'Color', id: string, name: string, hexCode: string } }> }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename?: 'ProductDto', id: string, sku: string, createdBy: string, updatedBy?: string | null, productGroup: { __typename?: 'ProductGroupWithCategory', id: string, msrp?: number | null }, productColors: Array<{ __typename?: 'ColorToProductWithColor', order: number, color: { __typename?: 'Color', id: string } }> } };

export type GetLaborCostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLaborCostQuery = { __typename?: 'Query', getLaborCost: { __typename?: 'LaborCostGetDto', id: string, skuNumeric: string, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender }, laborCosts?: Array<{ __typename?: 'LaborCost', id: string, type: string, cost: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any } | null> | null } };

export type GetLaborCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLaborCostsQuery = { __typename?: 'Query', getLaborCosts: Array<{ __typename?: 'LaborCostGetDto', id: string, skuNumeric: string, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender }, laborCosts?: Array<{ __typename?: 'LaborCost', id: string, type: string, cost: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any } | null> | null }> };

export type DownloadProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type DownloadProductsQuery = { __typename?: 'Query', downloadProducts: string };

export type DownloadProductGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type DownloadProductGroupsQuery = { __typename?: 'Query', downloadProductGroups: string };

export type SizeFragment = { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender };

export type TaskAndArtisanFragment = { __typename?: 'TaskAndArtisanDto', id: string, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any, workId: string, type: Job, doneAt?: any | null, artisan?: { __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null } | null };

export type WorkAndTasksFragment = { __typename?: 'WorkAndTasksDto', id: string, date: any, orderNo: string, productId: string, progress: Progress, note?: string | null, createdBy: string, updatedBy?: string | null, createdAt: any, updatedAt: any, workSizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, tasks: Array<{ __typename?: 'TaskAndArtisanDto', id: string, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any, workId: string, type: Job, doneAt?: any | null, artisan?: { __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null } | null }>, product: { __typename?: 'ProductWithCategoryDto', sku: string, productGroup: { __typename?: 'ProductGroupWithCategory', skuNumeric: string } }, invTrf?: { __typename?: 'InvTrf', trfNo: string } | null };

export type WorkFragment = { __typename?: 'WorkAndTasksDto', id: string, date: any, orderNo: string, productId: string, note?: string | null, createdBy: string, updatedBy?: string | null, workSizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, product: { __typename?: 'ProductWithCategoryDto', sku: string } };

export type CreateSizeMutationVariables = Exact<{
  data: SizeCreateDto;
}>;


export type CreateSizeMutation = { __typename?: 'Mutation', createSize: { __typename?: 'Size', id: string } };

export type UpdateSizeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: SizeCreateDto;
}>;


export type UpdateSizeMutation = { __typename?: 'Mutation', updateSize: { __typename?: 'Size', id: string } };

export type DeleteSizeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSizeMutation = { __typename?: 'Mutation', deleteSize: boolean };

export type GetSizesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSizesQuery = { __typename?: 'Query', getSizes: Array<{ __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender }> };

export type GetSizeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSizeQuery = { __typename?: 'Query', getSize: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } };

export type CreateWorkMutationVariables = Exact<{
  data: WorkCreateDto;
}>;


export type CreateWorkMutation = { __typename?: 'Mutation', createWork: { __typename?: 'Work', id: string } };

export type UpdateWorkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: WorkUpdateDto;
}>;


export type UpdateWorkMutation = { __typename?: 'Mutation', updateWork: { __typename?: 'Work', id: string } };

export type DeleteWorkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWorkMutation = { __typename?: 'Mutation', deleteWork: boolean };

export type GetWorksQueryVariables = Exact<{
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
}>;


export type GetWorksQuery = { __typename?: 'Query', getWorks: Array<{ __typename?: 'WorkAndTasksDto', id: string, date: any, orderNo: string, productId: string, progress: Progress, note?: string | null, createdBy: string, updatedBy?: string | null, createdAt: any, updatedAt: any, workSizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, tasks: Array<{ __typename?: 'TaskAndArtisanDto', id: string, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any, workId: string, type: Job, doneAt?: any | null, artisan?: { __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null } | null }>, product: { __typename?: 'ProductWithCategoryDto', sku: string, productGroup: { __typename?: 'ProductGroupWithCategory', skuNumeric: string } }, invTrf?: { __typename?: 'InvTrf', trfNo: string } | null }> };

export type GetWorkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetWorkQuery = { __typename?: 'Query', getWork: { __typename?: 'WorkAndTasksDto', id: string, date: any, orderNo: string, productId: string, note?: string | null, createdBy: string, updatedBy?: string | null, workSizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }>, product: { __typename?: 'ProductWithCategoryDto', sku: string } } };

export type GetTasksQueryVariables = Exact<{
  workId: Scalars['ID']['input'];
}>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'TaskAndArtisanDto', id: string, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any, workId: string, type: Job, doneAt?: any | null, artisan?: { __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null } | null }> };

export type UpdateTasksMutationVariables = Exact<{
  data: Array<TaskUpdateDto> | TaskUpdateDto;
}>;


export type UpdateTasksMutation = { __typename?: 'Mutation', updateTasks: Array<{ __typename?: 'TaskAndArtisanDto', id: string }> };

export type AddToInventoryMutationVariables = Exact<{
  data: AddToInventoryDto;
}>;


export type AddToInventoryMutation = { __typename?: 'Mutation', addToInventory: boolean };

export type GetPayrollQueryVariables = Exact<{
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
}>;


export type GetPayrollQuery = { __typename?: 'Query', getPayroll: { __typename?: 'PayrollGetDto', totalPayable: number, totalQuantity: number, artisans: Array<{ __typename?: 'ArtisanWithTasks', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, payablePerArtisan: number, quantityPerArtisan: number, tasks: Array<{ __typename?: 'TaskWithWork', payablePerTask: number, costPerTask: number, quantityPerTask: number, type: Job, doneAt?: any | null, work: { __typename?: 'WorkWithProduct', orderNo: string, workSizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', eu: string } }>, product: { __typename?: 'ProductWithCategoryDto', id: string, sku: string, productGroup: { __typename?: 'ProductGroupWithCategory', id: string, skuNumeric: string, productCategory: { __typename?: 'ProductCategory', id: string, name: string } } } } }> }> } };

export type GenerateOrderNoQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type GenerateOrderNoQuery = { __typename?: 'Query', generateOrderNo: string };

export type GetWorkAuditTrailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetWorkAuditTrailQuery = { __typename?: 'Query', getWork: { __typename?: 'WorkAndTasksDto', date: any, createdAt: any, updatedAt: any, createdBy: string, updatedBy?: string | null } };

export type SaleFragmentFragment = { __typename?: 'SaleDto', id: string, date: any, saleNo: string, saleItems: Array<{ __typename?: 'SaleItemDto', id: string, productId: string, invId: string, inventory: { __typename?: 'Inventory', id: string, name: string }, saleItemSizes: Array<{ __typename?: 'SaleItemToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }> }> };

export type CreateSaleMutationVariables = Exact<{
  data: SaleCreateDto;
}>;


export type CreateSaleMutation = { __typename?: 'Mutation', createSale: { __typename?: 'Sale', id: string } };

export type GetSalesQueryVariables = Exact<{
  invId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetSalesQuery = { __typename?: 'Query', getSales: Array<{ __typename?: 'SaleDto', id: string, date: any, saleNo: string, saleItems: Array<{ __typename?: 'SaleItemDto', id: string, productId: string, invId: string, inventory: { __typename?: 'Inventory', id: string, name: string }, saleItemSizes: Array<{ __typename?: 'SaleItemToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }> }> }> };

export type GetSaleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSaleQuery = { __typename?: 'Query', getSale: { __typename?: 'SaleDto', id: string, date: any, saleNo: string, saleItems: Array<{ __typename?: 'SaleItemDto', id: string, productId: string, invId: string, inventory: { __typename?: 'Inventory', id: string, name: string }, saleItemSizes: Array<{ __typename?: 'SaleItemToSize', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null, jp?: string | null, gender: Gender } }> }> } };

export type GenerateSaleNoQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type GenerateSaleNoQuery = { __typename?: 'Query', generateSaleNo: string };

export type DeleteSaleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSaleMutation = { __typename?: 'Mutation', deleteSale: boolean };

export type GetSalePerformanceQueryVariables = Exact<{
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
  invId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetSalePerformanceQuery = { __typename?: 'Query', getSalePerformance: Array<{ __typename?: 'SalePerformanceDto', productId: string, sku: string, productGroupName?: string | null, productCategoryName: string, gender: Gender, totalQuantity: number }> };

export const ArtisanFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Artisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artisan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<ArtisanFragment, unknown>;
export const AuthUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clearanceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]} as unknown as DocumentNode<AuthUserFragment, unknown>;
export const InventoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"priceFormula"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}},{"kind":"Field","name":{"kind":"Name","value":"profitMargins"}}]}}]}}]} as unknown as DocumentNode<InventoryFragmentFragment, unknown>;
export const ProductCategoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ProductCategoryFragment, unknown>;
export const ColorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Color"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<ColorFragment, unknown>;
export const LaborCostFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCost"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<LaborCostFragment, unknown>;
export const SizeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<SizeFragment, unknown>;
export const TaskAndArtisanFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskAndArtisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskAndArtisanDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"workId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"artisan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}}]}}]} as unknown as DocumentNode<TaskAndArtisanFragment, unknown>;
export const WorkAndTasksFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkAndTasks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkAndTasksDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"workSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskAndArtisan"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"invTrf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trfNo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskAndArtisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskAndArtisanDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"workId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"artisan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}}]}}]} as unknown as DocumentNode<WorkAndTasksFragment, unknown>;
export const WorkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Work"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkAndTasksDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"workSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<WorkFragment, unknown>;
export const SaleFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SaleDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"saleNo"}},{"kind":"Field","name":{"kind":"Name","value":"saleItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saleItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<SaleFragmentFragment, unknown>;
export const CreateArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtisanCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateArtisanMutation, CreateArtisanMutationVariables>;
export const UpdateArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtisanCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateArtisanMutation, UpdateArtisanMutationVariables>;
export const DeleteArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteArtisanMutation, DeleteArtisanMutationVariables>;
export const GetArtisansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getArtisans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArtisans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Artisan"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Artisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artisan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<GetArtisansQuery, GetArtisansQueryVariables>;
export const GetArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Artisan"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Artisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artisan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<GetArtisanQuery, GetArtisanQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clearanceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clearanceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clearanceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const VerifyHumanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyHuman"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyHuman"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyHumanMutation, VerifyHumanMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clearanceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clearanceLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"clearanceLevel"}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const CreateInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInventoryMutation, CreateInventoryMutationVariables>;
export const GetInventoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"priceFormula"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}},{"kind":"Field","name":{"kind":"Name","value":"profitMargins"}}]}}]}}]} as unknown as DocumentNode<GetInventoriesQuery, GetInventoriesQueryVariables>;
export const GetInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InventoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InventoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"priceFormula"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}},{"kind":"Field","name":{"kind":"Name","value":"profitMargins"}}]}}]}}]} as unknown as DocumentNode<GetInventoryQuery, GetInventoryQueryVariables>;
export const UpdateInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InventoryUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateInventoryMutation, UpdateInventoryMutationVariables>;
export const DeleteInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteInventoryMutation, DeleteInventoryMutationVariables>;
export const CreateInvProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInvProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvProductCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]} as unknown as DocumentNode<CreateInvProductMutation, CreateInvProductMutationVariables>;
export const GetInvProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Color"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"invProductSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invTrfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"invTrfItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invTrf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trfNo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Color"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetInvProductsQuery, GetInvProductsQueryVariables>;
export const UpdateInvProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInvProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvProductUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]} as unknown as DocumentNode<UpdateInvProductMutation, UpdateInvProductMutationVariables>;
export const UpdateInvProductDiscDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInvProductDisc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvProductUpdateDiscDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvProductDisc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"discounts"}}]}}]}}]} as unknown as DocumentNode<UpdateInvProductDiscMutation, UpdateInvProductDiscMutationVariables>;
export const DeleteInvProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}]}]}}]} as unknown as DocumentNode<DeleteInvProductMutation, DeleteInvProductMutationVariables>;
export const UploadNewInvProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadNewInvProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CsvUploadDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadNewInvProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UploadNewInvProductsMutation, UploadNewInvProductsMutationVariables>;
export const UploadInvProductDiscountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadInvProductDiscounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CsvUploadDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadInvProductDiscounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UploadInvProductDiscountsMutation, UploadInvProductDiscountsMutationVariables>;
export const GetInvTrfItemTrfsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvTrfItemTrfs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvTrfItemTrfs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fromInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"invTrfItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invTrf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trfNo"}},{"kind":"Field","name":{"kind":"Name","value":"trfDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetInvTrfItemTrfsQuery, GetInvTrfItemTrfsQueryVariables>;
export const GetInvTrfItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvTrfItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromInvId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toInvId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"progress"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Progress"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvTrfItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromInvId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromInvId"}}},{"kind":"Argument","name":{"kind":"Name","value":"toInvId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toInvId"}}},{"kind":"Argument","name":{"kind":"Name","value":"progress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"progress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fromInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discounts"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"invTrfItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invTrf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetInvTrfItemsQuery, GetInvTrfItemsQueryVariables>;
export const GetInvTrfsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvTrfs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvTrfs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trfNo"}},{"kind":"Field","name":{"kind":"Name","value":"work"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fromInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trfDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}}]}}]}}]} as unknown as DocumentNode<GetInvTrfsQuery, GetInvTrfsQueryVariables>;
export const GetInvTrfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvTrf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvTrf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trfNo"}},{"kind":"Field","name":{"kind":"Name","value":"fromInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"priceFormula"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profitMargins"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"trfDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"invTrfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fromInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toInv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discounts"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"invTrfItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invTrfItemId"}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetInvTrfQuery, GetInvTrfQueryVariables>;
export const CreateInvTrfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInvTrf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvTrfCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvTrf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInvTrfMutation, CreateInvTrfMutationVariables>;
export const UpdateInvTrfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInvTrf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvTrfUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvTrf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateInvTrfMutation, UpdateInvTrfMutationVariables>;
export const DeleteInvTrfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvTrf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvTrf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteInvTrfMutation, DeleteInvTrfMutationVariables>;
export const CreateInvTrfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInvTrfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvTrfItemCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvTrfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInvTrfItemMutation, CreateInvTrfItemMutationVariables>;
export const DeleteInvTrfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvTrfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvTrfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteInvTrfItemMutation, DeleteInvTrfItemMutationVariables>;
export const GenerateInvTrfNoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"generateInvTrfNo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateInvTrfNo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<GenerateInvTrfNoQuery, GenerateInvTrfNoQueryVariables>;
export const GetInvTxsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvTxs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvTxs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"saleId"}},{"kind":"Field","name":{"kind":"Name","value":"trfId"}},{"kind":"Field","name":{"kind":"Name","value":"adjId"}},{"kind":"Field","name":{"kind":"Name","value":"invTxSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"txNo"}},{"kind":"Field","name":{"kind":"Name","value":"txDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetInvTxsQuery, GetInvTxsQueryVariables>;
export const GetInvProductPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvProductPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discounts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvProductPrice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"discounts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discounts"}}}]}]}}]} as unknown as DocumentNode<GetInvProductPriceQuery, GetInvProductPriceQueryVariables>;
export const DownloadInvProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"downloadInvProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadInvProducts"}}]}}]} as unknown as DocumentNode<DownloadInvProductsQuery, DownloadInvProductsQueryVariables>;
export const GetInvAdjsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvAdjs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvAdjs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adjNo"}},{"kind":"Field","name":{"kind":"Name","value":"adjDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"itemCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalVariance"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetInvAdjsQuery, GetInvAdjsQueryVariables>;
export const GetInvAdjDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvAdj"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvAdj"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adjNo"}},{"kind":"Field","name":{"kind":"Name","value":"adjDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invAdjItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invAdjItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"systemQty"}},{"kind":"Field","name":{"kind":"Name","value":"countedQty"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetInvAdjQuery, GetInvAdjQueryVariables>;
export const GenerateInvAdjNoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"generateInvAdjNo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateInvAdjNo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<GenerateInvAdjNoQuery, GenerateInvAdjNoQueryVariables>;
export const CreateInvAdjDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInvAdj"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvAdjCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvAdj"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInvAdjMutation, CreateInvAdjMutationVariables>;
export const UpdateInvAdjDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInvAdj"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvAdjUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvAdj"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateInvAdjMutation, UpdateInvAdjMutationVariables>;
export const PostInvAdjDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"postInvAdj"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postInvAdj"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}}]}}]}}]} as unknown as DocumentNode<PostInvAdjMutation, PostInvAdjMutationVariables>;
export const DeleteInvAdjDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvAdj"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvAdj"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteInvAdjMutation, DeleteInvAdjMutationVariables>;
export const CreatePrdouctCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPrdouctCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategoryCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<CreatePrdouctCategoryMutation, CreatePrdouctCategoryMutationVariables>;
export const UpdateProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategoryCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductCategoryMutation, UpdateProductCategoryMutationVariables>;
export const DeleteProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductCategoryMutation, DeleteProductCategoryMutationVariables>;
export const CreateProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductGroupCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategoryId"}}]}}]}}]} as unknown as DocumentNode<CreateProductGroupMutation, CreateProductGroupMutationVariables>;
export const UpdateProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductGroupUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductGroupMutation, UpdateProductGroupMutationVariables>;
export const DeleteProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductGroupMutation, DeleteProductGroupMutationVariables>;
export const UploadNewProductGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadNewProductGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CsvUploadDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadNewProductGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UploadNewProductGroupsMutation, UploadNewProductGroupsMutationVariables>;
export const UploadProductGroupMsrpsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadProductGroupMsrps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CsvUploadDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadProductGroupMsrps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UploadProductGroupMsrpsMutation, UploadProductGroupMsrpsMutationVariables>;
export const UploadNewProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadNewProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CsvUploadDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadNewProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UploadNewProductsMutation, UploadNewProductsMutationVariables>;
export const CreateColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColorCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Color"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Color"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<CreateColorMutation, CreateColorMutationVariables>;
export const UpdateColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColorCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateColorMutation, UpdateColorMutationVariables>;
export const DeleteColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteColorMutation, DeleteColorMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const UpsertLaborCostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertLaborCosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCostUpsertDto"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertLaborCosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productGroupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productGroupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpsertLaborCostsMutation, UpsertLaborCostsMutationVariables>;
export const UpdateLaborCostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateLaborCosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCostUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLaborCosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UpdateLaborCostsMutation, UpdateLaborCostsMutationVariables>;
export const GetProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>;
export const GetProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductCategoryQuery, GetProductCategoryQueryVariables>;
export const GetColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Color"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Color"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetColorsQuery, GetColorsQueryVariables>;
export const GetColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Color"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Color"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetColorQuery, GetColorQueryVariables>;
export const GetProductGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductGroupsQuery, GetProductGroupsQueryVariables>;
export const GetProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"msrp"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductGroupQuery, GetProductGroupQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"msrp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Color"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Color"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"msrp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetLaborCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLaborCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLaborCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"laborCosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaborCost"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCost"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetLaborCostQuery, GetLaborCostQueryVariables>;
export const GetLaborCostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLaborCosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLaborCosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"laborCosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaborCost"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCost"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetLaborCostsQuery, GetLaborCostsQueryVariables>;
export const DownloadProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"downloadProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadProducts"}}]}}]} as unknown as DocumentNode<DownloadProductsQuery, DownloadProductsQueryVariables>;
export const DownloadProductGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"downloadProductGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadProductGroups"}}]}}]} as unknown as DocumentNode<DownloadProductGroupsQuery, DownloadProductGroupsQueryVariables>;
export const CreateSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SizeCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSizeMutation, CreateSizeMutationVariables>;
export const UpdateSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SizeCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSizeMutation, UpdateSizeMutationVariables>;
export const DeleteSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSizeMutation, DeleteSizeMutationVariables>;
export const GetSizesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetSizesQuery, GetSizesQueryVariables>;
export const GetSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetSizeQuery, GetSizeQueryVariables>;
export const CreateWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWorkMutation, CreateWorkMutationVariables>;
export const UpdateWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkMutation, UpdateWorkMutationVariables>;
export const DeleteWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteWorkMutation, DeleteWorkMutationVariables>;
export const GetWorksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWorks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWorks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkAndTasks"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskAndArtisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskAndArtisanDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"workId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"artisan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkAndTasks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkAndTasksDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"workSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskAndArtisan"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"invTrf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trfNo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetWorksQuery, GetWorksQueryVariables>;
export const GetWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Work"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Work"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkAndTasksDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"workSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<GetWorkQuery, GetWorkQueryVariables>;
export const GetTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskAndArtisan"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskAndArtisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskAndArtisanDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"workId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"artisan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}}]}}]} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const UpdateTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskUpdateDto"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTasksMutation, UpdateTasksMutationVariables>;
export const AddToInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addToInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddToInventoryDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<AddToInventoryMutation, AddToInventoryMutationVariables>;
export const GetPayrollDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPayroll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPayroll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artisans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payablePerTask"}},{"kind":"Field","name":{"kind":"Name","value":"costPerTask"}},{"kind":"Field","name":{"kind":"Name","value":"quantityPerTask"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}},{"kind":"Field","name":{"kind":"Name","value":"work"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"workSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eu"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"payablePerArtisan"}},{"kind":"Field","name":{"kind":"Name","value":"quantityPerArtisan"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalPayable"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}}]}}]}}]} as unknown as DocumentNode<GetPayrollQuery, GetPayrollQueryVariables>;
export const GenerateOrderNoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"generateOrderNo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateOrderNo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<GenerateOrderNoQuery, GenerateOrderNoQueryVariables>;
export const GetWorkAuditTrailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWorkAuditTrail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}}]} as unknown as DocumentNode<GetWorkAuditTrailQuery, GetWorkAuditTrailQueryVariables>;
export const CreateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaleCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSaleMutation, CreateSaleMutationVariables>;
export const GetSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SaleDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"saleNo"}},{"kind":"Field","name":{"kind":"Name","value":"saleItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saleItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSalesQuery, GetSalesQueryVariables>;
export const GetSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}},{"kind":"Field","name":{"kind":"Name","value":"jp"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SaleDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"saleNo"}},{"kind":"Field","name":{"kind":"Name","value":"saleItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"invId"}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saleItemSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSaleQuery, GetSaleQueryVariables>;
export const GenerateSaleNoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"generateSaleNo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateSaleNo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<GenerateSaleNoQuery, GenerateSaleNoQueryVariables>;
export const DeleteSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSaleMutation, DeleteSaleMutationVariables>;
export const GetSalePerformanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSalePerformance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalePerformance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"invId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"productCategoryName"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}}]}}]}}]} as unknown as DocumentNode<GetSalePerformanceQuery, GetSalePerformanceQueryVariables>;