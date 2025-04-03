import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type Color = {
  __typename?: 'Color';
  hexCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
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
};

export type CreateProductGroupDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  productCategoryId: Scalars['String']['input'];
  skuNumeric: Scalars['String']['input'];
};

export type CreateUserDto = {
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId: Scalars['ID']['input'];
};

export enum Gender {
  Kids = 'KIDS',
  Men = 'MEN',
  Women = 'WOMEN'
}

export type GetProductGroupsDto = {
  __typename?: 'GetProductGroupsDto';
  id: Scalars['ID']['output'];
  laborCost?: Maybe<LaborCost>;
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['ID']['output'];
  products?: Maybe<Array<Maybe<ProductWithColorDto>>>;
  skuNumeric: Scalars['String']['output'];
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
  createColor: Color;
  createLaborCost: LaborCost;
  createProduct: Product;
  createProductCategory: ProductCategory;
  createProductGroup: ProductGroup;
  createRole: Role;
  createUser: User;
  deleteProduct: Scalars['Boolean']['output'];
  logIn: User;
  logOut: User;
  updateLaborCost: LaborCost;
  updateProduct: Product;
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


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLogInArgs = {
  data: LogInDto;
};


export type MutationUpdateLaborCostArgs = {
  data: CreateLaborCostDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductArgs = {
  data: UpdateProductDto;
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
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
};

export type ProductGroupWithCategoryDto = {
  __typename?: 'ProductGroupWithCategoryDto';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['ID']['output'];
  skuNumeric: Scalars['String']['output'];
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
  getColors: Array<Color>;
  getLaborCosts: Array<LaborCost>;
  getProduct: GetProductsDto;
  getProductCategories: Array<ProductCategory>;
  getProductGroup: GetProductGroupsDto;
  getProductGroups: Array<GetProductGroupsDto>;
  getProducts: Array<GetProductsDto>;
  getUsers: Array<User>;
  me: User;
};


export type QueryGetProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProductGroupArgs = {
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

export type UpdateProductDto = {
  colorIds: Array<Scalars['ID']['input']>;
  productGroupId: Scalars['ID']['input'];
  sku: Scalars['String']['input'];
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
  lastName: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type AuthUserFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName: string };

export type LogInMutationVariables = Exact<{
  data: LogInDto;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, createdAt: any, role: { __typename?: 'Role', name: string } }> };

export type ProductCategoryFragFragment = { __typename?: 'ProductCategory', id: string, name: string, gender: Gender };

export type ColorFragFragment = { __typename?: 'Color', id: string, name: string, hexCode: string };

export type LaborCostFragFragment = { __typename?: 'LaborCost', id: string, drawingUpper: number, drawingLining: number, stitchingUpper: number, stitchingInsole?: number | null, stitchingOutsole?: number | null, lasting: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any };

export type CreatePrdouctCategoryMutationVariables = Exact<{
  data: CreateProductCategoryDto;
}>;


export type CreatePrdouctCategoryMutation = { __typename?: 'Mutation', createProductCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } };

export type CreateProductGroupMutationVariables = Exact<{
  data: CreateProductGroupDto;
}>;


export type CreateProductGroupMutation = { __typename?: 'Mutation', createProductGroup: { __typename?: 'ProductGroup', id: string, skuNumeric: string, name?: string | null, productCategoryId: string } };

export type CreateColorMutationVariables = Exact<{
  data: CreateColorDto;
}>;


export type CreateColorMutation = { __typename?: 'Mutation', createColor: { __typename?: 'Color', id: string, name: string, hexCode: string } };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateProductDto;
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

export type GetColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsQuery = { __typename?: 'Query', getColors: Array<{ __typename?: 'Color', id: string, name: string, hexCode: string }> };

export type GetProductGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductGroupsQuery = { __typename?: 'Query', getProductGroups: Array<{ __typename?: 'GetProductGroupsDto', id: string, skuNumeric: string, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender }, laborCost?: { __typename?: 'LaborCost', id: string, drawingUpper: number, drawingLining: number, stitchingUpper: number, stitchingInsole?: number | null, stitchingOutsole?: number | null, lasting: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any } | null }> };

export type GetProductGroupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductGroupQuery = { __typename?: 'Query', getProductGroup: { __typename?: 'GetProductGroupsDto', id: string, skuNumeric: string, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender }, laborCost?: { __typename?: 'LaborCost', id: string, drawingUpper: number, drawingLining: number, stitchingUpper: number, stitchingInsole?: number | null, stitchingOutsole?: number | null, lasting: number, createdBy: string, createdAt: any, updatedBy?: string | null, updatedAt: any } | null } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'GetProductsDto', id: string, sku: string, productGroup: { __typename?: 'ProductGroupWithCategoryDto', id: string, skuNumeric: string, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } }, productColors: Array<{ __typename?: 'ProductColorsWithColor', order: number, color: { __typename?: 'Color', id: string, name: string, hexCode: string } }> }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename?: 'GetProductsDto', id: string, sku: string, productGroup: { __typename?: 'ProductGroupWithCategoryDto', id: string }, productColors: Array<{ __typename?: 'ProductColorsWithColor', order: number, color: { __typename?: 'Color', id: string } }> } };

export const AuthUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<AuthUserFragment, unknown>;
export const ProductCategoryFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ProductCategoryFragFragment, unknown>;
export const ColorFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<ColorFragFragment, unknown>;
export const LaborCostFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCostFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"drawingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"drawingLining"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingInsole"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingOutsole"}},{"kind":"Field","name":{"kind":"Name","value":"lasting"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<LaborCostFragFragment, unknown>;
export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const CreatePrdouctCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPrdouctCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductCategoryDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<CreatePrdouctCategoryMutation, CreatePrdouctCategoryMutationVariables>;
export const CreateProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductGroupDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategoryId"}}]}}]}}]} as unknown as DocumentNode<CreateProductGroupMutation, CreateProductGroupMutationVariables>;
export const CreateColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateColorDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<CreateColorMutation, CreateColorMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const CreateLaborCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLaborCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLaborCostDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLaborCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLaborCostMutation, CreateLaborCostMutationVariables>;
export const UpdateLaborCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateLaborCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLaborCostDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLaborCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLaborCostMutation, UpdateLaborCostMutationVariables>;
export const GetProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>;
export const GetColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetColorsQuery, GetColorsQueryVariables>;
export const GetProductGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"laborCost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaborCostFrag"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCostFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"drawingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"drawingLining"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingInsole"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingOutsole"}},{"kind":"Field","name":{"kind":"Name","value":"lasting"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetProductGroupsQuery, GetProductGroupsQueryVariables>;
export const GetProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"laborCost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LaborCostFrag"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LaborCostFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LaborCost"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"drawingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"drawingLining"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingInsole"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingOutsole"}},{"kind":"Field","name":{"kind":"Name","value":"lasting"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetProductGroupQuery, GetProductGroupQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;