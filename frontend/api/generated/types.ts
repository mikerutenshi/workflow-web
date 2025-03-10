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

export type ColorDto = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserDto = {
  createdBy?: InputMaybe<Scalars['Float']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId: Scalars['Float']['input'];
};

export enum Gender {
  Kids = 'KIDS',
  Men = 'MEN',
  Women = 'WOMEN'
}

export type GetProductGroup = {
  __typename?: 'GetProductGroup';
  id: Scalars['ID']['output'];
  labourCost?: Maybe<LabourCost>;
  name?: Maybe<Scalars['String']['output']>;
  productCategory: ProductCategory;
  productCategoryId: Scalars['Float']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  skuNumeric: Scalars['Float']['output'];
};

export type LabourCost = {
  __typename?: 'LabourCost';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['Float']['output'];
  drawingLining: Scalars['Float']['output'];
  drawingUpper: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lasting: Scalars['Float']['output'];
  productGroup: ProductGroup;
  skuNumeric: Scalars['Float']['output'];
  stitchingInsole?: Maybe<Scalars['Float']['output']>;
  stitchingOutsole?: Maybe<Scalars['Float']['output']>;
  stitchingUpper: Scalars['Float']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['Float']['output']>;
};

export type LabourCostDto = {
  createdBy: Scalars['Float']['input'];
  drawingLining: Scalars['Float']['input'];
  drawingUpper: Scalars['Float']['input'];
  lasting: Scalars['Float']['input'];
  productGroupId: Scalars['Float']['input'];
  skuNumeric: Scalars['Float']['input'];
  stitchingInsole?: InputMaybe<Scalars['Float']['input']>;
  stitchingOutsole?: InputMaybe<Scalars['Float']['input']>;
  stitchingUpper: Scalars['Float']['input'];
  updatedBy?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createColor: Color;
  createLabourCost: LabourCost;
  createProduct: Product;
  createProductCategory: ProductCategory;
  createProductGroup: ProductGroup;
  createRole: Role;
  createUser: User;
  signIn: User;
  signOut: User;
};


export type MutationCreateColorArgs = {
  data: ColorDto;
};


export type MutationCreateLabourCostArgs = {
  data: LabourCostDto;
};


export type MutationCreateProductArgs = {
  data: ProductDto;
};


export type MutationCreateProductCategoryArgs = {
  data: ProductCategoryDto;
};


export type MutationCreateProductGroupArgs = {
  data: ProductGroupDto;
};


export type MutationCreateRoleArgs = {
  data: RoleDto;
};


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};


export type MutationSignInArgs = {
  data: SignInDto;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['Date']['output'];
  createdBy: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  productColors: Array<ProductColors>;
  productGroup: ProductGroup;
  sku: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['Float']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  gender: Gender;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ProductCategoryDto = {
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ProductColors = {
  __typename?: 'ProductColors';
  color: Color;
  colorId: Scalars['Float']['output'];
  order: Scalars['Float']['output'];
  productId: Scalars['Float']['output'];
};

export type ProductDto = {
  colorIds: Array<Scalars['Float']['input']>;
  createdBy: Scalars['Float']['input'];
  productGroupId: Scalars['Float']['input'];
  sku: Scalars['String']['input'];
  updatedBy?: InputMaybe<Scalars['Float']['input']>;
};

export type ProductGroup = {
  __typename?: 'ProductGroup';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  productCategoryId: Scalars['Float']['output'];
  skuNumeric: Scalars['Float']['output'];
};

export type ProductGroupDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  productCategoryId: Scalars['Float']['input'];
  skuNumeric: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getColors: Array<Color>;
  getLabourCosts: Array<LabourCost>;
  getPrdouctGroups: Array<GetProductGroup>;
  getProductCategories: Array<ProductCategory>;
  getProducts: Array<Product>;
  getUsers: Array<User>;
  me: User;
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

export type SignInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  approvedAt?: Maybe<Scalars['Date']['output']>;
  approvedBy?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy?: Maybe<Scalars['Float']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['Date']['output'];
  updatedBy?: Maybe<Scalars['Float']['output']>;
};

export type AuthUserFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName: string };

