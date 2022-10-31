import gql from 'graphql-tag';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  /** Projects the account is listed as artist for */
  projectsCreated?: Maybe<Array<Project>>;
  /** Projects the account owns tokens from */
  projectsOwned?: Maybe<Array<AccountProject>>;
  tokens?: Maybe<Array<Token>>;
  /** Contracts the account is whitelisted on */
  whitelistedOn?: Maybe<Array<Whitelisting>>;
};


export type AccountProjectsCreatedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_Filter>;
};


export type AccountProjectsOwnedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountProject_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountProject_Filter>;
};


export type AccountTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};


export type AccountWhitelistedOnArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Whitelisting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Whitelisting_Filter>;
};

export type AccountProject = {
  __typename?: 'AccountProject';
  account: Account;
  count: Scalars['Int'];
  id: Scalars['ID'];
  project: Project;
};

export type AccountProject_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  count_gt?: InputMaybe<Scalars['Int']>;
  count_gte?: InputMaybe<Scalars['Int']>;
  count_in?: InputMaybe<Array<Scalars['Int']>>;
  count_lt?: InputMaybe<Scalars['Int']>;
  count_lte?: InputMaybe<Scalars['Int']>;
  count_not?: InputMaybe<Scalars['Int']>;
  count_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum AccountProject_OrderBy {
  Account = 'account',
  Count = 'count',
  Id = 'id',
  Project = 'project'
}

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  projectsCreated_?: InputMaybe<Project_Filter>;
  projectsOwned_?: InputMaybe<AccountProject_Filter>;
  tokens_?: InputMaybe<Token_Filter>;
  whitelistedOn_?: InputMaybe<Whitelisting_Filter>;
};

export enum Account_OrderBy {
  Id = 'id',
  ProjectsCreated = 'projectsCreated',
  ProjectsOwned = 'projectsOwned',
  Tokens = 'tokens',
  WhitelistedOn = 'whitelistedOn'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Contract = {
  __typename?: 'Contract';
  admin: Scalars['Bytes'];
  createdAt: Scalars['BigInt'];
  /** Curation registry contract address */
  curationRegistry?: Maybe<Scalars['Bytes']>;
  /** Dependency registry contract address */
  dependencyRegistry?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  /** List of contracts that are allowed to mint */
  mintWhitelisted: Array<Scalars['Bytes']>;
  /** Associated minter filter (if applicable) */
  minterFilter?: Maybe<MinterFilter>;
  /** New projects forbidden (can only be true on V3+ contracts) */
  newProjectsForbidden: Scalars['Boolean'];
  nextProjectId: Scalars['BigInt'];
  preferredArweaveGateway?: Maybe<Scalars['String']>;
  preferredIPFSGateway?: Maybe<Scalars['String']>;
  /** List of projects on the contract */
  projects?: Maybe<Array<Project>>;
  /** Randomizer contract used to generate token hashes */
  randomizerContract?: Maybe<Scalars['Bytes']>;
  /** Address that receives primary sales platform fees */
  renderProviderAddress: Scalars['Bytes'];
  /** Percentage of primary sales allocated to the platform */
  renderProviderPercentage: Scalars['BigInt'];
  /** Address that receives secondary sales platform royalties (null for pre-V3 contracts, check Royalty Registry) */
  renderProviderSecondarySalesAddress?: Maybe<Scalars['Bytes']>;
  /** Basis points of secondary sales allocated to the platform (null for pre-V3 contracts, check Royalty Registry) */
  renderProviderSecondarySalesBPS?: Maybe<Scalars['BigInt']>;
  /** List of tokens on the contract */
  tokens?: Maybe<Array<Token>>;
  /** Core contract type */
  type: CoreType;
  updatedAt: Scalars['BigInt'];
  /** Accounts whitelisted on the contract */
  whitelisted?: Maybe<Array<Whitelisting>>;
};


export type ContractProjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_Filter>;
};


export type ContractTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};


export type ContractWhitelistedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Whitelisting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Whitelisting_Filter>;
};

export type Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  admin?: InputMaybe<Scalars['Bytes']>;
  admin_contains?: InputMaybe<Scalars['Bytes']>;
  admin_in?: InputMaybe<Array<Scalars['Bytes']>>;
  admin_not?: InputMaybe<Scalars['Bytes']>;
  admin_not_contains?: InputMaybe<Scalars['Bytes']>;
  admin_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  curationRegistry?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_contains?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_in?: InputMaybe<Array<Scalars['Bytes']>>;
  curationRegistry_not?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_not_contains?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dependencyRegistry?: InputMaybe<Scalars['Bytes']>;
  dependencyRegistry_contains?: InputMaybe<Scalars['Bytes']>;
  dependencyRegistry_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dependencyRegistry_not?: InputMaybe<Scalars['Bytes']>;
  dependencyRegistry_not_contains?: InputMaybe<Scalars['Bytes']>;
  dependencyRegistry_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  mintWhitelisted?: InputMaybe<Array<Scalars['Bytes']>>;
  mintWhitelisted_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  mintWhitelisted_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  mintWhitelisted_not?: InputMaybe<Array<Scalars['Bytes']>>;
  mintWhitelisted_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  mintWhitelisted_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  minterFilter?: InputMaybe<Scalars['String']>;
  minterFilter_?: InputMaybe<MinterFilter_Filter>;
  minterFilter_contains?: InputMaybe<Scalars['String']>;
  minterFilter_contains_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_ends_with?: InputMaybe<Scalars['String']>;
  minterFilter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_gt?: InputMaybe<Scalars['String']>;
  minterFilter_gte?: InputMaybe<Scalars['String']>;
  minterFilter_in?: InputMaybe<Array<Scalars['String']>>;
  minterFilter_lt?: InputMaybe<Scalars['String']>;
  minterFilter_lte?: InputMaybe<Scalars['String']>;
  minterFilter_not?: InputMaybe<Scalars['String']>;
  minterFilter_not_contains?: InputMaybe<Scalars['String']>;
  minterFilter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_not_ends_with?: InputMaybe<Scalars['String']>;
  minterFilter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_not_in?: InputMaybe<Array<Scalars['String']>>;
  minterFilter_not_starts_with?: InputMaybe<Scalars['String']>;
  minterFilter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_starts_with?: InputMaybe<Scalars['String']>;
  minterFilter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newProjectsForbidden?: InputMaybe<Scalars['Boolean']>;
  newProjectsForbidden_in?: InputMaybe<Array<Scalars['Boolean']>>;
  newProjectsForbidden_not?: InputMaybe<Scalars['Boolean']>;
  newProjectsForbidden_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  nextProjectId?: InputMaybe<Scalars['BigInt']>;
  nextProjectId_gt?: InputMaybe<Scalars['BigInt']>;
  nextProjectId_gte?: InputMaybe<Scalars['BigInt']>;
  nextProjectId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nextProjectId_lt?: InputMaybe<Scalars['BigInt']>;
  nextProjectId_lte?: InputMaybe<Scalars['BigInt']>;
  nextProjectId_not?: InputMaybe<Scalars['BigInt']>;
  nextProjectId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  preferredArweaveGateway?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_contains?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_ends_with?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_gt?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_gte?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_in?: InputMaybe<Array<Scalars['String']>>;
  preferredArweaveGateway_lt?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_lte?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_not?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_not_contains?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_not_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_not_ends_with?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_not_in?: InputMaybe<Array<Scalars['String']>>;
  preferredArweaveGateway_not_starts_with?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_starts_with?: InputMaybe<Scalars['String']>;
  preferredArweaveGateway_starts_with_nocase?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_contains?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_ends_with?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_gt?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_gte?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_in?: InputMaybe<Array<Scalars['String']>>;
  preferredIPFSGateway_lt?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_lte?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_not?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_not_contains?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_not_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_not_ends_with?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_not_in?: InputMaybe<Array<Scalars['String']>>;
  preferredIPFSGateway_not_starts_with?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_starts_with?: InputMaybe<Scalars['String']>;
  preferredIPFSGateway_starts_with_nocase?: InputMaybe<Scalars['String']>;
  projects_?: InputMaybe<Project_Filter>;
  randomizerContract?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_contains?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  randomizerContract_not?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  renderProviderAddress?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_contains?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  renderProviderAddress_not?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  renderProviderPercentage?: InputMaybe<Scalars['BigInt']>;
  renderProviderPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  renderProviderPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  renderProviderPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  renderProviderPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  renderProviderPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  renderProviderPercentage_not?: InputMaybe<Scalars['BigInt']>;
  renderProviderPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  renderProviderSecondarySalesAddress?: InputMaybe<Scalars['Bytes']>;
  renderProviderSecondarySalesAddress_contains?: InputMaybe<Scalars['Bytes']>;
  renderProviderSecondarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  renderProviderSecondarySalesAddress_not?: InputMaybe<Scalars['Bytes']>;
  renderProviderSecondarySalesAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  renderProviderSecondarySalesAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  renderProviderSecondarySalesBPS?: InputMaybe<Scalars['BigInt']>;
  renderProviderSecondarySalesBPS_gt?: InputMaybe<Scalars['BigInt']>;
  renderProviderSecondarySalesBPS_gte?: InputMaybe<Scalars['BigInt']>;
  renderProviderSecondarySalesBPS_in?: InputMaybe<Array<Scalars['BigInt']>>;
  renderProviderSecondarySalesBPS_lt?: InputMaybe<Scalars['BigInt']>;
  renderProviderSecondarySalesBPS_lte?: InputMaybe<Scalars['BigInt']>;
  renderProviderSecondarySalesBPS_not?: InputMaybe<Scalars['BigInt']>;
  renderProviderSecondarySalesBPS_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokens_?: InputMaybe<Token_Filter>;
  type?: InputMaybe<CoreType>;
  type_in?: InputMaybe<Array<CoreType>>;
  type_not?: InputMaybe<CoreType>;
  type_not_in?: InputMaybe<Array<CoreType>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  whitelisted_?: InputMaybe<Whitelisting_Filter>;
};

export enum Contract_OrderBy {
  Admin = 'admin',
  CreatedAt = 'createdAt',
  CurationRegistry = 'curationRegistry',
  DependencyRegistry = 'dependencyRegistry',
  Id = 'id',
  MintWhitelisted = 'mintWhitelisted',
  MinterFilter = 'minterFilter',
  NewProjectsForbidden = 'newProjectsForbidden',
  NextProjectId = 'nextProjectId',
  PreferredArweaveGateway = 'preferredArweaveGateway',
  PreferredIpfsGateway = 'preferredIPFSGateway',
  Projects = 'projects',
  RandomizerContract = 'randomizerContract',
  RenderProviderAddress = 'renderProviderAddress',
  RenderProviderPercentage = 'renderProviderPercentage',
  RenderProviderSecondarySalesAddress = 'renderProviderSecondarySalesAddress',
  RenderProviderSecondarySalesBps = 'renderProviderSecondarySalesBPS',
  Tokens = 'tokens',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Whitelisted = 'whitelisted'
}

