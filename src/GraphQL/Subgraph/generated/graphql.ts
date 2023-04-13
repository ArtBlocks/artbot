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
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  /** Projects the account is listed as artist for */
  projectsCreated?: Maybe<Array<Project>>;
  /** Projects the account owns tokens from */
  projectsOwned?: Maybe<Array<AccountProject>>;
  /** Receipts for the account, on minters with settlement */
  receipts?: Maybe<Array<Receipt>>;
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


export type AccountReceiptsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Receipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Receipt_Filter>;
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
  and?: InputMaybe<Array<InputMaybe<AccountProject_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<AccountProject_Filter>>>;
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
  AccountId = 'account__id',
  Count = 'count',
  Id = 'id',
  Project = 'project',
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website'
}

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  projectsCreated_?: InputMaybe<Project_Filter>;
  projectsOwned_?: InputMaybe<AccountProject_Filter>;
  receipts_?: InputMaybe<Receipt_Filter>;
  tokens_?: InputMaybe<Token_Filter>;
  whitelistedOn_?: InputMaybe<Whitelisting_Filter>;
};

export enum Account_OrderBy {
  Id = 'id',
  ProjectsCreated = 'projectsCreated',
  ProjectsOwned = 'projectsOwned',
  Receipts = 'receipts',
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
  /** Automatically approve all artist split proposals (used on V3 Engine contracts) */
  autoApproveArtistSplitProposals?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['BigInt'];
  /** Curation registry contract address */
  curationRegistry?: Maybe<Scalars['Bytes']>;
  /** Dependency registry contract address */
  dependencyRegistry?: Maybe<DependencyRegistry>;
  /** Address that receives primary sales platform fees, only for V3_Engine contracts */
  enginePlatformProviderAddress?: Maybe<Scalars['Bytes']>;
  /** Percentage of primary sales allocated to the platform, only for V3_Engine contracts */
  enginePlatformProviderPercentage?: Maybe<Scalars['BigInt']>;
  /** Address that receives secondary sales platform royalties, only for V3_Engine contracts */
  enginePlatformProviderSecondarySalesAddress?: Maybe<Scalars['Bytes']>;
  /** Basis points of secondary sales allocated to the platform, only for V3_Engine contracts */
  enginePlatformProviderSecondarySalesBPS?: Maybe<Scalars['BigInt']>;
  /** Unique identifier made up of the contract address */
  id: Scalars['ID'];
  /** List of contracts that are allowed to mint */
  mintWhitelisted: Array<Scalars['Bytes']>;
  /** Associated minter filter (if being indexed) - not always indexed for Engine contracts */
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
  /** Latest engine registry that this contract is registered with, if any (used for indexing purposes) */
  registeredOn?: Maybe<EngineRegistry>;
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
  admin_gt?: InputMaybe<Scalars['Bytes']>;
  admin_gte?: InputMaybe<Scalars['Bytes']>;
  admin_in?: InputMaybe<Array<Scalars['Bytes']>>;
  admin_lt?: InputMaybe<Scalars['Bytes']>;
  admin_lte?: InputMaybe<Scalars['Bytes']>;
  admin_not?: InputMaybe<Scalars['Bytes']>;
  admin_not_contains?: InputMaybe<Scalars['Bytes']>;
  admin_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<Contract_Filter>>>;
  autoApproveArtistSplitProposals?: InputMaybe<Scalars['Boolean']>;
  autoApproveArtistSplitProposals_in?: InputMaybe<Array<Scalars['Boolean']>>;
  autoApproveArtistSplitProposals_not?: InputMaybe<Scalars['Boolean']>;
  autoApproveArtistSplitProposals_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  curationRegistry_gt?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_gte?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_in?: InputMaybe<Array<Scalars['Bytes']>>;
  curationRegistry_lt?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_lte?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_not?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_not_contains?: InputMaybe<Scalars['Bytes']>;
  curationRegistry_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dependencyRegistry?: InputMaybe<Scalars['String']>;
  dependencyRegistry_?: InputMaybe<DependencyRegistry_Filter>;
  dependencyRegistry_contains?: InputMaybe<Scalars['String']>;
  dependencyRegistry_contains_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_ends_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_gt?: InputMaybe<Scalars['String']>;
  dependencyRegistry_gte?: InputMaybe<Scalars['String']>;
  dependencyRegistry_in?: InputMaybe<Array<Scalars['String']>>;
  dependencyRegistry_lt?: InputMaybe<Scalars['String']>;
  dependencyRegistry_lte?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_contains?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_ends_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_in?: InputMaybe<Array<Scalars['String']>>;
  dependencyRegistry_not_starts_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_starts_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_starts_with_nocase?: InputMaybe<Scalars['String']>;
  enginePlatformProviderAddress?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_contains?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_gt?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_gte?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  enginePlatformProviderAddress_lt?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_lte?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_not?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  enginePlatformProviderPercentage?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  enginePlatformProviderPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderPercentage_not?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  enginePlatformProviderSecondarySalesAddress?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_contains?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_gt?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_gte?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  enginePlatformProviderSecondarySalesAddress_lt?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_lte?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_not?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  enginePlatformProviderSecondarySalesAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  enginePlatformProviderSecondarySalesBPS?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderSecondarySalesBPS_gt?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderSecondarySalesBPS_gte?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderSecondarySalesBPS_in?: InputMaybe<Array<Scalars['BigInt']>>;
  enginePlatformProviderSecondarySalesBPS_lt?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderSecondarySalesBPS_lte?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderSecondarySalesBPS_not?: InputMaybe<Scalars['BigInt']>;
  enginePlatformProviderSecondarySalesBPS_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  or?: InputMaybe<Array<InputMaybe<Contract_Filter>>>;
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
  randomizerContract_gt?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_gte?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  randomizerContract_lt?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_lte?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_not?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  randomizerContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  registeredOn?: InputMaybe<Scalars['String']>;
  registeredOn_?: InputMaybe<EngineRegistry_Filter>;
  registeredOn_contains?: InputMaybe<Scalars['String']>;
  registeredOn_contains_nocase?: InputMaybe<Scalars['String']>;
  registeredOn_ends_with?: InputMaybe<Scalars['String']>;
  registeredOn_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registeredOn_gt?: InputMaybe<Scalars['String']>;
  registeredOn_gte?: InputMaybe<Scalars['String']>;
  registeredOn_in?: InputMaybe<Array<Scalars['String']>>;
  registeredOn_lt?: InputMaybe<Scalars['String']>;
  registeredOn_lte?: InputMaybe<Scalars['String']>;
  registeredOn_not?: InputMaybe<Scalars['String']>;
  registeredOn_not_contains?: InputMaybe<Scalars['String']>;
  registeredOn_not_contains_nocase?: InputMaybe<Scalars['String']>;
  registeredOn_not_ends_with?: InputMaybe<Scalars['String']>;
  registeredOn_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  registeredOn_not_in?: InputMaybe<Array<Scalars['String']>>;
  registeredOn_not_starts_with?: InputMaybe<Scalars['String']>;
  registeredOn_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  registeredOn_starts_with?: InputMaybe<Scalars['String']>;
  registeredOn_starts_with_nocase?: InputMaybe<Scalars['String']>;
  renderProviderAddress?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_contains?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_gt?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_gte?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  renderProviderAddress_lt?: InputMaybe<Scalars['Bytes']>;
  renderProviderAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  renderProviderSecondarySalesAddress_gt?: InputMaybe<Scalars['Bytes']>;
  renderProviderSecondarySalesAddress_gte?: InputMaybe<Scalars['Bytes']>;
  renderProviderSecondarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  renderProviderSecondarySalesAddress_lt?: InputMaybe<Scalars['Bytes']>;
  renderProviderSecondarySalesAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  AutoApproveArtistSplitProposals = 'autoApproveArtistSplitProposals',
  CreatedAt = 'createdAt',
  CurationRegistry = 'curationRegistry',
  DependencyRegistry = 'dependencyRegistry',
  DependencyRegistryId = 'dependencyRegistry__id',
  DependencyRegistryOwner = 'dependencyRegistry__owner',
  DependencyRegistryUpdatedAt = 'dependencyRegistry__updatedAt',
  EnginePlatformProviderAddress = 'enginePlatformProviderAddress',
  EnginePlatformProviderPercentage = 'enginePlatformProviderPercentage',
  EnginePlatformProviderSecondarySalesAddress = 'enginePlatformProviderSecondarySalesAddress',
  EnginePlatformProviderSecondarySalesBps = 'enginePlatformProviderSecondarySalesBPS',
  Id = 'id',
  MintWhitelisted = 'mintWhitelisted',
  MinterFilter = 'minterFilter',
  MinterFilterId = 'minterFilter__id',
  MinterFilterUpdatedAt = 'minterFilter__updatedAt',
  NewProjectsForbidden = 'newProjectsForbidden',
  NextProjectId = 'nextProjectId',
  PreferredArweaveGateway = 'preferredArweaveGateway',
  PreferredIpfsGateway = 'preferredIPFSGateway',
  Projects = 'projects',
  RandomizerContract = 'randomizerContract',
  RegisteredOn = 'registeredOn',
  RegisteredOnId = 'registeredOn__id',
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
  GenArt721CoreV3 = 'GenArt721CoreV3',
  /** V3 Derivative - Art Blocks Engine core */
  GenArt721CoreV3Engine = 'GenArt721CoreV3_Engine',
  /** V3 Derivative - Art Blocks Engine Flex core */
  GenArt721CoreV3EngineFlex = 'GenArt721CoreV3_Engine_Flex'
}

export type Dependency = {
  __typename?: 'Dependency';
  /** Number of additional CDNs for this dependency */
  additionalCDNCount: Scalars['BigInt'];
  /** Additional CDNs for this dependency */
  additionalCDNs: Array<DependencyAdditionalCdn>;
  /** Number of additional repositories for this dependency */
  additionalRepositories: Array<DependencyAdditionalRepository>;
  /** Additional repositories for this dependency */
  additionalRepositoryCount: Scalars['BigInt'];
  /** Depenency registry contract that this dependency is registered on */
  dependencyRegistry: DependencyRegistry;
  /** Unique identifier made up of dependency name and version separated by an @ symbol (e.g. p5js@1.0.0) */
  id: Scalars['ID'];
  /** Preffered CDN for this dependency */
  preferredCDN: Scalars['String'];
  /** Preffered repository for this dependency */
  preferredRepository: Scalars['String'];
  /** Reference website for this dependency (e.g. https://p5js.org) */
  referenceWebsite: Scalars['String'];
  /** Concatenated string of all scripts for this dependency */
  script?: Maybe<Scalars['String']>;
  /** Number of on-chain scripts for this dependency */
  scriptCount: Scalars['BigInt'];
  /** List of on-chain scripts that for this dependency */
  scripts: Array<DependencyScript>;
  /** Timestamp of last update */
  updatedAt: Scalars['BigInt'];
};


export type DependencyAdditionalCdNsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyAdditionalCdn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DependencyAdditionalCdn_Filter>;
};


export type DependencyAdditionalRepositoriesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyAdditionalRepository_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DependencyAdditionalRepository_Filter>;
};


export type DependencyScriptsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyScript_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DependencyScript_Filter>;
};

export type DependencyAdditionalCdn = {
  __typename?: 'DependencyAdditionalCDN';
  /** URL of the CDN */
  cdn: Scalars['String'];
  /** Dependency this additional CDN belongs to */
  dependency: Dependency;
  /** Unique identifier made up of dependency id and index */
  id: Scalars['ID'];
  /** Index of this additional CDN */
  index: Scalars['BigInt'];
};

export type DependencyAdditionalCdn_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DependencyAdditionalCdn_Filter>>>;
  cdn?: InputMaybe<Scalars['String']>;
  cdn_contains?: InputMaybe<Scalars['String']>;
  cdn_contains_nocase?: InputMaybe<Scalars['String']>;
  cdn_ends_with?: InputMaybe<Scalars['String']>;
  cdn_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cdn_gt?: InputMaybe<Scalars['String']>;
  cdn_gte?: InputMaybe<Scalars['String']>;
  cdn_in?: InputMaybe<Array<Scalars['String']>>;
  cdn_lt?: InputMaybe<Scalars['String']>;
  cdn_lte?: InputMaybe<Scalars['String']>;
  cdn_not?: InputMaybe<Scalars['String']>;
  cdn_not_contains?: InputMaybe<Scalars['String']>;
  cdn_not_contains_nocase?: InputMaybe<Scalars['String']>;
  cdn_not_ends_with?: InputMaybe<Scalars['String']>;
  cdn_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cdn_not_in?: InputMaybe<Array<Scalars['String']>>;
  cdn_not_starts_with?: InputMaybe<Scalars['String']>;
  cdn_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cdn_starts_with?: InputMaybe<Scalars['String']>;
  cdn_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dependency?: InputMaybe<Scalars['String']>;
  dependency_?: InputMaybe<Dependency_Filter>;
  dependency_contains?: InputMaybe<Scalars['String']>;
  dependency_contains_nocase?: InputMaybe<Scalars['String']>;
  dependency_ends_with?: InputMaybe<Scalars['String']>;
  dependency_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_gt?: InputMaybe<Scalars['String']>;
  dependency_gte?: InputMaybe<Scalars['String']>;
  dependency_in?: InputMaybe<Array<Scalars['String']>>;
  dependency_lt?: InputMaybe<Scalars['String']>;
  dependency_lte?: InputMaybe<Scalars['String']>;
  dependency_not?: InputMaybe<Scalars['String']>;
  dependency_not_contains?: InputMaybe<Scalars['String']>;
  dependency_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dependency_not_ends_with?: InputMaybe<Scalars['String']>;
  dependency_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_not_in?: InputMaybe<Array<Scalars['String']>>;
  dependency_not_starts_with?: InputMaybe<Scalars['String']>;
  dependency_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_starts_with?: InputMaybe<Scalars['String']>;
  dependency_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  or?: InputMaybe<Array<InputMaybe<DependencyAdditionalCdn_Filter>>>;
};