export type SignInMutationVariables = Exact<{
  data: SignInDto;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, createdAt: any, role: { __typename?: 'Role', name: string } }> };

export type ProductCategoryFragFragment = { __typename?: 'ProductCategory', id: string, name: string, gender: Gender };

export type ColorFragFragment = { __typename?: 'Color', id: string, name: string, hexCode: string };

export type CreatePrdouctCategoryMutationVariables = Exact<{
  data: ProductCategoryDto;
}>;


export type CreatePrdouctCategoryMutation = { __typename?: 'Mutation', createProductCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender } };

export type CreateProductGroupMutationVariables = Exact<{
  data: ProductGroupDto;
}>;


export type CreateProductGroupMutation = { __typename?: 'Mutation', createProductGroup: { __typename?: 'ProductGroup', id: string, skuNumeric: number, name?: string | null, productCategoryId: number } };

export type CreateColorMutationVariables = Exact<{
  data: ColorDto;
}>;


export type CreateColorMutation = { __typename?: 'Mutation', createColor: { __typename?: 'Color', id: string, name: string, hexCode: string } };

export type CreateProductMutationVariables = Exact<{
  data: ProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string } };

export type CreateLabourCostMutationVariables = Exact<{
  data: LabourCostDto;
}>;


export type CreateLabourCostMutation = { __typename?: 'Mutation', createLabourCost: { __typename?: 'LabourCost', id: string } };

export type GetProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductCategoriesQuery = { __typename?: 'Query', getProductCategories: Array<{ __typename?: 'ProductCategory', id: string, name: string, gender: Gender }> };

export type GetColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsQuery = { __typename?: 'Query', getColors: Array<{ __typename?: 'Color', id: string, name: string, hexCode: string }> };

export type GetPrdouctGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrdouctGroupsQuery = { __typename?: 'Query', getPrdouctGroups: Array<{ __typename?: 'GetProductGroup', id: string, skuNumeric: number, name?: string | null, productCategory: { __typename?: 'ProductCategory', id: string, name: string, gender: Gender }, products?: Array<{ __typename?: 'Product', sku: string, productColors: Array<{ __typename?: 'ProductColors', color: { __typename?: 'Color', name: string, hexCode: string } }> } | null> | null, labourCost?: { __typename?: 'LabourCost', skuNumeric: number, drawingUpper: number, drawingLining: number, stitchingUpper: number, stitchingOutsole?: number | null, stitchingInsole?: number | null, lasting: number, createdBy: number } | null }> };

export const AuthUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<AuthUserFragment, unknown>;
export const ProductCategoryFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<ProductCategoryFragFragment, unknown>;
export const ColorFragFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<ColorFragFragment, unknown>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const CreatePrdouctCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPrdouctCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategoryDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<CreatePrdouctCategoryMutation, CreatePrdouctCategoryMutationVariables>;
export const CreateProductGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProductGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductGroupDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProductGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategoryId"}}]}}]}}]} as unknown as DocumentNode<CreateProductGroupMutation, CreateProductGroupMutationVariables>;
export const CreateColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColorDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<CreateColorMutation, CreateColorMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const CreateLabourCostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLabourCost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LabourCostDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLabourCost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLabourCostMutation, CreateLabourCostMutationVariables>;
export const GetProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategoryFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategoryFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>;
export const GetColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColorFrag"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColorFrag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]} as unknown as DocumentNode<GetColorsQuery, GetColorsQueryVariables>;
export const GetPrdouctGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPrdouctGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPrdouctGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"productColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hexCode"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"labourCost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skuNumeric"}},{"kind":"Field","name":{"kind":"Name","value":"drawingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"drawingLining"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingUpper"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingOutsole"}},{"kind":"Field","name":{"kind":"Name","value":"stitchingInsole"}},{"kind":"Field","name":{"kind":"Name","value":"lasting"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}}]}}]}}]}}]} as unknown as DocumentNode<GetPrdouctGroupsQuery, GetPrdouctGroupsQueryVariables>;