export enum CoreType {
  /** First Art Blocks flagship core */
  GenArt721CoreV0 = 'GenArt721CoreV0',
  /** Second Art Blocks flagship core */
  GenArt721CoreV1 = 'GenArt721CoreV1',
  /** Art Blocks Engine & Partner cores */
  GenArt721CoreV2 = 'GenArt721CoreV2',
  /** Third Art Blocks flagship core */
  GenArt721CoreV3 = 'GenArt721CoreV3'
}

export enum Exchange {
  /** LooksRare */
  LrV1 = 'LR_V1',
  /** Opensea Seaport */
  OsSp = 'OS_SP',
  /** Opensea V1 */
  OsV1 = 'OS_V1',
  /** Opensea V2 */
  OsV2 = 'OS_V2'
}

export type Minter = {
  __typename?: 'Minter';
  coreContract: Contract;
  /** Configuration details used by specific minters (json string) */
  extraMinterDetails: Scalars['String'];
  /** Unique identifier made up of minter contract address */
  id: Scalars['ID'];
  /** Maximum allowed half life in seconds (exponential Dutch auction minters) */
  maximumHalfLifeInSeconds?: Maybe<Scalars['BigInt']>;
  /** Minimum allowed auction length in seconds (linear Dutch auction minters) */
  minimumAuctionLengthInSeconds?: Maybe<Scalars['BigInt']>;
  /** Minimum allowed half life in seconds (exponential Dutch auction minters) */
  minimumHalfLifeInSeconds?: Maybe<Scalars['BigInt']>;
  /** Associated Minter Filter */
  minterFilter: MinterFilter;
  /** Minter type */
  type: MinterType;
  updatedAt: Scalars['BigInt'];
};

export type MinterFilter = {
  __typename?: 'MinterFilter';
  /** Minters associated with MinterFilter */
  associatedMinters: Array<Minter>;
  /** Associated core contract */
  coreContract: Contract;
  /** Unique identifier made up of minter filter contract address */
  id: Scalars['ID'];
  /** Minters allowlisted on MinterFilter */
  minterAllowlist: Array<Minter>;
  updatedAt: Scalars['BigInt'];
};


export type MinterFilterAssociatedMintersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Minter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Minter_Filter>;
};


export type MinterFilterMinterAllowlistArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Minter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Minter_Filter>;
};

export type MinterFilter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  associatedMinters_?: InputMaybe<Minter_Filter>;
  coreContract?: InputMaybe<Scalars['String']>;
  coreContract_?: InputMaybe<Contract_Filter>;
  coreContract_contains?: InputMaybe<Scalars['String']>;
  coreContract_contains_nocase?: InputMaybe<Scalars['String']>;
  coreContract_ends_with?: InputMaybe<Scalars['String']>;
  coreContract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coreContract_gt?: InputMaybe<Scalars['String']>;
  coreContract_gte?: InputMaybe<Scalars['String']>;
  coreContract_in?: InputMaybe<Array<Scalars['String']>>;
  coreContract_lt?: InputMaybe<Scalars['String']>;
  coreContract_lte?: InputMaybe<Scalars['String']>;
  coreContract_not?: InputMaybe<Scalars['String']>;
  coreContract_not_contains?: InputMaybe<Scalars['String']>;
  coreContract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  coreContract_not_ends_with?: InputMaybe<Scalars['String']>;
  coreContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coreContract_not_in?: InputMaybe<Array<Scalars['String']>>;
  coreContract_not_starts_with?: InputMaybe<Scalars['String']>;
  coreContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  coreContract_starts_with?: InputMaybe<Scalars['String']>;
  coreContract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  minterAllowlist?: InputMaybe<Array<Scalars['String']>>;
  minterAllowlist_?: InputMaybe<Minter_Filter>;
  minterAllowlist_contains?: InputMaybe<Array<Scalars['String']>>;
  minterAllowlist_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  minterAllowlist_not?: InputMaybe<Array<Scalars['String']>>;
  minterAllowlist_not_contains?: InputMaybe<Array<Scalars['String']>>;
  minterAllowlist_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum MinterFilter_OrderBy {
  AssociatedMinters = 'associatedMinters',
  CoreContract = 'coreContract',
  Id = 'id',
  MinterAllowlist = 'minterAllowlist',
  UpdatedAt = 'updatedAt'
}

export enum MinterType {
  MinterDaExpV0 = 'MinterDAExpV0',
  MinterDaExpV1 = 'MinterDAExpV1',
  MinterDaExpV2 = 'MinterDAExpV2',
  MinterDaLinV0 = 'MinterDALinV0',
  MinterDaLinV1 = 'MinterDALinV1',
  MinterDaLinV2 = 'MinterDALinV2',
  MinterHolderV0 = 'MinterHolderV0',
  MinterHolderV1 = 'MinterHolderV1',
  MinterMerkleV0 = 'MinterMerkleV0',
  MinterMerkleV1 = 'MinterMerkleV1',
  MinterMerkleV2 = 'MinterMerkleV2',
  MinterSetPriceErc20V0 = 'MinterSetPriceERC20V0',
  MinterSetPriceErc20V1 = 'MinterSetPriceERC20V1',
  MinterSetPriceErc20V2 = 'MinterSetPriceERC20V2',
  MinterSetPriceV0 = 'MinterSetPriceV0',
  MinterSetPriceV1 = 'MinterSetPriceV1',
  MinterSetPriceV2 = 'MinterSetPriceV2'
}

export type Minter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  coreContract?: InputMaybe<Scalars['String']>;
  coreContract_?: InputMaybe<Contract_Filter>;
  coreContract_contains?: InputMaybe<Scalars['String']>;
  coreContract_contains_nocase?: InputMaybe<Scalars['String']>;
  coreContract_ends_with?: InputMaybe<Scalars['String']>;
  coreContract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coreContract_gt?: InputMaybe<Scalars['String']>;
  coreContract_gte?: InputMaybe<Scalars['String']>;
  coreContract_in?: InputMaybe<Array<Scalars['String']>>;
  coreContract_lt?: InputMaybe<Scalars['String']>;
  coreContract_lte?: InputMaybe<Scalars['String']>;
  coreContract_not?: InputMaybe<Scalars['String']>;
  coreContract_not_contains?: InputMaybe<Scalars['String']>;
  coreContract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  coreContract_not_ends_with?: InputMaybe<Scalars['String']>;
  coreContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coreContract_not_in?: InputMaybe<Array<Scalars['String']>>;
  coreContract_not_starts_with?: InputMaybe<Scalars['String']>;
  coreContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  coreContract_starts_with?: InputMaybe<Scalars['String']>;
  coreContract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails?: InputMaybe<Scalars['String']>;
  extraMinterDetails_contains?: InputMaybe<Scalars['String']>;
  extraMinterDetails_contains_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_ends_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_ends_with_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_gt?: InputMaybe<Scalars['String']>;
  extraMinterDetails_gte?: InputMaybe<Scalars['String']>;
  extraMinterDetails_in?: InputMaybe<Array<Scalars['String']>>;
  extraMinterDetails_lt?: InputMaybe<Scalars['String']>;
  extraMinterDetails_lte?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_contains?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_contains_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_ends_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_in?: InputMaybe<Array<Scalars['String']>>;
  extraMinterDetails_not_starts_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_starts_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maximumHalfLifeInSeconds?: InputMaybe<Scalars['BigInt']>;
  maximumHalfLifeInSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  maximumHalfLifeInSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  maximumHalfLifeInSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maximumHalfLifeInSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  maximumHalfLifeInSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  maximumHalfLifeInSeconds_not?: InputMaybe<Scalars['BigInt']>;
  maximumHalfLifeInSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minimumAuctionLengthInSeconds?: InputMaybe<Scalars['BigInt']>;
  minimumAuctionLengthInSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  minimumAuctionLengthInSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  minimumAuctionLengthInSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minimumAuctionLengthInSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  minimumAuctionLengthInSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  minimumAuctionLengthInSeconds_not?: InputMaybe<Scalars['BigInt']>;
  minimumAuctionLengthInSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minimumHalfLifeInSeconds?: InputMaybe<Scalars['BigInt']>;
  minimumHalfLifeInSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  minimumHalfLifeInSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  minimumHalfLifeInSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minimumHalfLifeInSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  minimumHalfLifeInSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  minimumHalfLifeInSeconds_not?: InputMaybe<Scalars['BigInt']>;
  minimumHalfLifeInSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minterFilter?: InputMaybe<Scalars['String']>;
  minterFilter_?: InputMaybe<MinterFilter_Filter>;
  minterFilter_contains?: InputMaybe<Scalars['String']>;
  minterFilter_contains_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_ends_with?: InputMaybe<Scalars['String']>;
  minterFilter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_gt?: InputMaybe<Scalars['String']>;
  minterFilter_gte?: InputMaybe<Scalars['String']>;
  minterFilter_in?: InputMaybe<Array<Scalars['String']>>;
  minterFilter_lt?: InputMaybe<Scalars['String']>;
  minterFilter_lte?: InputMaybe<Scalars['String']>;
  minterFilter_not?: InputMaybe<Scalars['String']>;
  minterFilter_not_contains?: InputMaybe<Scalars['String']>;
  minterFilter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_not_ends_with?: InputMaybe<Scalars['String']>;
  minterFilter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_not_in?: InputMaybe<Array<Scalars['String']>>;
  minterFilter_not_starts_with?: InputMaybe<Scalars['String']>;
  minterFilter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  minterFilter_starts_with?: InputMaybe<Scalars['String']>;
  minterFilter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MinterType>;
  type_in?: InputMaybe<Array<MinterType>>;
  type_not?: InputMaybe<MinterType>;
  type_not_in?: InputMaybe<Array<MinterType>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Minter_OrderBy {
  CoreContract = 'coreContract',
  ExtraMinterDetails = 'extraMinterDetails',
  Id = 'id',
  MaximumHalfLifeInSeconds = 'maximumHalfLifeInSeconds',
  MinimumAuctionLengthInSeconds = 'minimumAuctionLengthInSeconds',
  MinimumHalfLifeInSeconds = 'minimumHalfLifeInSeconds',
  MinterFilter = 'minterFilter',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Payment = {
  __typename?: 'Payment';
  /** Payment id formatted: '{SaleId}-{paymentNumber}' (paymentNumber will be 0 for non-Seaport trades) */
  id: Scalars['ID'];
  /** The address of the token used for the payment */
  paymentToken: Scalars['Bytes'];
  /** Type of token transferred in this payment */
  paymentType: PaymentType;
  /** The price of the sale */
  price: Scalars['BigInt'];
  /** The recipient address */
  recipient: Scalars['Bytes'];
  /** The associated sale */
  sale: Sale;
};

export enum PaymentType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
  Native = 'Native'
}