export enum DependencyAdditionalCdn_OrderBy {
  Cdn = 'cdn',
  Dependency = 'dependency',
  DependencyAdditionalCdnCount = 'dependency__additionalCDNCount',
  DependencyAdditionalRepositoryCount = 'dependency__additionalRepositoryCount',
  DependencyId = 'dependency__id',
  DependencyPreferredCdn = 'dependency__preferredCDN',
  DependencyPreferredRepository = 'dependency__preferredRepository',
  DependencyReferenceWebsite = 'dependency__referenceWebsite',
  DependencyScript = 'dependency__script',
  DependencyScriptCount = 'dependency__scriptCount',
  DependencyUpdatedAt = 'dependency__updatedAt',
  Id = 'id',
  Index = 'index'
}

export type DependencyAdditionalRepository = {
  __typename?: 'DependencyAdditionalRepository';
  /** Dependency this additional repository belongs to */
  dependency: Dependency;
  /** Unique identifier made up of dependency id and index */
  id: Scalars['ID'];
  /** Index of this additional repository */
  index: Scalars['BigInt'];
  /** URL of the repository */
  repository: Scalars['String'];
};

export type DependencyAdditionalRepository_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DependencyAdditionalRepository_Filter>>>;
  dependency?: InputMaybe<Scalars['String']>;
  dependency_?: InputMaybe<Dependency_Filter>;
  dependency_contains?: InputMaybe<Scalars['String']>;
  dependency_contains_nocase?: InputMaybe<Scalars['String']>;
  dependency_ends_with?: InputMaybe<Scalars['String']>;
  dependency_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_gt?: InputMaybe<Scalars['String']>;
  dependency_gte?: InputMaybe<Scalars['String']>;
  dependency_in?: InputMaybe<Array<Scalars['String']>>;
  dependency_lt?: InputMaybe<Scalars['String']>;
  dependency_lte?: InputMaybe<Scalars['String']>;
  dependency_not?: InputMaybe<Scalars['String']>;
  dependency_not_contains?: InputMaybe<Scalars['String']>;
  dependency_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dependency_not_ends_with?: InputMaybe<Scalars['String']>;
  dependency_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_not_in?: InputMaybe<Array<Scalars['String']>>;
  dependency_not_starts_with?: InputMaybe<Scalars['String']>;
  dependency_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_starts_with?: InputMaybe<Scalars['String']>;
  dependency_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  or?: InputMaybe<Array<InputMaybe<DependencyAdditionalRepository_Filter>>>;
  repository?: InputMaybe<Scalars['String']>;
  repository_contains?: InputMaybe<Scalars['String']>;
  repository_contains_nocase?: InputMaybe<Scalars['String']>;
  repository_ends_with?: InputMaybe<Scalars['String']>;
  repository_ends_with_nocase?: InputMaybe<Scalars['String']>;
  repository_gt?: InputMaybe<Scalars['String']>;
  repository_gte?: InputMaybe<Scalars['String']>;
  repository_in?: InputMaybe<Array<Scalars['String']>>;
  repository_lt?: InputMaybe<Scalars['String']>;
  repository_lte?: InputMaybe<Scalars['String']>;
  repository_not?: InputMaybe<Scalars['String']>;
  repository_not_contains?: InputMaybe<Scalars['String']>;
  repository_not_contains_nocase?: InputMaybe<Scalars['String']>;
  repository_not_ends_with?: InputMaybe<Scalars['String']>;
  repository_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  repository_not_in?: InputMaybe<Array<Scalars['String']>>;
  repository_not_starts_with?: InputMaybe<Scalars['String']>;
  repository_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  repository_starts_with?: InputMaybe<Scalars['String']>;
  repository_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum DependencyAdditionalRepository_OrderBy {
  Dependency = 'dependency',
  DependencyAdditionalCdnCount = 'dependency__additionalCDNCount',
  DependencyAdditionalRepositoryCount = 'dependency__additionalRepositoryCount',
  DependencyId = 'dependency__id',
  DependencyPreferredCdn = 'dependency__preferredCDN',
  DependencyPreferredRepository = 'dependency__preferredRepository',
  DependencyReferenceWebsite = 'dependency__referenceWebsite',
  DependencyScript = 'dependency__script',
  DependencyScriptCount = 'dependency__scriptCount',
  DependencyUpdatedAt = 'dependency__updatedAt',
  Id = 'id',
  Index = 'index',
  Repository = 'repository'
}

export type DependencyRegistry = {
  __typename?: 'DependencyRegistry';
  /** List of dependencies that are registered on this registry contract */
  dependencies?: Maybe<Array<Dependency>>;
  /** Unique identifier made up of dependency registry contract address */
  id: Scalars['Bytes'];
  /** Current owner of this contract */
  owner: Scalars['Bytes'];
  /** Core contracts that this registry can provide dependeny overrides for */
  supportedCoreContracts: Array<Contract>;
  /** Timestamp of last update */
  updatedAt: Scalars['BigInt'];
};


export type DependencyRegistryDependenciesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dependency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Dependency_Filter>;
};


export type DependencyRegistrySupportedCoreContractsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Contract_Filter>;
};

export type DependencyRegistry_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DependencyRegistry_Filter>>>;
  dependencies_?: InputMaybe<Dependency_Filter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<DependencyRegistry_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  supportedCoreContracts_?: InputMaybe<Contract_Filter>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DependencyRegistry_OrderBy {
  Dependencies = 'dependencies',
  Id = 'id',
  Owner = 'owner',
  SupportedCoreContracts = 'supportedCoreContracts',
  UpdatedAt = 'updatedAt'
}

export type DependencyScript = {
  __typename?: 'DependencyScript';
  /** Address of the bytecode storage contract for this script */
  address: Scalars['Bytes'];
  /** Dependency this script belongs to */
  dependency: Dependency;
  /** Unique identifier made up of dependency id and index */
  id: Scalars['ID'];
  /** Index of this script */
  index: Scalars['BigInt'];
  /** Contents of script */
  script: Scalars['String'];
};

export type DependencyScript_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<DependencyScript_Filter>>>;
  dependency?: InputMaybe<Scalars['String']>;
  dependency_?: InputMaybe<Dependency_Filter>;
  dependency_contains?: InputMaybe<Scalars['String']>;
  dependency_contains_nocase?: InputMaybe<Scalars['String']>;
  dependency_ends_with?: InputMaybe<Scalars['String']>;
  dependency_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_gt?: InputMaybe<Scalars['String']>;
  dependency_gte?: InputMaybe<Scalars['String']>;
  dependency_in?: InputMaybe<Array<Scalars['String']>>;
  dependency_lt?: InputMaybe<Scalars['String']>;
  dependency_lte?: InputMaybe<Scalars['String']>;
  dependency_not?: InputMaybe<Scalars['String']>;
  dependency_not_contains?: InputMaybe<Scalars['String']>;
  dependency_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dependency_not_ends_with?: InputMaybe<Scalars['String']>;
  dependency_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_not_in?: InputMaybe<Array<Scalars['String']>>;
  dependency_not_starts_with?: InputMaybe<Scalars['String']>;
  dependency_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dependency_starts_with?: InputMaybe<Scalars['String']>;
  dependency_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  or?: InputMaybe<Array<InputMaybe<DependencyScript_Filter>>>;
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

export enum DependencyScript_OrderBy {
  Address = 'address',
  Dependency = 'dependency',
  DependencyAdditionalCdnCount = 'dependency__additionalCDNCount',
  DependencyAdditionalRepositoryCount = 'dependency__additionalRepositoryCount',
  DependencyId = 'dependency__id',
  DependencyPreferredCdn = 'dependency__preferredCDN',
  DependencyPreferredRepository = 'dependency__preferredRepository',
  DependencyReferenceWebsite = 'dependency__referenceWebsite',
  DependencyScript = 'dependency__script',
  DependencyScriptCount = 'dependency__scriptCount',
  DependencyUpdatedAt = 'dependency__updatedAt',
  Id = 'id',
  Index = 'index',
  Script = 'script'
}

export type Dependency_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  additionalCDNCount?: InputMaybe<Scalars['BigInt']>;
  additionalCDNCount_gt?: InputMaybe<Scalars['BigInt']>;
  additionalCDNCount_gte?: InputMaybe<Scalars['BigInt']>;
  additionalCDNCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalCDNCount_lt?: InputMaybe<Scalars['BigInt']>;
  additionalCDNCount_lte?: InputMaybe<Scalars['BigInt']>;
  additionalCDNCount_not?: InputMaybe<Scalars['BigInt']>;
  additionalCDNCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalCDNs_?: InputMaybe<DependencyAdditionalCdn_Filter>;
  additionalRepositories_?: InputMaybe<DependencyAdditionalRepository_Filter>;
  additionalRepositoryCount?: InputMaybe<Scalars['BigInt']>;
  additionalRepositoryCount_gt?: InputMaybe<Scalars['BigInt']>;
  additionalRepositoryCount_gte?: InputMaybe<Scalars['BigInt']>;
  additionalRepositoryCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  additionalRepositoryCount_lt?: InputMaybe<Scalars['BigInt']>;
  additionalRepositoryCount_lte?: InputMaybe<Scalars['BigInt']>;
  additionalRepositoryCount_not?: InputMaybe<Scalars['BigInt']>;
  additionalRepositoryCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Dependency_Filter>>>;
  dependencyRegistry?: InputMaybe<Scalars['String']>;
  dependencyRegistry_?: InputMaybe<DependencyRegistry_Filter>;
  dependencyRegistry_contains?: InputMaybe<Scalars['String']>;
  dependencyRegistry_contains_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_ends_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_gt?: InputMaybe<Scalars['String']>;
  dependencyRegistry_gte?: InputMaybe<Scalars['String']>;
  dependencyRegistry_in?: InputMaybe<Array<Scalars['String']>>;
  dependencyRegistry_lt?: InputMaybe<Scalars['String']>;
  dependencyRegistry_lte?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_contains?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_contains_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_ends_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_in?: InputMaybe<Array<Scalars['String']>>;
  dependencyRegistry_not_starts_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  dependencyRegistry_starts_with?: InputMaybe<Scalars['String']>;
  dependencyRegistry_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Dependency_Filter>>>;
  preferredCDN?: InputMaybe<Scalars['String']>;
  preferredCDN_contains?: InputMaybe<Scalars['String']>;
  preferredCDN_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredCDN_ends_with?: InputMaybe<Scalars['String']>;
  preferredCDN_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredCDN_gt?: InputMaybe<Scalars['String']>;
  preferredCDN_gte?: InputMaybe<Scalars['String']>;
  preferredCDN_in?: InputMaybe<Array<Scalars['String']>>;
  preferredCDN_lt?: InputMaybe<Scalars['String']>;
  preferredCDN_lte?: InputMaybe<Scalars['String']>;
  preferredCDN_not?: InputMaybe<Scalars['String']>;
  preferredCDN_not_contains?: InputMaybe<Scalars['String']>;
  preferredCDN_not_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredCDN_not_ends_with?: InputMaybe<Scalars['String']>;
  preferredCDN_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredCDN_not_in?: InputMaybe<Array<Scalars['String']>>;
  preferredCDN_not_starts_with?: InputMaybe<Scalars['String']>;
  preferredCDN_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  preferredCDN_starts_with?: InputMaybe<Scalars['String']>;
  preferredCDN_starts_with_nocase?: InputMaybe<Scalars['String']>;
  preferredRepository?: InputMaybe<Scalars['String']>;
  preferredRepository_contains?: InputMaybe<Scalars['String']>;
  preferredRepository_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredRepository_ends_with?: InputMaybe<Scalars['String']>;
  preferredRepository_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredRepository_gt?: InputMaybe<Scalars['String']>;
  preferredRepository_gte?: InputMaybe<Scalars['String']>;
  preferredRepository_in?: InputMaybe<Array<Scalars['String']>>;
  preferredRepository_lt?: InputMaybe<Scalars['String']>;
  preferredRepository_lte?: InputMaybe<Scalars['String']>;
  preferredRepository_not?: InputMaybe<Scalars['String']>;
  preferredRepository_not_contains?: InputMaybe<Scalars['String']>;
  preferredRepository_not_contains_nocase?: InputMaybe<Scalars['String']>;
  preferredRepository_not_ends_with?: InputMaybe<Scalars['String']>;
  preferredRepository_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  preferredRepository_not_in?: InputMaybe<Array<Scalars['String']>>;
  preferredRepository_not_starts_with?: InputMaybe<Scalars['String']>;
  preferredRepository_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  preferredRepository_starts_with?: InputMaybe<Scalars['String']>;
  preferredRepository_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referenceWebsite?: InputMaybe<Scalars['String']>;
  referenceWebsite_contains?: InputMaybe<Scalars['String']>;
  referenceWebsite_contains_nocase?: InputMaybe<Scalars['String']>;
  referenceWebsite_ends_with?: InputMaybe<Scalars['String']>;
  referenceWebsite_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referenceWebsite_gt?: InputMaybe<Scalars['String']>;
  referenceWebsite_gte?: InputMaybe<Scalars['String']>;
  referenceWebsite_in?: InputMaybe<Array<Scalars['String']>>;
  referenceWebsite_lt?: InputMaybe<Scalars['String']>;
  referenceWebsite_lte?: InputMaybe<Scalars['String']>;
  referenceWebsite_not?: InputMaybe<Scalars['String']>;
  referenceWebsite_not_contains?: InputMaybe<Scalars['String']>;
  referenceWebsite_not_contains_nocase?: InputMaybe<Scalars['String']>;
  referenceWebsite_not_ends_with?: InputMaybe<Scalars['String']>;
  referenceWebsite_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referenceWebsite_not_in?: InputMaybe<Array<Scalars['String']>>;
  referenceWebsite_not_starts_with?: InputMaybe<Scalars['String']>;
  referenceWebsite_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referenceWebsite_starts_with?: InputMaybe<Scalars['String']>;
  referenceWebsite_starts_with_nocase?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
  scriptCount?: InputMaybe<Scalars['BigInt']>;
  scriptCount_gt?: InputMaybe<Scalars['BigInt']>;
  scriptCount_gte?: InputMaybe<Scalars['BigInt']>;
  scriptCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  scriptCount_lt?: InputMaybe<Scalars['BigInt']>;
  scriptCount_lte?: InputMaybe<Scalars['BigInt']>;
  scriptCount_not?: InputMaybe<Scalars['BigInt']>;
  scriptCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  scripts_?: InputMaybe<DependencyScript_Filter>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Dependency_OrderBy {
  AdditionalCdnCount = 'additionalCDNCount',
  AdditionalCdNs = 'additionalCDNs',
  AdditionalRepositories = 'additionalRepositories',
  AdditionalRepositoryCount = 'additionalRepositoryCount',
  DependencyRegistry = 'dependencyRegistry',
  DependencyRegistryId = 'dependencyRegistry__id',
  DependencyRegistryOwner = 'dependencyRegistry__owner',
  DependencyRegistryUpdatedAt = 'dependencyRegistry__updatedAt',
  Id = 'id',
  PreferredCdn = 'preferredCDN',
  PreferredRepository = 'preferredRepository',
  ReferenceWebsite = 'referenceWebsite',
  Script = 'script',
  ScriptCount = 'scriptCount',
  Scripts = 'scripts',
  UpdatedAt = 'updatedAt'
}

