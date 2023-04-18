import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  float8: any;
  jsonb: any;
  jsonpath: any;
  numeric: any;
  seed_float: any;
  timestamp: any;
  timestamptz: any;
};

export type AuthMessageOutput = {
  __typename?: 'AuthMessageOutput';
  authMessage: Scalars['String'];
};

export type AuthenticateInput = {
  contracts?: InputMaybe<Array<Scalars['String']>>;
  publicAddress: Scalars['String'];
  signature: Scalars['String'];
};

export type AuthenticateOutput = {
  __typename?: 'AuthenticateOutput';
  expiration: Scalars['Int'];
  jwt: Scalars['String'];
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type OpenseaCollectionData = {
  __typename?: 'OpenseaCollectionData';
  projectId: Scalars['String'];
  url: Scalars['String'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "artists" */
export type Artists = {
  __typename?: 'artists';
  created_at?: Maybe<Scalars['timestamptz']>;
  is_ab_staff?: Maybe<Scalars['Boolean']>;
  is_curator?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  most_recent_hosted_project?: Maybe<Projects_Metadata>;
  most_recent_hosted_project_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  most_recent_project?: Maybe<Projects_Metadata>;
  most_recent_project_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  projects: Array<Projects_Metadata>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Metadata_Aggregate;
  public_address?: Maybe<Scalars['String']>;
  tos_accepted_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user?: Maybe<Users>;
  viewed_warning_banner?: Maybe<Scalars['Boolean']>;
};


/** columns and relationships of "artists" */
export type ArtistsProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


/** columns and relationships of "artists" */
export type ArtistsProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};

/** aggregated selection of "artists" */
export type Artists_Aggregate = {
  __typename?: 'artists_aggregate';
  aggregate?: Maybe<Artists_Aggregate_Fields>;
  nodes: Array<Artists>;
};

/** aggregate fields of "artists" */
export type Artists_Aggregate_Fields = {
  __typename?: 'artists_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Artists_Max_Fields>;
  min?: Maybe<Artists_Min_Fields>;
};


/** aggregate fields of "artists" */
export type Artists_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Artists_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "artists". All fields are combined with a logical 'AND'. */
export type Artists_Bool_Exp = {
  _and?: InputMaybe<Array<Artists_Bool_Exp>>;
  _not?: InputMaybe<Artists_Bool_Exp>;
  _or?: InputMaybe<Array<Artists_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_ab_staff?: InputMaybe<Boolean_Comparison_Exp>;
  is_curator?: InputMaybe<Boolean_Comparison_Exp>;
  most_recent_hosted_project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  most_recent_hosted_project_id?: InputMaybe<String_Comparison_Exp>;
  most_recent_project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  most_recent_project_id?: InputMaybe<String_Comparison_Exp>;
  projects?: InputMaybe<Projects_Metadata_Bool_Exp>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp>;
  public_address?: InputMaybe<String_Comparison_Exp>;
  tos_accepted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  viewed_warning_banner?: InputMaybe<Boolean_Comparison_Exp>;
};

/** aggregate max on columns */
export type Artists_Max_Fields = {
  __typename?: 'artists_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  most_recent_hosted_project_id?: Maybe<Scalars['String']>;
  most_recent_project_id?: Maybe<Scalars['String']>;
  public_address?: Maybe<Scalars['String']>;
  tos_accepted_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Artists_Min_Fields = {
  __typename?: 'artists_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  most_recent_hosted_project_id?: Maybe<Scalars['String']>;
  most_recent_project_id?: Maybe<Scalars['String']>;
  public_address?: Maybe<Scalars['String']>;
  tos_accepted_at?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "artists". */
export type Artists_Order_By = {
  created_at?: InputMaybe<Order_By>;
  is_ab_staff?: InputMaybe<Order_By>;
  is_curator?: InputMaybe<Order_By>;
  most_recent_hosted_project?: InputMaybe<Projects_Metadata_Order_By>;
  most_recent_hosted_project_id?: InputMaybe<Order_By>;
  most_recent_project?: InputMaybe<Projects_Metadata_Order_By>;
  most_recent_project_id?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Order_By>;
  public_address?: InputMaybe<Order_By>;
  tos_accepted_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  viewed_warning_banner?: InputMaybe<Order_By>;
};

/** select columns of table "artists" */
export enum Artists_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsAbStaff = 'is_ab_staff',
  /** column name */
  IsCurator = 'is_curator',
  /** column name */
  MostRecentHostedProjectId = 'most_recent_hosted_project_id',
  /** column name */
  MostRecentProjectId = 'most_recent_project_id',
  /** column name */
  PublicAddress = 'public_address',
  /** column name */
  TosAcceptedAt = 'tos_accepted_at',
  /** column name */
  ViewedWarningBanner = 'viewed_warning_banner'
}

/** Streaming cursor of the table "artists" */
export type Artists_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Artists_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Artists_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_ab_staff?: InputMaybe<Scalars['Boolean']>;
  is_curator?: InputMaybe<Scalars['Boolean']>;
  most_recent_hosted_project_id?: InputMaybe<Scalars['String']>;
  most_recent_project_id?: InputMaybe<Scalars['String']>;
  public_address?: InputMaybe<Scalars['String']>;
  tos_accepted_at?: InputMaybe<Scalars['timestamptz']>;
  viewed_warning_banner?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories';
  name: Scalars['String'];
  /** An object relationship */
  project_vertical_category?: Maybe<Project_Vertical_Categories>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Categories_Bool_Exp>>;
  _not?: InputMaybe<Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Categories_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
  project_vertical_category?: InputMaybe<Project_Vertical_Categories_Bool_Exp>;
};

export enum Categories_Enum {
  Collaborations = 'collaborations',
  Collections = 'collections',
  Engine = 'engine',
  Explorations = 'explorations',
  Unassigned = 'unassigned'
}

/** Boolean expression to compare columns of type "categories_enum". All fields are combined with logical 'AND'. */
export type Categories_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Categories_Enum>;
  _in?: InputMaybe<Array<Categories_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Categories_Enum>;
  _nin?: InputMaybe<Array<Categories_Enum>>;
};

/** Ordering options when selecting data from "categories". */
export type Categories_Order_By = {
  name?: InputMaybe<Order_By>;
  project_vertical_category?: InputMaybe<Project_Vertical_Categories_Order_By>;
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  Name = 'name'
}

/** Streaming cursor of the table "categories" */
export type Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Categories_Stream_Cursor_Value_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "contract_allowlistings" */
export type Contract_Allowlistings = {
  __typename?: 'contract_allowlistings';
  /** An object relationship */
  contract?: Maybe<Contracts_Metadata>;
  contract_address: Scalars['String'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_address: Scalars['String'];
};

/** order by aggregate values of table "contract_allowlistings" */
export type Contract_Allowlistings_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contract_Allowlistings_Max_Order_By>;
  min?: InputMaybe<Contract_Allowlistings_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "contract_allowlistings". All fields are combined with a logical 'AND'. */
export type Contract_Allowlistings_Bool_Exp = {
  _and?: InputMaybe<Array<Contract_Allowlistings_Bool_Exp>>;
  _not?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
  _or?: InputMaybe<Array<Contract_Allowlistings_Bool_Exp>>;
  contract?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_address?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "contract_allowlistings" */
export type Contract_Allowlistings_Max_Order_By = {
  contract_address?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "contract_allowlistings" */
export type Contract_Allowlistings_Min_Order_By = {
  contract_address?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "contract_allowlistings". */
export type Contract_Allowlistings_Order_By = {
  contract?: InputMaybe<Contracts_Metadata_Order_By>;
  contract_address?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** select columns of table "contract_allowlistings" */
export enum Contract_Allowlistings_Select_Column {
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  UserAddress = 'user_address'
}

/** Streaming cursor of the table "contract_allowlistings" */
export type Contract_Allowlistings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contract_Allowlistings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contract_Allowlistings_Stream_Cursor_Value_Input = {
  contract_address?: InputMaybe<Scalars['String']>;
  user_address?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "contract_type_names" */
export type Contract_Type_Names = {
  __typename?: 'contract_type_names';
  name: Scalars['String'];
};

/** Boolean expression to filter rows from the table "contract_type_names". All fields are combined with a logical 'AND'. */
export type Contract_Type_Names_Bool_Exp = {
  _and?: InputMaybe<Array<Contract_Type_Names_Bool_Exp>>;
  _not?: InputMaybe<Contract_Type_Names_Bool_Exp>;
  _or?: InputMaybe<Array<Contract_Type_Names_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
};

export enum Contract_Type_Names_Enum {
  GenArt721CoreV0 = 'GenArt721CoreV0',
  GenArt721CoreV1 = 'GenArt721CoreV1',
  GenArt721CoreV2EngineFlex = 'GenArt721CoreV2_ENGINE_FLEX',
  GenArt721CoreV2Pbab = 'GenArt721CoreV2_PBAB',
  GenArt721CoreV3 = 'GenArt721CoreV3',
  GenArt721CoreV3Engine = 'GenArt721CoreV3_Engine',
  GenArt721CoreV3EngineFlex = 'GenArt721CoreV3_Engine_Flex'
}

/** Boolean expression to compare columns of type "contract_type_names_enum". All fields are combined with logical 'AND'. */
export type Contract_Type_Names_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Contract_Type_Names_Enum>;
  _in?: InputMaybe<Array<Contract_Type_Names_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Contract_Type_Names_Enum>;
  _nin?: InputMaybe<Array<Contract_Type_Names_Enum>>;
};

/** Ordering options when selecting data from "contract_type_names". */
export type Contract_Type_Names_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** select columns of table "contract_type_names" */
export enum Contract_Type_Names_Select_Column {
  /** column name */
  Name = 'name'
}

/** Streaming cursor of the table "contract_type_names" */
export type Contract_Type_Names_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contract_Type_Names_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contract_Type_Names_Stream_Cursor_Value_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "contract_types" */
export type Contract_Types = {
  __typename?: 'contract_types';
  abi?: Maybe<Scalars['jsonb']>;
  type: Contract_Type_Names_Enum;
};


/** columns and relationships of "contract_types" */
export type Contract_TypesAbiArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "contract_types". All fields are combined with a logical 'AND'. */
export type Contract_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Contract_Types_Bool_Exp>>;
  _not?: InputMaybe<Contract_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Contract_Types_Bool_Exp>>;
  abi?: InputMaybe<Jsonb_Comparison_Exp>;
  type?: InputMaybe<Contract_Type_Names_Enum_Comparison_Exp>;
};

/** Ordering options when selecting data from "contract_types". */
export type Contract_Types_Order_By = {
  abi?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "contract_types" */
export enum Contract_Types_Select_Column {
  /** column name */
  Abi = 'abi',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "contract_types" */
export type Contract_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contract_Types_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contract_Types_Stream_Cursor_Value_Input = {
  abi?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Contract_Type_Names_Enum>;
};

/** columns and relationships of "contracts_metadata" */
export type Contracts_Metadata = {
  __typename?: 'contracts_metadata';
  address: Scalars['String'];
  admin?: Maybe<Scalars['String']>;
  /** An array relationship */
  allowlisted_users: Array<Contract_Allowlistings>;
  bucket_name?: Maybe<Scalars['String']>;
  contract_type: Contract_Type_Names_Enum;
  curation_registry_address?: Maybe<Scalars['String']>;
  /** An object relationship */
  default_vertical?: Maybe<Project_Verticals>;
  dependency_registry_address?: Maybe<Scalars['String']>;
  generator_url?: Maybe<Scalars['String']>;
  minter_address?: Maybe<Scalars['String']>;
  /** An object relationship */
  minter_filter?: Maybe<Minter_Filters_Metadata>;
  minter_filter_address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** A computed field, executes function "new_projects_forbidden" */
  new_projects_forbidden?: Maybe<Scalars['Boolean']>;
  new_projects_forbidden_offchain: Scalars['Boolean'];
  new_projects_forbidden_onchain: Scalars['Boolean'];
  preferred_arweave_gateway?: Maybe<Scalars['String']>;
  preferred_ipfs_gateway?: Maybe<Scalars['String']>;
  /** An array relationship */
  projects: Array<Projects_Metadata>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Metadata_Aggregate;
  render_provider_address?: Maybe<Scalars['String']>;
  render_provider_percentage?: Maybe<Scalars['Int']>;
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>;
  token_base_url?: Maybe<Scalars['String']>;
  /** An object relationship */
  type?: Maybe<Contract_Types>;
  updated_at?: Maybe<Scalars['timestamp']>;
  /** A computed field, executes function "user_is_allowlisted" */
  user_is_allowlisted?: Maybe<Scalars['Boolean']>;
};


/** columns and relationships of "contracts_metadata" */
export type Contracts_MetadataAllowlisted_UsersArgs = {
  distinct_on?: InputMaybe<Array<Contract_Allowlistings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Allowlistings_Order_By>>;
  where?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
};


/** columns and relationships of "contracts_metadata" */
export type Contracts_MetadataProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


/** columns and relationships of "contracts_metadata" */
export type Contracts_MetadataProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};

/** aggregated selection of "contracts_metadata" */
export type Contracts_Metadata_Aggregate = {
  __typename?: 'contracts_metadata_aggregate';
  aggregate?: Maybe<Contracts_Metadata_Aggregate_Fields>;
  nodes: Array<Contracts_Metadata>;
};

export type Contracts_Metadata_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Contracts_Metadata_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Contracts_Metadata_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Contracts_Metadata_Aggregate_Bool_Exp_Count>;
};

export type Contracts_Metadata_Aggregate_Bool_Exp_Bool_And = {
  arguments: Contracts_Metadata_Select_Column_Contracts_Metadata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Contracts_Metadata_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Contracts_Metadata_Select_Column_Contracts_Metadata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Contracts_Metadata_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "contracts_metadata" */
export type Contracts_Metadata_Aggregate_Fields = {
  __typename?: 'contracts_metadata_aggregate_fields';
  avg?: Maybe<Contracts_Metadata_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Contracts_Metadata_Max_Fields>;
  min?: Maybe<Contracts_Metadata_Min_Fields>;
  stddev?: Maybe<Contracts_Metadata_Stddev_Fields>;
  stddev_pop?: Maybe<Contracts_Metadata_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contracts_Metadata_Stddev_Samp_Fields>;
  sum?: Maybe<Contracts_Metadata_Sum_Fields>;
  var_pop?: Maybe<Contracts_Metadata_Var_Pop_Fields>;
  var_samp?: Maybe<Contracts_Metadata_Var_Samp_Fields>;
  variance?: Maybe<Contracts_Metadata_Variance_Fields>;
};


/** aggregate fields of "contracts_metadata" */
export type Contracts_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "contracts_metadata" */
export type Contracts_Metadata_Aggregate_Order_By = {
  avg?: InputMaybe<Contracts_Metadata_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contracts_Metadata_Max_Order_By>;
  min?: InputMaybe<Contracts_Metadata_Min_Order_By>;
  stddev?: InputMaybe<Contracts_Metadata_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contracts_Metadata_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contracts_Metadata_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contracts_Metadata_Sum_Order_By>;
  var_pop?: InputMaybe<Contracts_Metadata_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contracts_Metadata_Var_Samp_Order_By>;
  variance?: InputMaybe<Contracts_Metadata_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Contracts_Metadata_Avg_Fields = {
  __typename?: 'contracts_metadata_avg_fields';
  render_provider_percentage?: Maybe<Scalars['Float']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Avg_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "contracts_metadata". All fields are combined with a logical 'AND'. */
export type Contracts_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Contracts_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Contracts_Metadata_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  admin?: InputMaybe<String_Comparison_Exp>;
  allowlisted_users?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
  bucket_name?: InputMaybe<String_Comparison_Exp>;
  contract_type?: InputMaybe<Contract_Type_Names_Enum_Comparison_Exp>;
  curation_registry_address?: InputMaybe<String_Comparison_Exp>;
  default_vertical?: InputMaybe<Project_Verticals_Bool_Exp>;
  dependency_registry_address?: InputMaybe<String_Comparison_Exp>;
  generator_url?: InputMaybe<String_Comparison_Exp>;
  minter_address?: InputMaybe<String_Comparison_Exp>;
  minter_filter?: InputMaybe<Minter_Filters_Metadata_Bool_Exp>;
  minter_filter_address?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  new_projects_forbidden?: InputMaybe<Boolean_Comparison_Exp>;
  new_projects_forbidden_offchain?: InputMaybe<Boolean_Comparison_Exp>;
  new_projects_forbidden_onchain?: InputMaybe<Boolean_Comparison_Exp>;
  preferred_arweave_gateway?: InputMaybe<String_Comparison_Exp>;
  preferred_ipfs_gateway?: InputMaybe<String_Comparison_Exp>;
  projects?: InputMaybe<Projects_Metadata_Bool_Exp>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp>;
  render_provider_address?: InputMaybe<String_Comparison_Exp>;
  render_provider_percentage?: InputMaybe<Int_Comparison_Exp>;
  render_provider_secondary_sales_address?: InputMaybe<String_Comparison_Exp>;
  render_provider_secondary_sales_bps?: InputMaybe<Int_Comparison_Exp>;
  token_base_url?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Contract_Types_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_is_allowlisted?: InputMaybe<Boolean_Comparison_Exp>;
};

/** aggregate max on columns */
export type Contracts_Metadata_Max_Fields = {
  __typename?: 'contracts_metadata_max_fields';
  address?: Maybe<Scalars['String']>;
  admin?: Maybe<Scalars['String']>;
  bucket_name?: Maybe<Scalars['String']>;
  curation_registry_address?: Maybe<Scalars['String']>;
  dependency_registry_address?: Maybe<Scalars['String']>;
  generator_url?: Maybe<Scalars['String']>;
  minter_address?: Maybe<Scalars['String']>;
  minter_filter_address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preferred_arweave_gateway?: Maybe<Scalars['String']>;
  preferred_ipfs_gateway?: Maybe<Scalars['String']>;
  render_provider_address?: Maybe<Scalars['String']>;
  render_provider_percentage?: Maybe<Scalars['Int']>;
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>;
  token_base_url?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  admin?: InputMaybe<Order_By>;
  bucket_name?: InputMaybe<Order_By>;
  curation_registry_address?: InputMaybe<Order_By>;
  dependency_registry_address?: InputMaybe<Order_By>;
  generator_url?: InputMaybe<Order_By>;
  minter_address?: InputMaybe<Order_By>;
  minter_filter_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  preferred_arweave_gateway?: InputMaybe<Order_By>;
  preferred_ipfs_gateway?: InputMaybe<Order_By>;
  render_provider_address?: InputMaybe<Order_By>;
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_address?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
  token_base_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contracts_Metadata_Min_Fields = {
  __typename?: 'contracts_metadata_min_fields';
  address?: Maybe<Scalars['String']>;
  admin?: Maybe<Scalars['String']>;
  bucket_name?: Maybe<Scalars['String']>;
  curation_registry_address?: Maybe<Scalars['String']>;
  dependency_registry_address?: Maybe<Scalars['String']>;
  generator_url?: Maybe<Scalars['String']>;
  minter_address?: Maybe<Scalars['String']>;
  minter_filter_address?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preferred_arweave_gateway?: Maybe<Scalars['String']>;
  preferred_ipfs_gateway?: Maybe<Scalars['String']>;
  render_provider_address?: Maybe<Scalars['String']>;
  render_provider_percentage?: Maybe<Scalars['Int']>;
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>;
  token_base_url?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  admin?: InputMaybe<Order_By>;
  bucket_name?: InputMaybe<Order_By>;
  curation_registry_address?: InputMaybe<Order_By>;
  dependency_registry_address?: InputMaybe<Order_By>;
  generator_url?: InputMaybe<Order_By>;
  minter_address?: InputMaybe<Order_By>;
  minter_filter_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  preferred_arweave_gateway?: InputMaybe<Order_By>;
  preferred_ipfs_gateway?: InputMaybe<Order_By>;
  render_provider_address?: InputMaybe<Order_By>;
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_address?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
  token_base_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "contracts_metadata". */
export type Contracts_Metadata_Order_By = {
  address?: InputMaybe<Order_By>;
  admin?: InputMaybe<Order_By>;
  allowlisted_users_aggregate?: InputMaybe<Contract_Allowlistings_Aggregate_Order_By>;
  bucket_name?: InputMaybe<Order_By>;
  contract_type?: InputMaybe<Order_By>;
  curation_registry_address?: InputMaybe<Order_By>;
  default_vertical?: InputMaybe<Project_Verticals_Order_By>;
  dependency_registry_address?: InputMaybe<Order_By>;
  generator_url?: InputMaybe<Order_By>;
  minter_address?: InputMaybe<Order_By>;
  minter_filter?: InputMaybe<Minter_Filters_Metadata_Order_By>;
  minter_filter_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  new_projects_forbidden?: InputMaybe<Order_By>;
  new_projects_forbidden_offchain?: InputMaybe<Order_By>;
  new_projects_forbidden_onchain?: InputMaybe<Order_By>;
  preferred_arweave_gateway?: InputMaybe<Order_By>;
  preferred_ipfs_gateway?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Order_By>;
  render_provider_address?: InputMaybe<Order_By>;
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_address?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
  token_base_url?: InputMaybe<Order_By>;
  type?: InputMaybe<Contract_Types_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_is_allowlisted?: InputMaybe<Order_By>;
};

/** select columns of table "contracts_metadata" */
export enum Contracts_Metadata_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Admin = 'admin',
  /** column name */
  BucketName = 'bucket_name',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  CurationRegistryAddress = 'curation_registry_address',
  /** column name */
  DependencyRegistryAddress = 'dependency_registry_address',
  /** column name */
  GeneratorUrl = 'generator_url',
  /** column name */
  MinterAddress = 'minter_address',
  /** column name */
  MinterFilterAddress = 'minter_filter_address',
  /** column name */
  Name = 'name',
  /** column name */
  NewProjectsForbiddenOffchain = 'new_projects_forbidden_offchain',
  /** column name */
  NewProjectsForbiddenOnchain = 'new_projects_forbidden_onchain',
  /** column name */
  PreferredArweaveGateway = 'preferred_arweave_gateway',
  /** column name */
  PreferredIpfsGateway = 'preferred_ipfs_gateway',
  /** column name */
  RenderProviderAddress = 'render_provider_address',
  /** column name */
  RenderProviderPercentage = 'render_provider_percentage',
  /** column name */
  RenderProviderSecondarySalesAddress = 'render_provider_secondary_sales_address',
  /** column name */
  RenderProviderSecondarySalesBps = 'render_provider_secondary_sales_bps',
  /** column name */
  TokenBaseUrl = 'token_base_url',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "contracts_metadata_aggregate_bool_exp_bool_and_arguments_columns" columns of table "contracts_metadata" */
export enum Contracts_Metadata_Select_Column_Contracts_Metadata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  NewProjectsForbiddenOffchain = 'new_projects_forbidden_offchain',
  /** column name */
  NewProjectsForbiddenOnchain = 'new_projects_forbidden_onchain'
}

/** select "contracts_metadata_aggregate_bool_exp_bool_or_arguments_columns" columns of table "contracts_metadata" */
export enum Contracts_Metadata_Select_Column_Contracts_Metadata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  NewProjectsForbiddenOffchain = 'new_projects_forbidden_offchain',
  /** column name */
  NewProjectsForbiddenOnchain = 'new_projects_forbidden_onchain'
}

/** aggregate stddev on columns */
export type Contracts_Metadata_Stddev_Fields = {
  __typename?: 'contracts_metadata_stddev_fields';
  render_provider_percentage?: Maybe<Scalars['Float']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Stddev_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contracts_Metadata_Stddev_Pop_Fields = {
  __typename?: 'contracts_metadata_stddev_pop_fields';
  render_provider_percentage?: Maybe<Scalars['Float']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Stddev_Pop_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contracts_Metadata_Stddev_Samp_Fields = {
  __typename?: 'contracts_metadata_stddev_samp_fields';
  render_provider_percentage?: Maybe<Scalars['Float']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Stddev_Samp_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "contracts_metadata" */
export type Contracts_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contracts_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contracts_Metadata_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
  admin?: InputMaybe<Scalars['String']>;
  bucket_name?: InputMaybe<Scalars['String']>;
  contract_type?: InputMaybe<Contract_Type_Names_Enum>;
  curation_registry_address?: InputMaybe<Scalars['String']>;
  dependency_registry_address?: InputMaybe<Scalars['String']>;
  generator_url?: InputMaybe<Scalars['String']>;
  minter_address?: InputMaybe<Scalars['String']>;
  minter_filter_address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  new_projects_forbidden_offchain?: InputMaybe<Scalars['Boolean']>;
  new_projects_forbidden_onchain?: InputMaybe<Scalars['Boolean']>;
  preferred_arweave_gateway?: InputMaybe<Scalars['String']>;
  preferred_ipfs_gateway?: InputMaybe<Scalars['String']>;
  render_provider_address?: InputMaybe<Scalars['String']>;
  render_provider_percentage?: InputMaybe<Scalars['Int']>;
  render_provider_secondary_sales_address?: InputMaybe<Scalars['String']>;
  render_provider_secondary_sales_bps?: InputMaybe<Scalars['Int']>;
  token_base_url?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate sum on columns */
export type Contracts_Metadata_Sum_Fields = {
  __typename?: 'contracts_metadata_sum_fields';
  render_provider_percentage?: Maybe<Scalars['Int']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Sum_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Contracts_Metadata_Var_Pop_Fields = {
  __typename?: 'contracts_metadata_var_pop_fields';
  render_provider_percentage?: Maybe<Scalars['Float']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Var_Pop_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contracts_Metadata_Var_Samp_Fields = {
  __typename?: 'contracts_metadata_var_samp_fields';
  render_provider_percentage?: Maybe<Scalars['Float']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Var_Samp_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contracts_Metadata_Variance_Fields = {
  __typename?: 'contracts_metadata_variance_fields';
  render_provider_percentage?: Maybe<Scalars['Float']>;
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "contracts_metadata" */
export type Contracts_Metadata_Variance_Order_By = {
  render_provider_percentage?: InputMaybe<Order_By>;
  render_provider_secondary_sales_bps?: InputMaybe<Order_By>;
};

export enum Curation_Statuses_Enum {
  Collaboration = 'collaboration',
  Curated = 'curated',
  Factory = 'factory',
  Playground = 'playground'
}

/** Boolean expression to compare columns of type "curation_statuses_enum". All fields are combined with logical 'AND'. */
export type Curation_Statuses_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Curation_Statuses_Enum>;
  _in?: InputMaybe<Array<Curation_Statuses_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Curation_Statuses_Enum>;
  _nin?: InputMaybe<Array<Curation_Statuses_Enum>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "dependencies_metadata" */
export type Dependencies_Metadata = {
  __typename?: 'dependencies_metadata';
  /** An array relationship */
  additional_cdns: Array<Dependency_Additional_Cdns>;
  /** An aggregate relationship */
  additional_cdns_aggregate: Dependency_Additional_Cdns_Aggregate;
  /** An array relationship */
  additional_repositories: Array<Dependency_Additional_Repositories>;
  /** An aggregate relationship */
  additional_repositories_aggregate: Dependency_Additional_Repositories_Aggregate;
  /** An object relationship */
  dependency_registry: Dependency_Registries;
  dependency_registry_address: Scalars['String'];
  preferred_cdn?: Maybe<Scalars['String']>;
  preferred_repository?: Maybe<Scalars['String']>;
  reference_website?: Maybe<Scalars['String']>;
  script?: Maybe<Scalars['String']>;
  /** An array relationship */
  scripts: Array<Dependency_Scripts>;
  /** An aggregate relationship */
  scripts_aggregate: Dependency_Scripts_Aggregate;
  type_and_version: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  updated_onchain_at: Scalars['timestamptz'];
};


/** columns and relationships of "dependencies_metadata" */
export type Dependencies_MetadataAdditional_CdnsArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Cdns_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
};


/** columns and relationships of "dependencies_metadata" */
export type Dependencies_MetadataAdditional_Cdns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Cdns_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
};


/** columns and relationships of "dependencies_metadata" */
export type Dependencies_MetadataAdditional_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Repositories_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
};


/** columns and relationships of "dependencies_metadata" */
export type Dependencies_MetadataAdditional_Repositories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Repositories_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
};


/** columns and relationships of "dependencies_metadata" */
export type Dependencies_MetadataScriptsArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Scripts_Order_By>>;
  where?: InputMaybe<Dependency_Scripts_Bool_Exp>;
};


/** columns and relationships of "dependencies_metadata" */
export type Dependencies_MetadataScripts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Scripts_Order_By>>;
  where?: InputMaybe<Dependency_Scripts_Bool_Exp>;
};

/** aggregated selection of "dependencies_metadata" */
export type Dependencies_Metadata_Aggregate = {
  __typename?: 'dependencies_metadata_aggregate';
  aggregate?: Maybe<Dependencies_Metadata_Aggregate_Fields>;
  nodes: Array<Dependencies_Metadata>;
};

export type Dependencies_Metadata_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dependencies_Metadata_Aggregate_Bool_Exp_Count>;
};

export type Dependencies_Metadata_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dependencies_metadata" */
export type Dependencies_Metadata_Aggregate_Fields = {
  __typename?: 'dependencies_metadata_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Dependencies_Metadata_Max_Fields>;
  min?: Maybe<Dependencies_Metadata_Min_Fields>;
};


/** aggregate fields of "dependencies_metadata" */
export type Dependencies_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dependencies_metadata" */
export type Dependencies_Metadata_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dependencies_Metadata_Max_Order_By>;
  min?: InputMaybe<Dependencies_Metadata_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "dependencies_metadata". All fields are combined with a logical 'AND'. */
export type Dependencies_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Dependencies_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Dependencies_Metadata_Bool_Exp>>;
  additional_cdns?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
  additional_cdns_aggregate?: InputMaybe<Dependency_Additional_Cdns_Aggregate_Bool_Exp>;
  additional_repositories?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
  additional_repositories_aggregate?: InputMaybe<Dependency_Additional_Repositories_Aggregate_Bool_Exp>;
  dependency_registry?: InputMaybe<Dependency_Registries_Bool_Exp>;
  dependency_registry_address?: InputMaybe<String_Comparison_Exp>;
  preferred_cdn?: InputMaybe<String_Comparison_Exp>;
  preferred_repository?: InputMaybe<String_Comparison_Exp>;
  reference_website?: InputMaybe<String_Comparison_Exp>;
  script?: InputMaybe<String_Comparison_Exp>;
  scripts?: InputMaybe<Dependency_Scripts_Bool_Exp>;
  scripts_aggregate?: InputMaybe<Dependency_Scripts_Aggregate_Bool_Exp>;
  type_and_version?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_onchain_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dependencies_Metadata_Max_Fields = {
  __typename?: 'dependencies_metadata_max_fields';
  dependency_registry_address?: Maybe<Scalars['String']>;
  preferred_cdn?: Maybe<Scalars['String']>;
  preferred_repository?: Maybe<Scalars['String']>;
  reference_website?: Maybe<Scalars['String']>;
  script?: Maybe<Scalars['String']>;
  type_and_version?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_onchain_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "dependencies_metadata" */
export type Dependencies_Metadata_Max_Order_By = {
  dependency_registry_address?: InputMaybe<Order_By>;
  preferred_cdn?: InputMaybe<Order_By>;
  preferred_repository?: InputMaybe<Order_By>;
  reference_website?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
  type_and_version?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_onchain_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dependencies_Metadata_Min_Fields = {
  __typename?: 'dependencies_metadata_min_fields';
  dependency_registry_address?: Maybe<Scalars['String']>;
  preferred_cdn?: Maybe<Scalars['String']>;
  preferred_repository?: Maybe<Scalars['String']>;
  reference_website?: Maybe<Scalars['String']>;
  script?: Maybe<Scalars['String']>;
  type_and_version?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_onchain_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "dependencies_metadata" */
export type Dependencies_Metadata_Min_Order_By = {
  dependency_registry_address?: InputMaybe<Order_By>;
  preferred_cdn?: InputMaybe<Order_By>;
  preferred_repository?: InputMaybe<Order_By>;
  reference_website?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
  type_and_version?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_onchain_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "dependencies_metadata". */
export type Dependencies_Metadata_Order_By = {
  additional_cdns_aggregate?: InputMaybe<Dependency_Additional_Cdns_Aggregate_Order_By>;
  additional_repositories_aggregate?: InputMaybe<Dependency_Additional_Repositories_Aggregate_Order_By>;
  dependency_registry?: InputMaybe<Dependency_Registries_Order_By>;
  dependency_registry_address?: InputMaybe<Order_By>;
  preferred_cdn?: InputMaybe<Order_By>;
  preferred_repository?: InputMaybe<Order_By>;
  reference_website?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
  scripts_aggregate?: InputMaybe<Dependency_Scripts_Aggregate_Order_By>;
  type_and_version?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_onchain_at?: InputMaybe<Order_By>;
};

/** select columns of table "dependencies_metadata" */
export enum Dependencies_Metadata_Select_Column {
  /** column name */
  DependencyRegistryAddress = 'dependency_registry_address',
  /** column name */
  PreferredCdn = 'preferred_cdn',
  /** column name */
  PreferredRepository = 'preferred_repository',
  /** column name */
  ReferenceWebsite = 'reference_website',
  /** column name */
  Script = 'script',
  /** column name */
  TypeAndVersion = 'type_and_version',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedOnchainAt = 'updated_onchain_at'
}

/** Streaming cursor of the table "dependencies_metadata" */
export type Dependencies_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dependencies_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dependencies_Metadata_Stream_Cursor_Value_Input = {
  dependency_registry_address?: InputMaybe<Scalars['String']>;
  preferred_cdn?: InputMaybe<Scalars['String']>;
  preferred_repository?: InputMaybe<Scalars['String']>;
  reference_website?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
  type_and_version?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  updated_onchain_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "dependency_additional_cdns" */
export type Dependency_Additional_Cdns = {
  __typename?: 'dependency_additional_cdns';
  cdn: Scalars['String'];
  /** An object relationship */
  dependency: Dependencies_Metadata;
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
};

/** aggregated selection of "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Aggregate = {
  __typename?: 'dependency_additional_cdns_aggregate';
  aggregate?: Maybe<Dependency_Additional_Cdns_Aggregate_Fields>;
  nodes: Array<Dependency_Additional_Cdns>;
};

export type Dependency_Additional_Cdns_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dependency_Additional_Cdns_Aggregate_Bool_Exp_Count>;
};

export type Dependency_Additional_Cdns_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Aggregate_Fields = {
  __typename?: 'dependency_additional_cdns_aggregate_fields';
  avg?: Maybe<Dependency_Additional_Cdns_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Dependency_Additional_Cdns_Max_Fields>;
  min?: Maybe<Dependency_Additional_Cdns_Min_Fields>;
  stddev?: Maybe<Dependency_Additional_Cdns_Stddev_Fields>;
  stddev_pop?: Maybe<Dependency_Additional_Cdns_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dependency_Additional_Cdns_Stddev_Samp_Fields>;
  sum?: Maybe<Dependency_Additional_Cdns_Sum_Fields>;
  var_pop?: Maybe<Dependency_Additional_Cdns_Var_Pop_Fields>;
  var_samp?: Maybe<Dependency_Additional_Cdns_Var_Samp_Fields>;
  variance?: Maybe<Dependency_Additional_Cdns_Variance_Fields>;
};


/** aggregate fields of "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Aggregate_Order_By = {
  avg?: InputMaybe<Dependency_Additional_Cdns_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dependency_Additional_Cdns_Max_Order_By>;
  min?: InputMaybe<Dependency_Additional_Cdns_Min_Order_By>;
  stddev?: InputMaybe<Dependency_Additional_Cdns_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Dependency_Additional_Cdns_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Dependency_Additional_Cdns_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Dependency_Additional_Cdns_Sum_Order_By>;
  var_pop?: InputMaybe<Dependency_Additional_Cdns_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Dependency_Additional_Cdns_Var_Samp_Order_By>;
  variance?: InputMaybe<Dependency_Additional_Cdns_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Dependency_Additional_Cdns_Avg_Fields = {
  __typename?: 'dependency_additional_cdns_avg_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dependency_additional_cdns". All fields are combined with a logical 'AND'. */
export type Dependency_Additional_Cdns_Bool_Exp = {
  _and?: InputMaybe<Array<Dependency_Additional_Cdns_Bool_Exp>>;
  _not?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
  _or?: InputMaybe<Array<Dependency_Additional_Cdns_Bool_Exp>>;
  cdn?: InputMaybe<String_Comparison_Exp>;
  dependency?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
  dependency_type_and_version?: InputMaybe<String_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dependency_Additional_Cdns_Max_Fields = {
  __typename?: 'dependency_additional_cdns_max_fields';
  cdn?: Maybe<Scalars['String']>;
  dependency_type_and_version?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Max_Order_By = {
  cdn?: InputMaybe<Order_By>;
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dependency_Additional_Cdns_Min_Fields = {
  __typename?: 'dependency_additional_cdns_min_fields';
  cdn?: Maybe<Scalars['String']>;
  dependency_type_and_version?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Min_Order_By = {
  cdn?: InputMaybe<Order_By>;
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "dependency_additional_cdns". */
export type Dependency_Additional_Cdns_Order_By = {
  cdn?: InputMaybe<Order_By>;
  dependency?: InputMaybe<Dependencies_Metadata_Order_By>;
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
};

/** select columns of table "dependency_additional_cdns" */
export enum Dependency_Additional_Cdns_Select_Column {
  /** column name */
  Cdn = 'cdn',
  /** column name */
  DependencyTypeAndVersion = 'dependency_type_and_version',
  /** column name */
  Index = 'index'
}

/** aggregate stddev on columns */
export type Dependency_Additional_Cdns_Stddev_Fields = {
  __typename?: 'dependency_additional_cdns_stddev_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dependency_Additional_Cdns_Stddev_Pop_Fields = {
  __typename?: 'dependency_additional_cdns_stddev_pop_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dependency_Additional_Cdns_Stddev_Samp_Fields = {
  __typename?: 'dependency_additional_cdns_stddev_samp_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dependency_Additional_Cdns_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dependency_Additional_Cdns_Stream_Cursor_Value_Input = {
  cdn?: InputMaybe<Scalars['String']>;
  dependency_type_and_version?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Dependency_Additional_Cdns_Sum_Fields = {
  __typename?: 'dependency_additional_cdns_sum_fields';
  index?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Dependency_Additional_Cdns_Var_Pop_Fields = {
  __typename?: 'dependency_additional_cdns_var_pop_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dependency_Additional_Cdns_Var_Samp_Fields = {
  __typename?: 'dependency_additional_cdns_var_samp_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Dependency_Additional_Cdns_Variance_Fields = {
  __typename?: 'dependency_additional_cdns_variance_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dependency_additional_cdns" */
export type Dependency_Additional_Cdns_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** columns and relationships of "dependency_additional_repositories" */
export type Dependency_Additional_Repositories = {
  __typename?: 'dependency_additional_repositories';
  /** An object relationship */
  dependency: Dependencies_Metadata;
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
  repository: Scalars['String'];
};

/** aggregated selection of "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Aggregate = {
  __typename?: 'dependency_additional_repositories_aggregate';
  aggregate?: Maybe<Dependency_Additional_Repositories_Aggregate_Fields>;
  nodes: Array<Dependency_Additional_Repositories>;
};

export type Dependency_Additional_Repositories_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dependency_Additional_Repositories_Aggregate_Bool_Exp_Count>;
};

export type Dependency_Additional_Repositories_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Aggregate_Fields = {
  __typename?: 'dependency_additional_repositories_aggregate_fields';
  avg?: Maybe<Dependency_Additional_Repositories_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Dependency_Additional_Repositories_Max_Fields>;
  min?: Maybe<Dependency_Additional_Repositories_Min_Fields>;
  stddev?: Maybe<Dependency_Additional_Repositories_Stddev_Fields>;
  stddev_pop?: Maybe<Dependency_Additional_Repositories_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dependency_Additional_Repositories_Stddev_Samp_Fields>;
  sum?: Maybe<Dependency_Additional_Repositories_Sum_Fields>;
  var_pop?: Maybe<Dependency_Additional_Repositories_Var_Pop_Fields>;
  var_samp?: Maybe<Dependency_Additional_Repositories_Var_Samp_Fields>;
  variance?: Maybe<Dependency_Additional_Repositories_Variance_Fields>;
};


/** aggregate fields of "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Aggregate_Order_By = {
  avg?: InputMaybe<Dependency_Additional_Repositories_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dependency_Additional_Repositories_Max_Order_By>;
  min?: InputMaybe<Dependency_Additional_Repositories_Min_Order_By>;
  stddev?: InputMaybe<Dependency_Additional_Repositories_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Dependency_Additional_Repositories_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Dependency_Additional_Repositories_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Dependency_Additional_Repositories_Sum_Order_By>;
  var_pop?: InputMaybe<Dependency_Additional_Repositories_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Dependency_Additional_Repositories_Var_Samp_Order_By>;
  variance?: InputMaybe<Dependency_Additional_Repositories_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Dependency_Additional_Repositories_Avg_Fields = {
  __typename?: 'dependency_additional_repositories_avg_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dependency_additional_repositories". All fields are combined with a logical 'AND'. */
export type Dependency_Additional_Repositories_Bool_Exp = {
  _and?: InputMaybe<Array<Dependency_Additional_Repositories_Bool_Exp>>;
  _not?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
  _or?: InputMaybe<Array<Dependency_Additional_Repositories_Bool_Exp>>;
  dependency?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
  dependency_type_and_version?: InputMaybe<String_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  repository?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dependency_Additional_Repositories_Max_Fields = {
  __typename?: 'dependency_additional_repositories_max_fields';
  dependency_type_and_version?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  repository?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Max_Order_By = {
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dependency_Additional_Repositories_Min_Fields = {
  __typename?: 'dependency_additional_repositories_min_fields';
  dependency_type_and_version?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  repository?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Min_Order_By = {
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "dependency_additional_repositories". */
export type Dependency_Additional_Repositories_Order_By = {
  dependency?: InputMaybe<Dependencies_Metadata_Order_By>;
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  repository?: InputMaybe<Order_By>;
};

/** select columns of table "dependency_additional_repositories" */
export enum Dependency_Additional_Repositories_Select_Column {
  /** column name */
  DependencyTypeAndVersion = 'dependency_type_and_version',
  /** column name */
  Index = 'index',
  /** column name */
  Repository = 'repository'
}

/** aggregate stddev on columns */
export type Dependency_Additional_Repositories_Stddev_Fields = {
  __typename?: 'dependency_additional_repositories_stddev_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dependency_Additional_Repositories_Stddev_Pop_Fields = {
  __typename?: 'dependency_additional_repositories_stddev_pop_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dependency_Additional_Repositories_Stddev_Samp_Fields = {
  __typename?: 'dependency_additional_repositories_stddev_samp_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dependency_Additional_Repositories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dependency_Additional_Repositories_Stream_Cursor_Value_Input = {
  dependency_type_and_version?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  repository?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Dependency_Additional_Repositories_Sum_Fields = {
  __typename?: 'dependency_additional_repositories_sum_fields';
  index?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Dependency_Additional_Repositories_Var_Pop_Fields = {
  __typename?: 'dependency_additional_repositories_var_pop_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dependency_Additional_Repositories_Var_Samp_Fields = {
  __typename?: 'dependency_additional_repositories_var_samp_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Dependency_Additional_Repositories_Variance_Fields = {
  __typename?: 'dependency_additional_repositories_variance_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dependency_additional_repositories" */
export type Dependency_Additional_Repositories_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** columns and relationships of "dependency_registries" */
export type Dependency_Registries = {
  __typename?: 'dependency_registries';
  address: Scalars['String'];
  /** An array relationship */
  dependencies: Array<Dependencies_Metadata>;
  /** An aggregate relationship */
  dependencies_aggregate: Dependencies_Metadata_Aggregate;
  owner: Scalars['String'];
  /** An array relationship */
  supported_core_contracts: Array<Contracts_Metadata>;
  /** An aggregate relationship */
  supported_core_contracts_aggregate: Contracts_Metadata_Aggregate;
  updated_onchain_at: Scalars['timestamptz'];
};


/** columns and relationships of "dependency_registries" */
export type Dependency_RegistriesDependenciesArgs = {
  distinct_on?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependencies_Metadata_Order_By>>;
  where?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
};


/** columns and relationships of "dependency_registries" */
export type Dependency_RegistriesDependencies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependencies_Metadata_Order_By>>;
  where?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
};


/** columns and relationships of "dependency_registries" */
export type Dependency_RegistriesSupported_Core_ContractsArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Metadata_Order_By>>;
  where?: InputMaybe<Contracts_Metadata_Bool_Exp>;
};


/** columns and relationships of "dependency_registries" */
export type Dependency_RegistriesSupported_Core_Contracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Metadata_Order_By>>;
  where?: InputMaybe<Contracts_Metadata_Bool_Exp>;
};

/** aggregated selection of "dependency_registries" */
export type Dependency_Registries_Aggregate = {
  __typename?: 'dependency_registries_aggregate';
  aggregate?: Maybe<Dependency_Registries_Aggregate_Fields>;
  nodes: Array<Dependency_Registries>;
};

/** aggregate fields of "dependency_registries" */
export type Dependency_Registries_Aggregate_Fields = {
  __typename?: 'dependency_registries_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Dependency_Registries_Max_Fields>;
  min?: Maybe<Dependency_Registries_Min_Fields>;
};


/** aggregate fields of "dependency_registries" */
export type Dependency_Registries_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dependency_Registries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "dependency_registries". All fields are combined with a logical 'AND'. */
export type Dependency_Registries_Bool_Exp = {
  _and?: InputMaybe<Array<Dependency_Registries_Bool_Exp>>;
  _not?: InputMaybe<Dependency_Registries_Bool_Exp>;
  _or?: InputMaybe<Array<Dependency_Registries_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  dependencies?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
  dependencies_aggregate?: InputMaybe<Dependencies_Metadata_Aggregate_Bool_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  supported_core_contracts?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  supported_core_contracts_aggregate?: InputMaybe<Contracts_Metadata_Aggregate_Bool_Exp>;
  updated_onchain_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dependency_Registries_Max_Fields = {
  __typename?: 'dependency_registries_max_fields';
  address?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  updated_onchain_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Dependency_Registries_Min_Fields = {
  __typename?: 'dependency_registries_min_fields';
  address?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  updated_onchain_at?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "dependency_registries". */
export type Dependency_Registries_Order_By = {
  address?: InputMaybe<Order_By>;
  dependencies_aggregate?: InputMaybe<Dependencies_Metadata_Aggregate_Order_By>;
  owner?: InputMaybe<Order_By>;
  supported_core_contracts_aggregate?: InputMaybe<Contracts_Metadata_Aggregate_Order_By>;
  updated_onchain_at?: InputMaybe<Order_By>;
};

/** select columns of table "dependency_registries" */
export enum Dependency_Registries_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Owner = 'owner',
  /** column name */
  UpdatedOnchainAt = 'updated_onchain_at'
}

/** Streaming cursor of the table "dependency_registries" */
export type Dependency_Registries_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dependency_Registries_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dependency_Registries_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  updated_onchain_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "dependency_scripts" */
export type Dependency_Scripts = {
  __typename?: 'dependency_scripts';
  address: Scalars['String'];
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
  script: Scalars['String'];
};

/** aggregated selection of "dependency_scripts" */
export type Dependency_Scripts_Aggregate = {
  __typename?: 'dependency_scripts_aggregate';
  aggregate?: Maybe<Dependency_Scripts_Aggregate_Fields>;
  nodes: Array<Dependency_Scripts>;
};

export type Dependency_Scripts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dependency_Scripts_Aggregate_Bool_Exp_Count>;
};

export type Dependency_Scripts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Dependency_Scripts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dependency_scripts" */
export type Dependency_Scripts_Aggregate_Fields = {
  __typename?: 'dependency_scripts_aggregate_fields';
  avg?: Maybe<Dependency_Scripts_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Dependency_Scripts_Max_Fields>;
  min?: Maybe<Dependency_Scripts_Min_Fields>;
  stddev?: Maybe<Dependency_Scripts_Stddev_Fields>;
  stddev_pop?: Maybe<Dependency_Scripts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dependency_Scripts_Stddev_Samp_Fields>;
  sum?: Maybe<Dependency_Scripts_Sum_Fields>;
  var_pop?: Maybe<Dependency_Scripts_Var_Pop_Fields>;
  var_samp?: Maybe<Dependency_Scripts_Var_Samp_Fields>;
  variance?: Maybe<Dependency_Scripts_Variance_Fields>;
};


/** aggregate fields of "dependency_scripts" */
export type Dependency_Scripts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dependency_scripts" */
export type Dependency_Scripts_Aggregate_Order_By = {
  avg?: InputMaybe<Dependency_Scripts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dependency_Scripts_Max_Order_By>;
  min?: InputMaybe<Dependency_Scripts_Min_Order_By>;
  stddev?: InputMaybe<Dependency_Scripts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Dependency_Scripts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Dependency_Scripts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Dependency_Scripts_Sum_Order_By>;
  var_pop?: InputMaybe<Dependency_Scripts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Dependency_Scripts_Var_Samp_Order_By>;
  variance?: InputMaybe<Dependency_Scripts_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Dependency_Scripts_Avg_Fields = {
  __typename?: 'dependency_scripts_avg_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dependency_scripts". All fields are combined with a logical 'AND'. */
export type Dependency_Scripts_Bool_Exp = {
  _and?: InputMaybe<Array<Dependency_Scripts_Bool_Exp>>;
  _not?: InputMaybe<Dependency_Scripts_Bool_Exp>;
  _or?: InputMaybe<Array<Dependency_Scripts_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  dependency_type_and_version?: InputMaybe<String_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  script?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dependency_Scripts_Max_Fields = {
  __typename?: 'dependency_scripts_max_fields';
  address?: Maybe<Scalars['String']>;
  dependency_type_and_version?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  script?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dependency_Scripts_Min_Fields = {
  __typename?: 'dependency_scripts_min_fields';
  address?: Maybe<Scalars['String']>;
  dependency_type_and_version?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  script?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "dependency_scripts". */
export type Dependency_Scripts_Order_By = {
  address?: InputMaybe<Order_By>;
  dependency_type_and_version?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
};

/** select columns of table "dependency_scripts" */
export enum Dependency_Scripts_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  DependencyTypeAndVersion = 'dependency_type_and_version',
  /** column name */
  Index = 'index',
  /** column name */
  Script = 'script'
}

/** aggregate stddev on columns */
export type Dependency_Scripts_Stddev_Fields = {
  __typename?: 'dependency_scripts_stddev_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dependency_Scripts_Stddev_Pop_Fields = {
  __typename?: 'dependency_scripts_stddev_pop_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dependency_Scripts_Stddev_Samp_Fields = {
  __typename?: 'dependency_scripts_stddev_samp_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "dependency_scripts" */
export type Dependency_Scripts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dependency_Scripts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dependency_Scripts_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
  dependency_type_and_version?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  script?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Dependency_Scripts_Sum_Fields = {
  __typename?: 'dependency_scripts_sum_fields';
  index?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Dependency_Scripts_Var_Pop_Fields = {
  __typename?: 'dependency_scripts_var_pop_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dependency_Scripts_Var_Samp_Fields = {
  __typename?: 'dependency_scripts_var_samp_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Dependency_Scripts_Variance_Fields = {
  __typename?: 'dependency_scripts_variance_fields';
  index?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dependency_scripts" */
export type Dependency_Scripts_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** columns and relationships of "entity_tags" */
export type Entity_Tags = {
  __typename?: 'entity_tags';
  id: Scalars['Int'];
  /** An object relationship */
  project?: Maybe<Projects_Metadata>;
  project_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  tag?: Maybe<Tags>;
  tag_name: Scalars['String'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_address?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "entity_tags" */
export type Entity_Tags_Aggregate_Order_By = {
  avg?: InputMaybe<Entity_Tags_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Entity_Tags_Max_Order_By>;
  min?: InputMaybe<Entity_Tags_Min_Order_By>;
  stddev?: InputMaybe<Entity_Tags_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Entity_Tags_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Entity_Tags_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Entity_Tags_Sum_Order_By>;
  var_pop?: InputMaybe<Entity_Tags_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Entity_Tags_Var_Samp_Order_By>;
  variance?: InputMaybe<Entity_Tags_Variance_Order_By>;
};

/** order by avg() on columns of table "entity_tags" */
export type Entity_Tags_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "entity_tags". All fields are combined with a logical 'AND'. */
export type Entity_Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Entity_Tags_Bool_Exp>>;
  _not?: InputMaybe<Entity_Tags_Bool_Exp>;
  _or?: InputMaybe<Array<Entity_Tags_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
  tag?: InputMaybe<Tags_Bool_Exp>;
  tag_name?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_address?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "entity_tags" */
export type Entity_Tags_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  tag_name?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "entity_tags" */
export type Entity_Tags_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  tag_name?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "entity_tags". */
export type Entity_Tags_Order_By = {
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
  tag?: InputMaybe<Tags_Order_By>;
  tag_name?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** select columns of table "entity_tags" */
export enum Entity_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TagName = 'tag_name',
  /** column name */
  UserAddress = 'user_address'
}

/** order by stddev() on columns of table "entity_tags" */
export type Entity_Tags_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "entity_tags" */
export type Entity_Tags_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "entity_tags" */
export type Entity_Tags_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "entity_tags" */
export type Entity_Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Entity_Tags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Entity_Tags_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
  project_id?: InputMaybe<Scalars['String']>;
  tag_name?: InputMaybe<Scalars['String']>;
  user_address?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "entity_tags" */
export type Entity_Tags_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "entity_tags" */
export type Entity_Tags_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "entity_tags" */
export type Entity_Tags_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "entity_tags" */
export type Entity_Tags_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "favorites" */
export type Favorites = {
  __typename?: 'favorites';
  favorited_project_id?: Maybe<Scalars['String']>;
  favorited_token_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  favorited_user?: Maybe<Users>;
  favorited_user_address?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object relationship */
  project_metadata?: Maybe<Projects_Metadata>;
  /** An object relationship */
  token_metadata?: Maybe<Tokens_Metadata>;
  /** An object relationship */
  user: Users;
  user_public_address: Scalars['String'];
};

/** aggregated selection of "favorites" */
export type Favorites_Aggregate = {
  __typename?: 'favorites_aggregate';
  aggregate?: Maybe<Favorites_Aggregate_Fields>;
  nodes: Array<Favorites>;
};

export type Favorites_Aggregate_Bool_Exp = {
  count?: InputMaybe<Favorites_Aggregate_Bool_Exp_Count>;
};

export type Favorites_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Favorites_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Favorites_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "favorites" */
export type Favorites_Aggregate_Fields = {
  __typename?: 'favorites_aggregate_fields';
  avg?: Maybe<Favorites_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Favorites_Max_Fields>;
  min?: Maybe<Favorites_Min_Fields>;
  stddev?: Maybe<Favorites_Stddev_Fields>;
  stddev_pop?: Maybe<Favorites_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Favorites_Stddev_Samp_Fields>;
  sum?: Maybe<Favorites_Sum_Fields>;
  var_pop?: Maybe<Favorites_Var_Pop_Fields>;
  var_samp?: Maybe<Favorites_Var_Samp_Fields>;
  variance?: Maybe<Favorites_Variance_Fields>;
};


/** aggregate fields of "favorites" */
export type Favorites_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Favorites_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "favorites" */
export type Favorites_Aggregate_Order_By = {
  avg?: InputMaybe<Favorites_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Favorites_Max_Order_By>;
  min?: InputMaybe<Favorites_Min_Order_By>;
  stddev?: InputMaybe<Favorites_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Favorites_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Favorites_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Favorites_Sum_Order_By>;
  var_pop?: InputMaybe<Favorites_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Favorites_Var_Samp_Order_By>;
  variance?: InputMaybe<Favorites_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Favorites_Avg_Fields = {
  __typename?: 'favorites_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "favorites" */
export type Favorites_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "favorites". All fields are combined with a logical 'AND'. */
export type Favorites_Bool_Exp = {
  _and?: InputMaybe<Array<Favorites_Bool_Exp>>;
  _not?: InputMaybe<Favorites_Bool_Exp>;
  _or?: InputMaybe<Array<Favorites_Bool_Exp>>;
  favorited_project_id?: InputMaybe<String_Comparison_Exp>;
  favorited_token_id?: InputMaybe<String_Comparison_Exp>;
  favorited_user?: InputMaybe<Users_Bool_Exp>;
  favorited_user_address?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  project_metadata?: InputMaybe<Projects_Metadata_Bool_Exp>;
  token_metadata?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_public_address?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Favorites_Max_Fields = {
  __typename?: 'favorites_max_fields';
  favorited_project_id?: Maybe<Scalars['String']>;
  favorited_token_id?: Maybe<Scalars['String']>;
  favorited_user_address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  user_public_address?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "favorites" */
export type Favorites_Max_Order_By = {
  favorited_project_id?: InputMaybe<Order_By>;
  favorited_token_id?: InputMaybe<Order_By>;
  favorited_user_address?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_public_address?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Favorites_Min_Fields = {
  __typename?: 'favorites_min_fields';
  favorited_project_id?: Maybe<Scalars['String']>;
  favorited_token_id?: Maybe<Scalars['String']>;
  favorited_user_address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  user_public_address?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "favorites" */
export type Favorites_Min_Order_By = {
  favorited_project_id?: InputMaybe<Order_By>;
  favorited_token_id?: InputMaybe<Order_By>;
  favorited_user_address?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_public_address?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "favorites". */
export type Favorites_Order_By = {
  favorited_project_id?: InputMaybe<Order_By>;
  favorited_token_id?: InputMaybe<Order_By>;
  favorited_user?: InputMaybe<Users_Order_By>;
  favorited_user_address?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_metadata?: InputMaybe<Projects_Metadata_Order_By>;
  token_metadata?: InputMaybe<Tokens_Metadata_Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_public_address?: InputMaybe<Order_By>;
};

/** select columns of table "favorites" */
export enum Favorites_Select_Column {
  /** column name */
  FavoritedProjectId = 'favorited_project_id',
  /** column name */
  FavoritedTokenId = 'favorited_token_id',
  /** column name */
  FavoritedUserAddress = 'favorited_user_address',
  /** column name */
  Id = 'id',
  /** column name */
  UserPublicAddress = 'user_public_address'
}

/** aggregate stddev on columns */
export type Favorites_Stddev_Fields = {
  __typename?: 'favorites_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "favorites" */
export type Favorites_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Favorites_Stddev_Pop_Fields = {
  __typename?: 'favorites_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "favorites" */
export type Favorites_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Favorites_Stddev_Samp_Fields = {
  __typename?: 'favorites_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "favorites" */
export type Favorites_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "favorites" */
export type Favorites_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Favorites_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Favorites_Stream_Cursor_Value_Input = {
  favorited_project_id?: InputMaybe<Scalars['String']>;
  favorited_token_id?: InputMaybe<Scalars['String']>;
  favorited_user_address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  user_public_address?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Favorites_Sum_Fields = {
  __typename?: 'favorites_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "favorites" */
export type Favorites_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Favorites_Var_Pop_Fields = {
  __typename?: 'favorites_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "favorites" */
export type Favorites_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Favorites_Var_Samp_Fields = {
  __typename?: 'favorites_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "favorites" */
export type Favorites_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Favorites_Variance_Fields = {
  __typename?: 'favorites_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "favorites" */
export type Favorites_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "feature_flags" */
export type Feature_Flags = {
  __typename?: 'feature_flags';
  flag_name: Scalars['String'];
  globally_enabled: Scalars['Boolean'];
};

/** Boolean expression to filter rows from the table "feature_flags". All fields are combined with a logical 'AND'. */
export type Feature_Flags_Bool_Exp = {
  _and?: InputMaybe<Array<Feature_Flags_Bool_Exp>>;
  _not?: InputMaybe<Feature_Flags_Bool_Exp>;
  _or?: InputMaybe<Array<Feature_Flags_Bool_Exp>>;
  flag_name?: InputMaybe<String_Comparison_Exp>;
  globally_enabled?: InputMaybe<Boolean_Comparison_Exp>;
};

/** Ordering options when selecting data from "feature_flags". */
export type Feature_Flags_Order_By = {
  flag_name?: InputMaybe<Order_By>;
  globally_enabled?: InputMaybe<Order_By>;
};

/** select columns of table "feature_flags" */
export enum Feature_Flags_Select_Column {
  /** column name */
  FlagName = 'flag_name',
  /** column name */
  GloballyEnabled = 'globally_enabled'
}

/** Streaming cursor of the table "feature_flags" */
export type Feature_Flags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Feature_Flags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Feature_Flags_Stream_Cursor_Value_Input = {
  flag_name?: InputMaybe<Scalars['String']>;
  globally_enabled?: InputMaybe<Scalars['Boolean']>;
};

export type Featured_Token_Projects_Metadata_Args = {
  seed?: InputMaybe<Scalars['float8']>;
};

export type Filter_Tokens_Metadata_By_Features_Args = {
  path?: InputMaybe<Scalars['jsonpath']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']>;
  _gt?: InputMaybe<Scalars['float8']>;
  _gte?: InputMaybe<Scalars['float8']>;
  _in?: InputMaybe<Array<Scalars['float8']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['float8']>;
  _lte?: InputMaybe<Scalars['float8']>;
  _neq?: InputMaybe<Scalars['float8']>;
  _nin?: InputMaybe<Array<Scalars['float8']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

export type List_Projects_Metadata_Random_Args = {
  seed?: InputMaybe<Scalars['seed_float']>;
};

/** columns and relationships of "media" */
export type Media = {
  __typename?: 'media';
  bucket_name: Scalars['String'];
  /** A computed field, executes function "media_extension" */
  extension?: Maybe<Scalars['String']>;
  file_path: Scalars['String'];
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  owner_id?: Maybe<Scalars['String']>;
  /** A computed field, executes function "media_url" */
  url?: Maybe<Scalars['String']>;
};


/** columns and relationships of "media" */
export type MediaMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "media". All fields are combined with a logical 'AND'. */
export type Media_Bool_Exp = {
  _and?: InputMaybe<Array<Media_Bool_Exp>>;
  _not?: InputMaybe<Media_Bool_Exp>;
  _or?: InputMaybe<Array<Media_Bool_Exp>>;
  bucket_name?: InputMaybe<String_Comparison_Exp>;
  extension?: InputMaybe<String_Comparison_Exp>;
  file_path?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "media". */
export type Media_Order_By = {
  bucket_name?: InputMaybe<Order_By>;
  extension?: InputMaybe<Order_By>;
  file_path?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** select columns of table "media" */
export enum Media_Select_Column {
  /** column name */
  BucketName = 'bucket_name',
  /** column name */
  FilePath = 'file_path',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  OwnerId = 'owner_id'
}

/** Streaming cursor of the table "media" */
export type Media_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Media_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Media_Stream_Cursor_Value_Input = {
  bucket_name?: InputMaybe<Scalars['String']>;
  file_path?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  owner_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "minter_filters_metadata" */
export type Minter_Filters_Metadata = {
  __typename?: 'minter_filters_metadata';
  address: Scalars['String'];
  /** An array relationship */
  allowed_minters: Array<Minters_Metadata>;
};


/** columns and relationships of "minter_filters_metadata" */
export type Minter_Filters_MetadataAllowed_MintersArgs = {
  distinct_on?: InputMaybe<Array<Minters_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Minters_Metadata_Order_By>>;
  where?: InputMaybe<Minters_Metadata_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "minter_filters_metadata". All fields are combined with a logical 'AND'. */
export type Minter_Filters_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Minter_Filters_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Minter_Filters_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Minter_Filters_Metadata_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  allowed_minters?: InputMaybe<Minters_Metadata_Bool_Exp>;
};

/** Ordering options when selecting data from "minter_filters_metadata". */
export type Minter_Filters_Metadata_Order_By = {
  address?: InputMaybe<Order_By>;
  allowed_minters_aggregate?: InputMaybe<Minters_Metadata_Aggregate_Order_By>;
};

/** select columns of table "minter_filters_metadata" */
export enum Minter_Filters_Metadata_Select_Column {
  /** column name */
  Address = 'address'
}

/** Streaming cursor of the table "minter_filters_metadata" */
export type Minter_Filters_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Minter_Filters_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Minter_Filters_Metadata_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
};

export enum Minter_Type_Names_Enum {
  MinterDaExpSettlementV0 = 'MinterDAExpSettlementV0',
  MinterDaExpSettlementV1 = 'MinterDAExpSettlementV1',
  MinterDaExpV0 = 'MinterDAExpV0',
  MinterDaExpV1 = 'MinterDAExpV1',
  MinterDaExpV2 = 'MinterDAExpV2',
  MinterDaExpV4 = 'MinterDAExpV4',
  MinterDaLinV0 = 'MinterDALinV0',
  MinterDaLinV1 = 'MinterDALinV1',
  MinterDaLinV2 = 'MinterDALinV2',
  MinterDaLinV4 = 'MinterDALinV4',
  MinterHolderV0 = 'MinterHolderV0',
  MinterHolderV1 = 'MinterHolderV1',
  MinterHolderV2 = 'MinterHolderV2',
  MinterHolderV4 = 'MinterHolderV4',
  MinterMerkleV0 = 'MinterMerkleV0',
  MinterMerkleV1 = 'MinterMerkleV1',
  MinterMerkleV2 = 'MinterMerkleV2',
  MinterMerkleV3 = 'MinterMerkleV3',
  MinterMerkleV5 = 'MinterMerkleV5',
  MinterPolyptychV0 = 'MinterPolyptychV0',
  MinterSetPriceErc20V0 = 'MinterSetPriceERC20V0',
  MinterSetPriceErc20V1 = 'MinterSetPriceERC20V1',
  MinterSetPriceErc20V2 = 'MinterSetPriceERC20V2',
  MinterSetPriceErc20V4 = 'MinterSetPriceERC20V4',
  MinterSetPriceV0 = 'MinterSetPriceV0',
  MinterSetPriceV1 = 'MinterSetPriceV1',
  MinterSetPriceV2 = 'MinterSetPriceV2',
  MinterSetPriceV4 = 'MinterSetPriceV4'
}

/** Boolean expression to compare columns of type "minter_type_names_enum". All fields are combined with logical 'AND'. */
export type Minter_Type_Names_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Minter_Type_Names_Enum>;
  _in?: InputMaybe<Array<Minter_Type_Names_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Minter_Type_Names_Enum>;
  _nin?: InputMaybe<Array<Minter_Type_Names_Enum>>;
};

/** columns and relationships of "minter_types" */
export type Minter_Types = {
  __typename?: 'minter_types';
  description_template: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  type: Minter_Type_Names_Enum;
  /** A computed field, executes function "minter_type_unversioned" */
  unversioned_type?: Maybe<Scalars['String']>;
  /** A computed field, executes function "minter_type_version_number" */
  version_number?: Maybe<Scalars['Int']>;
};

/** Boolean expression to filter rows from the table "minter_types". All fields are combined with a logical 'AND'. */
export type Minter_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Minter_Types_Bool_Exp>>;
  _not?: InputMaybe<Minter_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Minter_Types_Bool_Exp>>;
  description_template?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Minter_Type_Names_Enum_Comparison_Exp>;
  unversioned_type?: InputMaybe<String_Comparison_Exp>;
  version_number?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "minter_types". */
export type Minter_Types_Order_By = {
  description_template?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  unversioned_type?: InputMaybe<Order_By>;
  version_number?: InputMaybe<Order_By>;
};

/** select columns of table "minter_types" */
export enum Minter_Types_Select_Column {
  /** column name */
  DescriptionTemplate = 'description_template',
  /** column name */
  Label = 'label',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "minter_types" */
export type Minter_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Minter_Types_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Minter_Types_Stream_Cursor_Value_Input = {
  description_template?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Minter_Type_Names_Enum>;
};

/** columns and relationships of "minters_metadata" */
export type Minters_Metadata = {
  __typename?: 'minters_metadata';
  address: Scalars['String'];
  /** An object relationship */
  core_contract?: Maybe<Contracts_Metadata>;
  core_contract_address: Scalars['String'];
  extra_minter_details?: Maybe<Scalars['jsonb']>;
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>;
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>;
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>;
  /** An object relationship */
  minter_filter?: Maybe<Minter_Filters_Metadata>;
  minter_filter_address: Scalars['String'];
  minter_type: Minter_Type_Names_Enum;
  /** An array relationship */
  receipts: Array<Receipt_Metadata>;
  /** An aggregate relationship */
  receipts_aggregate: Receipt_Metadata_Aggregate;
  /** An object relationship */
  type?: Maybe<Minter_Types>;
};


/** columns and relationships of "minters_metadata" */
export type Minters_MetadataExtra_Minter_DetailsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "minters_metadata" */
export type Minters_MetadataReceiptsArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


/** columns and relationships of "minters_metadata" */
export type Minters_MetadataReceipts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};

/** order by aggregate values of table "minters_metadata" */
export type Minters_Metadata_Aggregate_Order_By = {
  avg?: InputMaybe<Minters_Metadata_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Minters_Metadata_Max_Order_By>;
  min?: InputMaybe<Minters_Metadata_Min_Order_By>;
  stddev?: InputMaybe<Minters_Metadata_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Minters_Metadata_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Minters_Metadata_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Minters_Metadata_Sum_Order_By>;
  var_pop?: InputMaybe<Minters_Metadata_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Minters_Metadata_Var_Samp_Order_By>;
  variance?: InputMaybe<Minters_Metadata_Variance_Order_By>;
};

/** order by avg() on columns of table "minters_metadata" */
export type Minters_Metadata_Avg_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "minters_metadata". All fields are combined with a logical 'AND'. */
export type Minters_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Minters_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Minters_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Minters_Metadata_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  core_contract?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  core_contract_address?: InputMaybe<String_Comparison_Exp>;
  extra_minter_details?: InputMaybe<Jsonb_Comparison_Exp>;
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Int_Comparison_Exp>;
  minimum_auction_length_in_seconds?: InputMaybe<Int_Comparison_Exp>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Int_Comparison_Exp>;
  minter_filter?: InputMaybe<Minter_Filters_Metadata_Bool_Exp>;
  minter_filter_address?: InputMaybe<String_Comparison_Exp>;
  minter_type?: InputMaybe<Minter_Type_Names_Enum_Comparison_Exp>;
  receipts?: InputMaybe<Receipt_Metadata_Bool_Exp>;
  receipts_aggregate?: InputMaybe<Receipt_Metadata_Aggregate_Bool_Exp>;
  type?: InputMaybe<Minter_Types_Bool_Exp>;
};

/** order by max() on columns of table "minters_metadata" */
export type Minters_Metadata_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  core_contract_address?: InputMaybe<Order_By>;
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minter_filter_address?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "minters_metadata" */
export type Minters_Metadata_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  core_contract_address?: InputMaybe<Order_By>;
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minter_filter_address?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "minters_metadata". */
export type Minters_Metadata_Order_By = {
  address?: InputMaybe<Order_By>;
  core_contract?: InputMaybe<Contracts_Metadata_Order_By>;
  core_contract_address?: InputMaybe<Order_By>;
  extra_minter_details?: InputMaybe<Order_By>;
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minter_filter?: InputMaybe<Minter_Filters_Metadata_Order_By>;
  minter_filter_address?: InputMaybe<Order_By>;
  minter_type?: InputMaybe<Order_By>;
  receipts_aggregate?: InputMaybe<Receipt_Metadata_Aggregate_Order_By>;
  type?: InputMaybe<Minter_Types_Order_By>;
};

/** select columns of table "minters_metadata" */
export enum Minters_Metadata_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CoreContractAddress = 'core_contract_address',
  /** column name */
  ExtraMinterDetails = 'extra_minter_details',
  /** column name */
  MaximumPriceDecayHalfLifeInSeconds = 'maximum_price_decay_half_life_in_seconds',
  /** column name */
  MinimumAuctionLengthInSeconds = 'minimum_auction_length_in_seconds',
  /** column name */
  MinimumPriceDecayHalfLifeInSeconds = 'minimum_price_decay_half_life_in_seconds',
  /** column name */
  MinterFilterAddress = 'minter_filter_address',
  /** column name */
  MinterType = 'minter_type'
}

/** order by stddev() on columns of table "minters_metadata" */
export type Minters_Metadata_Stddev_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "minters_metadata" */
export type Minters_Metadata_Stddev_Pop_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "minters_metadata" */
export type Minters_Metadata_Stddev_Samp_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "minters_metadata" */
export type Minters_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Minters_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Minters_Metadata_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
  core_contract_address?: InputMaybe<Scalars['String']>;
  extra_minter_details?: InputMaybe<Scalars['jsonb']>;
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Scalars['Int']>;
  minimum_auction_length_in_seconds?: InputMaybe<Scalars['Int']>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Scalars['Int']>;
  minter_filter_address?: InputMaybe<Scalars['String']>;
  minter_type?: InputMaybe<Minter_Type_Names_Enum>;
};

/** order by sum() on columns of table "minters_metadata" */
export type Minters_Metadata_Sum_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "minters_metadata" */
export type Minters_Metadata_Var_Pop_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "minters_metadata" */
export type Minters_Metadata_Var_Samp_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "minters_metadata" */
export type Minters_Metadata_Variance_Order_By = {
  maximum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
  minimum_auction_length_in_seconds?: InputMaybe<Order_By>;
  minimum_price_decay_half_life_in_seconds?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  authenticate?: Maybe<AuthenticateOutput>;
};


/** mutation root */
export type Mutation_RootAuthenticateArgs = {
  input: AuthenticateInput;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies = {
  __typename?: 'project_external_asset_dependencies';
  bytecode_address?: Maybe<Scalars['String']>;
  cid: Scalars['String'];
  data?: Maybe<Scalars['String']>;
  dependency_type: Project_External_Asset_Dependency_Types_Enum;
  index: Scalars['Int'];
  /** An object relationship */
  project: Projects_Metadata;
  project_id: Scalars['String'];
};

/** order by aggregate values of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Aggregate_Order_By = {
  avg?: InputMaybe<Project_External_Asset_Dependencies_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_External_Asset_Dependencies_Max_Order_By>;
  min?: InputMaybe<Project_External_Asset_Dependencies_Min_Order_By>;
  stddev?: InputMaybe<Project_External_Asset_Dependencies_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Project_External_Asset_Dependencies_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Project_External_Asset_Dependencies_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Project_External_Asset_Dependencies_Sum_Order_By>;
  var_pop?: InputMaybe<Project_External_Asset_Dependencies_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Project_External_Asset_Dependencies_Var_Samp_Order_By>;
  variance?: InputMaybe<Project_External_Asset_Dependencies_Variance_Order_By>;
};

/** order by avg() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "project_external_asset_dependencies". All fields are combined with a logical 'AND'. */
export type Project_External_Asset_Dependencies_Bool_Exp = {
  _and?: InputMaybe<Array<Project_External_Asset_Dependencies_Bool_Exp>>;
  _not?: InputMaybe<Project_External_Asset_Dependencies_Bool_Exp>;
  _or?: InputMaybe<Array<Project_External_Asset_Dependencies_Bool_Exp>>;
  bytecode_address?: InputMaybe<String_Comparison_Exp>;
  cid?: InputMaybe<String_Comparison_Exp>;
  data?: InputMaybe<String_Comparison_Exp>;
  dependency_type?: InputMaybe<Project_External_Asset_Dependency_Types_Enum_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Max_Order_By = {
  bytecode_address?: InputMaybe<Order_By>;
  cid?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Min_Order_By = {
  bytecode_address?: InputMaybe<Order_By>;
  cid?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "project_external_asset_dependencies". */
export type Project_External_Asset_Dependencies_Order_By = {
  bytecode_address?: InputMaybe<Order_By>;
  cid?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  dependency_type?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** select columns of table "project_external_asset_dependencies" */
export enum Project_External_Asset_Dependencies_Select_Column {
  /** column name */
  BytecodeAddress = 'bytecode_address',
  /** column name */
  Cid = 'cid',
  /** column name */
  Data = 'data',
  /** column name */
  DependencyType = 'dependency_type',
  /** column name */
  Index = 'index',
  /** column name */
  ProjectId = 'project_id'
}

/** order by stddev() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_External_Asset_Dependencies_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_External_Asset_Dependencies_Stream_Cursor_Value_Input = {
  bytecode_address?: InputMaybe<Scalars['String']>;
  cid?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
  dependency_type?: InputMaybe<Project_External_Asset_Dependency_Types_Enum>;
  index?: InputMaybe<Scalars['Int']>;
  project_id?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

export enum Project_External_Asset_Dependency_Types_Enum {
  Arweave = 'ARWEAVE',
  Ipfs = 'IPFS',
  Onchain = 'ONCHAIN'
}

/** Boolean expression to compare columns of type "project_external_asset_dependency_types_enum". All fields are combined with logical 'AND'. */
export type Project_External_Asset_Dependency_Types_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Project_External_Asset_Dependency_Types_Enum>;
  _in?: InputMaybe<Array<Project_External_Asset_Dependency_Types_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Project_External_Asset_Dependency_Types_Enum>;
  _nin?: InputMaybe<Array<Project_External_Asset_Dependency_Types_Enum>>;
};

/** columns and relationships of "project_minter_configurations" */
export type Project_Minter_Configurations = {
  __typename?: 'project_minter_configurations';
  /** A computed field, executes function "approximate_exp_da_end_time" */
  approximate_exp_da_end_time?: Maybe<Scalars['timestamptz']>;
  base_price?: Maybe<Scalars['String']>;
  currency_address: Scalars['String'];
  currency_symbol: Scalars['String'];
  end_time?: Maybe<Scalars['timestamptz']>;
  extra_minter_details?: Maybe<Scalars['jsonb']>;
  half_life_in_seconds?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  max_invocations?: Maybe<Scalars['Int']>;
  /** An object relationship */
  minter?: Maybe<Minters_Metadata>;
  minter_id: Scalars['String'];
  offchain_extra_minter_details?: Maybe<Scalars['jsonb']>;
  price_is_configured: Scalars['Boolean'];
  /** An object relationship */
  project?: Maybe<Projects_Metadata>;
  project_id: Scalars['String'];
  purchase_to_disabled: Scalars['Boolean'];
  start_price?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "project_minter_configurations" */
export type Project_Minter_ConfigurationsExtra_Minter_DetailsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "project_minter_configurations" */
export type Project_Minter_ConfigurationsOffchain_Extra_Minter_DetailsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "project_minter_configurations". All fields are combined with a logical 'AND'. */
export type Project_Minter_Configurations_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Minter_Configurations_Bool_Exp>>;
  _not?: InputMaybe<Project_Minter_Configurations_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Minter_Configurations_Bool_Exp>>;
  approximate_exp_da_end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  base_price?: InputMaybe<String_Comparison_Exp>;
  currency_address?: InputMaybe<String_Comparison_Exp>;
  currency_symbol?: InputMaybe<String_Comparison_Exp>;
  end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  extra_minter_details?: InputMaybe<Jsonb_Comparison_Exp>;
  half_life_in_seconds?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  max_invocations?: InputMaybe<Int_Comparison_Exp>;
  minter?: InputMaybe<Minters_Metadata_Bool_Exp>;
  minter_id?: InputMaybe<String_Comparison_Exp>;
  offchain_extra_minter_details?: InputMaybe<Jsonb_Comparison_Exp>;
  price_is_configured?: InputMaybe<Boolean_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
  purchase_to_disabled?: InputMaybe<Boolean_Comparison_Exp>;
  start_price?: InputMaybe<String_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "project_minter_configurations". */
export type Project_Minter_Configurations_Order_By = {
  approximate_exp_da_end_time?: InputMaybe<Order_By>;
  base_price?: InputMaybe<Order_By>;
  currency_address?: InputMaybe<Order_By>;
  currency_symbol?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  extra_minter_details?: InputMaybe<Order_By>;
  half_life_in_seconds?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  minter?: InputMaybe<Minters_Metadata_Order_By>;
  minter_id?: InputMaybe<Order_By>;
  offchain_extra_minter_details?: InputMaybe<Order_By>;
  price_is_configured?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
  purchase_to_disabled?: InputMaybe<Order_By>;
  start_price?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
};

/** select columns of table "project_minter_configurations" */
export enum Project_Minter_Configurations_Select_Column {
  /** column name */
  BasePrice = 'base_price',
  /** column name */
  CurrencyAddress = 'currency_address',
  /** column name */
  CurrencySymbol = 'currency_symbol',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  ExtraMinterDetails = 'extra_minter_details',
  /** column name */
  HalfLifeInSeconds = 'half_life_in_seconds',
  /** column name */
  Id = 'id',
  /** column name */
  MaxInvocations = 'max_invocations',
  /** column name */
  MinterId = 'minter_id',
  /** column name */
  OffchainExtraMinterDetails = 'offchain_extra_minter_details',
  /** column name */
  PriceIsConfigured = 'price_is_configured',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  PurchaseToDisabled = 'purchase_to_disabled',
  /** column name */
  StartPrice = 'start_price',
  /** column name */
  StartTime = 'start_time'
}

/** Streaming cursor of the table "project_minter_configurations" */
export type Project_Minter_Configurations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Minter_Configurations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Minter_Configurations_Stream_Cursor_Value_Input = {
  base_price?: InputMaybe<Scalars['String']>;
  currency_address?: InputMaybe<Scalars['String']>;
  currency_symbol?: InputMaybe<Scalars['String']>;
  end_time?: InputMaybe<Scalars['timestamptz']>;
  extra_minter_details?: InputMaybe<Scalars['jsonb']>;
  half_life_in_seconds?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  max_invocations?: InputMaybe<Scalars['Int']>;
  minter_id?: InputMaybe<Scalars['String']>;
  offchain_extra_minter_details?: InputMaybe<Scalars['jsonb']>;
  price_is_configured?: InputMaybe<Scalars['Boolean']>;
  project_id?: InputMaybe<Scalars['String']>;
  purchase_to_disabled?: InputMaybe<Scalars['Boolean']>;
  start_price?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "project_scripts" */
export type Project_Scripts = {
  __typename?: 'project_scripts';
  index: Scalars['Int'];
  /** An object relationship */
  project?: Maybe<Projects_Metadata>;
  project_id: Scalars['String'];
  script: Scalars['String'];
};

/** order by aggregate values of table "project_scripts" */
export type Project_Scripts_Aggregate_Order_By = {
  avg?: InputMaybe<Project_Scripts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Scripts_Max_Order_By>;
  min?: InputMaybe<Project_Scripts_Min_Order_By>;
  stddev?: InputMaybe<Project_Scripts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Project_Scripts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Project_Scripts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Project_Scripts_Sum_Order_By>;
  var_pop?: InputMaybe<Project_Scripts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Project_Scripts_Var_Samp_Order_By>;
  variance?: InputMaybe<Project_Scripts_Variance_Order_By>;
};

/** order by avg() on columns of table "project_scripts" */
export type Project_Scripts_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "project_scripts". All fields are combined with a logical 'AND'. */
export type Project_Scripts_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Scripts_Bool_Exp>>;
  _not?: InputMaybe<Project_Scripts_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Scripts_Bool_Exp>>;
  index?: InputMaybe<Int_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
  script?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "project_scripts" */
export type Project_Scripts_Max_Order_By = {
  index?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "project_scripts" */
export type Project_Scripts_Min_Order_By = {
  index?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "project_scripts". */
export type Project_Scripts_Order_By = {
  index?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
};

/** select columns of table "project_scripts" */
export enum Project_Scripts_Select_Column {
  /** column name */
  Index = 'index',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Script = 'script'
}

/** order by stddev() on columns of table "project_scripts" */
export type Project_Scripts_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "project_scripts" */
export type Project_Scripts_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "project_scripts" */
export type Project_Scripts_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "project_scripts" */
export type Project_Scripts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Scripts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Scripts_Stream_Cursor_Value_Input = {
  index?: InputMaybe<Scalars['Int']>;
  project_id?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "project_scripts" */
export type Project_Scripts_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "project_scripts" */
export type Project_Scripts_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "project_scripts" */
export type Project_Scripts_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "project_scripts" */
export type Project_Scripts_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** columns and relationships of "project_series" */
export type Project_Series = {
  __typename?: 'project_series';
  id: Scalars['Int'];
  /** An array relationship */
  projects: Array<Projects_Metadata>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Metadata_Aggregate;
};


/** columns and relationships of "project_series" */
export type Project_SeriesProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


/** columns and relationships of "project_series" */
export type Project_SeriesProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};

/** aggregated selection of "project_series" */
export type Project_Series_Aggregate = {
  __typename?: 'project_series_aggregate';
  aggregate?: Maybe<Project_Series_Aggregate_Fields>;
  nodes: Array<Project_Series>;
};

/** aggregate fields of "project_series" */
export type Project_Series_Aggregate_Fields = {
  __typename?: 'project_series_aggregate_fields';
  avg?: Maybe<Project_Series_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Project_Series_Max_Fields>;
  min?: Maybe<Project_Series_Min_Fields>;
  stddev?: Maybe<Project_Series_Stddev_Fields>;
  stddev_pop?: Maybe<Project_Series_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Project_Series_Stddev_Samp_Fields>;
  sum?: Maybe<Project_Series_Sum_Fields>;
  var_pop?: Maybe<Project_Series_Var_Pop_Fields>;
  var_samp?: Maybe<Project_Series_Var_Samp_Fields>;
  variance?: Maybe<Project_Series_Variance_Fields>;
};


/** aggregate fields of "project_series" */
export type Project_Series_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Project_Series_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Project_Series_Avg_Fields = {
  __typename?: 'project_series_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "project_series". All fields are combined with a logical 'AND'. */
export type Project_Series_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Series_Bool_Exp>>;
  _not?: InputMaybe<Project_Series_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Series_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  projects?: InputMaybe<Projects_Metadata_Bool_Exp>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Project_Series_Max_Fields = {
  __typename?: 'project_series_max_fields';
  id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Project_Series_Min_Fields = {
  __typename?: 'project_series_min_fields';
  id?: Maybe<Scalars['Int']>;
};

/** Ordering options when selecting data from "project_series". */
export type Project_Series_Order_By = {
  id?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Order_By>;
};

/** select columns of table "project_series" */
export enum Project_Series_Select_Column {
  /** column name */
  Id = 'id'
}

/** aggregate stddev on columns */
export type Project_Series_Stddev_Fields = {
  __typename?: 'project_series_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Project_Series_Stddev_Pop_Fields = {
  __typename?: 'project_series_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Project_Series_Stddev_Samp_Fields = {
  __typename?: 'project_series_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "project_series" */
export type Project_Series_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Series_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Series_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Project_Series_Sum_Fields = {
  __typename?: 'project_series_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Project_Series_Var_Pop_Fields = {
  __typename?: 'project_series_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Project_Series_Var_Samp_Fields = {
  __typename?: 'project_series_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Project_Series_Variance_Fields = {
  __typename?: 'project_series_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "project_vertical_categories" */
export type Project_Vertical_Categories = {
  __typename?: 'project_vertical_categories';
  /** An object relationship */
  category: Categories;
  hosted: Scalars['Boolean'];
  name: Categories_Enum;
  /** An array relationship */
  verticals: Array<Project_Verticals>;
};


/** columns and relationships of "project_vertical_categories" */
export type Project_Vertical_CategoriesVerticalsArgs = {
  distinct_on?: InputMaybe<Array<Project_Verticals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Verticals_Order_By>>;
  where?: InputMaybe<Project_Verticals_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "project_vertical_categories". All fields are combined with a logical 'AND'. */
export type Project_Vertical_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Vertical_Categories_Bool_Exp>>;
  _not?: InputMaybe<Project_Vertical_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Vertical_Categories_Bool_Exp>>;
  category?: InputMaybe<Categories_Bool_Exp>;
  hosted?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<Categories_Enum_Comparison_Exp>;
  verticals?: InputMaybe<Project_Verticals_Bool_Exp>;
};

/** Ordering options when selecting data from "project_vertical_categories". */
export type Project_Vertical_Categories_Order_By = {
  category?: InputMaybe<Categories_Order_By>;
  hosted?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  verticals_aggregate?: InputMaybe<Project_Verticals_Aggregate_Order_By>;
};

/** select columns of table "project_vertical_categories" */
export enum Project_Vertical_Categories_Select_Column {
  /** column name */
  Hosted = 'hosted',
  /** column name */
  Name = 'name'
}

/** Streaming cursor of the table "project_vertical_categories" */
export type Project_Vertical_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Vertical_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Vertical_Categories_Stream_Cursor_Value_Input = {
  hosted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Categories_Enum>;
};

/** columns and relationships of "project_verticals" */
export type Project_Verticals = {
  __typename?: 'project_verticals';
  active: Scalars['Boolean'];
  /** An object relationship */
  category: Project_Vertical_Categories;
  category_name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  display_name: Scalars['String'];
  name: Verticals_Enum;
  /** An array relationship */
  projects: Array<Projects_Metadata>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Metadata_Aggregate;
  /** An object relationship */
  vertical: Verticals;
};


/** columns and relationships of "project_verticals" */
export type Project_VerticalsProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


/** columns and relationships of "project_verticals" */
export type Project_VerticalsProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};

/** order by aggregate values of table "project_verticals" */
export type Project_Verticals_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Verticals_Max_Order_By>;
  min?: InputMaybe<Project_Verticals_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "project_verticals". All fields are combined with a logical 'AND'. */
export type Project_Verticals_Bool_Exp = {
  _and?: InputMaybe<Array<Project_Verticals_Bool_Exp>>;
  _not?: InputMaybe<Project_Verticals_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Verticals_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  category?: InputMaybe<Project_Vertical_Categories_Bool_Exp>;
  category_name?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<Verticals_Enum_Comparison_Exp>;
  projects?: InputMaybe<Projects_Metadata_Bool_Exp>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp>;
  vertical?: InputMaybe<Verticals_Bool_Exp>;
};

/** order by max() on columns of table "project_verticals" */
export type Project_Verticals_Max_Order_By = {
  category_name?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "project_verticals" */
export type Project_Verticals_Min_Order_By = {
  category_name?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "project_verticals". */
export type Project_Verticals_Order_By = {
  active?: InputMaybe<Order_By>;
  category?: InputMaybe<Project_Vertical_Categories_Order_By>;
  category_name?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Order_By>;
  vertical?: InputMaybe<Verticals_Order_By>;
};

/** select columns of table "project_verticals" */
export enum Project_Verticals_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CategoryName = 'category_name',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Name = 'name'
}

/** Streaming cursor of the table "project_verticals" */
export type Project_Verticals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Verticals_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Verticals_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars['Boolean']>;
  category_name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Verticals_Enum>;
};

/** columns and relationships of "projects_features" */
export type Projects_Features = {
  __typename?: 'projects_features';
  enable_artist_update_after_completion: Scalars['Boolean'];
  feature_fields?: Maybe<Scalars['jsonb']>;
  /** A computed field, executes function "projects_features_feature_fields_counts" */
  feature_fields_counts?: Maybe<Scalars['jsonb']>;
  id: Scalars['Int'];
  /** An object relationship */
  project: Projects_Metadata;
  project_id: Scalars['String'];
};


/** columns and relationships of "projects_features" */
export type Projects_FeaturesFeature_FieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "projects_features" */
export type Projects_FeaturesFeature_Fields_CountsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "projects_features". All fields are combined with a logical 'AND'. */
export type Projects_Features_Bool_Exp = {
  _and?: InputMaybe<Array<Projects_Features_Bool_Exp>>;
  _not?: InputMaybe<Projects_Features_Bool_Exp>;
  _or?: InputMaybe<Array<Projects_Features_Bool_Exp>>;
  enable_artist_update_after_completion?: InputMaybe<Boolean_Comparison_Exp>;
  feature_fields?: InputMaybe<Jsonb_Comparison_Exp>;
  feature_fields_counts?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "projects_features". */
export type Projects_Features_Order_By = {
  enable_artist_update_after_completion?: InputMaybe<Order_By>;
  feature_fields?: InputMaybe<Order_By>;
  feature_fields_counts?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** select columns of table "projects_features" */
export enum Projects_Features_Select_Column {
  /** column name */
  EnableArtistUpdateAfterCompletion = 'enable_artist_update_after_completion',
  /** column name */
  FeatureFields = 'feature_fields',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id'
}

/** Streaming cursor of the table "projects_features" */
export type Projects_Features_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Projects_Features_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Features_Stream_Cursor_Value_Input = {
  enable_artist_update_after_completion?: InputMaybe<Scalars['Boolean']>;
  feature_fields?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['Int']>;
  project_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "projects_metadata" */
export type Projects_Metadata = {
  __typename?: 'projects_metadata';
  activated_at?: Maybe<Scalars['timestamptz']>;
  active: Scalars['Boolean'];
  additional_payee?: Maybe<Scalars['String']>;
  additional_payee_percentage?: Maybe<Scalars['Int']>;
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>;
  /** An object relationship */
  artist: Users;
  artist_address: Scalars['String'];
  artist_display_notes?: Maybe<Scalars['String']>;
  artist_featured_token_id?: Maybe<Scalars['String']>;
  artist_interview?: Maybe<Scalars['String']>;
  artist_name?: Maybe<Scalars['String']>;
  aspect_ratio: Scalars['numeric'];
  base_uri?: Maybe<Scalars['String']>;
  charitable_giving_details?: Maybe<Scalars['String']>;
  complete: Scalars['Boolean'];
  completed_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  contract: Contracts_Metadata;
  contract_address: Scalars['String'];
  creative_credit?: Maybe<Scalars['String']>;
  curation_status: Curation_Statuses_Enum;
  /** A computed field, executes function "curation_status_display" */
  curation_status_display?: Maybe<Scalars['String']>;
  curation_status_override?: Maybe<Curation_Statuses_Enum>;
  currency_address?: Maybe<Scalars['String']>;
  currency_decimals?: Maybe<Scalars['Int']>;
  currency_symbol?: Maybe<Scalars['String']>;
  /** An object relationship */
  dependency?: Maybe<Dependencies_Metadata>;
  description?: Maybe<Scalars['String']>;
  disable_auto_image_format?: Maybe<Scalars['Boolean']>;
  disable_sample_generator: Scalars['Boolean'];
  display_static: Scalars['Boolean'];
  /** An array relationship */
  external_asset_dependencies: Array<Project_External_Asset_Dependencies>;
  external_asset_dependencies_locked?: Maybe<Scalars['Boolean']>;
  /** A computed field, executes function "project_external_asset_dependency_count" */
  external_asset_dependency_count?: Maybe<Scalars['bigint']>;
  /** A computed field, executes function "project_favorited_by_user" */
  favorited_by_user?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  favorites: Array<Favorites>;
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate;
  /** A computed field, executes function "project_featured_token" */
  featured_token?: Maybe<Array<Tokens_Metadata>>;
  /** An object relationship */
  features?: Maybe<Projects_Features>;
  /** A computed field, executes function "first_token_minted_at" */
  first_token_minted_at?: Maybe<Scalars['timestamptz']>;
  generate_video_assets: Scalars['Boolean'];
  /** A computed field, executes function "project_heritage_status" */
  heritage_curation_status?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  index?: Maybe<Scalars['Int']>;
  /** A computed field, executes function "project_invocations" */
  invocations?: Maybe<Scalars['bigint']>;
  ipfs_hash?: Maybe<Scalars['String']>;
  /** A computed field, executes function "project_is_flagship" */
  is_artblocks?: Maybe<Scalars['Boolean']>;
  license?: Maybe<Scalars['String']>;
  link_to_license?: Maybe<Scalars['String']>;
  /** A computed field, executes function "calc_locked" */
  locked?: Maybe<Scalars['Boolean']>;
  /** A computed field, executes function "project_lowest_listing" */
  lowest_listing?: Maybe<Scalars['float8']>;
  max_invocations: Scalars['Int'];
  /** An object relationship */
  minter_configuration?: Maybe<Project_Minter_Configurations>;
  minter_configuration_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paused: Scalars['Boolean'];
  preview_render_type: Render_Types_Enum;
  price_per_token_in_wei?: Maybe<Scalars['String']>;
  primary_render_type: Render_Types_Enum;
  project_id: Scalars['String'];
  /** An object relationship */
  proposed_artist_addresses_and_split?: Maybe<Proposed_Artist_Addresses_And_Splits>;
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  receipts: Array<Receipt_Metadata>;
  /** An aggregate relationship */
  receipts_aggregate: Receipt_Metadata_Aggregate;
  /** A computed field, executes function "project_render_complete" */
  render_complete?: Maybe<Scalars['Boolean']>;
  render_delay?: Maybe<Scalars['Int']>;
  render_with_gpu?: Maybe<Scalars['Boolean']>;
  royalty_percentage?: Maybe<Scalars['Int']>;
  sales_notes?: Maybe<Scalars['String']>;
  script?: Maybe<Scalars['String']>;
  /** A computed field, executes function "project_script_count" */
  script_count?: Maybe<Scalars['bigint']>;
  script_json?: Maybe<Scalars['jsonb']>;
  script_type_and_version?: Maybe<Scalars['String']>;
  /** An array relationship */
  scripts: Array<Project_Scripts>;
  /** A computed field, executes function "second_token_minted_at" */
  second_token_minted_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  series?: Maybe<Project_Series>;
  series_id?: Maybe<Scalars['Int']>;
  start_datetime?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  tags: Array<Entity_Tags>;
  /** An array relationship */
  tokens: Array<Tokens_Metadata>;
  /** An aggregate relationship */
  tokens_aggregate: Tokens_Metadata_Aggregate;
  updated_at?: Maybe<Scalars['timestamp']>;
  /** A computed field, executes function "user_is_artist" */
  user_is_artist?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  vertical: Project_Verticals;
  vertical_name: Scalars['String'];
  video_aspect_ratio?: Maybe<Scalars['numeric']>;
  video_duration?: Maybe<Scalars['Int']>;
  video_fps?: Maybe<Scalars['Int']>;
  video_render_delay?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataExternal_Asset_DependenciesArgs = {
  distinct_on?: InputMaybe<Array<Project_External_Asset_Dependencies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_External_Asset_Dependencies_Order_By>>;
  where?: InputMaybe<Project_External_Asset_Dependencies_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataFavoritesArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataFavorites_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataFeatured_TokenArgs = {
  args: Featured_Token_Projects_Metadata_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataReceiptsArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataReceipts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataScript_JsonArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataScriptsArgs = {
  distinct_on?: InputMaybe<Array<Project_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Scripts_Order_By>>;
  where?: InputMaybe<Project_Scripts_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataTagsArgs = {
  distinct_on?: InputMaybe<Array<Entity_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Entity_Tags_Order_By>>;
  where?: InputMaybe<Entity_Tags_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataTokensArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


/** columns and relationships of "projects_metadata" */
export type Projects_MetadataTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};

/** aggregated selection of "projects_metadata" */
export type Projects_Metadata_Aggregate = {
  __typename?: 'projects_metadata_aggregate';
  aggregate?: Maybe<Projects_Metadata_Aggregate_Fields>;
  nodes: Array<Projects_Metadata>;
};

export type Projects_Metadata_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp_Count>;
};

export type Projects_Metadata_Aggregate_Bool_Exp_Bool_And = {
  arguments: Projects_Metadata_Select_Column_Projects_Metadata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Projects_Metadata_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Projects_Metadata_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Projects_Metadata_Select_Column_Projects_Metadata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Projects_Metadata_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Projects_Metadata_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Projects_Metadata_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "projects_metadata" */
export type Projects_Metadata_Aggregate_Fields = {
  __typename?: 'projects_metadata_aggregate_fields';
  avg?: Maybe<Projects_Metadata_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Projects_Metadata_Max_Fields>;
  min?: Maybe<Projects_Metadata_Min_Fields>;
  stddev?: Maybe<Projects_Metadata_Stddev_Fields>;
  stddev_pop?: Maybe<Projects_Metadata_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Projects_Metadata_Stddev_Samp_Fields>;
  sum?: Maybe<Projects_Metadata_Sum_Fields>;
  var_pop?: Maybe<Projects_Metadata_Var_Pop_Fields>;
  var_samp?: Maybe<Projects_Metadata_Var_Samp_Fields>;
  variance?: Maybe<Projects_Metadata_Variance_Fields>;
};


/** aggregate fields of "projects_metadata" */
export type Projects_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects_metadata" */
export type Projects_Metadata_Aggregate_Order_By = {
  avg?: InputMaybe<Projects_Metadata_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Projects_Metadata_Max_Order_By>;
  min?: InputMaybe<Projects_Metadata_Min_Order_By>;
  stddev?: InputMaybe<Projects_Metadata_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Projects_Metadata_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Projects_Metadata_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Projects_Metadata_Sum_Order_By>;
  var_pop?: InputMaybe<Projects_Metadata_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Projects_Metadata_Var_Samp_Order_By>;
  variance?: InputMaybe<Projects_Metadata_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Projects_Metadata_Avg_Fields = {
  __typename?: 'projects_metadata_avg_fields';
  additional_payee_percentage?: Maybe<Scalars['Float']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>;
  aspect_ratio?: Maybe<Scalars['Float']>;
  currency_decimals?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  max_invocations?: Maybe<Scalars['Float']>;
  render_delay?: Maybe<Scalars['Float']>;
  royalty_percentage?: Maybe<Scalars['Float']>;
  series_id?: Maybe<Scalars['Float']>;
  video_aspect_ratio?: Maybe<Scalars['Float']>;
  video_duration?: Maybe<Scalars['Float']>;
  video_fps?: Maybe<Scalars['Float']>;
  video_render_delay?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "projects_metadata" */
export type Projects_Metadata_Avg_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "projects_metadata". All fields are combined with a logical 'AND'. */
export type Projects_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Projects_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Projects_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Projects_Metadata_Bool_Exp>>;
  activated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  additional_payee?: InputMaybe<String_Comparison_Exp>;
  additional_payee_percentage?: InputMaybe<Int_Comparison_Exp>;
  additional_payee_secondary_sales_address?: InputMaybe<String_Comparison_Exp>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Int_Comparison_Exp>;
  artist?: InputMaybe<Users_Bool_Exp>;
  artist_address?: InputMaybe<String_Comparison_Exp>;
  artist_display_notes?: InputMaybe<String_Comparison_Exp>;
  artist_featured_token_id?: InputMaybe<String_Comparison_Exp>;
  artist_interview?: InputMaybe<String_Comparison_Exp>;
  artist_name?: InputMaybe<String_Comparison_Exp>;
  aspect_ratio?: InputMaybe<Numeric_Comparison_Exp>;
  base_uri?: InputMaybe<String_Comparison_Exp>;
  charitable_giving_details?: InputMaybe<String_Comparison_Exp>;
  complete?: InputMaybe<Boolean_Comparison_Exp>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  contract?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  creative_credit?: InputMaybe<String_Comparison_Exp>;
  curation_status?: InputMaybe<Curation_Statuses_Enum_Comparison_Exp>;
  curation_status_display?: InputMaybe<String_Comparison_Exp>;
  curation_status_override?: InputMaybe<Curation_Statuses_Enum_Comparison_Exp>;
  currency_address?: InputMaybe<String_Comparison_Exp>;
  currency_decimals?: InputMaybe<Int_Comparison_Exp>;
  currency_symbol?: InputMaybe<String_Comparison_Exp>;
  dependency?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  disable_auto_image_format?: InputMaybe<Boolean_Comparison_Exp>;
  disable_sample_generator?: InputMaybe<Boolean_Comparison_Exp>;
  display_static?: InputMaybe<Boolean_Comparison_Exp>;
  external_asset_dependencies?: InputMaybe<Project_External_Asset_Dependencies_Bool_Exp>;
  external_asset_dependencies_locked?: InputMaybe<Boolean_Comparison_Exp>;
  external_asset_dependency_count?: InputMaybe<Bigint_Comparison_Exp>;
  favorited_by_user?: InputMaybe<Boolean_Comparison_Exp>;
  favorites?: InputMaybe<Favorites_Bool_Exp>;
  favorites_aggregate?: InputMaybe<Favorites_Aggregate_Bool_Exp>;
  features?: InputMaybe<Projects_Features_Bool_Exp>;
  first_token_minted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  generate_video_assets?: InputMaybe<Boolean_Comparison_Exp>;
  heritage_curation_status?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  invocations?: InputMaybe<Bigint_Comparison_Exp>;
  ipfs_hash?: InputMaybe<String_Comparison_Exp>;
  is_artblocks?: InputMaybe<Boolean_Comparison_Exp>;
  license?: InputMaybe<String_Comparison_Exp>;
  link_to_license?: InputMaybe<String_Comparison_Exp>;
  locked?: InputMaybe<Boolean_Comparison_Exp>;
  lowest_listing?: InputMaybe<Float8_Comparison_Exp>;
  max_invocations?: InputMaybe<Int_Comparison_Exp>;
  minter_configuration?: InputMaybe<Project_Minter_Configurations_Bool_Exp>;
  minter_configuration_id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  paused?: InputMaybe<Boolean_Comparison_Exp>;
  preview_render_type?: InputMaybe<Render_Types_Enum_Comparison_Exp>;
  price_per_token_in_wei?: InputMaybe<String_Comparison_Exp>;
  primary_render_type?: InputMaybe<Render_Types_Enum_Comparison_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
  proposed_artist_addresses_and_split?: InputMaybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>;
  proposed_artists_and_splits_id?: InputMaybe<String_Comparison_Exp>;
  receipts?: InputMaybe<Receipt_Metadata_Bool_Exp>;
  receipts_aggregate?: InputMaybe<Receipt_Metadata_Aggregate_Bool_Exp>;
  render_complete?: InputMaybe<Boolean_Comparison_Exp>;
  render_delay?: InputMaybe<Int_Comparison_Exp>;
  render_with_gpu?: InputMaybe<Boolean_Comparison_Exp>;
  royalty_percentage?: InputMaybe<Int_Comparison_Exp>;
  sales_notes?: InputMaybe<String_Comparison_Exp>;
  script?: InputMaybe<String_Comparison_Exp>;
  script_count?: InputMaybe<Bigint_Comparison_Exp>;
  script_json?: InputMaybe<Jsonb_Comparison_Exp>;
  script_type_and_version?: InputMaybe<String_Comparison_Exp>;
  scripts?: InputMaybe<Project_Scripts_Bool_Exp>;
  second_token_minted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  series?: InputMaybe<Project_Series_Bool_Exp>;
  series_id?: InputMaybe<Int_Comparison_Exp>;
  start_datetime?: InputMaybe<Timestamptz_Comparison_Exp>;
  tags?: InputMaybe<Entity_Tags_Bool_Exp>;
  tokens?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  tokens_aggregate?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_is_artist?: InputMaybe<Boolean_Comparison_Exp>;
  vertical?: InputMaybe<Project_Verticals_Bool_Exp>;
  vertical_name?: InputMaybe<String_Comparison_Exp>;
  video_aspect_ratio?: InputMaybe<Numeric_Comparison_Exp>;
  video_duration?: InputMaybe<Int_Comparison_Exp>;
  video_fps?: InputMaybe<Int_Comparison_Exp>;
  video_render_delay?: InputMaybe<Int_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Projects_Metadata_Max_Fields = {
  __typename?: 'projects_metadata_max_fields';
  activated_at?: Maybe<Scalars['timestamptz']>;
  additional_payee?: Maybe<Scalars['String']>;
  additional_payee_percentage?: Maybe<Scalars['Int']>;
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>;
  artist_address?: Maybe<Scalars['String']>;
  artist_display_notes?: Maybe<Scalars['String']>;
  artist_featured_token_id?: Maybe<Scalars['String']>;
  artist_interview?: Maybe<Scalars['String']>;
  artist_name?: Maybe<Scalars['String']>;
  aspect_ratio?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  charitable_giving_details?: Maybe<Scalars['String']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  contract_address?: Maybe<Scalars['String']>;
  creative_credit?: Maybe<Scalars['String']>;
  currency_address?: Maybe<Scalars['String']>;
  currency_decimals?: Maybe<Scalars['Int']>;
  currency_symbol?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  ipfs_hash?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  link_to_license?: Maybe<Scalars['String']>;
  max_invocations?: Maybe<Scalars['Int']>;
  minter_configuration_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price_per_token_in_wei?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>;
  render_delay?: Maybe<Scalars['Int']>;
  royalty_percentage?: Maybe<Scalars['Int']>;
  sales_notes?: Maybe<Scalars['String']>;
  script?: Maybe<Scalars['String']>;
  script_type_and_version?: Maybe<Scalars['String']>;
  series_id?: Maybe<Scalars['Int']>;
  start_datetime?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  vertical_name?: Maybe<Scalars['String']>;
  video_aspect_ratio?: Maybe<Scalars['numeric']>;
  video_duration?: Maybe<Scalars['Int']>;
  video_fps?: Maybe<Scalars['Int']>;
  video_render_delay?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "projects_metadata" */
export type Projects_Metadata_Max_Order_By = {
  activated_at?: InputMaybe<Order_By>;
  additional_payee?: InputMaybe<Order_By>;
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_address?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  artist_address?: InputMaybe<Order_By>;
  artist_display_notes?: InputMaybe<Order_By>;
  artist_featured_token_id?: InputMaybe<Order_By>;
  artist_interview?: InputMaybe<Order_By>;
  artist_name?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  base_uri?: InputMaybe<Order_By>;
  charitable_giving_details?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  creative_credit?: InputMaybe<Order_By>;
  currency_address?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  currency_symbol?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ipfs_hash?: InputMaybe<Order_By>;
  license?: InputMaybe<Order_By>;
  link_to_license?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  minter_configuration_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  price_per_token_in_wei?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  proposed_artists_and_splits_id?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  sales_notes?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
  script_type_and_version?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  start_datetime?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vertical_name?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Projects_Metadata_Min_Fields = {
  __typename?: 'projects_metadata_min_fields';
  activated_at?: Maybe<Scalars['timestamptz']>;
  additional_payee?: Maybe<Scalars['String']>;
  additional_payee_percentage?: Maybe<Scalars['Int']>;
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>;
  artist_address?: Maybe<Scalars['String']>;
  artist_display_notes?: Maybe<Scalars['String']>;
  artist_featured_token_id?: Maybe<Scalars['String']>;
  artist_interview?: Maybe<Scalars['String']>;
  artist_name?: Maybe<Scalars['String']>;
  aspect_ratio?: Maybe<Scalars['numeric']>;
  base_uri?: Maybe<Scalars['String']>;
  charitable_giving_details?: Maybe<Scalars['String']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  contract_address?: Maybe<Scalars['String']>;
  creative_credit?: Maybe<Scalars['String']>;
  currency_address?: Maybe<Scalars['String']>;
  currency_decimals?: Maybe<Scalars['Int']>;
  currency_symbol?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  ipfs_hash?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  link_to_license?: Maybe<Scalars['String']>;
  max_invocations?: Maybe<Scalars['Int']>;
  minter_configuration_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price_per_token_in_wei?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>;
  render_delay?: Maybe<Scalars['Int']>;
  royalty_percentage?: Maybe<Scalars['Int']>;
  sales_notes?: Maybe<Scalars['String']>;
  script?: Maybe<Scalars['String']>;
  script_type_and_version?: Maybe<Scalars['String']>;
  series_id?: Maybe<Scalars['Int']>;
  start_datetime?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  vertical_name?: Maybe<Scalars['String']>;
  video_aspect_ratio?: Maybe<Scalars['numeric']>;
  video_duration?: Maybe<Scalars['Int']>;
  video_fps?: Maybe<Scalars['Int']>;
  video_render_delay?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "projects_metadata" */
export type Projects_Metadata_Min_Order_By = {
  activated_at?: InputMaybe<Order_By>;
  additional_payee?: InputMaybe<Order_By>;
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_address?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  artist_address?: InputMaybe<Order_By>;
  artist_display_notes?: InputMaybe<Order_By>;
  artist_featured_token_id?: InputMaybe<Order_By>;
  artist_interview?: InputMaybe<Order_By>;
  artist_name?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  base_uri?: InputMaybe<Order_By>;
  charitable_giving_details?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  creative_credit?: InputMaybe<Order_By>;
  currency_address?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  currency_symbol?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  ipfs_hash?: InputMaybe<Order_By>;
  license?: InputMaybe<Order_By>;
  link_to_license?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  minter_configuration_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  price_per_token_in_wei?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  proposed_artists_and_splits_id?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  sales_notes?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
  script_type_and_version?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  start_datetime?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vertical_name?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "projects_metadata". */
export type Projects_Metadata_Order_By = {
  activated_at?: InputMaybe<Order_By>;
  active?: InputMaybe<Order_By>;
  additional_payee?: InputMaybe<Order_By>;
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_address?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  artist?: InputMaybe<Users_Order_By>;
  artist_address?: InputMaybe<Order_By>;
  artist_display_notes?: InputMaybe<Order_By>;
  artist_featured_token_id?: InputMaybe<Order_By>;
  artist_interview?: InputMaybe<Order_By>;
  artist_name?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  base_uri?: InputMaybe<Order_By>;
  charitable_giving_details?: InputMaybe<Order_By>;
  complete?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  contract?: InputMaybe<Contracts_Metadata_Order_By>;
  contract_address?: InputMaybe<Order_By>;
  creative_credit?: InputMaybe<Order_By>;
  curation_status?: InputMaybe<Order_By>;
  curation_status_display?: InputMaybe<Order_By>;
  curation_status_override?: InputMaybe<Order_By>;
  currency_address?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  currency_symbol?: InputMaybe<Order_By>;
  dependency?: InputMaybe<Dependencies_Metadata_Order_By>;
  description?: InputMaybe<Order_By>;
  disable_auto_image_format?: InputMaybe<Order_By>;
  disable_sample_generator?: InputMaybe<Order_By>;
  display_static?: InputMaybe<Order_By>;
  external_asset_dependencies_aggregate?: InputMaybe<Project_External_Asset_Dependencies_Aggregate_Order_By>;
  external_asset_dependencies_locked?: InputMaybe<Order_By>;
  external_asset_dependency_count?: InputMaybe<Order_By>;
  favorited_by_user?: InputMaybe<Order_By>;
  favorites_aggregate?: InputMaybe<Favorites_Aggregate_Order_By>;
  features?: InputMaybe<Projects_Features_Order_By>;
  first_token_minted_at?: InputMaybe<Order_By>;
  generate_video_assets?: InputMaybe<Order_By>;
  heritage_curation_status?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  invocations?: InputMaybe<Order_By>;
  ipfs_hash?: InputMaybe<Order_By>;
  is_artblocks?: InputMaybe<Order_By>;
  license?: InputMaybe<Order_By>;
  link_to_license?: InputMaybe<Order_By>;
  locked?: InputMaybe<Order_By>;
  lowest_listing?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  minter_configuration?: InputMaybe<Project_Minter_Configurations_Order_By>;
  minter_configuration_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  paused?: InputMaybe<Order_By>;
  preview_render_type?: InputMaybe<Order_By>;
  price_per_token_in_wei?: InputMaybe<Order_By>;
  primary_render_type?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  proposed_artist_addresses_and_split?: InputMaybe<Proposed_Artist_Addresses_And_Splits_Order_By>;
  proposed_artists_and_splits_id?: InputMaybe<Order_By>;
  receipts_aggregate?: InputMaybe<Receipt_Metadata_Aggregate_Order_By>;
  render_complete?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  render_with_gpu?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  sales_notes?: InputMaybe<Order_By>;
  script?: InputMaybe<Order_By>;
  script_count?: InputMaybe<Order_By>;
  script_json?: InputMaybe<Order_By>;
  script_type_and_version?: InputMaybe<Order_By>;
  scripts_aggregate?: InputMaybe<Project_Scripts_Aggregate_Order_By>;
  second_token_minted_at?: InputMaybe<Order_By>;
  series?: InputMaybe<Project_Series_Order_By>;
  series_id?: InputMaybe<Order_By>;
  start_datetime?: InputMaybe<Order_By>;
  tags_aggregate?: InputMaybe<Entity_Tags_Aggregate_Order_By>;
  tokens_aggregate?: InputMaybe<Tokens_Metadata_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_is_artist?: InputMaybe<Order_By>;
  vertical?: InputMaybe<Project_Verticals_Order_By>;
  vertical_name?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** select columns of table "projects_metadata" */
export enum Projects_Metadata_Select_Column {
  /** column name */
  ActivatedAt = 'activated_at',
  /** column name */
  Active = 'active',
  /** column name */
  AdditionalPayee = 'additional_payee',
  /** column name */
  AdditionalPayeePercentage = 'additional_payee_percentage',
  /** column name */
  AdditionalPayeeSecondarySalesAddress = 'additional_payee_secondary_sales_address',
  /** column name */
  AdditionalPayeeSecondarySalesPercentage = 'additional_payee_secondary_sales_percentage',
  /** column name */
  ArtistAddress = 'artist_address',
  /** column name */
  ArtistDisplayNotes = 'artist_display_notes',
  /** column name */
  ArtistFeaturedTokenId = 'artist_featured_token_id',
  /** column name */
  ArtistInterview = 'artist_interview',
  /** column name */
  ArtistName = 'artist_name',
  /** column name */
  AspectRatio = 'aspect_ratio',
  /** column name */
  BaseUri = 'base_uri',
  /** column name */
  CharitableGivingDetails = 'charitable_giving_details',
  /** column name */
  Complete = 'complete',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  CreativeCredit = 'creative_credit',
  /** column name */
  CurationStatus = 'curation_status',
  /** column name */
  CurationStatusOverride = 'curation_status_override',
  /** column name */
  CurrencyAddress = 'currency_address',
  /** column name */
  CurrencyDecimals = 'currency_decimals',
  /** column name */
  CurrencySymbol = 'currency_symbol',
  /** column name */
  Description = 'description',
  /** column name */
  DisableAutoImageFormat = 'disable_auto_image_format',
  /** column name */
  DisableSampleGenerator = 'disable_sample_generator',
  /** column name */
  DisplayStatic = 'display_static',
  /** column name */
  ExternalAssetDependenciesLocked = 'external_asset_dependencies_locked',
  /** column name */
  GenerateVideoAssets = 'generate_video_assets',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  IpfsHash = 'ipfs_hash',
  /** column name */
  License = 'license',
  /** column name */
  LinkToLicense = 'link_to_license',
  /** column name */
  MaxInvocations = 'max_invocations',
  /** column name */
  MinterConfigurationId = 'minter_configuration_id',
  /** column name */
  Name = 'name',
  /** column name */
  Paused = 'paused',
  /** column name */
  PreviewRenderType = 'preview_render_type',
  /** column name */
  PricePerTokenInWei = 'price_per_token_in_wei',
  /** column name */
  PrimaryRenderType = 'primary_render_type',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  ProposedArtistsAndSplitsId = 'proposed_artists_and_splits_id',
  /** column name */
  RenderDelay = 'render_delay',
  /** column name */
  RenderWithGpu = 'render_with_gpu',
  /** column name */
  RoyaltyPercentage = 'royalty_percentage',
  /** column name */
  SalesNotes = 'sales_notes',
  /** column name */
  Script = 'script',
  /** column name */
  ScriptJson = 'script_json',
  /** column name */
  ScriptTypeAndVersion = 'script_type_and_version',
  /** column name */
  SeriesId = 'series_id',
  /** column name */
  StartDatetime = 'start_datetime',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VerticalName = 'vertical_name',
  /** column name */
  VideoAspectRatio = 'video_aspect_ratio',
  /** column name */
  VideoDuration = 'video_duration',
  /** column name */
  VideoFps = 'video_fps',
  /** column name */
  VideoRenderDelay = 'video_render_delay',
  /** column name */
  Website = 'website'
}

/** select "projects_metadata_aggregate_bool_exp_bool_and_arguments_columns" columns of table "projects_metadata" */
export enum Projects_Metadata_Select_Column_Projects_Metadata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Active = 'active',
  /** column name */
  Complete = 'complete',
  /** column name */
  DisableAutoImageFormat = 'disable_auto_image_format',
  /** column name */
  DisableSampleGenerator = 'disable_sample_generator',
  /** column name */
  DisplayStatic = 'display_static',
  /** column name */
  ExternalAssetDependenciesLocked = 'external_asset_dependencies_locked',
  /** column name */
  GenerateVideoAssets = 'generate_video_assets',
  /** column name */
  Paused = 'paused',
  /** column name */
  RenderWithGpu = 'render_with_gpu'
}

/** select "projects_metadata_aggregate_bool_exp_bool_or_arguments_columns" columns of table "projects_metadata" */
export enum Projects_Metadata_Select_Column_Projects_Metadata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Active = 'active',
  /** column name */
  Complete = 'complete',
  /** column name */
  DisableAutoImageFormat = 'disable_auto_image_format',
  /** column name */
  DisableSampleGenerator = 'disable_sample_generator',
  /** column name */
  DisplayStatic = 'display_static',
  /** column name */
  ExternalAssetDependenciesLocked = 'external_asset_dependencies_locked',
  /** column name */
  GenerateVideoAssets = 'generate_video_assets',
  /** column name */
  Paused = 'paused',
  /** column name */
  RenderWithGpu = 'render_with_gpu'
}

/** aggregate stddev on columns */
export type Projects_Metadata_Stddev_Fields = {
  __typename?: 'projects_metadata_stddev_fields';
  additional_payee_percentage?: Maybe<Scalars['Float']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>;
  aspect_ratio?: Maybe<Scalars['Float']>;
  currency_decimals?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  max_invocations?: Maybe<Scalars['Float']>;
  render_delay?: Maybe<Scalars['Float']>;
  royalty_percentage?: Maybe<Scalars['Float']>;
  series_id?: Maybe<Scalars['Float']>;
  video_aspect_ratio?: Maybe<Scalars['Float']>;
  video_duration?: Maybe<Scalars['Float']>;
  video_fps?: Maybe<Scalars['Float']>;
  video_render_delay?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "projects_metadata" */
export type Projects_Metadata_Stddev_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Projects_Metadata_Stddev_Pop_Fields = {
  __typename?: 'projects_metadata_stddev_pop_fields';
  additional_payee_percentage?: Maybe<Scalars['Float']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>;
  aspect_ratio?: Maybe<Scalars['Float']>;
  currency_decimals?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  max_invocations?: Maybe<Scalars['Float']>;
  render_delay?: Maybe<Scalars['Float']>;
  royalty_percentage?: Maybe<Scalars['Float']>;
  series_id?: Maybe<Scalars['Float']>;
  video_aspect_ratio?: Maybe<Scalars['Float']>;
  video_duration?: Maybe<Scalars['Float']>;
  video_fps?: Maybe<Scalars['Float']>;
  video_render_delay?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "projects_metadata" */
export type Projects_Metadata_Stddev_Pop_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Projects_Metadata_Stddev_Samp_Fields = {
  __typename?: 'projects_metadata_stddev_samp_fields';
  additional_payee_percentage?: Maybe<Scalars['Float']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>;
  aspect_ratio?: Maybe<Scalars['Float']>;
  currency_decimals?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  max_invocations?: Maybe<Scalars['Float']>;
  render_delay?: Maybe<Scalars['Float']>;
  royalty_percentage?: Maybe<Scalars['Float']>;
  series_id?: Maybe<Scalars['Float']>;
  video_aspect_ratio?: Maybe<Scalars['Float']>;
  video_duration?: Maybe<Scalars['Float']>;
  video_fps?: Maybe<Scalars['Float']>;
  video_render_delay?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "projects_metadata" */
export type Projects_Metadata_Stddev_Samp_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "projects_metadata" */
export type Projects_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Projects_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Metadata_Stream_Cursor_Value_Input = {
  activated_at?: InputMaybe<Scalars['timestamptz']>;
  active?: InputMaybe<Scalars['Boolean']>;
  additional_payee?: InputMaybe<Scalars['String']>;
  additional_payee_percentage?: InputMaybe<Scalars['Int']>;
  additional_payee_secondary_sales_address?: InputMaybe<Scalars['String']>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Scalars['Int']>;
  artist_address?: InputMaybe<Scalars['String']>;
  artist_display_notes?: InputMaybe<Scalars['String']>;
  artist_featured_token_id?: InputMaybe<Scalars['String']>;
  artist_interview?: InputMaybe<Scalars['String']>;
  artist_name?: InputMaybe<Scalars['String']>;
  aspect_ratio?: InputMaybe<Scalars['numeric']>;
  base_uri?: InputMaybe<Scalars['String']>;
  charitable_giving_details?: InputMaybe<Scalars['String']>;
  complete?: InputMaybe<Scalars['Boolean']>;
  completed_at?: InputMaybe<Scalars['timestamptz']>;
  contract_address?: InputMaybe<Scalars['String']>;
  creative_credit?: InputMaybe<Scalars['String']>;
  curation_status?: InputMaybe<Curation_Statuses_Enum>;
  curation_status_override?: InputMaybe<Curation_Statuses_Enum>;
  currency_address?: InputMaybe<Scalars['String']>;
  currency_decimals?: InputMaybe<Scalars['Int']>;
  currency_symbol?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  disable_auto_image_format?: InputMaybe<Scalars['Boolean']>;
  disable_sample_generator?: InputMaybe<Scalars['Boolean']>;
  display_static?: InputMaybe<Scalars['Boolean']>;
  external_asset_dependencies_locked?: InputMaybe<Scalars['Boolean']>;
  generate_video_assets?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['Int']>;
  ipfs_hash?: InputMaybe<Scalars['String']>;
  license?: InputMaybe<Scalars['String']>;
  link_to_license?: InputMaybe<Scalars['String']>;
  max_invocations?: InputMaybe<Scalars['Int']>;
  minter_configuration_id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  paused?: InputMaybe<Scalars['Boolean']>;
  preview_render_type?: InputMaybe<Render_Types_Enum>;
  price_per_token_in_wei?: InputMaybe<Scalars['String']>;
  primary_render_type?: InputMaybe<Render_Types_Enum>;
  project_id?: InputMaybe<Scalars['String']>;
  proposed_artists_and_splits_id?: InputMaybe<Scalars['String']>;
  render_delay?: InputMaybe<Scalars['Int']>;
  render_with_gpu?: InputMaybe<Scalars['Boolean']>;
  royalty_percentage?: InputMaybe<Scalars['Int']>;
  sales_notes?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
  script_json?: InputMaybe<Scalars['jsonb']>;
  script_type_and_version?: InputMaybe<Scalars['String']>;
  series_id?: InputMaybe<Scalars['Int']>;
  start_datetime?: InputMaybe<Scalars['timestamptz']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  vertical_name?: InputMaybe<Scalars['String']>;
  video_aspect_ratio?: InputMaybe<Scalars['numeric']>;
  video_duration?: InputMaybe<Scalars['Int']>;
  video_fps?: InputMaybe<Scalars['Int']>;
  video_render_delay?: InputMaybe<Scalars['Int']>;
  website?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Projects_Metadata_Sum_Fields = {
  __typename?: 'projects_metadata_sum_fields';
  additional_payee_percentage?: Maybe<Scalars['Int']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>;
  aspect_ratio?: Maybe<Scalars['numeric']>;
  currency_decimals?: Maybe<Scalars['Int']>;
  index?: Maybe<Scalars['Int']>;
  max_invocations?: Maybe<Scalars['Int']>;
  render_delay?: Maybe<Scalars['Int']>;
  royalty_percentage?: Maybe<Scalars['Int']>;
  series_id?: Maybe<Scalars['Int']>;
  video_aspect_ratio?: Maybe<Scalars['numeric']>;
  video_duration?: Maybe<Scalars['Int']>;
  video_fps?: Maybe<Scalars['Int']>;
  video_render_delay?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "projects_metadata" */
export type Projects_Metadata_Sum_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Projects_Metadata_Var_Pop_Fields = {
  __typename?: 'projects_metadata_var_pop_fields';
  additional_payee_percentage?: Maybe<Scalars['Float']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>;
  aspect_ratio?: Maybe<Scalars['Float']>;
  currency_decimals?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  max_invocations?: Maybe<Scalars['Float']>;
  render_delay?: Maybe<Scalars['Float']>;
  royalty_percentage?: Maybe<Scalars['Float']>;
  series_id?: Maybe<Scalars['Float']>;
  video_aspect_ratio?: Maybe<Scalars['Float']>;
  video_duration?: Maybe<Scalars['Float']>;
  video_fps?: Maybe<Scalars['Float']>;
  video_render_delay?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "projects_metadata" */
export type Projects_Metadata_Var_Pop_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Projects_Metadata_Var_Samp_Fields = {
  __typename?: 'projects_metadata_var_samp_fields';
  additional_payee_percentage?: Maybe<Scalars['Float']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>;
  aspect_ratio?: Maybe<Scalars['Float']>;
  currency_decimals?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  max_invocations?: Maybe<Scalars['Float']>;
  render_delay?: Maybe<Scalars['Float']>;
  royalty_percentage?: Maybe<Scalars['Float']>;
  series_id?: Maybe<Scalars['Float']>;
  video_aspect_ratio?: Maybe<Scalars['Float']>;
  video_duration?: Maybe<Scalars['Float']>;
  video_fps?: Maybe<Scalars['Float']>;
  video_render_delay?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "projects_metadata" */
export type Projects_Metadata_Var_Samp_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Projects_Metadata_Variance_Fields = {
  __typename?: 'projects_metadata_variance_fields';
  additional_payee_percentage?: Maybe<Scalars['Float']>;
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>;
  aspect_ratio?: Maybe<Scalars['Float']>;
  currency_decimals?: Maybe<Scalars['Float']>;
  index?: Maybe<Scalars['Float']>;
  max_invocations?: Maybe<Scalars['Float']>;
  render_delay?: Maybe<Scalars['Float']>;
  royalty_percentage?: Maybe<Scalars['Float']>;
  series_id?: Maybe<Scalars['Float']>;
  video_aspect_ratio?: Maybe<Scalars['Float']>;
  video_duration?: Maybe<Scalars['Float']>;
  video_fps?: Maybe<Scalars['Float']>;
  video_render_delay?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "projects_metadata" */
export type Projects_Metadata_Variance_Order_By = {
  additional_payee_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  aspect_ratio?: InputMaybe<Order_By>;
  currency_decimals?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  max_invocations?: InputMaybe<Order_By>;
  render_delay?: InputMaybe<Order_By>;
  royalty_percentage?: InputMaybe<Order_By>;
  series_id?: InputMaybe<Order_By>;
  video_aspect_ratio?: InputMaybe<Order_By>;
  video_duration?: InputMaybe<Order_By>;
  video_fps?: InputMaybe<Order_By>;
  video_render_delay?: InputMaybe<Order_By>;
};

/** Currently proposed artist and address splits */
export type Proposed_Artist_Addresses_And_Splits = {
  __typename?: 'proposed_artist_addresses_and_splits';
  additional_payee_primary_sales: Scalars['String'];
  additional_payee_primary_sales_percentage: Scalars['Int'];
  additional_payee_secondary_sales: Scalars['String'];
  additional_payee_secondary_sales_percentage: Scalars['Int'];
  artist_address: Scalars['String'];
  /** An object relationship */
  project: Projects_Metadata;
  project_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "proposed_artist_addresses_and_splits". All fields are combined with a logical 'AND'. */
export type Proposed_Artist_Addresses_And_Splits_Bool_Exp = {
  _and?: InputMaybe<Array<Proposed_Artist_Addresses_And_Splits_Bool_Exp>>;
  _not?: InputMaybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>;
  _or?: InputMaybe<Array<Proposed_Artist_Addresses_And_Splits_Bool_Exp>>;
  additional_payee_primary_sales?: InputMaybe<String_Comparison_Exp>;
  additional_payee_primary_sales_percentage?: InputMaybe<Int_Comparison_Exp>;
  additional_payee_secondary_sales?: InputMaybe<String_Comparison_Exp>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Int_Comparison_Exp>;
  artist_address?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "proposed_artist_addresses_and_splits". */
export type Proposed_Artist_Addresses_And_Splits_Order_By = {
  additional_payee_primary_sales?: InputMaybe<Order_By>;
  additional_payee_primary_sales_percentage?: InputMaybe<Order_By>;
  additional_payee_secondary_sales?: InputMaybe<Order_By>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Order_By>;
  artist_address?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
};

/** select columns of table "proposed_artist_addresses_and_splits" */
export enum Proposed_Artist_Addresses_And_Splits_Select_Column {
  /** column name */
  AdditionalPayeePrimarySales = 'additional_payee_primary_sales',
  /** column name */
  AdditionalPayeePrimarySalesPercentage = 'additional_payee_primary_sales_percentage',
  /** column name */
  AdditionalPayeeSecondarySales = 'additional_payee_secondary_sales',
  /** column name */
  AdditionalPayeeSecondarySalesPercentage = 'additional_payee_secondary_sales_percentage',
  /** column name */
  ArtistAddress = 'artist_address',
  /** column name */
  ProjectId = 'project_id'
}

/** Streaming cursor of the table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Value_Input = {
  additional_payee_primary_sales?: InputMaybe<Scalars['String']>;
  additional_payee_primary_sales_percentage?: InputMaybe<Scalars['Int']>;
  additional_payee_secondary_sales?: InputMaybe<Scalars['String']>;
  additional_payee_secondary_sales_percentage?: InputMaybe<Scalars['Int']>;
  artist_address?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['String']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "artists" */
  artists: Array<Artists>;
  /** fetch aggregated fields from the table: "artists" */
  artists_aggregate: Artists_Aggregate;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "contract_allowlistings" */
  contract_allowlistings: Array<Contract_Allowlistings>;
  /** fetch data from the table: "contract_allowlistings" using primary key columns */
  contract_allowlistings_by_pk?: Maybe<Contract_Allowlistings>;
  /** fetch data from the table: "contract_type_names" */
  contract_type_names: Array<Contract_Type_Names>;
  /** fetch data from the table: "contract_type_names" using primary key columns */
  contract_type_names_by_pk?: Maybe<Contract_Type_Names>;
  /** fetch data from the table: "contract_types" */
  contract_types: Array<Contract_Types>;
  /** fetch data from the table: "contract_types" using primary key columns */
  contract_types_by_pk?: Maybe<Contract_Types>;
  /** fetch data from the table: "contracts_metadata" */
  contracts_metadata: Array<Contracts_Metadata>;
  /** fetch aggregated fields from the table: "contracts_metadata" */
  contracts_metadata_aggregate: Contracts_Metadata_Aggregate;
  /** fetch data from the table: "contracts_metadata" using primary key columns */
  contracts_metadata_by_pk?: Maybe<Contracts_Metadata>;
  /** fetch data from the table: "dependencies_metadata" */
  dependencies_metadata: Array<Dependencies_Metadata>;
  /** fetch aggregated fields from the table: "dependencies_metadata" */
  dependencies_metadata_aggregate: Dependencies_Metadata_Aggregate;
  /** fetch data from the table: "dependencies_metadata" using primary key columns */
  dependencies_metadata_by_pk?: Maybe<Dependencies_Metadata>;
  /** fetch data from the table: "dependency_additional_cdns" */
  dependency_additional_cdns: Array<Dependency_Additional_Cdns>;
  /** fetch aggregated fields from the table: "dependency_additional_cdns" */
  dependency_additional_cdns_aggregate: Dependency_Additional_Cdns_Aggregate;
  /** fetch data from the table: "dependency_additional_cdns" using primary key columns */
  dependency_additional_cdns_by_pk?: Maybe<Dependency_Additional_Cdns>;
  /** fetch data from the table: "dependency_additional_repositories" */
  dependency_additional_repositories: Array<Dependency_Additional_Repositories>;
  /** fetch aggregated fields from the table: "dependency_additional_repositories" */
  dependency_additional_repositories_aggregate: Dependency_Additional_Repositories_Aggregate;
  /** fetch data from the table: "dependency_additional_repositories" using primary key columns */
  dependency_additional_repositories_by_pk?: Maybe<Dependency_Additional_Repositories>;
  /** fetch data from the table: "dependency_registries" */
  dependency_registries: Array<Dependency_Registries>;
  /** fetch aggregated fields from the table: "dependency_registries" */
  dependency_registries_aggregate: Dependency_Registries_Aggregate;
  /** fetch data from the table: "dependency_registries" using primary key columns */
  dependency_registries_by_pk?: Maybe<Dependency_Registries>;
  /** fetch data from the table: "dependency_scripts" */
  dependency_scripts: Array<Dependency_Scripts>;
  /** fetch aggregated fields from the table: "dependency_scripts" */
  dependency_scripts_aggregate: Dependency_Scripts_Aggregate;
  /** fetch data from the table: "dependency_scripts" using primary key columns */
  dependency_scripts_by_pk?: Maybe<Dependency_Scripts>;
  /** An array relationship */
  entity_tags: Array<Entity_Tags>;
  /** fetch data from the table: "entity_tags" using primary key columns */
  entity_tags_by_pk?: Maybe<Entity_Tags>;
  /** An array relationship */
  favorites: Array<Favorites>;
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate;
  /** fetch data from the table: "favorites" using primary key columns */
  favorites_by_pk?: Maybe<Favorites>;
  /** fetch data from the table: "feature_flags" */
  feature_flags: Array<Feature_Flags>;
  /** fetch data from the table: "feature_flags" using primary key columns */
  feature_flags_by_pk?: Maybe<Feature_Flags>;
  /** execute function "filter_tokens_metadata_by_features" which returns "tokens_metadata" */
  filter_tokens_metadata_by_features: Array<Tokens_Metadata>;
  /** execute function "filter_tokens_metadata_by_features" and query aggregates on result of table type "tokens_metadata" */
  filter_tokens_metadata_by_features_aggregate: Tokens_Metadata_Aggregate;
  getAuthMessage?: Maybe<AuthMessageOutput>;
  getOpenseaCollectionURL?: Maybe<OpenseaCollectionData>;
  isTokenFlagged?: Maybe<Scalars['Boolean']>;
  /** execute function "list_projects_metadata_random" which returns "projects_metadata" */
  list_projects_metadata_random: Array<Projects_Metadata>;
  /** execute function "list_projects_metadata_random" and query aggregates on result of table type "projects_metadata" */
  list_projects_metadata_random_aggregate: Projects_Metadata_Aggregate;
  /** fetch data from the table: "media" */
  media: Array<Media>;
  /** fetch data from the table: "media" using primary key columns */
  media_by_pk?: Maybe<Media>;
  /** fetch data from the table: "minter_filters_metadata" */
  minter_filters_metadata: Array<Minter_Filters_Metadata>;
  /** fetch data from the table: "minter_filters_metadata" using primary key columns */
  minter_filters_metadata_by_pk?: Maybe<Minter_Filters_Metadata>;
  /** fetch data from the table: "minter_types" */
  minter_types: Array<Minter_Types>;
  /** fetch data from the table: "minter_types" using primary key columns */
  minter_types_by_pk?: Maybe<Minter_Types>;
  /** fetch data from the table: "minters_metadata" */
  minters_metadata: Array<Minters_Metadata>;
  /** fetch data from the table: "minters_metadata" using primary key columns */
  minters_metadata_by_pk?: Maybe<Minters_Metadata>;
  /** fetch data from the table: "project_external_asset_dependencies" */
  project_external_asset_dependencies: Array<Project_External_Asset_Dependencies>;
  /** fetch data from the table: "project_external_asset_dependencies" using primary key columns */
  project_external_asset_dependencies_by_pk?: Maybe<Project_External_Asset_Dependencies>;
  /** fetch data from the table: "project_minter_configurations" */
  project_minter_configurations: Array<Project_Minter_Configurations>;
  /** fetch data from the table: "project_minter_configurations" using primary key columns */
  project_minter_configurations_by_pk?: Maybe<Project_Minter_Configurations>;
  /** fetch data from the table: "project_scripts" */
  project_scripts: Array<Project_Scripts>;
  /** fetch data from the table: "project_scripts" using primary key columns */
  project_scripts_by_pk?: Maybe<Project_Scripts>;
  /** fetch data from the table: "project_series" */
  project_series: Array<Project_Series>;
  /** fetch aggregated fields from the table: "project_series" */
  project_series_aggregate: Project_Series_Aggregate;
  /** fetch data from the table: "project_series" using primary key columns */
  project_series_by_pk?: Maybe<Project_Series>;
  /** fetch data from the table: "project_vertical_categories" */
  project_vertical_categories: Array<Project_Vertical_Categories>;
  /** fetch data from the table: "project_vertical_categories" using primary key columns */
  project_vertical_categories_by_pk?: Maybe<Project_Vertical_Categories>;
  /** fetch data from the table: "project_verticals" */
  project_verticals: Array<Project_Verticals>;
  /** fetch data from the table: "project_verticals" using primary key columns */
  project_verticals_by_pk?: Maybe<Project_Verticals>;
  /** fetch data from the table: "projects_features" */
  projects_features: Array<Projects_Features>;
  /** fetch data from the table: "projects_features" using primary key columns */
  projects_features_by_pk?: Maybe<Projects_Features>;
  /** fetch data from the table: "projects_metadata" */
  projects_metadata: Array<Projects_Metadata>;
  /** fetch aggregated fields from the table: "projects_metadata" */
  projects_metadata_aggregate: Projects_Metadata_Aggregate;
  /** fetch data from the table: "projects_metadata" using primary key columns */
  projects_metadata_by_pk?: Maybe<Projects_Metadata>;
  /** fetch data from the table: "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits: Array<Proposed_Artist_Addresses_And_Splits>;
  /** fetch data from the table: "proposed_artist_addresses_and_splits" using primary key columns */
  proposed_artist_addresses_and_splits_by_pk?: Maybe<Proposed_Artist_Addresses_And_Splits>;
  /** fetch data from the table: "receipt_metadata" */
  receipt_metadata: Array<Receipt_Metadata>;
  /** fetch aggregated fields from the table: "receipt_metadata" */
  receipt_metadata_aggregate: Receipt_Metadata_Aggregate;
  /** fetch data from the table: "receipt_metadata" using primary key columns */
  receipt_metadata_by_pk?: Maybe<Receipt_Metadata>;
  /** fetch data from the table: "render_types" */
  render_types: Array<Render_Types>;
  /** fetch data from the table: "render_types" using primary key columns */
  render_types_by_pk?: Maybe<Render_Types>;
  /** execute function "search_projects" which returns "projects_metadata" */
  search_projects: Array<Projects_Metadata>;
  /** execute function "search_projects" and query aggregates on result of table type "projects_metadata" */
  search_projects_aggregate: Projects_Metadata_Aggregate;
  /** execute function "search_tags" which returns "tags" */
  search_tags: Array<Tags>;
  /** execute function "search_tokens" which returns "tokens_metadata" */
  search_tokens: Array<Tokens_Metadata>;
  /** execute function "search_tokens" and query aggregates on result of table type "tokens_metadata" */
  search_tokens_aggregate: Tokens_Metadata_Aggregate;
  /** execute function "search_users" which returns "user_profiles" */
  search_users: Array<User_Profiles>;
  /** execute function "search_users" and query aggregates on result of table type "user_profiles" */
  search_users_aggregate: User_Profiles_Aggregate;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table: "tokens_metadata" */
  tokens_metadata: Array<Tokens_Metadata>;
  /** fetch aggregated fields from the table: "tokens_metadata" */
  tokens_metadata_aggregate: Tokens_Metadata_Aggregate;
  /** fetch data from the table: "tokens_metadata" using primary key columns */
  tokens_metadata_by_pk?: Maybe<Tokens_Metadata>;
  /** fetch data from the table: "user_profiles" */
  user_profiles: Array<User_Profiles>;
  /** fetch aggregated fields from the table: "user_profiles" */
  user_profiles_aggregate: User_Profiles_Aggregate;
  /** fetch data from the table: "user_profiles" using primary key columns */
  user_profiles_by_pk?: Maybe<User_Profiles>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "verticals" */
  verticals: Array<Verticals>;
  /** fetch data from the table: "verticals" using primary key columns */
  verticals_by_pk?: Maybe<Verticals>;
  /** fetch data from the table: "video_aspect_ratios" */
  video_aspect_ratios: Array<Video_Aspect_Ratios>;
  /** fetch data from the table: "video_aspect_ratios" using primary key columns */
  video_aspect_ratios_by_pk?: Maybe<Video_Aspect_Ratios>;
  /** fetch data from the table: "video_frame_rates" */
  video_frame_rates: Array<Video_Frame_Rates>;
  /** fetch data from the table: "video_frame_rates" using primary key columns */
  video_frame_rates_by_pk?: Maybe<Video_Frame_Rates>;
  /** fetch data from the table: "webflow_artist_info" */
  webflow_artist_info: Array<Webflow_Artist_Info>;
  /** fetch data from the table: "webflow_artist_info" using primary key columns */
  webflow_artist_info_by_pk?: Maybe<Webflow_Artist_Info>;
  /** fetch data from the table: "webflow_spectrum_articles" */
  webflow_spectrum_articles: Array<Webflow_Spectrum_Articles>;
  /** fetch data from the table: "webflow_spectrum_articles" using primary key columns */
  webflow_spectrum_articles_by_pk?: Maybe<Webflow_Spectrum_Articles>;
};


export type Query_RootArtistsArgs = {
  distinct_on?: InputMaybe<Array<Artists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Artists_Order_By>>;
  where?: InputMaybe<Artists_Bool_Exp>;
};


export type Query_RootArtists_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Artists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Artists_Order_By>>;
  where?: InputMaybe<Artists_Bool_Exp>;
};


export type Query_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Query_RootCategories_By_PkArgs = {
  name: Scalars['String'];
};


export type Query_RootContract_AllowlistingsArgs = {
  distinct_on?: InputMaybe<Array<Contract_Allowlistings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Allowlistings_Order_By>>;
  where?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
};


export type Query_RootContract_Allowlistings_By_PkArgs = {
  contract_address: Scalars['String'];
  user_address: Scalars['String'];
};


export type Query_RootContract_Type_NamesArgs = {
  distinct_on?: InputMaybe<Array<Contract_Type_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Type_Names_Order_By>>;
  where?: InputMaybe<Contract_Type_Names_Bool_Exp>;
};


export type Query_RootContract_Type_Names_By_PkArgs = {
  name: Scalars['String'];
};


export type Query_RootContract_TypesArgs = {
  distinct_on?: InputMaybe<Array<Contract_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Types_Order_By>>;
  where?: InputMaybe<Contract_Types_Bool_Exp>;
};


export type Query_RootContract_Types_By_PkArgs = {
  type: Contract_Type_Names_Enum;
};


export type Query_RootContracts_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Metadata_Order_By>>;
  where?: InputMaybe<Contracts_Metadata_Bool_Exp>;
};


export type Query_RootContracts_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Metadata_Order_By>>;
  where?: InputMaybe<Contracts_Metadata_Bool_Exp>;
};


export type Query_RootContracts_Metadata_By_PkArgs = {
  address: Scalars['String'];
};


export type Query_RootDependencies_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependencies_Metadata_Order_By>>;
  where?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
};


export type Query_RootDependencies_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependencies_Metadata_Order_By>>;
  where?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
};


export type Query_RootDependencies_Metadata_By_PkArgs = {
  type_and_version: Scalars['String'];
};


export type Query_RootDependency_Additional_CdnsArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Cdns_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
};


export type Query_RootDependency_Additional_Cdns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Cdns_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
};


export type Query_RootDependency_Additional_Cdns_By_PkArgs = {
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
};


export type Query_RootDependency_Additional_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Repositories_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
};


export type Query_RootDependency_Additional_Repositories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Repositories_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
};


export type Query_RootDependency_Additional_Repositories_By_PkArgs = {
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
};


export type Query_RootDependency_RegistriesArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Registries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Registries_Order_By>>;
  where?: InputMaybe<Dependency_Registries_Bool_Exp>;
};


export type Query_RootDependency_Registries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Registries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Registries_Order_By>>;
  where?: InputMaybe<Dependency_Registries_Bool_Exp>;
};


export type Query_RootDependency_Registries_By_PkArgs = {
  address: Scalars['String'];
};


export type Query_RootDependency_ScriptsArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Scripts_Order_By>>;
  where?: InputMaybe<Dependency_Scripts_Bool_Exp>;
};


export type Query_RootDependency_Scripts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Scripts_Order_By>>;
  where?: InputMaybe<Dependency_Scripts_Bool_Exp>;
};


export type Query_RootDependency_Scripts_By_PkArgs = {
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
};


export type Query_RootEntity_TagsArgs = {
  distinct_on?: InputMaybe<Array<Entity_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Entity_Tags_Order_By>>;
  where?: InputMaybe<Entity_Tags_Bool_Exp>;
};


export type Query_RootEntity_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFavoritesArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


export type Query_RootFavorites_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


export type Query_RootFavorites_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFeature_FlagsArgs = {
  distinct_on?: InputMaybe<Array<Feature_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Feature_Flags_Order_By>>;
  where?: InputMaybe<Feature_Flags_Bool_Exp>;
};


export type Query_RootFeature_Flags_By_PkArgs = {
  flag_name: Scalars['String'];
};


export type Query_RootFilter_Tokens_Metadata_By_FeaturesArgs = {
  args: Filter_Tokens_Metadata_By_Features_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Query_RootFilter_Tokens_Metadata_By_Features_AggregateArgs = {
  args: Filter_Tokens_Metadata_By_Features_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Query_RootGetAuthMessageArgs = {
  publicAddress: Scalars['String'];
};


export type Query_RootGetOpenseaCollectionUrlArgs = {
  contractAddress: Scalars['String'];
  projectId: Scalars['String'];
};


export type Query_RootIsTokenFlaggedArgs = {
  contractAddress: Scalars['String'];
  tokenId: Scalars['String'];
};


export type Query_RootList_Projects_Metadata_RandomArgs = {
  args: List_Projects_Metadata_Random_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Query_RootList_Projects_Metadata_Random_AggregateArgs = {
  args: List_Projects_Metadata_Random_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Query_RootMediaArgs = {
  distinct_on?: InputMaybe<Array<Media_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Media_Order_By>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Query_RootMedia_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootMinter_Filters_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Minter_Filters_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Minter_Filters_Metadata_Order_By>>;
  where?: InputMaybe<Minter_Filters_Metadata_Bool_Exp>;
};


export type Query_RootMinter_Filters_Metadata_By_PkArgs = {
  address: Scalars['String'];
};


export type Query_RootMinter_TypesArgs = {
  distinct_on?: InputMaybe<Array<Minter_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Minter_Types_Order_By>>;
  where?: InputMaybe<Minter_Types_Bool_Exp>;
};


export type Query_RootMinter_Types_By_PkArgs = {
  type: Minter_Type_Names_Enum;
};


export type Query_RootMinters_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Minters_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Minters_Metadata_Order_By>>;
  where?: InputMaybe<Minters_Metadata_Bool_Exp>;
};


export type Query_RootMinters_Metadata_By_PkArgs = {
  address: Scalars['String'];
};


export type Query_RootProject_External_Asset_DependenciesArgs = {
  distinct_on?: InputMaybe<Array<Project_External_Asset_Dependencies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_External_Asset_Dependencies_Order_By>>;
  where?: InputMaybe<Project_External_Asset_Dependencies_Bool_Exp>;
};


export type Query_RootProject_External_Asset_Dependencies_By_PkArgs = {
  index: Scalars['Int'];
  project_id: Scalars['String'];
};


export type Query_RootProject_Minter_ConfigurationsArgs = {
  distinct_on?: InputMaybe<Array<Project_Minter_Configurations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Minter_Configurations_Order_By>>;
  where?: InputMaybe<Project_Minter_Configurations_Bool_Exp>;
};


export type Query_RootProject_Minter_Configurations_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootProject_ScriptsArgs = {
  distinct_on?: InputMaybe<Array<Project_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Scripts_Order_By>>;
  where?: InputMaybe<Project_Scripts_Bool_Exp>;
};


export type Query_RootProject_Scripts_By_PkArgs = {
  index: Scalars['Int'];
  project_id: Scalars['String'];
};


export type Query_RootProject_SeriesArgs = {
  distinct_on?: InputMaybe<Array<Project_Series_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Series_Order_By>>;
  where?: InputMaybe<Project_Series_Bool_Exp>;
};


export type Query_RootProject_Series_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Series_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Series_Order_By>>;
  where?: InputMaybe<Project_Series_Bool_Exp>;
};


export type Query_RootProject_Series_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootProject_Vertical_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Project_Vertical_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Vertical_Categories_Order_By>>;
  where?: InputMaybe<Project_Vertical_Categories_Bool_Exp>;
};


export type Query_RootProject_Vertical_Categories_By_PkArgs = {
  name: Categories_Enum;
};


export type Query_RootProject_VerticalsArgs = {
  distinct_on?: InputMaybe<Array<Project_Verticals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Verticals_Order_By>>;
  where?: InputMaybe<Project_Verticals_Bool_Exp>;
};


export type Query_RootProject_Verticals_By_PkArgs = {
  name: Verticals_Enum;
};


export type Query_RootProjects_FeaturesArgs = {
  distinct_on?: InputMaybe<Array<Projects_Features_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Features_Order_By>>;
  where?: InputMaybe<Projects_Features_Bool_Exp>;
};


export type Query_RootProjects_Features_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootProjects_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Query_RootProjects_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Query_RootProjects_Metadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootProposed_Artist_Addresses_And_SplitsArgs = {
  distinct_on?: InputMaybe<Array<Proposed_Artist_Addresses_And_Splits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Proposed_Artist_Addresses_And_Splits_Order_By>>;
  where?: InputMaybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>;
};


export type Query_RootProposed_Artist_Addresses_And_Splits_By_PkArgs = {
  project_id: Scalars['String'];
};


export type Query_RootReceipt_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


export type Query_RootReceipt_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


export type Query_RootReceipt_Metadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootRender_TypesArgs = {
  distinct_on?: InputMaybe<Array<Render_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Render_Types_Order_By>>;
  where?: InputMaybe<Render_Types_Bool_Exp>;
};


export type Query_RootRender_Types_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootSearch_ProjectsArgs = {
  args: Search_Projects_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Query_RootSearch_Projects_AggregateArgs = {
  args: Search_Projects_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Query_RootSearch_TagsArgs = {
  args: Search_Tags_Args;
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Query_RootSearch_TokensArgs = {
  args: Search_Tokens_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Query_RootSearch_Tokens_AggregateArgs = {
  args: Search_Tokens_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Query_RootSearch_UsersArgs = {
  args: Search_Users_Args;
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Query_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args;
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Query_RootTagsArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Query_RootTags_By_PkArgs = {
  name: Scalars['String'];
};


export type Query_RootTokens_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Query_RootTokens_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Query_RootTokens_Metadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootUser_ProfilesArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Query_RootUser_Profiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Query_RootUser_Profiles_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  public_address: Scalars['String'];
};


export type Query_RootVerticalsArgs = {
  distinct_on?: InputMaybe<Array<Verticals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Verticals_Order_By>>;
  where?: InputMaybe<Verticals_Bool_Exp>;
};


export type Query_RootVerticals_By_PkArgs = {
  name: Scalars['String'];
};


export type Query_RootVideo_Aspect_RatiosArgs = {
  distinct_on?: InputMaybe<Array<Video_Aspect_Ratios_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Video_Aspect_Ratios_Order_By>>;
  where?: InputMaybe<Video_Aspect_Ratios_Bool_Exp>;
};


export type Query_RootVideo_Aspect_Ratios_By_PkArgs = {
  value: Scalars['numeric'];
};


export type Query_RootVideo_Frame_RatesArgs = {
  distinct_on?: InputMaybe<Array<Video_Frame_Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Video_Frame_Rates_Order_By>>;
  where?: InputMaybe<Video_Frame_Rates_Bool_Exp>;
};


export type Query_RootVideo_Frame_Rates_By_PkArgs = {
  value: Scalars['Int'];
};


export type Query_RootWebflow_Artist_InfoArgs = {
  distinct_on?: InputMaybe<Array<Webflow_Artist_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Webflow_Artist_Info_Order_By>>;
  where?: InputMaybe<Webflow_Artist_Info_Bool_Exp>;
};


export type Query_RootWebflow_Artist_Info_By_PkArgs = {
  webflow_item_id: Scalars['String'];
};


export type Query_RootWebflow_Spectrum_ArticlesArgs = {
  distinct_on?: InputMaybe<Array<Webflow_Spectrum_Articles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Webflow_Spectrum_Articles_Order_By>>;
  where?: InputMaybe<Webflow_Spectrum_Articles_Bool_Exp>;
};


export type Query_RootWebflow_Spectrum_Articles_By_PkArgs = {
  webflow_item_id: Scalars['String'];
};

/** indexed data from subgraph Receipt entity, used by settlment minters */
export type Receipt_Metadata = {
  __typename?: 'receipt_metadata';
  /** Computed field defining approximate excess settlement funds available to be reclaimed on a given receipt, given latest purchase price on minter. May have minor rounding errors after 15 decimals. */
  excess_settlement_funds?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** An object relationship */
  minter: Minters_Metadata;
  minter_id: Scalars['String'];
  net_posted: Scalars['String'];
  num_purchased: Scalars['String'];
  /** An object relationship */
  project: Projects_Metadata;
  project_id: Scalars['String'];
  /** An object relationship */
  user: Users;
  user_address: Scalars['String'];
};

/** aggregated selection of "receipt_metadata" */
export type Receipt_Metadata_Aggregate = {
  __typename?: 'receipt_metadata_aggregate';
  aggregate?: Maybe<Receipt_Metadata_Aggregate_Fields>;
  nodes: Array<Receipt_Metadata>;
};

export type Receipt_Metadata_Aggregate_Bool_Exp = {
  count?: InputMaybe<Receipt_Metadata_Aggregate_Bool_Exp_Count>;
};

export type Receipt_Metadata_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Receipt_Metadata_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "receipt_metadata" */
export type Receipt_Metadata_Aggregate_Fields = {
  __typename?: 'receipt_metadata_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Receipt_Metadata_Max_Fields>;
  min?: Maybe<Receipt_Metadata_Min_Fields>;
};


/** aggregate fields of "receipt_metadata" */
export type Receipt_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "receipt_metadata" */
export type Receipt_Metadata_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Receipt_Metadata_Max_Order_By>;
  min?: InputMaybe<Receipt_Metadata_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "receipt_metadata". All fields are combined with a logical 'AND'. */
export type Receipt_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Receipt_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Receipt_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Receipt_Metadata_Bool_Exp>>;
  excess_settlement_funds?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  minter?: InputMaybe<Minters_Metadata_Bool_Exp>;
  minter_id?: InputMaybe<String_Comparison_Exp>;
  net_posted?: InputMaybe<String_Comparison_Exp>;
  num_purchased?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_address?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Receipt_Metadata_Max_Fields = {
  __typename?: 'receipt_metadata_max_fields';
  id?: Maybe<Scalars['String']>;
  minter_id?: Maybe<Scalars['String']>;
  net_posted?: Maybe<Scalars['String']>;
  num_purchased?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  user_address?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "receipt_metadata" */
export type Receipt_Metadata_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  minter_id?: InputMaybe<Order_By>;
  net_posted?: InputMaybe<Order_By>;
  num_purchased?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Receipt_Metadata_Min_Fields = {
  __typename?: 'receipt_metadata_min_fields';
  id?: Maybe<Scalars['String']>;
  minter_id?: Maybe<Scalars['String']>;
  net_posted?: Maybe<Scalars['String']>;
  num_purchased?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  user_address?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "receipt_metadata" */
export type Receipt_Metadata_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  minter_id?: InputMaybe<Order_By>;
  net_posted?: InputMaybe<Order_By>;
  num_purchased?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "receipt_metadata". */
export type Receipt_Metadata_Order_By = {
  excess_settlement_funds?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  minter?: InputMaybe<Minters_Metadata_Order_By>;
  minter_id?: InputMaybe<Order_By>;
  net_posted?: InputMaybe<Order_By>;
  num_purchased?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_address?: InputMaybe<Order_By>;
};

/** select columns of table "receipt_metadata" */
export enum Receipt_Metadata_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  MinterId = 'minter_id',
  /** column name */
  NetPosted = 'net_posted',
  /** column name */
  NumPurchased = 'num_purchased',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  UserAddress = 'user_address'
}

/** Streaming cursor of the table "receipt_metadata" */
export type Receipt_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Receipt_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Receipt_Metadata_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']>;
  minter_id?: InputMaybe<Scalars['String']>;
  net_posted?: InputMaybe<Scalars['String']>;
  num_purchased?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['String']>;
  user_address?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "render_types" */
export type Render_Types = {
  __typename?: 'render_types';
  label: Scalars['String'];
  value: Scalars['String'];
};

/** Boolean expression to filter rows from the table "render_types". All fields are combined with a logical 'AND'. */
export type Render_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Render_Types_Bool_Exp>>;
  _not?: InputMaybe<Render_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Render_Types_Bool_Exp>>;
  label?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Render_Types_Enum {
  /** gif */
  Gif = 'gif',
  /** png */
  Image = 'image',
  /** generator live view */
  Live = 'live',
  /** mp4 */
  Video = 'video'
}

/** Boolean expression to compare columns of type "render_types_enum". All fields are combined with logical 'AND'. */
export type Render_Types_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Render_Types_Enum>;
  _in?: InputMaybe<Array<Render_Types_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Render_Types_Enum>;
  _nin?: InputMaybe<Array<Render_Types_Enum>>;
};

/** Ordering options when selecting data from "render_types". */
export type Render_Types_Order_By = {
  label?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "render_types" */
export enum Render_Types_Select_Column {
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** Streaming cursor of the table "render_types" */
export type Render_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Render_Types_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Render_Types_Stream_Cursor_Value_Input = {
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Search_Projects_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Search_Tags_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Search_Tokens_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Search_Users_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "artists" */
  artists: Array<Artists>;
  /** fetch aggregated fields from the table: "artists" */
  artists_aggregate: Artists_Aggregate;
  /** fetch data from the table in a streaming manner: "artists" */
  artists_stream: Array<Artists>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table in a streaming manner: "categories" */
  categories_stream: Array<Categories>;
  /** fetch data from the table: "contract_allowlistings" */
  contract_allowlistings: Array<Contract_Allowlistings>;
  /** fetch data from the table: "contract_allowlistings" using primary key columns */
  contract_allowlistings_by_pk?: Maybe<Contract_Allowlistings>;
  /** fetch data from the table in a streaming manner: "contract_allowlistings" */
  contract_allowlistings_stream: Array<Contract_Allowlistings>;
  /** fetch data from the table: "contract_type_names" */
  contract_type_names: Array<Contract_Type_Names>;
  /** fetch data from the table: "contract_type_names" using primary key columns */
  contract_type_names_by_pk?: Maybe<Contract_Type_Names>;
  /** fetch data from the table in a streaming manner: "contract_type_names" */
  contract_type_names_stream: Array<Contract_Type_Names>;
  /** fetch data from the table: "contract_types" */
  contract_types: Array<Contract_Types>;
  /** fetch data from the table: "contract_types" using primary key columns */
  contract_types_by_pk?: Maybe<Contract_Types>;
  /** fetch data from the table in a streaming manner: "contract_types" */
  contract_types_stream: Array<Contract_Types>;
  /** fetch data from the table: "contracts_metadata" */
  contracts_metadata: Array<Contracts_Metadata>;
  /** fetch aggregated fields from the table: "contracts_metadata" */
  contracts_metadata_aggregate: Contracts_Metadata_Aggregate;
  /** fetch data from the table: "contracts_metadata" using primary key columns */
  contracts_metadata_by_pk?: Maybe<Contracts_Metadata>;
  /** fetch data from the table in a streaming manner: "contracts_metadata" */
  contracts_metadata_stream: Array<Contracts_Metadata>;
  /** fetch data from the table: "dependencies_metadata" */
  dependencies_metadata: Array<Dependencies_Metadata>;
  /** fetch aggregated fields from the table: "dependencies_metadata" */
  dependencies_metadata_aggregate: Dependencies_Metadata_Aggregate;
  /** fetch data from the table: "dependencies_metadata" using primary key columns */
  dependencies_metadata_by_pk?: Maybe<Dependencies_Metadata>;
  /** fetch data from the table in a streaming manner: "dependencies_metadata" */
  dependencies_metadata_stream: Array<Dependencies_Metadata>;
  /** fetch data from the table: "dependency_additional_cdns" */
  dependency_additional_cdns: Array<Dependency_Additional_Cdns>;
  /** fetch aggregated fields from the table: "dependency_additional_cdns" */
  dependency_additional_cdns_aggregate: Dependency_Additional_Cdns_Aggregate;
  /** fetch data from the table: "dependency_additional_cdns" using primary key columns */
  dependency_additional_cdns_by_pk?: Maybe<Dependency_Additional_Cdns>;
  /** fetch data from the table in a streaming manner: "dependency_additional_cdns" */
  dependency_additional_cdns_stream: Array<Dependency_Additional_Cdns>;
  /** fetch data from the table: "dependency_additional_repositories" */
  dependency_additional_repositories: Array<Dependency_Additional_Repositories>;
  /** fetch aggregated fields from the table: "dependency_additional_repositories" */
  dependency_additional_repositories_aggregate: Dependency_Additional_Repositories_Aggregate;
  /** fetch data from the table: "dependency_additional_repositories" using primary key columns */
  dependency_additional_repositories_by_pk?: Maybe<Dependency_Additional_Repositories>;
  /** fetch data from the table in a streaming manner: "dependency_additional_repositories" */
  dependency_additional_repositories_stream: Array<Dependency_Additional_Repositories>;
  /** fetch data from the table: "dependency_registries" */
  dependency_registries: Array<Dependency_Registries>;
  /** fetch aggregated fields from the table: "dependency_registries" */
  dependency_registries_aggregate: Dependency_Registries_Aggregate;
  /** fetch data from the table: "dependency_registries" using primary key columns */
  dependency_registries_by_pk?: Maybe<Dependency_Registries>;
  /** fetch data from the table in a streaming manner: "dependency_registries" */
  dependency_registries_stream: Array<Dependency_Registries>;
  /** fetch data from the table: "dependency_scripts" */
  dependency_scripts: Array<Dependency_Scripts>;
  /** fetch aggregated fields from the table: "dependency_scripts" */
  dependency_scripts_aggregate: Dependency_Scripts_Aggregate;
  /** fetch data from the table: "dependency_scripts" using primary key columns */
  dependency_scripts_by_pk?: Maybe<Dependency_Scripts>;
  /** fetch data from the table in a streaming manner: "dependency_scripts" */
  dependency_scripts_stream: Array<Dependency_Scripts>;
  /** An array relationship */
  entity_tags: Array<Entity_Tags>;
  /** fetch data from the table: "entity_tags" using primary key columns */
  entity_tags_by_pk?: Maybe<Entity_Tags>;
  /** fetch data from the table in a streaming manner: "entity_tags" */
  entity_tags_stream: Array<Entity_Tags>;
  /** An array relationship */
  favorites: Array<Favorites>;
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate;
  /** fetch data from the table: "favorites" using primary key columns */
  favorites_by_pk?: Maybe<Favorites>;
  /** fetch data from the table in a streaming manner: "favorites" */
  favorites_stream: Array<Favorites>;
  /** fetch data from the table: "feature_flags" */
  feature_flags: Array<Feature_Flags>;
  /** fetch data from the table: "feature_flags" using primary key columns */
  feature_flags_by_pk?: Maybe<Feature_Flags>;
  /** fetch data from the table in a streaming manner: "feature_flags" */
  feature_flags_stream: Array<Feature_Flags>;
  /** execute function "filter_tokens_metadata_by_features" which returns "tokens_metadata" */
  filter_tokens_metadata_by_features: Array<Tokens_Metadata>;
  /** execute function "filter_tokens_metadata_by_features" and query aggregates on result of table type "tokens_metadata" */
  filter_tokens_metadata_by_features_aggregate: Tokens_Metadata_Aggregate;
  /** execute function "list_projects_metadata_random" which returns "projects_metadata" */
  list_projects_metadata_random: Array<Projects_Metadata>;
  /** execute function "list_projects_metadata_random" and query aggregates on result of table type "projects_metadata" */
  list_projects_metadata_random_aggregate: Projects_Metadata_Aggregate;
  /** fetch data from the table: "media" */
  media: Array<Media>;
  /** fetch data from the table: "media" using primary key columns */
  media_by_pk?: Maybe<Media>;
  /** fetch data from the table in a streaming manner: "media" */
  media_stream: Array<Media>;
  /** fetch data from the table: "minter_filters_metadata" */
  minter_filters_metadata: Array<Minter_Filters_Metadata>;
  /** fetch data from the table: "minter_filters_metadata" using primary key columns */
  minter_filters_metadata_by_pk?: Maybe<Minter_Filters_Metadata>;
  /** fetch data from the table in a streaming manner: "minter_filters_metadata" */
  minter_filters_metadata_stream: Array<Minter_Filters_Metadata>;
  /** fetch data from the table: "minter_types" */
  minter_types: Array<Minter_Types>;
  /** fetch data from the table: "minter_types" using primary key columns */
  minter_types_by_pk?: Maybe<Minter_Types>;
  /** fetch data from the table in a streaming manner: "minter_types" */
  minter_types_stream: Array<Minter_Types>;
  /** fetch data from the table: "minters_metadata" */
  minters_metadata: Array<Minters_Metadata>;
  /** fetch data from the table: "minters_metadata" using primary key columns */
  minters_metadata_by_pk?: Maybe<Minters_Metadata>;
  /** fetch data from the table in a streaming manner: "minters_metadata" */
  minters_metadata_stream: Array<Minters_Metadata>;
  /** fetch data from the table: "project_external_asset_dependencies" */
  project_external_asset_dependencies: Array<Project_External_Asset_Dependencies>;
  /** fetch data from the table: "project_external_asset_dependencies" using primary key columns */
  project_external_asset_dependencies_by_pk?: Maybe<Project_External_Asset_Dependencies>;
  /** fetch data from the table in a streaming manner: "project_external_asset_dependencies" */
  project_external_asset_dependencies_stream: Array<Project_External_Asset_Dependencies>;
  /** fetch data from the table: "project_minter_configurations" */
  project_minter_configurations: Array<Project_Minter_Configurations>;
  /** fetch data from the table: "project_minter_configurations" using primary key columns */
  project_minter_configurations_by_pk?: Maybe<Project_Minter_Configurations>;
  /** fetch data from the table in a streaming manner: "project_minter_configurations" */
  project_minter_configurations_stream: Array<Project_Minter_Configurations>;
  /** fetch data from the table: "project_scripts" */
  project_scripts: Array<Project_Scripts>;
  /** fetch data from the table: "project_scripts" using primary key columns */
  project_scripts_by_pk?: Maybe<Project_Scripts>;
  /** fetch data from the table in a streaming manner: "project_scripts" */
  project_scripts_stream: Array<Project_Scripts>;
  /** fetch data from the table: "project_series" */
  project_series: Array<Project_Series>;
  /** fetch aggregated fields from the table: "project_series" */
  project_series_aggregate: Project_Series_Aggregate;
  /** fetch data from the table: "project_series" using primary key columns */
  project_series_by_pk?: Maybe<Project_Series>;
  /** fetch data from the table in a streaming manner: "project_series" */
  project_series_stream: Array<Project_Series>;
  /** fetch data from the table: "project_vertical_categories" */
  project_vertical_categories: Array<Project_Vertical_Categories>;
  /** fetch data from the table: "project_vertical_categories" using primary key columns */
  project_vertical_categories_by_pk?: Maybe<Project_Vertical_Categories>;
  /** fetch data from the table in a streaming manner: "project_vertical_categories" */
  project_vertical_categories_stream: Array<Project_Vertical_Categories>;
  /** fetch data from the table: "project_verticals" */
  project_verticals: Array<Project_Verticals>;
  /** fetch data from the table: "project_verticals" using primary key columns */
  project_verticals_by_pk?: Maybe<Project_Verticals>;
  /** fetch data from the table in a streaming manner: "project_verticals" */
  project_verticals_stream: Array<Project_Verticals>;
  /** fetch data from the table: "projects_features" */
  projects_features: Array<Projects_Features>;
  /** fetch data from the table: "projects_features" using primary key columns */
  projects_features_by_pk?: Maybe<Projects_Features>;
  /** fetch data from the table in a streaming manner: "projects_features" */
  projects_features_stream: Array<Projects_Features>;
  /** fetch data from the table: "projects_metadata" */
  projects_metadata: Array<Projects_Metadata>;
  /** fetch aggregated fields from the table: "projects_metadata" */
  projects_metadata_aggregate: Projects_Metadata_Aggregate;
  /** fetch data from the table: "projects_metadata" using primary key columns */
  projects_metadata_by_pk?: Maybe<Projects_Metadata>;
  /** fetch data from the table in a streaming manner: "projects_metadata" */
  projects_metadata_stream: Array<Projects_Metadata>;
  /** fetch data from the table: "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits: Array<Proposed_Artist_Addresses_And_Splits>;
  /** fetch data from the table: "proposed_artist_addresses_and_splits" using primary key columns */
  proposed_artist_addresses_and_splits_by_pk?: Maybe<Proposed_Artist_Addresses_And_Splits>;
  /** fetch data from the table in a streaming manner: "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits_stream: Array<Proposed_Artist_Addresses_And_Splits>;
  /** fetch data from the table: "receipt_metadata" */
  receipt_metadata: Array<Receipt_Metadata>;
  /** fetch aggregated fields from the table: "receipt_metadata" */
  receipt_metadata_aggregate: Receipt_Metadata_Aggregate;
  /** fetch data from the table: "receipt_metadata" using primary key columns */
  receipt_metadata_by_pk?: Maybe<Receipt_Metadata>;
  /** fetch data from the table in a streaming manner: "receipt_metadata" */
  receipt_metadata_stream: Array<Receipt_Metadata>;
  /** fetch data from the table: "render_types" */
  render_types: Array<Render_Types>;
  /** fetch data from the table: "render_types" using primary key columns */
  render_types_by_pk?: Maybe<Render_Types>;
  /** fetch data from the table in a streaming manner: "render_types" */
  render_types_stream: Array<Render_Types>;
  /** execute function "search_projects" which returns "projects_metadata" */
  search_projects: Array<Projects_Metadata>;
  /** execute function "search_projects" and query aggregates on result of table type "projects_metadata" */
  search_projects_aggregate: Projects_Metadata_Aggregate;
  /** execute function "search_tags" which returns "tags" */
  search_tags: Array<Tags>;
  /** execute function "search_tokens" which returns "tokens_metadata" */
  search_tokens: Array<Tokens_Metadata>;
  /** execute function "search_tokens" and query aggregates on result of table type "tokens_metadata" */
  search_tokens_aggregate: Tokens_Metadata_Aggregate;
  /** execute function "search_users" which returns "user_profiles" */
  search_users: Array<User_Profiles>;
  /** execute function "search_users" and query aggregates on result of table type "user_profiles" */
  search_users_aggregate: User_Profiles_Aggregate;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table in a streaming manner: "tags" */
  tags_stream: Array<Tags>;
  /** fetch data from the table: "tokens_metadata" */
  tokens_metadata: Array<Tokens_Metadata>;
  /** fetch aggregated fields from the table: "tokens_metadata" */
  tokens_metadata_aggregate: Tokens_Metadata_Aggregate;
  /** fetch data from the table: "tokens_metadata" using primary key columns */
  tokens_metadata_by_pk?: Maybe<Tokens_Metadata>;
  /** fetch data from the table in a streaming manner: "tokens_metadata" */
  tokens_metadata_stream: Array<Tokens_Metadata>;
  /** fetch data from the table: "user_profiles" */
  user_profiles: Array<User_Profiles>;
  /** fetch aggregated fields from the table: "user_profiles" */
  user_profiles_aggregate: User_Profiles_Aggregate;
  /** fetch data from the table: "user_profiles" using primary key columns */
  user_profiles_by_pk?: Maybe<User_Profiles>;
  /** fetch data from the table in a streaming manner: "user_profiles" */
  user_profiles_stream: Array<User_Profiles>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
  /** fetch data from the table: "verticals" */
  verticals: Array<Verticals>;
  /** fetch data from the table: "verticals" using primary key columns */
  verticals_by_pk?: Maybe<Verticals>;
  /** fetch data from the table in a streaming manner: "verticals" */
  verticals_stream: Array<Verticals>;
  /** fetch data from the table: "video_aspect_ratios" */
  video_aspect_ratios: Array<Video_Aspect_Ratios>;
  /** fetch data from the table: "video_aspect_ratios" using primary key columns */
  video_aspect_ratios_by_pk?: Maybe<Video_Aspect_Ratios>;
  /** fetch data from the table in a streaming manner: "video_aspect_ratios" */
  video_aspect_ratios_stream: Array<Video_Aspect_Ratios>;
  /** fetch data from the table: "video_frame_rates" */
  video_frame_rates: Array<Video_Frame_Rates>;
  /** fetch data from the table: "video_frame_rates" using primary key columns */
  video_frame_rates_by_pk?: Maybe<Video_Frame_Rates>;
  /** fetch data from the table in a streaming manner: "video_frame_rates" */
  video_frame_rates_stream: Array<Video_Frame_Rates>;
  /** fetch data from the table: "webflow_artist_info" */
  webflow_artist_info: Array<Webflow_Artist_Info>;
  /** fetch data from the table: "webflow_artist_info" using primary key columns */
  webflow_artist_info_by_pk?: Maybe<Webflow_Artist_Info>;
  /** fetch data from the table in a streaming manner: "webflow_artist_info" */
  webflow_artist_info_stream: Array<Webflow_Artist_Info>;
  /** fetch data from the table: "webflow_spectrum_articles" */
  webflow_spectrum_articles: Array<Webflow_Spectrum_Articles>;
  /** fetch data from the table: "webflow_spectrum_articles" using primary key columns */
  webflow_spectrum_articles_by_pk?: Maybe<Webflow_Spectrum_Articles>;
  /** fetch data from the table in a streaming manner: "webflow_spectrum_articles" */
  webflow_spectrum_articles_stream: Array<Webflow_Spectrum_Articles>;
};


export type Subscription_RootArtistsArgs = {
  distinct_on?: InputMaybe<Array<Artists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Artists_Order_By>>;
  where?: InputMaybe<Artists_Bool_Exp>;
};


export type Subscription_RootArtists_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Artists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Artists_Order_By>>;
  where?: InputMaybe<Artists_Bool_Exp>;
};


export type Subscription_RootArtists_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Artists_Stream_Cursor_Input>>;
  where?: InputMaybe<Artists_Bool_Exp>;
};


export type Subscription_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootCategories_By_PkArgs = {
  name: Scalars['String'];
};


export type Subscription_RootCategories_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootContract_AllowlistingsArgs = {
  distinct_on?: InputMaybe<Array<Contract_Allowlistings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Allowlistings_Order_By>>;
  where?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
};


export type Subscription_RootContract_Allowlistings_By_PkArgs = {
  contract_address: Scalars['String'];
  user_address: Scalars['String'];
};


export type Subscription_RootContract_Allowlistings_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contract_Allowlistings_Stream_Cursor_Input>>;
  where?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
};


export type Subscription_RootContract_Type_NamesArgs = {
  distinct_on?: InputMaybe<Array<Contract_Type_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Type_Names_Order_By>>;
  where?: InputMaybe<Contract_Type_Names_Bool_Exp>;
};


export type Subscription_RootContract_Type_Names_By_PkArgs = {
  name: Scalars['String'];
};


export type Subscription_RootContract_Type_Names_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contract_Type_Names_Stream_Cursor_Input>>;
  where?: InputMaybe<Contract_Type_Names_Bool_Exp>;
};


export type Subscription_RootContract_TypesArgs = {
  distinct_on?: InputMaybe<Array<Contract_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Types_Order_By>>;
  where?: InputMaybe<Contract_Types_Bool_Exp>;
};


export type Subscription_RootContract_Types_By_PkArgs = {
  type: Contract_Type_Names_Enum;
};


export type Subscription_RootContract_Types_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contract_Types_Stream_Cursor_Input>>;
  where?: InputMaybe<Contract_Types_Bool_Exp>;
};


export type Subscription_RootContracts_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Metadata_Order_By>>;
  where?: InputMaybe<Contracts_Metadata_Bool_Exp>;
};


export type Subscription_RootContracts_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Metadata_Order_By>>;
  where?: InputMaybe<Contracts_Metadata_Bool_Exp>;
};


export type Subscription_RootContracts_Metadata_By_PkArgs = {
  address: Scalars['String'];
};


export type Subscription_RootContracts_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contracts_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Contracts_Metadata_Bool_Exp>;
};


export type Subscription_RootDependencies_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependencies_Metadata_Order_By>>;
  where?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
};


export type Subscription_RootDependencies_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependencies_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependencies_Metadata_Order_By>>;
  where?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
};


export type Subscription_RootDependencies_Metadata_By_PkArgs = {
  type_and_version: Scalars['String'];
};


export type Subscription_RootDependencies_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Dependencies_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Dependencies_Metadata_Bool_Exp>;
};


export type Subscription_RootDependency_Additional_CdnsArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Cdns_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
};


export type Subscription_RootDependency_Additional_Cdns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Cdns_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Cdns_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
};


export type Subscription_RootDependency_Additional_Cdns_By_PkArgs = {
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
};


export type Subscription_RootDependency_Additional_Cdns_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Dependency_Additional_Cdns_Stream_Cursor_Input>>;
  where?: InputMaybe<Dependency_Additional_Cdns_Bool_Exp>;
};


export type Subscription_RootDependency_Additional_RepositoriesArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Repositories_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
};


export type Subscription_RootDependency_Additional_Repositories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Additional_Repositories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Additional_Repositories_Order_By>>;
  where?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
};


export type Subscription_RootDependency_Additional_Repositories_By_PkArgs = {
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
};


export type Subscription_RootDependency_Additional_Repositories_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Dependency_Additional_Repositories_Stream_Cursor_Input>>;
  where?: InputMaybe<Dependency_Additional_Repositories_Bool_Exp>;
};


export type Subscription_RootDependency_RegistriesArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Registries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Registries_Order_By>>;
  where?: InputMaybe<Dependency_Registries_Bool_Exp>;
};


export type Subscription_RootDependency_Registries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Registries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Registries_Order_By>>;
  where?: InputMaybe<Dependency_Registries_Bool_Exp>;
};


export type Subscription_RootDependency_Registries_By_PkArgs = {
  address: Scalars['String'];
};


export type Subscription_RootDependency_Registries_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Dependency_Registries_Stream_Cursor_Input>>;
  where?: InputMaybe<Dependency_Registries_Bool_Exp>;
};


export type Subscription_RootDependency_ScriptsArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Scripts_Order_By>>;
  where?: InputMaybe<Dependency_Scripts_Bool_Exp>;
};


export type Subscription_RootDependency_Scripts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dependency_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dependency_Scripts_Order_By>>;
  where?: InputMaybe<Dependency_Scripts_Bool_Exp>;
};


export type Subscription_RootDependency_Scripts_By_PkArgs = {
  dependency_type_and_version: Scalars['String'];
  index: Scalars['Int'];
};


export type Subscription_RootDependency_Scripts_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Dependency_Scripts_Stream_Cursor_Input>>;
  where?: InputMaybe<Dependency_Scripts_Bool_Exp>;
};


export type Subscription_RootEntity_TagsArgs = {
  distinct_on?: InputMaybe<Array<Entity_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Entity_Tags_Order_By>>;
  where?: InputMaybe<Entity_Tags_Bool_Exp>;
};


export type Subscription_RootEntity_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootEntity_Tags_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Entity_Tags_Stream_Cursor_Input>>;
  where?: InputMaybe<Entity_Tags_Bool_Exp>;
};


export type Subscription_RootFavoritesArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


export type Subscription_RootFavorites_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


export type Subscription_RootFavorites_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFavorites_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Favorites_Stream_Cursor_Input>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


export type Subscription_RootFeature_FlagsArgs = {
  distinct_on?: InputMaybe<Array<Feature_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Feature_Flags_Order_By>>;
  where?: InputMaybe<Feature_Flags_Bool_Exp>;
};


export type Subscription_RootFeature_Flags_By_PkArgs = {
  flag_name: Scalars['String'];
};


export type Subscription_RootFeature_Flags_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Feature_Flags_Stream_Cursor_Input>>;
  where?: InputMaybe<Feature_Flags_Bool_Exp>;
};


export type Subscription_RootFilter_Tokens_Metadata_By_FeaturesArgs = {
  args: Filter_Tokens_Metadata_By_Features_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Subscription_RootFilter_Tokens_Metadata_By_Features_AggregateArgs = {
  args: Filter_Tokens_Metadata_By_Features_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Subscription_RootList_Projects_Metadata_RandomArgs = {
  args: List_Projects_Metadata_Random_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Subscription_RootList_Projects_Metadata_Random_AggregateArgs = {
  args: List_Projects_Metadata_Random_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Subscription_RootMediaArgs = {
  distinct_on?: InputMaybe<Array<Media_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Media_Order_By>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Subscription_RootMedia_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootMedia_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Media_Stream_Cursor_Input>>;
  where?: InputMaybe<Media_Bool_Exp>;
};


export type Subscription_RootMinter_Filters_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Minter_Filters_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Minter_Filters_Metadata_Order_By>>;
  where?: InputMaybe<Minter_Filters_Metadata_Bool_Exp>;
};


export type Subscription_RootMinter_Filters_Metadata_By_PkArgs = {
  address: Scalars['String'];
};


export type Subscription_RootMinter_Filters_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Minter_Filters_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Minter_Filters_Metadata_Bool_Exp>;
};


export type Subscription_RootMinter_TypesArgs = {
  distinct_on?: InputMaybe<Array<Minter_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Minter_Types_Order_By>>;
  where?: InputMaybe<Minter_Types_Bool_Exp>;
};


export type Subscription_RootMinter_Types_By_PkArgs = {
  type: Minter_Type_Names_Enum;
};


export type Subscription_RootMinter_Types_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Minter_Types_Stream_Cursor_Input>>;
  where?: InputMaybe<Minter_Types_Bool_Exp>;
};


export type Subscription_RootMinters_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Minters_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Minters_Metadata_Order_By>>;
  where?: InputMaybe<Minters_Metadata_Bool_Exp>;
};


export type Subscription_RootMinters_Metadata_By_PkArgs = {
  address: Scalars['String'];
};


export type Subscription_RootMinters_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Minters_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Minters_Metadata_Bool_Exp>;
};


export type Subscription_RootProject_External_Asset_DependenciesArgs = {
  distinct_on?: InputMaybe<Array<Project_External_Asset_Dependencies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_External_Asset_Dependencies_Order_By>>;
  where?: InputMaybe<Project_External_Asset_Dependencies_Bool_Exp>;
};


export type Subscription_RootProject_External_Asset_Dependencies_By_PkArgs = {
  index: Scalars['Int'];
  project_id: Scalars['String'];
};


export type Subscription_RootProject_External_Asset_Dependencies_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_External_Asset_Dependencies_Stream_Cursor_Input>>;
  where?: InputMaybe<Project_External_Asset_Dependencies_Bool_Exp>;
};


export type Subscription_RootProject_Minter_ConfigurationsArgs = {
  distinct_on?: InputMaybe<Array<Project_Minter_Configurations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Minter_Configurations_Order_By>>;
  where?: InputMaybe<Project_Minter_Configurations_Bool_Exp>;
};


export type Subscription_RootProject_Minter_Configurations_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootProject_Minter_Configurations_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Minter_Configurations_Stream_Cursor_Input>>;
  where?: InputMaybe<Project_Minter_Configurations_Bool_Exp>;
};


export type Subscription_RootProject_ScriptsArgs = {
  distinct_on?: InputMaybe<Array<Project_Scripts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Scripts_Order_By>>;
  where?: InputMaybe<Project_Scripts_Bool_Exp>;
};


export type Subscription_RootProject_Scripts_By_PkArgs = {
  index: Scalars['Int'];
  project_id: Scalars['String'];
};


export type Subscription_RootProject_Scripts_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Scripts_Stream_Cursor_Input>>;
  where?: InputMaybe<Project_Scripts_Bool_Exp>;
};


export type Subscription_RootProject_SeriesArgs = {
  distinct_on?: InputMaybe<Array<Project_Series_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Series_Order_By>>;
  where?: InputMaybe<Project_Series_Bool_Exp>;
};


export type Subscription_RootProject_Series_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Series_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Series_Order_By>>;
  where?: InputMaybe<Project_Series_Bool_Exp>;
};


export type Subscription_RootProject_Series_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootProject_Series_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Series_Stream_Cursor_Input>>;
  where?: InputMaybe<Project_Series_Bool_Exp>;
};


export type Subscription_RootProject_Vertical_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Project_Vertical_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Vertical_Categories_Order_By>>;
  where?: InputMaybe<Project_Vertical_Categories_Bool_Exp>;
};


export type Subscription_RootProject_Vertical_Categories_By_PkArgs = {
  name: Categories_Enum;
};


export type Subscription_RootProject_Vertical_Categories_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Vertical_Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Project_Vertical_Categories_Bool_Exp>;
};


export type Subscription_RootProject_VerticalsArgs = {
  distinct_on?: InputMaybe<Array<Project_Verticals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Verticals_Order_By>>;
  where?: InputMaybe<Project_Verticals_Bool_Exp>;
};


export type Subscription_RootProject_Verticals_By_PkArgs = {
  name: Verticals_Enum;
};


export type Subscription_RootProject_Verticals_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Verticals_Stream_Cursor_Input>>;
  where?: InputMaybe<Project_Verticals_Bool_Exp>;
};


export type Subscription_RootProjects_FeaturesArgs = {
  distinct_on?: InputMaybe<Array<Projects_Features_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Features_Order_By>>;
  where?: InputMaybe<Projects_Features_Bool_Exp>;
};


export type Subscription_RootProjects_Features_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootProjects_Features_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_Features_Stream_Cursor_Input>>;
  where?: InputMaybe<Projects_Features_Bool_Exp>;
};


export type Subscription_RootProjects_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Subscription_RootProjects_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Subscription_RootProjects_Metadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootProjects_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Subscription_RootProposed_Artist_Addresses_And_SplitsArgs = {
  distinct_on?: InputMaybe<Array<Proposed_Artist_Addresses_And_Splits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Proposed_Artist_Addresses_And_Splits_Order_By>>;
  where?: InputMaybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>;
};


export type Subscription_RootProposed_Artist_Addresses_And_Splits_By_PkArgs = {
  project_id: Scalars['String'];
};


export type Subscription_RootProposed_Artist_Addresses_And_Splits_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Input>>;
  where?: InputMaybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>;
};


export type Subscription_RootReceipt_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


export type Subscription_RootReceipt_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


export type Subscription_RootReceipt_Metadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootReceipt_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Receipt_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


export type Subscription_RootRender_TypesArgs = {
  distinct_on?: InputMaybe<Array<Render_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Render_Types_Order_By>>;
  where?: InputMaybe<Render_Types_Bool_Exp>;
};


export type Subscription_RootRender_Types_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootRender_Types_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Render_Types_Stream_Cursor_Input>>;
  where?: InputMaybe<Render_Types_Bool_Exp>;
};


export type Subscription_RootSearch_ProjectsArgs = {
  args: Search_Projects_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Subscription_RootSearch_Projects_AggregateArgs = {
  args: Search_Projects_Args;
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


export type Subscription_RootSearch_TagsArgs = {
  args: Search_Tags_Args;
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Subscription_RootSearch_TokensArgs = {
  args: Search_Tokens_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Subscription_RootSearch_Tokens_AggregateArgs = {
  args: Search_Tokens_Args;
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Subscription_RootSearch_UsersArgs = {
  args: Search_Users_Args;
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args;
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootTagsArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Subscription_RootTags_By_PkArgs = {
  name: Scalars['String'];
};


export type Subscription_RootTags_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Tags_Stream_Cursor_Input>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Subscription_RootTokens_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Subscription_RootTokens_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Subscription_RootTokens_Metadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootTokens_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Tokens_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


export type Subscription_RootUser_ProfilesArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootUser_Profiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootUser_Profiles_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUser_Profiles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Profiles_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  public_address: Scalars['String'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootVerticalsArgs = {
  distinct_on?: InputMaybe<Array<Verticals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Verticals_Order_By>>;
  where?: InputMaybe<Verticals_Bool_Exp>;
};


export type Subscription_RootVerticals_By_PkArgs = {
  name: Scalars['String'];
};


export type Subscription_RootVerticals_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Verticals_Stream_Cursor_Input>>;
  where?: InputMaybe<Verticals_Bool_Exp>;
};


export type Subscription_RootVideo_Aspect_RatiosArgs = {
  distinct_on?: InputMaybe<Array<Video_Aspect_Ratios_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Video_Aspect_Ratios_Order_By>>;
  where?: InputMaybe<Video_Aspect_Ratios_Bool_Exp>;
};


export type Subscription_RootVideo_Aspect_Ratios_By_PkArgs = {
  value: Scalars['numeric'];
};


export type Subscription_RootVideo_Aspect_Ratios_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Video_Aspect_Ratios_Stream_Cursor_Input>>;
  where?: InputMaybe<Video_Aspect_Ratios_Bool_Exp>;
};


export type Subscription_RootVideo_Frame_RatesArgs = {
  distinct_on?: InputMaybe<Array<Video_Frame_Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Video_Frame_Rates_Order_By>>;
  where?: InputMaybe<Video_Frame_Rates_Bool_Exp>;
};


export type Subscription_RootVideo_Frame_Rates_By_PkArgs = {
  value: Scalars['Int'];
};


export type Subscription_RootVideo_Frame_Rates_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Video_Frame_Rates_Stream_Cursor_Input>>;
  where?: InputMaybe<Video_Frame_Rates_Bool_Exp>;
};


export type Subscription_RootWebflow_Artist_InfoArgs = {
  distinct_on?: InputMaybe<Array<Webflow_Artist_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Webflow_Artist_Info_Order_By>>;
  where?: InputMaybe<Webflow_Artist_Info_Bool_Exp>;
};


export type Subscription_RootWebflow_Artist_Info_By_PkArgs = {
  webflow_item_id: Scalars['String'];
};


export type Subscription_RootWebflow_Artist_Info_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Webflow_Artist_Info_Stream_Cursor_Input>>;
  where?: InputMaybe<Webflow_Artist_Info_Bool_Exp>;
};


export type Subscription_RootWebflow_Spectrum_ArticlesArgs = {
  distinct_on?: InputMaybe<Array<Webflow_Spectrum_Articles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Webflow_Spectrum_Articles_Order_By>>;
  where?: InputMaybe<Webflow_Spectrum_Articles_Bool_Exp>;
};


export type Subscription_RootWebflow_Spectrum_Articles_By_PkArgs = {
  webflow_item_id: Scalars['String'];
};


export type Subscription_RootWebflow_Spectrum_Articles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Webflow_Spectrum_Articles_Stream_Cursor_Input>>;
  where?: InputMaybe<Webflow_Spectrum_Articles_Bool_Exp>;
};

export enum Tag_Groupings_Enum {
  Heritage = 'heritage',
  Presentation = 'presentation',
  Social = 'social',
  Unassigned = 'unassigned'
}

/** Boolean expression to compare columns of type "tag_groupings_enum". All fields are combined with logical 'AND'. */
export type Tag_Groupings_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Tag_Groupings_Enum>;
  _in?: InputMaybe<Array<Tag_Groupings_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Tag_Groupings_Enum>;
  _nin?: InputMaybe<Array<Tag_Groupings_Enum>>;
};

export enum Tag_Status_Enum {
  /** private status */
  Private = 'private',
  /** public status */
  Public = 'public'
}

/** Boolean expression to compare columns of type "tag_status_enum". All fields are combined with logical 'AND'. */
export type Tag_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Tag_Status_Enum>;
  _in?: InputMaybe<Array<Tag_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Tag_Status_Enum>;
  _nin?: InputMaybe<Array<Tag_Status_Enum>>;
};

export enum Tag_Types_Enum {
  /** tag type of project */
  Project = 'project',
  /** tag type of user */
  User = 'user'
}

/** Boolean expression to compare columns of type "tag_types_enum". All fields are combined with logical 'AND'. */
export type Tag_Types_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Tag_Types_Enum>;
  _in?: InputMaybe<Array<Tag_Types_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Tag_Types_Enum>;
  _nin?: InputMaybe<Array<Tag_Types_Enum>>;
};

/** columns and relationships of "tags" */
export type Tags = {
  __typename?: 'tags';
  description?: Maybe<Scalars['String']>;
  display_name: Scalars['String'];
  /** An array relationship */
  entity_tags: Array<Entity_Tags>;
  grouping_name: Tag_Groupings_Enum;
  name: Scalars['String'];
  status: Tag_Status_Enum;
  tagline?: Maybe<Scalars['String']>;
  type: Tag_Types_Enum;
};


/** columns and relationships of "tags" */
export type TagsEntity_TagsArgs = {
  distinct_on?: InputMaybe<Array<Entity_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Entity_Tags_Order_By>>;
  where?: InputMaybe<Entity_Tags_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Tags_Bool_Exp>>;
  _not?: InputMaybe<Tags_Bool_Exp>;
  _or?: InputMaybe<Array<Tags_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  entity_tags?: InputMaybe<Entity_Tags_Bool_Exp>;
  grouping_name?: InputMaybe<Tag_Groupings_Enum_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<Tag_Status_Enum_Comparison_Exp>;
  tagline?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Tag_Types_Enum_Comparison_Exp>;
};

/** Ordering options when selecting data from "tags". */
export type Tags_Order_By = {
  description?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  entity_tags_aggregate?: InputMaybe<Entity_Tags_Aggregate_Order_By>;
  grouping_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tagline?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "tags" */
export enum Tags_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  GroupingName = 'grouping_name',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status',
  /** column name */
  Tagline = 'tagline',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "tags" */
export type Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tags_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  grouping_name?: InputMaybe<Tag_Groupings_Enum>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Tag_Status_Enum>;
  tagline?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Tag_Types_Enum>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "tokens_metadata" */
export type Tokens_Metadata = {
  __typename?: 'tokens_metadata';
  /** An object relationship */
  contract?: Maybe<Contracts_Metadata>;
  contract_address: Scalars['String'];
  /** A computed field, executes function "token_favorited_by_user" */
  favorited_by_user?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  favorites: Array<Favorites>;
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate;
  features: Scalars['jsonb'];
  /** An object relationship */
  gif?: Maybe<Media>;
  gif_id?: Maybe<Scalars['Int']>;
  hash: Scalars['String'];
  /** An object relationship */
  high_res_image?: Maybe<Media>;
  high_res_image_id?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  /** An object relationship */
  image?: Maybe<Media>;
  image_id?: Maybe<Scalars['Int']>;
  invocation: Scalars['Int'];
  isFlaggedAsSuspicious?: Maybe<Scalars['Boolean']>;
  list_creation_date?: Maybe<Scalars['timestamptz']>;
  list_currency_address?: Maybe<Scalars['String']>;
  list_currency_symbol?: Maybe<Scalars['String']>;
  list_eth_price?: Maybe<Scalars['float8']>;
  list_expiration_date?: Maybe<Scalars['timestamptz']>;
  list_platform?: Maybe<Scalars['String']>;
  list_price?: Maybe<Scalars['float8']>;
  list_url?: Maybe<Scalars['String']>;
  /** A computed field, executes function "live_view_path" */
  live_view_path?: Maybe<Scalars['String']>;
  /** A computed field, executes function "live_view_url" */
  live_view_url?: Maybe<Scalars['String']>;
  /** An object relationship */
  low_res_image?: Maybe<Media>;
  low_res_image_id?: Maybe<Scalars['Int']>;
  /** a computed field that returns the media proxy url for this token's statically rendered image */
  media_url?: Maybe<Scalars['String']>;
  mint_transaction_hash?: Maybe<Scalars['String']>;
  minted_at: Scalars['timestamptz'];
  /** An object relationship */
  owner?: Maybe<Users>;
  owner_address: Scalars['String'];
  /** returns the preview asset url based on preview_render_type and availability */
  preview_asset_url?: Maybe<Scalars['String']>;
  /** A computed field, executes function "primary_asset_url" */
  primary_asset_url?: Maybe<Scalars['String']>;
  /** An object relationship */
  project: Projects_Metadata;
  project_id: Scalars['String'];
  project_name?: Maybe<Scalars['String']>;
  token_id: Scalars['String'];
  updated_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  video?: Maybe<Media>;
  video_id?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "tokens_metadata" */
export type Tokens_MetadataFavoritesArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


/** columns and relationships of "tokens_metadata" */
export type Tokens_MetadataFavorites_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


/** columns and relationships of "tokens_metadata" */
export type Tokens_MetadataFeaturesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "tokens_metadata" */
export type Tokens_Metadata_Aggregate = {
  __typename?: 'tokens_metadata_aggregate';
  aggregate?: Maybe<Tokens_Metadata_Aggregate_Fields>;
  nodes: Array<Tokens_Metadata>;
};

export type Tokens_Metadata_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Avg>;
  corr?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp_Var_Samp>;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Avg = {
  arguments: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Corr = {
  arguments: Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Max = {
  arguments: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Min = {
  arguments: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Sum = {
  arguments: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Tokens_Metadata_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "tokens_metadata" */
export type Tokens_Metadata_Aggregate_Fields = {
  __typename?: 'tokens_metadata_aggregate_fields';
  avg?: Maybe<Tokens_Metadata_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Tokens_Metadata_Max_Fields>;
  min?: Maybe<Tokens_Metadata_Min_Fields>;
  stddev?: Maybe<Tokens_Metadata_Stddev_Fields>;
  stddev_pop?: Maybe<Tokens_Metadata_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tokens_Metadata_Stddev_Samp_Fields>;
  sum?: Maybe<Tokens_Metadata_Sum_Fields>;
  var_pop?: Maybe<Tokens_Metadata_Var_Pop_Fields>;
  var_samp?: Maybe<Tokens_Metadata_Var_Samp_Fields>;
  variance?: Maybe<Tokens_Metadata_Variance_Fields>;
};


/** aggregate fields of "tokens_metadata" */
export type Tokens_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "tokens_metadata" */
export type Tokens_Metadata_Aggregate_Order_By = {
  avg?: InputMaybe<Tokens_Metadata_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tokens_Metadata_Max_Order_By>;
  min?: InputMaybe<Tokens_Metadata_Min_Order_By>;
  stddev?: InputMaybe<Tokens_Metadata_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tokens_Metadata_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tokens_Metadata_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tokens_Metadata_Sum_Order_By>;
  var_pop?: InputMaybe<Tokens_Metadata_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tokens_Metadata_Var_Samp_Order_By>;
  variance?: InputMaybe<Tokens_Metadata_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Tokens_Metadata_Avg_Fields = {
  __typename?: 'tokens_metadata_avg_fields';
  gif_id?: Maybe<Scalars['Float']>;
  high_res_image_id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  invocation?: Maybe<Scalars['Float']>;
  list_eth_price?: Maybe<Scalars['Float']>;
  list_price?: Maybe<Scalars['Float']>;
  low_res_image_id?: Maybe<Scalars['Float']>;
  video_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Avg_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tokens_metadata". All fields are combined with a logical 'AND'. */
export type Tokens_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Tokens_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Tokens_Metadata_Bool_Exp>>;
  contract?: InputMaybe<Contracts_Metadata_Bool_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  favorited_by_user?: InputMaybe<Boolean_Comparison_Exp>;
  favorites?: InputMaybe<Favorites_Bool_Exp>;
  favorites_aggregate?: InputMaybe<Favorites_Aggregate_Bool_Exp>;
  features?: InputMaybe<Jsonb_Comparison_Exp>;
  gif?: InputMaybe<Media_Bool_Exp>;
  gif_id?: InputMaybe<Int_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  high_res_image?: InputMaybe<Media_Bool_Exp>;
  high_res_image_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  image?: InputMaybe<Media_Bool_Exp>;
  image_id?: InputMaybe<Int_Comparison_Exp>;
  invocation?: InputMaybe<Int_Comparison_Exp>;
  list_creation_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  list_currency_address?: InputMaybe<String_Comparison_Exp>;
  list_currency_symbol?: InputMaybe<String_Comparison_Exp>;
  list_eth_price?: InputMaybe<Float8_Comparison_Exp>;
  list_expiration_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  list_platform?: InputMaybe<String_Comparison_Exp>;
  list_price?: InputMaybe<Float8_Comparison_Exp>;
  list_url?: InputMaybe<String_Comparison_Exp>;
  live_view_path?: InputMaybe<String_Comparison_Exp>;
  live_view_url?: InputMaybe<String_Comparison_Exp>;
  low_res_image?: InputMaybe<Media_Bool_Exp>;
  low_res_image_id?: InputMaybe<Int_Comparison_Exp>;
  media_url?: InputMaybe<String_Comparison_Exp>;
  mint_transaction_hash?: InputMaybe<String_Comparison_Exp>;
  minted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  owner?: InputMaybe<Users_Bool_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  preview_asset_url?: InputMaybe<String_Comparison_Exp>;
  primary_asset_url?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<Projects_Metadata_Bool_Exp>;
  project_id?: InputMaybe<String_Comparison_Exp>;
  project_name?: InputMaybe<String_Comparison_Exp>;
  token_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  video?: InputMaybe<Media_Bool_Exp>;
  video_id?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Tokens_Metadata_Max_Fields = {
  __typename?: 'tokens_metadata_max_fields';
  contract_address?: Maybe<Scalars['String']>;
  gif_id?: Maybe<Scalars['Int']>;
  hash?: Maybe<Scalars['String']>;
  high_res_image_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['Int']>;
  invocation?: Maybe<Scalars['Int']>;
  list_creation_date?: Maybe<Scalars['timestamptz']>;
  list_currency_address?: Maybe<Scalars['String']>;
  list_currency_symbol?: Maybe<Scalars['String']>;
  list_eth_price?: Maybe<Scalars['float8']>;
  list_expiration_date?: Maybe<Scalars['timestamptz']>;
  list_platform?: Maybe<Scalars['String']>;
  list_price?: Maybe<Scalars['float8']>;
  list_url?: Maybe<Scalars['String']>;
  low_res_image_id?: Maybe<Scalars['Int']>;
  mint_transaction_hash?: Maybe<Scalars['String']>;
  minted_at?: Maybe<Scalars['timestamptz']>;
  owner_address?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  project_name?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  video_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Max_Order_By = {
  contract_address?: InputMaybe<Order_By>;
  gif_id?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_creation_date?: InputMaybe<Order_By>;
  list_currency_address?: InputMaybe<Order_By>;
  list_currency_symbol?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_expiration_date?: InputMaybe<Order_By>;
  list_platform?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  list_url?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  mint_transaction_hash?: InputMaybe<Order_By>;
  minted_at?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  project_name?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tokens_Metadata_Min_Fields = {
  __typename?: 'tokens_metadata_min_fields';
  contract_address?: Maybe<Scalars['String']>;
  gif_id?: Maybe<Scalars['Int']>;
  hash?: Maybe<Scalars['String']>;
  high_res_image_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['Int']>;
  invocation?: Maybe<Scalars['Int']>;
  list_creation_date?: Maybe<Scalars['timestamptz']>;
  list_currency_address?: Maybe<Scalars['String']>;
  list_currency_symbol?: Maybe<Scalars['String']>;
  list_eth_price?: Maybe<Scalars['float8']>;
  list_expiration_date?: Maybe<Scalars['timestamptz']>;
  list_platform?: Maybe<Scalars['String']>;
  list_price?: Maybe<Scalars['float8']>;
  list_url?: Maybe<Scalars['String']>;
  low_res_image_id?: Maybe<Scalars['Int']>;
  mint_transaction_hash?: Maybe<Scalars['String']>;
  minted_at?: Maybe<Scalars['timestamptz']>;
  owner_address?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  project_name?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  video_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Min_Order_By = {
  contract_address?: InputMaybe<Order_By>;
  gif_id?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_creation_date?: InputMaybe<Order_By>;
  list_currency_address?: InputMaybe<Order_By>;
  list_currency_symbol?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_expiration_date?: InputMaybe<Order_By>;
  list_platform?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  list_url?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  mint_transaction_hash?: InputMaybe<Order_By>;
  minted_at?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  project_name?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "tokens_metadata". */
export type Tokens_Metadata_Order_By = {
  contract?: InputMaybe<Contracts_Metadata_Order_By>;
  contract_address?: InputMaybe<Order_By>;
  favorited_by_user?: InputMaybe<Order_By>;
  favorites_aggregate?: InputMaybe<Favorites_Aggregate_Order_By>;
  features?: InputMaybe<Order_By>;
  gif?: InputMaybe<Media_Order_By>;
  gif_id?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  high_res_image?: InputMaybe<Media_Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Media_Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_creation_date?: InputMaybe<Order_By>;
  list_currency_address?: InputMaybe<Order_By>;
  list_currency_symbol?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_expiration_date?: InputMaybe<Order_By>;
  list_platform?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  list_url?: InputMaybe<Order_By>;
  live_view_path?: InputMaybe<Order_By>;
  live_view_url?: InputMaybe<Order_By>;
  low_res_image?: InputMaybe<Media_Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  media_url?: InputMaybe<Order_By>;
  mint_transaction_hash?: InputMaybe<Order_By>;
  minted_at?: InputMaybe<Order_By>;
  owner?: InputMaybe<Users_Order_By>;
  owner_address?: InputMaybe<Order_By>;
  preview_asset_url?: InputMaybe<Order_By>;
  primary_asset_url?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Metadata_Order_By>;
  project_id?: InputMaybe<Order_By>;
  project_name?: InputMaybe<Order_By>;
  token_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  video?: InputMaybe<Media_Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** select columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column {
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  Features = 'features',
  /** column name */
  GifId = 'gif_id',
  /** column name */
  Hash = 'hash',
  /** column name */
  HighResImageId = 'high_res_image_id',
  /** column name */
  Id = 'id',
  /** column name */
  ImageId = 'image_id',
  /** column name */
  Invocation = 'invocation',
  /** column name */
  ListCreationDate = 'list_creation_date',
  /** column name */
  ListCurrencyAddress = 'list_currency_address',
  /** column name */
  ListCurrencySymbol = 'list_currency_symbol',
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListExpirationDate = 'list_expiration_date',
  /** column name */
  ListPlatform = 'list_platform',
  /** column name */
  ListPrice = 'list_price',
  /** column name */
  ListUrl = 'list_url',
  /** column name */
  LowResImageId = 'low_res_image_id',
  /** column name */
  MintTransactionHash = 'mint_transaction_hash',
  /** column name */
  MintedAt = 'minted_at',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  ProjectName = 'project_name',
  /** column name */
  TokenId = 'token_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VideoId = 'video_id'
}

/** select "tokens_metadata_aggregate_bool_exp_avg_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** select "tokens_metadata_aggregate_bool_exp_corr_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** select "tokens_metadata_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** select "tokens_metadata_aggregate_bool_exp_max_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** select "tokens_metadata_aggregate_bool_exp_min_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** select "tokens_metadata_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** select "tokens_metadata_aggregate_bool_exp_sum_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** select "tokens_metadata_aggregate_bool_exp_var_samp_arguments_columns" columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  ListEthPrice = 'list_eth_price',
  /** column name */
  ListPrice = 'list_price'
}

/** aggregate stddev on columns */
export type Tokens_Metadata_Stddev_Fields = {
  __typename?: 'tokens_metadata_stddev_fields';
  gif_id?: Maybe<Scalars['Float']>;
  high_res_image_id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  invocation?: Maybe<Scalars['Float']>;
  list_eth_price?: Maybe<Scalars['Float']>;
  list_price?: Maybe<Scalars['Float']>;
  low_res_image_id?: Maybe<Scalars['Float']>;
  video_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Stddev_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tokens_Metadata_Stddev_Pop_Fields = {
  __typename?: 'tokens_metadata_stddev_pop_fields';
  gif_id?: Maybe<Scalars['Float']>;
  high_res_image_id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  invocation?: Maybe<Scalars['Float']>;
  list_eth_price?: Maybe<Scalars['Float']>;
  list_price?: Maybe<Scalars['Float']>;
  low_res_image_id?: Maybe<Scalars['Float']>;
  video_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Stddev_Pop_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tokens_Metadata_Stddev_Samp_Fields = {
  __typename?: 'tokens_metadata_stddev_samp_fields';
  gif_id?: Maybe<Scalars['Float']>;
  high_res_image_id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  invocation?: Maybe<Scalars['Float']>;
  list_eth_price?: Maybe<Scalars['Float']>;
  list_price?: Maybe<Scalars['Float']>;
  low_res_image_id?: Maybe<Scalars['Float']>;
  video_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Stddev_Samp_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "tokens_metadata" */
export type Tokens_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tokens_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tokens_Metadata_Stream_Cursor_Value_Input = {
  contract_address?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Scalars['jsonb']>;
  gif_id?: InputMaybe<Scalars['Int']>;
  hash?: InputMaybe<Scalars['String']>;
  high_res_image_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  image_id?: InputMaybe<Scalars['Int']>;
  invocation?: InputMaybe<Scalars['Int']>;
  list_creation_date?: InputMaybe<Scalars['timestamptz']>;
  list_currency_address?: InputMaybe<Scalars['String']>;
  list_currency_symbol?: InputMaybe<Scalars['String']>;
  list_eth_price?: InputMaybe<Scalars['float8']>;
  list_expiration_date?: InputMaybe<Scalars['timestamptz']>;
  list_platform?: InputMaybe<Scalars['String']>;
  list_price?: InputMaybe<Scalars['float8']>;
  list_url?: InputMaybe<Scalars['String']>;
  low_res_image_id?: InputMaybe<Scalars['Int']>;
  mint_transaction_hash?: InputMaybe<Scalars['String']>;
  minted_at?: InputMaybe<Scalars['timestamptz']>;
  owner_address?: InputMaybe<Scalars['String']>;
  project_id?: InputMaybe<Scalars['String']>;
  project_name?: InputMaybe<Scalars['String']>;
  token_id?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  video_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Tokens_Metadata_Sum_Fields = {
  __typename?: 'tokens_metadata_sum_fields';
  gif_id?: Maybe<Scalars['Int']>;
  high_res_image_id?: Maybe<Scalars['Int']>;
  image_id?: Maybe<Scalars['Int']>;
  invocation?: Maybe<Scalars['Int']>;
  list_eth_price?: Maybe<Scalars['float8']>;
  list_price?: Maybe<Scalars['float8']>;
  low_res_image_id?: Maybe<Scalars['Int']>;
  video_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Sum_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Tokens_Metadata_Var_Pop_Fields = {
  __typename?: 'tokens_metadata_var_pop_fields';
  gif_id?: Maybe<Scalars['Float']>;
  high_res_image_id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  invocation?: Maybe<Scalars['Float']>;
  list_eth_price?: Maybe<Scalars['Float']>;
  list_price?: Maybe<Scalars['Float']>;
  low_res_image_id?: Maybe<Scalars['Float']>;
  video_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Var_Pop_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tokens_Metadata_Var_Samp_Fields = {
  __typename?: 'tokens_metadata_var_samp_fields';
  gif_id?: Maybe<Scalars['Float']>;
  high_res_image_id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  invocation?: Maybe<Scalars['Float']>;
  list_eth_price?: Maybe<Scalars['Float']>;
  list_price?: Maybe<Scalars['Float']>;
  low_res_image_id?: Maybe<Scalars['Float']>;
  video_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Var_Samp_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tokens_Metadata_Variance_Fields = {
  __typename?: 'tokens_metadata_variance_fields';
  gif_id?: Maybe<Scalars['Float']>;
  high_res_image_id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  invocation?: Maybe<Scalars['Float']>;
  list_eth_price?: Maybe<Scalars['Float']>;
  list_price?: Maybe<Scalars['Float']>;
  low_res_image_id?: Maybe<Scalars['Float']>;
  video_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Variance_Order_By = {
  gif_id?: InputMaybe<Order_By>;
  high_res_image_id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  invocation?: InputMaybe<Order_By>;
  list_eth_price?: InputMaybe<Order_By>;
  list_price?: InputMaybe<Order_By>;
  low_res_image_id?: InputMaybe<Order_By>;
  video_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "user_profiles" */
export type User_Profiles = {
  __typename?: 'user_profiles';
  bio?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** An object relationship */
  profile_picture?: Maybe<Media>;
  profile_picture_id?: Maybe<Scalars['Int']>;
  user_address: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type User_Profiles_Aggregate = {
  __typename?: 'user_profiles_aggregate';
  aggregate?: Maybe<User_Profiles_Aggregate_Fields>;
  nodes: Array<User_Profiles>;
};

/** aggregate fields of "user_profiles" */
export type User_Profiles_Aggregate_Fields = {
  __typename?: 'user_profiles_aggregate_fields';
  avg?: Maybe<User_Profiles_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Profiles_Max_Fields>;
  min?: Maybe<User_Profiles_Min_Fields>;
  stddev?: Maybe<User_Profiles_Stddev_Fields>;
  stddev_pop?: Maybe<User_Profiles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Profiles_Stddev_Samp_Fields>;
  sum?: Maybe<User_Profiles_Sum_Fields>;
  var_pop?: Maybe<User_Profiles_Var_Pop_Fields>;
  var_samp?: Maybe<User_Profiles_Var_Samp_Fields>;
  variance?: Maybe<User_Profiles_Variance_Fields>;
};


/** aggregate fields of "user_profiles" */
export type User_Profiles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Profiles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Profiles_Avg_Fields = {
  __typename?: 'user_profiles_avg_fields';
  id?: Maybe<Scalars['Float']>;
  profile_picture_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_profiles". All fields are combined with a logical 'AND'. */
export type User_Profiles_Bool_Exp = {
  _and?: InputMaybe<Array<User_Profiles_Bool_Exp>>;
  _not?: InputMaybe<User_Profiles_Bool_Exp>;
  _or?: InputMaybe<Array<User_Profiles_Bool_Exp>>;
  bio?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  profile_picture?: InputMaybe<Media_Bool_Exp>;
  profile_picture_id?: InputMaybe<Int_Comparison_Exp>;
  user_address?: InputMaybe<String_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type User_Profiles_Max_Fields = {
  __typename?: 'user_profiles_max_fields';
  bio?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  profile_picture_id?: Maybe<Scalars['Int']>;
  user_address?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Profiles_Min_Fields = {
  __typename?: 'user_profiles_min_fields';
  bio?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  profile_picture_id?: Maybe<Scalars['Int']>;
  user_address?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "user_profiles". */
export type User_Profiles_Order_By = {
  bio?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  profile_picture?: InputMaybe<Media_Order_By>;
  profile_picture_id?: InputMaybe<Order_By>;
  user_address?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** select columns of table "user_profiles" */
export enum User_Profiles_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProfilePictureId = 'profile_picture_id',
  /** column name */
  UserAddress = 'user_address',
  /** column name */
  Username = 'username'
}

/** aggregate stddev on columns */
export type User_Profiles_Stddev_Fields = {
  __typename?: 'user_profiles_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  profile_picture_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Profiles_Stddev_Pop_Fields = {
  __typename?: 'user_profiles_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  profile_picture_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Profiles_Stddev_Samp_Fields = {
  __typename?: 'user_profiles_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  profile_picture_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "user_profiles" */
export type User_Profiles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Profiles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Profiles_Stream_Cursor_Value_Input = {
  bio?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  profile_picture_id?: InputMaybe<Scalars['Int']>;
  user_address?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type User_Profiles_Sum_Fields = {
  __typename?: 'user_profiles_sum_fields';
  id?: Maybe<Scalars['Int']>;
  profile_picture_id?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type User_Profiles_Var_Pop_Fields = {
  __typename?: 'user_profiles_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  profile_picture_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Profiles_Var_Samp_Fields = {
  __typename?: 'user_profiles_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  profile_picture_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Profiles_Variance_Fields = {
  __typename?: 'user_profiles_variance_fields';
  id?: Maybe<Scalars['Float']>;
  profile_picture_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  allowlisted_on: Array<Contract_Allowlistings>;
  created_at: Scalars['timestamptz'];
  /** A computed field, executes function "user_display_name" */
  display_name?: Maybe<Scalars['String']>;
  favorited_by_user?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  favorites: Array<Favorites>;
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate;
  /** A computed field, executes function "user_feature_flags" */
  feature_flags?: Maybe<Scalars['jsonb']>;
  is_ab_staff?: Maybe<Scalars['Boolean']>;
  /** A computed field, executes function "user_is_curated" */
  is_curated?: Maybe<Scalars['Boolean']>;
  is_curator?: Maybe<Scalars['Boolean']>;
  /** A computed field, executes function "generate_nonce" */
  nonce?: Maybe<Scalars['String']>;
  /** An object relationship */
  profile?: Maybe<User_Profiles>;
  /** An array relationship */
  projects_created: Array<Projects_Metadata>;
  /** An aggregate relationship */
  projects_created_aggregate: Projects_Metadata_Aggregate;
  public_address: Scalars['String'];
  /** An array relationship */
  receipts: Array<Receipt_Metadata>;
  /** An aggregate relationship */
  receipts_aggregate: Receipt_Metadata_Aggregate;
  /** An array relationship */
  tags: Array<Entity_Tags>;
  /** An array relationship */
  tokens: Array<Tokens_Metadata>;
  /** An aggregate relationship */
  tokens_aggregate: Tokens_Metadata_Aggregate;
  tos_accepted_at?: Maybe<Scalars['timestamptz']>;
  viewed_warning_banner?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  webflow_artist_info?: Maybe<Webflow_Artist_Info>;
};


/** columns and relationships of "users" */
export type UsersAllowlisted_OnArgs = {
  distinct_on?: InputMaybe<Array<Contract_Allowlistings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contract_Allowlistings_Order_By>>;
  where?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFavoritesArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFavorites_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Favorites_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Favorites_Order_By>>;
  where?: InputMaybe<Favorites_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFeature_FlagsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersProjects_CreatedArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProjects_Created_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Metadata_Order_By>>;
  where?: InputMaybe<Projects_Metadata_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersReceiptsArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersReceipts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Receipt_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Receipt_Metadata_Order_By>>;
  where?: InputMaybe<Receipt_Metadata_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTagsArgs = {
  distinct_on?: InputMaybe<Array<Entity_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Entity_Tags_Order_By>>;
  where?: InputMaybe<Entity_Tags_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTokensArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tokens_Metadata_Order_By>>;
  where?: InputMaybe<Tokens_Metadata_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  allowlisted_on?: InputMaybe<Contract_Allowlistings_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  favorited_by_user?: InputMaybe<Boolean_Comparison_Exp>;
  favorites?: InputMaybe<Favorites_Bool_Exp>;
  favorites_aggregate?: InputMaybe<Favorites_Aggregate_Bool_Exp>;
  feature_flags?: InputMaybe<Jsonb_Comparison_Exp>;
  is_ab_staff?: InputMaybe<Boolean_Comparison_Exp>;
  is_curated?: InputMaybe<Boolean_Comparison_Exp>;
  is_curator?: InputMaybe<Boolean_Comparison_Exp>;
  nonce?: InputMaybe<String_Comparison_Exp>;
  profile?: InputMaybe<User_Profiles_Bool_Exp>;
  projects_created?: InputMaybe<Projects_Metadata_Bool_Exp>;
  projects_created_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Bool_Exp>;
  public_address?: InputMaybe<String_Comparison_Exp>;
  receipts?: InputMaybe<Receipt_Metadata_Bool_Exp>;
  receipts_aggregate?: InputMaybe<Receipt_Metadata_Aggregate_Bool_Exp>;
  tags?: InputMaybe<Entity_Tags_Bool_Exp>;
  tokens?: InputMaybe<Tokens_Metadata_Bool_Exp>;
  tokens_aggregate?: InputMaybe<Tokens_Metadata_Aggregate_Bool_Exp>;
  tos_accepted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  viewed_warning_banner?: InputMaybe<Boolean_Comparison_Exp>;
  webflow_artist_info?: InputMaybe<Webflow_Artist_Info_Bool_Exp>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  public_address?: Maybe<Scalars['String']>;
  tos_accepted_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  public_address?: Maybe<Scalars['String']>;
  tos_accepted_at?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  allowlisted_on_aggregate?: InputMaybe<Contract_Allowlistings_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  favorited_by_user?: InputMaybe<Order_By>;
  favorites_aggregate?: InputMaybe<Favorites_Aggregate_Order_By>;
  feature_flags?: InputMaybe<Order_By>;
  is_ab_staff?: InputMaybe<Order_By>;
  is_curated?: InputMaybe<Order_By>;
  is_curator?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  profile?: InputMaybe<User_Profiles_Order_By>;
  projects_created_aggregate?: InputMaybe<Projects_Metadata_Aggregate_Order_By>;
  public_address?: InputMaybe<Order_By>;
  receipts_aggregate?: InputMaybe<Receipt_Metadata_Aggregate_Order_By>;
  tags_aggregate?: InputMaybe<Entity_Tags_Aggregate_Order_By>;
  tokens_aggregate?: InputMaybe<Tokens_Metadata_Aggregate_Order_By>;
  tos_accepted_at?: InputMaybe<Order_By>;
  viewed_warning_banner?: InputMaybe<Order_By>;
  webflow_artist_info?: InputMaybe<Webflow_Artist_Info_Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsAbStaff = 'is_ab_staff',
  /** column name */
  IsCurator = 'is_curator',
  /** column name */
  PublicAddress = 'public_address',
  /** column name */
  TosAcceptedAt = 'tos_accepted_at',
  /** column name */
  ViewedWarningBanner = 'viewed_warning_banner'
}

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_ab_staff?: InputMaybe<Scalars['Boolean']>;
  is_curator?: InputMaybe<Scalars['Boolean']>;
  public_address?: InputMaybe<Scalars['String']>;
  tos_accepted_at?: InputMaybe<Scalars['timestamptz']>;
  viewed_warning_banner?: InputMaybe<Scalars['Boolean']>;
};

/** vertical enums */
export type Verticals = {
  __typename?: 'verticals';
  name: Scalars['String'];
  /** An object relationship */
  project_vertical?: Maybe<Project_Verticals>;
};

/** Boolean expression to filter rows from the table "verticals". All fields are combined with a logical 'AND'. */
export type Verticals_Bool_Exp = {
  _and?: InputMaybe<Array<Verticals_Bool_Exp>>;
  _not?: InputMaybe<Verticals_Bool_Exp>;
  _or?: InputMaybe<Array<Verticals_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
  project_vertical?: InputMaybe<Project_Verticals_Bool_Exp>;
};

export enum Verticals_Enum {
  Artblocksxbrightmoments = 'artblocksxbrightmoments',
  Artblocksxpace = 'artblocksxpace',
  Curated = 'curated',
  Explorations = 'explorations',
  Factory = 'factory',
  Flex = 'flex',
  Fullyonchain = 'fullyonchain',
  Playground = 'playground',
  Presents = 'presents',
  Unassigned = 'unassigned'
}

/** Boolean expression to compare columns of type "verticals_enum". All fields are combined with logical 'AND'. */
export type Verticals_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Verticals_Enum>;
  _in?: InputMaybe<Array<Verticals_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Verticals_Enum>;
  _nin?: InputMaybe<Array<Verticals_Enum>>;
};

/** Ordering options when selecting data from "verticals". */
export type Verticals_Order_By = {
  name?: InputMaybe<Order_By>;
  project_vertical?: InputMaybe<Project_Verticals_Order_By>;
};

/** select columns of table "verticals" */
export enum Verticals_Select_Column {
  /** column name */
  Name = 'name'
}

/** Streaming cursor of the table "verticals" */
export type Verticals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Verticals_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Verticals_Stream_Cursor_Value_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "video_aspect_ratios" */
export type Video_Aspect_Ratios = {
  __typename?: 'video_aspect_ratios';
  label: Scalars['String'];
  value: Scalars['numeric'];
};

/** Boolean expression to filter rows from the table "video_aspect_ratios". All fields are combined with a logical 'AND'. */
export type Video_Aspect_Ratios_Bool_Exp = {
  _and?: InputMaybe<Array<Video_Aspect_Ratios_Bool_Exp>>;
  _not?: InputMaybe<Video_Aspect_Ratios_Bool_Exp>;
  _or?: InputMaybe<Array<Video_Aspect_Ratios_Bool_Exp>>;
  label?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "video_aspect_ratios". */
export type Video_Aspect_Ratios_Order_By = {
  label?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "video_aspect_ratios" */
export enum Video_Aspect_Ratios_Select_Column {
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** Streaming cursor of the table "video_aspect_ratios" */
export type Video_Aspect_Ratios_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Video_Aspect_Ratios_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Video_Aspect_Ratios_Stream_Cursor_Value_Input = {
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['numeric']>;
};

/** columns and relationships of "video_frame_rates" */
export type Video_Frame_Rates = {
  __typename?: 'video_frame_rates';
  value: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "video_frame_rates". All fields are combined with a logical 'AND'. */
export type Video_Frame_Rates_Bool_Exp = {
  _and?: InputMaybe<Array<Video_Frame_Rates_Bool_Exp>>;
  _not?: InputMaybe<Video_Frame_Rates_Bool_Exp>;
  _or?: InputMaybe<Array<Video_Frame_Rates_Bool_Exp>>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "video_frame_rates". */
export type Video_Frame_Rates_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** select columns of table "video_frame_rates" */
export enum Video_Frame_Rates_Select_Column {
  /** column name */
  Value = 'value'
}

/** Streaming cursor of the table "video_frame_rates" */
export type Video_Frame_Rates_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Video_Frame_Rates_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Video_Frame_Rates_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "webflow_artist_info" */
export type Webflow_Artist_Info = {
  __typename?: 'webflow_artist_info';
  published: Scalars['Boolean'];
  raw_data: Scalars['jsonb'];
  slug: Scalars['String'];
  /** An object relationship */
  user: Users;
  user_public_address: Scalars['String'];
  webflow_collection_id: Scalars['String'];
  webflow_item_id: Scalars['String'];
};


/** columns and relationships of "webflow_artist_info" */
export type Webflow_Artist_InfoRaw_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "webflow_artist_info". All fields are combined with a logical 'AND'. */
export type Webflow_Artist_Info_Bool_Exp = {
  _and?: InputMaybe<Array<Webflow_Artist_Info_Bool_Exp>>;
  _not?: InputMaybe<Webflow_Artist_Info_Bool_Exp>;
  _or?: InputMaybe<Array<Webflow_Artist_Info_Bool_Exp>>;
  published?: InputMaybe<Boolean_Comparison_Exp>;
  raw_data?: InputMaybe<Jsonb_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_public_address?: InputMaybe<String_Comparison_Exp>;
  webflow_collection_id?: InputMaybe<String_Comparison_Exp>;
  webflow_item_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "webflow_artist_info". */
export type Webflow_Artist_Info_Order_By = {
  published?: InputMaybe<Order_By>;
  raw_data?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_public_address?: InputMaybe<Order_By>;
  webflow_collection_id?: InputMaybe<Order_By>;
  webflow_item_id?: InputMaybe<Order_By>;
};

/** select columns of table "webflow_artist_info" */
export enum Webflow_Artist_Info_Select_Column {
  /** column name */
  Published = 'published',
  /** column name */
  RawData = 'raw_data',
  /** column name */
  Slug = 'slug',
  /** column name */
  UserPublicAddress = 'user_public_address',
  /** column name */
  WebflowCollectionId = 'webflow_collection_id',
  /** column name */
  WebflowItemId = 'webflow_item_id'
}

/** Streaming cursor of the table "webflow_artist_info" */
export type Webflow_Artist_Info_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Webflow_Artist_Info_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Webflow_Artist_Info_Stream_Cursor_Value_Input = {
  published?: InputMaybe<Scalars['Boolean']>;
  raw_data?: InputMaybe<Scalars['jsonb']>;
  slug?: InputMaybe<Scalars['String']>;
  user_public_address?: InputMaybe<Scalars['String']>;
  webflow_collection_id?: InputMaybe<Scalars['String']>;
  webflow_item_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles = {
  __typename?: 'webflow_spectrum_articles';
  category: Scalars['String'];
  description: Scalars['String'];
  extra_info?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  published_at?: Maybe<Scalars['timestamptz']>;
  raw_data: Scalars['jsonb'];
  section?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  webflow_collection_id: Scalars['String'];
  webflow_item_id: Scalars['String'];
};


/** columns and relationships of "webflow_spectrum_articles" */
export type Webflow_Spectrum_ArticlesRaw_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "webflow_spectrum_articles". All fields are combined with a logical 'AND'. */
export type Webflow_Spectrum_Articles_Bool_Exp = {
  _and?: InputMaybe<Array<Webflow_Spectrum_Articles_Bool_Exp>>;
  _not?: InputMaybe<Webflow_Spectrum_Articles_Bool_Exp>;
  _or?: InputMaybe<Array<Webflow_Spectrum_Articles_Bool_Exp>>;
  category?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  extra_info?: InputMaybe<String_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  published_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  raw_data?: InputMaybe<Jsonb_Comparison_Exp>;
  section?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  webflow_collection_id?: InputMaybe<String_Comparison_Exp>;
  webflow_item_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "webflow_spectrum_articles". */
export type Webflow_Spectrum_Articles_Order_By = {
  category?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  extra_info?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  raw_data?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  webflow_collection_id?: InputMaybe<Order_By>;
  webflow_item_id?: InputMaybe<Order_By>;
};

/** select columns of table "webflow_spectrum_articles" */
export enum Webflow_Spectrum_Articles_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Description = 'description',
  /** column name */
  ExtraInfo = 'extra_info',
  /** column name */
  Image = 'image',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  RawData = 'raw_data',
  /** column name */
  Section = 'section',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title',
  /** column name */
  WebflowCollectionId = 'webflow_collection_id',
  /** column name */
  WebflowItemId = 'webflow_item_id'
}

/** Streaming cursor of the table "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Webflow_Spectrum_Articles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Webflow_Spectrum_Articles_Stream_Cursor_Value_Input = {
  category?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  extra_info?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['timestamptz']>;
  raw_data?: InputMaybe<Scalars['jsonb']>;
  section?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  webflow_collection_id?: InputMaybe<Scalars['String']>;
  webflow_item_id?: InputMaybe<Scalars['String']>;
};

export type ProjectsMetadataDetailsFragment = { __typename?: 'projects_metadata', id: string, start_datetime?: any | null, vertical_name: string, heritage_curation_status?: string | null, vertical: { __typename?: 'project_verticals', category_name: string } };

export type GetAllProjectsHasuraDetailsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetAllProjectsHasuraDetailsQuery = { __typename?: 'query_root', projects_metadata: Array<{ __typename?: 'projects_metadata', id: string, start_datetime?: any | null, vertical_name: string, heritage_curation_status?: string | null, vertical: { __typename?: 'project_verticals', category_name: string } }> };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthMessageOutput: ResolverTypeWrapper<AuthMessageOutput>;
  AuthenticateInput: AuthenticateInput;
  AuthenticateOutput: ResolverTypeWrapper<AuthenticateOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int_comparison_exp: Int_Comparison_Exp;
  OpenseaCollectionData: ResolverTypeWrapper<OpenseaCollectionData>;
  String: ResolverTypeWrapper<Scalars['String']>;
  String_comparison_exp: String_Comparison_Exp;
  artists: ResolverTypeWrapper<Artists>;
  artists_aggregate: ResolverTypeWrapper<Artists_Aggregate>;
  artists_aggregate_fields: ResolverTypeWrapper<Artists_Aggregate_Fields>;
  artists_bool_exp: Artists_Bool_Exp;
  artists_max_fields: ResolverTypeWrapper<Artists_Max_Fields>;
  artists_min_fields: ResolverTypeWrapper<Artists_Min_Fields>;
  artists_order_by: Artists_Order_By;
  artists_select_column: Artists_Select_Column;
  artists_stream_cursor_input: Artists_Stream_Cursor_Input;
  artists_stream_cursor_value_input: Artists_Stream_Cursor_Value_Input;
  bigint: ResolverTypeWrapper<Scalars['bigint']>;
  bigint_comparison_exp: Bigint_Comparison_Exp;
  categories: ResolverTypeWrapper<Categories>;
  categories_bool_exp: Categories_Bool_Exp;
  categories_enum: Categories_Enum;
  categories_enum_comparison_exp: Categories_Enum_Comparison_Exp;
  categories_order_by: Categories_Order_By;
  categories_select_column: Categories_Select_Column;
  categories_stream_cursor_input: Categories_Stream_Cursor_Input;
  categories_stream_cursor_value_input: Categories_Stream_Cursor_Value_Input;
  contract_allowlistings: ResolverTypeWrapper<Contract_Allowlistings>;
  contract_allowlistings_aggregate_order_by: Contract_Allowlistings_Aggregate_Order_By;
  contract_allowlistings_bool_exp: Contract_Allowlistings_Bool_Exp;
  contract_allowlistings_max_order_by: Contract_Allowlistings_Max_Order_By;
  contract_allowlistings_min_order_by: Contract_Allowlistings_Min_Order_By;
  contract_allowlistings_order_by: Contract_Allowlistings_Order_By;
  contract_allowlistings_select_column: Contract_Allowlistings_Select_Column;
  contract_allowlistings_stream_cursor_input: Contract_Allowlistings_Stream_Cursor_Input;
  contract_allowlistings_stream_cursor_value_input: Contract_Allowlistings_Stream_Cursor_Value_Input;
  contract_type_names: ResolverTypeWrapper<Contract_Type_Names>;
  contract_type_names_bool_exp: Contract_Type_Names_Bool_Exp;
  contract_type_names_enum: Contract_Type_Names_Enum;
  contract_type_names_enum_comparison_exp: Contract_Type_Names_Enum_Comparison_Exp;
  contract_type_names_order_by: Contract_Type_Names_Order_By;
  contract_type_names_select_column: Contract_Type_Names_Select_Column;
  contract_type_names_stream_cursor_input: Contract_Type_Names_Stream_Cursor_Input;
  contract_type_names_stream_cursor_value_input: Contract_Type_Names_Stream_Cursor_Value_Input;
  contract_types: ResolverTypeWrapper<Contract_Types>;
  contract_types_bool_exp: Contract_Types_Bool_Exp;
  contract_types_order_by: Contract_Types_Order_By;
  contract_types_select_column: Contract_Types_Select_Column;
  contract_types_stream_cursor_input: Contract_Types_Stream_Cursor_Input;
  contract_types_stream_cursor_value_input: Contract_Types_Stream_Cursor_Value_Input;
  contracts_metadata: ResolverTypeWrapper<Contracts_Metadata>;
  contracts_metadata_aggregate: ResolverTypeWrapper<Contracts_Metadata_Aggregate>;
  contracts_metadata_aggregate_bool_exp: Contracts_Metadata_Aggregate_Bool_Exp;
  contracts_metadata_aggregate_bool_exp_bool_and: Contracts_Metadata_Aggregate_Bool_Exp_Bool_And;
  contracts_metadata_aggregate_bool_exp_bool_or: Contracts_Metadata_Aggregate_Bool_Exp_Bool_Or;
  contracts_metadata_aggregate_bool_exp_count: Contracts_Metadata_Aggregate_Bool_Exp_Count;
  contracts_metadata_aggregate_fields: ResolverTypeWrapper<Contracts_Metadata_Aggregate_Fields>;
  contracts_metadata_aggregate_order_by: Contracts_Metadata_Aggregate_Order_By;
  contracts_metadata_avg_fields: ResolverTypeWrapper<Contracts_Metadata_Avg_Fields>;
  contracts_metadata_avg_order_by: Contracts_Metadata_Avg_Order_By;
  contracts_metadata_bool_exp: Contracts_Metadata_Bool_Exp;
  contracts_metadata_max_fields: ResolverTypeWrapper<Contracts_Metadata_Max_Fields>;
  contracts_metadata_max_order_by: Contracts_Metadata_Max_Order_By;
  contracts_metadata_min_fields: ResolverTypeWrapper<Contracts_Metadata_Min_Fields>;
  contracts_metadata_min_order_by: Contracts_Metadata_Min_Order_By;
  contracts_metadata_order_by: Contracts_Metadata_Order_By;
  contracts_metadata_select_column: Contracts_Metadata_Select_Column;
  contracts_metadata_select_column_contracts_metadata_aggregate_bool_exp_bool_and_arguments_columns: Contracts_Metadata_Select_Column_Contracts_Metadata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  contracts_metadata_select_column_contracts_metadata_aggregate_bool_exp_bool_or_arguments_columns: Contracts_Metadata_Select_Column_Contracts_Metadata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  contracts_metadata_stddev_fields: ResolverTypeWrapper<Contracts_Metadata_Stddev_Fields>;
  contracts_metadata_stddev_order_by: Contracts_Metadata_Stddev_Order_By;
  contracts_metadata_stddev_pop_fields: ResolverTypeWrapper<Contracts_Metadata_Stddev_Pop_Fields>;
  contracts_metadata_stddev_pop_order_by: Contracts_Metadata_Stddev_Pop_Order_By;
  contracts_metadata_stddev_samp_fields: ResolverTypeWrapper<Contracts_Metadata_Stddev_Samp_Fields>;
  contracts_metadata_stddev_samp_order_by: Contracts_Metadata_Stddev_Samp_Order_By;
  contracts_metadata_stream_cursor_input: Contracts_Metadata_Stream_Cursor_Input;
  contracts_metadata_stream_cursor_value_input: Contracts_Metadata_Stream_Cursor_Value_Input;
  contracts_metadata_sum_fields: ResolverTypeWrapper<Contracts_Metadata_Sum_Fields>;
  contracts_metadata_sum_order_by: Contracts_Metadata_Sum_Order_By;
  contracts_metadata_var_pop_fields: ResolverTypeWrapper<Contracts_Metadata_Var_Pop_Fields>;
  contracts_metadata_var_pop_order_by: Contracts_Metadata_Var_Pop_Order_By;
  contracts_metadata_var_samp_fields: ResolverTypeWrapper<Contracts_Metadata_Var_Samp_Fields>;
  contracts_metadata_var_samp_order_by: Contracts_Metadata_Var_Samp_Order_By;
  contracts_metadata_variance_fields: ResolverTypeWrapper<Contracts_Metadata_Variance_Fields>;
  contracts_metadata_variance_order_by: Contracts_Metadata_Variance_Order_By;
  curation_statuses_enum: Curation_Statuses_Enum;
  curation_statuses_enum_comparison_exp: Curation_Statuses_Enum_Comparison_Exp;
  cursor_ordering: Cursor_Ordering;
  dependencies_metadata: ResolverTypeWrapper<Dependencies_Metadata>;
  dependencies_metadata_aggregate: ResolverTypeWrapper<Dependencies_Metadata_Aggregate>;
  dependencies_metadata_aggregate_bool_exp: Dependencies_Metadata_Aggregate_Bool_Exp;
  dependencies_metadata_aggregate_bool_exp_count: Dependencies_Metadata_Aggregate_Bool_Exp_Count;
  dependencies_metadata_aggregate_fields: ResolverTypeWrapper<Dependencies_Metadata_Aggregate_Fields>;
  dependencies_metadata_aggregate_order_by: Dependencies_Metadata_Aggregate_Order_By;
  dependencies_metadata_bool_exp: Dependencies_Metadata_Bool_Exp;
  dependencies_metadata_max_fields: ResolverTypeWrapper<Dependencies_Metadata_Max_Fields>;
  dependencies_metadata_max_order_by: Dependencies_Metadata_Max_Order_By;
  dependencies_metadata_min_fields: ResolverTypeWrapper<Dependencies_Metadata_Min_Fields>;
  dependencies_metadata_min_order_by: Dependencies_Metadata_Min_Order_By;
  dependencies_metadata_order_by: Dependencies_Metadata_Order_By;
  dependencies_metadata_select_column: Dependencies_Metadata_Select_Column;
  dependencies_metadata_stream_cursor_input: Dependencies_Metadata_Stream_Cursor_Input;
  dependencies_metadata_stream_cursor_value_input: Dependencies_Metadata_Stream_Cursor_Value_Input;
  dependency_additional_cdns: ResolverTypeWrapper<Dependency_Additional_Cdns>;
  dependency_additional_cdns_aggregate: ResolverTypeWrapper<Dependency_Additional_Cdns_Aggregate>;
  dependency_additional_cdns_aggregate_bool_exp: Dependency_Additional_Cdns_Aggregate_Bool_Exp;
  dependency_additional_cdns_aggregate_bool_exp_count: Dependency_Additional_Cdns_Aggregate_Bool_Exp_Count;
  dependency_additional_cdns_aggregate_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Aggregate_Fields>;
  dependency_additional_cdns_aggregate_order_by: Dependency_Additional_Cdns_Aggregate_Order_By;
  dependency_additional_cdns_avg_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Avg_Fields>;
  dependency_additional_cdns_avg_order_by: Dependency_Additional_Cdns_Avg_Order_By;
  dependency_additional_cdns_bool_exp: Dependency_Additional_Cdns_Bool_Exp;
  dependency_additional_cdns_max_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Max_Fields>;
  dependency_additional_cdns_max_order_by: Dependency_Additional_Cdns_Max_Order_By;
  dependency_additional_cdns_min_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Min_Fields>;
  dependency_additional_cdns_min_order_by: Dependency_Additional_Cdns_Min_Order_By;
  dependency_additional_cdns_order_by: Dependency_Additional_Cdns_Order_By;
  dependency_additional_cdns_select_column: Dependency_Additional_Cdns_Select_Column;
  dependency_additional_cdns_stddev_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Stddev_Fields>;
  dependency_additional_cdns_stddev_order_by: Dependency_Additional_Cdns_Stddev_Order_By;
  dependency_additional_cdns_stddev_pop_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Stddev_Pop_Fields>;
  dependency_additional_cdns_stddev_pop_order_by: Dependency_Additional_Cdns_Stddev_Pop_Order_By;
  dependency_additional_cdns_stddev_samp_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Stddev_Samp_Fields>;
  dependency_additional_cdns_stddev_samp_order_by: Dependency_Additional_Cdns_Stddev_Samp_Order_By;
  dependency_additional_cdns_stream_cursor_input: Dependency_Additional_Cdns_Stream_Cursor_Input;
  dependency_additional_cdns_stream_cursor_value_input: Dependency_Additional_Cdns_Stream_Cursor_Value_Input;
  dependency_additional_cdns_sum_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Sum_Fields>;
  dependency_additional_cdns_sum_order_by: Dependency_Additional_Cdns_Sum_Order_By;
  dependency_additional_cdns_var_pop_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Var_Pop_Fields>;
  dependency_additional_cdns_var_pop_order_by: Dependency_Additional_Cdns_Var_Pop_Order_By;
  dependency_additional_cdns_var_samp_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Var_Samp_Fields>;
  dependency_additional_cdns_var_samp_order_by: Dependency_Additional_Cdns_Var_Samp_Order_By;
  dependency_additional_cdns_variance_fields: ResolverTypeWrapper<Dependency_Additional_Cdns_Variance_Fields>;
  dependency_additional_cdns_variance_order_by: Dependency_Additional_Cdns_Variance_Order_By;
  dependency_additional_repositories: ResolverTypeWrapper<Dependency_Additional_Repositories>;
  dependency_additional_repositories_aggregate: ResolverTypeWrapper<Dependency_Additional_Repositories_Aggregate>;
  dependency_additional_repositories_aggregate_bool_exp: Dependency_Additional_Repositories_Aggregate_Bool_Exp;
  dependency_additional_repositories_aggregate_bool_exp_count: Dependency_Additional_Repositories_Aggregate_Bool_Exp_Count;
  dependency_additional_repositories_aggregate_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Aggregate_Fields>;
  dependency_additional_repositories_aggregate_order_by: Dependency_Additional_Repositories_Aggregate_Order_By;
  dependency_additional_repositories_avg_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Avg_Fields>;
  dependency_additional_repositories_avg_order_by: Dependency_Additional_Repositories_Avg_Order_By;
  dependency_additional_repositories_bool_exp: Dependency_Additional_Repositories_Bool_Exp;
  dependency_additional_repositories_max_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Max_Fields>;
  dependency_additional_repositories_max_order_by: Dependency_Additional_Repositories_Max_Order_By;
  dependency_additional_repositories_min_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Min_Fields>;
  dependency_additional_repositories_min_order_by: Dependency_Additional_Repositories_Min_Order_By;
  dependency_additional_repositories_order_by: Dependency_Additional_Repositories_Order_By;
  dependency_additional_repositories_select_column: Dependency_Additional_Repositories_Select_Column;
  dependency_additional_repositories_stddev_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Stddev_Fields>;
  dependency_additional_repositories_stddev_order_by: Dependency_Additional_Repositories_Stddev_Order_By;
  dependency_additional_repositories_stddev_pop_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Stddev_Pop_Fields>;
  dependency_additional_repositories_stddev_pop_order_by: Dependency_Additional_Repositories_Stddev_Pop_Order_By;
  dependency_additional_repositories_stddev_samp_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Stddev_Samp_Fields>;
  dependency_additional_repositories_stddev_samp_order_by: Dependency_Additional_Repositories_Stddev_Samp_Order_By;
  dependency_additional_repositories_stream_cursor_input: Dependency_Additional_Repositories_Stream_Cursor_Input;
  dependency_additional_repositories_stream_cursor_value_input: Dependency_Additional_Repositories_Stream_Cursor_Value_Input;
  dependency_additional_repositories_sum_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Sum_Fields>;
  dependency_additional_repositories_sum_order_by: Dependency_Additional_Repositories_Sum_Order_By;
  dependency_additional_repositories_var_pop_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Var_Pop_Fields>;
  dependency_additional_repositories_var_pop_order_by: Dependency_Additional_Repositories_Var_Pop_Order_By;
  dependency_additional_repositories_var_samp_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Var_Samp_Fields>;
  dependency_additional_repositories_var_samp_order_by: Dependency_Additional_Repositories_Var_Samp_Order_By;
  dependency_additional_repositories_variance_fields: ResolverTypeWrapper<Dependency_Additional_Repositories_Variance_Fields>;
  dependency_additional_repositories_variance_order_by: Dependency_Additional_Repositories_Variance_Order_By;
  dependency_registries: ResolverTypeWrapper<Dependency_Registries>;
  dependency_registries_aggregate: ResolverTypeWrapper<Dependency_Registries_Aggregate>;
  dependency_registries_aggregate_fields: ResolverTypeWrapper<Dependency_Registries_Aggregate_Fields>;
  dependency_registries_bool_exp: Dependency_Registries_Bool_Exp;
  dependency_registries_max_fields: ResolverTypeWrapper<Dependency_Registries_Max_Fields>;
  dependency_registries_min_fields: ResolverTypeWrapper<Dependency_Registries_Min_Fields>;
  dependency_registries_order_by: Dependency_Registries_Order_By;
  dependency_registries_select_column: Dependency_Registries_Select_Column;
  dependency_registries_stream_cursor_input: Dependency_Registries_Stream_Cursor_Input;
  dependency_registries_stream_cursor_value_input: Dependency_Registries_Stream_Cursor_Value_Input;
  dependency_scripts: ResolverTypeWrapper<Dependency_Scripts>;
  dependency_scripts_aggregate: ResolverTypeWrapper<Dependency_Scripts_Aggregate>;
  dependency_scripts_aggregate_bool_exp: Dependency_Scripts_Aggregate_Bool_Exp;
  dependency_scripts_aggregate_bool_exp_count: Dependency_Scripts_Aggregate_Bool_Exp_Count;
  dependency_scripts_aggregate_fields: ResolverTypeWrapper<Dependency_Scripts_Aggregate_Fields>;
  dependency_scripts_aggregate_order_by: Dependency_Scripts_Aggregate_Order_By;
  dependency_scripts_avg_fields: ResolverTypeWrapper<Dependency_Scripts_Avg_Fields>;
  dependency_scripts_avg_order_by: Dependency_Scripts_Avg_Order_By;
  dependency_scripts_bool_exp: Dependency_Scripts_Bool_Exp;
  dependency_scripts_max_fields: ResolverTypeWrapper<Dependency_Scripts_Max_Fields>;
  dependency_scripts_max_order_by: Dependency_Scripts_Max_Order_By;
  dependency_scripts_min_fields: ResolverTypeWrapper<Dependency_Scripts_Min_Fields>;
  dependency_scripts_min_order_by: Dependency_Scripts_Min_Order_By;
  dependency_scripts_order_by: Dependency_Scripts_Order_By;
  dependency_scripts_select_column: Dependency_Scripts_Select_Column;
  dependency_scripts_stddev_fields: ResolverTypeWrapper<Dependency_Scripts_Stddev_Fields>;
  dependency_scripts_stddev_order_by: Dependency_Scripts_Stddev_Order_By;
  dependency_scripts_stddev_pop_fields: ResolverTypeWrapper<Dependency_Scripts_Stddev_Pop_Fields>;
  dependency_scripts_stddev_pop_order_by: Dependency_Scripts_Stddev_Pop_Order_By;
  dependency_scripts_stddev_samp_fields: ResolverTypeWrapper<Dependency_Scripts_Stddev_Samp_Fields>;
  dependency_scripts_stddev_samp_order_by: Dependency_Scripts_Stddev_Samp_Order_By;
  dependency_scripts_stream_cursor_input: Dependency_Scripts_Stream_Cursor_Input;
  dependency_scripts_stream_cursor_value_input: Dependency_Scripts_Stream_Cursor_Value_Input;
  dependency_scripts_sum_fields: ResolverTypeWrapper<Dependency_Scripts_Sum_Fields>;
  dependency_scripts_sum_order_by: Dependency_Scripts_Sum_Order_By;
  dependency_scripts_var_pop_fields: ResolverTypeWrapper<Dependency_Scripts_Var_Pop_Fields>;
  dependency_scripts_var_pop_order_by: Dependency_Scripts_Var_Pop_Order_By;
  dependency_scripts_var_samp_fields: ResolverTypeWrapper<Dependency_Scripts_Var_Samp_Fields>;
  dependency_scripts_var_samp_order_by: Dependency_Scripts_Var_Samp_Order_By;
  dependency_scripts_variance_fields: ResolverTypeWrapper<Dependency_Scripts_Variance_Fields>;
  dependency_scripts_variance_order_by: Dependency_Scripts_Variance_Order_By;
  entity_tags: ResolverTypeWrapper<Entity_Tags>;
  entity_tags_aggregate_order_by: Entity_Tags_Aggregate_Order_By;
  entity_tags_avg_order_by: Entity_Tags_Avg_Order_By;
  entity_tags_bool_exp: Entity_Tags_Bool_Exp;
  entity_tags_max_order_by: Entity_Tags_Max_Order_By;
  entity_tags_min_order_by: Entity_Tags_Min_Order_By;
  entity_tags_order_by: Entity_Tags_Order_By;
  entity_tags_select_column: Entity_Tags_Select_Column;
  entity_tags_stddev_order_by: Entity_Tags_Stddev_Order_By;
  entity_tags_stddev_pop_order_by: Entity_Tags_Stddev_Pop_Order_By;
  entity_tags_stddev_samp_order_by: Entity_Tags_Stddev_Samp_Order_By;
  entity_tags_stream_cursor_input: Entity_Tags_Stream_Cursor_Input;
  entity_tags_stream_cursor_value_input: Entity_Tags_Stream_Cursor_Value_Input;
  entity_tags_sum_order_by: Entity_Tags_Sum_Order_By;
  entity_tags_var_pop_order_by: Entity_Tags_Var_Pop_Order_By;
  entity_tags_var_samp_order_by: Entity_Tags_Var_Samp_Order_By;
  entity_tags_variance_order_by: Entity_Tags_Variance_Order_By;
  favorites: ResolverTypeWrapper<Favorites>;
  favorites_aggregate: ResolverTypeWrapper<Favorites_Aggregate>;
  favorites_aggregate_bool_exp: Favorites_Aggregate_Bool_Exp;
  favorites_aggregate_bool_exp_count: Favorites_Aggregate_Bool_Exp_Count;
  favorites_aggregate_fields: ResolverTypeWrapper<Favorites_Aggregate_Fields>;
  favorites_aggregate_order_by: Favorites_Aggregate_Order_By;
  favorites_avg_fields: ResolverTypeWrapper<Favorites_Avg_Fields>;
  favorites_avg_order_by: Favorites_Avg_Order_By;
  favorites_bool_exp: Favorites_Bool_Exp;
  favorites_max_fields: ResolverTypeWrapper<Favorites_Max_Fields>;
  favorites_max_order_by: Favorites_Max_Order_By;
  favorites_min_fields: ResolverTypeWrapper<Favorites_Min_Fields>;
  favorites_min_order_by: Favorites_Min_Order_By;
  favorites_order_by: Favorites_Order_By;
  favorites_select_column: Favorites_Select_Column;
  favorites_stddev_fields: ResolverTypeWrapper<Favorites_Stddev_Fields>;
  favorites_stddev_order_by: Favorites_Stddev_Order_By;
  favorites_stddev_pop_fields: ResolverTypeWrapper<Favorites_Stddev_Pop_Fields>;
  favorites_stddev_pop_order_by: Favorites_Stddev_Pop_Order_By;
  favorites_stddev_samp_fields: ResolverTypeWrapper<Favorites_Stddev_Samp_Fields>;
  favorites_stddev_samp_order_by: Favorites_Stddev_Samp_Order_By;
  favorites_stream_cursor_input: Favorites_Stream_Cursor_Input;
  favorites_stream_cursor_value_input: Favorites_Stream_Cursor_Value_Input;
  favorites_sum_fields: ResolverTypeWrapper<Favorites_Sum_Fields>;
  favorites_sum_order_by: Favorites_Sum_Order_By;
  favorites_var_pop_fields: ResolverTypeWrapper<Favorites_Var_Pop_Fields>;
  favorites_var_pop_order_by: Favorites_Var_Pop_Order_By;
  favorites_var_samp_fields: ResolverTypeWrapper<Favorites_Var_Samp_Fields>;
  favorites_var_samp_order_by: Favorites_Var_Samp_Order_By;
  favorites_variance_fields: ResolverTypeWrapper<Favorites_Variance_Fields>;
  favorites_variance_order_by: Favorites_Variance_Order_By;
  feature_flags: ResolverTypeWrapper<Feature_Flags>;
  feature_flags_bool_exp: Feature_Flags_Bool_Exp;
  feature_flags_order_by: Feature_Flags_Order_By;
  feature_flags_select_column: Feature_Flags_Select_Column;
  feature_flags_stream_cursor_input: Feature_Flags_Stream_Cursor_Input;
  feature_flags_stream_cursor_value_input: Feature_Flags_Stream_Cursor_Value_Input;
  featured_token_projects_metadata_args: Featured_Token_Projects_Metadata_Args;
  filter_tokens_metadata_by_features_args: Filter_Tokens_Metadata_By_Features_Args;
  float8: ResolverTypeWrapper<Scalars['float8']>;
  float8_comparison_exp: Float8_Comparison_Exp;
  jsonb: ResolverTypeWrapper<Scalars['jsonb']>;
  jsonb_cast_exp: Jsonb_Cast_Exp;
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  jsonpath: ResolverTypeWrapper<Scalars['jsonpath']>;
  list_projects_metadata_random_args: List_Projects_Metadata_Random_Args;
  media: ResolverTypeWrapper<Media>;
  media_bool_exp: Media_Bool_Exp;
  media_order_by: Media_Order_By;
  media_select_column: Media_Select_Column;
  media_stream_cursor_input: Media_Stream_Cursor_Input;
  media_stream_cursor_value_input: Media_Stream_Cursor_Value_Input;
  minter_filters_metadata: ResolverTypeWrapper<Minter_Filters_Metadata>;
  minter_filters_metadata_bool_exp: Minter_Filters_Metadata_Bool_Exp;
  minter_filters_metadata_order_by: Minter_Filters_Metadata_Order_By;
  minter_filters_metadata_select_column: Minter_Filters_Metadata_Select_Column;
  minter_filters_metadata_stream_cursor_input: Minter_Filters_Metadata_Stream_Cursor_Input;
  minter_filters_metadata_stream_cursor_value_input: Minter_Filters_Metadata_Stream_Cursor_Value_Input;
  minter_type_names_enum: Minter_Type_Names_Enum;
  minter_type_names_enum_comparison_exp: Minter_Type_Names_Enum_Comparison_Exp;
  minter_types: ResolverTypeWrapper<Minter_Types>;
  minter_types_bool_exp: Minter_Types_Bool_Exp;
  minter_types_order_by: Minter_Types_Order_By;
  minter_types_select_column: Minter_Types_Select_Column;
  minter_types_stream_cursor_input: Minter_Types_Stream_Cursor_Input;
  minter_types_stream_cursor_value_input: Minter_Types_Stream_Cursor_Value_Input;
  minters_metadata: ResolverTypeWrapper<Minters_Metadata>;
  minters_metadata_aggregate_order_by: Minters_Metadata_Aggregate_Order_By;
  minters_metadata_avg_order_by: Minters_Metadata_Avg_Order_By;
  minters_metadata_bool_exp: Minters_Metadata_Bool_Exp;
  minters_metadata_max_order_by: Minters_Metadata_Max_Order_By;
  minters_metadata_min_order_by: Minters_Metadata_Min_Order_By;
  minters_metadata_order_by: Minters_Metadata_Order_By;
  minters_metadata_select_column: Minters_Metadata_Select_Column;
  minters_metadata_stddev_order_by: Minters_Metadata_Stddev_Order_By;
  minters_metadata_stddev_pop_order_by: Minters_Metadata_Stddev_Pop_Order_By;
  minters_metadata_stddev_samp_order_by: Minters_Metadata_Stddev_Samp_Order_By;
  minters_metadata_stream_cursor_input: Minters_Metadata_Stream_Cursor_Input;
  minters_metadata_stream_cursor_value_input: Minters_Metadata_Stream_Cursor_Value_Input;
  minters_metadata_sum_order_by: Minters_Metadata_Sum_Order_By;
  minters_metadata_var_pop_order_by: Minters_Metadata_Var_Pop_Order_By;
  minters_metadata_var_samp_order_by: Minters_Metadata_Var_Samp_Order_By;
  minters_metadata_variance_order_by: Minters_Metadata_Variance_Order_By;
  mutation_root: ResolverTypeWrapper<{}>;
  numeric: ResolverTypeWrapper<Scalars['numeric']>;
  numeric_comparison_exp: Numeric_Comparison_Exp;
  order_by: Order_By;
  project_external_asset_dependencies: ResolverTypeWrapper<Project_External_Asset_Dependencies>;
  project_external_asset_dependencies_aggregate_order_by: Project_External_Asset_Dependencies_Aggregate_Order_By;
  project_external_asset_dependencies_avg_order_by: Project_External_Asset_Dependencies_Avg_Order_By;
  project_external_asset_dependencies_bool_exp: Project_External_Asset_Dependencies_Bool_Exp;
  project_external_asset_dependencies_max_order_by: Project_External_Asset_Dependencies_Max_Order_By;
  project_external_asset_dependencies_min_order_by: Project_External_Asset_Dependencies_Min_Order_By;
  project_external_asset_dependencies_order_by: Project_External_Asset_Dependencies_Order_By;
  project_external_asset_dependencies_select_column: Project_External_Asset_Dependencies_Select_Column;
  project_external_asset_dependencies_stddev_order_by: Project_External_Asset_Dependencies_Stddev_Order_By;
  project_external_asset_dependencies_stddev_pop_order_by: Project_External_Asset_Dependencies_Stddev_Pop_Order_By;
  project_external_asset_dependencies_stddev_samp_order_by: Project_External_Asset_Dependencies_Stddev_Samp_Order_By;
  project_external_asset_dependencies_stream_cursor_input: Project_External_Asset_Dependencies_Stream_Cursor_Input;
  project_external_asset_dependencies_stream_cursor_value_input: Project_External_Asset_Dependencies_Stream_Cursor_Value_Input;
  project_external_asset_dependencies_sum_order_by: Project_External_Asset_Dependencies_Sum_Order_By;
  project_external_asset_dependencies_var_pop_order_by: Project_External_Asset_Dependencies_Var_Pop_Order_By;
  project_external_asset_dependencies_var_samp_order_by: Project_External_Asset_Dependencies_Var_Samp_Order_By;
  project_external_asset_dependencies_variance_order_by: Project_External_Asset_Dependencies_Variance_Order_By;
  project_external_asset_dependency_types_enum: Project_External_Asset_Dependency_Types_Enum;
  project_external_asset_dependency_types_enum_comparison_exp: Project_External_Asset_Dependency_Types_Enum_Comparison_Exp;
  project_minter_configurations: ResolverTypeWrapper<Project_Minter_Configurations>;
  project_minter_configurations_bool_exp: Project_Minter_Configurations_Bool_Exp;
  project_minter_configurations_order_by: Project_Minter_Configurations_Order_By;
  project_minter_configurations_select_column: Project_Minter_Configurations_Select_Column;
  project_minter_configurations_stream_cursor_input: Project_Minter_Configurations_Stream_Cursor_Input;
  project_minter_configurations_stream_cursor_value_input: Project_Minter_Configurations_Stream_Cursor_Value_Input;
  project_scripts: ResolverTypeWrapper<Project_Scripts>;
  project_scripts_aggregate_order_by: Project_Scripts_Aggregate_Order_By;
  project_scripts_avg_order_by: Project_Scripts_Avg_Order_By;
  project_scripts_bool_exp: Project_Scripts_Bool_Exp;
  project_scripts_max_order_by: Project_Scripts_Max_Order_By;
  project_scripts_min_order_by: Project_Scripts_Min_Order_By;
  project_scripts_order_by: Project_Scripts_Order_By;
  project_scripts_select_column: Project_Scripts_Select_Column;
  project_scripts_stddev_order_by: Project_Scripts_Stddev_Order_By;
  project_scripts_stddev_pop_order_by: Project_Scripts_Stddev_Pop_Order_By;
  project_scripts_stddev_samp_order_by: Project_Scripts_Stddev_Samp_Order_By;
  project_scripts_stream_cursor_input: Project_Scripts_Stream_Cursor_Input;
  project_scripts_stream_cursor_value_input: Project_Scripts_Stream_Cursor_Value_Input;
  project_scripts_sum_order_by: Project_Scripts_Sum_Order_By;
  project_scripts_var_pop_order_by: Project_Scripts_Var_Pop_Order_By;
  project_scripts_var_samp_order_by: Project_Scripts_Var_Samp_Order_By;
  project_scripts_variance_order_by: Project_Scripts_Variance_Order_By;
  project_series: ResolverTypeWrapper<Project_Series>;
  project_series_aggregate: ResolverTypeWrapper<Project_Series_Aggregate>;
  project_series_aggregate_fields: ResolverTypeWrapper<Project_Series_Aggregate_Fields>;
  project_series_avg_fields: ResolverTypeWrapper<Project_Series_Avg_Fields>;
  project_series_bool_exp: Project_Series_Bool_Exp;
  project_series_max_fields: ResolverTypeWrapper<Project_Series_Max_Fields>;
  project_series_min_fields: ResolverTypeWrapper<Project_Series_Min_Fields>;
  project_series_order_by: Project_Series_Order_By;
  project_series_select_column: Project_Series_Select_Column;
  project_series_stddev_fields: ResolverTypeWrapper<Project_Series_Stddev_Fields>;
  project_series_stddev_pop_fields: ResolverTypeWrapper<Project_Series_Stddev_Pop_Fields>;
  project_series_stddev_samp_fields: ResolverTypeWrapper<Project_Series_Stddev_Samp_Fields>;
  project_series_stream_cursor_input: Project_Series_Stream_Cursor_Input;
  project_series_stream_cursor_value_input: Project_Series_Stream_Cursor_Value_Input;
  project_series_sum_fields: ResolverTypeWrapper<Project_Series_Sum_Fields>;
  project_series_var_pop_fields: ResolverTypeWrapper<Project_Series_Var_Pop_Fields>;
  project_series_var_samp_fields: ResolverTypeWrapper<Project_Series_Var_Samp_Fields>;
  project_series_variance_fields: ResolverTypeWrapper<Project_Series_Variance_Fields>;
  project_vertical_categories: ResolverTypeWrapper<Project_Vertical_Categories>;
  project_vertical_categories_bool_exp: Project_Vertical_Categories_Bool_Exp;
  project_vertical_categories_order_by: Project_Vertical_Categories_Order_By;
  project_vertical_categories_select_column: Project_Vertical_Categories_Select_Column;
  project_vertical_categories_stream_cursor_input: Project_Vertical_Categories_Stream_Cursor_Input;
  project_vertical_categories_stream_cursor_value_input: Project_Vertical_Categories_Stream_Cursor_Value_Input;
  project_verticals: ResolverTypeWrapper<Project_Verticals>;
  project_verticals_aggregate_order_by: Project_Verticals_Aggregate_Order_By;
  project_verticals_bool_exp: Project_Verticals_Bool_Exp;
  project_verticals_max_order_by: Project_Verticals_Max_Order_By;
  project_verticals_min_order_by: Project_Verticals_Min_Order_By;
  project_verticals_order_by: Project_Verticals_Order_By;
  project_verticals_select_column: Project_Verticals_Select_Column;
  project_verticals_stream_cursor_input: Project_Verticals_Stream_Cursor_Input;
  project_verticals_stream_cursor_value_input: Project_Verticals_Stream_Cursor_Value_Input;
  projects_features: ResolverTypeWrapper<Projects_Features>;
  projects_features_bool_exp: Projects_Features_Bool_Exp;
  projects_features_order_by: Projects_Features_Order_By;
  projects_features_select_column: Projects_Features_Select_Column;
  projects_features_stream_cursor_input: Projects_Features_Stream_Cursor_Input;
  projects_features_stream_cursor_value_input: Projects_Features_Stream_Cursor_Value_Input;
  projects_metadata: ResolverTypeWrapper<Projects_Metadata>;
  projects_metadata_aggregate: ResolverTypeWrapper<Projects_Metadata_Aggregate>;
  projects_metadata_aggregate_bool_exp: Projects_Metadata_Aggregate_Bool_Exp;
  projects_metadata_aggregate_bool_exp_bool_and: Projects_Metadata_Aggregate_Bool_Exp_Bool_And;
  projects_metadata_aggregate_bool_exp_bool_or: Projects_Metadata_Aggregate_Bool_Exp_Bool_Or;
  projects_metadata_aggregate_bool_exp_count: Projects_Metadata_Aggregate_Bool_Exp_Count;
  projects_metadata_aggregate_fields: ResolverTypeWrapper<Projects_Metadata_Aggregate_Fields>;
  projects_metadata_aggregate_order_by: Projects_Metadata_Aggregate_Order_By;
  projects_metadata_avg_fields: ResolverTypeWrapper<Projects_Metadata_Avg_Fields>;
  projects_metadata_avg_order_by: Projects_Metadata_Avg_Order_By;
  projects_metadata_bool_exp: Projects_Metadata_Bool_Exp;
  projects_metadata_max_fields: ResolverTypeWrapper<Projects_Metadata_Max_Fields>;
  projects_metadata_max_order_by: Projects_Metadata_Max_Order_By;
  projects_metadata_min_fields: ResolverTypeWrapper<Projects_Metadata_Min_Fields>;
  projects_metadata_min_order_by: Projects_Metadata_Min_Order_By;
  projects_metadata_order_by: Projects_Metadata_Order_By;
  projects_metadata_select_column: Projects_Metadata_Select_Column;
  projects_metadata_select_column_projects_metadata_aggregate_bool_exp_bool_and_arguments_columns: Projects_Metadata_Select_Column_Projects_Metadata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  projects_metadata_select_column_projects_metadata_aggregate_bool_exp_bool_or_arguments_columns: Projects_Metadata_Select_Column_Projects_Metadata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  projects_metadata_stddev_fields: ResolverTypeWrapper<Projects_Metadata_Stddev_Fields>;
  projects_metadata_stddev_order_by: Projects_Metadata_Stddev_Order_By;
  projects_metadata_stddev_pop_fields: ResolverTypeWrapper<Projects_Metadata_Stddev_Pop_Fields>;
  projects_metadata_stddev_pop_order_by: Projects_Metadata_Stddev_Pop_Order_By;
  projects_metadata_stddev_samp_fields: ResolverTypeWrapper<Projects_Metadata_Stddev_Samp_Fields>;
  projects_metadata_stddev_samp_order_by: Projects_Metadata_Stddev_Samp_Order_By;
  projects_metadata_stream_cursor_input: Projects_Metadata_Stream_Cursor_Input;
  projects_metadata_stream_cursor_value_input: Projects_Metadata_Stream_Cursor_Value_Input;
  projects_metadata_sum_fields: ResolverTypeWrapper<Projects_Metadata_Sum_Fields>;
  projects_metadata_sum_order_by: Projects_Metadata_Sum_Order_By;
  projects_metadata_var_pop_fields: ResolverTypeWrapper<Projects_Metadata_Var_Pop_Fields>;
  projects_metadata_var_pop_order_by: Projects_Metadata_Var_Pop_Order_By;
  projects_metadata_var_samp_fields: ResolverTypeWrapper<Projects_Metadata_Var_Samp_Fields>;
  projects_metadata_var_samp_order_by: Projects_Metadata_Var_Samp_Order_By;
  projects_metadata_variance_fields: ResolverTypeWrapper<Projects_Metadata_Variance_Fields>;
  projects_metadata_variance_order_by: Projects_Metadata_Variance_Order_By;
  proposed_artist_addresses_and_splits: ResolverTypeWrapper<Proposed_Artist_Addresses_And_Splits>;
  proposed_artist_addresses_and_splits_bool_exp: Proposed_Artist_Addresses_And_Splits_Bool_Exp;
  proposed_artist_addresses_and_splits_order_by: Proposed_Artist_Addresses_And_Splits_Order_By;
  proposed_artist_addresses_and_splits_select_column: Proposed_Artist_Addresses_And_Splits_Select_Column;
  proposed_artist_addresses_and_splits_stream_cursor_input: Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Input;
  proposed_artist_addresses_and_splits_stream_cursor_value_input: Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Value_Input;
  query_root: ResolverTypeWrapper<{}>;
  receipt_metadata: ResolverTypeWrapper<Receipt_Metadata>;
  receipt_metadata_aggregate: ResolverTypeWrapper<Receipt_Metadata_Aggregate>;
  receipt_metadata_aggregate_bool_exp: Receipt_Metadata_Aggregate_Bool_Exp;
  receipt_metadata_aggregate_bool_exp_count: Receipt_Metadata_Aggregate_Bool_Exp_Count;
  receipt_metadata_aggregate_fields: ResolverTypeWrapper<Receipt_Metadata_Aggregate_Fields>;
  receipt_metadata_aggregate_order_by: Receipt_Metadata_Aggregate_Order_By;
  receipt_metadata_bool_exp: Receipt_Metadata_Bool_Exp;
  receipt_metadata_max_fields: ResolverTypeWrapper<Receipt_Metadata_Max_Fields>;
  receipt_metadata_max_order_by: Receipt_Metadata_Max_Order_By;
  receipt_metadata_min_fields: ResolverTypeWrapper<Receipt_Metadata_Min_Fields>;
  receipt_metadata_min_order_by: Receipt_Metadata_Min_Order_By;
  receipt_metadata_order_by: Receipt_Metadata_Order_By;
  receipt_metadata_select_column: Receipt_Metadata_Select_Column;
  receipt_metadata_stream_cursor_input: Receipt_Metadata_Stream_Cursor_Input;
  receipt_metadata_stream_cursor_value_input: Receipt_Metadata_Stream_Cursor_Value_Input;
  render_types: ResolverTypeWrapper<Render_Types>;
  render_types_bool_exp: Render_Types_Bool_Exp;
  render_types_enum: Render_Types_Enum;
  render_types_enum_comparison_exp: Render_Types_Enum_Comparison_Exp;
  render_types_order_by: Render_Types_Order_By;
  render_types_select_column: Render_Types_Select_Column;
  render_types_stream_cursor_input: Render_Types_Stream_Cursor_Input;
  render_types_stream_cursor_value_input: Render_Types_Stream_Cursor_Value_Input;
  search_projects_args: Search_Projects_Args;
  search_tags_args: Search_Tags_Args;
  search_tokens_args: Search_Tokens_Args;
  search_users_args: Search_Users_Args;
  seed_float: ResolverTypeWrapper<Scalars['seed_float']>;
  subscription_root: ResolverTypeWrapper<{}>;
  tag_groupings_enum: Tag_Groupings_Enum;
  tag_groupings_enum_comparison_exp: Tag_Groupings_Enum_Comparison_Exp;
  tag_status_enum: Tag_Status_Enum;
  tag_status_enum_comparison_exp: Tag_Status_Enum_Comparison_Exp;
  tag_types_enum: Tag_Types_Enum;
  tag_types_enum_comparison_exp: Tag_Types_Enum_Comparison_Exp;
  tags: ResolverTypeWrapper<Tags>;
  tags_bool_exp: Tags_Bool_Exp;
  tags_order_by: Tags_Order_By;
  tags_select_column: Tags_Select_Column;
  tags_stream_cursor_input: Tags_Stream_Cursor_Input;
  tags_stream_cursor_value_input: Tags_Stream_Cursor_Value_Input;
  timestamp: ResolverTypeWrapper<Scalars['timestamp']>;
  timestamp_comparison_exp: Timestamp_Comparison_Exp;
  timestamptz: ResolverTypeWrapper<Scalars['timestamptz']>;
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  tokens_metadata: ResolverTypeWrapper<Tokens_Metadata>;
  tokens_metadata_aggregate: ResolverTypeWrapper<Tokens_Metadata_Aggregate>;
  tokens_metadata_aggregate_bool_exp: Tokens_Metadata_Aggregate_Bool_Exp;
  tokens_metadata_aggregate_bool_exp_avg: Tokens_Metadata_Aggregate_Bool_Exp_Avg;
  tokens_metadata_aggregate_bool_exp_corr: Tokens_Metadata_Aggregate_Bool_Exp_Corr;
  tokens_metadata_aggregate_bool_exp_corr_arguments: Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments;
  tokens_metadata_aggregate_bool_exp_count: Tokens_Metadata_Aggregate_Bool_Exp_Count;
  tokens_metadata_aggregate_bool_exp_covar_samp: Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp;
  tokens_metadata_aggregate_bool_exp_covar_samp_arguments: Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  tokens_metadata_aggregate_bool_exp_max: Tokens_Metadata_Aggregate_Bool_Exp_Max;
  tokens_metadata_aggregate_bool_exp_min: Tokens_Metadata_Aggregate_Bool_Exp_Min;
  tokens_metadata_aggregate_bool_exp_stddev_samp: Tokens_Metadata_Aggregate_Bool_Exp_Stddev_Samp;
  tokens_metadata_aggregate_bool_exp_sum: Tokens_Metadata_Aggregate_Bool_Exp_Sum;
  tokens_metadata_aggregate_bool_exp_var_samp: Tokens_Metadata_Aggregate_Bool_Exp_Var_Samp;
  tokens_metadata_aggregate_fields: ResolverTypeWrapper<Tokens_Metadata_Aggregate_Fields>;
  tokens_metadata_aggregate_order_by: Tokens_Metadata_Aggregate_Order_By;
  tokens_metadata_avg_fields: ResolverTypeWrapper<Tokens_Metadata_Avg_Fields>;
  tokens_metadata_avg_order_by: Tokens_Metadata_Avg_Order_By;
  tokens_metadata_bool_exp: Tokens_Metadata_Bool_Exp;
  tokens_metadata_max_fields: ResolverTypeWrapper<Tokens_Metadata_Max_Fields>;
  tokens_metadata_max_order_by: Tokens_Metadata_Max_Order_By;
  tokens_metadata_min_fields: ResolverTypeWrapper<Tokens_Metadata_Min_Fields>;
  tokens_metadata_min_order_by: Tokens_Metadata_Min_Order_By;
  tokens_metadata_order_by: Tokens_Metadata_Order_By;
  tokens_metadata_select_column: Tokens_Metadata_Select_Column;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_avg_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_corr_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_covar_samp_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_max_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Max_Arguments_Columns;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_min_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Min_Arguments_Columns;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_stddev_samp_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_sum_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  tokens_metadata_select_column_tokens_metadata_aggregate_bool_exp_var_samp_arguments_columns: Tokens_Metadata_Select_Column_Tokens_Metadata_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  tokens_metadata_stddev_fields: ResolverTypeWrapper<Tokens_Metadata_Stddev_Fields>;
  tokens_metadata_stddev_order_by: Tokens_Metadata_Stddev_Order_By;
  tokens_metadata_stddev_pop_fields: ResolverTypeWrapper<Tokens_Metadata_Stddev_Pop_Fields>;
  tokens_metadata_stddev_pop_order_by: Tokens_Metadata_Stddev_Pop_Order_By;
  tokens_metadata_stddev_samp_fields: ResolverTypeWrapper<Tokens_Metadata_Stddev_Samp_Fields>;
  tokens_metadata_stddev_samp_order_by: Tokens_Metadata_Stddev_Samp_Order_By;
  tokens_metadata_stream_cursor_input: Tokens_Metadata_Stream_Cursor_Input;
  tokens_metadata_stream_cursor_value_input: Tokens_Metadata_Stream_Cursor_Value_Input;
  tokens_metadata_sum_fields: ResolverTypeWrapper<Tokens_Metadata_Sum_Fields>;
  tokens_metadata_sum_order_by: Tokens_Metadata_Sum_Order_By;
  tokens_metadata_var_pop_fields: ResolverTypeWrapper<Tokens_Metadata_Var_Pop_Fields>;
  tokens_metadata_var_pop_order_by: Tokens_Metadata_Var_Pop_Order_By;
  tokens_metadata_var_samp_fields: ResolverTypeWrapper<Tokens_Metadata_Var_Samp_Fields>;
  tokens_metadata_var_samp_order_by: Tokens_Metadata_Var_Samp_Order_By;
  tokens_metadata_variance_fields: ResolverTypeWrapper<Tokens_Metadata_Variance_Fields>;
  tokens_metadata_variance_order_by: Tokens_Metadata_Variance_Order_By;
  user_profiles: ResolverTypeWrapper<User_Profiles>;
  user_profiles_aggregate: ResolverTypeWrapper<User_Profiles_Aggregate>;
  user_profiles_aggregate_fields: ResolverTypeWrapper<User_Profiles_Aggregate_Fields>;
  user_profiles_avg_fields: ResolverTypeWrapper<User_Profiles_Avg_Fields>;
  user_profiles_bool_exp: User_Profiles_Bool_Exp;
  user_profiles_max_fields: ResolverTypeWrapper<User_Profiles_Max_Fields>;
  user_profiles_min_fields: ResolverTypeWrapper<User_Profiles_Min_Fields>;
  user_profiles_order_by: User_Profiles_Order_By;
  user_profiles_select_column: User_Profiles_Select_Column;
  user_profiles_stddev_fields: ResolverTypeWrapper<User_Profiles_Stddev_Fields>;
  user_profiles_stddev_pop_fields: ResolverTypeWrapper<User_Profiles_Stddev_Pop_Fields>;
  user_profiles_stddev_samp_fields: ResolverTypeWrapper<User_Profiles_Stddev_Samp_Fields>;
  user_profiles_stream_cursor_input: User_Profiles_Stream_Cursor_Input;
  user_profiles_stream_cursor_value_input: User_Profiles_Stream_Cursor_Value_Input;
  user_profiles_sum_fields: ResolverTypeWrapper<User_Profiles_Sum_Fields>;
  user_profiles_var_pop_fields: ResolverTypeWrapper<User_Profiles_Var_Pop_Fields>;
  user_profiles_var_samp_fields: ResolverTypeWrapper<User_Profiles_Var_Samp_Fields>;
  user_profiles_variance_fields: ResolverTypeWrapper<User_Profiles_Variance_Fields>;
  users: ResolverTypeWrapper<Users>;
  users_aggregate: ResolverTypeWrapper<Users_Aggregate>;
  users_aggregate_fields: ResolverTypeWrapper<Users_Aggregate_Fields>;
  users_bool_exp: Users_Bool_Exp;
  users_max_fields: ResolverTypeWrapper<Users_Max_Fields>;
  users_min_fields: ResolverTypeWrapper<Users_Min_Fields>;
  users_order_by: Users_Order_By;
  users_select_column: Users_Select_Column;
  users_stream_cursor_input: Users_Stream_Cursor_Input;
  users_stream_cursor_value_input: Users_Stream_Cursor_Value_Input;
  verticals: ResolverTypeWrapper<Verticals>;
  verticals_bool_exp: Verticals_Bool_Exp;
  verticals_enum: Verticals_Enum;
  verticals_enum_comparison_exp: Verticals_Enum_Comparison_Exp;
  verticals_order_by: Verticals_Order_By;
  verticals_select_column: Verticals_Select_Column;
  verticals_stream_cursor_input: Verticals_Stream_Cursor_Input;
  verticals_stream_cursor_value_input: Verticals_Stream_Cursor_Value_Input;
  video_aspect_ratios: ResolverTypeWrapper<Video_Aspect_Ratios>;
  video_aspect_ratios_bool_exp: Video_Aspect_Ratios_Bool_Exp;
  video_aspect_ratios_order_by: Video_Aspect_Ratios_Order_By;
  video_aspect_ratios_select_column: Video_Aspect_Ratios_Select_Column;
  video_aspect_ratios_stream_cursor_input: Video_Aspect_Ratios_Stream_Cursor_Input;
  video_aspect_ratios_stream_cursor_value_input: Video_Aspect_Ratios_Stream_Cursor_Value_Input;
  video_frame_rates: ResolverTypeWrapper<Video_Frame_Rates>;
  video_frame_rates_bool_exp: Video_Frame_Rates_Bool_Exp;
  video_frame_rates_order_by: Video_Frame_Rates_Order_By;
  video_frame_rates_select_column: Video_Frame_Rates_Select_Column;
  video_frame_rates_stream_cursor_input: Video_Frame_Rates_Stream_Cursor_Input;
  video_frame_rates_stream_cursor_value_input: Video_Frame_Rates_Stream_Cursor_Value_Input;
  webflow_artist_info: ResolverTypeWrapper<Webflow_Artist_Info>;
  webflow_artist_info_bool_exp: Webflow_Artist_Info_Bool_Exp;
  webflow_artist_info_order_by: Webflow_Artist_Info_Order_By;
  webflow_artist_info_select_column: Webflow_Artist_Info_Select_Column;
  webflow_artist_info_stream_cursor_input: Webflow_Artist_Info_Stream_Cursor_Input;
  webflow_artist_info_stream_cursor_value_input: Webflow_Artist_Info_Stream_Cursor_Value_Input;
  webflow_spectrum_articles: ResolverTypeWrapper<Webflow_Spectrum_Articles>;
  webflow_spectrum_articles_bool_exp: Webflow_Spectrum_Articles_Bool_Exp;
  webflow_spectrum_articles_order_by: Webflow_Spectrum_Articles_Order_By;
  webflow_spectrum_articles_select_column: Webflow_Spectrum_Articles_Select_Column;
  webflow_spectrum_articles_stream_cursor_input: Webflow_Spectrum_Articles_Stream_Cursor_Input;
  webflow_spectrum_articles_stream_cursor_value_input: Webflow_Spectrum_Articles_Stream_Cursor_Value_Input;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthMessageOutput: AuthMessageOutput;
  AuthenticateInput: AuthenticateInput;
  AuthenticateOutput: AuthenticateOutput;
  Boolean: Scalars['Boolean'];
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Int_comparison_exp: Int_Comparison_Exp;
  OpenseaCollectionData: OpenseaCollectionData;
  String: Scalars['String'];
  String_comparison_exp: String_Comparison_Exp;
  artists: Artists;
  artists_aggregate: Artists_Aggregate;
  artists_aggregate_fields: Artists_Aggregate_Fields;
  artists_bool_exp: Artists_Bool_Exp;
  artists_max_fields: Artists_Max_Fields;
  artists_min_fields: Artists_Min_Fields;
  artists_order_by: Artists_Order_By;
  artists_stream_cursor_input: Artists_Stream_Cursor_Input;
  artists_stream_cursor_value_input: Artists_Stream_Cursor_Value_Input;
  bigint: Scalars['bigint'];
  bigint_comparison_exp: Bigint_Comparison_Exp;
  categories: Categories;
  categories_bool_exp: Categories_Bool_Exp;
  categories_enum_comparison_exp: Categories_Enum_Comparison_Exp;
  categories_order_by: Categories_Order_By;
  categories_stream_cursor_input: Categories_Stream_Cursor_Input;
  categories_stream_cursor_value_input: Categories_Stream_Cursor_Value_Input;
  contract_allowlistings: Contract_Allowlistings;
  contract_allowlistings_aggregate_order_by: Contract_Allowlistings_Aggregate_Order_By;
  contract_allowlistings_bool_exp: Contract_Allowlistings_Bool_Exp;
  contract_allowlistings_max_order_by: Contract_Allowlistings_Max_Order_By;
  contract_allowlistings_min_order_by: Contract_Allowlistings_Min_Order_By;
  contract_allowlistings_order_by: Contract_Allowlistings_Order_By;
  contract_allowlistings_stream_cursor_input: Contract_Allowlistings_Stream_Cursor_Input;
  contract_allowlistings_stream_cursor_value_input: Contract_Allowlistings_Stream_Cursor_Value_Input;
  contract_type_names: Contract_Type_Names;
  contract_type_names_bool_exp: Contract_Type_Names_Bool_Exp;
  contract_type_names_enum_comparison_exp: Contract_Type_Names_Enum_Comparison_Exp;
  contract_type_names_order_by: Contract_Type_Names_Order_By;
  contract_type_names_stream_cursor_input: Contract_Type_Names_Stream_Cursor_Input;
  contract_type_names_stream_cursor_value_input: Contract_Type_Names_Stream_Cursor_Value_Input;
  contract_types: Contract_Types;
  contract_types_bool_exp: Contract_Types_Bool_Exp;
  contract_types_order_by: Contract_Types_Order_By;
  contract_types_stream_cursor_input: Contract_Types_Stream_Cursor_Input;
  contract_types_stream_cursor_value_input: Contract_Types_Stream_Cursor_Value_Input;
  contracts_metadata: Contracts_Metadata;
  contracts_metadata_aggregate: Contracts_Metadata_Aggregate;
  contracts_metadata_aggregate_bool_exp: Contracts_Metadata_Aggregate_Bool_Exp;
  contracts_metadata_aggregate_bool_exp_bool_and: Contracts_Metadata_Aggregate_Bool_Exp_Bool_And;
  contracts_metadata_aggregate_bool_exp_bool_or: Contracts_Metadata_Aggregate_Bool_Exp_Bool_Or;
  contracts_metadata_aggregate_bool_exp_count: Contracts_Metadata_Aggregate_Bool_Exp_Count;
  contracts_metadata_aggregate_fields: Contracts_Metadata_Aggregate_Fields;
  contracts_metadata_aggregate_order_by: Contracts_Metadata_Aggregate_Order_By;
  contracts_metadata_avg_fields: Contracts_Metadata_Avg_Fields;
  contracts_metadata_avg_order_by: Contracts_Metadata_Avg_Order_By;
  contracts_metadata_bool_exp: Contracts_Metadata_Bool_Exp;
  contracts_metadata_max_fields: Contracts_Metadata_Max_Fields;
  contracts_metadata_max_order_by: Contracts_Metadata_Max_Order_By;
  contracts_metadata_min_fields: Contracts_Metadata_Min_Fields;
  contracts_metadata_min_order_by: Contracts_Metadata_Min_Order_By;
  contracts_metadata_order_by: Contracts_Metadata_Order_By;
  contracts_metadata_stddev_fields: Contracts_Metadata_Stddev_Fields;
  contracts_metadata_stddev_order_by: Contracts_Metadata_Stddev_Order_By;
  contracts_metadata_stddev_pop_fields: Contracts_Metadata_Stddev_Pop_Fields;
  contracts_metadata_stddev_pop_order_by: Contracts_Metadata_Stddev_Pop_Order_By;
  contracts_metadata_stddev_samp_fields: Contracts_Metadata_Stddev_Samp_Fields;
  contracts_metadata_stddev_samp_order_by: Contracts_Metadata_Stddev_Samp_Order_By;
  contracts_metadata_stream_cursor_input: Contracts_Metadata_Stream_Cursor_Input;
  contracts_metadata_stream_cursor_value_input: Contracts_Metadata_Stream_Cursor_Value_Input;
  contracts_metadata_sum_fields: Contracts_Metadata_Sum_Fields;
  contracts_metadata_sum_order_by: Contracts_Metadata_Sum_Order_By;
  contracts_metadata_var_pop_fields: Contracts_Metadata_Var_Pop_Fields;
  contracts_metadata_var_pop_order_by: Contracts_Metadata_Var_Pop_Order_By;
  contracts_metadata_var_samp_fields: Contracts_Metadata_Var_Samp_Fields;
  contracts_metadata_var_samp_order_by: Contracts_Metadata_Var_Samp_Order_By;
  contracts_metadata_variance_fields: Contracts_Metadata_Variance_Fields;
  contracts_metadata_variance_order_by: Contracts_Metadata_Variance_Order_By;
  curation_statuses_enum_comparison_exp: Curation_Statuses_Enum_Comparison_Exp;
  dependencies_metadata: Dependencies_Metadata;
  dependencies_metadata_aggregate: Dependencies_Metadata_Aggregate;
  dependencies_metadata_aggregate_bool_exp: Dependencies_Metadata_Aggregate_Bool_Exp;
  dependencies_metadata_aggregate_bool_exp_count: Dependencies_Metadata_Aggregate_Bool_Exp_Count;
  dependencies_metadata_aggregate_fields: Dependencies_Metadata_Aggregate_Fields;
  dependencies_metadata_aggregate_order_by: Dependencies_Metadata_Aggregate_Order_By;
  dependencies_metadata_bool_exp: Dependencies_Metadata_Bool_Exp;
  dependencies_metadata_max_fields: Dependencies_Metadata_Max_Fields;
  dependencies_metadata_max_order_by: Dependencies_Metadata_Max_Order_By;
  dependencies_metadata_min_fields: Dependencies_Metadata_Min_Fields;
  dependencies_metadata_min_order_by: Dependencies_Metadata_Min_Order_By;
  dependencies_metadata_order_by: Dependencies_Metadata_Order_By;
  dependencies_metadata_stream_cursor_input: Dependencies_Metadata_Stream_Cursor_Input;
  dependencies_metadata_stream_cursor_value_input: Dependencies_Metadata_Stream_Cursor_Value_Input;
  dependency_additional_cdns: Dependency_Additional_Cdns;
  dependency_additional_cdns_aggregate: Dependency_Additional_Cdns_Aggregate;
  dependency_additional_cdns_aggregate_bool_exp: Dependency_Additional_Cdns_Aggregate_Bool_Exp;
  dependency_additional_cdns_aggregate_bool_exp_count: Dependency_Additional_Cdns_Aggregate_Bool_Exp_Count;
  dependency_additional_cdns_aggregate_fields: Dependency_Additional_Cdns_Aggregate_Fields;
  dependency_additional_cdns_aggregate_order_by: Dependency_Additional_Cdns_Aggregate_Order_By;
  dependency_additional_cdns_avg_fields: Dependency_Additional_Cdns_Avg_Fields;
  dependency_additional_cdns_avg_order_by: Dependency_Additional_Cdns_Avg_Order_By;
  dependency_additional_cdns_bool_exp: Dependency_Additional_Cdns_Bool_Exp;
  dependency_additional_cdns_max_fields: Dependency_Additional_Cdns_Max_Fields;
  dependency_additional_cdns_max_order_by: Dependency_Additional_Cdns_Max_Order_By;
  dependency_additional_cdns_min_fields: Dependency_Additional_Cdns_Min_Fields;
  dependency_additional_cdns_min_order_by: Dependency_Additional_Cdns_Min_Order_By;
  dependency_additional_cdns_order_by: Dependency_Additional_Cdns_Order_By;
  dependency_additional_cdns_stddev_fields: Dependency_Additional_Cdns_Stddev_Fields;
  dependency_additional_cdns_stddev_order_by: Dependency_Additional_Cdns_Stddev_Order_By;
  dependency_additional_cdns_stddev_pop_fields: Dependency_Additional_Cdns_Stddev_Pop_Fields;
  dependency_additional_cdns_stddev_pop_order_by: Dependency_Additional_Cdns_Stddev_Pop_Order_By;
  dependency_additional_cdns_stddev_samp_fields: Dependency_Additional_Cdns_Stddev_Samp_Fields;
  dependency_additional_cdns_stddev_samp_order_by: Dependency_Additional_Cdns_Stddev_Samp_Order_By;
  dependency_additional_cdns_stream_cursor_input: Dependency_Additional_Cdns_Stream_Cursor_Input;
  dependency_additional_cdns_stream_cursor_value_input: Dependency_Additional_Cdns_Stream_Cursor_Value_Input;
  dependency_additional_cdns_sum_fields: Dependency_Additional_Cdns_Sum_Fields;
  dependency_additional_cdns_sum_order_by: Dependency_Additional_Cdns_Sum_Order_By;
  dependency_additional_cdns_var_pop_fields: Dependency_Additional_Cdns_Var_Pop_Fields;
  dependency_additional_cdns_var_pop_order_by: Dependency_Additional_Cdns_Var_Pop_Order_By;
  dependency_additional_cdns_var_samp_fields: Dependency_Additional_Cdns_Var_Samp_Fields;
  dependency_additional_cdns_var_samp_order_by: Dependency_Additional_Cdns_Var_Samp_Order_By;
  dependency_additional_cdns_variance_fields: Dependency_Additional_Cdns_Variance_Fields;
  dependency_additional_cdns_variance_order_by: Dependency_Additional_Cdns_Variance_Order_By;
  dependency_additional_repositories: Dependency_Additional_Repositories;
  dependency_additional_repositories_aggregate: Dependency_Additional_Repositories_Aggregate;
  dependency_additional_repositories_aggregate_bool_exp: Dependency_Additional_Repositories_Aggregate_Bool_Exp;
  dependency_additional_repositories_aggregate_bool_exp_count: Dependency_Additional_Repositories_Aggregate_Bool_Exp_Count;
  dependency_additional_repositories_aggregate_fields: Dependency_Additional_Repositories_Aggregate_Fields;
  dependency_additional_repositories_aggregate_order_by: Dependency_Additional_Repositories_Aggregate_Order_By;
  dependency_additional_repositories_avg_fields: Dependency_Additional_Repositories_Avg_Fields;
  dependency_additional_repositories_avg_order_by: Dependency_Additional_Repositories_Avg_Order_By;
  dependency_additional_repositories_bool_exp: Dependency_Additional_Repositories_Bool_Exp;
  dependency_additional_repositories_max_fields: Dependency_Additional_Repositories_Max_Fields;
  dependency_additional_repositories_max_order_by: Dependency_Additional_Repositories_Max_Order_By;
  dependency_additional_repositories_min_fields: Dependency_Additional_Repositories_Min_Fields;
  dependency_additional_repositories_min_order_by: Dependency_Additional_Repositories_Min_Order_By;
  dependency_additional_repositories_order_by: Dependency_Additional_Repositories_Order_By;
  dependency_additional_repositories_stddev_fields: Dependency_Additional_Repositories_Stddev_Fields;
  dependency_additional_repositories_stddev_order_by: Dependency_Additional_Repositories_Stddev_Order_By;
  dependency_additional_repositories_stddev_pop_fields: Dependency_Additional_Repositories_Stddev_Pop_Fields;
  dependency_additional_repositories_stddev_pop_order_by: Dependency_Additional_Repositories_Stddev_Pop_Order_By;
  dependency_additional_repositories_stddev_samp_fields: Dependency_Additional_Repositories_Stddev_Samp_Fields;
  dependency_additional_repositories_stddev_samp_order_by: Dependency_Additional_Repositories_Stddev_Samp_Order_By;
  dependency_additional_repositories_stream_cursor_input: Dependency_Additional_Repositories_Stream_Cursor_Input;
  dependency_additional_repositories_stream_cursor_value_input: Dependency_Additional_Repositories_Stream_Cursor_Value_Input;
  dependency_additional_repositories_sum_fields: Dependency_Additional_Repositories_Sum_Fields;
  dependency_additional_repositories_sum_order_by: Dependency_Additional_Repositories_Sum_Order_By;
  dependency_additional_repositories_var_pop_fields: Dependency_Additional_Repositories_Var_Pop_Fields;
  dependency_additional_repositories_var_pop_order_by: Dependency_Additional_Repositories_Var_Pop_Order_By;
  dependency_additional_repositories_var_samp_fields: Dependency_Additional_Repositories_Var_Samp_Fields;
  dependency_additional_repositories_var_samp_order_by: Dependency_Additional_Repositories_Var_Samp_Order_By;
  dependency_additional_repositories_variance_fields: Dependency_Additional_Repositories_Variance_Fields;
  dependency_additional_repositories_variance_order_by: Dependency_Additional_Repositories_Variance_Order_By;
  dependency_registries: Dependency_Registries;
  dependency_registries_aggregate: Dependency_Registries_Aggregate;
  dependency_registries_aggregate_fields: Dependency_Registries_Aggregate_Fields;
  dependency_registries_bool_exp: Dependency_Registries_Bool_Exp;
  dependency_registries_max_fields: Dependency_Registries_Max_Fields;
  dependency_registries_min_fields: Dependency_Registries_Min_Fields;
  dependency_registries_order_by: Dependency_Registries_Order_By;
  dependency_registries_stream_cursor_input: Dependency_Registries_Stream_Cursor_Input;
  dependency_registries_stream_cursor_value_input: Dependency_Registries_Stream_Cursor_Value_Input;
  dependency_scripts: Dependency_Scripts;
  dependency_scripts_aggregate: Dependency_Scripts_Aggregate;
  dependency_scripts_aggregate_bool_exp: Dependency_Scripts_Aggregate_Bool_Exp;
  dependency_scripts_aggregate_bool_exp_count: Dependency_Scripts_Aggregate_Bool_Exp_Count;
  dependency_scripts_aggregate_fields: Dependency_Scripts_Aggregate_Fields;
  dependency_scripts_aggregate_order_by: Dependency_Scripts_Aggregate_Order_By;
  dependency_scripts_avg_fields: Dependency_Scripts_Avg_Fields;
  dependency_scripts_avg_order_by: Dependency_Scripts_Avg_Order_By;
  dependency_scripts_bool_exp: Dependency_Scripts_Bool_Exp;
  dependency_scripts_max_fields: Dependency_Scripts_Max_Fields;
  dependency_scripts_max_order_by: Dependency_Scripts_Max_Order_By;
  dependency_scripts_min_fields: Dependency_Scripts_Min_Fields;
  dependency_scripts_min_order_by: Dependency_Scripts_Min_Order_By;
  dependency_scripts_order_by: Dependency_Scripts_Order_By;
  dependency_scripts_stddev_fields: Dependency_Scripts_Stddev_Fields;
  dependency_scripts_stddev_order_by: Dependency_Scripts_Stddev_Order_By;
  dependency_scripts_stddev_pop_fields: Dependency_Scripts_Stddev_Pop_Fields;
  dependency_scripts_stddev_pop_order_by: Dependency_Scripts_Stddev_Pop_Order_By;
  dependency_scripts_stddev_samp_fields: Dependency_Scripts_Stddev_Samp_Fields;
  dependency_scripts_stddev_samp_order_by: Dependency_Scripts_Stddev_Samp_Order_By;
  dependency_scripts_stream_cursor_input: Dependency_Scripts_Stream_Cursor_Input;
  dependency_scripts_stream_cursor_value_input: Dependency_Scripts_Stream_Cursor_Value_Input;
  dependency_scripts_sum_fields: Dependency_Scripts_Sum_Fields;
  dependency_scripts_sum_order_by: Dependency_Scripts_Sum_Order_By;
  dependency_scripts_var_pop_fields: Dependency_Scripts_Var_Pop_Fields;
  dependency_scripts_var_pop_order_by: Dependency_Scripts_Var_Pop_Order_By;
  dependency_scripts_var_samp_fields: Dependency_Scripts_Var_Samp_Fields;
  dependency_scripts_var_samp_order_by: Dependency_Scripts_Var_Samp_Order_By;
  dependency_scripts_variance_fields: Dependency_Scripts_Variance_Fields;
  dependency_scripts_variance_order_by: Dependency_Scripts_Variance_Order_By;
  entity_tags: Entity_Tags;
  entity_tags_aggregate_order_by: Entity_Tags_Aggregate_Order_By;
  entity_tags_avg_order_by: Entity_Tags_Avg_Order_By;
  entity_tags_bool_exp: Entity_Tags_Bool_Exp;
  entity_tags_max_order_by: Entity_Tags_Max_Order_By;
  entity_tags_min_order_by: Entity_Tags_Min_Order_By;
  entity_tags_order_by: Entity_Tags_Order_By;
  entity_tags_stddev_order_by: Entity_Tags_Stddev_Order_By;
  entity_tags_stddev_pop_order_by: Entity_Tags_Stddev_Pop_Order_By;
  entity_tags_stddev_samp_order_by: Entity_Tags_Stddev_Samp_Order_By;
  entity_tags_stream_cursor_input: Entity_Tags_Stream_Cursor_Input;
  entity_tags_stream_cursor_value_input: Entity_Tags_Stream_Cursor_Value_Input;
  entity_tags_sum_order_by: Entity_Tags_Sum_Order_By;
  entity_tags_var_pop_order_by: Entity_Tags_Var_Pop_Order_By;
  entity_tags_var_samp_order_by: Entity_Tags_Var_Samp_Order_By;
  entity_tags_variance_order_by: Entity_Tags_Variance_Order_By;
  favorites: Favorites;
  favorites_aggregate: Favorites_Aggregate;
  favorites_aggregate_bool_exp: Favorites_Aggregate_Bool_Exp;
  favorites_aggregate_bool_exp_count: Favorites_Aggregate_Bool_Exp_Count;
  favorites_aggregate_fields: Favorites_Aggregate_Fields;
  favorites_aggregate_order_by: Favorites_Aggregate_Order_By;
  favorites_avg_fields: Favorites_Avg_Fields;
  favorites_avg_order_by: Favorites_Avg_Order_By;
  favorites_bool_exp: Favorites_Bool_Exp;
  favorites_max_fields: Favorites_Max_Fields;
  favorites_max_order_by: Favorites_Max_Order_By;
  favorites_min_fields: Favorites_Min_Fields;
  favorites_min_order_by: Favorites_Min_Order_By;
  favorites_order_by: Favorites_Order_By;
  favorites_stddev_fields: Favorites_Stddev_Fields;
  favorites_stddev_order_by: Favorites_Stddev_Order_By;
  favorites_stddev_pop_fields: Favorites_Stddev_Pop_Fields;
  favorites_stddev_pop_order_by: Favorites_Stddev_Pop_Order_By;
  favorites_stddev_samp_fields: Favorites_Stddev_Samp_Fields;
  favorites_stddev_samp_order_by: Favorites_Stddev_Samp_Order_By;
  favorites_stream_cursor_input: Favorites_Stream_Cursor_Input;
  favorites_stream_cursor_value_input: Favorites_Stream_Cursor_Value_Input;
  favorites_sum_fields: Favorites_Sum_Fields;
  favorites_sum_order_by: Favorites_Sum_Order_By;
  favorites_var_pop_fields: Favorites_Var_Pop_Fields;
  favorites_var_pop_order_by: Favorites_Var_Pop_Order_By;
  favorites_var_samp_fields: Favorites_Var_Samp_Fields;
  favorites_var_samp_order_by: Favorites_Var_Samp_Order_By;
  favorites_variance_fields: Favorites_Variance_Fields;
  favorites_variance_order_by: Favorites_Variance_Order_By;
  feature_flags: Feature_Flags;
  feature_flags_bool_exp: Feature_Flags_Bool_Exp;
  feature_flags_order_by: Feature_Flags_Order_By;
  feature_flags_stream_cursor_input: Feature_Flags_Stream_Cursor_Input;
  feature_flags_stream_cursor_value_input: Feature_Flags_Stream_Cursor_Value_Input;
  featured_token_projects_metadata_args: Featured_Token_Projects_Metadata_Args;
  filter_tokens_metadata_by_features_args: Filter_Tokens_Metadata_By_Features_Args;
  float8: Scalars['float8'];
  float8_comparison_exp: Float8_Comparison_Exp;
  jsonb: Scalars['jsonb'];
  jsonb_cast_exp: Jsonb_Cast_Exp;
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  jsonpath: Scalars['jsonpath'];
  list_projects_metadata_random_args: List_Projects_Metadata_Random_Args;
  media: Media;
  media_bool_exp: Media_Bool_Exp;
  media_order_by: Media_Order_By;
  media_stream_cursor_input: Media_Stream_Cursor_Input;
  media_stream_cursor_value_input: Media_Stream_Cursor_Value_Input;
  minter_filters_metadata: Minter_Filters_Metadata;
  minter_filters_metadata_bool_exp: Minter_Filters_Metadata_Bool_Exp;
  minter_filters_metadata_order_by: Minter_Filters_Metadata_Order_By;
  minter_filters_metadata_stream_cursor_input: Minter_Filters_Metadata_Stream_Cursor_Input;
  minter_filters_metadata_stream_cursor_value_input: Minter_Filters_Metadata_Stream_Cursor_Value_Input;
  minter_type_names_enum_comparison_exp: Minter_Type_Names_Enum_Comparison_Exp;
  minter_types: Minter_Types;
  minter_types_bool_exp: Minter_Types_Bool_Exp;
  minter_types_order_by: Minter_Types_Order_By;
  minter_types_stream_cursor_input: Minter_Types_Stream_Cursor_Input;
  minter_types_stream_cursor_value_input: Minter_Types_Stream_Cursor_Value_Input;
  minters_metadata: Minters_Metadata;
  minters_metadata_aggregate_order_by: Minters_Metadata_Aggregate_Order_By;
  minters_metadata_avg_order_by: Minters_Metadata_Avg_Order_By;
  minters_metadata_bool_exp: Minters_Metadata_Bool_Exp;
  minters_metadata_max_order_by: Minters_Metadata_Max_Order_By;
  minters_metadata_min_order_by: Minters_Metadata_Min_Order_By;
  minters_metadata_order_by: Minters_Metadata_Order_By;
  minters_metadata_stddev_order_by: Minters_Metadata_Stddev_Order_By;
  minters_metadata_stddev_pop_order_by: Minters_Metadata_Stddev_Pop_Order_By;
  minters_metadata_stddev_samp_order_by: Minters_Metadata_Stddev_Samp_Order_By;
  minters_metadata_stream_cursor_input: Minters_Metadata_Stream_Cursor_Input;
  minters_metadata_stream_cursor_value_input: Minters_Metadata_Stream_Cursor_Value_Input;
  minters_metadata_sum_order_by: Minters_Metadata_Sum_Order_By;
  minters_metadata_var_pop_order_by: Minters_Metadata_Var_Pop_Order_By;
  minters_metadata_var_samp_order_by: Minters_Metadata_Var_Samp_Order_By;
  minters_metadata_variance_order_by: Minters_Metadata_Variance_Order_By;
  mutation_root: {};
  numeric: Scalars['numeric'];
  numeric_comparison_exp: Numeric_Comparison_Exp;
  project_external_asset_dependencies: Project_External_Asset_Dependencies;
  project_external_asset_dependencies_aggregate_order_by: Project_External_Asset_Dependencies_Aggregate_Order_By;
  project_external_asset_dependencies_avg_order_by: Project_External_Asset_Dependencies_Avg_Order_By;
  project_external_asset_dependencies_bool_exp: Project_External_Asset_Dependencies_Bool_Exp;
  project_external_asset_dependencies_max_order_by: Project_External_Asset_Dependencies_Max_Order_By;
  project_external_asset_dependencies_min_order_by: Project_External_Asset_Dependencies_Min_Order_By;
  project_external_asset_dependencies_order_by: Project_External_Asset_Dependencies_Order_By;
  project_external_asset_dependencies_stddev_order_by: Project_External_Asset_Dependencies_Stddev_Order_By;
  project_external_asset_dependencies_stddev_pop_order_by: Project_External_Asset_Dependencies_Stddev_Pop_Order_By;
  project_external_asset_dependencies_stddev_samp_order_by: Project_External_Asset_Dependencies_Stddev_Samp_Order_By;
  project_external_asset_dependencies_stream_cursor_input: Project_External_Asset_Dependencies_Stream_Cursor_Input;
  project_external_asset_dependencies_stream_cursor_value_input: Project_External_Asset_Dependencies_Stream_Cursor_Value_Input;
  project_external_asset_dependencies_sum_order_by: Project_External_Asset_Dependencies_Sum_Order_By;
  project_external_asset_dependencies_var_pop_order_by: Project_External_Asset_Dependencies_Var_Pop_Order_By;
  project_external_asset_dependencies_var_samp_order_by: Project_External_Asset_Dependencies_Var_Samp_Order_By;
  project_external_asset_dependencies_variance_order_by: Project_External_Asset_Dependencies_Variance_Order_By;
  project_external_asset_dependency_types_enum_comparison_exp: Project_External_Asset_Dependency_Types_Enum_Comparison_Exp;
  project_minter_configurations: Project_Minter_Configurations;
  project_minter_configurations_bool_exp: Project_Minter_Configurations_Bool_Exp;
  project_minter_configurations_order_by: Project_Minter_Configurations_Order_By;
  project_minter_configurations_stream_cursor_input: Project_Minter_Configurations_Stream_Cursor_Input;
  project_minter_configurations_stream_cursor_value_input: Project_Minter_Configurations_Stream_Cursor_Value_Input;
  project_scripts: Project_Scripts;
  project_scripts_aggregate_order_by: Project_Scripts_Aggregate_Order_By;
  project_scripts_avg_order_by: Project_Scripts_Avg_Order_By;
  project_scripts_bool_exp: Project_Scripts_Bool_Exp;
  project_scripts_max_order_by: Project_Scripts_Max_Order_By;
  project_scripts_min_order_by: Project_Scripts_Min_Order_By;
  project_scripts_order_by: Project_Scripts_Order_By;
  project_scripts_stddev_order_by: Project_Scripts_Stddev_Order_By;
  project_scripts_stddev_pop_order_by: Project_Scripts_Stddev_Pop_Order_By;
  project_scripts_stddev_samp_order_by: Project_Scripts_Stddev_Samp_Order_By;
  project_scripts_stream_cursor_input: Project_Scripts_Stream_Cursor_Input;
  project_scripts_stream_cursor_value_input: Project_Scripts_Stream_Cursor_Value_Input;
  project_scripts_sum_order_by: Project_Scripts_Sum_Order_By;
  project_scripts_var_pop_order_by: Project_Scripts_Var_Pop_Order_By;
  project_scripts_var_samp_order_by: Project_Scripts_Var_Samp_Order_By;
  project_scripts_variance_order_by: Project_Scripts_Variance_Order_By;
  project_series: Project_Series;
  project_series_aggregate: Project_Series_Aggregate;
  project_series_aggregate_fields: Project_Series_Aggregate_Fields;
  project_series_avg_fields: Project_Series_Avg_Fields;
  project_series_bool_exp: Project_Series_Bool_Exp;
  project_series_max_fields: Project_Series_Max_Fields;
  project_series_min_fields: Project_Series_Min_Fields;
  project_series_order_by: Project_Series_Order_By;
  project_series_stddev_fields: Project_Series_Stddev_Fields;
  project_series_stddev_pop_fields: Project_Series_Stddev_Pop_Fields;
  project_series_stddev_samp_fields: Project_Series_Stddev_Samp_Fields;
  project_series_stream_cursor_input: Project_Series_Stream_Cursor_Input;
  project_series_stream_cursor_value_input: Project_Series_Stream_Cursor_Value_Input;
  project_series_sum_fields: Project_Series_Sum_Fields;
  project_series_var_pop_fields: Project_Series_Var_Pop_Fields;
  project_series_var_samp_fields: Project_Series_Var_Samp_Fields;
  project_series_variance_fields: Project_Series_Variance_Fields;
  project_vertical_categories: Project_Vertical_Categories;
  project_vertical_categories_bool_exp: Project_Vertical_Categories_Bool_Exp;
  project_vertical_categories_order_by: Project_Vertical_Categories_Order_By;
  project_vertical_categories_stream_cursor_input: Project_Vertical_Categories_Stream_Cursor_Input;
  project_vertical_categories_stream_cursor_value_input: Project_Vertical_Categories_Stream_Cursor_Value_Input;
  project_verticals: Project_Verticals;
  project_verticals_aggregate_order_by: Project_Verticals_Aggregate_Order_By;
  project_verticals_bool_exp: Project_Verticals_Bool_Exp;
  project_verticals_max_order_by: Project_Verticals_Max_Order_By;
  project_verticals_min_order_by: Project_Verticals_Min_Order_By;
  project_verticals_order_by: Project_Verticals_Order_By;
  project_verticals_stream_cursor_input: Project_Verticals_Stream_Cursor_Input;
  project_verticals_stream_cursor_value_input: Project_Verticals_Stream_Cursor_Value_Input;
  projects_features: Projects_Features;
  projects_features_bool_exp: Projects_Features_Bool_Exp;
  projects_features_order_by: Projects_Features_Order_By;
  projects_features_stream_cursor_input: Projects_Features_Stream_Cursor_Input;
  projects_features_stream_cursor_value_input: Projects_Features_Stream_Cursor_Value_Input;
  projects_metadata: Projects_Metadata;
  projects_metadata_aggregate: Projects_Metadata_Aggregate;
  projects_metadata_aggregate_bool_exp: Projects_Metadata_Aggregate_Bool_Exp;
  projects_metadata_aggregate_bool_exp_bool_and: Projects_Metadata_Aggregate_Bool_Exp_Bool_And;
  projects_metadata_aggregate_bool_exp_bool_or: Projects_Metadata_Aggregate_Bool_Exp_Bool_Or;
  projects_metadata_aggregate_bool_exp_count: Projects_Metadata_Aggregate_Bool_Exp_Count;
  projects_metadata_aggregate_fields: Projects_Metadata_Aggregate_Fields;
  projects_metadata_aggregate_order_by: Projects_Metadata_Aggregate_Order_By;
  projects_metadata_avg_fields: Projects_Metadata_Avg_Fields;
  projects_metadata_avg_order_by: Projects_Metadata_Avg_Order_By;
  projects_metadata_bool_exp: Projects_Metadata_Bool_Exp;
  projects_metadata_max_fields: Projects_Metadata_Max_Fields;
  projects_metadata_max_order_by: Projects_Metadata_Max_Order_By;
  projects_metadata_min_fields: Projects_Metadata_Min_Fields;
  projects_metadata_min_order_by: Projects_Metadata_Min_Order_By;
  projects_metadata_order_by: Projects_Metadata_Order_By;
  projects_metadata_stddev_fields: Projects_Metadata_Stddev_Fields;
  projects_metadata_stddev_order_by: Projects_Metadata_Stddev_Order_By;
  projects_metadata_stddev_pop_fields: Projects_Metadata_Stddev_Pop_Fields;
  projects_metadata_stddev_pop_order_by: Projects_Metadata_Stddev_Pop_Order_By;
  projects_metadata_stddev_samp_fields: Projects_Metadata_Stddev_Samp_Fields;
  projects_metadata_stddev_samp_order_by: Projects_Metadata_Stddev_Samp_Order_By;
  projects_metadata_stream_cursor_input: Projects_Metadata_Stream_Cursor_Input;
  projects_metadata_stream_cursor_value_input: Projects_Metadata_Stream_Cursor_Value_Input;
  projects_metadata_sum_fields: Projects_Metadata_Sum_Fields;
  projects_metadata_sum_order_by: Projects_Metadata_Sum_Order_By;
  projects_metadata_var_pop_fields: Projects_Metadata_Var_Pop_Fields;
  projects_metadata_var_pop_order_by: Projects_Metadata_Var_Pop_Order_By;
  projects_metadata_var_samp_fields: Projects_Metadata_Var_Samp_Fields;
  projects_metadata_var_samp_order_by: Projects_Metadata_Var_Samp_Order_By;
  projects_metadata_variance_fields: Projects_Metadata_Variance_Fields;
  projects_metadata_variance_order_by: Projects_Metadata_Variance_Order_By;
  proposed_artist_addresses_and_splits: Proposed_Artist_Addresses_And_Splits;
  proposed_artist_addresses_and_splits_bool_exp: Proposed_Artist_Addresses_And_Splits_Bool_Exp;
  proposed_artist_addresses_and_splits_order_by: Proposed_Artist_Addresses_And_Splits_Order_By;
  proposed_artist_addresses_and_splits_stream_cursor_input: Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Input;
  proposed_artist_addresses_and_splits_stream_cursor_value_input: Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Value_Input;
  query_root: {};
  receipt_metadata: Receipt_Metadata;
  receipt_metadata_aggregate: Receipt_Metadata_Aggregate;
  receipt_metadata_aggregate_bool_exp: Receipt_Metadata_Aggregate_Bool_Exp;
  receipt_metadata_aggregate_bool_exp_count: Receipt_Metadata_Aggregate_Bool_Exp_Count;
  receipt_metadata_aggregate_fields: Receipt_Metadata_Aggregate_Fields;
  receipt_metadata_aggregate_order_by: Receipt_Metadata_Aggregate_Order_By;
  receipt_metadata_bool_exp: Receipt_Metadata_Bool_Exp;
  receipt_metadata_max_fields: Receipt_Metadata_Max_Fields;
  receipt_metadata_max_order_by: Receipt_Metadata_Max_Order_By;
  receipt_metadata_min_fields: Receipt_Metadata_Min_Fields;
  receipt_metadata_min_order_by: Receipt_Metadata_Min_Order_By;
  receipt_metadata_order_by: Receipt_Metadata_Order_By;
  receipt_metadata_stream_cursor_input: Receipt_Metadata_Stream_Cursor_Input;
  receipt_metadata_stream_cursor_value_input: Receipt_Metadata_Stream_Cursor_Value_Input;
  render_types: Render_Types;
  render_types_bool_exp: Render_Types_Bool_Exp;
  render_types_enum_comparison_exp: Render_Types_Enum_Comparison_Exp;
  render_types_order_by: Render_Types_Order_By;
  render_types_stream_cursor_input: Render_Types_Stream_Cursor_Input;
  render_types_stream_cursor_value_input: Render_Types_Stream_Cursor_Value_Input;
  search_projects_args: Search_Projects_Args;
  search_tags_args: Search_Tags_Args;
  search_tokens_args: Search_Tokens_Args;
  search_users_args: Search_Users_Args;
  seed_float: Scalars['seed_float'];
  subscription_root: {};
  tag_groupings_enum_comparison_exp: Tag_Groupings_Enum_Comparison_Exp;
  tag_status_enum_comparison_exp: Tag_Status_Enum_Comparison_Exp;
  tag_types_enum_comparison_exp: Tag_Types_Enum_Comparison_Exp;
  tags: Tags;
  tags_bool_exp: Tags_Bool_Exp;
  tags_order_by: Tags_Order_By;
  tags_stream_cursor_input: Tags_Stream_Cursor_Input;
  tags_stream_cursor_value_input: Tags_Stream_Cursor_Value_Input;
  timestamp: Scalars['timestamp'];
  timestamp_comparison_exp: Timestamp_Comparison_Exp;
  timestamptz: Scalars['timestamptz'];
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  tokens_metadata: Tokens_Metadata;
  tokens_metadata_aggregate: Tokens_Metadata_Aggregate;
  tokens_metadata_aggregate_bool_exp: Tokens_Metadata_Aggregate_Bool_Exp;
  tokens_metadata_aggregate_bool_exp_avg: Tokens_Metadata_Aggregate_Bool_Exp_Avg;
  tokens_metadata_aggregate_bool_exp_corr: Tokens_Metadata_Aggregate_Bool_Exp_Corr;
  tokens_metadata_aggregate_bool_exp_corr_arguments: Tokens_Metadata_Aggregate_Bool_Exp_Corr_Arguments;
  tokens_metadata_aggregate_bool_exp_count: Tokens_Metadata_Aggregate_Bool_Exp_Count;
  tokens_metadata_aggregate_bool_exp_covar_samp: Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp;
  tokens_metadata_aggregate_bool_exp_covar_samp_arguments: Tokens_Metadata_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  tokens_metadata_aggregate_bool_exp_max: Tokens_Metadata_Aggregate_Bool_Exp_Max;
  tokens_metadata_aggregate_bool_exp_min: Tokens_Metadata_Aggregate_Bool_Exp_Min;
  tokens_metadata_aggregate_bool_exp_stddev_samp: Tokens_Metadata_Aggregate_Bool_Exp_Stddev_Samp;
  tokens_metadata_aggregate_bool_exp_sum: Tokens_Metadata_Aggregate_Bool_Exp_Sum;
  tokens_metadata_aggregate_bool_exp_var_samp: Tokens_Metadata_Aggregate_Bool_Exp_Var_Samp;
  tokens_metadata_aggregate_fields: Tokens_Metadata_Aggregate_Fields;
  tokens_metadata_aggregate_order_by: Tokens_Metadata_Aggregate_Order_By;
  tokens_metadata_avg_fields: Tokens_Metadata_Avg_Fields;
  tokens_metadata_avg_order_by: Tokens_Metadata_Avg_Order_By;
  tokens_metadata_bool_exp: Tokens_Metadata_Bool_Exp;
  tokens_metadata_max_fields: Tokens_Metadata_Max_Fields;
  tokens_metadata_max_order_by: Tokens_Metadata_Max_Order_By;
  tokens_metadata_min_fields: Tokens_Metadata_Min_Fields;
  tokens_metadata_min_order_by: Tokens_Metadata_Min_Order_By;
  tokens_metadata_order_by: Tokens_Metadata_Order_By;
  tokens_metadata_stddev_fields: Tokens_Metadata_Stddev_Fields;
  tokens_metadata_stddev_order_by: Tokens_Metadata_Stddev_Order_By;
  tokens_metadata_stddev_pop_fields: Tokens_Metadata_Stddev_Pop_Fields;
  tokens_metadata_stddev_pop_order_by: Tokens_Metadata_Stddev_Pop_Order_By;
  tokens_metadata_stddev_samp_fields: Tokens_Metadata_Stddev_Samp_Fields;
  tokens_metadata_stddev_samp_order_by: Tokens_Metadata_Stddev_Samp_Order_By;
  tokens_metadata_stream_cursor_input: Tokens_Metadata_Stream_Cursor_Input;
  tokens_metadata_stream_cursor_value_input: Tokens_Metadata_Stream_Cursor_Value_Input;
  tokens_metadata_sum_fields: Tokens_Metadata_Sum_Fields;
  tokens_metadata_sum_order_by: Tokens_Metadata_Sum_Order_By;
  tokens_metadata_var_pop_fields: Tokens_Metadata_Var_Pop_Fields;
  tokens_metadata_var_pop_order_by: Tokens_Metadata_Var_Pop_Order_By;
  tokens_metadata_var_samp_fields: Tokens_Metadata_Var_Samp_Fields;
  tokens_metadata_var_samp_order_by: Tokens_Metadata_Var_Samp_Order_By;
  tokens_metadata_variance_fields: Tokens_Metadata_Variance_Fields;
  tokens_metadata_variance_order_by: Tokens_Metadata_Variance_Order_By;
  user_profiles: User_Profiles;
  user_profiles_aggregate: User_Profiles_Aggregate;
  user_profiles_aggregate_fields: User_Profiles_Aggregate_Fields;
  user_profiles_avg_fields: User_Profiles_Avg_Fields;
  user_profiles_bool_exp: User_Profiles_Bool_Exp;
  user_profiles_max_fields: User_Profiles_Max_Fields;
  user_profiles_min_fields: User_Profiles_Min_Fields;
  user_profiles_order_by: User_Profiles_Order_By;
  user_profiles_stddev_fields: User_Profiles_Stddev_Fields;
  user_profiles_stddev_pop_fields: User_Profiles_Stddev_Pop_Fields;
  user_profiles_stddev_samp_fields: User_Profiles_Stddev_Samp_Fields;
  user_profiles_stream_cursor_input: User_Profiles_Stream_Cursor_Input;
  user_profiles_stream_cursor_value_input: User_Profiles_Stream_Cursor_Value_Input;
  user_profiles_sum_fields: User_Profiles_Sum_Fields;
  user_profiles_var_pop_fields: User_Profiles_Var_Pop_Fields;
  user_profiles_var_samp_fields: User_Profiles_Var_Samp_Fields;
  user_profiles_variance_fields: User_Profiles_Variance_Fields;
  users: Users;
  users_aggregate: Users_Aggregate;
  users_aggregate_fields: Users_Aggregate_Fields;
  users_bool_exp: Users_Bool_Exp;
  users_max_fields: Users_Max_Fields;
  users_min_fields: Users_Min_Fields;
  users_order_by: Users_Order_By;
  users_stream_cursor_input: Users_Stream_Cursor_Input;
  users_stream_cursor_value_input: Users_Stream_Cursor_Value_Input;
  verticals: Verticals;
  verticals_bool_exp: Verticals_Bool_Exp;
  verticals_enum_comparison_exp: Verticals_Enum_Comparison_Exp;
  verticals_order_by: Verticals_Order_By;
  verticals_stream_cursor_input: Verticals_Stream_Cursor_Input;
  verticals_stream_cursor_value_input: Verticals_Stream_Cursor_Value_Input;
  video_aspect_ratios: Video_Aspect_Ratios;
  video_aspect_ratios_bool_exp: Video_Aspect_Ratios_Bool_Exp;
  video_aspect_ratios_order_by: Video_Aspect_Ratios_Order_By;
  video_aspect_ratios_stream_cursor_input: Video_Aspect_Ratios_Stream_Cursor_Input;
  video_aspect_ratios_stream_cursor_value_input: Video_Aspect_Ratios_Stream_Cursor_Value_Input;
  video_frame_rates: Video_Frame_Rates;
  video_frame_rates_bool_exp: Video_Frame_Rates_Bool_Exp;
  video_frame_rates_order_by: Video_Frame_Rates_Order_By;
  video_frame_rates_stream_cursor_input: Video_Frame_Rates_Stream_Cursor_Input;
  video_frame_rates_stream_cursor_value_input: Video_Frame_Rates_Stream_Cursor_Value_Input;
  webflow_artist_info: Webflow_Artist_Info;
  webflow_artist_info_bool_exp: Webflow_Artist_Info_Bool_Exp;
  webflow_artist_info_order_by: Webflow_Artist_Info_Order_By;
  webflow_artist_info_stream_cursor_input: Webflow_Artist_Info_Stream_Cursor_Input;
  webflow_artist_info_stream_cursor_value_input: Webflow_Artist_Info_Stream_Cursor_Value_Input;
  webflow_spectrum_articles: Webflow_Spectrum_Articles;
  webflow_spectrum_articles_bool_exp: Webflow_Spectrum_Articles_Bool_Exp;
  webflow_spectrum_articles_order_by: Webflow_Spectrum_Articles_Order_By;
  webflow_spectrum_articles_stream_cursor_input: Webflow_Spectrum_Articles_Stream_Cursor_Input;
  webflow_spectrum_articles_stream_cursor_value_input: Webflow_Spectrum_Articles_Stream_Cursor_Value_Input;
};

export type CachedDirectiveArgs = {
  refresh?: Scalars['Boolean'];
  ttl?: Scalars['Int'];
};

export type CachedDirectiveResolver<Result, Parent, ContextType = any, Args = CachedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthMessageOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthMessageOutput'] = ResolversParentTypes['AuthMessageOutput']> = {
  authMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticateOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticateOutput'] = ResolversParentTypes['AuthenticateOutput']> = {
  expiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenseaCollectionDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenseaCollectionData'] = ResolversParentTypes['OpenseaCollectionData']> = {
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistsResolvers<ContextType = any, ParentType extends ResolversParentTypes['artists'] = ResolversParentTypes['artists']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  is_ab_staff?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_curator?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  most_recent_hosted_project?: Resolver<Maybe<ResolversTypes['projects_metadata']>, ParentType, ContextType>;
  most_recent_hosted_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  most_recent_project?: Resolver<Maybe<ResolversTypes['projects_metadata']>, ParentType, ContextType>;
  most_recent_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, Partial<ArtistsProjectsArgs>>;
  projects_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, Partial<ArtistsProjects_AggregateArgs>>;
  public_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tos_accepted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  viewed_warning_banner?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Artists_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['artists_aggregate'] = ResolversParentTypes['artists_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['artists_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['artists']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Artists_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['artists_aggregate_fields'] = ResolversParentTypes['artists_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Artists_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['artists_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['artists_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Artists_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['artists_max_fields'] = ResolversParentTypes['artists_max_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  most_recent_hosted_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  most_recent_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  public_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tos_accepted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Artists_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['artists_min_fields'] = ResolversParentTypes['artists_min_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  most_recent_hosted_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  most_recent_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  public_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tos_accepted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigintScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['bigint'], any> {
  name: 'bigint';
}

export type CategoriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['categories'] = ResolversParentTypes['categories']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project_vertical_category?: Resolver<Maybe<ResolversTypes['project_vertical_categories']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contract_AllowlistingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contract_allowlistings'] = ResolversParentTypes['contract_allowlistings']> = {
  contract?: Resolver<Maybe<ResolversTypes['contracts_metadata']>, ParentType, ContextType>;
  contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  user_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contract_Type_NamesResolvers<ContextType = any, ParentType extends ResolversParentTypes['contract_type_names'] = ResolversParentTypes['contract_type_names']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contract_TypesResolvers<ContextType = any, ParentType extends ResolversParentTypes['contract_types'] = ResolversParentTypes['contract_types']> = {
  abi?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Contract_TypesAbiArgs>>;
  type?: Resolver<ResolversTypes['contract_type_names_enum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata'] = ResolversParentTypes['contracts_metadata']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  admin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  allowlisted_users?: Resolver<Array<ResolversTypes['contract_allowlistings']>, ParentType, ContextType, Partial<Contracts_MetadataAllowlisted_UsersArgs>>;
  bucket_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contract_type?: Resolver<ResolversTypes['contract_type_names_enum'], ParentType, ContextType>;
  curation_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  default_vertical?: Resolver<Maybe<ResolversTypes['project_verticals']>, ParentType, ContextType>;
  dependency_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  generator_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_filter?: Resolver<Maybe<ResolversTypes['minter_filters_metadata']>, ParentType, ContextType>;
  minter_filter_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  new_projects_forbidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  new_projects_forbidden_offchain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  new_projects_forbidden_onchain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  preferred_arweave_gateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_ipfs_gateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, Partial<Contracts_MetadataProjectsArgs>>;
  projects_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, Partial<Contracts_MetadataProjects_AggregateArgs>>;
  render_provider_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  render_provider_secondary_sales_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  token_base_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['contract_types']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_is_allowlisted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_aggregate'] = ResolversParentTypes['contracts_metadata_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['contracts_metadata_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['contracts_metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_aggregate_fields'] = ResolversParentTypes['contracts_metadata_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['contracts_metadata_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Contracts_Metadata_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['contracts_metadata_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['contracts_metadata_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['contracts_metadata_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['contracts_metadata_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['contracts_metadata_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['contracts_metadata_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['contracts_metadata_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['contracts_metadata_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['contracts_metadata_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_avg_fields'] = ResolversParentTypes['contracts_metadata_avg_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_max_fields'] = ResolversParentTypes['contracts_metadata_max_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bucket_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  curation_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  generator_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_filter_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_arweave_gateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_ipfs_gateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  render_provider_secondary_sales_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  token_base_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_min_fields'] = ResolversParentTypes['contracts_metadata_min_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bucket_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  curation_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  generator_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_filter_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_arweave_gateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_ipfs_gateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  render_provider_secondary_sales_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  token_base_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_stddev_fields'] = ResolversParentTypes['contracts_metadata_stddev_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_stddev_pop_fields'] = ResolversParentTypes['contracts_metadata_stddev_pop_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_stddev_samp_fields'] = ResolversParentTypes['contracts_metadata_stddev_samp_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_sum_fields'] = ResolversParentTypes['contracts_metadata_sum_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_var_pop_fields'] = ResolversParentTypes['contracts_metadata_var_pop_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_var_samp_fields'] = ResolversParentTypes['contracts_metadata_var_samp_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Contracts_Metadata_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['contracts_metadata_variance_fields'] = ResolversParentTypes['contracts_metadata_variance_fields']> = {
  render_provider_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_provider_secondary_sales_bps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependencies_MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependencies_metadata'] = ResolversParentTypes['dependencies_metadata']> = {
  additional_cdns?: Resolver<Array<ResolversTypes['dependency_additional_cdns']>, ParentType, ContextType, Partial<Dependencies_MetadataAdditional_CdnsArgs>>;
  additional_cdns_aggregate?: Resolver<ResolversTypes['dependency_additional_cdns_aggregate'], ParentType, ContextType, Partial<Dependencies_MetadataAdditional_Cdns_AggregateArgs>>;
  additional_repositories?: Resolver<Array<ResolversTypes['dependency_additional_repositories']>, ParentType, ContextType, Partial<Dependencies_MetadataAdditional_RepositoriesArgs>>;
  additional_repositories_aggregate?: Resolver<ResolversTypes['dependency_additional_repositories_aggregate'], ParentType, ContextType, Partial<Dependencies_MetadataAdditional_Repositories_AggregateArgs>>;
  dependency_registry?: Resolver<ResolversTypes['dependency_registries'], ParentType, ContextType>;
  dependency_registry_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferred_cdn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_repository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reference_website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scripts?: Resolver<Array<ResolversTypes['dependency_scripts']>, ParentType, ContextType, Partial<Dependencies_MetadataScriptsArgs>>;
  scripts_aggregate?: Resolver<ResolversTypes['dependency_scripts_aggregate'], ParentType, ContextType, Partial<Dependencies_MetadataScripts_AggregateArgs>>;
  type_and_version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  updated_onchain_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependencies_Metadata_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependencies_metadata_aggregate'] = ResolversParentTypes['dependencies_metadata_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['dependencies_metadata_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['dependencies_metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependencies_Metadata_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependencies_metadata_aggregate_fields'] = ResolversParentTypes['dependencies_metadata_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Dependencies_Metadata_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['dependencies_metadata_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['dependencies_metadata_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependencies_Metadata_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependencies_metadata_max_fields'] = ResolversParentTypes['dependencies_metadata_max_fields']> = {
  dependency_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_cdn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_repository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reference_website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  updated_onchain_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependencies_Metadata_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependencies_metadata_min_fields'] = ResolversParentTypes['dependencies_metadata_min_fields']> = {
  dependency_registry_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_cdn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferred_repository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reference_website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  updated_onchain_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_CdnsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns'] = ResolversParentTypes['dependency_additional_cdns']> = {
  cdn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dependency?: Resolver<ResolversTypes['dependencies_metadata'], ParentType, ContextType>;
  dependency_type_and_version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_aggregate'] = ResolversParentTypes['dependency_additional_cdns_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['dependency_additional_cdns']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_aggregate_fields'] = ResolversParentTypes['dependency_additional_cdns_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Dependency_Additional_Cdns_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_avg_fields'] = ResolversParentTypes['dependency_additional_cdns_avg_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_max_fields'] = ResolversParentTypes['dependency_additional_cdns_max_fields']> = {
  cdn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_min_fields'] = ResolversParentTypes['dependency_additional_cdns_min_fields']> = {
  cdn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_stddev_fields'] = ResolversParentTypes['dependency_additional_cdns_stddev_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_stddev_pop_fields'] = ResolversParentTypes['dependency_additional_cdns_stddev_pop_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_stddev_samp_fields'] = ResolversParentTypes['dependency_additional_cdns_stddev_samp_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_sum_fields'] = ResolversParentTypes['dependency_additional_cdns_sum_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_var_pop_fields'] = ResolversParentTypes['dependency_additional_cdns_var_pop_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_var_samp_fields'] = ResolversParentTypes['dependency_additional_cdns_var_samp_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Cdns_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_cdns_variance_fields'] = ResolversParentTypes['dependency_additional_cdns_variance_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_RepositoriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories'] = ResolversParentTypes['dependency_additional_repositories']> = {
  dependency?: Resolver<ResolversTypes['dependencies_metadata'], ParentType, ContextType>;
  dependency_type_and_version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_aggregate'] = ResolversParentTypes['dependency_additional_repositories_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['dependency_additional_repositories']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_aggregate_fields'] = ResolversParentTypes['dependency_additional_repositories_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Dependency_Additional_Repositories_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_avg_fields'] = ResolversParentTypes['dependency_additional_repositories_avg_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_max_fields'] = ResolversParentTypes['dependency_additional_repositories_max_fields']> = {
  dependency_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_min_fields'] = ResolversParentTypes['dependency_additional_repositories_min_fields']> = {
  dependency_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_stddev_fields'] = ResolversParentTypes['dependency_additional_repositories_stddev_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_stddev_pop_fields'] = ResolversParentTypes['dependency_additional_repositories_stddev_pop_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_stddev_samp_fields'] = ResolversParentTypes['dependency_additional_repositories_stddev_samp_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_sum_fields'] = ResolversParentTypes['dependency_additional_repositories_sum_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_var_pop_fields'] = ResolversParentTypes['dependency_additional_repositories_var_pop_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_var_samp_fields'] = ResolversParentTypes['dependency_additional_repositories_var_samp_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Additional_Repositories_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_additional_repositories_variance_fields'] = ResolversParentTypes['dependency_additional_repositories_variance_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_RegistriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_registries'] = ResolversParentTypes['dependency_registries']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dependencies?: Resolver<Array<ResolversTypes['dependencies_metadata']>, ParentType, ContextType, Partial<Dependency_RegistriesDependenciesArgs>>;
  dependencies_aggregate?: Resolver<ResolversTypes['dependencies_metadata_aggregate'], ParentType, ContextType, Partial<Dependency_RegistriesDependencies_AggregateArgs>>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  supported_core_contracts?: Resolver<Array<ResolversTypes['contracts_metadata']>, ParentType, ContextType, Partial<Dependency_RegistriesSupported_Core_ContractsArgs>>;
  supported_core_contracts_aggregate?: Resolver<ResolversTypes['contracts_metadata_aggregate'], ParentType, ContextType, Partial<Dependency_RegistriesSupported_Core_Contracts_AggregateArgs>>;
  updated_onchain_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Registries_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_registries_aggregate'] = ResolversParentTypes['dependency_registries_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['dependency_registries_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['dependency_registries']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Registries_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_registries_aggregate_fields'] = ResolversParentTypes['dependency_registries_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Dependency_Registries_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['dependency_registries_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['dependency_registries_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Registries_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_registries_max_fields'] = ResolversParentTypes['dependency_registries_max_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_onchain_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Registries_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_registries_min_fields'] = ResolversParentTypes['dependency_registries_min_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_onchain_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_ScriptsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts'] = ResolversParentTypes['dependency_scripts']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dependency_type_and_version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  script?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_aggregate'] = ResolversParentTypes['dependency_scripts_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['dependency_scripts_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['dependency_scripts']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_aggregate_fields'] = ResolversParentTypes['dependency_scripts_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['dependency_scripts_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Dependency_Scripts_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['dependency_scripts_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['dependency_scripts_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['dependency_scripts_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['dependency_scripts_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['dependency_scripts_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['dependency_scripts_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['dependency_scripts_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['dependency_scripts_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['dependency_scripts_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_avg_fields'] = ResolversParentTypes['dependency_scripts_avg_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_max_fields'] = ResolversParentTypes['dependency_scripts_max_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_min_fields'] = ResolversParentTypes['dependency_scripts_min_fields']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_stddev_fields'] = ResolversParentTypes['dependency_scripts_stddev_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_stddev_pop_fields'] = ResolversParentTypes['dependency_scripts_stddev_pop_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_stddev_samp_fields'] = ResolversParentTypes['dependency_scripts_stddev_samp_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_sum_fields'] = ResolversParentTypes['dependency_scripts_sum_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_var_pop_fields'] = ResolversParentTypes['dependency_scripts_var_pop_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_var_samp_fields'] = ResolversParentTypes['dependency_scripts_var_samp_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dependency_Scripts_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dependency_scripts_variance_fields'] = ResolversParentTypes['dependency_scripts_variance_fields']> = {
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Entity_TagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['entity_tags'] = ResolversParentTypes['entity_tags']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['projects_metadata']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['tags']>, ParentType, ContextType>;
  tag_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoritesResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites'] = ResolversParentTypes['favorites']> = {
  favorited_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorited_token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorited_user?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  favorited_user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project_metadata?: Resolver<Maybe<ResolversTypes['projects_metadata']>, ParentType, ContextType>;
  token_metadata?: Resolver<Maybe<ResolversTypes['tokens_metadata']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_public_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_aggregate'] = ResolversParentTypes['favorites_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['favorites_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['favorites']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_aggregate_fields'] = ResolversParentTypes['favorites_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['favorites_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Favorites_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['favorites_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['favorites_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['favorites_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['favorites_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['favorites_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['favorites_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['favorites_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['favorites_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['favorites_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_avg_fields'] = ResolversParentTypes['favorites_avg_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_max_fields'] = ResolversParentTypes['favorites_max_fields']> = {
  favorited_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorited_token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorited_user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_public_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_min_fields'] = ResolversParentTypes['favorites_min_fields']> = {
  favorited_project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorited_token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorited_user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_public_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_stddev_fields'] = ResolversParentTypes['favorites_stddev_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_stddev_pop_fields'] = ResolversParentTypes['favorites_stddev_pop_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_stddev_samp_fields'] = ResolversParentTypes['favorites_stddev_samp_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_sum_fields'] = ResolversParentTypes['favorites_sum_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_var_pop_fields'] = ResolversParentTypes['favorites_var_pop_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_var_samp_fields'] = ResolversParentTypes['favorites_var_samp_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Favorites_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['favorites_variance_fields'] = ResolversParentTypes['favorites_variance_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Feature_FlagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['feature_flags'] = ResolversParentTypes['feature_flags']> = {
  flag_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  globally_enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Float8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['float8'], any> {
  name: 'float8';
}

export interface JsonbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['jsonb'], any> {
  name: 'jsonb';
}

export interface JsonpathScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['jsonpath'], any> {
  name: 'jsonpath';
}

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['media'] = ResolversParentTypes['media']> = {
  bucket_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file_path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<MediaMetadataArgs>>;
  owner_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Minter_Filters_MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['minter_filters_metadata'] = ResolversParentTypes['minter_filters_metadata']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  allowed_minters?: Resolver<Array<ResolversTypes['minters_metadata']>, ParentType, ContextType, Partial<Minter_Filters_MetadataAllowed_MintersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Minter_TypesResolvers<ContextType = any, ParentType extends ResolversParentTypes['minter_types'] = ResolversParentTypes['minter_types']> = {
  description_template?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['minter_type_names_enum'], ParentType, ContextType>;
  unversioned_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Minters_MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['minters_metadata'] = ResolversParentTypes['minters_metadata']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  core_contract?: Resolver<Maybe<ResolversTypes['contracts_metadata']>, ParentType, ContextType>;
  core_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extra_minter_details?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Minters_MetadataExtra_Minter_DetailsArgs>>;
  maximum_price_decay_half_life_in_seconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minimum_auction_length_in_seconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minimum_price_decay_half_life_in_seconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minter_filter?: Resolver<Maybe<ResolversTypes['minter_filters_metadata']>, ParentType, ContextType>;
  minter_filter_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  minter_type?: Resolver<ResolversTypes['minter_type_names_enum'], ParentType, ContextType>;
  receipts?: Resolver<Array<ResolversTypes['receipt_metadata']>, ParentType, ContextType, Partial<Minters_MetadataReceiptsArgs>>;
  receipts_aggregate?: Resolver<ResolversTypes['receipt_metadata_aggregate'], ParentType, ContextType, Partial<Minters_MetadataReceipts_AggregateArgs>>;
  type?: Resolver<Maybe<ResolversTypes['minter_types']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Mutation_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['mutation_root'] = ResolversParentTypes['mutation_root']> = {
  authenticate?: Resolver<Maybe<ResolversTypes['AuthenticateOutput']>, ParentType, ContextType, RequireFields<Mutation_RootAuthenticateArgs, 'input'>>;
};

export interface NumericScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['numeric'], any> {
  name: 'numeric';
}

export type Project_External_Asset_DependenciesResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_external_asset_dependencies'] = ResolversParentTypes['project_external_asset_dependencies']> = {
  bytecode_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency_type?: Resolver<ResolversTypes['project_external_asset_dependency_types_enum'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects_metadata'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Minter_ConfigurationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_minter_configurations'] = ResolversParentTypes['project_minter_configurations']> = {
  approximate_exp_da_end_time?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  base_price?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency_symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  end_time?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  extra_minter_details?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Project_Minter_ConfigurationsExtra_Minter_DetailsArgs>>;
  half_life_in_seconds?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minter?: Resolver<Maybe<ResolversTypes['minters_metadata']>, ParentType, ContextType>;
  minter_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offchain_extra_minter_details?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Project_Minter_ConfigurationsOffchain_Extra_Minter_DetailsArgs>>;
  price_is_configured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['projects_metadata']>, ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  purchase_to_disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  start_price?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start_time?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_ScriptsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_scripts'] = ResolversParentTypes['project_scripts']> = {
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['projects_metadata']>, ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  script?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_SeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series'] = ResolversParentTypes['project_series']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, Partial<Project_SeriesProjectsArgs>>;
  projects_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, Partial<Project_SeriesProjects_AggregateArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_aggregate'] = ResolversParentTypes['project_series_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['project_series_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['project_series']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_aggregate_fields'] = ResolversParentTypes['project_series_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['project_series_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Project_Series_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['project_series_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['project_series_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['project_series_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['project_series_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['project_series_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['project_series_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['project_series_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['project_series_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['project_series_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_avg_fields'] = ResolversParentTypes['project_series_avg_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_max_fields'] = ResolversParentTypes['project_series_max_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_min_fields'] = ResolversParentTypes['project_series_min_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_stddev_fields'] = ResolversParentTypes['project_series_stddev_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_stddev_pop_fields'] = ResolversParentTypes['project_series_stddev_pop_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_stddev_samp_fields'] = ResolversParentTypes['project_series_stddev_samp_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_sum_fields'] = ResolversParentTypes['project_series_sum_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_var_pop_fields'] = ResolversParentTypes['project_series_var_pop_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_var_samp_fields'] = ResolversParentTypes['project_series_var_samp_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Series_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_series_variance_fields'] = ResolversParentTypes['project_series_variance_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_Vertical_CategoriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_vertical_categories'] = ResolversParentTypes['project_vertical_categories']> = {
  category?: Resolver<ResolversTypes['categories'], ParentType, ContextType>;
  hosted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['categories_enum'], ParentType, ContextType>;
  verticals?: Resolver<Array<ResolversTypes['project_verticals']>, ParentType, ContextType, Partial<Project_Vertical_CategoriesVerticalsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Project_VerticalsResolvers<ContextType = any, ParentType extends ResolversParentTypes['project_verticals'] = ResolversParentTypes['project_verticals']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['project_vertical_categories'], ParentType, ContextType>;
  category_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  display_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['verticals_enum'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, Partial<Project_VerticalsProjectsArgs>>;
  projects_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, Partial<Project_VerticalsProjects_AggregateArgs>>;
  vertical?: Resolver<ResolversTypes['verticals'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_FeaturesResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_features'] = ResolversParentTypes['projects_features']> = {
  enable_artist_update_after_completion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  feature_fields?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Projects_FeaturesFeature_FieldsArgs>>;
  feature_fields_counts?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Projects_FeaturesFeature_Fields_CountsArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects_metadata'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata'] = ResolversParentTypes['projects_metadata']> = {
  activated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  additional_payee?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  additional_payee_secondary_sales_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  artist_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  artist_display_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_featured_token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_interview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  base_uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  charitable_giving_details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completed_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  contract?: Resolver<ResolversTypes['contracts_metadata'], ParentType, ContextType>;
  contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creative_credit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  curation_status?: Resolver<ResolversTypes['curation_statuses_enum'], ParentType, ContextType>;
  curation_status_display?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  curation_status_override?: Resolver<Maybe<ResolversTypes['curation_statuses_enum']>, ParentType, ContextType>;
  currency_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currency_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependency?: Resolver<Maybe<ResolversTypes['dependencies_metadata']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disable_auto_image_format?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  disable_sample_generator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  display_static?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  external_asset_dependencies?: Resolver<Array<ResolversTypes['project_external_asset_dependencies']>, ParentType, ContextType, Partial<Projects_MetadataExternal_Asset_DependenciesArgs>>;
  external_asset_dependencies_locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  external_asset_dependency_count?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  favorited_by_user?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['favorites']>, ParentType, ContextType, Partial<Projects_MetadataFavoritesArgs>>;
  favorites_aggregate?: Resolver<ResolversTypes['favorites_aggregate'], ParentType, ContextType, Partial<Projects_MetadataFavorites_AggregateArgs>>;
  featured_token?: Resolver<Maybe<Array<ResolversTypes['tokens_metadata']>>, ParentType, ContextType, RequireFields<Projects_MetadataFeatured_TokenArgs, 'args'>>;
  features?: Resolver<Maybe<ResolversTypes['projects_features']>, ParentType, ContextType>;
  first_token_minted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  generate_video_assets?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  heritage_curation_status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  invocations?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  ipfs_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  is_artblocks?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link_to_license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lowest_listing?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  max_invocations?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minter_configuration?: Resolver<Maybe<ResolversTypes['project_minter_configurations']>, ParentType, ContextType>;
  minter_configuration_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paused?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  preview_render_type?: Resolver<ResolversTypes['render_types_enum'], ParentType, ContextType>;
  price_per_token_in_wei?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primary_render_type?: Resolver<ResolversTypes['render_types_enum'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proposed_artist_addresses_and_split?: Resolver<Maybe<ResolversTypes['proposed_artist_addresses_and_splits']>, ParentType, ContextType>;
  proposed_artists_and_splits_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receipts?: Resolver<Array<ResolversTypes['receipt_metadata']>, ParentType, ContextType, Partial<Projects_MetadataReceiptsArgs>>;
  receipts_aggregate?: Resolver<ResolversTypes['receipt_metadata_aggregate'], ParentType, ContextType, Partial<Projects_MetadataReceipts_AggregateArgs>>;
  render_complete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  render_with_gpu?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sales_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script_count?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  script_json?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Projects_MetadataScript_JsonArgs>>;
  script_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scripts?: Resolver<Array<ResolversTypes['project_scripts']>, ParentType, ContextType, Partial<Projects_MetadataScriptsArgs>>;
  second_token_minted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['project_series']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  start_datetime?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['entity_tags']>, ParentType, ContextType, Partial<Projects_MetadataTagsArgs>>;
  tokens?: Resolver<Array<ResolversTypes['tokens_metadata']>, ParentType, ContextType, Partial<Projects_MetadataTokensArgs>>;
  tokens_aggregate?: Resolver<ResolversTypes['tokens_metadata_aggregate'], ParentType, ContextType, Partial<Projects_MetadataTokens_AggregateArgs>>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_is_artist?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vertical?: Resolver<ResolversTypes['project_verticals'], ParentType, ContextType>;
  vertical_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_aggregate'] = ResolversParentTypes['projects_metadata_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['projects_metadata_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_aggregate_fields'] = ResolversParentTypes['projects_metadata_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['projects_metadata_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Projects_Metadata_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['projects_metadata_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['projects_metadata_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['projects_metadata_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['projects_metadata_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['projects_metadata_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['projects_metadata_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['projects_metadata_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['projects_metadata_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['projects_metadata_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_avg_fields'] = ResolversParentTypes['projects_metadata_avg_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_max_fields'] = ResolversParentTypes['projects_metadata_max_fields']> = {
  activated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  additional_payee?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  additional_payee_secondary_sales_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artist_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_display_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_featured_token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_interview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  base_uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  charitable_giving_details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completed_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  contract_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creative_credit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currency_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ipfs_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link_to_license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minter_configuration_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price_per_token_in_wei?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proposed_artists_and_splits_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sales_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  start_datetime?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  vertical_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_min_fields'] = ResolversParentTypes['projects_metadata_min_fields']> = {
  activated_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  additional_payee?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  additional_payee_secondary_sales_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artist_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_display_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_featured_token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_interview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artist_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  base_uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  charitable_giving_details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completed_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  contract_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creative_credit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currency_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ipfs_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link_to_license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minter_configuration_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price_per_token_in_wei?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proposed_artists_and_splits_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sales_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script_type_and_version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  start_datetime?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  vertical_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_stddev_fields'] = ResolversParentTypes['projects_metadata_stddev_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_stddev_pop_fields'] = ResolversParentTypes['projects_metadata_stddev_pop_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_stddev_samp_fields'] = ResolversParentTypes['projects_metadata_stddev_samp_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_sum_fields'] = ResolversParentTypes['projects_metadata_sum_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_var_pop_fields'] = ResolversParentTypes['projects_metadata_var_pop_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_var_samp_fields'] = ResolversParentTypes['projects_metadata_var_samp_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Projects_Metadata_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['projects_metadata_variance_fields'] = ResolversParentTypes['projects_metadata_variance_fields']> = {
  additional_payee_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency_decimals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_invocations?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  royalty_percentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  series_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_fps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_render_delay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Proposed_Artist_Addresses_And_SplitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['proposed_artist_addresses_and_splits'] = ResolversParentTypes['proposed_artist_addresses_and_splits']> = {
  additional_payee_primary_sales?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  additional_payee_primary_sales_percentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  additional_payee_secondary_sales?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  additional_payee_secondary_sales_percentage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  artist_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects_metadata'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Query_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['query_root'] = ResolversParentTypes['query_root']> = {
  artists?: Resolver<Array<ResolversTypes['artists']>, ParentType, ContextType, Partial<Query_RootArtistsArgs>>;
  artists_aggregate?: Resolver<ResolversTypes['artists_aggregate'], ParentType, ContextType, Partial<Query_RootArtists_AggregateArgs>>;
  categories?: Resolver<Array<ResolversTypes['categories']>, ParentType, ContextType, Partial<Query_RootCategoriesArgs>>;
  categories_by_pk?: Resolver<Maybe<ResolversTypes['categories']>, ParentType, ContextType, RequireFields<Query_RootCategories_By_PkArgs, 'name'>>;
  contract_allowlistings?: Resolver<Array<ResolversTypes['contract_allowlistings']>, ParentType, ContextType, Partial<Query_RootContract_AllowlistingsArgs>>;
  contract_allowlistings_by_pk?: Resolver<Maybe<ResolversTypes['contract_allowlistings']>, ParentType, ContextType, RequireFields<Query_RootContract_Allowlistings_By_PkArgs, 'contract_address' | 'user_address'>>;
  contract_type_names?: Resolver<Array<ResolversTypes['contract_type_names']>, ParentType, ContextType, Partial<Query_RootContract_Type_NamesArgs>>;
  contract_type_names_by_pk?: Resolver<Maybe<ResolversTypes['contract_type_names']>, ParentType, ContextType, RequireFields<Query_RootContract_Type_Names_By_PkArgs, 'name'>>;
  contract_types?: Resolver<Array<ResolversTypes['contract_types']>, ParentType, ContextType, Partial<Query_RootContract_TypesArgs>>;
  contract_types_by_pk?: Resolver<Maybe<ResolversTypes['contract_types']>, ParentType, ContextType, RequireFields<Query_RootContract_Types_By_PkArgs, 'type'>>;
  contracts_metadata?: Resolver<Array<ResolversTypes['contracts_metadata']>, ParentType, ContextType, Partial<Query_RootContracts_MetadataArgs>>;
  contracts_metadata_aggregate?: Resolver<ResolversTypes['contracts_metadata_aggregate'], ParentType, ContextType, Partial<Query_RootContracts_Metadata_AggregateArgs>>;
  contracts_metadata_by_pk?: Resolver<Maybe<ResolversTypes['contracts_metadata']>, ParentType, ContextType, RequireFields<Query_RootContracts_Metadata_By_PkArgs, 'address'>>;
  dependencies_metadata?: Resolver<Array<ResolversTypes['dependencies_metadata']>, ParentType, ContextType, Partial<Query_RootDependencies_MetadataArgs>>;
  dependencies_metadata_aggregate?: Resolver<ResolversTypes['dependencies_metadata_aggregate'], ParentType, ContextType, Partial<Query_RootDependencies_Metadata_AggregateArgs>>;
  dependencies_metadata_by_pk?: Resolver<Maybe<ResolversTypes['dependencies_metadata']>, ParentType, ContextType, RequireFields<Query_RootDependencies_Metadata_By_PkArgs, 'type_and_version'>>;
  dependency_additional_cdns?: Resolver<Array<ResolversTypes['dependency_additional_cdns']>, ParentType, ContextType, Partial<Query_RootDependency_Additional_CdnsArgs>>;
  dependency_additional_cdns_aggregate?: Resolver<ResolversTypes['dependency_additional_cdns_aggregate'], ParentType, ContextType, Partial<Query_RootDependency_Additional_Cdns_AggregateArgs>>;
  dependency_additional_cdns_by_pk?: Resolver<Maybe<ResolversTypes['dependency_additional_cdns']>, ParentType, ContextType, RequireFields<Query_RootDependency_Additional_Cdns_By_PkArgs, 'dependency_type_and_version' | 'index'>>;
  dependency_additional_repositories?: Resolver<Array<ResolversTypes['dependency_additional_repositories']>, ParentType, ContextType, Partial<Query_RootDependency_Additional_RepositoriesArgs>>;
  dependency_additional_repositories_aggregate?: Resolver<ResolversTypes['dependency_additional_repositories_aggregate'], ParentType, ContextType, Partial<Query_RootDependency_Additional_Repositories_AggregateArgs>>;
  dependency_additional_repositories_by_pk?: Resolver<Maybe<ResolversTypes['dependency_additional_repositories']>, ParentType, ContextType, RequireFields<Query_RootDependency_Additional_Repositories_By_PkArgs, 'dependency_type_and_version' | 'index'>>;
  dependency_registries?: Resolver<Array<ResolversTypes['dependency_registries']>, ParentType, ContextType, Partial<Query_RootDependency_RegistriesArgs>>;
  dependency_registries_aggregate?: Resolver<ResolversTypes['dependency_registries_aggregate'], ParentType, ContextType, Partial<Query_RootDependency_Registries_AggregateArgs>>;
  dependency_registries_by_pk?: Resolver<Maybe<ResolversTypes['dependency_registries']>, ParentType, ContextType, RequireFields<Query_RootDependency_Registries_By_PkArgs, 'address'>>;
  dependency_scripts?: Resolver<Array<ResolversTypes['dependency_scripts']>, ParentType, ContextType, Partial<Query_RootDependency_ScriptsArgs>>;
  dependency_scripts_aggregate?: Resolver<ResolversTypes['dependency_scripts_aggregate'], ParentType, ContextType, Partial<Query_RootDependency_Scripts_AggregateArgs>>;
  dependency_scripts_by_pk?: Resolver<Maybe<ResolversTypes['dependency_scripts']>, ParentType, ContextType, RequireFields<Query_RootDependency_Scripts_By_PkArgs, 'dependency_type_and_version' | 'index'>>;
  entity_tags?: Resolver<Array<ResolversTypes['entity_tags']>, ParentType, ContextType, Partial<Query_RootEntity_TagsArgs>>;
  entity_tags_by_pk?: Resolver<Maybe<ResolversTypes['entity_tags']>, ParentType, ContextType, RequireFields<Query_RootEntity_Tags_By_PkArgs, 'id'>>;
  favorites?: Resolver<Array<ResolversTypes['favorites']>, ParentType, ContextType, Partial<Query_RootFavoritesArgs>>;
  favorites_aggregate?: Resolver<ResolversTypes['favorites_aggregate'], ParentType, ContextType, Partial<Query_RootFavorites_AggregateArgs>>;
  favorites_by_pk?: Resolver<Maybe<ResolversTypes['favorites']>, ParentType, ContextType, RequireFields<Query_RootFavorites_By_PkArgs, 'id'>>;
  feature_flags?: Resolver<Array<ResolversTypes['feature_flags']>, ParentType, ContextType, Partial<Query_RootFeature_FlagsArgs>>;
  feature_flags_by_pk?: Resolver<Maybe<ResolversTypes['feature_flags']>, ParentType, ContextType, RequireFields<Query_RootFeature_Flags_By_PkArgs, 'flag_name'>>;
  filter_tokens_metadata_by_features?: Resolver<Array<ResolversTypes['tokens_metadata']>, ParentType, ContextType, RequireFields<Query_RootFilter_Tokens_Metadata_By_FeaturesArgs, 'args'>>;
  filter_tokens_metadata_by_features_aggregate?: Resolver<ResolversTypes['tokens_metadata_aggregate'], ParentType, ContextType, RequireFields<Query_RootFilter_Tokens_Metadata_By_Features_AggregateArgs, 'args'>>;
  getAuthMessage?: Resolver<Maybe<ResolversTypes['AuthMessageOutput']>, ParentType, ContextType, RequireFields<Query_RootGetAuthMessageArgs, 'publicAddress'>>;
  getOpenseaCollectionURL?: Resolver<Maybe<ResolversTypes['OpenseaCollectionData']>, ParentType, ContextType, RequireFields<Query_RootGetOpenseaCollectionUrlArgs, 'contractAddress' | 'projectId'>>;
  isTokenFlagged?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<Query_RootIsTokenFlaggedArgs, 'contractAddress' | 'tokenId'>>;
  list_projects_metadata_random?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, RequireFields<Query_RootList_Projects_Metadata_RandomArgs, 'args'>>;
  list_projects_metadata_random_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, RequireFields<Query_RootList_Projects_Metadata_Random_AggregateArgs, 'args'>>;
  media?: Resolver<Array<ResolversTypes['media']>, ParentType, ContextType, Partial<Query_RootMediaArgs>>;
  media_by_pk?: Resolver<Maybe<ResolversTypes['media']>, ParentType, ContextType, RequireFields<Query_RootMedia_By_PkArgs, 'id'>>;
  minter_filters_metadata?: Resolver<Array<ResolversTypes['minter_filters_metadata']>, ParentType, ContextType, Partial<Query_RootMinter_Filters_MetadataArgs>>;
  minter_filters_metadata_by_pk?: Resolver<Maybe<ResolversTypes['minter_filters_metadata']>, ParentType, ContextType, RequireFields<Query_RootMinter_Filters_Metadata_By_PkArgs, 'address'>>;
  minter_types?: Resolver<Array<ResolversTypes['minter_types']>, ParentType, ContextType, Partial<Query_RootMinter_TypesArgs>>;
  minter_types_by_pk?: Resolver<Maybe<ResolversTypes['minter_types']>, ParentType, ContextType, RequireFields<Query_RootMinter_Types_By_PkArgs, 'type'>>;
  minters_metadata?: Resolver<Array<ResolversTypes['minters_metadata']>, ParentType, ContextType, Partial<Query_RootMinters_MetadataArgs>>;
  minters_metadata_by_pk?: Resolver<Maybe<ResolversTypes['minters_metadata']>, ParentType, ContextType, RequireFields<Query_RootMinters_Metadata_By_PkArgs, 'address'>>;
  project_external_asset_dependencies?: Resolver<Array<ResolversTypes['project_external_asset_dependencies']>, ParentType, ContextType, Partial<Query_RootProject_External_Asset_DependenciesArgs>>;
  project_external_asset_dependencies_by_pk?: Resolver<Maybe<ResolversTypes['project_external_asset_dependencies']>, ParentType, ContextType, RequireFields<Query_RootProject_External_Asset_Dependencies_By_PkArgs, 'index' | 'project_id'>>;
  project_minter_configurations?: Resolver<Array<ResolversTypes['project_minter_configurations']>, ParentType, ContextType, Partial<Query_RootProject_Minter_ConfigurationsArgs>>;
  project_minter_configurations_by_pk?: Resolver<Maybe<ResolversTypes['project_minter_configurations']>, ParentType, ContextType, RequireFields<Query_RootProject_Minter_Configurations_By_PkArgs, 'id'>>;
  project_scripts?: Resolver<Array<ResolversTypes['project_scripts']>, ParentType, ContextType, Partial<Query_RootProject_ScriptsArgs>>;
  project_scripts_by_pk?: Resolver<Maybe<ResolversTypes['project_scripts']>, ParentType, ContextType, RequireFields<Query_RootProject_Scripts_By_PkArgs, 'index' | 'project_id'>>;
  project_series?: Resolver<Array<ResolversTypes['project_series']>, ParentType, ContextType, Partial<Query_RootProject_SeriesArgs>>;
  project_series_aggregate?: Resolver<ResolversTypes['project_series_aggregate'], ParentType, ContextType, Partial<Query_RootProject_Series_AggregateArgs>>;
  project_series_by_pk?: Resolver<Maybe<ResolversTypes['project_series']>, ParentType, ContextType, RequireFields<Query_RootProject_Series_By_PkArgs, 'id'>>;
  project_vertical_categories?: Resolver<Array<ResolversTypes['project_vertical_categories']>, ParentType, ContextType, Partial<Query_RootProject_Vertical_CategoriesArgs>>;
  project_vertical_categories_by_pk?: Resolver<Maybe<ResolversTypes['project_vertical_categories']>, ParentType, ContextType, RequireFields<Query_RootProject_Vertical_Categories_By_PkArgs, 'name'>>;
  project_verticals?: Resolver<Array<ResolversTypes['project_verticals']>, ParentType, ContextType, Partial<Query_RootProject_VerticalsArgs>>;
  project_verticals_by_pk?: Resolver<Maybe<ResolversTypes['project_verticals']>, ParentType, ContextType, RequireFields<Query_RootProject_Verticals_By_PkArgs, 'name'>>;
  projects_features?: Resolver<Array<ResolversTypes['projects_features']>, ParentType, ContextType, Partial<Query_RootProjects_FeaturesArgs>>;
  projects_features_by_pk?: Resolver<Maybe<ResolversTypes['projects_features']>, ParentType, ContextType, RequireFields<Query_RootProjects_Features_By_PkArgs, 'id'>>;
  projects_metadata?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, Partial<Query_RootProjects_MetadataArgs>>;
  projects_metadata_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, Partial<Query_RootProjects_Metadata_AggregateArgs>>;
  projects_metadata_by_pk?: Resolver<Maybe<ResolversTypes['projects_metadata']>, ParentType, ContextType, RequireFields<Query_RootProjects_Metadata_By_PkArgs, 'id'>>;
  proposed_artist_addresses_and_splits?: Resolver<Array<ResolversTypes['proposed_artist_addresses_and_splits']>, ParentType, ContextType, Partial<Query_RootProposed_Artist_Addresses_And_SplitsArgs>>;
  proposed_artist_addresses_and_splits_by_pk?: Resolver<Maybe<ResolversTypes['proposed_artist_addresses_and_splits']>, ParentType, ContextType, RequireFields<Query_RootProposed_Artist_Addresses_And_Splits_By_PkArgs, 'project_id'>>;
  receipt_metadata?: Resolver<Array<ResolversTypes['receipt_metadata']>, ParentType, ContextType, Partial<Query_RootReceipt_MetadataArgs>>;
  receipt_metadata_aggregate?: Resolver<ResolversTypes['receipt_metadata_aggregate'], ParentType, ContextType, Partial<Query_RootReceipt_Metadata_AggregateArgs>>;
  receipt_metadata_by_pk?: Resolver<Maybe<ResolversTypes['receipt_metadata']>, ParentType, ContextType, RequireFields<Query_RootReceipt_Metadata_By_PkArgs, 'id'>>;
  render_types?: Resolver<Array<ResolversTypes['render_types']>, ParentType, ContextType, Partial<Query_RootRender_TypesArgs>>;
  render_types_by_pk?: Resolver<Maybe<ResolversTypes['render_types']>, ParentType, ContextType, RequireFields<Query_RootRender_Types_By_PkArgs, 'value'>>;
  search_projects?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, RequireFields<Query_RootSearch_ProjectsArgs, 'args'>>;
  search_projects_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, RequireFields<Query_RootSearch_Projects_AggregateArgs, 'args'>>;
  search_tags?: Resolver<Array<ResolversTypes['tags']>, ParentType, ContextType, RequireFields<Query_RootSearch_TagsArgs, 'args'>>;
  search_tokens?: Resolver<Array<ResolversTypes['tokens_metadata']>, ParentType, ContextType, RequireFields<Query_RootSearch_TokensArgs, 'args'>>;
  search_tokens_aggregate?: Resolver<ResolversTypes['tokens_metadata_aggregate'], ParentType, ContextType, RequireFields<Query_RootSearch_Tokens_AggregateArgs, 'args'>>;
  search_users?: Resolver<Array<ResolversTypes['user_profiles']>, ParentType, ContextType, RequireFields<Query_RootSearch_UsersArgs, 'args'>>;
  search_users_aggregate?: Resolver<ResolversTypes['user_profiles_aggregate'], ParentType, ContextType, RequireFields<Query_RootSearch_Users_AggregateArgs, 'args'>>;
  tags?: Resolver<Array<ResolversTypes['tags']>, ParentType, ContextType, Partial<Query_RootTagsArgs>>;
  tags_by_pk?: Resolver<Maybe<ResolversTypes['tags']>, ParentType, ContextType, RequireFields<Query_RootTags_By_PkArgs, 'name'>>;
  tokens_metadata?: Resolver<Array<ResolversTypes['tokens_metadata']>, ParentType, ContextType, Partial<Query_RootTokens_MetadataArgs>>;
  tokens_metadata_aggregate?: Resolver<ResolversTypes['tokens_metadata_aggregate'], ParentType, ContextType, Partial<Query_RootTokens_Metadata_AggregateArgs>>;
  tokens_metadata_by_pk?: Resolver<Maybe<ResolversTypes['tokens_metadata']>, ParentType, ContextType, RequireFields<Query_RootTokens_Metadata_By_PkArgs, 'id'>>;
  user_profiles?: Resolver<Array<ResolversTypes['user_profiles']>, ParentType, ContextType, Partial<Query_RootUser_ProfilesArgs>>;
  user_profiles_aggregate?: Resolver<ResolversTypes['user_profiles_aggregate'], ParentType, ContextType, Partial<Query_RootUser_Profiles_AggregateArgs>>;
  user_profiles_by_pk?: Resolver<Maybe<ResolversTypes['user_profiles']>, ParentType, ContextType, RequireFields<Query_RootUser_Profiles_By_PkArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType, Partial<Query_RootUsersArgs>>;
  users_aggregate?: Resolver<ResolversTypes['users_aggregate'], ParentType, ContextType, Partial<Query_RootUsers_AggregateArgs>>;
  users_by_pk?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Query_RootUsers_By_PkArgs, 'public_address'>>;
  verticals?: Resolver<Array<ResolversTypes['verticals']>, ParentType, ContextType, Partial<Query_RootVerticalsArgs>>;
  verticals_by_pk?: Resolver<Maybe<ResolversTypes['verticals']>, ParentType, ContextType, RequireFields<Query_RootVerticals_By_PkArgs, 'name'>>;
  video_aspect_ratios?: Resolver<Array<ResolversTypes['video_aspect_ratios']>, ParentType, ContextType, Partial<Query_RootVideo_Aspect_RatiosArgs>>;
  video_aspect_ratios_by_pk?: Resolver<Maybe<ResolversTypes['video_aspect_ratios']>, ParentType, ContextType, RequireFields<Query_RootVideo_Aspect_Ratios_By_PkArgs, 'value'>>;
  video_frame_rates?: Resolver<Array<ResolversTypes['video_frame_rates']>, ParentType, ContextType, Partial<Query_RootVideo_Frame_RatesArgs>>;
  video_frame_rates_by_pk?: Resolver<Maybe<ResolversTypes['video_frame_rates']>, ParentType, ContextType, RequireFields<Query_RootVideo_Frame_Rates_By_PkArgs, 'value'>>;
  webflow_artist_info?: Resolver<Array<ResolversTypes['webflow_artist_info']>, ParentType, ContextType, Partial<Query_RootWebflow_Artist_InfoArgs>>;
  webflow_artist_info_by_pk?: Resolver<Maybe<ResolversTypes['webflow_artist_info']>, ParentType, ContextType, RequireFields<Query_RootWebflow_Artist_Info_By_PkArgs, 'webflow_item_id'>>;
  webflow_spectrum_articles?: Resolver<Array<ResolversTypes['webflow_spectrum_articles']>, ParentType, ContextType, Partial<Query_RootWebflow_Spectrum_ArticlesArgs>>;
  webflow_spectrum_articles_by_pk?: Resolver<Maybe<ResolversTypes['webflow_spectrum_articles']>, ParentType, ContextType, RequireFields<Query_RootWebflow_Spectrum_Articles_By_PkArgs, 'webflow_item_id'>>;
};

export type Receipt_MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['receipt_metadata'] = ResolversParentTypes['receipt_metadata']> = {
  excess_settlement_funds?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  minter?: Resolver<ResolversTypes['minters_metadata'], ParentType, ContextType>;
  minter_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  net_posted?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  num_purchased?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects_metadata'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Receipt_Metadata_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['receipt_metadata_aggregate'] = ResolversParentTypes['receipt_metadata_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['receipt_metadata_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['receipt_metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Receipt_Metadata_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['receipt_metadata_aggregate_fields'] = ResolversParentTypes['receipt_metadata_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Receipt_Metadata_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['receipt_metadata_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['receipt_metadata_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Receipt_Metadata_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['receipt_metadata_max_fields'] = ResolversParentTypes['receipt_metadata_max_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  net_posted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  num_purchased?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Receipt_Metadata_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['receipt_metadata_min_fields'] = ResolversParentTypes['receipt_metadata_min_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minter_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  net_posted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  num_purchased?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Render_TypesResolvers<ContextType = any, ParentType extends ResolversParentTypes['render_types'] = ResolversParentTypes['render_types']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Seed_FloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['seed_float'], any> {
  name: 'seed_float';
}

export type Subscription_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['subscription_root'] = ResolversParentTypes['subscription_root']> = {
  artists?: SubscriptionResolver<Array<ResolversTypes['artists']>, "artists", ParentType, ContextType, Partial<Subscription_RootArtistsArgs>>;
  artists_aggregate?: SubscriptionResolver<ResolversTypes['artists_aggregate'], "artists_aggregate", ParentType, ContextType, Partial<Subscription_RootArtists_AggregateArgs>>;
  artists_stream?: SubscriptionResolver<Array<ResolversTypes['artists']>, "artists_stream", ParentType, ContextType, RequireFields<Subscription_RootArtists_StreamArgs, 'batch_size' | 'cursor'>>;
  categories?: SubscriptionResolver<Array<ResolversTypes['categories']>, "categories", ParentType, ContextType, Partial<Subscription_RootCategoriesArgs>>;
  categories_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['categories']>, "categories_by_pk", ParentType, ContextType, RequireFields<Subscription_RootCategories_By_PkArgs, 'name'>>;
  categories_stream?: SubscriptionResolver<Array<ResolversTypes['categories']>, "categories_stream", ParentType, ContextType, RequireFields<Subscription_RootCategories_StreamArgs, 'batch_size' | 'cursor'>>;
  contract_allowlistings?: SubscriptionResolver<Array<ResolversTypes['contract_allowlistings']>, "contract_allowlistings", ParentType, ContextType, Partial<Subscription_RootContract_AllowlistingsArgs>>;
  contract_allowlistings_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['contract_allowlistings']>, "contract_allowlistings_by_pk", ParentType, ContextType, RequireFields<Subscription_RootContract_Allowlistings_By_PkArgs, 'contract_address' | 'user_address'>>;
  contract_allowlistings_stream?: SubscriptionResolver<Array<ResolversTypes['contract_allowlistings']>, "contract_allowlistings_stream", ParentType, ContextType, RequireFields<Subscription_RootContract_Allowlistings_StreamArgs, 'batch_size' | 'cursor'>>;
  contract_type_names?: SubscriptionResolver<Array<ResolversTypes['contract_type_names']>, "contract_type_names", ParentType, ContextType, Partial<Subscription_RootContract_Type_NamesArgs>>;
  contract_type_names_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['contract_type_names']>, "contract_type_names_by_pk", ParentType, ContextType, RequireFields<Subscription_RootContract_Type_Names_By_PkArgs, 'name'>>;
  contract_type_names_stream?: SubscriptionResolver<Array<ResolversTypes['contract_type_names']>, "contract_type_names_stream", ParentType, ContextType, RequireFields<Subscription_RootContract_Type_Names_StreamArgs, 'batch_size' | 'cursor'>>;
  contract_types?: SubscriptionResolver<Array<ResolversTypes['contract_types']>, "contract_types", ParentType, ContextType, Partial<Subscription_RootContract_TypesArgs>>;
  contract_types_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['contract_types']>, "contract_types_by_pk", ParentType, ContextType, RequireFields<Subscription_RootContract_Types_By_PkArgs, 'type'>>;
  contract_types_stream?: SubscriptionResolver<Array<ResolversTypes['contract_types']>, "contract_types_stream", ParentType, ContextType, RequireFields<Subscription_RootContract_Types_StreamArgs, 'batch_size' | 'cursor'>>;
  contracts_metadata?: SubscriptionResolver<Array<ResolversTypes['contracts_metadata']>, "contracts_metadata", ParentType, ContextType, Partial<Subscription_RootContracts_MetadataArgs>>;
  contracts_metadata_aggregate?: SubscriptionResolver<ResolversTypes['contracts_metadata_aggregate'], "contracts_metadata_aggregate", ParentType, ContextType, Partial<Subscription_RootContracts_Metadata_AggregateArgs>>;
  contracts_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['contracts_metadata']>, "contracts_metadata_by_pk", ParentType, ContextType, RequireFields<Subscription_RootContracts_Metadata_By_PkArgs, 'address'>>;
  contracts_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['contracts_metadata']>, "contracts_metadata_stream", ParentType, ContextType, RequireFields<Subscription_RootContracts_Metadata_StreamArgs, 'batch_size' | 'cursor'>>;
  dependencies_metadata?: SubscriptionResolver<Array<ResolversTypes['dependencies_metadata']>, "dependencies_metadata", ParentType, ContextType, Partial<Subscription_RootDependencies_MetadataArgs>>;
  dependencies_metadata_aggregate?: SubscriptionResolver<ResolversTypes['dependencies_metadata_aggregate'], "dependencies_metadata_aggregate", ParentType, ContextType, Partial<Subscription_RootDependencies_Metadata_AggregateArgs>>;
  dependencies_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['dependencies_metadata']>, "dependencies_metadata_by_pk", ParentType, ContextType, RequireFields<Subscription_RootDependencies_Metadata_By_PkArgs, 'type_and_version'>>;
  dependencies_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['dependencies_metadata']>, "dependencies_metadata_stream", ParentType, ContextType, RequireFields<Subscription_RootDependencies_Metadata_StreamArgs, 'batch_size' | 'cursor'>>;
  dependency_additional_cdns?: SubscriptionResolver<Array<ResolversTypes['dependency_additional_cdns']>, "dependency_additional_cdns", ParentType, ContextType, Partial<Subscription_RootDependency_Additional_CdnsArgs>>;
  dependency_additional_cdns_aggregate?: SubscriptionResolver<ResolversTypes['dependency_additional_cdns_aggregate'], "dependency_additional_cdns_aggregate", ParentType, ContextType, Partial<Subscription_RootDependency_Additional_Cdns_AggregateArgs>>;
  dependency_additional_cdns_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['dependency_additional_cdns']>, "dependency_additional_cdns_by_pk", ParentType, ContextType, RequireFields<Subscription_RootDependency_Additional_Cdns_By_PkArgs, 'dependency_type_and_version' | 'index'>>;
  dependency_additional_cdns_stream?: SubscriptionResolver<Array<ResolversTypes['dependency_additional_cdns']>, "dependency_additional_cdns_stream", ParentType, ContextType, RequireFields<Subscription_RootDependency_Additional_Cdns_StreamArgs, 'batch_size' | 'cursor'>>;
  dependency_additional_repositories?: SubscriptionResolver<Array<ResolversTypes['dependency_additional_repositories']>, "dependency_additional_repositories", ParentType, ContextType, Partial<Subscription_RootDependency_Additional_RepositoriesArgs>>;
  dependency_additional_repositories_aggregate?: SubscriptionResolver<ResolversTypes['dependency_additional_repositories_aggregate'], "dependency_additional_repositories_aggregate", ParentType, ContextType, Partial<Subscription_RootDependency_Additional_Repositories_AggregateArgs>>;
  dependency_additional_repositories_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['dependency_additional_repositories']>, "dependency_additional_repositories_by_pk", ParentType, ContextType, RequireFields<Subscription_RootDependency_Additional_Repositories_By_PkArgs, 'dependency_type_and_version' | 'index'>>;
  dependency_additional_repositories_stream?: SubscriptionResolver<Array<ResolversTypes['dependency_additional_repositories']>, "dependency_additional_repositories_stream", ParentType, ContextType, RequireFields<Subscription_RootDependency_Additional_Repositories_StreamArgs, 'batch_size' | 'cursor'>>;
  dependency_registries?: SubscriptionResolver<Array<ResolversTypes['dependency_registries']>, "dependency_registries", ParentType, ContextType, Partial<Subscription_RootDependency_RegistriesArgs>>;
  dependency_registries_aggregate?: SubscriptionResolver<ResolversTypes['dependency_registries_aggregate'], "dependency_registries_aggregate", ParentType, ContextType, Partial<Subscription_RootDependency_Registries_AggregateArgs>>;
  dependency_registries_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['dependency_registries']>, "dependency_registries_by_pk", ParentType, ContextType, RequireFields<Subscription_RootDependency_Registries_By_PkArgs, 'address'>>;
  dependency_registries_stream?: SubscriptionResolver<Array<ResolversTypes['dependency_registries']>, "dependency_registries_stream", ParentType, ContextType, RequireFields<Subscription_RootDependency_Registries_StreamArgs, 'batch_size' | 'cursor'>>;
  dependency_scripts?: SubscriptionResolver<Array<ResolversTypes['dependency_scripts']>, "dependency_scripts", ParentType, ContextType, Partial<Subscription_RootDependency_ScriptsArgs>>;
  dependency_scripts_aggregate?: SubscriptionResolver<ResolversTypes['dependency_scripts_aggregate'], "dependency_scripts_aggregate", ParentType, ContextType, Partial<Subscription_RootDependency_Scripts_AggregateArgs>>;
  dependency_scripts_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['dependency_scripts']>, "dependency_scripts_by_pk", ParentType, ContextType, RequireFields<Subscription_RootDependency_Scripts_By_PkArgs, 'dependency_type_and_version' | 'index'>>;
  dependency_scripts_stream?: SubscriptionResolver<Array<ResolversTypes['dependency_scripts']>, "dependency_scripts_stream", ParentType, ContextType, RequireFields<Subscription_RootDependency_Scripts_StreamArgs, 'batch_size' | 'cursor'>>;
  entity_tags?: SubscriptionResolver<Array<ResolversTypes['entity_tags']>, "entity_tags", ParentType, ContextType, Partial<Subscription_RootEntity_TagsArgs>>;
  entity_tags_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['entity_tags']>, "entity_tags_by_pk", ParentType, ContextType, RequireFields<Subscription_RootEntity_Tags_By_PkArgs, 'id'>>;
  entity_tags_stream?: SubscriptionResolver<Array<ResolversTypes['entity_tags']>, "entity_tags_stream", ParentType, ContextType, RequireFields<Subscription_RootEntity_Tags_StreamArgs, 'batch_size' | 'cursor'>>;
  favorites?: SubscriptionResolver<Array<ResolversTypes['favorites']>, "favorites", ParentType, ContextType, Partial<Subscription_RootFavoritesArgs>>;
  favorites_aggregate?: SubscriptionResolver<ResolversTypes['favorites_aggregate'], "favorites_aggregate", ParentType, ContextType, Partial<Subscription_RootFavorites_AggregateArgs>>;
  favorites_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['favorites']>, "favorites_by_pk", ParentType, ContextType, RequireFields<Subscription_RootFavorites_By_PkArgs, 'id'>>;
  favorites_stream?: SubscriptionResolver<Array<ResolversTypes['favorites']>, "favorites_stream", ParentType, ContextType, RequireFields<Subscription_RootFavorites_StreamArgs, 'batch_size' | 'cursor'>>;
  feature_flags?: SubscriptionResolver<Array<ResolversTypes['feature_flags']>, "feature_flags", ParentType, ContextType, Partial<Subscription_RootFeature_FlagsArgs>>;
  feature_flags_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['feature_flags']>, "feature_flags_by_pk", ParentType, ContextType, RequireFields<Subscription_RootFeature_Flags_By_PkArgs, 'flag_name'>>;
  feature_flags_stream?: SubscriptionResolver<Array<ResolversTypes['feature_flags']>, "feature_flags_stream", ParentType, ContextType, RequireFields<Subscription_RootFeature_Flags_StreamArgs, 'batch_size' | 'cursor'>>;
  filter_tokens_metadata_by_features?: SubscriptionResolver<Array<ResolversTypes['tokens_metadata']>, "filter_tokens_metadata_by_features", ParentType, ContextType, RequireFields<Subscription_RootFilter_Tokens_Metadata_By_FeaturesArgs, 'args'>>;
  filter_tokens_metadata_by_features_aggregate?: SubscriptionResolver<ResolversTypes['tokens_metadata_aggregate'], "filter_tokens_metadata_by_features_aggregate", ParentType, ContextType, RequireFields<Subscription_RootFilter_Tokens_Metadata_By_Features_AggregateArgs, 'args'>>;
  list_projects_metadata_random?: SubscriptionResolver<Array<ResolversTypes['projects_metadata']>, "list_projects_metadata_random", ParentType, ContextType, RequireFields<Subscription_RootList_Projects_Metadata_RandomArgs, 'args'>>;
  list_projects_metadata_random_aggregate?: SubscriptionResolver<ResolversTypes['projects_metadata_aggregate'], "list_projects_metadata_random_aggregate", ParentType, ContextType, RequireFields<Subscription_RootList_Projects_Metadata_Random_AggregateArgs, 'args'>>;
  media?: SubscriptionResolver<Array<ResolversTypes['media']>, "media", ParentType, ContextType, Partial<Subscription_RootMediaArgs>>;
  media_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['media']>, "media_by_pk", ParentType, ContextType, RequireFields<Subscription_RootMedia_By_PkArgs, 'id'>>;
  media_stream?: SubscriptionResolver<Array<ResolversTypes['media']>, "media_stream", ParentType, ContextType, RequireFields<Subscription_RootMedia_StreamArgs, 'batch_size' | 'cursor'>>;
  minter_filters_metadata?: SubscriptionResolver<Array<ResolversTypes['minter_filters_metadata']>, "minter_filters_metadata", ParentType, ContextType, Partial<Subscription_RootMinter_Filters_MetadataArgs>>;
  minter_filters_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['minter_filters_metadata']>, "minter_filters_metadata_by_pk", ParentType, ContextType, RequireFields<Subscription_RootMinter_Filters_Metadata_By_PkArgs, 'address'>>;
  minter_filters_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['minter_filters_metadata']>, "minter_filters_metadata_stream", ParentType, ContextType, RequireFields<Subscription_RootMinter_Filters_Metadata_StreamArgs, 'batch_size' | 'cursor'>>;
  minter_types?: SubscriptionResolver<Array<ResolversTypes['minter_types']>, "minter_types", ParentType, ContextType, Partial<Subscription_RootMinter_TypesArgs>>;
  minter_types_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['minter_types']>, "minter_types_by_pk", ParentType, ContextType, RequireFields<Subscription_RootMinter_Types_By_PkArgs, 'type'>>;
  minter_types_stream?: SubscriptionResolver<Array<ResolversTypes['minter_types']>, "minter_types_stream", ParentType, ContextType, RequireFields<Subscription_RootMinter_Types_StreamArgs, 'batch_size' | 'cursor'>>;
  minters_metadata?: SubscriptionResolver<Array<ResolversTypes['minters_metadata']>, "minters_metadata", ParentType, ContextType, Partial<Subscription_RootMinters_MetadataArgs>>;
  minters_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['minters_metadata']>, "minters_metadata_by_pk", ParentType, ContextType, RequireFields<Subscription_RootMinters_Metadata_By_PkArgs, 'address'>>;
  minters_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['minters_metadata']>, "minters_metadata_stream", ParentType, ContextType, RequireFields<Subscription_RootMinters_Metadata_StreamArgs, 'batch_size' | 'cursor'>>;
  project_external_asset_dependencies?: SubscriptionResolver<Array<ResolversTypes['project_external_asset_dependencies']>, "project_external_asset_dependencies", ParentType, ContextType, Partial<Subscription_RootProject_External_Asset_DependenciesArgs>>;
  project_external_asset_dependencies_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['project_external_asset_dependencies']>, "project_external_asset_dependencies_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProject_External_Asset_Dependencies_By_PkArgs, 'index' | 'project_id'>>;
  project_external_asset_dependencies_stream?: SubscriptionResolver<Array<ResolversTypes['project_external_asset_dependencies']>, "project_external_asset_dependencies_stream", ParentType, ContextType, RequireFields<Subscription_RootProject_External_Asset_Dependencies_StreamArgs, 'batch_size' | 'cursor'>>;
  project_minter_configurations?: SubscriptionResolver<Array<ResolversTypes['project_minter_configurations']>, "project_minter_configurations", ParentType, ContextType, Partial<Subscription_RootProject_Minter_ConfigurationsArgs>>;
  project_minter_configurations_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['project_minter_configurations']>, "project_minter_configurations_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProject_Minter_Configurations_By_PkArgs, 'id'>>;
  project_minter_configurations_stream?: SubscriptionResolver<Array<ResolversTypes['project_minter_configurations']>, "project_minter_configurations_stream", ParentType, ContextType, RequireFields<Subscription_RootProject_Minter_Configurations_StreamArgs, 'batch_size' | 'cursor'>>;
  project_scripts?: SubscriptionResolver<Array<ResolversTypes['project_scripts']>, "project_scripts", ParentType, ContextType, Partial<Subscription_RootProject_ScriptsArgs>>;
  project_scripts_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['project_scripts']>, "project_scripts_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProject_Scripts_By_PkArgs, 'index' | 'project_id'>>;
  project_scripts_stream?: SubscriptionResolver<Array<ResolversTypes['project_scripts']>, "project_scripts_stream", ParentType, ContextType, RequireFields<Subscription_RootProject_Scripts_StreamArgs, 'batch_size' | 'cursor'>>;
  project_series?: SubscriptionResolver<Array<ResolversTypes['project_series']>, "project_series", ParentType, ContextType, Partial<Subscription_RootProject_SeriesArgs>>;
  project_series_aggregate?: SubscriptionResolver<ResolversTypes['project_series_aggregate'], "project_series_aggregate", ParentType, ContextType, Partial<Subscription_RootProject_Series_AggregateArgs>>;
  project_series_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['project_series']>, "project_series_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProject_Series_By_PkArgs, 'id'>>;
  project_series_stream?: SubscriptionResolver<Array<ResolversTypes['project_series']>, "project_series_stream", ParentType, ContextType, RequireFields<Subscription_RootProject_Series_StreamArgs, 'batch_size' | 'cursor'>>;
  project_vertical_categories?: SubscriptionResolver<Array<ResolversTypes['project_vertical_categories']>, "project_vertical_categories", ParentType, ContextType, Partial<Subscription_RootProject_Vertical_CategoriesArgs>>;
  project_vertical_categories_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['project_vertical_categories']>, "project_vertical_categories_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProject_Vertical_Categories_By_PkArgs, 'name'>>;
  project_vertical_categories_stream?: SubscriptionResolver<Array<ResolversTypes['project_vertical_categories']>, "project_vertical_categories_stream", ParentType, ContextType, RequireFields<Subscription_RootProject_Vertical_Categories_StreamArgs, 'batch_size' | 'cursor'>>;
  project_verticals?: SubscriptionResolver<Array<ResolversTypes['project_verticals']>, "project_verticals", ParentType, ContextType, Partial<Subscription_RootProject_VerticalsArgs>>;
  project_verticals_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['project_verticals']>, "project_verticals_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProject_Verticals_By_PkArgs, 'name'>>;
  project_verticals_stream?: SubscriptionResolver<Array<ResolversTypes['project_verticals']>, "project_verticals_stream", ParentType, ContextType, RequireFields<Subscription_RootProject_Verticals_StreamArgs, 'batch_size' | 'cursor'>>;
  projects_features?: SubscriptionResolver<Array<ResolversTypes['projects_features']>, "projects_features", ParentType, ContextType, Partial<Subscription_RootProjects_FeaturesArgs>>;
  projects_features_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['projects_features']>, "projects_features_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProjects_Features_By_PkArgs, 'id'>>;
  projects_features_stream?: SubscriptionResolver<Array<ResolversTypes['projects_features']>, "projects_features_stream", ParentType, ContextType, RequireFields<Subscription_RootProjects_Features_StreamArgs, 'batch_size' | 'cursor'>>;
  projects_metadata?: SubscriptionResolver<Array<ResolversTypes['projects_metadata']>, "projects_metadata", ParentType, ContextType, Partial<Subscription_RootProjects_MetadataArgs>>;
  projects_metadata_aggregate?: SubscriptionResolver<ResolversTypes['projects_metadata_aggregate'], "projects_metadata_aggregate", ParentType, ContextType, Partial<Subscription_RootProjects_Metadata_AggregateArgs>>;
  projects_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['projects_metadata']>, "projects_metadata_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProjects_Metadata_By_PkArgs, 'id'>>;
  projects_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['projects_metadata']>, "projects_metadata_stream", ParentType, ContextType, RequireFields<Subscription_RootProjects_Metadata_StreamArgs, 'batch_size' | 'cursor'>>;
  proposed_artist_addresses_and_splits?: SubscriptionResolver<Array<ResolversTypes['proposed_artist_addresses_and_splits']>, "proposed_artist_addresses_and_splits", ParentType, ContextType, Partial<Subscription_RootProposed_Artist_Addresses_And_SplitsArgs>>;
  proposed_artist_addresses_and_splits_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['proposed_artist_addresses_and_splits']>, "proposed_artist_addresses_and_splits_by_pk", ParentType, ContextType, RequireFields<Subscription_RootProposed_Artist_Addresses_And_Splits_By_PkArgs, 'project_id'>>;
  proposed_artist_addresses_and_splits_stream?: SubscriptionResolver<Array<ResolversTypes['proposed_artist_addresses_and_splits']>, "proposed_artist_addresses_and_splits_stream", ParentType, ContextType, RequireFields<Subscription_RootProposed_Artist_Addresses_And_Splits_StreamArgs, 'batch_size' | 'cursor'>>;
  receipt_metadata?: SubscriptionResolver<Array<ResolversTypes['receipt_metadata']>, "receipt_metadata", ParentType, ContextType, Partial<Subscription_RootReceipt_MetadataArgs>>;
  receipt_metadata_aggregate?: SubscriptionResolver<ResolversTypes['receipt_metadata_aggregate'], "receipt_metadata_aggregate", ParentType, ContextType, Partial<Subscription_RootReceipt_Metadata_AggregateArgs>>;
  receipt_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['receipt_metadata']>, "receipt_metadata_by_pk", ParentType, ContextType, RequireFields<Subscription_RootReceipt_Metadata_By_PkArgs, 'id'>>;
  receipt_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['receipt_metadata']>, "receipt_metadata_stream", ParentType, ContextType, RequireFields<Subscription_RootReceipt_Metadata_StreamArgs, 'batch_size' | 'cursor'>>;
  render_types?: SubscriptionResolver<Array<ResolversTypes['render_types']>, "render_types", ParentType, ContextType, Partial<Subscription_RootRender_TypesArgs>>;
  render_types_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['render_types']>, "render_types_by_pk", ParentType, ContextType, RequireFields<Subscription_RootRender_Types_By_PkArgs, 'value'>>;
  render_types_stream?: SubscriptionResolver<Array<ResolversTypes['render_types']>, "render_types_stream", ParentType, ContextType, RequireFields<Subscription_RootRender_Types_StreamArgs, 'batch_size' | 'cursor'>>;
  search_projects?: SubscriptionResolver<Array<ResolversTypes['projects_metadata']>, "search_projects", ParentType, ContextType, RequireFields<Subscription_RootSearch_ProjectsArgs, 'args'>>;
  search_projects_aggregate?: SubscriptionResolver<ResolversTypes['projects_metadata_aggregate'], "search_projects_aggregate", ParentType, ContextType, RequireFields<Subscription_RootSearch_Projects_AggregateArgs, 'args'>>;
  search_tags?: SubscriptionResolver<Array<ResolversTypes['tags']>, "search_tags", ParentType, ContextType, RequireFields<Subscription_RootSearch_TagsArgs, 'args'>>;
  search_tokens?: SubscriptionResolver<Array<ResolversTypes['tokens_metadata']>, "search_tokens", ParentType, ContextType, RequireFields<Subscription_RootSearch_TokensArgs, 'args'>>;
  search_tokens_aggregate?: SubscriptionResolver<ResolversTypes['tokens_metadata_aggregate'], "search_tokens_aggregate", ParentType, ContextType, RequireFields<Subscription_RootSearch_Tokens_AggregateArgs, 'args'>>;
  search_users?: SubscriptionResolver<Array<ResolversTypes['user_profiles']>, "search_users", ParentType, ContextType, RequireFields<Subscription_RootSearch_UsersArgs, 'args'>>;
  search_users_aggregate?: SubscriptionResolver<ResolversTypes['user_profiles_aggregate'], "search_users_aggregate", ParentType, ContextType, RequireFields<Subscription_RootSearch_Users_AggregateArgs, 'args'>>;
  tags?: SubscriptionResolver<Array<ResolversTypes['tags']>, "tags", ParentType, ContextType, Partial<Subscription_RootTagsArgs>>;
  tags_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['tags']>, "tags_by_pk", ParentType, ContextType, RequireFields<Subscription_RootTags_By_PkArgs, 'name'>>;
  tags_stream?: SubscriptionResolver<Array<ResolversTypes['tags']>, "tags_stream", ParentType, ContextType, RequireFields<Subscription_RootTags_StreamArgs, 'batch_size' | 'cursor'>>;
  tokens_metadata?: SubscriptionResolver<Array<ResolversTypes['tokens_metadata']>, "tokens_metadata", ParentType, ContextType, Partial<Subscription_RootTokens_MetadataArgs>>;
  tokens_metadata_aggregate?: SubscriptionResolver<ResolversTypes['tokens_metadata_aggregate'], "tokens_metadata_aggregate", ParentType, ContextType, Partial<Subscription_RootTokens_Metadata_AggregateArgs>>;
  tokens_metadata_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['tokens_metadata']>, "tokens_metadata_by_pk", ParentType, ContextType, RequireFields<Subscription_RootTokens_Metadata_By_PkArgs, 'id'>>;
  tokens_metadata_stream?: SubscriptionResolver<Array<ResolversTypes['tokens_metadata']>, "tokens_metadata_stream", ParentType, ContextType, RequireFields<Subscription_RootTokens_Metadata_StreamArgs, 'batch_size' | 'cursor'>>;
  user_profiles?: SubscriptionResolver<Array<ResolversTypes['user_profiles']>, "user_profiles", ParentType, ContextType, Partial<Subscription_RootUser_ProfilesArgs>>;
  user_profiles_aggregate?: SubscriptionResolver<ResolversTypes['user_profiles_aggregate'], "user_profiles_aggregate", ParentType, ContextType, Partial<Subscription_RootUser_Profiles_AggregateArgs>>;
  user_profiles_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['user_profiles']>, "user_profiles_by_pk", ParentType, ContextType, RequireFields<Subscription_RootUser_Profiles_By_PkArgs, 'id'>>;
  user_profiles_stream?: SubscriptionResolver<Array<ResolversTypes['user_profiles']>, "user_profiles_stream", ParentType, ContextType, RequireFields<Subscription_RootUser_Profiles_StreamArgs, 'batch_size' | 'cursor'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['users']>, "users", ParentType, ContextType, Partial<Subscription_RootUsersArgs>>;
  users_aggregate?: SubscriptionResolver<ResolversTypes['users_aggregate'], "users_aggregate", ParentType, ContextType, Partial<Subscription_RootUsers_AggregateArgs>>;
  users_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['users']>, "users_by_pk", ParentType, ContextType, RequireFields<Subscription_RootUsers_By_PkArgs, 'public_address'>>;
  users_stream?: SubscriptionResolver<Array<ResolversTypes['users']>, "users_stream", ParentType, ContextType, RequireFields<Subscription_RootUsers_StreamArgs, 'batch_size' | 'cursor'>>;
  verticals?: SubscriptionResolver<Array<ResolversTypes['verticals']>, "verticals", ParentType, ContextType, Partial<Subscription_RootVerticalsArgs>>;
  verticals_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['verticals']>, "verticals_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVerticals_By_PkArgs, 'name'>>;
  verticals_stream?: SubscriptionResolver<Array<ResolversTypes['verticals']>, "verticals_stream", ParentType, ContextType, RequireFields<Subscription_RootVerticals_StreamArgs, 'batch_size' | 'cursor'>>;
  video_aspect_ratios?: SubscriptionResolver<Array<ResolversTypes['video_aspect_ratios']>, "video_aspect_ratios", ParentType, ContextType, Partial<Subscription_RootVideo_Aspect_RatiosArgs>>;
  video_aspect_ratios_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['video_aspect_ratios']>, "video_aspect_ratios_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVideo_Aspect_Ratios_By_PkArgs, 'value'>>;
  video_aspect_ratios_stream?: SubscriptionResolver<Array<ResolversTypes['video_aspect_ratios']>, "video_aspect_ratios_stream", ParentType, ContextType, RequireFields<Subscription_RootVideo_Aspect_Ratios_StreamArgs, 'batch_size' | 'cursor'>>;
  video_frame_rates?: SubscriptionResolver<Array<ResolversTypes['video_frame_rates']>, "video_frame_rates", ParentType, ContextType, Partial<Subscription_RootVideo_Frame_RatesArgs>>;
  video_frame_rates_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['video_frame_rates']>, "video_frame_rates_by_pk", ParentType, ContextType, RequireFields<Subscription_RootVideo_Frame_Rates_By_PkArgs, 'value'>>;
  video_frame_rates_stream?: SubscriptionResolver<Array<ResolversTypes['video_frame_rates']>, "video_frame_rates_stream", ParentType, ContextType, RequireFields<Subscription_RootVideo_Frame_Rates_StreamArgs, 'batch_size' | 'cursor'>>;
  webflow_artist_info?: SubscriptionResolver<Array<ResolversTypes['webflow_artist_info']>, "webflow_artist_info", ParentType, ContextType, Partial<Subscription_RootWebflow_Artist_InfoArgs>>;
  webflow_artist_info_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['webflow_artist_info']>, "webflow_artist_info_by_pk", ParentType, ContextType, RequireFields<Subscription_RootWebflow_Artist_Info_By_PkArgs, 'webflow_item_id'>>;
  webflow_artist_info_stream?: SubscriptionResolver<Array<ResolversTypes['webflow_artist_info']>, "webflow_artist_info_stream", ParentType, ContextType, RequireFields<Subscription_RootWebflow_Artist_Info_StreamArgs, 'batch_size' | 'cursor'>>;
  webflow_spectrum_articles?: SubscriptionResolver<Array<ResolversTypes['webflow_spectrum_articles']>, "webflow_spectrum_articles", ParentType, ContextType, Partial<Subscription_RootWebflow_Spectrum_ArticlesArgs>>;
  webflow_spectrum_articles_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['webflow_spectrum_articles']>, "webflow_spectrum_articles_by_pk", ParentType, ContextType, RequireFields<Subscription_RootWebflow_Spectrum_Articles_By_PkArgs, 'webflow_item_id'>>;
  webflow_spectrum_articles_stream?: SubscriptionResolver<Array<ResolversTypes['webflow_spectrum_articles']>, "webflow_spectrum_articles_stream", ParentType, ContextType, RequireFields<Subscription_RootWebflow_Spectrum_Articles_StreamArgs, 'batch_size' | 'cursor'>>;
};

export type TagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tags'] = ResolversParentTypes['tags']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  display_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entity_tags?: Resolver<Array<ResolversTypes['entity_tags']>, ParentType, ContextType, Partial<TagsEntity_TagsArgs>>;
  grouping_name?: Resolver<ResolversTypes['tag_groupings_enum'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['tag_status_enum'], ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['tag_types_enum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamp'], any> {
  name: 'timestamp';
}

export interface TimestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz';
}

export type Tokens_MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata'] = ResolversParentTypes['tokens_metadata']> = {
  contract?: Resolver<Maybe<ResolversTypes['contracts_metadata']>, ParentType, ContextType>;
  contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorited_by_user?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['favorites']>, ParentType, ContextType, Partial<Tokens_MetadataFavoritesArgs>>;
  favorites_aggregate?: Resolver<ResolversTypes['favorites_aggregate'], ParentType, ContextType, Partial<Tokens_MetadataFavorites_AggregateArgs>>;
  features?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Tokens_MetadataFeaturesArgs>>;
  gif?: Resolver<Maybe<ResolversTypes['media']>, ParentType, ContextType>;
  gif_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  high_res_image?: Resolver<Maybe<ResolversTypes['media']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['media']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  invocation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isFlaggedAsSuspicious?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  list_creation_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  list_currency_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_currency_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  list_expiration_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  list_platform?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  list_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  live_view_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  live_view_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  low_res_image?: Resolver<Maybe<ResolversTypes['media']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  media_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mint_transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minted_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  owner_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preview_asset_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primary_asset_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes['projects_metadata'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['media']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_aggregate'] = ResolversParentTypes['tokens_metadata_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['tokens_metadata_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['tokens_metadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_aggregate_fields'] = ResolversParentTypes['tokens_metadata_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['tokens_metadata_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Tokens_Metadata_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['tokens_metadata_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['tokens_metadata_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['tokens_metadata_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['tokens_metadata_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['tokens_metadata_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['tokens_metadata_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['tokens_metadata_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['tokens_metadata_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['tokens_metadata_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_avg_fields'] = ResolversParentTypes['tokens_metadata_avg_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_max_fields'] = ResolversParentTypes['tokens_metadata_max_fields']> = {
  contract_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gif_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  list_creation_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  list_currency_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_currency_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  list_expiration_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  list_platform?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  list_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  mint_transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  owner_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_min_fields'] = ResolversParentTypes['tokens_metadata_min_fields']> = {
  contract_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gif_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  list_creation_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  list_currency_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_currency_symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  list_expiration_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  list_platform?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  list_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  mint_transaction_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  owner_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_stddev_fields'] = ResolversParentTypes['tokens_metadata_stddev_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_stddev_pop_fields'] = ResolversParentTypes['tokens_metadata_stddev_pop_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_stddev_samp_fields'] = ResolversParentTypes['tokens_metadata_stddev_samp_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_sum_fields'] = ResolversParentTypes['tokens_metadata_sum_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['float8']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_var_pop_fields'] = ResolversParentTypes['tokens_metadata_var_pop_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_var_samp_fields'] = ResolversParentTypes['tokens_metadata_var_samp_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tokens_Metadata_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tokens_metadata_variance_fields'] = ResolversParentTypes['tokens_metadata_variance_fields']> = {
  gif_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  invocation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_eth_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low_res_image_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_ProfilesResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles'] = ResolversParentTypes['user_profiles']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_picture?: Resolver<Maybe<ResolversTypes['media']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_aggregate'] = ResolversParentTypes['user_profiles_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['user_profiles_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['user_profiles']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_aggregate_fields'] = ResolversParentTypes['user_profiles_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['user_profiles_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<User_Profiles_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['user_profiles_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['user_profiles_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['user_profiles_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['user_profiles_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['user_profiles_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['user_profiles_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['user_profiles_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['user_profiles_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['user_profiles_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_avg_fields'] = ResolversParentTypes['user_profiles_avg_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_max_fields'] = ResolversParentTypes['user_profiles_max_fields']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_min_fields'] = ResolversParentTypes['user_profiles_min_fields']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_stddev_fields'] = ResolversParentTypes['user_profiles_stddev_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_stddev_pop_fields'] = ResolversParentTypes['user_profiles_stddev_pop_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_stddev_samp_fields'] = ResolversParentTypes['user_profiles_stddev_samp_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_sum_fields'] = ResolversParentTypes['user_profiles_sum_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_var_pop_fields'] = ResolversParentTypes['user_profiles_var_pop_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_var_samp_fields'] = ResolversParentTypes['user_profiles_var_samp_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Profiles_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_profiles_variance_fields'] = ResolversParentTypes['user_profiles_variance_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profile_picture_id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['users'] = ResolversParentTypes['users']> = {
  allowlisted_on?: Resolver<Array<ResolversTypes['contract_allowlistings']>, ParentType, ContextType, Partial<UsersAllowlisted_OnArgs>>;
  created_at?: Resolver<ResolversTypes['timestamptz'], ParentType, ContextType>;
  display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorited_by_user?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['favorites']>, ParentType, ContextType, Partial<UsersFavoritesArgs>>;
  favorites_aggregate?: Resolver<ResolversTypes['favorites_aggregate'], ParentType, ContextType, Partial<UsersFavorites_AggregateArgs>>;
  feature_flags?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<UsersFeature_FlagsArgs>>;
  is_ab_staff?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_curated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  is_curator?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['user_profiles']>, ParentType, ContextType>;
  projects_created?: Resolver<Array<ResolversTypes['projects_metadata']>, ParentType, ContextType, Partial<UsersProjects_CreatedArgs>>;
  projects_created_aggregate?: Resolver<ResolversTypes['projects_metadata_aggregate'], ParentType, ContextType, Partial<UsersProjects_Created_AggregateArgs>>;
  public_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receipts?: Resolver<Array<ResolversTypes['receipt_metadata']>, ParentType, ContextType, Partial<UsersReceiptsArgs>>;
  receipts_aggregate?: Resolver<ResolversTypes['receipt_metadata_aggregate'], ParentType, ContextType, Partial<UsersReceipts_AggregateArgs>>;
  tags?: Resolver<Array<ResolversTypes['entity_tags']>, ParentType, ContextType, Partial<UsersTagsArgs>>;
  tokens?: Resolver<Array<ResolversTypes['tokens_metadata']>, ParentType, ContextType, Partial<UsersTokensArgs>>;
  tokens_aggregate?: Resolver<ResolversTypes['tokens_metadata_aggregate'], ParentType, ContextType, Partial<UsersTokens_AggregateArgs>>;
  tos_accepted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  viewed_warning_banner?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  webflow_artist_info?: Resolver<Maybe<ResolversTypes['webflow_artist_info']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_aggregate'] = ResolversParentTypes['users_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['users_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_aggregate_fields'] = ResolversParentTypes['users_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Users_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['users_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['users_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_max_fields'] = ResolversParentTypes['users_max_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  public_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tos_accepted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_min_fields'] = ResolversParentTypes['users_min_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  public_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tos_accepted_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerticalsResolvers<ContextType = any, ParentType extends ResolversParentTypes['verticals'] = ResolversParentTypes['verticals']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project_vertical?: Resolver<Maybe<ResolversTypes['project_verticals']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Video_Aspect_RatiosResolvers<ContextType = any, ParentType extends ResolversParentTypes['video_aspect_ratios'] = ResolversParentTypes['video_aspect_ratios']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Video_Frame_RatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['video_frame_rates'] = ResolversParentTypes['video_frame_rates']> = {
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Webflow_Artist_InfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['webflow_artist_info'] = ResolversParentTypes['webflow_artist_info']> = {
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  raw_data?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Webflow_Artist_InfoRaw_DataArgs>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_public_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webflow_collection_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webflow_item_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Webflow_Spectrum_ArticlesResolvers<ContextType = any, ParentType extends ResolversParentTypes['webflow_spectrum_articles'] = ResolversParentTypes['webflow_spectrum_articles']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extra_info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published_at?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  raw_data?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Webflow_Spectrum_ArticlesRaw_DataArgs>>;
  section?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webflow_collection_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webflow_item_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthMessageOutput?: AuthMessageOutputResolvers<ContextType>;
  AuthenticateOutput?: AuthenticateOutputResolvers<ContextType>;
  OpenseaCollectionData?: OpenseaCollectionDataResolvers<ContextType>;
  artists?: ArtistsResolvers<ContextType>;
  artists_aggregate?: Artists_AggregateResolvers<ContextType>;
  artists_aggregate_fields?: Artists_Aggregate_FieldsResolvers<ContextType>;
  artists_max_fields?: Artists_Max_FieldsResolvers<ContextType>;
  artists_min_fields?: Artists_Min_FieldsResolvers<ContextType>;
  bigint?: GraphQLScalarType;
  categories?: CategoriesResolvers<ContextType>;
  contract_allowlistings?: Contract_AllowlistingsResolvers<ContextType>;
  contract_type_names?: Contract_Type_NamesResolvers<ContextType>;
  contract_types?: Contract_TypesResolvers<ContextType>;
  contracts_metadata?: Contracts_MetadataResolvers<ContextType>;
  contracts_metadata_aggregate?: Contracts_Metadata_AggregateResolvers<ContextType>;
  contracts_metadata_aggregate_fields?: Contracts_Metadata_Aggregate_FieldsResolvers<ContextType>;
  contracts_metadata_avg_fields?: Contracts_Metadata_Avg_FieldsResolvers<ContextType>;
  contracts_metadata_max_fields?: Contracts_Metadata_Max_FieldsResolvers<ContextType>;
  contracts_metadata_min_fields?: Contracts_Metadata_Min_FieldsResolvers<ContextType>;
  contracts_metadata_stddev_fields?: Contracts_Metadata_Stddev_FieldsResolvers<ContextType>;
  contracts_metadata_stddev_pop_fields?: Contracts_Metadata_Stddev_Pop_FieldsResolvers<ContextType>;
  contracts_metadata_stddev_samp_fields?: Contracts_Metadata_Stddev_Samp_FieldsResolvers<ContextType>;
  contracts_metadata_sum_fields?: Contracts_Metadata_Sum_FieldsResolvers<ContextType>;
  contracts_metadata_var_pop_fields?: Contracts_Metadata_Var_Pop_FieldsResolvers<ContextType>;
  contracts_metadata_var_samp_fields?: Contracts_Metadata_Var_Samp_FieldsResolvers<ContextType>;
  contracts_metadata_variance_fields?: Contracts_Metadata_Variance_FieldsResolvers<ContextType>;
  dependencies_metadata?: Dependencies_MetadataResolvers<ContextType>;
  dependencies_metadata_aggregate?: Dependencies_Metadata_AggregateResolvers<ContextType>;
  dependencies_metadata_aggregate_fields?: Dependencies_Metadata_Aggregate_FieldsResolvers<ContextType>;
  dependencies_metadata_max_fields?: Dependencies_Metadata_Max_FieldsResolvers<ContextType>;
  dependencies_metadata_min_fields?: Dependencies_Metadata_Min_FieldsResolvers<ContextType>;
  dependency_additional_cdns?: Dependency_Additional_CdnsResolvers<ContextType>;
  dependency_additional_cdns_aggregate?: Dependency_Additional_Cdns_AggregateResolvers<ContextType>;
  dependency_additional_cdns_aggregate_fields?: Dependency_Additional_Cdns_Aggregate_FieldsResolvers<ContextType>;
  dependency_additional_cdns_avg_fields?: Dependency_Additional_Cdns_Avg_FieldsResolvers<ContextType>;
  dependency_additional_cdns_max_fields?: Dependency_Additional_Cdns_Max_FieldsResolvers<ContextType>;
  dependency_additional_cdns_min_fields?: Dependency_Additional_Cdns_Min_FieldsResolvers<ContextType>;
  dependency_additional_cdns_stddev_fields?: Dependency_Additional_Cdns_Stddev_FieldsResolvers<ContextType>;
  dependency_additional_cdns_stddev_pop_fields?: Dependency_Additional_Cdns_Stddev_Pop_FieldsResolvers<ContextType>;
  dependency_additional_cdns_stddev_samp_fields?: Dependency_Additional_Cdns_Stddev_Samp_FieldsResolvers<ContextType>;
  dependency_additional_cdns_sum_fields?: Dependency_Additional_Cdns_Sum_FieldsResolvers<ContextType>;
  dependency_additional_cdns_var_pop_fields?: Dependency_Additional_Cdns_Var_Pop_FieldsResolvers<ContextType>;
  dependency_additional_cdns_var_samp_fields?: Dependency_Additional_Cdns_Var_Samp_FieldsResolvers<ContextType>;
  dependency_additional_cdns_variance_fields?: Dependency_Additional_Cdns_Variance_FieldsResolvers<ContextType>;
  dependency_additional_repositories?: Dependency_Additional_RepositoriesResolvers<ContextType>;
  dependency_additional_repositories_aggregate?: Dependency_Additional_Repositories_AggregateResolvers<ContextType>;
  dependency_additional_repositories_aggregate_fields?: Dependency_Additional_Repositories_Aggregate_FieldsResolvers<ContextType>;
  dependency_additional_repositories_avg_fields?: Dependency_Additional_Repositories_Avg_FieldsResolvers<ContextType>;
  dependency_additional_repositories_max_fields?: Dependency_Additional_Repositories_Max_FieldsResolvers<ContextType>;
  dependency_additional_repositories_min_fields?: Dependency_Additional_Repositories_Min_FieldsResolvers<ContextType>;
  dependency_additional_repositories_stddev_fields?: Dependency_Additional_Repositories_Stddev_FieldsResolvers<ContextType>;
  dependency_additional_repositories_stddev_pop_fields?: Dependency_Additional_Repositories_Stddev_Pop_FieldsResolvers<ContextType>;
  dependency_additional_repositories_stddev_samp_fields?: Dependency_Additional_Repositories_Stddev_Samp_FieldsResolvers<ContextType>;
  dependency_additional_repositories_sum_fields?: Dependency_Additional_Repositories_Sum_FieldsResolvers<ContextType>;
  dependency_additional_repositories_var_pop_fields?: Dependency_Additional_Repositories_Var_Pop_FieldsResolvers<ContextType>;
  dependency_additional_repositories_var_samp_fields?: Dependency_Additional_Repositories_Var_Samp_FieldsResolvers<ContextType>;
  dependency_additional_repositories_variance_fields?: Dependency_Additional_Repositories_Variance_FieldsResolvers<ContextType>;
  dependency_registries?: Dependency_RegistriesResolvers<ContextType>;
  dependency_registries_aggregate?: Dependency_Registries_AggregateResolvers<ContextType>;
  dependency_registries_aggregate_fields?: Dependency_Registries_Aggregate_FieldsResolvers<ContextType>;
  dependency_registries_max_fields?: Dependency_Registries_Max_FieldsResolvers<ContextType>;
  dependency_registries_min_fields?: Dependency_Registries_Min_FieldsResolvers<ContextType>;
  dependency_scripts?: Dependency_ScriptsResolvers<ContextType>;
  dependency_scripts_aggregate?: Dependency_Scripts_AggregateResolvers<ContextType>;
  dependency_scripts_aggregate_fields?: Dependency_Scripts_Aggregate_FieldsResolvers<ContextType>;
  dependency_scripts_avg_fields?: Dependency_Scripts_Avg_FieldsResolvers<ContextType>;
  dependency_scripts_max_fields?: Dependency_Scripts_Max_FieldsResolvers<ContextType>;
  dependency_scripts_min_fields?: Dependency_Scripts_Min_FieldsResolvers<ContextType>;
  dependency_scripts_stddev_fields?: Dependency_Scripts_Stddev_FieldsResolvers<ContextType>;
  dependency_scripts_stddev_pop_fields?: Dependency_Scripts_Stddev_Pop_FieldsResolvers<ContextType>;
  dependency_scripts_stddev_samp_fields?: Dependency_Scripts_Stddev_Samp_FieldsResolvers<ContextType>;
  dependency_scripts_sum_fields?: Dependency_Scripts_Sum_FieldsResolvers<ContextType>;
  dependency_scripts_var_pop_fields?: Dependency_Scripts_Var_Pop_FieldsResolvers<ContextType>;
  dependency_scripts_var_samp_fields?: Dependency_Scripts_Var_Samp_FieldsResolvers<ContextType>;
  dependency_scripts_variance_fields?: Dependency_Scripts_Variance_FieldsResolvers<ContextType>;
  entity_tags?: Entity_TagsResolvers<ContextType>;
  favorites?: FavoritesResolvers<ContextType>;
  favorites_aggregate?: Favorites_AggregateResolvers<ContextType>;
  favorites_aggregate_fields?: Favorites_Aggregate_FieldsResolvers<ContextType>;
  favorites_avg_fields?: Favorites_Avg_FieldsResolvers<ContextType>;
  favorites_max_fields?: Favorites_Max_FieldsResolvers<ContextType>;
  favorites_min_fields?: Favorites_Min_FieldsResolvers<ContextType>;
  favorites_stddev_fields?: Favorites_Stddev_FieldsResolvers<ContextType>;
  favorites_stddev_pop_fields?: Favorites_Stddev_Pop_FieldsResolvers<ContextType>;
  favorites_stddev_samp_fields?: Favorites_Stddev_Samp_FieldsResolvers<ContextType>;
  favorites_sum_fields?: Favorites_Sum_FieldsResolvers<ContextType>;
  favorites_var_pop_fields?: Favorites_Var_Pop_FieldsResolvers<ContextType>;
  favorites_var_samp_fields?: Favorites_Var_Samp_FieldsResolvers<ContextType>;
  favorites_variance_fields?: Favorites_Variance_FieldsResolvers<ContextType>;
  feature_flags?: Feature_FlagsResolvers<ContextType>;
  float8?: GraphQLScalarType;
  jsonb?: GraphQLScalarType;
  jsonpath?: GraphQLScalarType;
  media?: MediaResolvers<ContextType>;
  minter_filters_metadata?: Minter_Filters_MetadataResolvers<ContextType>;
  minter_types?: Minter_TypesResolvers<ContextType>;
  minters_metadata?: Minters_MetadataResolvers<ContextType>;
  mutation_root?: Mutation_RootResolvers<ContextType>;
  numeric?: GraphQLScalarType;
  project_external_asset_dependencies?: Project_External_Asset_DependenciesResolvers<ContextType>;
  project_minter_configurations?: Project_Minter_ConfigurationsResolvers<ContextType>;
  project_scripts?: Project_ScriptsResolvers<ContextType>;
  project_series?: Project_SeriesResolvers<ContextType>;
  project_series_aggregate?: Project_Series_AggregateResolvers<ContextType>;
  project_series_aggregate_fields?: Project_Series_Aggregate_FieldsResolvers<ContextType>;
  project_series_avg_fields?: Project_Series_Avg_FieldsResolvers<ContextType>;
  project_series_max_fields?: Project_Series_Max_FieldsResolvers<ContextType>;
  project_series_min_fields?: Project_Series_Min_FieldsResolvers<ContextType>;
  project_series_stddev_fields?: Project_Series_Stddev_FieldsResolvers<ContextType>;
  project_series_stddev_pop_fields?: Project_Series_Stddev_Pop_FieldsResolvers<ContextType>;
  project_series_stddev_samp_fields?: Project_Series_Stddev_Samp_FieldsResolvers<ContextType>;
  project_series_sum_fields?: Project_Series_Sum_FieldsResolvers<ContextType>;
  project_series_var_pop_fields?: Project_Series_Var_Pop_FieldsResolvers<ContextType>;
  project_series_var_samp_fields?: Project_Series_Var_Samp_FieldsResolvers<ContextType>;
  project_series_variance_fields?: Project_Series_Variance_FieldsResolvers<ContextType>;
  project_vertical_categories?: Project_Vertical_CategoriesResolvers<ContextType>;
  project_verticals?: Project_VerticalsResolvers<ContextType>;
  projects_features?: Projects_FeaturesResolvers<ContextType>;
  projects_metadata?: Projects_MetadataResolvers<ContextType>;
  projects_metadata_aggregate?: Projects_Metadata_AggregateResolvers<ContextType>;
  projects_metadata_aggregate_fields?: Projects_Metadata_Aggregate_FieldsResolvers<ContextType>;
  projects_metadata_avg_fields?: Projects_Metadata_Avg_FieldsResolvers<ContextType>;
  projects_metadata_max_fields?: Projects_Metadata_Max_FieldsResolvers<ContextType>;
  projects_metadata_min_fields?: Projects_Metadata_Min_FieldsResolvers<ContextType>;
  projects_metadata_stddev_fields?: Projects_Metadata_Stddev_FieldsResolvers<ContextType>;
  projects_metadata_stddev_pop_fields?: Projects_Metadata_Stddev_Pop_FieldsResolvers<ContextType>;
  projects_metadata_stddev_samp_fields?: Projects_Metadata_Stddev_Samp_FieldsResolvers<ContextType>;
  projects_metadata_sum_fields?: Projects_Metadata_Sum_FieldsResolvers<ContextType>;
  projects_metadata_var_pop_fields?: Projects_Metadata_Var_Pop_FieldsResolvers<ContextType>;
  projects_metadata_var_samp_fields?: Projects_Metadata_Var_Samp_FieldsResolvers<ContextType>;
  projects_metadata_variance_fields?: Projects_Metadata_Variance_FieldsResolvers<ContextType>;
  proposed_artist_addresses_and_splits?: Proposed_Artist_Addresses_And_SplitsResolvers<ContextType>;
  query_root?: Query_RootResolvers<ContextType>;
  receipt_metadata?: Receipt_MetadataResolvers<ContextType>;
  receipt_metadata_aggregate?: Receipt_Metadata_AggregateResolvers<ContextType>;
  receipt_metadata_aggregate_fields?: Receipt_Metadata_Aggregate_FieldsResolvers<ContextType>;
  receipt_metadata_max_fields?: Receipt_Metadata_Max_FieldsResolvers<ContextType>;
  receipt_metadata_min_fields?: Receipt_Metadata_Min_FieldsResolvers<ContextType>;
  render_types?: Render_TypesResolvers<ContextType>;
  seed_float?: GraphQLScalarType;
  subscription_root?: Subscription_RootResolvers<ContextType>;
  tags?: TagsResolvers<ContextType>;
  timestamp?: GraphQLScalarType;
  timestamptz?: GraphQLScalarType;
  tokens_metadata?: Tokens_MetadataResolvers<ContextType>;
  tokens_metadata_aggregate?: Tokens_Metadata_AggregateResolvers<ContextType>;
  tokens_metadata_aggregate_fields?: Tokens_Metadata_Aggregate_FieldsResolvers<ContextType>;
  tokens_metadata_avg_fields?: Tokens_Metadata_Avg_FieldsResolvers<ContextType>;
  tokens_metadata_max_fields?: Tokens_Metadata_Max_FieldsResolvers<ContextType>;
  tokens_metadata_min_fields?: Tokens_Metadata_Min_FieldsResolvers<ContextType>;
  tokens_metadata_stddev_fields?: Tokens_Metadata_Stddev_FieldsResolvers<ContextType>;
  tokens_metadata_stddev_pop_fields?: Tokens_Metadata_Stddev_Pop_FieldsResolvers<ContextType>;
  tokens_metadata_stddev_samp_fields?: Tokens_Metadata_Stddev_Samp_FieldsResolvers<ContextType>;
  tokens_metadata_sum_fields?: Tokens_Metadata_Sum_FieldsResolvers<ContextType>;
  tokens_metadata_var_pop_fields?: Tokens_Metadata_Var_Pop_FieldsResolvers<ContextType>;
  tokens_metadata_var_samp_fields?: Tokens_Metadata_Var_Samp_FieldsResolvers<ContextType>;
  tokens_metadata_variance_fields?: Tokens_Metadata_Variance_FieldsResolvers<ContextType>;
  user_profiles?: User_ProfilesResolvers<ContextType>;
  user_profiles_aggregate?: User_Profiles_AggregateResolvers<ContextType>;
  user_profiles_aggregate_fields?: User_Profiles_Aggregate_FieldsResolvers<ContextType>;
  user_profiles_avg_fields?: User_Profiles_Avg_FieldsResolvers<ContextType>;
  user_profiles_max_fields?: User_Profiles_Max_FieldsResolvers<ContextType>;
  user_profiles_min_fields?: User_Profiles_Min_FieldsResolvers<ContextType>;
  user_profiles_stddev_fields?: User_Profiles_Stddev_FieldsResolvers<ContextType>;
  user_profiles_stddev_pop_fields?: User_Profiles_Stddev_Pop_FieldsResolvers<ContextType>;
  user_profiles_stddev_samp_fields?: User_Profiles_Stddev_Samp_FieldsResolvers<ContextType>;
  user_profiles_sum_fields?: User_Profiles_Sum_FieldsResolvers<ContextType>;
  user_profiles_var_pop_fields?: User_Profiles_Var_Pop_FieldsResolvers<ContextType>;
  user_profiles_var_samp_fields?: User_Profiles_Var_Samp_FieldsResolvers<ContextType>;
  user_profiles_variance_fields?: User_Profiles_Variance_FieldsResolvers<ContextType>;
  users?: UsersResolvers<ContextType>;
  users_aggregate?: Users_AggregateResolvers<ContextType>;
  users_aggregate_fields?: Users_Aggregate_FieldsResolvers<ContextType>;
  users_max_fields?: Users_Max_FieldsResolvers<ContextType>;
  users_min_fields?: Users_Min_FieldsResolvers<ContextType>;
  verticals?: VerticalsResolvers<ContextType>;
  video_aspect_ratios?: Video_Aspect_RatiosResolvers<ContextType>;
  video_frame_rates?: Video_Frame_RatesResolvers<ContextType>;
  webflow_artist_info?: Webflow_Artist_InfoResolvers<ContextType>;
  webflow_spectrum_articles?: Webflow_Spectrum_ArticlesResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cached?: CachedDirectiveResolver<any, any, ContextType>;
};

export const ProjectsMetadataDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectsMetadataDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"projects_metadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start_datetime"}},{"kind":"Field","name":{"kind":"Name","value":"vertical_name"}},{"kind":"Field","name":{"kind":"Name","value":"heritage_curation_status"}},{"kind":"Field","name":{"kind":"Name","value":"vertical"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category_name"}}]}}]}}]} as unknown as DocumentNode<ProjectsMetadataDetailsFragment, unknown>;
export const GetAllProjectsHasuraDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllProjectsHasuraDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects_metadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectsMetadataDetails"}}]}}]}},...ProjectsMetadataDetailsFragmentDoc.definitions]} as unknown as DocumentNode<GetAllProjectsHasuraDetailsQuery, GetAllProjectsHasuraDetailsQueryVariables>;