export type Payment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  paymentToken?: InputMaybe<Scalars['Bytes']>;
  paymentToken_contains?: InputMaybe<Scalars['Bytes']>;
  paymentToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  paymentToken_not?: InputMaybe<Scalars['Bytes']>;
  paymentToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  paymentToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  paymentType?: InputMaybe<PaymentType>;
  paymentType_in?: InputMaybe<Array<PaymentType>>;
  paymentType_not?: InputMaybe<PaymentType>;
  paymentType_not_in?: InputMaybe<Array<PaymentType>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sale?: InputMaybe<Scalars['String']>;
  sale_?: InputMaybe<Sale_Filter>;
  sale_contains?: InputMaybe<Scalars['String']>;
  sale_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_ends_with?: InputMaybe<Scalars['String']>;
  sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_gt?: InputMaybe<Scalars['String']>;
  sale_gte?: InputMaybe<Scalars['String']>;
  sale_in?: InputMaybe<Array<Scalars['String']>>;
  sale_lt?: InputMaybe<Scalars['String']>;
  sale_lte?: InputMaybe<Scalars['String']>;
  sale_not?: InputMaybe<Scalars['String']>;
  sale_not_contains?: InputMaybe<Scalars['String']>;
  sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_not_ends_with?: InputMaybe<Scalars['String']>;
  sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_in?: InputMaybe<Array<Scalars['String']>>;
  sale_not_starts_with?: InputMaybe<Scalars['String']>;
  sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_starts_with?: InputMaybe<Scalars['String']>;
  sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Payment_OrderBy {
  Id = 'id',
  PaymentToken = 'paymentToken',
  PaymentType = 'paymentType',
  Price = 'price',
  Recipient = 'recipient',
  Sale = 'sale'
}

export type Project = {
  __typename?: 'Project';
  activatedAt?: Maybe<Scalars['BigInt']>;
  /** Determines if the project should be visible to the public */
  active: Scalars['Boolean'];
  /** Address to split primary sales with the artist */
  additionalPayee?: Maybe<Scalars['Bytes']>;
  /** Percentage of artist's share of primary sales that goes to additional payee */
  additionalPayeePercentage?: Maybe<Scalars['BigInt']>;
  /** Address to split Secondary sales with the artist */
  additionalPayeeSecondarySalesAddress?: Maybe<Scalars['Bytes']>;
  /** Percentage of artist's share of secondary sales that goes to additional payee */
  additionalPayeeSecondarySalesPercentage?: Maybe<Scalars['BigInt']>;
  /** Artist that created the project */
  artist: Account;
  /** Wallet address of the artist */
  artistAddress: Scalars['Bytes'];
  /** Artist name */
  artistName?: Maybe<Scalars['String']>;
  /** Aspect ratio of the project (see `scriptJSON` if null) */
  aspectRatio?: Maybe<Scalars['String']>;
  baseIpfsUri?: Maybe<Scalars['String']>;
  baseUri?: Maybe<Scalars['String']>;
  /** A project is complete when it has reached its maximum invocations */
  complete: Scalars['Boolean'];
  /** Timestamp at which a project was completed */
  completedAt?: Maybe<Scalars['BigInt']>;
  contract: Contract;
  createdAt: Scalars['BigInt'];
  /** Curated, playground, factory. A project with no curation status is considered factory */
  curationStatus?: Maybe<Scalars['String']>;
  /** ERC-20 contract address if the project is purchasable via ERC-20 */
  currencyAddress?: Maybe<Scalars['Bytes']>;
  /** Currency symbol for ERC-20 */
  currencySymbol?: Maybe<Scalars['String']>;
  /** Artist description of the project */
  description?: Maybe<Scalars['String']>;
  /** Is the project dynamic or a static image */
  dynamic: Scalars['Boolean'];
  externalAssetDependencies: Array<ProjectExternalAssetDependency>;
  /** Once the project's external asset dependencies are locked they may never be modified again */
  externalAssetDependenciesLocked: Scalars['Boolean'];
  /** The number of external asset dependencies stored on-chain */
  externalAssetDependencyCount: Scalars['BigInt'];
  /** Unique identifier made up of contract address and project id */
  id: Scalars['ID'];
  /** Number of times the project has been invoked - number of tokens of the project */
  invocations: Scalars['BigInt'];
  ipfsHash?: Maybe<Scalars['String']>;
  /** License for the project */
  license?: Maybe<Scalars['String']>;
  /** For V3 and-on, this field is null, and projects lock 4 weeks after `completedAt`. Once the project is locked its script may never be updated again. */
  locked?: Maybe<Scalars['Boolean']>;
  /** Maximum number of invocations allowed for the project */
  maxInvocations: Scalars['BigInt'];
  /** Minter configuration for this project (not implemented prior to minter filters) */
  minterConfiguration?: Maybe<ProjectMinterConfiguration>;
  /** Project name */
  name?: Maybe<Scalars['String']>;
  /** Accounts that own tokens of the project */
  owners?: Maybe<Array<AccountProject>>;
  /** Purchases paused */
  paused: Scalars['Boolean'];
  pricePerTokenInWei: Scalars['BigInt'];
  /** ID of the project on the contract */
  projectId: Scalars['BigInt'];
  /** Proposed Artist addresses and payment split percentages */
  proposedArtistAddressesAndSplits?: Maybe<ProposedArtistAddressesAndSplit>;
  /** Artist/additional payee royalty percentage */
  royaltyPercentage?: Maybe<Scalars['BigInt']>;
  /** Lookup table to get the Sale history of the project */
  saleLookupTables: Array<SaleLookupTable>;
  /** The full script composed of scripts */
  script?: Maybe<Scalars['String']>;
  /** The number of scripts stored on-chain */
  scriptCount: Scalars['BigInt'];
  /** Extra information about the script and rendering options */
  scriptJSON?: Maybe<Scalars['String']>;
  /** Script type and version (see `scriptJSON` if null) */
  scriptTypeAndVersion?: Maybe<Scalars['String']>;
  scriptUpdatedAt?: Maybe<Scalars['BigInt']>;
  /** Parts of the project script */
  scripts?: Maybe<Array<ProjectScript>>;
  /** Tokens of the project */
  tokens?: Maybe<Array<Token>>;
  updatedAt: Scalars['BigInt'];
  /** Does the project actually use the hash string */
  useHashString: Scalars['Boolean'];
  /** Does the project use media from ipfs */
  useIpfs?: Maybe<Scalars['Boolean']>;
  /** Artist or project website */
  website?: Maybe<Scalars['String']>;
};


export type ProjectExternalAssetDependenciesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectExternalAssetDependency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectExternalAssetDependency_Filter>;
};


export type ProjectOwnersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountProject_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountProject_Filter>;
};


export type ProjectSaleLookupTablesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SaleLookupTable_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SaleLookupTable_Filter>;
};


export type ProjectScriptsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectScript_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectScript_Filter>;
};


export type ProjectTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type ProjectExternalAssetDependency = {
  __typename?: 'ProjectExternalAssetDependency';
  /** The dependency cid */
  cid: Scalars['String'];
  /** The dependency type */
  dependencyType: ProjectExternalAssetDependencyType;
  /** Unique identifier made up of projectId-index */
  id: Scalars['ID'];
  /** The dependency index */
  index: Scalars['BigInt'];
  /** The associated project */
  project: Project;
};

export enum ProjectExternalAssetDependencyType {
  /** Asset hosted on Arweave */
  Arweave = 'ARWEAVE',
  /** Asset hosted on IPFS */
  Ipfs = 'IPFS'
}

export type ProjectExternalAssetDependency_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  cid?: InputMaybe<Scalars['String']>;
  cid_contains?: InputMaybe<Scalars['String']>;
  cid_contains_nocase?: InputMaybe<Scalars['String']>;
  cid_ends_with?: InputMaybe<Scalars['String']>;
  cid_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cid_gt?: InputMaybe<Scalars['String']>;
  cid_gte?: InputMaybe<Scalars['String']>;
  cid_in?: InputMaybe<Array<Scalars['String']>>;
  cid_lt?: InputMaybe<Scalars['String']>;
  cid_lte?: InputMaybe<Scalars['String']>;
  cid_not?: InputMaybe<Scalars['String']>;
  cid_not_contains?: InputMaybe<Scalars['String']>;
  cid_not_contains_nocase?: InputMaybe<Scalars['String']>;
  cid_not_ends_with?: InputMaybe<Scalars['String']>;
  cid_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cid_not_in?: InputMaybe<Array<Scalars['String']>>;
  cid_not_starts_with?: InputMaybe<Scalars['String']>;
  cid_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cid_starts_with?: InputMaybe<Scalars['String']>;
  cid_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dependencyType?: InputMaybe<ProjectExternalAssetDependencyType>;
  dependencyType_in?: InputMaybe<Array<ProjectExternalAssetDependencyType>>;
  dependencyType_not?: InputMaybe<ProjectExternalAssetDependencyType>;
  dependencyType_not_in?: InputMaybe<Array<ProjectExternalAssetDependencyType>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum ProjectExternalAssetDependency_OrderBy {
  Cid = 'cid',
  DependencyType = 'dependencyType',
  Id = 'id',
  Index = 'index',
  Project = 'project'
}

export type ProjectMinterConfiguration = {
  __typename?: 'ProjectMinterConfiguration';
  /** price of token or resting price of Duch auction, in wei */
  basePrice?: Maybe<Scalars['BigInt']>;
  /** currency address as defined on minter - address(0) reserved for ether */
  currencyAddress: Scalars['Bytes'];
  /** currency symbol as defined on minter - ETH reserved for ether */
  currencySymbol: Scalars['String'];
  /** Linear Dutch auction end time (unix timestamp) */
  endTime?: Maybe<Scalars['BigInt']>;
  /** Configuration details used by specific minter project configurations (json string) */
  extraMinterDetails: Scalars['String'];
  /** Half life for exponential decay Dutch auction, in seconds */
  halfLifeSeconds?: Maybe<Scalars['BigInt']>;
  /** Unique identifier made up of minter contract address-projectId */
  id: Scalars['ID'];
  /** The associated minter */
  minter: Minter;
  /** true if project's token price has been configured on minter */
  priceIsConfigured: Scalars['Boolean'];
  /** The associated project */
  project: Project;
  /** Defines if purchasing token to another is allowed */
  purchaseToDisabled: Scalars['Boolean'];
  /** Dutch auction start price, in wei */
  startPrice?: Maybe<Scalars['BigInt']>;
  /** Dutch auction start time (unix timestamp) */
  startTime?: Maybe<Scalars['BigInt']>;
};