export type EngineRegistry = {
  __typename?: 'EngineRegistry';
  /** Unique identifier made up of the Engine Registry's contract address */
  id: Scalars['ID'];
  /** Core contracts that are registered on this Engine Registry, when this is most recent Engine Registry to add the contract */
  registeredContracts?: Maybe<Array<Contract>>;
};


export type EngineRegistryRegisteredContractsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Contract_Filter>;
};

export type EngineRegistry_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EngineRegistry_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<EngineRegistry_Filter>>>;
  registeredContracts_?: InputMaybe<Contract_Filter>;
};

export enum EngineRegistry_OrderBy {
  Id = 'id',
  RegisteredContracts = 'registeredContracts'
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
  /** Receipts for this minter, only for minters with settlement */
  receipts?: Maybe<Array<Receipt>>;
  /** Minter type - String if minter returns it's type, empty string otherwise */
  type: Scalars['String'];
  updatedAt: Scalars['BigInt'];
};


export type MinterReceiptsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Receipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Receipt_Filter>;
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
  and?: InputMaybe<Array<InputMaybe<MinterFilter_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<MinterFilter_Filter>>>;
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
  CoreContractAdmin = 'coreContract__admin',
  CoreContractAutoApproveArtistSplitProposals = 'coreContract__autoApproveArtistSplitProposals',
  CoreContractCreatedAt = 'coreContract__createdAt',
  CoreContractCurationRegistry = 'coreContract__curationRegistry',
  CoreContractEnginePlatformProviderAddress = 'coreContract__enginePlatformProviderAddress',
  CoreContractEnginePlatformProviderPercentage = 'coreContract__enginePlatformProviderPercentage',
  CoreContractEnginePlatformProviderSecondarySalesAddress = 'coreContract__enginePlatformProviderSecondarySalesAddress',
  CoreContractEnginePlatformProviderSecondarySalesBps = 'coreContract__enginePlatformProviderSecondarySalesBPS',
  CoreContractId = 'coreContract__id',
  CoreContractNewProjectsForbidden = 'coreContract__newProjectsForbidden',
  CoreContractNextProjectId = 'coreContract__nextProjectId',
  CoreContractPreferredArweaveGateway = 'coreContract__preferredArweaveGateway',
  CoreContractPreferredIpfsGateway = 'coreContract__preferredIPFSGateway',
  CoreContractRandomizerContract = 'coreContract__randomizerContract',
  CoreContractRenderProviderAddress = 'coreContract__renderProviderAddress',
  CoreContractRenderProviderPercentage = 'coreContract__renderProviderPercentage',
  CoreContractRenderProviderSecondarySalesAddress = 'coreContract__renderProviderSecondarySalesAddress',
  CoreContractRenderProviderSecondarySalesBps = 'coreContract__renderProviderSecondarySalesBPS',
  CoreContractType = 'coreContract__type',
  CoreContractUpdatedAt = 'coreContract__updatedAt',
  Id = 'id',
  MinterAllowlist = 'minterAllowlist',
  UpdatedAt = 'updatedAt'
}

export type Minter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Minter_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<Minter_Filter>>>;
  receipts_?: InputMaybe<Receipt_Filter>;
  type?: InputMaybe<Scalars['String']>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_contains_nocase?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_ends_with_nocase?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_contains_nocase?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  CoreContractAdmin = 'coreContract__admin',
  CoreContractAutoApproveArtistSplitProposals = 'coreContract__autoApproveArtistSplitProposals',
  CoreContractCreatedAt = 'coreContract__createdAt',
  CoreContractCurationRegistry = 'coreContract__curationRegistry',
  CoreContractEnginePlatformProviderAddress = 'coreContract__enginePlatformProviderAddress',
  CoreContractEnginePlatformProviderPercentage = 'coreContract__enginePlatformProviderPercentage',
  CoreContractEnginePlatformProviderSecondarySalesAddress = 'coreContract__enginePlatformProviderSecondarySalesAddress',
  CoreContractEnginePlatformProviderSecondarySalesBps = 'coreContract__enginePlatformProviderSecondarySalesBPS',
  CoreContractId = 'coreContract__id',
  CoreContractNewProjectsForbidden = 'coreContract__newProjectsForbidden',
  CoreContractNextProjectId = 'coreContract__nextProjectId',
  CoreContractPreferredArweaveGateway = 'coreContract__preferredArweaveGateway',
  CoreContractPreferredIpfsGateway = 'coreContract__preferredIPFSGateway',
  CoreContractRandomizerContract = 'coreContract__randomizerContract',
  CoreContractRenderProviderAddress = 'coreContract__renderProviderAddress',
  CoreContractRenderProviderPercentage = 'coreContract__renderProviderPercentage',
  CoreContractRenderProviderSecondarySalesAddress = 'coreContract__renderProviderSecondarySalesAddress',
  CoreContractRenderProviderSecondarySalesBps = 'coreContract__renderProviderSecondarySalesBPS',
  CoreContractType = 'coreContract__type',
  CoreContractUpdatedAt = 'coreContract__updatedAt',
  ExtraMinterDetails = 'extraMinterDetails',
  Id = 'id',
  MaximumHalfLifeInSeconds = 'maximumHalfLifeInSeconds',
  MinimumAuctionLengthInSeconds = 'minimumAuctionLengthInSeconds',
  MinimumHalfLifeInSeconds = 'minimumHalfLifeInSeconds',
  MinterFilter = 'minterFilter',
  MinterFilterId = 'minterFilter__id',
  MinterFilterUpdatedAt = 'minterFilter__updatedAt',
  Receipts = 'receipts',
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
  and?: InputMaybe<Array<InputMaybe<Payment_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Payment_Filter>>>;
  paymentToken?: InputMaybe<Scalars['Bytes']>;
  paymentToken_contains?: InputMaybe<Scalars['Bytes']>;
  paymentToken_gt?: InputMaybe<Scalars['Bytes']>;
  paymentToken_gte?: InputMaybe<Scalars['Bytes']>;
  paymentToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  paymentToken_lt?: InputMaybe<Scalars['Bytes']>;
  paymentToken_lte?: InputMaybe<Scalars['Bytes']>;
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
  recipient_gt?: InputMaybe<Scalars['Bytes']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_lt?: InputMaybe<Scalars['Bytes']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']>;
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
  Sale = 'sale',
  SaleBlockNumber = 'sale__blockNumber',
  SaleBlockTimestamp = 'sale__blockTimestamp',
  SaleBuyer = 'sale__buyer',
  SaleExchange = 'sale__exchange',
  SaleId = 'sale__id',
  SaleIsPrivate = 'sale__isPrivate',
  SaleSaleType = 'sale__saleType',
  SaleSeller = 'sale__seller',
  SaleSummaryTokensSold = 'sale__summaryTokensSold',
  SaleTxHash = 'sale__txHash'
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
  /** Maximum number of invocations allowed for the project. Note that minter contracts may additionally limit a project's maxInvocations on a specific minter. */
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
  /** Receipts for this project, only on minters with settlement */
  receipts?: Maybe<Array<Receipt>>;
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


export type ProjectReceiptsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Receipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Receipt_Filter>;
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
  /** Address of the bytecode storage contract for this asset if it is of type ONCHAIN */
  bytecodeAddress?: Maybe<Scalars['Bytes']>;
  /** The dependency cid. This will be an empty string assets of type ONCHAIN. */
  cid: Scalars['String'];
  /** The asset data if it is onchain */
  data?: Maybe<Scalars['String']>;
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
  Ipfs = 'IPFS',
  /** Asset hosted on chain */
  Onchain = 'ONCHAIN'
}

