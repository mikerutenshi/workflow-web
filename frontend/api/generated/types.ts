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
};

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

export type Color = {
  __typename?: 'Color';
  hexCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateArtisanDto = {
  createdBy: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
  jobs: Array<Job>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateColorDto = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateLaborCostDto = {
  createdBy: Scalars['ID']['input'];
  drawingLining: Scalars['Float']['input'];
  drawingUpper: Scalars['Float']['input'];
  lasting: Scalars['Float']['input'];
  productGroupId: Scalars['ID']['input'];
  stitchingInsole?: InputMaybe<Scalars['Float']['input']>;
  stitchingOutsole?: InputMaybe<Scalars['Float']['input']>;
  stitchingUpper: Scalars['Float']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateProductCategoryDto = {
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateProductDto = {
  colorIds: Array<Scalars['ID']['input']>;
  createdBy: Scalars['ID']['input'];
  productGroupId: Scalars['ID']['input'];
  sku: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateProductGroupDto = {
  createdBy: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  productCategoryId: Scalars['ID']['input'];
  skuNumeric: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateSizeDto = {
  eu: Scalars['String']['input'];
  uk?: InputMaybe<Scalars['String']['input']>;
  us?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserDto = {
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  roleId: Scalars['ID']['input'];
};

export type CreateWorkDto = {
  createdBy: Scalars['ID']['input'];
  date: Scalars['Date']['input'];
  orderNo: Scalars['Float']['input'];
  productId: Scalars['ID']['input'];
  sizes: Array<SizeToWorkDto>;
};

export enum Gender {
  Kids = 'KIDS',
  Men = 'MEN',
  Women = 'WOMEN'
}

export type GetProductGroupsDto = {
  __typename?: 'GetProductGroupsDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  laborCost?: Maybe<LaborCost>;
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['ID']['output'];
  products?: Maybe<Array<Maybe<ProductWithColorDto>>>;
  skuNumeric: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type GetProductsDto = {
  __typename?: 'GetProductsDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  productColors: Array<ProductColorsWithColor>;
  productGroup: ProductGroupWithCategoryDto;
  productGroupId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export enum Job {
  InsoleStitch = 'INSOLE_STITCH',
  Last = 'LAST',
  LiningDraw = 'LINING_DRAW',
  OutsoleStitch = 'OUTSOLE_STITCH',
  UpperDraw = 'UPPER_DRAW',
  UpperStitch = 'UPPER_STITCH'
}

export type LaborCost = {
  __typename?: 'LaborCost';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  drawingLining: Scalars['Float']['output'];
  drawingUpper: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lasting: Scalars['Float']['output'];
  productGroupId: Scalars['ID']['output'];
  stitchingInsole?: Maybe<Scalars['Float']['output']>;
  stitchingOutsole?: Maybe<Scalars['Float']['output']>;
  stitchingUpper: Scalars['Float']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type LogInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArtisan: Artisan;
  createColor: Color;
  createLaborCost: LaborCost;
  createProduct: Product;
  createProductCategory: ProductCategory;
  createProductGroup: ProductGroup;
  createRole: Role;
  createSize: Size;
  createUser: User;
  createWork: Work;
  deleteArtisan: Scalars['Boolean']['output'];
  deleteColor: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteProductCategory: Scalars['Boolean']['output'];
  deleteProductGroup: Scalars['Boolean']['output'];
  deleteSize: Scalars['Boolean']['output'];
  deleteWork: Scalars['Boolean']['output'];
  logIn: User;
  logOut: User;
  updateArtisan: Artisan;
  updateColor: Color;
  updateLaborCost: LaborCost;
  updateProduct: Product;
  updateProductCategory: ProductCategory;
  updateProductGroup: ProductGroup;
  updateSize: Size;
  updateWork: Work;
};


export type MutationCreateArtisanArgs = {
  data: CreateArtisanDto;
};


export type MutationCreateColorArgs = {
  data: CreateColorDto;
};


export type MutationCreateLaborCostArgs = {
  data: CreateLaborCostDto;
};


export type MutationCreateProductArgs = {
  data: CreateProductDto;
};


export type MutationCreateProductCategoryArgs = {
  data: CreateProductCategoryDto;
};


export type MutationCreateProductGroupArgs = {
  data: CreateProductGroupDto;
};


export type MutationCreateRoleArgs = {
  data: RoleDto;
};


export type MutationCreateSizeArgs = {
  data: CreateSizeDto;
};


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};


export type MutationCreateWorkArgs = {
  data: CreateWorkDto;
};


export type MutationDeleteArtisanArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteColorArgs = {
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


export type MutationDeleteSizeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLogInArgs = {
  data: LogInDto;
};


export type MutationUpdateArtisanArgs = {
  data: CreateArtisanDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateColorArgs = {
  data: CreateColorDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateLaborCostArgs = {
  data: CreateLaborCostDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductArgs = {
  data: CreateProductDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductCategoryArgs = {
  data: CreateProductCategoryDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductGroupArgs = {
  data: CreateProductGroupDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSizeArgs = {
  data: CreateSizeDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateWorkArgs = {
  data: UpdateWorkDto;
  id: Scalars['ID']['input'];
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

export type ProductColorsWithColor = {
  __typename?: 'ProductColorsWithColor';
  color: Color;
  colorId: Scalars['ID']['output'];
  order: Scalars['Float']['output'];
  productId: Scalars['ID']['output'];
};

export type ProductGroup = {
  __typename?: 'ProductGroup';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ProductGroupWithCategoryDto = {
  __typename?: 'ProductGroupWithCategoryDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ProductWithColorDto = {
  __typename?: 'ProductWithColorDto';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  productColors: Array<ProductColorsWithColor>;
  productGroupId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getArtisan: Artisan;
  getArtisans: Array<Artisan>;
  getColor: Color;
  getColors: Array<Color>;
  getLaborCosts: Array<LaborCost>;
  getProduct: GetProductsDto;
  getProductCategories: Array<ProductCategory>;
  getProductCategory: ProductCategory;
  getProductGroup: GetProductGroupsDto;
  getProductGroups: Array<GetProductGroupsDto>;
  getProducts: Array<GetProductsDto>;
  getSize: Size;
  getSizes: Array<Size>;
  getUsers: Array<User>;
  getWork: WorkWithTasks;
  getWorks: Array<WorkWithTasks>;
  me: User;
};


export type QueryGetArtisanArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetColorArgs = {
  id: Scalars['ID']['input'];
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


export type QueryGetSizeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetWorkArgs = {
  id: Scalars['ID']['input'];
};

export type Role = {
  __typename?: 'Role';
  clearanceLevel: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type RoleDto = {
  cleareanceLevel: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Size = {
  __typename?: 'Size';
  eu: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  uk?: Maybe<Scalars['String']['output']>;
  us?: Maybe<Scalars['String']['output']>;
};

export type SizeToWork = {
  __typename?: 'SizeToWork';
  quantity: Scalars['Float']['output'];
  size: Size;
  sizeId: Scalars['ID']['output'];
  workId: Scalars['ID']['output'];
};

export type SizeToWorkDto = {
  id: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type Task = {
  __typename?: 'Task';
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

export type UpdateWorkDto = {
  createdBy: Scalars['ID']['input'];
  date: Scalars['Date']['input'];
  orderNo: Scalars['Float']['input'];
  productId: Scalars['ID']['input'];
  sizes: Array<SizeToWorkDto>;
  updatedBy: Scalars['ID']['input'];
};

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
};

export type Work = {
  __typename?: 'Work';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  orderNo: Scalars['Float']['output'];
  productId: Scalars['ID']['output'];
  sizes: Array<SizeToWork>;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type WorkWithTasks = {
  __typename?: 'WorkWithTasks';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  orderNo: Scalars['Float']['output'];
  product: Product;
  productId: Scalars['ID']['output'];
  sizes: Array<SizeToWork>;
  tasks: Array<Task>;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type ArtisanFragment = { __typename?: 'Artisan', id: string, firstName: string, lastName?: string | null, jobs: Array<Job>, createdBy: string, updatedBy?: string | null };

export type CreateArtisanMutationVariables = Exact<{
  data: CreateArtisanDto;
}>;


export type CreateArtisanMutation = { __typename?: 'Mutation', createArtisan: { __typename?: 'Artisan', id: string } };

export type UpdateArtisanMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: CreateArtisanDto;
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

export type AuthUserFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null };

export type LogInMutationVariables = Exact<{
  data: LogInDto;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, createdAt: any, role: { __typename?: 'Role', name: string } }> };

export type ProductCategoryFragFragment = { __typename?: 'ProductCategory', id: string, name: string, gender: Gender };

export type ColorFragFragment = { __typename?: 'Color', id: string, name: string, hexCode: string };

export type LaborCostFragFragment = { __typename?: 'LaborCost', id: string, drawingUpper: number, drawingLining: number, stitchingUpper: number, stitchingInsole?: number | null, stitchingOutsole?: number | null, lasting: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any };

export type CreatePrdouctCategoryMutationVariables = Exact<{
  data: CreateProductCategoryDto;
}>;


export type CreatePrdouctCategoryMutation = { __typename?: 'Mutation', createProductCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } };

export type UpdateProductCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: CreateProductCategoryDto;
}>;


export type UpdateProductCategoryMutation = { __typename?: 'Mutation', updateProductCategory: { __typename?: 'ProductCategory', id: string } };

export type DeleteProductCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductCategoryMutation = { __typename?: 'Mutation', deleteProductCategory: boolean };

export type CreateProductGroupMutationVariables = Exact<{
  data: CreateProductGroupDto;
}>;


export type CreateProductGroupMutation = { __typename?: 'Mutation', createProductGroup: { __typename?: 'ProductGroup', id: string, skuNumeric: string, name?: string | null, productCategoryId: string } };

export type UpdateProductGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: CreateProductGroupDto;
}>;


export type UpdateProductGroupMutation = { __typename?: 'Mutation', updateProductGroup: { __typename?: 'ProductGroup', id: string } };

export type DeleteProductGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductGroupMutation = { __typename?: 'Mutation', deleteProductGroup: boolean };

export type CreateColorMutationVariables = Exact<{
  data: CreateColorDto;
}>;


export type CreateColorMutation = { __typename?: 'Mutation', createColor: { __typename?: 'Color', id: string, name: string, hexCode: string } };

export type UpdateColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: CreateColorDto;
}>;


export type UpdateColorMutation = { __typename?: 'Mutation', updateColor: { __typename?: 'Color', id: string } };

export type DeleteColorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteColorMutation = { __typename?: 'Mutation', deleteColor: boolean };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: CreateProductDto;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type CreateLaborCostMutationVariables = Exact<{
  data: CreateLaborCostDto;
}>;


export type CreateLaborCostMutation = { __typename?: 'Mutation', createLaborCost: { __typename?: 'LaborCost', id: string } };

export type UpdateLaborCostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: CreateLaborCostDto;
}>;


export type UpdateLaborCostMutation = { __typename?: 'Mutation', updateLaborCost: { __typename?: 'LaborCost', id: string } };

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


export type GetProductGroupsQuery = { __typename?: 'Query', getProductGroups: Array<{ __typename?: 'GetProductGroupsDto', id: string, skuNumeric: string, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender }, laborCost?: { __typename?: 'LaborCost', id: string, drawingUpper: number, drawingLining: number, stitchingUpper: number, stitchingInsole?: number | null, stitchingOutsole?: number | null, lasting: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any } | null }> };

export type GetProductGroupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductGroupQuery = { __typename?: 'Query', getProductGroup: { __typename?: 'GetProductGroupsDto', id: string, skuNumeric: string, name?: string | null, createdBy: string, updatedBy?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender }, laborCost?: { __typename?: 'LaborCost', id: string, drawingUpper: number, drawingLining: number, stitchingUpper: number, stitchingInsole?: number | null, stitchingOutsole?: number | null, lasting: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any } | null } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'GetProductsDto', id: string, sku: string, productGroup: { __typename?: 'ProductGroupWithCategoryDto', id: string, skuNumeric: string, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } }, productColors: Array<{ __typename?: 'ProductColorsWithColor', order: number, color: { __typename?: 'Color', id: string, name: string, hexCode: string } }> }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename?: 'GetProductsDto', id: string, sku: string, productGroup: { __typename?: 'ProductGroupWithCategoryDto', id: string }, productColors: Array<{ __typename?: 'ProductColorsWithColor', order: number, color: { __typename?: 'Color', id: string } }> } };

export type SizeFragment = { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null };

export type TaskFragment = { __typename?: 'Task', id: string, type: Job, doneAt?: any | null, artisanId?: string | null };

export type WorkWithTasksFragment = { __typename?: 'WorkWithTasks', id: string, date: any, orderNo: number, productId: string, createdBy: string, updatedBy?: string | null, sizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null } }>, tasks: Array<{ __typename?: 'Task', id: string, type: Job, doneAt?: any | null, artisanId?: string | null }>, product: { __typename?: 'Product', sku: string } };

export type CreateSizeMutationVariables = Exact<{
  data: CreateSizeDto;
}>;


export type CreateSizeMutation = { __typename?: 'Mutation', createSize: { __typename?: 'Size', id: string } };

export type UpdateSizeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: CreateSizeDto;
}>;


export type UpdateSizeMutation = { __typename?: 'Mutation', updateSize: { __typename?: 'Size', id: string } };

export type DeleteSizeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSizeMutation = { __typename?: 'Mutation', deleteSize: boolean };

export type GetSizesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSizesQuery = { __typename?: 'Query', getSizes: Array<{ __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null }> };

export type GetSizeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSizeQuery = { __typename?: 'Query', getSize: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null } };

export type CreateWorkMutationVariables = Exact<{
  data: CreateWorkDto;
}>;


export type CreateWorkMutation = { __typename?: 'Mutation', createWork: { __typename?: 'Work', id: string } };

export type UpdateWorkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateWorkDto;
}>;


export type UpdateWorkMutation = { __typename?: 'Mutation', updateWork: { __typename?: 'Work', id: string } };

export type DeleteWorkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWorkMutation = { __typename?: 'Mutation', deleteWork: boolean };

export type GetWorksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorksQuery = { __typename?: 'Query', getWorks: Array<{ __typename?: 'WorkWithTasks', id: string, date: any, orderNo: number, productId: string, createdBy: string, updatedBy?: string | null, sizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null } }>, tasks: Array<{ __typename?: 'Task', id: string, type: Job, doneAt?: any | null, artisanId?: string | null }>, product: { __typename?: 'Product', sku: string } }> };

export type GetWorkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetWorkQuery = { __typename?: 'Query', getWork: { __typename?: 'WorkWithTasks', id: string, date: any, orderNo: number, productId: string, createdBy: string, updatedBy?: string | null, sizes: Array<{ __typename?: 'SizeToWork', quantity: number, size: { __typename?: 'Size', id: string, eu: string, us?: string | null, uk?: string | null } }>, tasks: Array<{ __typename?: 'Task', id: string, type: Job, doneAt?: any | null, artisanId?: string | null }>, product: { __typename?: 'Product', sku: string } } };

export const ArtisanFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Artisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artisan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<ArtisanFragment, unknown>;
export const AuthUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<AuthUserFragment, unknown>;
export const ProductCategoryFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ProductCategoryFragFragment, unknown>;
export const ColorFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<ColorFragFragment, unknown>;
export const LaborCostFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCostFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"drawingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"drawingLining"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingInsole"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingOutsole"}},{"kind":"Field","name":{"kind":"Name","value":"lasting"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<LaborCostFragFragment, unknown>;
export const SizeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}}]}}]} as unknown as DocumentNode<SizeFragment, unknown>;
export const TaskFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}},{"kind":"Field","name":{"kind":"Name","value":"artisanId"}}]}}]} as unknown as DocumentNode<TaskFragment, unknown>;
export const WorkWithTasksFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkWithTasks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkWithTasks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Task"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}},{"kind":"Field","name":{"kind":"Name","value":"artisanId"}}]}}]} as unknown as DocumentNode<WorkWithTasksFragment, unknown>;
export const CreateArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateArtisanDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateArtisanMutation, CreateArtisanMutationVariables>;
export const UpdateArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateArtisanDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateArtisanMutation, UpdateArtisanMutationVariables>;
export const DeleteArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteArtisanMutation, DeleteArtisanMutationVariables>;
export const GetArtisansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getArtisans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArtisans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Artisan"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Artisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artisan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<GetArtisansQuery, GetArtisansQueryVariables>;
export const GetArtisanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getArtisan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArtisan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Artisan"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Artisan"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artisan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<GetArtisanQuery, GetArtisanQueryVariables>;
export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const CreatePrdouctCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPrdouctCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductCategoryDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<CreatePrdouctCategoryMutation, CreatePrdouctCategoryMutationVariables>;
export const UpdateProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductCategoryDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductCategoryMutation, UpdateProductCategoryMutationVariables>;
export const DeleteProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductCategoryMutation, DeleteProductCategoryMutationVariables>;
export const CreateProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductGroupDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategoryId"}}]}}]}}]} as unknown as DocumentNode<CreateProductGroupMutation, CreateProductGroupMutationVariables>;
export const UpdateProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductGroupDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductGroupMutation, UpdateProductGroupMutationVariables>;
export const DeleteProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductGroupMutation, DeleteProductGroupMutationVariables>;
export const CreateColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateColorDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<CreateColorMutation, CreateColorMutationVariables>;
export const UpdateColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateColorDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateColorMutation, UpdateColorMutationVariables>;
export const DeleteColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteColorMutation, DeleteColorMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const CreateLaborCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLaborCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLaborCostDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLaborCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLaborCostMutation, CreateLaborCostMutationVariables>;
export const UpdateLaborCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateLaborCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLaborCostDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLaborCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLaborCostMutation, UpdateLaborCostMutationVariables>;
export const GetProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>;
export const GetProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductCategoryQuery, GetProductCategoryQueryVariables>;
export const GetColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetColorsQuery, GetColorsQueryVariables>;
export const GetColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetColorQuery, GetColorQueryVariables>;
export const GetProductGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"laborCost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaborCostFrag"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCostFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"drawingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"drawingLining"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingInsole"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingOutsole"}},{"kind":"Field","name":{"kind":"Name","value":"lasting"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetProductGroupsQuery, GetProductGroupsQueryVariables>;
export const GetProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"laborCost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaborCostFrag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCostFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"drawingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"drawingLining"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingInsole"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingOutsole"}},{"kind":"Field","name":{"kind":"Name","value":"lasting"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetProductGroupQuery, GetProductGroupQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const CreateSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSizeDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSizeMutation, CreateSizeMutationVariables>;
export const UpdateSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSizeDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSizeMutation, UpdateSizeMutationVariables>;
export const DeleteSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSizeMutation, DeleteSizeMutationVariables>;
export const GetSizesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}}]}}]} as unknown as DocumentNode<GetSizesQuery, GetSizesQueryVariables>;
export const GetSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}}]}}]} as unknown as DocumentNode<GetSizeQuery, GetSizeQueryVariables>;
export const CreateWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWorkMutation, CreateWorkMutationVariables>;
export const UpdateWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkMutation, UpdateWorkMutationVariables>;
export const DeleteWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteWorkMutation, DeleteWorkMutationVariables>;
export const GetWorksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWorks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWorks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkWithTasks"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}},{"kind":"Field","name":{"kind":"Name","value":"artisanId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkWithTasks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkWithTasks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Task"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<GetWorksQuery, GetWorksQueryVariables>;
export const GetWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkWithTasks"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Size"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Size"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eu"}},{"kind":"Field","name":{"kind":"Name","value":"us"}},{"kind":"Field","name":{"kind":"Name","value":"uk"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"doneAt"}},{"kind":"Field","name":{"kind":"Name","value":"artisanId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkWithTasks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkWithTasks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"orderNo"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Task"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]} as unknown as DocumentNode<GetWorkQuery, GetWorkQueryVariables>;