export type ProjectMinterConfiguration_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  basePrice?: InputMaybe<Scalars['BigInt']>;
  basePrice_gt?: InputMaybe<Scalars['BigInt']>;
  basePrice_gte?: InputMaybe<Scalars['BigInt']>;
  basePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  basePrice_lt?: InputMaybe<Scalars['BigInt']>;
  basePrice_lte?: InputMaybe<Scalars['BigInt']>;
  basePrice_not?: InputMaybe<Scalars['BigInt']>;
  basePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currencyAddress?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_contains?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencyAddress_not?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencySymbol?: InputMaybe<Scalars['String']>;
  currencySymbol_contains?: InputMaybe<Scalars['String']>;
  currencySymbol_contains_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_ends_with?: InputMaybe<Scalars['String']>;
  currencySymbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_gt?: InputMaybe<Scalars['String']>;
  currencySymbol_gte?: InputMaybe<Scalars['String']>;
  currencySymbol_in?: InputMaybe<Array<Scalars['String']>>;
  currencySymbol_lt?: InputMaybe<Scalars['String']>;
  currencySymbol_lte?: InputMaybe<Scalars['String']>;
  currencySymbol_not?: InputMaybe<Scalars['String']>;
  currencySymbol_not_contains?: InputMaybe<Scalars['String']>;
  currencySymbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  currencySymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  currencySymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  currencySymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_starts_with?: InputMaybe<Scalars['String']>;
  currencySymbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['BigInt']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']>;
  endTime_not?: InputMaybe<Scalars['BigInt']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  extraMinterDetails?: InputMaybe<Scalars['String']>;
  extraMinterDetails_contains?: InputMaybe<Scalars['String']>;
  extraMinterDetails_contains_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_ends_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_ends_with_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_gt?: InputMaybe<Scalars['String']>;
  extraMinterDetails_gte?: InputMaybe<Scalars['String']>;
  extraMinterDetails_in?: InputMaybe<Array<Scalars['String']>>;
  extraMinterDetails_lt?: InputMaybe<Scalars['String']>;
  extraMinterDetails_lte?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_contains?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_contains_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_ends_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_in?: InputMaybe<Array<Scalars['String']>>;
  extraMinterDetails_not_starts_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  extraMinterDetails_starts_with?: InputMaybe<Scalars['String']>;
  extraMinterDetails_starts_with_nocase?: InputMaybe<Scalars['String']>;
  halfLifeSeconds?: InputMaybe<Scalars['BigInt']>;
  halfLifeSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  halfLifeSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  halfLifeSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  halfLifeSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  halfLifeSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  halfLifeSeconds_not?: InputMaybe<Scalars['BigInt']>;
  halfLifeSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  minter?: InputMaybe<Scalars['String']>;
  minter_?: InputMaybe<Minter_Filter>;
  minter_contains?: InputMaybe<Scalars['String']>;
  minter_contains_nocase?: InputMaybe<Scalars['String']>;
  minter_ends_with?: InputMaybe<Scalars['String']>;
  minter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minter_gt?: InputMaybe<Scalars['String']>;
  minter_gte?: InputMaybe<Scalars['String']>;
  minter_in?: InputMaybe<Array<Scalars['String']>>;
  minter_lt?: InputMaybe<Scalars['String']>;
  minter_lte?: InputMaybe<Scalars['String']>;
  minter_not?: InputMaybe<Scalars['String']>;
  minter_not_contains?: InputMaybe<Scalars['String']>;
  minter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  minter_not_ends_with?: InputMaybe<Scalars['String']>;
  minter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minter_not_in?: InputMaybe<Array<Scalars['String']>>;
  minter_not_starts_with?: InputMaybe<Scalars['String']>;
  minter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  minter_starts_with?: InputMaybe<Scalars['String']>;
  minter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  priceIsConfigured?: InputMaybe<Scalars['Boolean']>;
  priceIsConfigured_in?: InputMaybe<Array<Scalars['Boolean']>>;
  priceIsConfigured_not?: InputMaybe<Scalars['Boolean']>;
  priceIsConfigured_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
  purchaseToDisabled?: InputMaybe<Scalars['Boolean']>;
  purchaseToDisabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  purchaseToDisabled_not?: InputMaybe<Scalars['Boolean']>;
  purchaseToDisabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  startPrice?: InputMaybe<Scalars['BigInt']>;
  startPrice_gt?: InputMaybe<Scalars['BigInt']>;
  startPrice_gte?: InputMaybe<Scalars['BigInt']>;
  startPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startPrice_lt?: InputMaybe<Scalars['BigInt']>;
  startPrice_lte?: InputMaybe<Scalars['BigInt']>;
  startPrice_not?: InputMaybe<Scalars['BigInt']>;
  startPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTime?: InputMaybe<Scalars['BigInt']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']>;
  startTime_not?: InputMaybe<Scalars['BigInt']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ProjectMinterConfiguration_OrderBy {
  BasePrice = 'basePrice',
  CurrencyAddress = 'currencyAddress',
  CurrencySymbol = 'currencySymbol',
  EndTime = 'endTime',
  ExtraMinterDetails = 'extraMinterDetails',
  HalfLifeSeconds = 'halfLifeSeconds',
  Id = 'id',
  Minter = 'minter',
  PriceIsConfigured = 'priceIsConfigured',
  Project = 'project',
  PurchaseToDisabled = 'purchaseToDisabled',
  StartPrice = 'startPrice',
  StartTime = 'startTime'
}

export type ProjectScript = {
  __typename?: 'ProjectScript';
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  project: Project;
  script: Scalars['String'];
};

export type ProjectScript_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
  script_contains?: InputMaybe<Scalars['String']>;
  script_contains_nocase?: InputMaybe<Scalars['String']>;
  script_ends_with?: InputMaybe<Scalars['String']>;
  script_ends_with_nocase?: InputMaybe<Scalars['String']>;
  script_gt?: InputMaybe<Scalars['String']>;
  script_gte?: InputMaybe<Scalars['String']>;
  script_in?: InputMaybe<Array<Scalars['String']>>;
  script_lt?: InputMaybe<Scalars['String']>;
  script_lte?: InputMaybe<Scalars['String']>;
  script_not?: InputMaybe<Scalars['String']>;
  script_not_contains?: InputMaybe<Scalars['String']>;
  script_not_contains_nocase?: InputMaybe<Scalars['String']>;
  script_not_ends_with?: InputMaybe<Scalars['String']>;
  script_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  script_not_in?: InputMaybe<Array<Scalars['String']>>;
  script_not_starts_with?: InputMaybe<Scalars['String']>;
  script_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  script_starts_with?: InputMaybe<Scalars['String']>;
  script_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum ProjectScript_OrderBy {
  Id = 'id',
  Index = 'index',
  Project = 'project',
  Script = 'script'
}