export type ProjectExternalAssetDependency_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProjectExternalAssetDependency_Filter>>>;
  bytecodeAddress?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_contains?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_gt?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_gte?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bytecodeAddress_lt?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_lte?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_not?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  bytecodeAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  data?: InputMaybe<Scalars['String']>;
  data_contains?: InputMaybe<Scalars['String']>;
  data_contains_nocase?: InputMaybe<Scalars['String']>;
  data_ends_with?: InputMaybe<Scalars['String']>;
  data_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_gt?: InputMaybe<Scalars['String']>;
  data_gte?: InputMaybe<Scalars['String']>;
  data_in?: InputMaybe<Array<Scalars['String']>>;
  data_lt?: InputMaybe<Scalars['String']>;
  data_lte?: InputMaybe<Scalars['String']>;
  data_not?: InputMaybe<Scalars['String']>;
  data_not_contains?: InputMaybe<Scalars['String']>;
  data_not_contains_nocase?: InputMaybe<Scalars['String']>;
  data_not_ends_with?: InputMaybe<Scalars['String']>;
  data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_in?: InputMaybe<Array<Scalars['String']>>;
  data_not_starts_with?: InputMaybe<Scalars['String']>;
  data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_starts_with?: InputMaybe<Scalars['String']>;
  data_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  or?: InputMaybe<Array<InputMaybe<ProjectExternalAssetDependency_Filter>>>;
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
  BytecodeAddress = 'bytecodeAddress',
  Cid = 'cid',
  Data = 'data',
  DependencyType = 'dependencyType',
  Id = 'id',
  Index = 'index',
  Project = 'project',
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website'
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
  /** Maximum number of invocations allowed for the project (on the minter). If less than than a project's maximum invocations defined on a core contract, the minter contract will limit this project's maximum invocations */
  maxInvocations?: Maybe<Scalars['BigInt']>;
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
  and?: InputMaybe<Array<InputMaybe<ProjectMinterConfiguration_Filter>>>;
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
  currencyAddress_gt?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_gte?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencyAddress_lt?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  maxInvocations?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_gt?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_gte?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxInvocations_lt?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_lte?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_not?: InputMaybe<Scalars['BigInt']>;
  maxInvocations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  or?: InputMaybe<Array<InputMaybe<ProjectMinterConfiguration_Filter>>>;
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
  MaxInvocations = 'maxInvocations',
  Minter = 'minter',
  MinterExtraMinterDetails = 'minter__extraMinterDetails',
  MinterId = 'minter__id',
  MinterMaximumHalfLifeInSeconds = 'minter__maximumHalfLifeInSeconds',
  MinterMinimumAuctionLengthInSeconds = 'minter__minimumAuctionLengthInSeconds',
  MinterMinimumHalfLifeInSeconds = 'minter__minimumHalfLifeInSeconds',
  MinterType = 'minter__type',
  MinterUpdatedAt = 'minter__updatedAt',
  PriceIsConfigured = 'priceIsConfigured',
  Project = 'project',
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website',
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
  and?: InputMaybe<Array<InputMaybe<ProjectScript_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<ProjectScript_Filter>>>;
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
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website',
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
  additionalPayeeSecondarySalesAddress_gt?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_gte?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeeSecondarySalesAddress_lt?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  additionalPayee_gt?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_gte?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayee_lt?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_lte?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_not?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_not_contains?: InputMaybe<Scalars['Bytes']>;
  additionalPayee_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<Project_Filter>>>;
  artist?: InputMaybe<Scalars['String']>;
  artistAddress?: InputMaybe<Scalars['Bytes']>;
  artistAddress_contains?: InputMaybe<Scalars['Bytes']>;
  artistAddress_gt?: InputMaybe<Scalars['Bytes']>;
  artistAddress_gte?: InputMaybe<Scalars['Bytes']>;
  artistAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  artistAddress_lt?: InputMaybe<Scalars['Bytes']>;
  artistAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  currencyAddress_gt?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_gte?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencyAddress_lt?: InputMaybe<Scalars['Bytes']>;
  currencyAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  or?: InputMaybe<Array<InputMaybe<Project_Filter>>>;
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
  receipts_?: InputMaybe<Receipt_Filter>;
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
  ArtistId = 'artist__id',
  AspectRatio = 'aspectRatio',
  BaseIpfsUri = 'baseIpfsUri',
  BaseUri = 'baseUri',
  Complete = 'complete',
  CompletedAt = 'completedAt',
  Contract = 'contract',
  ContractAdmin = 'contract__admin',
  ContractAutoApproveArtistSplitProposals = 'contract__autoApproveArtistSplitProposals',
  ContractCreatedAt = 'contract__createdAt',
  ContractCurationRegistry = 'contract__curationRegistry',
  ContractEnginePlatformProviderAddress = 'contract__enginePlatformProviderAddress',
  ContractEnginePlatformProviderPercentage = 'contract__enginePlatformProviderPercentage',
  ContractEnginePlatformProviderSecondarySalesAddress = 'contract__enginePlatformProviderSecondarySalesAddress',
  ContractEnginePlatformProviderSecondarySalesBps = 'contract__enginePlatformProviderSecondarySalesBPS',
  ContractId = 'contract__id',
  ContractNewProjectsForbidden = 'contract__newProjectsForbidden',
  ContractNextProjectId = 'contract__nextProjectId',
  ContractPreferredArweaveGateway = 'contract__preferredArweaveGateway',
  ContractPreferredIpfsGateway = 'contract__preferredIPFSGateway',
  ContractRandomizerContract = 'contract__randomizerContract',
  ContractRenderProviderAddress = 'contract__renderProviderAddress',
  ContractRenderProviderPercentage = 'contract__renderProviderPercentage',
  ContractRenderProviderSecondarySalesAddress = 'contract__renderProviderSecondarySalesAddress',
  ContractRenderProviderSecondarySalesBps = 'contract__renderProviderSecondarySalesBPS',
  ContractType = 'contract__type',
  ContractUpdatedAt = 'contract__updatedAt',
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
  MinterConfigurationBasePrice = 'minterConfiguration__basePrice',
  MinterConfigurationCurrencyAddress = 'minterConfiguration__currencyAddress',
  MinterConfigurationCurrencySymbol = 'minterConfiguration__currencySymbol',
  MinterConfigurationEndTime = 'minterConfiguration__endTime',
  MinterConfigurationExtraMinterDetails = 'minterConfiguration__extraMinterDetails',
  MinterConfigurationHalfLifeSeconds = 'minterConfiguration__halfLifeSeconds',
  MinterConfigurationId = 'minterConfiguration__id',
  MinterConfigurationMaxInvocations = 'minterConfiguration__maxInvocations',
  MinterConfigurationPriceIsConfigured = 'minterConfiguration__priceIsConfigured',
  MinterConfigurationPurchaseToDisabled = 'minterConfiguration__purchaseToDisabled',
  MinterConfigurationStartPrice = 'minterConfiguration__startPrice',
  MinterConfigurationStartTime = 'minterConfiguration__startTime',
  Name = 'name',
  Owners = 'owners',
  Paused = 'paused',
  PricePerTokenInWei = 'pricePerTokenInWei',
  ProjectId = 'projectId',
  ProposedArtistAddressesAndSplits = 'proposedArtistAddressesAndSplits',
  ProposedArtistAddressesAndSplitsAdditionalPayeePrimarySalesAddress = 'proposedArtistAddressesAndSplits__additionalPayeePrimarySalesAddress',
  ProposedArtistAddressesAndSplitsAdditionalPayeePrimarySalesPercentage = 'proposedArtistAddressesAndSplits__additionalPayeePrimarySalesPercentage',
  ProposedArtistAddressesAndSplitsAdditionalPayeeSecondarySalesAddress = 'proposedArtistAddressesAndSplits__additionalPayeeSecondarySalesAddress',
  ProposedArtistAddressesAndSplitsAdditionalPayeeSecondarySalesPercentage = 'proposedArtistAddressesAndSplits__additionalPayeeSecondarySalesPercentage',
  ProposedArtistAddressesAndSplitsArtistAddress = 'proposedArtistAddressesAndSplits__artistAddress',
  ProposedArtistAddressesAndSplitsCreatedAt = 'proposedArtistAddressesAndSplits__createdAt',
  ProposedArtistAddressesAndSplitsId = 'proposedArtistAddressesAndSplits__id',
  Receipts = 'receipts',
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
  additionalPayeePrimarySalesAddress_gt?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePrimarySalesAddress_gte?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePrimarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeePrimarySalesAddress_lt?: InputMaybe<Scalars['Bytes']>;
  additionalPayeePrimarySalesAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  additionalPayeeSecondarySalesAddress_gt?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_gte?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  additionalPayeeSecondarySalesAddress_lt?: InputMaybe<Scalars['Bytes']>;
  additionalPayeeSecondarySalesAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<ProposedArtistAddressesAndSplit_Filter>>>;
  artistAddress?: InputMaybe<Scalars['Bytes']>;
  artistAddress_contains?: InputMaybe<Scalars['Bytes']>;
  artistAddress_gt?: InputMaybe<Scalars['Bytes']>;
  artistAddress_gte?: InputMaybe<Scalars['Bytes']>;
  artistAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  artistAddress_lt?: InputMaybe<Scalars['Bytes']>;
  artistAddress_lte?: InputMaybe<Scalars['Bytes']>;
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
  or?: InputMaybe<Array<InputMaybe<ProposedArtistAddressesAndSplit_Filter>>>;
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
  Project = 'project',
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website'
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
  dependencies: Array<Dependency>;
  dependency?: Maybe<Dependency>;
  dependencyAdditionalCDN?: Maybe<DependencyAdditionalCdn>;
  dependencyAdditionalCDNs: Array<DependencyAdditionalCdn>;
  dependencyAdditionalRepositories: Array<DependencyAdditionalRepository>;
  dependencyAdditionalRepository?: Maybe<DependencyAdditionalRepository>;
  dependencyRegistries: Array<DependencyRegistry>;
  dependencyRegistry?: Maybe<DependencyRegistry>;
  dependencyScript?: Maybe<DependencyScript>;
  dependencyScripts: Array<DependencyScript>;
  engineRegistries: Array<EngineRegistry>;
  engineRegistry?: Maybe<EngineRegistry>;
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
  receipt?: Maybe<Receipt>;
  receipts: Array<Receipt>;
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


export type QueryDependenciesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dependency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dependency_Filter>;
};


export type QueryDependencyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDependencyAdditionalCdnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDependencyAdditionalCdNsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyAdditionalCdn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyAdditionalCdn_Filter>;
};


export type QueryDependencyAdditionalRepositoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyAdditionalRepository_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyAdditionalRepository_Filter>;
};


export type QueryDependencyAdditionalRepositoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDependencyRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyRegistry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyRegistry_Filter>;
};


export type QueryDependencyRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDependencyScriptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDependencyScriptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyScript_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyScript_Filter>;
};


export type QueryEngineRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EngineRegistry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EngineRegistry_Filter>;
};


export type QueryEngineRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
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


export type QueryReceiptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryReceiptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Receipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Receipt_Filter>;
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

export type Receipt = {
  __typename?: 'Receipt';
  /** The associated account */
  account: Account;
  /** Unique identifier made up of minter contract address-projectId-accountAddress */
  id: Scalars['ID'];
  /** The associated minter */
  minter: Minter;
  /** The total net amount posted (sent to settlement contract) for tokens */
  netPosted: Scalars['BigInt'];
  /** The total quantity of tokens purchased on the project */
  numPurchased: Scalars['BigInt'];
  /** The associated project */
  project: Project;
  updatedAt: Scalars['BigInt'];
};

export type Receipt_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<Receipt_Filter>>>;
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
  netPosted?: InputMaybe<Scalars['BigInt']>;
  netPosted_gt?: InputMaybe<Scalars['BigInt']>;
  netPosted_gte?: InputMaybe<Scalars['BigInt']>;
  netPosted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netPosted_lt?: InputMaybe<Scalars['BigInt']>;
  netPosted_lte?: InputMaybe<Scalars['BigInt']>;
  netPosted_not?: InputMaybe<Scalars['BigInt']>;
  netPosted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numPurchased?: InputMaybe<Scalars['BigInt']>;
  numPurchased_gt?: InputMaybe<Scalars['BigInt']>;
  numPurchased_gte?: InputMaybe<Scalars['BigInt']>;
  numPurchased_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numPurchased_lt?: InputMaybe<Scalars['BigInt']>;
  numPurchased_lte?: InputMaybe<Scalars['BigInt']>;
  numPurchased_not?: InputMaybe<Scalars['BigInt']>;
  numPurchased_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Receipt_Filter>>>;
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
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Receipt_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  Id = 'id',
  Minter = 'minter',
  MinterExtraMinterDetails = 'minter__extraMinterDetails',
  MinterId = 'minter__id',
  MinterMaximumHalfLifeInSeconds = 'minter__maximumHalfLifeInSeconds',
  MinterMinimumAuctionLengthInSeconds = 'minter__minimumAuctionLengthInSeconds',
  MinterMinimumHalfLifeInSeconds = 'minter__minimumHalfLifeInSeconds',
  MinterType = 'minter__type',
  MinterUpdatedAt = 'minter__updatedAt',
  NetPosted = 'netPosted',
  NumPurchased = 'numPurchased',
  Project = 'project',
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website',
  UpdatedAt = 'updatedAt'
}

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
  and?: InputMaybe<Array<InputMaybe<SaleLookupTable_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<SaleLookupTable_Filter>>>;
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
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website',
  Sale = 'sale',
  SaleBlockNumber = 'sale__blockNumber',
  SaleBlockTimestamp = 'sale__blockTimestamp',
  SaleBuyer = 'sale__buyer',
  SaleExchange = 'sale__exchange',
  SaleId = 'sale__id',
  SaleIsPrivate = 'sale__isPrivate',
  SaleSaleType = 'sale__saleType',
  SaleSeller = 'sale__seller',
  SaleSummaryTokensSold = 'sale__summaryTokensSold',
  SaleTxHash = 'sale__txHash',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenCreatedAt = 'token__createdAt',
  TokenHash = 'token__hash',
  TokenId = 'token__id',
  TokenInvocation = 'token__invocation',
  TokenNextSaleId = 'token__nextSaleId',
  TokenTokenId = 'token__tokenId',
  TokenTransactionHash = 'token__transactionHash',
  TokenUpdatedAt = 'token__updatedAt',
  TokenUri = 'token__uri'
}

export enum SaleType {
  Bundle = 'Bundle',
  Single = 'Single'
}