export type Project_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activatedAt?: InputMaybe<Scalars['BigInt']>;
  activatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  activatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  activatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  activatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  activatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  activatedAt_not?: InputMaybe<Scalars['BigInt']>;
  activatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  active?: InputMaybe<Scalars['Boolean']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']>>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  additionalPayee?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePercentage?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePercentage_gt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePercentage_gte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalPayeePercentage_lt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePercentage_lte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePercentage_not?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalPayeeSecondarySalesAddress?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeeSecondarySalesAddress_not?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeeSecondarySalesPercentage?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalPayeeSecondarySalesPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_not?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalPayee_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayee_not?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_not_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  artist?: InputMaybe<Scalars['String']>;
  artistAddress?: InputMaybe<Scalars['Bytes']>;
  artistAddress_contains?: InputMaybe<Scalars['Bytes']>;
  artistAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  artistAddress_not?: InputMaybe<Scalars['Bytes']>;
  artistAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  artistAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  artistName?: InputMaybe<Scalars['String']>;
  artistName_contains?: InputMaybe<Scalars['String']>;
  artistName_contains_nocase?: InputMaybe<Scalars['String']>;
  artistName_ends_with?: InputMaybe<Scalars['String']>;
  artistName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  artistName_gt?: InputMaybe<Scalars['String']>;
  artistName_gte?: InputMaybe<Scalars['String']>;
  artistName_in?: InputMaybe<Array<Scalars['String']>>;
  artistName_lt?: InputMaybe<Scalars['String']>;
  artistName_lte?: InputMaybe<Scalars['String']>;
  artistName_not?: InputMaybe<Scalars['String']>;
  artistName_not_contains?: InputMaybe<Scalars['String']>;
  artistName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  artistName_not_ends_with?: InputMaybe<Scalars['String']>;
  artistName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  artistName_not_in?: InputMaybe<Array<Scalars['String']>>;
  artistName_not_starts_with?: InputMaybe<Scalars['String']>;
  artistName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  artistName_starts_with?: InputMaybe<Scalars['String']>;
  artistName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  artist_?: InputMaybe<Account_Filter>;
  artist_contains?: InputMaybe<Scalars['String']>;
  artist_contains_nocase?: InputMaybe<Scalars['String']>;
  artist_ends_with?: InputMaybe<Scalars['String']>;
  artist_ends_with_nocase?: InputMaybe<Scalars['String']>;
  artist_gt?: InputMaybe<Scalars['String']>;
  artist_gte?: InputMaybe<Scalars['String']>;
  artist_in?: InputMaybe<Array<Scalars['String']>>;
  artist_lt?: InputMaybe<Scalars['String']>;
  artist_lte?: InputMaybe<Scalars['String']>;
  artist_not?: InputMaybe<Scalars['String']>;
  artist_not_contains?: InputMaybe<Scalars['String']>;
  artist_not_contains_nocase?: InputMaybe<Scalars['String']>;
  artist_not_ends_with?: InputMaybe<Scalars['String']>;
  artist_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  artist_not_in?: InputMaybe<Array<Scalars['String']>>;
  artist_not_starts_with?: InputMaybe<Scalars['String']>;
  artist_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  artist_starts_with?: InputMaybe<Scalars['String']>;
  artist_starts_with_nocase?: InputMaybe<Scalars['String']>;
  aspectRatio?: InputMaybe<Scalars['String']>;
  aspectRatio_contains?: InputMaybe<Scalars['String']>;
  aspectRatio_contains_nocase?: InputMaybe<Scalars['String']>;
  aspectRatio_ends_with?: InputMaybe<Scalars['String']>;
  aspectRatio_ends_with_nocase?: InputMaybe<Scalars['String']>;
  aspectRatio_gt?: InputMaybe<Scalars['String']>;
  aspectRatio_gte?: InputMaybe<Scalars['String']>;
  aspectRatio_in?: InputMaybe<Array<Scalars['String']>>;
  aspectRatio_lt?: InputMaybe<Scalars['String']>;
  aspectRatio_lte?: InputMaybe<Scalars['String']>;
  aspectRatio_not?: InputMaybe<Scalars['String']>;
  aspectRatio_not_contains?: InputMaybe<Scalars['String']>;
  aspectRatio_not_contains_nocase?: InputMaybe<Scalars['String']>;
  aspectRatio_not_ends_with?: InputMaybe<Scalars['String']>;
  aspectRatio_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  aspectRatio_not_in?: InputMaybe<Array<Scalars['String']>>;
  aspectRatio_not_starts_with?: InputMaybe<Scalars['String']>;
  aspectRatio_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  aspectRatio_starts_with?: InputMaybe<Scalars['String']>;
  aspectRatio_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseIpfsUri?: InputMaybe<Scalars['String']>;
  baseIpfsUri_contains?: InputMaybe<Scalars['String']>;
  baseIpfsUri_contains_nocase?: InputMaybe<Scalars['String']>;
  baseIpfsUri_ends_with?: InputMaybe<Scalars['String']>;
  baseIpfsUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseIpfsUri_gt?: InputMaybe<Scalars['String']>;
  baseIpfsUri_gte?: InputMaybe<Scalars['String']>;
  baseIpfsUri_in?: InputMaybe<Array<Scalars['String']>>;
  baseIpfsUri_lt?: InputMaybe<Scalars['String']>;
  baseIpfsUri_lte?: InputMaybe<Scalars['String']>;
  baseIpfsUri_not?: InputMaybe<Scalars['String']>;
  baseIpfsUri_not_contains?: InputMaybe<Scalars['String']>;
  baseIpfsUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  baseIpfsUri_not_ends_with?: InputMaybe<Scalars['String']>;
  baseIpfsUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseIpfsUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  baseIpfsUri_not_starts_with?: InputMaybe<Scalars['String']>;
  baseIpfsUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseIpfsUri_starts_with?: InputMaybe<Scalars['String']>;
  baseIpfsUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseUri?: InputMaybe<Scalars['String']>;
  baseUri_contains?: InputMaybe<Scalars['String']>;
  baseUri_contains_nocase?: InputMaybe<Scalars['String']>;
  baseUri_ends_with?: InputMaybe<Scalars['String']>;
  baseUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseUri_gt?: InputMaybe<Scalars['String']>;
  baseUri_gte?: InputMaybe<Scalars['String']>;
  baseUri_in?: InputMaybe<Array<Scalars['String']>>;
  baseUri_lt?: InputMaybe<Scalars['String']>;
  baseUri_lte?: InputMaybe<Scalars['String']>;
  baseUri_not?: InputMaybe<Scalars['String']>;
  baseUri_not_contains?: InputMaybe<Scalars['String']>;
  baseUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  baseUri_not_ends_with?: InputMaybe<Scalars['String']>;
  baseUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  baseUri_not_starts_with?: InputMaybe<Scalars['String']>;
  baseUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseUri_starts_with?: InputMaybe<Scalars['String']>;
  baseUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  complete?: InputMaybe<Scalars['Boolean']>;
  complete_in?: InputMaybe<Array<Scalars['Boolean']>>;
  complete_not?: InputMaybe<Scalars['Boolean']>;
  complete_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  completedAt?: InputMaybe<Scalars['BigInt']>;
  completedAt_gt?: InputMaybe<Scalars['BigInt']>;
  completedAt_gte?: InputMaybe<Scalars['BigInt']>;
  completedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  completedAt_lt?: InputMaybe<Scalars['BigInt']>;
  completedAt_lte?: InputMaybe<Scalars['BigInt']>;
  completedAt_not?: InputMaybe<Scalars['BigInt']>;
  completedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  curationStatus?: InputMaybe<Scalars['String']>;
  curationStatus_contains?: InputMaybe<Scalars['String']>;
  curationStatus_contains_nocase?: InputMaybe<Scalars['String']>;
  curationStatus_ends_with?: InputMaybe<Scalars['String']>;
  curationStatus_ends_with_nocase?: InputMaybe<Scalars['String']>;
  curationStatus_gt?: InputMaybe<Scalars['String']>;
  curationStatus_gte?: InputMaybe<Scalars['String']>;
  curationStatus_in?: InputMaybe<Array<Scalars['String']>>;
  curationStatus_lt?: InputMaybe<Scalars['String']>;
  curationStatus_lte?: InputMaybe<Scalars['String']>;
  curationStatus_not?: InputMaybe<Scalars['String']>;
  curationStatus_not_contains?: InputMaybe<Scalars['String']>;
  curationStatus_not_contains_nocase?: InputMaybe<Scalars['String']>;
  curationStatus_not_ends_with?: InputMaybe<Scalars['String']>;
  curationStatus_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  curationStatus_not_in?: InputMaybe<Array<Scalars['String']>>;
  curationStatus_not_starts_with?: InputMaybe<Scalars['String']>;
  curationStatus_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  curationStatus_starts_with?: InputMaybe<Scalars['String']>;
  curationStatus_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currencyAddress?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_contains?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencyAddress_not?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencySymbol?: InputMaybe<Scalars['String']>;
  currencySymbol_contains?: InputMaybe<Scalars['String']>;
  currencySymbol_contains_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_ends_with?: InputMaybe<Scalars['String']>;
  currencySymbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_gt?: InputMaybe<Scalars['String']>;
  currencySymbol_gte?: InputMaybe<Scalars['String']>;
  currencySymbol_in?: InputMaybe<Array<Scalars['String']>>;
  currencySymbol_lt?: InputMaybe<Scalars['String']>;
  currencySymbol_lte?: InputMaybe<Scalars['String']>;
  currencySymbol_not?: InputMaybe<Scalars['String']>;
  currencySymbol_not_contains?: InputMaybe<Scalars['String']>;
  currencySymbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_not_ends_with?: InputMaybe<Scalars['String']>;
  currencySymbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  currencySymbol_not_starts_with?: InputMaybe<Scalars['String']>;
  currencySymbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currencySymbol_starts_with?: InputMaybe<Scalars['String']>;
  currencySymbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dynamic?: InputMaybe<Scalars['Boolean']>;
  dynamic_in?: InputMaybe<Array<Scalars['Boolean']>>;
  dynamic_not?: InputMaybe<Scalars['Boolean']>;
  dynamic_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  externalAssetDependenciesLocked?: InputMaybe<Scalars['Boolean']>;
  externalAssetDependenciesLocked_in?: InputMaybe<Array<Scalars['Boolean']>>;
  externalAssetDependenciesLocked_not?: InputMaybe<Scalars['Boolean']>;
  externalAssetDependenciesLocked_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  externalAssetDependencies_?: InputMaybe<ProjectExternalAssetDependency_Filter>;
  externalAssetDependencyCount?: InputMaybe<Scalars['BigInt']>;
  externalAssetDependencyCount_gt?: InputMaybe<Scalars['BigInt']>;
  externalAssetDependencyCount_gte?: InputMaybe<Scalars['BigInt']>;
  externalAssetDependencyCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  externalAssetDependencyCount_lt?: InputMaybe<Scalars['BigInt']>;
  externalAssetDependencyCount_lte?: InputMaybe<Scalars['BigInt']>;
  externalAssetDependencyCount_not?: InputMaybe<Scalars['BigInt']>;
  externalAssetDependencyCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  invocations?: InputMaybe<Scalars['BigInt']>;
  invocations_gt?: InputMaybe<Scalars['BigInt']>;
  invocations_gte?: InputMaybe<Scalars['BigInt']>;
  invocations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invocations_lt?: InputMaybe<Scalars['BigInt']>;
  invocations_lte?: InputMaybe<Scalars['BigInt']>;
  invocations_not?: InputMaybe<Scalars['BigInt']>;
  invocations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ipfsHash?: InputMaybe<Scalars['String']>;
  ipfsHash_contains?: InputMaybe<Scalars['String']>;
  ipfsHash_contains_nocase?: InputMaybe<Scalars['String']>;
  ipfsHash_ends_with?: InputMaybe<Scalars['String']>;
  ipfsHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ipfsHash_gt?: InputMaybe<Scalars['String']>;
  ipfsHash_gte?: InputMaybe<Scalars['String']>;
  ipfsHash_in?: InputMaybe<Array<Scalars['String']>>;
  ipfsHash_lt?: InputMaybe<Scalars['String']>;
  ipfsHash_lte?: InputMaybe<Scalars['String']>;
  ipfsHash_not?: InputMaybe<Scalars['String']>;
  ipfsHash_not_contains?: InputMaybe<Scalars['String']>;
  ipfsHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ipfsHash_not_ends_with?: InputMaybe<Scalars['String']>;
  ipfsHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ipfsHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  ipfsHash_not_starts_with?: InputMaybe<Scalars['String']>;
  ipfsHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ipfsHash_starts_with?: InputMaybe<Scalars['String']>;
  ipfsHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  license?: InputMaybe<Scalars['String']>;
  license_contains?: InputMaybe<Scalars['String']>;
  license_contains_nocase?: InputMaybe<Scalars['String']>;
  license_ends_with?: InputMaybe<Scalars['String']>;
  license_ends_with_nocase?: InputMaybe<Scalars['String']>;
  license_gt?: InputMaybe<Scalars['String']>;
  license_gte?: InputMaybe<Scalars['String']>;
  license_in?: InputMaybe<Array<Scalars['String']>>;
  license_lt?: InputMaybe<Scalars['String']>;
  license_lte?: InputMaybe<Scalars['String']>;
  license_not?: InputMaybe<Scalars['String']>;
  license_not_contains?: InputMaybe<Scalars['String']>;
  license_not_contains_nocase?: InputMaybe<Scalars['String']>;
  license_not_ends_with?: InputMaybe<Scalars['String']>;
  license_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  license_not_in?: InputMaybe<Array<Scalars['String']>>;
  license_not_starts_with?: InputMaybe<Scalars['String']>;
  license_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  license_starts_with?: InputMaybe<Scalars['String']>;
  license_starts_with_nocase?: InputMaybe<Scalars['String']>;
  locked?: InputMaybe<Scalars['Boolean']>;
  locked_in?: InputMaybe<Array<Scalars['Boolean']>>;
  locked_not?: InputMaybe<Scalars['Boolean']>;
  locked_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  maxInvocations?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_gt?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_gte?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxInvocations_lt?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_lte?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_not?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minterConfiguration?: InputMaybe<Scalars['String']>;
  minterConfiguration_?: InputMaybe<ProjectMinterConfiguration_Filter>;
  minterConfiguration_contains?: InputMaybe<Scalars['String']>;
  minterConfiguration_contains_nocase?: InputMaybe<Scalars['String']>;
  minterConfiguration_ends_with?: InputMaybe<Scalars['String']>;
  minterConfiguration_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minterConfiguration_gt?: InputMaybe<Scalars['String']>;
  minterConfiguration_gte?: InputMaybe<Scalars['String']>;
  minterConfiguration_in?: InputMaybe<Array<Scalars['String']>>;
  minterConfiguration_lt?: InputMaybe<Scalars['String']>;
  minterConfiguration_lte?: InputMaybe<Scalars['String']>;
  minterConfiguration_not?: InputMaybe<Scalars['String']>;
  minterConfiguration_not_contains?: InputMaybe<Scalars['String']>;
  minterConfiguration_not_contains_nocase?: InputMaybe<Scalars['String']>;
  minterConfiguration_not_ends_with?: InputMaybe<Scalars['String']>;
  minterConfiguration_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minterConfiguration_not_in?: InputMaybe<Array<Scalars['String']>>;
  minterConfiguration_not_starts_with?: InputMaybe<Scalars['String']>;
  minterConfiguration_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  minterConfiguration_starts_with?: InputMaybe<Scalars['String']>;
  minterConfiguration_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owners_?: InputMaybe<AccountProject_Filter>;
  paused?: InputMaybe<Scalars['Boolean']>;
  paused_in?: InputMaybe<Array<Scalars['Boolean']>>;
  paused_not?: InputMaybe<Scalars['Boolean']>;
  paused_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  pricePerTokenInWei?: InputMaybe<Scalars['BigInt']>;
  pricePerTokenInWei_gt?: InputMaybe<Scalars['BigInt']>;
  pricePerTokenInWei_gte?: InputMaybe<Scalars['BigInt']>;
  pricePerTokenInWei_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pricePerTokenInWei_lt?: InputMaybe<Scalars['BigInt']>;
  pricePerTokenInWei_lte?: InputMaybe<Scalars['BigInt']>;
  pricePerTokenInWei_not?: InputMaybe<Scalars['BigInt']>;
  pricePerTokenInWei_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  projectId?: InputMaybe<Scalars['BigInt']>;
  projectId_gt?: InputMaybe<Scalars['BigInt']>;
  projectId_gte?: InputMaybe<Scalars['BigInt']>;
  projectId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  projectId_lt?: InputMaybe<Scalars['BigInt']>;
  projectId_lte?: InputMaybe<Scalars['BigInt']>;
  projectId_not?: InputMaybe<Scalars['BigInt']>;
  projectId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedArtistAddressesAndSplits?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_?: InputMaybe<ProposedArtistAddressesAndSplit_Filter>;
  proposedArtistAddressesAndSplits_contains?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_contains_nocase?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_ends_with?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_gt?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_gte?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_in?: InputMaybe<Array<Scalars['String']>>;
  proposedArtistAddressesAndSplits_lt?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_lte?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_not?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_not_contains?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_not_ends_with?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposedArtistAddressesAndSplits_not_starts_with?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_starts_with?: InputMaybe<Scalars['String']>;
  proposedArtistAddressesAndSplits_starts_with_nocase?: InputMaybe<Scalars['String']>;
  royaltyPercentage?: InputMaybe<Scalars['BigInt']>;
  royaltyPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  royaltyPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  royaltyPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltyPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  royaltyPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  royaltyPercentage_not?: InputMaybe<Scalars['BigInt']>;
  royaltyPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  saleLookupTables_?: InputMaybe<SaleLookupTable_Filter>;
  script?: InputMaybe<Scalars['String']>;
  scriptCount?: InputMaybe<Scalars['BigInt']>;
  scriptCount_gt?: InputMaybe<Scalars['BigInt']>;
  scriptCount_gte?: InputMaybe<Scalars['BigInt']>;
  scriptCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  scriptCount_lt?: InputMaybe<Scalars['BigInt']>;
  scriptCount_lte?: InputMaybe<Scalars['BigInt']>;
  scriptCount_not?: InputMaybe<Scalars['BigInt']>;
  scriptCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  scriptJSON?: InputMaybe<Scalars['String']>;
  scriptJSON_contains?: InputMaybe<Scalars['String']>;
  scriptJSON_contains_nocase?: InputMaybe<Scalars['String']>;
  scriptJSON_ends_with?: InputMaybe<Scalars['String']>;
  scriptJSON_ends_with_nocase?: InputMaybe<Scalars['String']>;
  scriptJSON_gt?: InputMaybe<Scalars['String']>;
  scriptJSON_gte?: InputMaybe<Scalars['String']>;
  scriptJSON_in?: InputMaybe<Array<Scalars['String']>>;
  scriptJSON_lt?: InputMaybe<Scalars['String']>;
  scriptJSON_lte?: InputMaybe<Scalars['String']>;
  scriptJSON_not?: InputMaybe<Scalars['String']>;
  scriptJSON_not_contains?: InputMaybe<Scalars['String']>;
  scriptJSON_not_contains_nocase?: InputMaybe<Scalars['String']>;
  scriptJSON_not_ends_with?: InputMaybe<Scalars['String']>;
  scriptJSON_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  scriptJSON_not_in?: InputMaybe<Array<Scalars['String']>>;
  scriptJSON_not_starts_with?: InputMaybe<Scalars['String']>;
  scriptJSON_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scriptJSON_starts_with?: InputMaybe<Scalars['String']>;
  scriptJSON_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_contains?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_contains_nocase?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_ends_with?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_ends_with_nocase?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_gt?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_gte?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_in?: InputMaybe<Array<Scalars['String']>>;
  scriptTypeAndVersion_lt?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_lte?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_not?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_not_contains?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_not_contains_nocase?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_not_ends_with?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_not_in?: InputMaybe<Array<Scalars['String']>>;
  scriptTypeAndVersion_not_starts_with?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_starts_with?: InputMaybe<Scalars['String']>;
  scriptTypeAndVersion_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scriptUpdatedAt?: InputMaybe<Scalars['BigInt']>;
  scriptUpdatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  scriptUpdatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  scriptUpdatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  scriptUpdatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  scriptUpdatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  scriptUpdatedAt_not?: InputMaybe<Scalars['BigInt']>;
  scriptUpdatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  script_contains?: InputMaybe<Scalars['String']>;
  script_contains_nocase?: InputMaybe<Scalars['String']>;
  script_ends_with?: InputMaybe<Scalars['String']>;
  script_ends_with_nocase?: InputMaybe<Scalars['String']>;
  script_gt?: InputMaybe<Scalars['String']>;
  script_gte?: InputMaybe<Scalars['String']>;
  script_in?: InputMaybe<Array<Scalars['String']>>;
  script_lt?: InputMaybe<Scalars['String']>;
  script_lte?: InputMaybe<Scalars['String']>;
  script_not?: InputMaybe<Scalars['String']>;
  script_not_contains?: InputMaybe<Scalars['String']>;
  script_not_contains_nocase?: InputMaybe<Scalars['String']>;
  script_not_ends_with?: InputMaybe<Scalars['String']>;
  script_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  script_not_in?: InputMaybe<Array<Scalars['String']>>;
  script_not_starts_with?: InputMaybe<Scalars['String']>;
  script_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  script_starts_with?: InputMaybe<Scalars['String']>;
  script_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scripts_?: InputMaybe<ProjectScript_Filter>;
  tokens_?: InputMaybe<Token_Filter>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  useHashString?: InputMaybe<Scalars['Boolean']>;
  useHashString_in?: InputMaybe<Array<Scalars['Boolean']>>;
  useHashString_not?: InputMaybe<Scalars['Boolean']>;
  useHashString_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  useIpfs?: InputMaybe<Scalars['Boolean']>;
  useIpfs_in?: InputMaybe<Array<Scalars['Boolean']>>;
  useIpfs_not?: InputMaybe<Scalars['Boolean']>;
  useIpfs_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  website?: InputMaybe<Scalars['String']>;
  website_contains?: InputMaybe<Scalars['String']>;
  website_contains_nocase?: InputMaybe<Scalars['String']>;
  website_ends_with?: InputMaybe<Scalars['String']>;
  website_ends_with_nocase?: InputMaybe<Scalars['String']>;
  website_gt?: InputMaybe<Scalars['String']>;
  website_gte?: InputMaybe<Scalars['String']>;
  website_in?: InputMaybe<Array<Scalars['String']>>;
  website_lt?: InputMaybe<Scalars['String']>;
  website_lte?: InputMaybe<Scalars['String']>;
  website_not?: InputMaybe<Scalars['String']>;
  website_not_contains?: InputMaybe<Scalars['String']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']>;
  website_not_ends_with?: InputMaybe<Scalars['String']>;
  website_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  website_not_in?: InputMaybe<Array<Scalars['String']>>;
  website_not_starts_with?: InputMaybe<Scalars['String']>;
  website_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  website_starts_with?: InputMaybe<Scalars['String']>;
  website_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Project_OrderBy {
  ActivatedAt = 'activatedAt',
  Active = 'active',
  AdditionalPayee = 'additionalPayee',
  AdditionalPayeePercentage = 'additionalPayeePercentage',
  AdditionalPayeeSecondarySalesAddress = 'additionalPayeeSecondarySalesAddress',
  AdditionalPayeeSecondarySalesPercentage = 'additionalPayeeSecondarySalesPercentage',
  Artist = 'artist',
  ArtistAddress = 'artistAddress',
  ArtistName = 'artistName',
  AspectRatio = 'aspectRatio',
  BaseIpfsUri = 'baseIpfsUri',
  BaseUri = 'baseUri',
  Complete = 'complete',
  CompletedAt = 'completedAt',
  Contract = 'contract',
  CreatedAt = 'createdAt',
  CurationStatus = 'curationStatus',
  CurrencyAddress = 'currencyAddress',
  CurrencySymbol = 'currencySymbol',
  Description = 'description',
  Dynamic = 'dynamic',
  ExternalAssetDependencies = 'externalAssetDependencies',
  ExternalAssetDependenciesLocked = 'externalAssetDependenciesLocked',
  ExternalAssetDependencyCount = 'externalAssetDependencyCount',
  Id = 'id',
  Invocations = 'invocations',
  IpfsHash = 'ipfsHash',
  License = 'license',
  Locked = 'locked',
  MaxInvocations = 'maxInvocations',
  MinterConfiguration = 'minterConfiguration',
  Name = 'name',
  Owners = 'owners',
  Paused = 'paused',
  PricePerTokenInWei = 'pricePerTokenInWei',
  ProjectId = 'projectId',
  ProposedArtistAddressesAndSplits = 'proposedArtistAddressesAndSplits',
  RoyaltyPercentage = 'royaltyPercentage',
  SaleLookupTables = 'saleLookupTables',
  Script = 'script',
  ScriptCount = 'scriptCount',
  ScriptJson = 'scriptJSON',
  ScriptTypeAndVersion = 'scriptTypeAndVersion',
  ScriptUpdatedAt = 'scriptUpdatedAt',
  Scripts = 'scripts',
  Tokens = 'tokens',
  UpdatedAt = 'updatedAt',
  UseHashString = 'useHashString',
  UseIpfs = 'useIpfs',
  Website = 'website'
}

export type ProposedArtistAddressesAndSplit = {
  __typename?: 'ProposedArtistAddressesAndSplit';
  /** Proposed artist additional payee address for primary sales */
  additionalPayeePrimarySalesAddress: Scalars['Bytes'];
  /** Proposed artist additional payee percentage for primary sales */
  additionalPayeePrimarySalesPercentage: Scalars['BigInt'];
  /** Proposed artist additional payee address for secondary sales */
  additionalPayeeSecondarySalesAddress: Scalars['Bytes'];
  /** Proposed artist additional payee percentage for secondary sales */
  additionalPayeeSecondarySalesPercentage: Scalars['BigInt'];
  /** Proposed artist address */
  artistAddress: Scalars['Bytes'];
  createdAt: Scalars['BigInt'];
  /** Unique identifier made up of contract address and project id */
  id: Scalars['ID'];
  /** Project associated with this proposed artist addresses and splits */
  project: Project;
};

export type ProposedArtistAddressesAndSplit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  additionalPayeePrimarySalesAddress?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePrimarySalesAddress_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePrimarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeePrimarySalesAddress_not?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePrimarySalesAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePrimarySalesAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeePrimarySalesPercentage?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePrimarySalesPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePrimarySalesPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePrimarySalesPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalPayeePrimarySalesPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePrimarySalesPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePrimarySalesPercentage_not?: InputMaybe<Scalars['BigInt']>;
  additionalPayeePrimarySalesPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalPayeeSecondarySalesAddress?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeeSecondarySalesAddress_not?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeeSecondarySalesPercentage?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalPayeeSecondarySalesPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_not?: InputMaybe<Scalars['BigInt']>;
  additionalPayeeSecondarySalesPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  artistAddress?: InputMaybe<Scalars['Bytes']>;
  artistAddress_contains?: InputMaybe<Scalars['Bytes']>;
  artistAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  artistAddress_not?: InputMaybe<Scalars['Bytes']>;
  artistAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  artistAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum ProposedArtistAddressesAndSplit_OrderBy {
  AdditionalPayeePrimarySalesAddress = 'additionalPayeePrimarySalesAddress',
  AdditionalPayeePrimarySalesPercentage = 'additionalPayeePrimarySalesPercentage',
  AdditionalPayeeSecondarySalesAddress = 'additionalPayeeSecondarySalesAddress',
  AdditionalPayeeSecondarySalesPercentage = 'additionalPayeeSecondarySalesPercentage',
  ArtistAddress = 'artistAddress',
  CreatedAt = 'createdAt',
  Id = 'id',
  Project = 'project'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountProject?: Maybe<AccountProject>;
  accountProjects: Array<AccountProject>;
  accounts: Array<Account>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  minter?: Maybe<Minter>;
  minterFilter?: Maybe<MinterFilter>;
  minterFilters: Array<MinterFilter>;
  minters: Array<Minter>;
  payment?: Maybe<Payment>;
  payments: Array<Payment>;
  project?: Maybe<Project>;
  projectExternalAssetDependencies: Array<ProjectExternalAssetDependency>;
  projectExternalAssetDependency?: Maybe<ProjectExternalAssetDependency>;
  projectMinterConfiguration?: Maybe<ProjectMinterConfiguration>;
  projectMinterConfigurations: Array<ProjectMinterConfiguration>;
  projectScript?: Maybe<ProjectScript>;
  projectScripts: Array<ProjectScript>;
  projects: Array<Project>;
  proposedArtistAddressesAndSplit?: Maybe<ProposedArtistAddressesAndSplit>;
  proposedArtistAddressesAndSplits: Array<ProposedArtistAddressesAndSplit>;
  sale?: Maybe<Sale>;
  saleLookupTable?: Maybe<SaleLookupTable>;
  saleLookupTables: Array<SaleLookupTable>;
  sales: Array<Sale>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  whitelisting?: Maybe<Whitelisting>;
  whitelistings: Array<Whitelisting>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountProject_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountProject_Filter>;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type QueryMinterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMinterFilterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMinterFiltersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinterFilter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MinterFilter_Filter>;
};