export type Sale_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Sale_Filter>>>;
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
  buyer_gt?: InputMaybe<Scalars['Bytes']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_lt?: InputMaybe<Scalars['Bytes']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']>;
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
  or?: InputMaybe<Array<InputMaybe<Sale_Filter>>>;
  payments_?: InputMaybe<Payment_Filter>;
  saleLookupTables_?: InputMaybe<SaleLookupTable_Filter>;
  saleType?: InputMaybe<SaleType>;
  saleType_in?: InputMaybe<Array<SaleType>>;
  saleType_not?: InputMaybe<SaleType>;
  saleType_not_in?: InputMaybe<Array<SaleType>>;
  seller?: InputMaybe<Scalars['Bytes']>;
  seller_contains?: InputMaybe<Scalars['Bytes']>;
  seller_gt?: InputMaybe<Scalars['Bytes']>;
  seller_gte?: InputMaybe<Scalars['Bytes']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_lt?: InputMaybe<Scalars['Bytes']>;
  seller_lte?: InputMaybe<Scalars['Bytes']>;
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
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
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
  dependencies: Array<Dependency>;
  dependency?: Maybe<Dependency>;
  dependencyAdditionalCDN?: Maybe<DependencyAdditionalCdn>;
  dependencyAdditionalCDNs: Array<DependencyAdditionalCdn>;
  dependencyAdditionalRepositories: Array<DependencyAdditionalRepository>;
  dependencyAdditionalRepository?: Maybe<DependencyAdditionalRepository>;
  dependencyRegistries: Array<DependencyRegistry>;
  dependencyRegistry?: Maybe<DependencyRegistry>;
  dependencyScript?: Maybe<DependencyScript>;
  dependencyScripts: Array<DependencyScript>;
  engineRegistries: Array<EngineRegistry>;
  engineRegistry?: Maybe<EngineRegistry>;
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
  receipt?: Maybe<Receipt>;
  receipts: Array<Receipt>;
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


export type SubscriptionDependenciesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Dependency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dependency_Filter>;
};


export type SubscriptionDependencyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDependencyAdditionalCdnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDependencyAdditionalCdNsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyAdditionalCdn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyAdditionalCdn_Filter>;
};


export type SubscriptionDependencyAdditionalRepositoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyAdditionalRepository_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyAdditionalRepository_Filter>;
};


export type SubscriptionDependencyAdditionalRepositoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDependencyRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyRegistry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyRegistry_Filter>;
};


export type SubscriptionDependencyRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDependencyScriptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDependencyScriptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DependencyScript_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DependencyScript_Filter>;
};


export type SubscriptionEngineRegistriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EngineRegistry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EngineRegistry_Filter>;
};


export type SubscriptionEngineRegistryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
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


export type SubscriptionReceiptArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionReceiptsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Receipt_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Receipt_Filter>;
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
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
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
  hash_gt?: InputMaybe<Scalars['Bytes']>;
  hash_gte?: InputMaybe<Scalars['Bytes']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']>;
  hash_lte?: InputMaybe<Scalars['Bytes']>;
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
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
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
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
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
  ContractAdmin = 'contract__admin',
  ContractAutoApproveArtistSplitProposals = 'contract__autoApproveArtistSplitProposals',
  ContractCreatedAt = 'contract__createdAt',
  ContractCurationRegistry = 'contract__curationRegistry',
  ContractEnginePlatformProviderAddress = 'contract__enginePlatformProviderAddress',
  ContractEnginePlatformProviderPercentage = 'contract__enginePlatformProviderPercentage',
  ContractEnginePlatformProviderSecondarySalesAddress = 'contract__enginePlatformProviderSecondarySalesAddress',
  ContractEnginePlatformProviderSecondarySalesBps = 'contract__enginePlatformProviderSecondarySalesBPS',
  ContractId = 'contract__id',
  ContractNewProjectsForbidden = 'contract__newProjectsForbidden',
  ContractNextProjectId = 'contract__nextProjectId',
  ContractPreferredArweaveGateway = 'contract__preferredArweaveGateway',
  ContractPreferredIpfsGateway = 'contract__preferredIPFSGateway',
  ContractRandomizerContract = 'contract__randomizerContract',
  ContractRenderProviderAddress = 'contract__renderProviderAddress',
  ContractRenderProviderPercentage = 'contract__renderProviderPercentage',
  ContractRenderProviderSecondarySalesAddress = 'contract__renderProviderSecondarySalesAddress',
  ContractRenderProviderSecondarySalesBps = 'contract__renderProviderSecondarySalesBPS',
  ContractType = 'contract__type',
  ContractUpdatedAt = 'contract__updatedAt',
  CreatedAt = 'createdAt',
  Hash = 'hash',
  Id = 'id',
  Invocation = 'invocation',
  NextSaleId = 'nextSaleId',
  Owner = 'owner',
  OwnerId = 'owner__id',
  Project = 'project',
  ProjectActivatedAt = 'project__activatedAt',
  ProjectActive = 'project__active',
  ProjectAdditionalPayee = 'project__additionalPayee',
  ProjectAdditionalPayeePercentage = 'project__additionalPayeePercentage',
  ProjectAdditionalPayeeSecondarySalesAddress = 'project__additionalPayeeSecondarySalesAddress',
  ProjectAdditionalPayeeSecondarySalesPercentage = 'project__additionalPayeeSecondarySalesPercentage',
  ProjectArtistAddress = 'project__artistAddress',
  ProjectArtistName = 'project__artistName',
  ProjectAspectRatio = 'project__aspectRatio',
  ProjectBaseIpfsUri = 'project__baseIpfsUri',
  ProjectBaseUri = 'project__baseUri',
  ProjectComplete = 'project__complete',
  ProjectCompletedAt = 'project__completedAt',
  ProjectCreatedAt = 'project__createdAt',
  ProjectCurationStatus = 'project__curationStatus',
  ProjectCurrencyAddress = 'project__currencyAddress',
  ProjectCurrencySymbol = 'project__currencySymbol',
  ProjectDescription = 'project__description',
  ProjectDynamic = 'project__dynamic',
  ProjectExternalAssetDependenciesLocked = 'project__externalAssetDependenciesLocked',
  ProjectExternalAssetDependencyCount = 'project__externalAssetDependencyCount',
  ProjectId = 'project__id',
  ProjectInvocations = 'project__invocations',
  ProjectIpfsHash = 'project__ipfsHash',
  ProjectLicense = 'project__license',
  ProjectLocked = 'project__locked',
  ProjectMaxInvocations = 'project__maxInvocations',
  ProjectName = 'project__name',
  ProjectPaused = 'project__paused',
  ProjectPricePerTokenInWei = 'project__pricePerTokenInWei',
  ProjectProjectId = 'project__projectId',
  ProjectRoyaltyPercentage = 'project__royaltyPercentage',
  ProjectScript = 'project__script',
  ProjectScriptCount = 'project__scriptCount',
  ProjectScriptJson = 'project__scriptJSON',
  ProjectScriptTypeAndVersion = 'project__scriptTypeAndVersion',
  ProjectScriptUpdatedAt = 'project__scriptUpdatedAt',
  ProjectUpdatedAt = 'project__updatedAt',
  ProjectUseHashString = 'project__useHashString',
  ProjectUseIpfs = 'project__useIpfs',
  ProjectWebsite = 'project__website',
  SaleLookupTables = 'saleLookupTables',
  TokenId = 'tokenId',
  TransactionHash = 'transactionHash',
  Transfers = 'transfers',
  UpdatedAt = 'updatedAt',
  Uri = 'uri'
}

export type Transfer = {
  __typename?: 'Transfer';
  blockHash: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  to: Scalars['Bytes'];
  token: Token;
  transactionHash: Scalars['Bytes'];
};

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transfer_Filter>>>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_gt?: InputMaybe<Scalars['Bytes']>;
  blockHash_gte?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_lt?: InputMaybe<Scalars['Bytes']>;
  blockHash_lte?: InputMaybe<Scalars['Bytes']>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
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
  or?: InputMaybe<Array<InputMaybe<Transfer_Filter>>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_gt?: InputMaybe<Scalars['Bytes']>;
  to_gte?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_lt?: InputMaybe<Scalars['Bytes']>;
  to_lte?: InputMaybe<Scalars['Bytes']>;
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
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_OrderBy {
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  From = 'from',
  Id = 'id',
  To = 'to',
  Token = 'token',
  TokenCreatedAt = 'token__createdAt',
  TokenHash = 'token__hash',
  TokenId = 'token__id',
  TokenInvocation = 'token__invocation',
  TokenNextSaleId = 'token__nextSaleId',
  TokenTokenId = 'token__tokenId',
  TokenTransactionHash = 'token__transactionHash',
  TokenUpdatedAt = 'token__updatedAt',
  TokenUri = 'token__uri',
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
  and?: InputMaybe<Array<InputMaybe<Whitelisting_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<Whitelisting_Filter>>>;
};

export enum Whitelisting_OrderBy {
  Account = 'account',
  AccountId = 'account__id',
  Contract = 'contract',
  ContractAdmin = 'contract__admin',
  ContractAutoApproveArtistSplitProposals = 'contract__autoApproveArtistSplitProposals',
  ContractCreatedAt = 'contract__createdAt',
  ContractCurationRegistry = 'contract__curationRegistry',
  ContractEnginePlatformProviderAddress = 'contract__enginePlatformProviderAddress',
  ContractEnginePlatformProviderPercentage = 'contract__enginePlatformProviderPercentage',
  ContractEnginePlatformProviderSecondarySalesAddress = 'contract__enginePlatformProviderSecondarySalesAddress',
  ContractEnginePlatformProviderSecondarySalesBps = 'contract__enginePlatformProviderSecondarySalesBPS',
  ContractId = 'contract__id',
  ContractNewProjectsForbidden = 'contract__newProjectsForbidden',
  ContractNextProjectId = 'contract__nextProjectId',
  ContractPreferredArweaveGateway = 'contract__preferredArweaveGateway',
  ContractPreferredIpfsGateway = 'contract__preferredIPFSGateway',
  ContractRandomizerContract = 'contract__randomizerContract',
  ContractRenderProviderAddress = 'contract__renderProviderAddress',
  ContractRenderProviderPercentage = 'contract__renderProviderPercentage',
  ContractRenderProviderSecondarySalesAddress = 'contract__renderProviderSecondarySalesAddress',
  ContractRenderProviderSecondarySalesBps = 'contract__renderProviderSecondarySalesBPS',
  ContractType = 'contract__type',
  ContractUpdatedAt = 'contract__updatedAt',
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

export type ProjectDetailFragment = { __typename?: 'Project', id: string, projectId: any, name?: string | null, invocations: any, maxInvocations: any, active: boolean, paused: boolean, complete: boolean, artistName?: string | null, contract: { __typename?: 'Contract', id: string } };

export type GetAllProjectsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetAllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, projectId: any, name?: string | null, invocations: any, maxInvocations: any, active: boolean, paused: boolean, complete: boolean, artistName?: string | null, contract: { __typename?: 'Contract', id: string } }> };