export type QueryMintersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Minter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Minter_Filter>;
};


export type QueryPaymentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPaymentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Payment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Payment_Filter>;
};


export type QueryProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectExternalAssetDependenciesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectExternalAssetDependency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectExternalAssetDependency_Filter>;
};


export type QueryProjectExternalAssetDependencyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectMinterConfigurationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectMinterConfigurationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectMinterConfiguration_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectMinterConfiguration_Filter>;
};


export type QueryProjectScriptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectScriptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectScript_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectScript_Filter>;
};


export type QueryProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type QueryProposedArtistAddressesAndSplitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposedArtistAddressesAndSplitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposedArtistAddressesAndSplit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposedArtistAddressesAndSplit_Filter>;
};


export type QuerySaleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySaleLookupTableArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySaleLookupTablesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SaleLookupTable_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SaleLookupTable_Filter>;
};


export type QuerySalesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Sale_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type QueryWhitelistingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWhitelistingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Whitelisting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Whitelisting_Filter>;
};

export type Sale = {
  __typename?: 'Sale';
  /** The block number of the sale */
  blockNumber: Scalars['BigInt'];
  /** The timestamp of the sale */
  blockTimestamp: Scalars['BigInt'];
  /** The buyer address */
  buyer: Scalars['Bytes'];
  /** The exchange used for this sale */
  exchange: Exchange;
  /** The sale id formated: tokenId - token.nextSaleId (using first token sold for bundles) for Opensea V1/V2, orderHash from sale event for Looksrare and Seaport */
  id: Scalars['ID'];
  /** Private sales are flagged by this boolean */
  isPrivate: Scalars['Boolean'];
  /** List of Payment tokens involved in this sale */
  payments: Array<Payment>;
  /** Lookup table to get the list of Tokens sold in this sale */
  saleLookupTables: Array<SaleLookupTable>;
  /** The sale type (Single | Bundle) */
  saleType: SaleType;
  /** The seller address */
  seller: Scalars['Bytes'];
  /** A raw formated string of the token(s) sold (i.e TokenID1::TokenID2::TokenID3) */
  summaryTokensSold: Scalars['String'];
  /** The hash of the transaction */
  txHash: Scalars['Bytes'];
};


export type SalePaymentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Payment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Payment_Filter>;
};


export type SaleSaleLookupTablesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SaleLookupTable_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SaleLookupTable_Filter>;
};

export type SaleLookupTable = {
  __typename?: 'SaleLookupTable';
  /** The block number of the sale */
  blockNumber: Scalars['BigInt'];
  /** Set to `Project Id::Token Id::Sale Id */
  id: Scalars['ID'];
  /** The associated project */
  project: Project;
  /** The associated sale */
  sale: Sale;
  /** Timestamp of the sale */
  timestamp: Scalars['BigInt'];
  /** The token sold */
  token: Token;
};

export type SaleLookupTable_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale?: InputMaybe<Scalars['String']>;
  sale_?: InputMaybe<Sale_Filter>;
  sale_contains?: InputMaybe<Scalars['String']>;
  sale_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_ends_with?: InputMaybe<Scalars['String']>;
  sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_gt?: InputMaybe<Scalars['String']>;
  sale_gte?: InputMaybe<Scalars['String']>;
  sale_in?: InputMaybe<Array<Scalars['String']>>;
  sale_lt?: InputMaybe<Scalars['String']>;
  sale_lte?: InputMaybe<Scalars['String']>;
  sale_not?: InputMaybe<Scalars['String']>;
  sale_not_contains?: InputMaybe<Scalars['String']>;
  sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_not_ends_with?: InputMaybe<Scalars['String']>;
  sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_in?: InputMaybe<Array<Scalars['String']>>;
  sale_not_starts_with?: InputMaybe<Scalars['String']>;
  sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_starts_with?: InputMaybe<Scalars['String']>;
  sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum SaleLookupTable_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Project = 'project',
  Sale = 'sale',
  Timestamp = 'timestamp',
  Token = 'token'
}

export enum SaleType {
  Bundle = 'Bundle',
  Single = 'Single'
}

export type Sale_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  exchange?: InputMaybe<Exchange>;
  exchange_in?: InputMaybe<Array<Exchange>>;
  exchange_not?: InputMaybe<Exchange>;
  exchange_not_in?: InputMaybe<Array<Exchange>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  isPrivate_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isPrivate_not?: InputMaybe<Scalars['Boolean']>;
  isPrivate_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  payments_?: InputMaybe<Payment_Filter>;
  saleLookupTables_?: InputMaybe<SaleLookupTable_Filter>;
  saleType?: InputMaybe<SaleType>;
  saleType_in?: InputMaybe<Array<SaleType>>;
  saleType_not?: InputMaybe<SaleType>;
  saleType_not_in?: InputMaybe<Array<SaleType>>;
  seller?: InputMaybe<Scalars['Bytes']>;
  seller_contains?: InputMaybe<Scalars['Bytes']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_not?: InputMaybe<Scalars['Bytes']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  summaryTokensSold?: InputMaybe<Scalars['String']>;
  summaryTokensSold_contains?: InputMaybe<Scalars['String']>;
  summaryTokensSold_contains_nocase?: InputMaybe<Scalars['String']>;
  summaryTokensSold_ends_with?: InputMaybe<Scalars['String']>;
  summaryTokensSold_ends_with_nocase?: InputMaybe<Scalars['String']>;
  summaryTokensSold_gt?: InputMaybe<Scalars['String']>;
  summaryTokensSold_gte?: InputMaybe<Scalars['String']>;
  summaryTokensSold_in?: InputMaybe<Array<Scalars['String']>>;
  summaryTokensSold_lt?: InputMaybe<Scalars['String']>;
  summaryTokensSold_lte?: InputMaybe<Scalars['String']>;
  summaryTokensSold_not?: InputMaybe<Scalars['String']>;
  summaryTokensSold_not_contains?: InputMaybe<Scalars['String']>;
  summaryTokensSold_not_contains_nocase?: InputMaybe<Scalars['String']>;
  summaryTokensSold_not_ends_with?: InputMaybe<Scalars['String']>;
  summaryTokensSold_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  summaryTokensSold_not_in?: InputMaybe<Array<Scalars['String']>>;
  summaryTokensSold_not_starts_with?: InputMaybe<Scalars['String']>;
  summaryTokensSold_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  summaryTokensSold_starts_with?: InputMaybe<Scalars['String']>;
  summaryTokensSold_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Sale_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Buyer = 'buyer',
  Exchange = 'exchange',
  Id = 'id',
  IsPrivate = 'isPrivate',
  Payments = 'payments',
  SaleLookupTables = 'saleLookupTables',
  SaleType = 'saleType',
  Seller = 'seller',
  SummaryTokensSold = 'summaryTokensSold',
  TxHash = 'txHash'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountProject?: Maybe<AccountProject>;
  accountProjects: Array<AccountProject>;
  accounts: Array<Account>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  minter?: Maybe<Minter>;
  minterFilter?: Maybe<MinterFilter>;
  minterFilters: Array<MinterFilter>;
  minters: Array<Minter>;
  payment?: Maybe<Payment>;
  payments: Array<Payment>;
  project?: Maybe<Project>;
  projectExternalAssetDependencies: Array<ProjectExternalAssetDependency>;
  projectExternalAssetDependency?: Maybe<ProjectExternalAssetDependency>;
  projectMinterConfiguration?: Maybe<ProjectMinterConfiguration>;
  projectMinterConfigurations: Array<ProjectMinterConfiguration>;
  projectScript?: Maybe<ProjectScript>;
  projectScripts: Array<ProjectScript>;
  projects: Array<Project>;
  proposedArtistAddressesAndSplit?: Maybe<ProposedArtistAddressesAndSplit>;
  proposedArtistAddressesAndSplits: Array<ProposedArtistAddressesAndSplit>;
  sale?: Maybe<Sale>;
  saleLookupTable?: Maybe<SaleLookupTable>;
  saleLookupTables: Array<SaleLookupTable>;
  sales: Array<Sale>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  whitelisting?: Maybe<Whitelisting>;
  whitelistings: Array<Whitelisting>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountProject_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountProject_Filter>;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type SubscriptionMinterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMinterFilterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMinterFiltersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinterFilter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MinterFilter_Filter>;
};


export type SubscriptionMintersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Minter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Minter_Filter>;
};


export type SubscriptionPaymentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPaymentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Payment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Payment_Filter>;
};


export type SubscriptionProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectExternalAssetDependenciesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectExternalAssetDependency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectExternalAssetDependency_Filter>;
};


export type SubscriptionProjectExternalAssetDependencyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectMinterConfigurationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectMinterConfigurationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectMinterConfiguration_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectMinterConfiguration_Filter>;
};


export type SubscriptionProjectScriptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectScriptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectScript_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectScript_Filter>;
};


export type SubscriptionProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type SubscriptionProposedArtistAddressesAndSplitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposedArtistAddressesAndSplitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposedArtistAddressesAndSplit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposedArtistAddressesAndSplit_Filter>;
};


export type SubscriptionSaleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSaleLookupTableArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSaleLookupTablesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SaleLookupTable_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SaleLookupTable_Filter>;
};


export type SubscriptionSalesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Sale_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type SubscriptionWhitelistingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWhitelistingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Whitelisting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Whitelisting_Filter>;
};

export type Token = {
  __typename?: 'Token';
  /** Contract the token is on */
  contract: Contract;
  createdAt: Scalars['BigInt'];
  /** Unique string used as input to the tokens project script */
  hash: Scalars['Bytes'];
  /** Unique identifier made up of contract address and token id */
  id: Scalars['ID'];
  /** Invocation number of the project */
  invocation: Scalars['BigInt'];
  /** Next available sale id */
  nextSaleId: Scalars['BigInt'];
  /** Current owner of the token */
  owner: Account;
  /** Project of the token */
  project: Project;
  /** Lookup table to get the Sale history */
  saleLookupTables: Array<SaleLookupTable>;
  /** ID of the token on the contract */
  tokenId: Scalars['BigInt'];
  /** Transaction hash of token mint */
  transactionHash: Scalars['Bytes'];
  transfers?: Maybe<Array<Transfer>>;
  updatedAt: Scalars['BigInt'];
  uri?: Maybe<Scalars['String']>;
};


export type TokenSaleLookupTablesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SaleLookupTable_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SaleLookupTable_Filter>;
};


export type TokenTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transfer_Filter>;
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  contract?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hash?: InputMaybe<Scalars['Bytes']>;
  hash_contains?: InputMaybe<Scalars['Bytes']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hash_not?: InputMaybe<Scalars['Bytes']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  invocation?: InputMaybe<Scalars['BigInt']>;
  invocation_gt?: InputMaybe<Scalars['BigInt']>;
  invocation_gte?: InputMaybe<Scalars['BigInt']>;
  invocation_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invocation_lt?: InputMaybe<Scalars['BigInt']>;
  invocation_lte?: InputMaybe<Scalars['BigInt']>;
  invocation_not?: InputMaybe<Scalars['BigInt']>;
  invocation_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nextSaleId?: InputMaybe<Scalars['BigInt']>;
  nextSaleId_gt?: InputMaybe<Scalars['BigInt']>;
  nextSaleId_gte?: InputMaybe<Scalars['BigInt']>;
  nextSaleId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nextSaleId_lt?: InputMaybe<Scalars['BigInt']>;
  nextSaleId_lte?: InputMaybe<Scalars['BigInt']>;
  nextSaleId_not?: InputMaybe<Scalars['BigInt']>;
  nextSaleId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Scalars['String']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
  saleLookupTables_?: InputMaybe<SaleLookupTable_Filter>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transfers_?: InputMaybe<Transfer_Filter>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  uri?: InputMaybe<Scalars['String']>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Token_OrderBy {
  Contract = 'contract',
  CreatedAt = 'createdAt',
  Hash = 'hash',
  Id = 'id',
  Invocation = 'invocation',
  NextSaleId = 'nextSaleId',
  Owner = 'owner',
  Project = 'project',
  SaleLookupTables = 'saleLookupTables',
  TokenId = 'tokenId',
  TransactionHash = 'transactionHash',
  Transfers = 'transfers',
  UpdatedAt = 'updatedAt',
  Uri = 'uri'
}

export type Transfer = {
  __typename?: 'Transfer';
  createdAt: Scalars['BigInt'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  to: Scalars['Bytes'];
  token: Token;
  transactionHash: Scalars['Bytes'];
};

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_OrderBy {
  CreatedAt = 'createdAt',
  From = 'from',
  Id = 'id',
  To = 'to',
  Token = 'token',
  TransactionHash = 'transactionHash'
}

export type Whitelisting = {
  __typename?: 'Whitelisting';
  account: Account;
  contract: Contract;
  id: Scalars['ID'];
};

export type Whitelisting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract?: InputMaybe<Scalars['String']>;
  contract_?: InputMaybe<Contract_Filter>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Whitelisting_OrderBy {
  Account = 'account',
  Contract = 'contract',
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetContractProjectsMinimalQueryVariables = Exact<{
  id: Scalars['ID'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetContractProjectsMinimalQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', projects?: Array<{ __typename?: 'Project', projectId: string }> | null | undefined } | null | undefined };

export type GetContractProjectsQueryVariables = Exact<{
  id: Scalars['ID'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetContractProjectsQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', projects?: Array<{ __typename?: 'Project', projectId: string, name?: string | null | undefined, invocations: string, maxInvocations: string, curationStatus?: string | null | undefined, active: boolean, artistName?: string | null | undefined, contract: { __typename?: 'Contract', id: string } }> | null | undefined } | null | undefined };

export type GetContractOpenProjectsQueryVariables = Exact<{
  id: Scalars['ID'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetContractOpenProjectsQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', projects?: Array<{ __typename?: 'Project', projectId: string, name?: string | null | undefined, invocations: string, maxInvocations: string, curationStatus?: string | null | undefined, active: boolean, contract: { __typename?: 'Contract', id: string } }> | null | undefined } | null | undefined };

export type GetContractProjectQueryVariables = Exact<{
  id: Scalars['ID'];
  projectId: Scalars['BigInt'];
}>;


export type GetContractProjectQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', projects?: Array<{ __typename?: 'Project', name?: string | null | undefined, invocations: string, maxInvocations: string, active: boolean, curationStatus?: string | null | undefined, artistName?: string | null | undefined, contract: { __typename?: 'Contract', id: string } }> | null | undefined } | null | undefined };

export type GetContractProjectsWithCurationStatusQueryVariables = Exact<{
  id: Scalars['ID'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
  curationStatus?: InputMaybe<Scalars['String']>;
}>;


export type GetContractProjectsWithCurationStatusQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', projects?: Array<{ __typename?: 'Project', projectId: string, name?: string | null | undefined, invocations: string, maxInvocations: string, active: boolean, curationStatus?: string | null | undefined, contract: { __typename?: 'Contract', id: string } }> | null | undefined } | null | undefined };

export type GetWalletTokensQueryVariables = Exact<{
  wallet: Scalars['String'];
  contracts: Array<Scalars['String']> | Scalars['String'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetWalletTokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', invocation: string, project: { __typename?: 'Project', name?: string | null | undefined } }> };

export type GetEngineContractsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type GetEngineContractsQuery = { __typename?: 'Query', contracts: Array<{ __typename?: 'Contract', id: string }> };


export const GetContractProjectsMinimalDocument = gql`
    query getContractProjectsMinimal($id: ID!, $first: Int!, $skip: Int) {
  contract(id: $id) {
    projects(first: $first, skip: $skip, orderBy: projectId) {
      projectId
    }
  }
}
    `;
export const GetContractProjectsDocument = gql`
    query getContractProjects($id: ID!, $first: Int!, $skip: Int) {
  contract(id: $id) {
    projects(first: $first, skip: $skip, orderBy: projectId) {
      projectId
      name
      invocations
      maxInvocations
      curationStatus
      active
      artistName
      contract {
        id
      }
    }
  }
}
    `;
export const GetContractOpenProjectsDocument = gql`
    query getContractOpenProjects($id: ID!, $first: Int!, $skip: Int) {
  contract(id: $id) {
    projects(
      first: $first
      skip: $skip
      orderBy: projectId
      where: {paused: false, active: true, complete: false}
    ) {
      projectId
      name
      invocations
      maxInvocations
      curationStatus
      active
      contract {
        id
      }
    }
  }
}
    `;
export const GetContractProjectDocument = gql`
    query getContractProject($id: ID!, $projectId: BigInt!) {
  contract(id: $id) {
    projects(where: {projectId: $projectId}) {
      name
      invocations
      maxInvocations
      active
      curationStatus
      artistName
      contract {
        id
      }
    }
  }
}
    `;
export const GetContractProjectsWithCurationStatusDocument = gql`
    query getContractProjectsWithCurationStatus($id: ID!, $first: Int!, $skip: Int, $curationStatus: String) {
  contract(id: $id) {
    projects(
      where: {curationStatus: $curationStatus, active: true}
      first: $first
      skip: $skip
      orderBy: projectId
    ) {
      projectId
      name
      invocations
      maxInvocations
      active
      curationStatus
      contract {
        id
      }
    }
  }
}
    `;
export const GetWalletTokensDocument = gql`
    query getWalletTokens($wallet: String!, $contracts: [String!]!, $first: Int!, $skip: Int) {
  tokens(
    first: $first
    skip: $skip
    where: {owner: $wallet, contract_in: $contracts}
  ) {
    invocation
    project {
      name
    }
  }
}
    `;
export const GetEngineContractsDocument = gql`
    query getEngineContracts($ids: [ID!]) {
  contracts(where: {id_not_in: $ids}) {
    id
  }
}
    `;

export const GetContractProjectsMinimalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContractProjectsMinimal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"projectId"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}}]}}]}}]} as unknown as DocumentNode<GetContractProjectsMinimalQuery, GetContractProjectsMinimalQueryVariables>;
export const GetContractProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContractProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"projectId"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"invocations"}},{"kind":"Field","name":{"kind":"Name","value":"maxInvocations"}},{"kind":"Field","name":{"kind":"Name","value":"curationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"artistName"}},{"kind":"Field","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetContractProjectsQuery, GetContractProjectsQueryVariables>;
export const GetContractOpenProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContractOpenProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"projectId"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"paused"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"active"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"complete"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"invocations"}},{"kind":"Field","name":{"kind":"Name","value":"maxInvocations"}},{"kind":"Field","name":{"kind":"Name","value":"curationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetContractOpenProjectsQuery, GetContractOpenProjectsQueryVariables>;
export const GetContractProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContractProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"invocations"}},{"kind":"Field","name":{"kind":"Name","value":"maxInvocations"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"curationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"artistName"}},{"kind":"Field","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetContractProjectQuery, GetContractProjectQueryVariables>;
export const GetContractProjectsWithCurationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContractProjectsWithCurationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"curationStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"curationStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"curationStatus"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"active"},"value":{"kind":"BooleanValue","value":true}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"projectId"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"invocations"}},{"kind":"Field","name":{"kind":"Name","value":"maxInvocations"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"curationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetContractProjectsWithCurationStatusQuery, GetContractProjectsWithCurationStatusQueryVariables>;
export const GetWalletTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWalletTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contracts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"contract_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contracts"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invocation"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetWalletTokensQuery, GetWalletTokensQueryVariables>;
export const GetEngineContractsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEngineContracts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contracts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_not_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetEngineContractsQuery, GetEngineContractsQueryVariables>;