export type GetWalletTokensQueryVariables = Exact<{
  wallet: Scalars['String'];
  contracts: Array<Scalars['String']> | Scalars['String'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetWalletTokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', invocation: any, project: { __typename?: 'Project', name?: string | null } }> };

export type GetContractProjectsQueryVariables = Exact<{
  contract: Scalars['ID'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetContractProjectsQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', projects?: Array<{ __typename?: 'Project', id: string, projectId: any, name?: string | null, invocations: any, maxInvocations: any, active: boolean, paused: boolean, complete: boolean, artistName?: string | null, contract: { __typename?: 'Contract', id: string } }> | null } | null };

export type GetContractOpenProjectsQueryVariables = Exact<{
  contract: Scalars['ID'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetContractOpenProjectsQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', projects?: Array<{ __typename?: 'Project', id: string, projectId: any, name?: string | null, invocations: any, maxInvocations: any, active: boolean, paused: boolean, complete: boolean, artistName?: string | null, contract: { __typename?: 'Contract', id: string } }> | null } | null };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, projectId: any, name?: string | null, invocations: any, maxInvocations: any, active: boolean, paused: boolean, complete: boolean, artistName?: string | null, contract: { __typename?: 'Contract', id: string } }> };

export type GetEngineContractsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type GetEngineContractsQuery = { __typename?: 'Query', contracts: Array<{ __typename?: 'Contract', id: string }> };

export type GetProjectInContractsQueryVariables = Exact<{
  contracts?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  projectId: Scalars['BigInt'];
}>;


export type GetProjectInContractsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, projectId: any, name?: string | null, invocations: any, maxInvocations: any, active: boolean, paused: boolean, complete: boolean, artistName?: string | null, contract: { __typename?: 'Contract', id: string } }> };

export type GetProjectInvocationsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectInvocationsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', invocations: any }> };

export type GetTokenOwnerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTokenOwnerQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', owner: { __typename?: 'Account', id: string } }> };



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
  Account: ResolverTypeWrapper<Account>;
  AccountProject: ResolverTypeWrapper<AccountProject>;
  AccountProject_filter: AccountProject_Filter;
  AccountProject_orderBy: AccountProject_OrderBy;
  Account_filter: Account_Filter;
  Account_orderBy: Account_OrderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_Height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Contract: ResolverTypeWrapper<Contract>;
  Contract_filter: Contract_Filter;
  Contract_orderBy: Contract_OrderBy;
  CoreType: CoreType;
  Dependency: ResolverTypeWrapper<Dependency>;
  DependencyAdditionalCDN: ResolverTypeWrapper<DependencyAdditionalCdn>;
  DependencyAdditionalCDN_filter: DependencyAdditionalCdn_Filter;
  DependencyAdditionalCDN_orderBy: DependencyAdditionalCdn_OrderBy;
  DependencyAdditionalRepository: ResolverTypeWrapper<DependencyAdditionalRepository>;
  DependencyAdditionalRepository_filter: DependencyAdditionalRepository_Filter;
  DependencyAdditionalRepository_orderBy: DependencyAdditionalRepository_OrderBy;
  DependencyRegistry: ResolverTypeWrapper<DependencyRegistry>;
  DependencyRegistry_filter: DependencyRegistry_Filter;
  DependencyRegistry_orderBy: DependencyRegistry_OrderBy;
  DependencyScript: ResolverTypeWrapper<DependencyScript>;
  DependencyScript_filter: DependencyScript_Filter;
  DependencyScript_orderBy: DependencyScript_OrderBy;
  Dependency_filter: Dependency_Filter;
  Dependency_orderBy: Dependency_OrderBy;
  EngineRegistry: ResolverTypeWrapper<EngineRegistry>;
  EngineRegistry_filter: EngineRegistry_Filter;
  EngineRegistry_orderBy: EngineRegistry_OrderBy;
  Exchange: Exchange;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Minter: ResolverTypeWrapper<Minter>;
  MinterFilter: ResolverTypeWrapper<MinterFilter>;
  MinterFilter_filter: MinterFilter_Filter;
  MinterFilter_orderBy: MinterFilter_OrderBy;
  Minter_filter: Minter_Filter;
  Minter_orderBy: Minter_OrderBy;
  OrderDirection: OrderDirection;
  Payment: ResolverTypeWrapper<Payment>;
  PaymentType: PaymentType;
  Payment_filter: Payment_Filter;
  Payment_orderBy: Payment_OrderBy;
  Project: ResolverTypeWrapper<Project>;
  ProjectExternalAssetDependency: ResolverTypeWrapper<ProjectExternalAssetDependency>;
  ProjectExternalAssetDependencyType: ProjectExternalAssetDependencyType;
  ProjectExternalAssetDependency_filter: ProjectExternalAssetDependency_Filter;
  ProjectExternalAssetDependency_orderBy: ProjectExternalAssetDependency_OrderBy;
  ProjectMinterConfiguration: ResolverTypeWrapper<ProjectMinterConfiguration>;
  ProjectMinterConfiguration_filter: ProjectMinterConfiguration_Filter;
  ProjectMinterConfiguration_orderBy: ProjectMinterConfiguration_OrderBy;
  ProjectScript: ResolverTypeWrapper<ProjectScript>;
  ProjectScript_filter: ProjectScript_Filter;
  ProjectScript_orderBy: ProjectScript_OrderBy;
  Project_filter: Project_Filter;
  Project_orderBy: Project_OrderBy;
  ProposedArtistAddressesAndSplit: ResolverTypeWrapper<ProposedArtistAddressesAndSplit>;
  ProposedArtistAddressesAndSplit_filter: ProposedArtistAddressesAndSplit_Filter;
  ProposedArtistAddressesAndSplit_orderBy: ProposedArtistAddressesAndSplit_OrderBy;
  Query: ResolverTypeWrapper<{}>;
  Receipt: ResolverTypeWrapper<Receipt>;
  Receipt_filter: Receipt_Filter;
  Receipt_orderBy: Receipt_OrderBy;
  Sale: ResolverTypeWrapper<Sale>;
  SaleLookupTable: ResolverTypeWrapper<SaleLookupTable>;
  SaleLookupTable_filter: SaleLookupTable_Filter;
  SaleLookupTable_orderBy: SaleLookupTable_OrderBy;
  SaleType: SaleType;
  Sale_filter: Sale_Filter;
  Sale_orderBy: Sale_OrderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  Token_filter: Token_Filter;
  Token_orderBy: Token_OrderBy;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_Filter;
  Transfer_orderBy: Transfer_OrderBy;
  Whitelisting: ResolverTypeWrapper<Whitelisting>;
  Whitelisting_filter: Whitelisting_Filter;
  Whitelisting_orderBy: Whitelisting_OrderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AccountProject: AccountProject;
  AccountProject_filter: AccountProject_Filter;
  Account_filter: Account_Filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_Height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Contract: Contract;
  Contract_filter: Contract_Filter;
  Dependency: Dependency;
  DependencyAdditionalCDN: DependencyAdditionalCdn;
  DependencyAdditionalCDN_filter: DependencyAdditionalCdn_Filter;
  DependencyAdditionalRepository: DependencyAdditionalRepository;
  DependencyAdditionalRepository_filter: DependencyAdditionalRepository_Filter;
  DependencyRegistry: DependencyRegistry;
  DependencyRegistry_filter: DependencyRegistry_Filter;
  DependencyScript: DependencyScript;
  DependencyScript_filter: DependencyScript_Filter;
  Dependency_filter: Dependency_Filter;
  EngineRegistry: EngineRegistry;
  EngineRegistry_filter: EngineRegistry_Filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Minter: Minter;
  MinterFilter: MinterFilter;
  MinterFilter_filter: MinterFilter_Filter;
  Minter_filter: Minter_Filter;
  Payment: Payment;
  Payment_filter: Payment_Filter;
  Project: Project;
  ProjectExternalAssetDependency: ProjectExternalAssetDependency;
  ProjectExternalAssetDependency_filter: ProjectExternalAssetDependency_Filter;
  ProjectMinterConfiguration: ProjectMinterConfiguration;
  ProjectMinterConfiguration_filter: ProjectMinterConfiguration_Filter;
  ProjectScript: ProjectScript;
  ProjectScript_filter: ProjectScript_Filter;
  Project_filter: Project_Filter;
  ProposedArtistAddressesAndSplit: ProposedArtistAddressesAndSplit;
  ProposedArtistAddressesAndSplit_filter: ProposedArtistAddressesAndSplit_Filter;
  Query: {};
  Receipt: Receipt;
  Receipt_filter: Receipt_Filter;
  Sale: Sale;
  SaleLookupTable: SaleLookupTable;
  SaleLookupTable_filter: SaleLookupTable_Filter;
  Sale_filter: Sale_Filter;
  String: Scalars['String'];
  Subscription: {};
  Token: Token;
  Token_filter: Token_Filter;
  Transfer: Transfer;
  Transfer_filter: Transfer_Filter;
  Whitelisting: Whitelisting;
  Whitelisting_filter: Whitelisting_Filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
};

export type DerivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type DerivedFromDirectiveResolver<Result, Parent, ContextType = any, Args = DerivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = { };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SubgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type SubgraphIdDirectiveResolver<Result, Parent, ContextType = any, Args = SubgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  projectsCreated?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType, RequireFields<AccountProjectsCreatedArgs, 'first' | 'skip'>>;
  projectsOwned?: Resolver<Maybe<Array<ResolversTypes['AccountProject']>>, ParentType, ContextType, RequireFields<AccountProjectsOwnedArgs, 'first' | 'skip'>>;
  receipts?: Resolver<Maybe<Array<ResolversTypes['Receipt']>>, ParentType, ContextType, RequireFields<AccountReceiptsArgs, 'first' | 'skip'>>;
  tokens?: Resolver<Maybe<Array<ResolversTypes['Token']>>, ParentType, ContextType, RequireFields<AccountTokensArgs, 'first' | 'skip'>>;
  whitelistedOn?: Resolver<Maybe<Array<ResolversTypes['Whitelisting']>>, ParentType, ContextType, RequireFields<AccountWhitelistedOnArgs, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountProject'] = ResolversParentTypes['AccountProject']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ContractResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contract'] = ResolversParentTypes['Contract']> = {
  admin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  autoApproveArtistSplitProposals?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curationRegistry?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  dependencyRegistry?: Resolver<Maybe<ResolversTypes['DependencyRegistry']>, ParentType, ContextType>;
  enginePlatformProviderAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  enginePlatformProviderPercentage?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  enginePlatformProviderSecondarySalesAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  enginePlatformProviderSecondarySalesBPS?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mintWhitelisted?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  minterFilter?: Resolver<Maybe<ResolversTypes['MinterFilter']>, ParentType, ContextType>;
  newProjectsForbidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextProjectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  preferredArweaveGateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferredIPFSGateway?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType, RequireFields<ContractProjectsArgs, 'first' | 'skip'>>;
  randomizerContract?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  registeredOn?: Resolver<Maybe<ResolversTypes['EngineRegistry']>, ParentType, ContextType>;
  renderProviderAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  renderProviderPercentage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  renderProviderSecondarySalesAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  renderProviderSecondarySalesBPS?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<Array<ResolversTypes['Token']>>, ParentType, ContextType, RequireFields<ContractTokensArgs, 'first' | 'skip'>>;
  type?: Resolver<ResolversTypes['CoreType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  whitelisted?: Resolver<Maybe<Array<ResolversTypes['Whitelisting']>>, ParentType, ContextType, RequireFields<ContractWhitelistedArgs, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DependencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dependency'] = ResolversParentTypes['Dependency']> = {
  additionalCDNCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  additionalCDNs?: Resolver<Array<ResolversTypes['DependencyAdditionalCDN']>, ParentType, ContextType, RequireFields<DependencyAdditionalCdNsArgs, 'first' | 'skip'>>;
  additionalRepositories?: Resolver<Array<ResolversTypes['DependencyAdditionalRepository']>, ParentType, ContextType, RequireFields<DependencyAdditionalRepositoriesArgs, 'first' | 'skip'>>;
  additionalRepositoryCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  dependencyRegistry?: Resolver<ResolversTypes['DependencyRegistry'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  preferredCDN?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferredRepository?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  referenceWebsite?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scriptCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  scripts?: Resolver<Array<ResolversTypes['DependencyScript']>, ParentType, ContextType, RequireFields<DependencyScriptsArgs, 'first' | 'skip'>>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DependencyAdditionalCdnResolvers<ContextType = any, ParentType extends ResolversParentTypes['DependencyAdditionalCDN'] = ResolversParentTypes['DependencyAdditionalCDN']> = {
  cdn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dependency?: Resolver<ResolversTypes['Dependency'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DependencyAdditionalRepositoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DependencyAdditionalRepository'] = ResolversParentTypes['DependencyAdditionalRepository']> = {
  dependency?: Resolver<ResolversTypes['Dependency'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DependencyRegistryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DependencyRegistry'] = ResolversParentTypes['DependencyRegistry']> = {
  dependencies?: Resolver<Maybe<Array<ResolversTypes['Dependency']>>, ParentType, ContextType, RequireFields<DependencyRegistryDependenciesArgs, 'first' | 'skip'>>;
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  supportedCoreContracts?: Resolver<Array<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<DependencyRegistrySupportedCoreContractsArgs, 'first' | 'skip'>>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DependencyScriptResolvers<ContextType = any, ParentType extends ResolversParentTypes['DependencyScript'] = ResolversParentTypes['DependencyScript']> = {
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  dependency?: Resolver<ResolversTypes['Dependency'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  script?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EngineRegistryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EngineRegistry'] = ResolversParentTypes['EngineRegistry']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  registeredContracts?: Resolver<Maybe<Array<ResolversTypes['Contract']>>, ParentType, ContextType, RequireFields<EngineRegistryRegisteredContractsArgs, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MinterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Minter'] = ResolversParentTypes['Minter']> = {
  coreContract?: Resolver<ResolversTypes['Contract'], ParentType, ContextType>;
  extraMinterDetails?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maximumHalfLifeInSeconds?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  minimumAuctionLengthInSeconds?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  minimumHalfLifeInSeconds?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  minterFilter?: Resolver<ResolversTypes['MinterFilter'], ParentType, ContextType>;
  receipts?: Resolver<Maybe<Array<ResolversTypes['Receipt']>>, ParentType, ContextType, RequireFields<MinterReceiptsArgs, 'first' | 'skip'>>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MinterFilterResolvers<ContextType = any, ParentType extends ResolversParentTypes['MinterFilter'] = ResolversParentTypes['MinterFilter']> = {
  associatedMinters?: Resolver<Array<ResolversTypes['Minter']>, ParentType, ContextType, RequireFields<MinterFilterAssociatedMintersArgs, 'first' | 'skip'>>;
  coreContract?: Resolver<ResolversTypes['Contract'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  minterAllowlist?: Resolver<Array<ResolversTypes['Minter']>, ParentType, ContextType, RequireFields<MinterFilterMinterAllowlistArgs, 'first' | 'skip'>>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  paymentToken?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  paymentType?: Resolver<ResolversTypes['PaymentType'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  activatedAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  additionalPayee?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  additionalPayeePercentage?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  additionalPayeeSecondarySalesAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  additionalPayeeSecondarySalesPercentage?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  artistAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  artistName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  aspectRatio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseIpfsUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contract?: Resolver<ResolversTypes['Contract'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  curationStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currencyAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  currencySymbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dynamic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalAssetDependencies?: Resolver<Array<ResolversTypes['ProjectExternalAssetDependency']>, ParentType, ContextType, RequireFields<ProjectExternalAssetDependenciesArgs, 'first' | 'skip'>>;
  externalAssetDependenciesLocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalAssetDependencyCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invocations?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ipfsHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  maxInvocations?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minterConfiguration?: Resolver<Maybe<ResolversTypes['ProjectMinterConfiguration']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owners?: Resolver<Maybe<Array<ResolversTypes['AccountProject']>>, ParentType, ContextType, RequireFields<ProjectOwnersArgs, 'first' | 'skip'>>;
  paused?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pricePerTokenInWei?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposedArtistAddressesAndSplits?: Resolver<Maybe<ResolversTypes['ProposedArtistAddressesAndSplit']>, ParentType, ContextType>;
  receipts?: Resolver<Maybe<Array<ResolversTypes['Receipt']>>, ParentType, ContextType, RequireFields<ProjectReceiptsArgs, 'first' | 'skip'>>;
  royaltyPercentage?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  saleLookupTables?: Resolver<Array<ResolversTypes['SaleLookupTable']>, ParentType, ContextType, RequireFields<ProjectSaleLookupTablesArgs, 'first' | 'skip'>>;
  script?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scriptCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  scriptJSON?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scriptTypeAndVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scriptUpdatedAt?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  scripts?: Resolver<Maybe<Array<ResolversTypes['ProjectScript']>>, ParentType, ContextType, RequireFields<ProjectScriptsArgs, 'first' | 'skip'>>;
  tokens?: Resolver<Maybe<Array<ResolversTypes['Token']>>, ParentType, ContextType, RequireFields<ProjectTokensArgs, 'first' | 'skip'>>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  useHashString?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  useIpfs?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectExternalAssetDependencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectExternalAssetDependency'] = ResolversParentTypes['ProjectExternalAssetDependency']> = {
  bytecodeAddress?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dependencyType?: Resolver<ResolversTypes['ProjectExternalAssetDependencyType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMinterConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectMinterConfiguration'] = ResolversParentTypes['ProjectMinterConfiguration']> = {
  basePrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  currencyAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currencySymbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  extraMinterDetails?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  halfLifeSeconds?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxInvocations?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  minter?: Resolver<ResolversTypes['Minter'], ParentType, ContextType>;
  priceIsConfigured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  purchaseToDisabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectScriptResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectScript'] = ResolversParentTypes['ProjectScript']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  script?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProposedArtistAddressesAndSplitResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProposedArtistAddressesAndSplit'] = ResolversParentTypes['ProposedArtistAddressesAndSplit']> = {
  additionalPayeePrimarySalesAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  additionalPayeePrimarySalesPercentage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  additionalPayeeSecondarySalesAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  additionalPayeeSecondarySalesPercentage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  artistAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_MetaArgs>>;
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'id' | 'subgraphError'>>;
  accountProject?: Resolver<Maybe<ResolversTypes['AccountProject']>, ParentType, ContextType, RequireFields<QueryAccountProjectArgs, 'id' | 'subgraphError'>>;
  accountProjects?: Resolver<Array<ResolversTypes['AccountProject']>, ParentType, ContextType, RequireFields<QueryAccountProjectsArgs, 'first' | 'skip' | 'subgraphError'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountsArgs, 'first' | 'skip' | 'subgraphError'>>;
  contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<QueryContractArgs, 'id' | 'subgraphError'>>;
  contracts?: Resolver<Array<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<QueryContractsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencies?: Resolver<Array<ResolversTypes['Dependency']>, ParentType, ContextType, RequireFields<QueryDependenciesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependency?: Resolver<Maybe<ResolversTypes['Dependency']>, ParentType, ContextType, RequireFields<QueryDependencyArgs, 'id' | 'subgraphError'>>;
  dependencyAdditionalCDN?: Resolver<Maybe<ResolversTypes['DependencyAdditionalCDN']>, ParentType, ContextType, RequireFields<QueryDependencyAdditionalCdnArgs, 'id' | 'subgraphError'>>;
  dependencyAdditionalCDNs?: Resolver<Array<ResolversTypes['DependencyAdditionalCDN']>, ParentType, ContextType, RequireFields<QueryDependencyAdditionalCdNsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencyAdditionalRepositories?: Resolver<Array<ResolversTypes['DependencyAdditionalRepository']>, ParentType, ContextType, RequireFields<QueryDependencyAdditionalRepositoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencyAdditionalRepository?: Resolver<Maybe<ResolversTypes['DependencyAdditionalRepository']>, ParentType, ContextType, RequireFields<QueryDependencyAdditionalRepositoryArgs, 'id' | 'subgraphError'>>;
  dependencyRegistries?: Resolver<Array<ResolversTypes['DependencyRegistry']>, ParentType, ContextType, RequireFields<QueryDependencyRegistriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencyRegistry?: Resolver<Maybe<ResolversTypes['DependencyRegistry']>, ParentType, ContextType, RequireFields<QueryDependencyRegistryArgs, 'id' | 'subgraphError'>>;
  dependencyScript?: Resolver<Maybe<ResolversTypes['DependencyScript']>, ParentType, ContextType, RequireFields<QueryDependencyScriptArgs, 'id' | 'subgraphError'>>;
  dependencyScripts?: Resolver<Array<ResolversTypes['DependencyScript']>, ParentType, ContextType, RequireFields<QueryDependencyScriptsArgs, 'first' | 'skip' | 'subgraphError'>>;
  engineRegistries?: Resolver<Array<ResolversTypes['EngineRegistry']>, ParentType, ContextType, RequireFields<QueryEngineRegistriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  engineRegistry?: Resolver<Maybe<ResolversTypes['EngineRegistry']>, ParentType, ContextType, RequireFields<QueryEngineRegistryArgs, 'id' | 'subgraphError'>>;
  minter?: Resolver<Maybe<ResolversTypes['Minter']>, ParentType, ContextType, RequireFields<QueryMinterArgs, 'id' | 'subgraphError'>>;
  minterFilter?: Resolver<Maybe<ResolversTypes['MinterFilter']>, ParentType, ContextType, RequireFields<QueryMinterFilterArgs, 'id' | 'subgraphError'>>;
  minterFilters?: Resolver<Array<ResolversTypes['MinterFilter']>, ParentType, ContextType, RequireFields<QueryMinterFiltersArgs, 'first' | 'skip' | 'subgraphError'>>;
  minters?: Resolver<Array<ResolversTypes['Minter']>, ParentType, ContextType, RequireFields<QueryMintersArgs, 'first' | 'skip' | 'subgraphError'>>;
  payment?: Resolver<Maybe<ResolversTypes['Payment']>, ParentType, ContextType, RequireFields<QueryPaymentArgs, 'id' | 'subgraphError'>>;
  payments?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType, RequireFields<QueryPaymentsArgs, 'first' | 'skip' | 'subgraphError'>>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id' | 'subgraphError'>>;
  projectExternalAssetDependencies?: Resolver<Array<ResolversTypes['ProjectExternalAssetDependency']>, ParentType, ContextType, RequireFields<QueryProjectExternalAssetDependenciesArgs, 'first' | 'skip' | 'subgraphError'>>;
  projectExternalAssetDependency?: Resolver<Maybe<ResolversTypes['ProjectExternalAssetDependency']>, ParentType, ContextType, RequireFields<QueryProjectExternalAssetDependencyArgs, 'id' | 'subgraphError'>>;
  projectMinterConfiguration?: Resolver<Maybe<ResolversTypes['ProjectMinterConfiguration']>, ParentType, ContextType, RequireFields<QueryProjectMinterConfigurationArgs, 'id' | 'subgraphError'>>;
  projectMinterConfigurations?: Resolver<Array<ResolversTypes['ProjectMinterConfiguration']>, ParentType, ContextType, RequireFields<QueryProjectMinterConfigurationsArgs, 'first' | 'skip' | 'subgraphError'>>;
  projectScript?: Resolver<Maybe<ResolversTypes['ProjectScript']>, ParentType, ContextType, RequireFields<QueryProjectScriptArgs, 'id' | 'subgraphError'>>;
  projectScripts?: Resolver<Array<ResolversTypes['ProjectScript']>, ParentType, ContextType, RequireFields<QueryProjectScriptsArgs, 'first' | 'skip' | 'subgraphError'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectsArgs, 'first' | 'skip' | 'subgraphError'>>;
  proposedArtistAddressesAndSplit?: Resolver<Maybe<ResolversTypes['ProposedArtistAddressesAndSplit']>, ParentType, ContextType, RequireFields<QueryProposedArtistAddressesAndSplitArgs, 'id' | 'subgraphError'>>;
  proposedArtistAddressesAndSplits?: Resolver<Array<ResolversTypes['ProposedArtistAddressesAndSplit']>, ParentType, ContextType, RequireFields<QueryProposedArtistAddressesAndSplitsArgs, 'first' | 'skip' | 'subgraphError'>>;
  receipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<QueryReceiptArgs, 'id' | 'subgraphError'>>;
  receipts?: Resolver<Array<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<QueryReceiptsArgs, 'first' | 'skip' | 'subgraphError'>>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerySaleArgs, 'id' | 'subgraphError'>>;
  saleLookupTable?: Resolver<Maybe<ResolversTypes['SaleLookupTable']>, ParentType, ContextType, RequireFields<QuerySaleLookupTableArgs, 'id' | 'subgraphError'>>;
  saleLookupTables?: Resolver<Array<ResolversTypes['SaleLookupTable']>, ParentType, ContextType, RequireFields<QuerySaleLookupTablesArgs, 'first' | 'skip' | 'subgraphError'>>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerySalesArgs, 'first' | 'skip' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QueryTokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QueryTokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QueryTransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QueryTransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  whitelisting?: Resolver<Maybe<ResolversTypes['Whitelisting']>, ParentType, ContextType, RequireFields<QueryWhitelistingArgs, 'id' | 'subgraphError'>>;
  whitelistings?: Resolver<Array<ResolversTypes['Whitelisting']>, ParentType, ContextType, RequireFields<QueryWhitelistingsArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type ReceiptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Receipt'] = ResolversParentTypes['Receipt']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  minter?: Resolver<ResolversTypes['Minter'], ParentType, ContextType>;
  netPosted?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numPurchased?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = {
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  exchange?: Resolver<ResolversTypes['Exchange'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  payments?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType, RequireFields<SalePaymentsArgs, 'first' | 'skip'>>;
  saleLookupTables?: Resolver<Array<ResolversTypes['SaleLookupTable']>, ParentType, ContextType, RequireFields<SaleSaleLookupTablesArgs, 'first' | 'skip'>>;
  saleType?: Resolver<ResolversTypes['SaleType'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  summaryTokensSold?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleLookupTableResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleLookupTable'] = ResolversParentTypes['SaleLookupTable']> = {
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_MetaArgs>>;
  account?: SubscriptionResolver<Maybe<ResolversTypes['Account']>, "account", ParentType, ContextType, RequireFields<SubscriptionAccountArgs, 'id' | 'subgraphError'>>;
  accountProject?: SubscriptionResolver<Maybe<ResolversTypes['AccountProject']>, "accountProject", ParentType, ContextType, RequireFields<SubscriptionAccountProjectArgs, 'id' | 'subgraphError'>>;
  accountProjects?: SubscriptionResolver<Array<ResolversTypes['AccountProject']>, "accountProjects", ParentType, ContextType, RequireFields<SubscriptionAccountProjectsArgs, 'first' | 'skip' | 'subgraphError'>>;
  accounts?: SubscriptionResolver<Array<ResolversTypes['Account']>, "accounts", ParentType, ContextType, RequireFields<SubscriptionAccountsArgs, 'first' | 'skip' | 'subgraphError'>>;
  contract?: SubscriptionResolver<Maybe<ResolversTypes['Contract']>, "contract", ParentType, ContextType, RequireFields<SubscriptionContractArgs, 'id' | 'subgraphError'>>;
  contracts?: SubscriptionResolver<Array<ResolversTypes['Contract']>, "contracts", ParentType, ContextType, RequireFields<SubscriptionContractsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencies?: SubscriptionResolver<Array<ResolversTypes['Dependency']>, "dependencies", ParentType, ContextType, RequireFields<SubscriptionDependenciesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependency?: SubscriptionResolver<Maybe<ResolversTypes['Dependency']>, "dependency", ParentType, ContextType, RequireFields<SubscriptionDependencyArgs, 'id' | 'subgraphError'>>;
  dependencyAdditionalCDN?: SubscriptionResolver<Maybe<ResolversTypes['DependencyAdditionalCDN']>, "dependencyAdditionalCDN", ParentType, ContextType, RequireFields<SubscriptionDependencyAdditionalCdnArgs, 'id' | 'subgraphError'>>;
  dependencyAdditionalCDNs?: SubscriptionResolver<Array<ResolversTypes['DependencyAdditionalCDN']>, "dependencyAdditionalCDNs", ParentType, ContextType, RequireFields<SubscriptionDependencyAdditionalCdNsArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencyAdditionalRepositories?: SubscriptionResolver<Array<ResolversTypes['DependencyAdditionalRepository']>, "dependencyAdditionalRepositories", ParentType, ContextType, RequireFields<SubscriptionDependencyAdditionalRepositoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencyAdditionalRepository?: SubscriptionResolver<Maybe<ResolversTypes['DependencyAdditionalRepository']>, "dependencyAdditionalRepository", ParentType, ContextType, RequireFields<SubscriptionDependencyAdditionalRepositoryArgs, 'id' | 'subgraphError'>>;
  dependencyRegistries?: SubscriptionResolver<Array<ResolversTypes['DependencyRegistry']>, "dependencyRegistries", ParentType, ContextType, RequireFields<SubscriptionDependencyRegistriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  dependencyRegistry?: SubscriptionResolver<Maybe<ResolversTypes['DependencyRegistry']>, "dependencyRegistry", ParentType, ContextType, RequireFields<SubscriptionDependencyRegistryArgs, 'id' | 'subgraphError'>>;
  dependencyScript?: SubscriptionResolver<Maybe<ResolversTypes['DependencyScript']>, "dependencyScript", ParentType, ContextType, RequireFields<SubscriptionDependencyScriptArgs, 'id' | 'subgraphError'>>;
  dependencyScripts?: SubscriptionResolver<Array<ResolversTypes['DependencyScript']>, "dependencyScripts", ParentType, ContextType, RequireFields<SubscriptionDependencyScriptsArgs, 'first' | 'skip' | 'subgraphError'>>;
  engineRegistries?: SubscriptionResolver<Array<ResolversTypes['EngineRegistry']>, "engineRegistries", ParentType, ContextType, RequireFields<SubscriptionEngineRegistriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  engineRegistry?: SubscriptionResolver<Maybe<ResolversTypes['EngineRegistry']>, "engineRegistry", ParentType, ContextType, RequireFields<SubscriptionEngineRegistryArgs, 'id' | 'subgraphError'>>;
  minter?: SubscriptionResolver<Maybe<ResolversTypes['Minter']>, "minter", ParentType, ContextType, RequireFields<SubscriptionMinterArgs, 'id' | 'subgraphError'>>;
  minterFilter?: SubscriptionResolver<Maybe<ResolversTypes['MinterFilter']>, "minterFilter", ParentType, ContextType, RequireFields<SubscriptionMinterFilterArgs, 'id' | 'subgraphError'>>;
  minterFilters?: SubscriptionResolver<Array<ResolversTypes['MinterFilter']>, "minterFilters", ParentType, ContextType, RequireFields<SubscriptionMinterFiltersArgs, 'first' | 'skip' | 'subgraphError'>>;
  minters?: SubscriptionResolver<Array<ResolversTypes['Minter']>, "minters", ParentType, ContextType, RequireFields<SubscriptionMintersArgs, 'first' | 'skip' | 'subgraphError'>>;
  payment?: SubscriptionResolver<Maybe<ResolversTypes['Payment']>, "payment", ParentType, ContextType, RequireFields<SubscriptionPaymentArgs, 'id' | 'subgraphError'>>;
  payments?: SubscriptionResolver<Array<ResolversTypes['Payment']>, "payments", ParentType, ContextType, RequireFields<SubscriptionPaymentsArgs, 'first' | 'skip' | 'subgraphError'>>;
  project?: SubscriptionResolver<Maybe<ResolversTypes['Project']>, "project", ParentType, ContextType, RequireFields<SubscriptionProjectArgs, 'id' | 'subgraphError'>>;
  projectExternalAssetDependencies?: SubscriptionResolver<Array<ResolversTypes['ProjectExternalAssetDependency']>, "projectExternalAssetDependencies", ParentType, ContextType, RequireFields<SubscriptionProjectExternalAssetDependenciesArgs, 'first' | 'skip' | 'subgraphError'>>;
  projectExternalAssetDependency?: SubscriptionResolver<Maybe<ResolversTypes['ProjectExternalAssetDependency']>, "projectExternalAssetDependency", ParentType, ContextType, RequireFields<SubscriptionProjectExternalAssetDependencyArgs, 'id' | 'subgraphError'>>;
  projectMinterConfiguration?: SubscriptionResolver<Maybe<ResolversTypes['ProjectMinterConfiguration']>, "projectMinterConfiguration", ParentType, ContextType, RequireFields<SubscriptionProjectMinterConfigurationArgs, 'id' | 'subgraphError'>>;
  projectMinterConfigurations?: SubscriptionResolver<Array<ResolversTypes['ProjectMinterConfiguration']>, "projectMinterConfigurations", ParentType, ContextType, RequireFields<SubscriptionProjectMinterConfigurationsArgs, 'first' | 'skip' | 'subgraphError'>>;
  projectScript?: SubscriptionResolver<Maybe<ResolversTypes['ProjectScript']>, "projectScript", ParentType, ContextType, RequireFields<SubscriptionProjectScriptArgs, 'id' | 'subgraphError'>>;
  projectScripts?: SubscriptionResolver<Array<ResolversTypes['ProjectScript']>, "projectScripts", ParentType, ContextType, RequireFields<SubscriptionProjectScriptsArgs, 'first' | 'skip' | 'subgraphError'>>;
  projects?: SubscriptionResolver<Array<ResolversTypes['Project']>, "projects", ParentType, ContextType, RequireFields<SubscriptionProjectsArgs, 'first' | 'skip' | 'subgraphError'>>;
  proposedArtistAddressesAndSplit?: SubscriptionResolver<Maybe<ResolversTypes['ProposedArtistAddressesAndSplit']>, "proposedArtistAddressesAndSplit", ParentType, ContextType, RequireFields<SubscriptionProposedArtistAddressesAndSplitArgs, 'id' | 'subgraphError'>>;
  proposedArtistAddressesAndSplits?: SubscriptionResolver<Array<ResolversTypes['ProposedArtistAddressesAndSplit']>, "proposedArtistAddressesAndSplits", ParentType, ContextType, RequireFields<SubscriptionProposedArtistAddressesAndSplitsArgs, 'first' | 'skip' | 'subgraphError'>>;
  receipt?: SubscriptionResolver<Maybe<ResolversTypes['Receipt']>, "receipt", ParentType, ContextType, RequireFields<SubscriptionReceiptArgs, 'id' | 'subgraphError'>>;
  receipts?: SubscriptionResolver<Array<ResolversTypes['Receipt']>, "receipts", ParentType, ContextType, RequireFields<SubscriptionReceiptsArgs, 'first' | 'skip' | 'subgraphError'>>;
  sale?: SubscriptionResolver<Maybe<ResolversTypes['Sale']>, "sale", ParentType, ContextType, RequireFields<SubscriptionSaleArgs, 'id' | 'subgraphError'>>;
  saleLookupTable?: SubscriptionResolver<Maybe<ResolversTypes['SaleLookupTable']>, "saleLookupTable", ParentType, ContextType, RequireFields<SubscriptionSaleLookupTableArgs, 'id' | 'subgraphError'>>;
  saleLookupTables?: SubscriptionResolver<Array<ResolversTypes['SaleLookupTable']>, "saleLookupTables", ParentType, ContextType, RequireFields<SubscriptionSaleLookupTablesArgs, 'first' | 'skip' | 'subgraphError'>>;
  sales?: SubscriptionResolver<Array<ResolversTypes['Sale']>, "sales", ParentType, ContextType, RequireFields<SubscriptionSalesArgs, 'first' | 'skip' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptionTokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptionTokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  transfer?: SubscriptionResolver<Maybe<ResolversTypes['Transfer']>, "transfer", ParentType, ContextType, RequireFields<SubscriptionTransferArgs, 'id' | 'subgraphError'>>;
  transfers?: SubscriptionResolver<Array<ResolversTypes['Transfer']>, "transfers", ParentType, ContextType, RequireFields<SubscriptionTransfersArgs, 'first' | 'skip' | 'subgraphError'>>;
  whitelisting?: SubscriptionResolver<Maybe<ResolversTypes['Whitelisting']>, "whitelisting", ParentType, ContextType, RequireFields<SubscriptionWhitelistingArgs, 'id' | 'subgraphError'>>;
  whitelistings?: SubscriptionResolver<Array<ResolversTypes['Whitelisting']>, "whitelistings", ParentType, ContextType, RequireFields<SubscriptionWhitelistingsArgs, 'first' | 'skip' | 'subgraphError'>>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  contract?: Resolver<ResolversTypes['Contract'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invocation?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nextSaleId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  saleLookupTables?: Resolver<Array<ResolversTypes['SaleLookupTable']>, ParentType, ContextType, RequireFields<TokenSaleLookupTablesArgs, 'first' | 'skip'>>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  transfers?: Resolver<Maybe<Array<ResolversTypes['Transfer']>>, ParentType, ContextType, RequireFields<TokenTransfersArgs, 'first' | 'skip'>>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = {
  blockHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhitelistingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Whitelisting'] = ResolversParentTypes['Whitelisting']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  contract?: Resolver<ResolversTypes['Contract'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Block_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = {
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Meta_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = {
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AccountProject?: AccountProjectResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Contract?: ContractResolvers<ContextType>;
  Dependency?: DependencyResolvers<ContextType>;
  DependencyAdditionalCDN?: DependencyAdditionalCdnResolvers<ContextType>;
  DependencyAdditionalRepository?: DependencyAdditionalRepositoryResolvers<ContextType>;
  DependencyRegistry?: DependencyRegistryResolvers<ContextType>;
  DependencyScript?: DependencyScriptResolvers<ContextType>;
  EngineRegistry?: EngineRegistryResolvers<ContextType>;
  Minter?: MinterResolvers<ContextType>;
  MinterFilter?: MinterFilterResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectExternalAssetDependency?: ProjectExternalAssetDependencyResolvers<ContextType>;
  ProjectMinterConfiguration?: ProjectMinterConfigurationResolvers<ContextType>;
  ProjectScript?: ProjectScriptResolvers<ContextType>;
  ProposedArtistAddressesAndSplit?: ProposedArtistAddressesAndSplitResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Receipt?: ReceiptResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SaleLookupTable?: SaleLookupTableResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  Whitelisting?: WhitelistingResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  derivedFrom?: DerivedFromDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  subgraphId?: SubgraphIdDirectiveResolver<any, any, ContextType>;
};

export const ProjectDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"invocations"}},{"kind":"Field","name":{"kind":"Name","value":"maxInvocations"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"artistName"}},{"kind":"Field","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProjectDetailFragment, unknown>;
export const GetAllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"projectId"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectDetail"}}]}}]}},...ProjectDetailFragmentDoc.definitions]} as unknown as DocumentNode<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetWalletTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWalletTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contracts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"contract_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contracts"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invocation"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetWalletTokensQuery, GetWalletTokensQueryVariables>;
export const GetContractProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContractProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contract"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contract"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"projectId"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectDetail"}}]}}]}}]}},...ProjectDetailFragmentDoc.definitions]} as unknown as DocumentNode<GetContractProjectsQuery, GetContractProjectsQueryVariables>;
export const GetContractOpenProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContractOpenProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contract"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contract"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"projectId"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"paused"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"active"},"value":{"kind":"BooleanValue","value":true}},{"kind":"ObjectField","name":{"kind":"Name","value":"complete"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectDetail"}}]}}]}}]}},...ProjectDetailFragmentDoc.definitions]} as unknown as DocumentNode<GetContractOpenProjectsQuery, GetContractOpenProjectsQueryVariables>;
export const GetProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectDetail"}}]}}]}},...ProjectDetailFragmentDoc.definitions]} as unknown as DocumentNode<GetProjectQuery, GetProjectQueryVariables>;
export const GetEngineContractsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEngineContracts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contracts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_not_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetEngineContractsQuery, GetEngineContractsQueryVariables>;
export const GetProjectInContractsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProjectInContracts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contracts"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"contract_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contracts"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectDetail"}}]}}]}},...ProjectDetailFragmentDoc.definitions]} as unknown as DocumentNode<GetProjectInContractsQuery, GetProjectInContractsQueryVariables>;
export const GetProjectInvocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProjectInvocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invocations"}}]}}]}}]} as unknown as DocumentNode<GetProjectInvocationsQuery, GetProjectInvocationsQueryVariables>;
export const GetTokenOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTokenOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetTokenOwnerQuery, GetTokenOwnerQueryVariables>;