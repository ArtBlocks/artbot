import gql from 'graphql-tag'
export type Maybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigInt: string
  Bytes: string
  bigint: any
  float8: any
  json: any
  jsonb: any
  jsonpath: any
  numeric: any
  seed_float: any
  timestamp: any
  timestamptz: string
  uuid: any
}

export type Account = {
  __typename?: 'Account'
  id: Scalars['ID']
  /** Projects the account is listed as artist for */
  projectsCreated?: Maybe<Array<Project>>
  /** Projects the account owns tokens from */
  projectsOwned?: Maybe<Array<AccountProject>>
  tokens?: Maybe<Array<Token>>
  /** Contracts the account is whitelisted on */
  whitelistedOn?: Maybe<Array<Whitelisting>>
}

export type AccountProjectsCreatedArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Project_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Project_Filter>
}

export type AccountProjectsOwnedArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<AccountProject_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<AccountProject_Filter>
}

export type AccountTokensArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Token_Filter>
}

export type AccountWhitelistedOnArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Whitelisting_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Whitelisting_Filter>
}

export type AccountProject = {
  __typename?: 'AccountProject'
  account: Account
  count: Scalars['Int']
  id: Scalars['ID']
  project: Project
}

export type AccountProject_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  account?: Maybe<Scalars['String']>
  account_?: Maybe<Account_Filter>
  account_contains?: Maybe<Scalars['String']>
  account_contains_nocase?: Maybe<Scalars['String']>
  account_ends_with?: Maybe<Scalars['String']>
  account_ends_with_nocase?: Maybe<Scalars['String']>
  account_gt?: Maybe<Scalars['String']>
  account_gte?: Maybe<Scalars['String']>
  account_in?: Maybe<Array<Scalars['String']>>
  account_lt?: Maybe<Scalars['String']>
  account_lte?: Maybe<Scalars['String']>
  account_not?: Maybe<Scalars['String']>
  account_not_contains?: Maybe<Scalars['String']>
  account_not_contains_nocase?: Maybe<Scalars['String']>
  account_not_ends_with?: Maybe<Scalars['String']>
  account_not_ends_with_nocase?: Maybe<Scalars['String']>
  account_not_in?: Maybe<Array<Scalars['String']>>
  account_not_starts_with?: Maybe<Scalars['String']>
  account_not_starts_with_nocase?: Maybe<Scalars['String']>
  account_starts_with?: Maybe<Scalars['String']>
  account_starts_with_nocase?: Maybe<Scalars['String']>
  count?: Maybe<Scalars['Int']>
  count_gt?: Maybe<Scalars['Int']>
  count_gte?: Maybe<Scalars['Int']>
  count_in?: Maybe<Array<Scalars['Int']>>
  count_lt?: Maybe<Scalars['Int']>
  count_lte?: Maybe<Scalars['Int']>
  count_not?: Maybe<Scalars['Int']>
  count_not_in?: Maybe<Array<Scalars['Int']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  project?: Maybe<Scalars['String']>
  project_?: Maybe<Project_Filter>
  project_contains?: Maybe<Scalars['String']>
  project_contains_nocase?: Maybe<Scalars['String']>
  project_ends_with?: Maybe<Scalars['String']>
  project_ends_with_nocase?: Maybe<Scalars['String']>
  project_gt?: Maybe<Scalars['String']>
  project_gte?: Maybe<Scalars['String']>
  project_in?: Maybe<Array<Scalars['String']>>
  project_lt?: Maybe<Scalars['String']>
  project_lte?: Maybe<Scalars['String']>
  project_not?: Maybe<Scalars['String']>
  project_not_contains?: Maybe<Scalars['String']>
  project_not_contains_nocase?: Maybe<Scalars['String']>
  project_not_ends_with?: Maybe<Scalars['String']>
  project_not_ends_with_nocase?: Maybe<Scalars['String']>
  project_not_in?: Maybe<Array<Scalars['String']>>
  project_not_starts_with?: Maybe<Scalars['String']>
  project_not_starts_with_nocase?: Maybe<Scalars['String']>
  project_starts_with?: Maybe<Scalars['String']>
  project_starts_with_nocase?: Maybe<Scalars['String']>
}

export enum AccountProject_OrderBy {
  Account = 'account',
  Count = 'count',
  Id = 'id',
  Project = 'project',
}

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  projectsCreated_?: Maybe<Project_Filter>
  projectsOwned_?: Maybe<AccountProject_Filter>
  tokens_?: Maybe<Token_Filter>
  whitelistedOn_?: Maybe<Whitelisting_Filter>
}

export enum Account_OrderBy {
  Id = 'id',
  ProjectsCreated = 'projectsCreated',
  ProjectsOwned = 'projectsOwned',
  Tokens = 'tokens',
  WhitelistedOn = 'whitelistedOn',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>
  number?: Maybe<Scalars['Int']>
  number_gte?: Maybe<Scalars['Int']>
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>
  _gt?: Maybe<Scalars['Boolean']>
  _gte?: Maybe<Scalars['Boolean']>
  _in?: Maybe<Array<Scalars['Boolean']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Boolean']>
  _lte?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Scalars['Boolean']>
  _nin?: Maybe<Array<Scalars['Boolean']>>
}

export type Contract = {
  __typename?: 'Contract'
  admin: Scalars['Bytes']
  createdAt: Scalars['BigInt']
  /** Curation registry contract address */
  curationRegistry?: Maybe<Scalars['Bytes']>
  /** Dependency registry contract address */
  dependencyRegistry?: Maybe<Scalars['Bytes']>
  id: Scalars['ID']
  /** List of contracts that are allowed to mint */
  mintWhitelisted: Array<Scalars['Bytes']>
  /** Associated minter filter (if applicable) */
  minterFilter?: Maybe<MinterFilter>
  /** New projects forbidden (can only be true on V3+ contracts) */
  newProjectsForbidden: Scalars['Boolean']
  nextProjectId: Scalars['BigInt']
  preferredArweaveGateway?: Maybe<Scalars['String']>
  preferredIPFSGateway?: Maybe<Scalars['String']>
  /** List of projects on the contract */
  projects?: Maybe<Array<Project>>
  /** Randomizer contract used to generate token hashes */
  randomizerContract?: Maybe<Scalars['Bytes']>
  /** Address that receives primary sales platform fees */
  renderProviderAddress: Scalars['Bytes']
  /** Percentage of primary sales allocated to the platform */
  renderProviderPercentage: Scalars['BigInt']
  /** Address that receives secondary sales platform royalties (null for pre-V3 contracts, check Royalty Registry) */
  renderProviderSecondarySalesAddress?: Maybe<Scalars['Bytes']>
  /** Basis points of secondary sales allocated to the platform (null for pre-V3 contracts, check Royalty Registry) */
  renderProviderSecondarySalesBPS?: Maybe<Scalars['BigInt']>
  /** List of tokens on the contract */
  tokens?: Maybe<Array<Token>>
  /** Core contract type */
  type: CoreType
  updatedAt: Scalars['BigInt']
  /** Accounts whitelisted on the contract */
  whitelisted?: Maybe<Array<Whitelisting>>
}

export type ContractProjectsArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Project_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Project_Filter>
}

export type ContractTokensArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Token_Filter>
}

export type ContractWhitelistedArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Whitelisting_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Whitelisting_Filter>
}

export type Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  admin?: Maybe<Scalars['Bytes']>
  admin_contains?: Maybe<Scalars['Bytes']>
  admin_in?: Maybe<Array<Scalars['Bytes']>>
  admin_not?: Maybe<Scalars['Bytes']>
  admin_not_contains?: Maybe<Scalars['Bytes']>
  admin_not_in?: Maybe<Array<Scalars['Bytes']>>
  createdAt?: Maybe<Scalars['BigInt']>
  createdAt_gt?: Maybe<Scalars['BigInt']>
  createdAt_gte?: Maybe<Scalars['BigInt']>
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>
  createdAt_lt?: Maybe<Scalars['BigInt']>
  createdAt_lte?: Maybe<Scalars['BigInt']>
  createdAt_not?: Maybe<Scalars['BigInt']>
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  curationRegistry?: Maybe<Scalars['Bytes']>
  curationRegistry_contains?: Maybe<Scalars['Bytes']>
  curationRegistry_in?: Maybe<Array<Scalars['Bytes']>>
  curationRegistry_not?: Maybe<Scalars['Bytes']>
  curationRegistry_not_contains?: Maybe<Scalars['Bytes']>
  curationRegistry_not_in?: Maybe<Array<Scalars['Bytes']>>
  dependencyRegistry?: Maybe<Scalars['Bytes']>
  dependencyRegistry_contains?: Maybe<Scalars['Bytes']>
  dependencyRegistry_in?: Maybe<Array<Scalars['Bytes']>>
  dependencyRegistry_not?: Maybe<Scalars['Bytes']>
  dependencyRegistry_not_contains?: Maybe<Scalars['Bytes']>
  dependencyRegistry_not_in?: Maybe<Array<Scalars['Bytes']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  mintWhitelisted?: Maybe<Array<Scalars['Bytes']>>
  mintWhitelisted_contains?: Maybe<Array<Scalars['Bytes']>>
  mintWhitelisted_contains_nocase?: Maybe<Array<Scalars['Bytes']>>
  mintWhitelisted_not?: Maybe<Array<Scalars['Bytes']>>
  mintWhitelisted_not_contains?: Maybe<Array<Scalars['Bytes']>>
  mintWhitelisted_not_contains_nocase?: Maybe<Array<Scalars['Bytes']>>
  minterFilter?: Maybe<Scalars['String']>
  minterFilter_?: Maybe<MinterFilter_Filter>
  minterFilter_contains?: Maybe<Scalars['String']>
  minterFilter_contains_nocase?: Maybe<Scalars['String']>
  minterFilter_ends_with?: Maybe<Scalars['String']>
  minterFilter_ends_with_nocase?: Maybe<Scalars['String']>
  minterFilter_gt?: Maybe<Scalars['String']>
  minterFilter_gte?: Maybe<Scalars['String']>
  minterFilter_in?: Maybe<Array<Scalars['String']>>
  minterFilter_lt?: Maybe<Scalars['String']>
  minterFilter_lte?: Maybe<Scalars['String']>
  minterFilter_not?: Maybe<Scalars['String']>
  minterFilter_not_contains?: Maybe<Scalars['String']>
  minterFilter_not_contains_nocase?: Maybe<Scalars['String']>
  minterFilter_not_ends_with?: Maybe<Scalars['String']>
  minterFilter_not_ends_with_nocase?: Maybe<Scalars['String']>
  minterFilter_not_in?: Maybe<Array<Scalars['String']>>
  minterFilter_not_starts_with?: Maybe<Scalars['String']>
  minterFilter_not_starts_with_nocase?: Maybe<Scalars['String']>
  minterFilter_starts_with?: Maybe<Scalars['String']>
  minterFilter_starts_with_nocase?: Maybe<Scalars['String']>
  newProjectsForbidden?: Maybe<Scalars['Boolean']>
  newProjectsForbidden_in?: Maybe<Array<Scalars['Boolean']>>
  newProjectsForbidden_not?: Maybe<Scalars['Boolean']>
  newProjectsForbidden_not_in?: Maybe<Array<Scalars['Boolean']>>
  nextProjectId?: Maybe<Scalars['BigInt']>
  nextProjectId_gt?: Maybe<Scalars['BigInt']>
  nextProjectId_gte?: Maybe<Scalars['BigInt']>
  nextProjectId_in?: Maybe<Array<Scalars['BigInt']>>
  nextProjectId_lt?: Maybe<Scalars['BigInt']>
  nextProjectId_lte?: Maybe<Scalars['BigInt']>
  nextProjectId_not?: Maybe<Scalars['BigInt']>
  nextProjectId_not_in?: Maybe<Array<Scalars['BigInt']>>
  preferredArweaveGateway?: Maybe<Scalars['String']>
  preferredArweaveGateway_contains?: Maybe<Scalars['String']>
  preferredArweaveGateway_contains_nocase?: Maybe<Scalars['String']>
  preferredArweaveGateway_ends_with?: Maybe<Scalars['String']>
  preferredArweaveGateway_ends_with_nocase?: Maybe<Scalars['String']>
  preferredArweaveGateway_gt?: Maybe<Scalars['String']>
  preferredArweaveGateway_gte?: Maybe<Scalars['String']>
  preferredArweaveGateway_in?: Maybe<Array<Scalars['String']>>
  preferredArweaveGateway_lt?: Maybe<Scalars['String']>
  preferredArweaveGateway_lte?: Maybe<Scalars['String']>
  preferredArweaveGateway_not?: Maybe<Scalars['String']>
  preferredArweaveGateway_not_contains?: Maybe<Scalars['String']>
  preferredArweaveGateway_not_contains_nocase?: Maybe<Scalars['String']>
  preferredArweaveGateway_not_ends_with?: Maybe<Scalars['String']>
  preferredArweaveGateway_not_ends_with_nocase?: Maybe<Scalars['String']>
  preferredArweaveGateway_not_in?: Maybe<Array<Scalars['String']>>
  preferredArweaveGateway_not_starts_with?: Maybe<Scalars['String']>
  preferredArweaveGateway_not_starts_with_nocase?: Maybe<Scalars['String']>
  preferredArweaveGateway_starts_with?: Maybe<Scalars['String']>
  preferredArweaveGateway_starts_with_nocase?: Maybe<Scalars['String']>
  preferredIPFSGateway?: Maybe<Scalars['String']>
  preferredIPFSGateway_contains?: Maybe<Scalars['String']>
  preferredIPFSGateway_contains_nocase?: Maybe<Scalars['String']>
  preferredIPFSGateway_ends_with?: Maybe<Scalars['String']>
  preferredIPFSGateway_ends_with_nocase?: Maybe<Scalars['String']>
  preferredIPFSGateway_gt?: Maybe<Scalars['String']>
  preferredIPFSGateway_gte?: Maybe<Scalars['String']>
  preferredIPFSGateway_in?: Maybe<Array<Scalars['String']>>
  preferredIPFSGateway_lt?: Maybe<Scalars['String']>
  preferredIPFSGateway_lte?: Maybe<Scalars['String']>
  preferredIPFSGateway_not?: Maybe<Scalars['String']>
  preferredIPFSGateway_not_contains?: Maybe<Scalars['String']>
  preferredIPFSGateway_not_contains_nocase?: Maybe<Scalars['String']>
  preferredIPFSGateway_not_ends_with?: Maybe<Scalars['String']>
  preferredIPFSGateway_not_ends_with_nocase?: Maybe<Scalars['String']>
  preferredIPFSGateway_not_in?: Maybe<Array<Scalars['String']>>
  preferredIPFSGateway_not_starts_with?: Maybe<Scalars['String']>
  preferredIPFSGateway_not_starts_with_nocase?: Maybe<Scalars['String']>
  preferredIPFSGateway_starts_with?: Maybe<Scalars['String']>
  preferredIPFSGateway_starts_with_nocase?: Maybe<Scalars['String']>
  projects_?: Maybe<Project_Filter>
  randomizerContract?: Maybe<Scalars['Bytes']>
  randomizerContract_contains?: Maybe<Scalars['Bytes']>
  randomizerContract_in?: Maybe<Array<Scalars['Bytes']>>
  randomizerContract_not?: Maybe<Scalars['Bytes']>
  randomizerContract_not_contains?: Maybe<Scalars['Bytes']>
  randomizerContract_not_in?: Maybe<Array<Scalars['Bytes']>>
  renderProviderAddress?: Maybe<Scalars['Bytes']>
  renderProviderAddress_contains?: Maybe<Scalars['Bytes']>
  renderProviderAddress_in?: Maybe<Array<Scalars['Bytes']>>
  renderProviderAddress_not?: Maybe<Scalars['Bytes']>
  renderProviderAddress_not_contains?: Maybe<Scalars['Bytes']>
  renderProviderAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  renderProviderPercentage?: Maybe<Scalars['BigInt']>
  renderProviderPercentage_gt?: Maybe<Scalars['BigInt']>
  renderProviderPercentage_gte?: Maybe<Scalars['BigInt']>
  renderProviderPercentage_in?: Maybe<Array<Scalars['BigInt']>>
  renderProviderPercentage_lt?: Maybe<Scalars['BigInt']>
  renderProviderPercentage_lte?: Maybe<Scalars['BigInt']>
  renderProviderPercentage_not?: Maybe<Scalars['BigInt']>
  renderProviderPercentage_not_in?: Maybe<Array<Scalars['BigInt']>>
  renderProviderSecondarySalesAddress?: Maybe<Scalars['Bytes']>
  renderProviderSecondarySalesAddress_contains?: Maybe<Scalars['Bytes']>
  renderProviderSecondarySalesAddress_in?: Maybe<Array<Scalars['Bytes']>>
  renderProviderSecondarySalesAddress_not?: Maybe<Scalars['Bytes']>
  renderProviderSecondarySalesAddress_not_contains?: Maybe<Scalars['Bytes']>
  renderProviderSecondarySalesAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  renderProviderSecondarySalesBPS?: Maybe<Scalars['BigInt']>
  renderProviderSecondarySalesBPS_gt?: Maybe<Scalars['BigInt']>
  renderProviderSecondarySalesBPS_gte?: Maybe<Scalars['BigInt']>
  renderProviderSecondarySalesBPS_in?: Maybe<Array<Scalars['BigInt']>>
  renderProviderSecondarySalesBPS_lt?: Maybe<Scalars['BigInt']>
  renderProviderSecondarySalesBPS_lte?: Maybe<Scalars['BigInt']>
  renderProviderSecondarySalesBPS_not?: Maybe<Scalars['BigInt']>
  renderProviderSecondarySalesBPS_not_in?: Maybe<Array<Scalars['BigInt']>>
  tokens_?: Maybe<Token_Filter>
  type?: Maybe<CoreType>
  type_in?: Maybe<Array<CoreType>>
  type_not?: Maybe<CoreType>
  type_not_in?: Maybe<Array<CoreType>>
  updatedAt?: Maybe<Scalars['BigInt']>
  updatedAt_gt?: Maybe<Scalars['BigInt']>
  updatedAt_gte?: Maybe<Scalars['BigInt']>
  updatedAt_in?: Maybe<Array<Scalars['BigInt']>>
  updatedAt_lt?: Maybe<Scalars['BigInt']>
  updatedAt_lte?: Maybe<Scalars['BigInt']>
  updatedAt_not?: Maybe<Scalars['BigInt']>
  updatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  whitelisted_?: Maybe<Whitelisting_Filter>
}

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
  Whitelisted = 'whitelisted',
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
}

export type CreateApplicationInput = {
  artistName: Scalars['String']
  creatorHistory?: Maybe<Scalars['String']>
  discord?: Maybe<Scalars['String']>
  email: Scalars['String']
  originalityAck: Scalars['Boolean']
  portfolio: Scalars['String']
  projectName: Scalars['String']
  technicalProficiency: Scalars['String']
  timelineAck: Scalars['Boolean']
  twitter?: Maybe<Scalars['String']>
  walletAddress: Scalars['String']
}

export type CreateApplicationOutput = {
  __typename?: 'CreateApplicationOutput'
  shellUrl?: Maybe<Scalars['String']>
}

export enum Exchange {
  /** LooksRare */
  LrV1 = 'LR_V1',
  /** Opensea Seaport */
  OsSp = 'OS_SP',
  /** Opensea V1 */
  OsV1 = 'OS_V1',
  /** Opensea V2 */
  OsV2 = 'OS_V2',
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>
  _gt?: Maybe<Scalars['Int']>
  _gte?: Maybe<Scalars['Int']>
  _in?: Maybe<Array<Scalars['Int']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Int']>
  _lte?: Maybe<Scalars['Int']>
  _neq?: Maybe<Scalars['Int']>
  _nin?: Maybe<Array<Scalars['Int']>>
}

export type Minter = {
  __typename?: 'Minter'
  coreContract: Contract
  /** Configuration details used by specific minters (json string) */
  extraMinterDetails: Scalars['String']
  /** Unique identifier made up of minter contract address */
  id: Scalars['ID']
  /** Maximum allowed half life in seconds (exponential Dutch auction minters) */
  maximumHalfLifeInSeconds?: Maybe<Scalars['BigInt']>
  /** Minimum allowed auction length in seconds (linear Dutch auction minters) */
  minimumAuctionLengthInSeconds?: Maybe<Scalars['BigInt']>
  /** Minimum allowed half life in seconds (exponential Dutch auction minters) */
  minimumHalfLifeInSeconds?: Maybe<Scalars['BigInt']>
  /** Associated Minter Filter */
  minterFilter: MinterFilter
  /** Minter type */
  type: MinterType
  updatedAt: Scalars['BigInt']
}

export type MinterFilter = {
  __typename?: 'MinterFilter'
  /** Minters associated with MinterFilter */
  associatedMinters: Array<Minter>
  /** Associated core contract */
  coreContract: Contract
  /** Unique identifier made up of minter filter contract address */
  id: Scalars['ID']
  /** Minters allowlisted on MinterFilter */
  minterAllowlist: Array<Minter>
  updatedAt: Scalars['BigInt']
}

export type MinterFilterAssociatedMintersArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Minter_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Minter_Filter>
}

export type MinterFilterMinterAllowlistArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Minter_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Minter_Filter>
}

export type MinterFilter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  associatedMinters_?: Maybe<Minter_Filter>
  coreContract?: Maybe<Scalars['String']>
  coreContract_?: Maybe<Contract_Filter>
  coreContract_contains?: Maybe<Scalars['String']>
  coreContract_contains_nocase?: Maybe<Scalars['String']>
  coreContract_ends_with?: Maybe<Scalars['String']>
  coreContract_ends_with_nocase?: Maybe<Scalars['String']>
  coreContract_gt?: Maybe<Scalars['String']>
  coreContract_gte?: Maybe<Scalars['String']>
  coreContract_in?: Maybe<Array<Scalars['String']>>
  coreContract_lt?: Maybe<Scalars['String']>
  coreContract_lte?: Maybe<Scalars['String']>
  coreContract_not?: Maybe<Scalars['String']>
  coreContract_not_contains?: Maybe<Scalars['String']>
  coreContract_not_contains_nocase?: Maybe<Scalars['String']>
  coreContract_not_ends_with?: Maybe<Scalars['String']>
  coreContract_not_ends_with_nocase?: Maybe<Scalars['String']>
  coreContract_not_in?: Maybe<Array<Scalars['String']>>
  coreContract_not_starts_with?: Maybe<Scalars['String']>
  coreContract_not_starts_with_nocase?: Maybe<Scalars['String']>
  coreContract_starts_with?: Maybe<Scalars['String']>
  coreContract_starts_with_nocase?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  minterAllowlist?: Maybe<Array<Scalars['String']>>
  minterAllowlist_?: Maybe<Minter_Filter>
  minterAllowlist_contains?: Maybe<Array<Scalars['String']>>
  minterAllowlist_contains_nocase?: Maybe<Array<Scalars['String']>>
  minterAllowlist_not?: Maybe<Array<Scalars['String']>>
  minterAllowlist_not_contains?: Maybe<Array<Scalars['String']>>
  minterAllowlist_not_contains_nocase?: Maybe<Array<Scalars['String']>>
  updatedAt?: Maybe<Scalars['BigInt']>
  updatedAt_gt?: Maybe<Scalars['BigInt']>
  updatedAt_gte?: Maybe<Scalars['BigInt']>
  updatedAt_in?: Maybe<Array<Scalars['BigInt']>>
  updatedAt_lt?: Maybe<Scalars['BigInt']>
  updatedAt_lte?: Maybe<Scalars['BigInt']>
  updatedAt_not?: Maybe<Scalars['BigInt']>
  updatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
}

export enum MinterFilter_OrderBy {
  AssociatedMinters = 'associatedMinters',
  CoreContract = 'coreContract',
  Id = 'id',
  MinterAllowlist = 'minterAllowlist',
  UpdatedAt = 'updatedAt',
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
  MinterSetPriceV2 = 'MinterSetPriceV2',
}

export type Minter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  coreContract?: Maybe<Scalars['String']>
  coreContract_?: Maybe<Contract_Filter>
  coreContract_contains?: Maybe<Scalars['String']>
  coreContract_contains_nocase?: Maybe<Scalars['String']>
  coreContract_ends_with?: Maybe<Scalars['String']>
  coreContract_ends_with_nocase?: Maybe<Scalars['String']>
  coreContract_gt?: Maybe<Scalars['String']>
  coreContract_gte?: Maybe<Scalars['String']>
  coreContract_in?: Maybe<Array<Scalars['String']>>
  coreContract_lt?: Maybe<Scalars['String']>
  coreContract_lte?: Maybe<Scalars['String']>
  coreContract_not?: Maybe<Scalars['String']>
  coreContract_not_contains?: Maybe<Scalars['String']>
  coreContract_not_contains_nocase?: Maybe<Scalars['String']>
  coreContract_not_ends_with?: Maybe<Scalars['String']>
  coreContract_not_ends_with_nocase?: Maybe<Scalars['String']>
  coreContract_not_in?: Maybe<Array<Scalars['String']>>
  coreContract_not_starts_with?: Maybe<Scalars['String']>
  coreContract_not_starts_with_nocase?: Maybe<Scalars['String']>
  coreContract_starts_with?: Maybe<Scalars['String']>
  coreContract_starts_with_nocase?: Maybe<Scalars['String']>
  extraMinterDetails?: Maybe<Scalars['String']>
  extraMinterDetails_contains?: Maybe<Scalars['String']>
  extraMinterDetails_contains_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_ends_with?: Maybe<Scalars['String']>
  extraMinterDetails_ends_with_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_gt?: Maybe<Scalars['String']>
  extraMinterDetails_gte?: Maybe<Scalars['String']>
  extraMinterDetails_in?: Maybe<Array<Scalars['String']>>
  extraMinterDetails_lt?: Maybe<Scalars['String']>
  extraMinterDetails_lte?: Maybe<Scalars['String']>
  extraMinterDetails_not?: Maybe<Scalars['String']>
  extraMinterDetails_not_contains?: Maybe<Scalars['String']>
  extraMinterDetails_not_contains_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_not_ends_with?: Maybe<Scalars['String']>
  extraMinterDetails_not_ends_with_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_not_in?: Maybe<Array<Scalars['String']>>
  extraMinterDetails_not_starts_with?: Maybe<Scalars['String']>
  extraMinterDetails_not_starts_with_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_starts_with?: Maybe<Scalars['String']>
  extraMinterDetails_starts_with_nocase?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  maximumHalfLifeInSeconds?: Maybe<Scalars['BigInt']>
  maximumHalfLifeInSeconds_gt?: Maybe<Scalars['BigInt']>
  maximumHalfLifeInSeconds_gte?: Maybe<Scalars['BigInt']>
  maximumHalfLifeInSeconds_in?: Maybe<Array<Scalars['BigInt']>>
  maximumHalfLifeInSeconds_lt?: Maybe<Scalars['BigInt']>
  maximumHalfLifeInSeconds_lte?: Maybe<Scalars['BigInt']>
  maximumHalfLifeInSeconds_not?: Maybe<Scalars['BigInt']>
  maximumHalfLifeInSeconds_not_in?: Maybe<Array<Scalars['BigInt']>>
  minimumAuctionLengthInSeconds?: Maybe<Scalars['BigInt']>
  minimumAuctionLengthInSeconds_gt?: Maybe<Scalars['BigInt']>
  minimumAuctionLengthInSeconds_gte?: Maybe<Scalars['BigInt']>
  minimumAuctionLengthInSeconds_in?: Maybe<Array<Scalars['BigInt']>>
  minimumAuctionLengthInSeconds_lt?: Maybe<Scalars['BigInt']>
  minimumAuctionLengthInSeconds_lte?: Maybe<Scalars['BigInt']>
  minimumAuctionLengthInSeconds_not?: Maybe<Scalars['BigInt']>
  minimumAuctionLengthInSeconds_not_in?: Maybe<Array<Scalars['BigInt']>>
  minimumHalfLifeInSeconds?: Maybe<Scalars['BigInt']>
  minimumHalfLifeInSeconds_gt?: Maybe<Scalars['BigInt']>
  minimumHalfLifeInSeconds_gte?: Maybe<Scalars['BigInt']>
  minimumHalfLifeInSeconds_in?: Maybe<Array<Scalars['BigInt']>>
  minimumHalfLifeInSeconds_lt?: Maybe<Scalars['BigInt']>
  minimumHalfLifeInSeconds_lte?: Maybe<Scalars['BigInt']>
  minimumHalfLifeInSeconds_not?: Maybe<Scalars['BigInt']>
  minimumHalfLifeInSeconds_not_in?: Maybe<Array<Scalars['BigInt']>>
  minterFilter?: Maybe<Scalars['String']>
  minterFilter_?: Maybe<MinterFilter_Filter>
  minterFilter_contains?: Maybe<Scalars['String']>
  minterFilter_contains_nocase?: Maybe<Scalars['String']>
  minterFilter_ends_with?: Maybe<Scalars['String']>
  minterFilter_ends_with_nocase?: Maybe<Scalars['String']>
  minterFilter_gt?: Maybe<Scalars['String']>
  minterFilter_gte?: Maybe<Scalars['String']>
  minterFilter_in?: Maybe<Array<Scalars['String']>>
  minterFilter_lt?: Maybe<Scalars['String']>
  minterFilter_lte?: Maybe<Scalars['String']>
  minterFilter_not?: Maybe<Scalars['String']>
  minterFilter_not_contains?: Maybe<Scalars['String']>
  minterFilter_not_contains_nocase?: Maybe<Scalars['String']>
  minterFilter_not_ends_with?: Maybe<Scalars['String']>
  minterFilter_not_ends_with_nocase?: Maybe<Scalars['String']>
  minterFilter_not_in?: Maybe<Array<Scalars['String']>>
  minterFilter_not_starts_with?: Maybe<Scalars['String']>
  minterFilter_not_starts_with_nocase?: Maybe<Scalars['String']>
  minterFilter_starts_with?: Maybe<Scalars['String']>
  minterFilter_starts_with_nocase?: Maybe<Scalars['String']>
  type?: Maybe<MinterType>
  type_in?: Maybe<Array<MinterType>>
  type_not?: Maybe<MinterType>
  type_not_in?: Maybe<Array<MinterType>>
  updatedAt?: Maybe<Scalars['BigInt']>
  updatedAt_gt?: Maybe<Scalars['BigInt']>
  updatedAt_gte?: Maybe<Scalars['BigInt']>
  updatedAt_in?: Maybe<Array<Scalars['BigInt']>>
  updatedAt_lt?: Maybe<Scalars['BigInt']>
  updatedAt_lte?: Maybe<Scalars['BigInt']>
  updatedAt_not?: Maybe<Scalars['BigInt']>
  updatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
}

export enum Minter_OrderBy {
  CoreContract = 'coreContract',
  ExtraMinterDetails = 'extraMinterDetails',
  Id = 'id',
  MaximumHalfLifeInSeconds = 'maximumHalfLifeInSeconds',
  MinimumAuctionLengthInSeconds = 'minimumAuctionLengthInSeconds',
  MinimumHalfLifeInSeconds = 'minimumHalfLifeInSeconds',
  MinterFilter = 'minterFilter',
  Type = 'type',
  UpdatedAt = 'updatedAt',
}

export type OpenseaCollectionData = {
  __typename?: 'OpenseaCollectionData'
  projectId: Scalars['String']
  url: Scalars['String']
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Payment = {
  __typename?: 'Payment'
  /** Payment id formatted: '{SaleId}-{paymentNumber}' (paymentNumber will be 0 for non-Seaport trades) */
  id: Scalars['ID']
  /** The address of the token used for the payment */
  paymentToken: Scalars['Bytes']
  /** Type of token transferred in this payment */
  paymentType: PaymentType
  /** The price of the sale */
  price: Scalars['BigInt']
  /** The recipient address */
  recipient: Scalars['Bytes']
  /** The associated sale */
  sale: Sale
}

export enum PaymentType {
  Erc1155 = 'ERC1155',
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Native = 'Native',
}

export type Payment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  paymentToken?: Maybe<Scalars['Bytes']>
  paymentToken_contains?: Maybe<Scalars['Bytes']>
  paymentToken_in?: Maybe<Array<Scalars['Bytes']>>
  paymentToken_not?: Maybe<Scalars['Bytes']>
  paymentToken_not_contains?: Maybe<Scalars['Bytes']>
  paymentToken_not_in?: Maybe<Array<Scalars['Bytes']>>
  paymentType?: Maybe<PaymentType>
  paymentType_in?: Maybe<Array<PaymentType>>
  paymentType_not?: Maybe<PaymentType>
  paymentType_not_in?: Maybe<Array<PaymentType>>
  price?: Maybe<Scalars['BigInt']>
  price_gt?: Maybe<Scalars['BigInt']>
  price_gte?: Maybe<Scalars['BigInt']>
  price_in?: Maybe<Array<Scalars['BigInt']>>
  price_lt?: Maybe<Scalars['BigInt']>
  price_lte?: Maybe<Scalars['BigInt']>
  price_not?: Maybe<Scalars['BigInt']>
  price_not_in?: Maybe<Array<Scalars['BigInt']>>
  recipient?: Maybe<Scalars['Bytes']>
  recipient_contains?: Maybe<Scalars['Bytes']>
  recipient_in?: Maybe<Array<Scalars['Bytes']>>
  recipient_not?: Maybe<Scalars['Bytes']>
  recipient_not_contains?: Maybe<Scalars['Bytes']>
  recipient_not_in?: Maybe<Array<Scalars['Bytes']>>
  sale?: Maybe<Scalars['String']>
  sale_?: Maybe<Sale_Filter>
  sale_contains?: Maybe<Scalars['String']>
  sale_contains_nocase?: Maybe<Scalars['String']>
  sale_ends_with?: Maybe<Scalars['String']>
  sale_ends_with_nocase?: Maybe<Scalars['String']>
  sale_gt?: Maybe<Scalars['String']>
  sale_gte?: Maybe<Scalars['String']>
  sale_in?: Maybe<Array<Scalars['String']>>
  sale_lt?: Maybe<Scalars['String']>
  sale_lte?: Maybe<Scalars['String']>
  sale_not?: Maybe<Scalars['String']>
  sale_not_contains?: Maybe<Scalars['String']>
  sale_not_contains_nocase?: Maybe<Scalars['String']>
  sale_not_ends_with?: Maybe<Scalars['String']>
  sale_not_ends_with_nocase?: Maybe<Scalars['String']>
  sale_not_in?: Maybe<Array<Scalars['String']>>
  sale_not_starts_with?: Maybe<Scalars['String']>
  sale_not_starts_with_nocase?: Maybe<Scalars['String']>
  sale_starts_with?: Maybe<Scalars['String']>
  sale_starts_with_nocase?: Maybe<Scalars['String']>
}

export enum Payment_OrderBy {
  Id = 'id',
  PaymentToken = 'paymentToken',
  PaymentType = 'paymentType',
  Price = 'price',
  Recipient = 'recipient',
  Sale = 'sale',
}

export type Project = {
  __typename?: 'Project'
  activatedAt?: Maybe<Scalars['BigInt']>
  /** Determines if the project should be visible to the public */
  active: Scalars['Boolean']
  /** Address to split primary sales with the artist */
  additionalPayee?: Maybe<Scalars['Bytes']>
  /** Percentage of artist's share of primary sales that goes to additional payee */
  additionalPayeePercentage?: Maybe<Scalars['BigInt']>
  /** Address to split Secondary sales with the artist */
  additionalPayeeSecondarySalesAddress?: Maybe<Scalars['Bytes']>
  /** Percentage of artist's share of secondary sales that goes to additional payee */
  additionalPayeeSecondarySalesPercentage?: Maybe<Scalars['BigInt']>
  /** Artist that created the project */
  artist: Account
  /** Wallet address of the artist */
  artistAddress: Scalars['Bytes']
  /** Artist name */
  artistName?: Maybe<Scalars['String']>
  /** Aspect ratio of the project (see `scriptJSON` if null) */
  aspectRatio?: Maybe<Scalars['String']>
  baseIpfsUri?: Maybe<Scalars['String']>
  baseUri?: Maybe<Scalars['String']>
  /** A project is complete when it has reached its maximum invocations */
  complete: Scalars['Boolean']
  /** Timestamp at which a project was completed */
  completedAt?: Maybe<Scalars['BigInt']>
  contract: Contract
  createdAt: Scalars['BigInt']
  /** Curated, playground, factory. A project with no curation status is considered factory */
  curationStatus?: Maybe<Scalars['String']>
  /** ERC-20 contract address if the project is purchasable via ERC-20 */
  currencyAddress?: Maybe<Scalars['Bytes']>
  /** Currency symbol for ERC-20 */
  currencySymbol?: Maybe<Scalars['String']>
  /** Artist description of the project */
  description?: Maybe<Scalars['String']>
  /** Is the project dynamic or a static image */
  dynamic: Scalars['Boolean']
  externalAssetDependencies: Array<ProjectExternalAssetDependency>
  /** Once the project's external asset dependencies are locked they may never be modified again */
  externalAssetDependenciesLocked: Scalars['Boolean']
  /** The number of external asset dependencies stored on-chain */
  externalAssetDependencyCount: Scalars['BigInt']
  /** Unique identifier made up of contract address and project id */
  id: Scalars['ID']
  /** Number of times the project has been invoked - number of tokens of the project */
  invocations: Scalars['BigInt']
  ipfsHash?: Maybe<Scalars['String']>
  /** License for the project */
  license?: Maybe<Scalars['String']>
  /** For V3 and-on, this field is null, and projects lock 4 weeks after `completedAt`. Once the project is locked its script may never be updated again. */
  locked?: Maybe<Scalars['Boolean']>
  /** Maximum number of invocations allowed for the project */
  maxInvocations: Scalars['BigInt']
  /** Minter configuration for this project (not implemented prior to minter filters) */
  minterConfiguration?: Maybe<ProjectMinterConfiguration>
  /** Project name */
  name?: Maybe<Scalars['String']>
  /** Accounts that own tokens of the project */
  owners?: Maybe<Array<AccountProject>>
  /** Purchases paused */
  paused: Scalars['Boolean']
  pricePerTokenInWei: Scalars['BigInt']
  /** ID of the project on the contract */
  projectId: Scalars['BigInt']
  /** Proposed Artist addresses and payment split percentages */
  proposedArtistAddressesAndSplits?: Maybe<ProposedArtistAddressesAndSplit>
  /** Artist/additional payee royalty percentage */
  royaltyPercentage?: Maybe<Scalars['BigInt']>
  /** Lookup table to get the Sale history of the project */
  saleLookupTables: Array<SaleLookupTable>
  /** The full script composed of scripts */
  script?: Maybe<Scalars['String']>
  /** The number of scripts stored on-chain */
  scriptCount: Scalars['BigInt']
  /** Extra information about the script and rendering options */
  scriptJSON?: Maybe<Scalars['String']>
  /** Script type and version (see `scriptJSON` if null) */
  scriptTypeAndVersion?: Maybe<Scalars['String']>
  scriptUpdatedAt?: Maybe<Scalars['BigInt']>
  /** Parts of the project script */
  scripts?: Maybe<Array<ProjectScript>>
  /** Tokens of the project */
  tokens?: Maybe<Array<Token>>
  updatedAt: Scalars['BigInt']
  /** Does the project actually use the hash string */
  useHashString: Scalars['Boolean']
  /** Does the project use media from ipfs */
  useIpfs?: Maybe<Scalars['Boolean']>
  /** Artist or project website */
  website?: Maybe<Scalars['String']>
}

export type ProjectExternalAssetDependenciesArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectExternalAssetDependency_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<ProjectExternalAssetDependency_Filter>
}

export type ProjectOwnersArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<AccountProject_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<AccountProject_Filter>
}

export type ProjectSaleLookupTablesArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SaleLookupTable_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<SaleLookupTable_Filter>
}

export type ProjectScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectScript_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<ProjectScript_Filter>
}

export type ProjectTokensArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Token_Filter>
}

export type ProjectExternalAssetDependency = {
  __typename?: 'ProjectExternalAssetDependency'
  /** The dependency cid */
  cid: Scalars['String']
  /** The dependency type */
  dependencyType: ProjectExternalAssetDependencyType
  /** Unique identifier made up of projectId-index */
  id: Scalars['ID']
  /** The dependency index */
  index: Scalars['BigInt']
  /** The associated project */
  project: Project
}

export enum ProjectExternalAssetDependencyType {
  /** Asset hosted on Arweave */
  Arweave = 'ARWEAVE',
  /** Asset hosted on IPFS */
  Ipfs = 'IPFS',
}

export type ProjectExternalAssetDependency_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  cid?: Maybe<Scalars['String']>
  cid_contains?: Maybe<Scalars['String']>
  cid_contains_nocase?: Maybe<Scalars['String']>
  cid_ends_with?: Maybe<Scalars['String']>
  cid_ends_with_nocase?: Maybe<Scalars['String']>
  cid_gt?: Maybe<Scalars['String']>
  cid_gte?: Maybe<Scalars['String']>
  cid_in?: Maybe<Array<Scalars['String']>>
  cid_lt?: Maybe<Scalars['String']>
  cid_lte?: Maybe<Scalars['String']>
  cid_not?: Maybe<Scalars['String']>
  cid_not_contains?: Maybe<Scalars['String']>
  cid_not_contains_nocase?: Maybe<Scalars['String']>
  cid_not_ends_with?: Maybe<Scalars['String']>
  cid_not_ends_with_nocase?: Maybe<Scalars['String']>
  cid_not_in?: Maybe<Array<Scalars['String']>>
  cid_not_starts_with?: Maybe<Scalars['String']>
  cid_not_starts_with_nocase?: Maybe<Scalars['String']>
  cid_starts_with?: Maybe<Scalars['String']>
  cid_starts_with_nocase?: Maybe<Scalars['String']>
  dependencyType?: Maybe<ProjectExternalAssetDependencyType>
  dependencyType_in?: Maybe<Array<ProjectExternalAssetDependencyType>>
  dependencyType_not?: Maybe<ProjectExternalAssetDependencyType>
  dependencyType_not_in?: Maybe<Array<ProjectExternalAssetDependencyType>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  index?: Maybe<Scalars['BigInt']>
  index_gt?: Maybe<Scalars['BigInt']>
  index_gte?: Maybe<Scalars['BigInt']>
  index_in?: Maybe<Array<Scalars['BigInt']>>
  index_lt?: Maybe<Scalars['BigInt']>
  index_lte?: Maybe<Scalars['BigInt']>
  index_not?: Maybe<Scalars['BigInt']>
  index_not_in?: Maybe<Array<Scalars['BigInt']>>
  project?: Maybe<Scalars['String']>
  project_?: Maybe<Project_Filter>
  project_contains?: Maybe<Scalars['String']>
  project_contains_nocase?: Maybe<Scalars['String']>
  project_ends_with?: Maybe<Scalars['String']>
  project_ends_with_nocase?: Maybe<Scalars['String']>
  project_gt?: Maybe<Scalars['String']>
  project_gte?: Maybe<Scalars['String']>
  project_in?: Maybe<Array<Scalars['String']>>
  project_lt?: Maybe<Scalars['String']>
  project_lte?: Maybe<Scalars['String']>
  project_not?: Maybe<Scalars['String']>
  project_not_contains?: Maybe<Scalars['String']>
  project_not_contains_nocase?: Maybe<Scalars['String']>
  project_not_ends_with?: Maybe<Scalars['String']>
  project_not_ends_with_nocase?: Maybe<Scalars['String']>
  project_not_in?: Maybe<Array<Scalars['String']>>
  project_not_starts_with?: Maybe<Scalars['String']>
  project_not_starts_with_nocase?: Maybe<Scalars['String']>
  project_starts_with?: Maybe<Scalars['String']>
  project_starts_with_nocase?: Maybe<Scalars['String']>
}

export enum ProjectExternalAssetDependency_OrderBy {
  Cid = 'cid',
  DependencyType = 'dependencyType',
  Id = 'id',
  Index = 'index',
  Project = 'project',
}

export type ProjectMinterConfiguration = {
  __typename?: 'ProjectMinterConfiguration'
  /** price of token or resting price of Duch auction, in wei */
  basePrice?: Maybe<Scalars['BigInt']>
  /** currency address as defined on minter - address(0) reserved for ether */
  currencyAddress: Scalars['Bytes']
  /** currency symbol as defined on minter - ETH reserved for ether */
  currencySymbol: Scalars['String']
  /** Linear Dutch auction end time (unix timestamp) */
  endTime?: Maybe<Scalars['BigInt']>
  /** Configuration details used by specific minter project configurations (json string) */
  extraMinterDetails: Scalars['String']
  /** Half life for exponential decay Dutch auction, in seconds */
  halfLifeSeconds?: Maybe<Scalars['BigInt']>
  /** Unique identifier made up of minter contract address-projectId */
  id: Scalars['ID']
  /** The associated minter */
  minter: Minter
  /** true if project's token price has been configured on minter */
  priceIsConfigured: Scalars['Boolean']
  /** The associated project */
  project: Project
  /** Defines if purchasing token to another is allowed */
  purchaseToDisabled: Scalars['Boolean']
  /** Dutch auction start price, in wei */
  startPrice?: Maybe<Scalars['BigInt']>
  /** Dutch auction start time (unix timestamp) */
  startTime?: Maybe<Scalars['BigInt']>
}

export type ProjectMinterConfiguration_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  basePrice?: Maybe<Scalars['BigInt']>
  basePrice_gt?: Maybe<Scalars['BigInt']>
  basePrice_gte?: Maybe<Scalars['BigInt']>
  basePrice_in?: Maybe<Array<Scalars['BigInt']>>
  basePrice_lt?: Maybe<Scalars['BigInt']>
  basePrice_lte?: Maybe<Scalars['BigInt']>
  basePrice_not?: Maybe<Scalars['BigInt']>
  basePrice_not_in?: Maybe<Array<Scalars['BigInt']>>
  currencyAddress?: Maybe<Scalars['Bytes']>
  currencyAddress_contains?: Maybe<Scalars['Bytes']>
  currencyAddress_in?: Maybe<Array<Scalars['Bytes']>>
  currencyAddress_not?: Maybe<Scalars['Bytes']>
  currencyAddress_not_contains?: Maybe<Scalars['Bytes']>
  currencyAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  currencySymbol?: Maybe<Scalars['String']>
  currencySymbol_contains?: Maybe<Scalars['String']>
  currencySymbol_contains_nocase?: Maybe<Scalars['String']>
  currencySymbol_ends_with?: Maybe<Scalars['String']>
  currencySymbol_ends_with_nocase?: Maybe<Scalars['String']>
  currencySymbol_gt?: Maybe<Scalars['String']>
  currencySymbol_gte?: Maybe<Scalars['String']>
  currencySymbol_in?: Maybe<Array<Scalars['String']>>
  currencySymbol_lt?: Maybe<Scalars['String']>
  currencySymbol_lte?: Maybe<Scalars['String']>
  currencySymbol_not?: Maybe<Scalars['String']>
  currencySymbol_not_contains?: Maybe<Scalars['String']>
  currencySymbol_not_contains_nocase?: Maybe<Scalars['String']>
  currencySymbol_not_ends_with?: Maybe<Scalars['String']>
  currencySymbol_not_ends_with_nocase?: Maybe<Scalars['String']>
  currencySymbol_not_in?: Maybe<Array<Scalars['String']>>
  currencySymbol_not_starts_with?: Maybe<Scalars['String']>
  currencySymbol_not_starts_with_nocase?: Maybe<Scalars['String']>
  currencySymbol_starts_with?: Maybe<Scalars['String']>
  currencySymbol_starts_with_nocase?: Maybe<Scalars['String']>
  endTime?: Maybe<Scalars['BigInt']>
  endTime_gt?: Maybe<Scalars['BigInt']>
  endTime_gte?: Maybe<Scalars['BigInt']>
  endTime_in?: Maybe<Array<Scalars['BigInt']>>
  endTime_lt?: Maybe<Scalars['BigInt']>
  endTime_lte?: Maybe<Scalars['BigInt']>
  endTime_not?: Maybe<Scalars['BigInt']>
  endTime_not_in?: Maybe<Array<Scalars['BigInt']>>
  extraMinterDetails?: Maybe<Scalars['String']>
  extraMinterDetails_contains?: Maybe<Scalars['String']>
  extraMinterDetails_contains_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_ends_with?: Maybe<Scalars['String']>
  extraMinterDetails_ends_with_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_gt?: Maybe<Scalars['String']>
  extraMinterDetails_gte?: Maybe<Scalars['String']>
  extraMinterDetails_in?: Maybe<Array<Scalars['String']>>
  extraMinterDetails_lt?: Maybe<Scalars['String']>
  extraMinterDetails_lte?: Maybe<Scalars['String']>
  extraMinterDetails_not?: Maybe<Scalars['String']>
  extraMinterDetails_not_contains?: Maybe<Scalars['String']>
  extraMinterDetails_not_contains_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_not_ends_with?: Maybe<Scalars['String']>
  extraMinterDetails_not_ends_with_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_not_in?: Maybe<Array<Scalars['String']>>
  extraMinterDetails_not_starts_with?: Maybe<Scalars['String']>
  extraMinterDetails_not_starts_with_nocase?: Maybe<Scalars['String']>
  extraMinterDetails_starts_with?: Maybe<Scalars['String']>
  extraMinterDetails_starts_with_nocase?: Maybe<Scalars['String']>
  halfLifeSeconds?: Maybe<Scalars['BigInt']>
  halfLifeSeconds_gt?: Maybe<Scalars['BigInt']>
  halfLifeSeconds_gte?: Maybe<Scalars['BigInt']>
  halfLifeSeconds_in?: Maybe<Array<Scalars['BigInt']>>
  halfLifeSeconds_lt?: Maybe<Scalars['BigInt']>
  halfLifeSeconds_lte?: Maybe<Scalars['BigInt']>
  halfLifeSeconds_not?: Maybe<Scalars['BigInt']>
  halfLifeSeconds_not_in?: Maybe<Array<Scalars['BigInt']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  minter?: Maybe<Scalars['String']>
  minter_?: Maybe<Minter_Filter>
  minter_contains?: Maybe<Scalars['String']>
  minter_contains_nocase?: Maybe<Scalars['String']>
  minter_ends_with?: Maybe<Scalars['String']>
  minter_ends_with_nocase?: Maybe<Scalars['String']>
  minter_gt?: Maybe<Scalars['String']>
  minter_gte?: Maybe<Scalars['String']>
  minter_in?: Maybe<Array<Scalars['String']>>
  minter_lt?: Maybe<Scalars['String']>
  minter_lte?: Maybe<Scalars['String']>
  minter_not?: Maybe<Scalars['String']>
  minter_not_contains?: Maybe<Scalars['String']>
  minter_not_contains_nocase?: Maybe<Scalars['String']>
  minter_not_ends_with?: Maybe<Scalars['String']>
  minter_not_ends_with_nocase?: Maybe<Scalars['String']>
  minter_not_in?: Maybe<Array<Scalars['String']>>
  minter_not_starts_with?: Maybe<Scalars['String']>
  minter_not_starts_with_nocase?: Maybe<Scalars['String']>
  minter_starts_with?: Maybe<Scalars['String']>
  minter_starts_with_nocase?: Maybe<Scalars['String']>
  priceIsConfigured?: Maybe<Scalars['Boolean']>
  priceIsConfigured_in?: Maybe<Array<Scalars['Boolean']>>
  priceIsConfigured_not?: Maybe<Scalars['Boolean']>
  priceIsConfigured_not_in?: Maybe<Array<Scalars['Boolean']>>
  project?: Maybe<Scalars['String']>
  project_?: Maybe<Project_Filter>
  project_contains?: Maybe<Scalars['String']>
  project_contains_nocase?: Maybe<Scalars['String']>
  project_ends_with?: Maybe<Scalars['String']>
  project_ends_with_nocase?: Maybe<Scalars['String']>
  project_gt?: Maybe<Scalars['String']>
  project_gte?: Maybe<Scalars['String']>
  project_in?: Maybe<Array<Scalars['String']>>
  project_lt?: Maybe<Scalars['String']>
  project_lte?: Maybe<Scalars['String']>
  project_not?: Maybe<Scalars['String']>
  project_not_contains?: Maybe<Scalars['String']>
  project_not_contains_nocase?: Maybe<Scalars['String']>
  project_not_ends_with?: Maybe<Scalars['String']>
  project_not_ends_with_nocase?: Maybe<Scalars['String']>
  project_not_in?: Maybe<Array<Scalars['String']>>
  project_not_starts_with?: Maybe<Scalars['String']>
  project_not_starts_with_nocase?: Maybe<Scalars['String']>
  project_starts_with?: Maybe<Scalars['String']>
  project_starts_with_nocase?: Maybe<Scalars['String']>
  purchaseToDisabled?: Maybe<Scalars['Boolean']>
  purchaseToDisabled_in?: Maybe<Array<Scalars['Boolean']>>
  purchaseToDisabled_not?: Maybe<Scalars['Boolean']>
  purchaseToDisabled_not_in?: Maybe<Array<Scalars['Boolean']>>
  startPrice?: Maybe<Scalars['BigInt']>
  startPrice_gt?: Maybe<Scalars['BigInt']>
  startPrice_gte?: Maybe<Scalars['BigInt']>
  startPrice_in?: Maybe<Array<Scalars['BigInt']>>
  startPrice_lt?: Maybe<Scalars['BigInt']>
  startPrice_lte?: Maybe<Scalars['BigInt']>
  startPrice_not?: Maybe<Scalars['BigInt']>
  startPrice_not_in?: Maybe<Array<Scalars['BigInt']>>
  startTime?: Maybe<Scalars['BigInt']>
  startTime_gt?: Maybe<Scalars['BigInt']>
  startTime_gte?: Maybe<Scalars['BigInt']>
  startTime_in?: Maybe<Array<Scalars['BigInt']>>
  startTime_lt?: Maybe<Scalars['BigInt']>
  startTime_lte?: Maybe<Scalars['BigInt']>
  startTime_not?: Maybe<Scalars['BigInt']>
  startTime_not_in?: Maybe<Array<Scalars['BigInt']>>
}

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
  StartTime = 'startTime',
}

export type ProjectScript = {
  __typename?: 'ProjectScript'
  id: Scalars['ID']
  index: Scalars['BigInt']
  project: Project
  script: Scalars['String']
}

export type ProjectScript_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  index?: Maybe<Scalars['BigInt']>
  index_gt?: Maybe<Scalars['BigInt']>
  index_gte?: Maybe<Scalars['BigInt']>
  index_in?: Maybe<Array<Scalars['BigInt']>>
  index_lt?: Maybe<Scalars['BigInt']>
  index_lte?: Maybe<Scalars['BigInt']>
  index_not?: Maybe<Scalars['BigInt']>
  index_not_in?: Maybe<Array<Scalars['BigInt']>>
  project?: Maybe<Scalars['String']>
  project_?: Maybe<Project_Filter>
  project_contains?: Maybe<Scalars['String']>
  project_contains_nocase?: Maybe<Scalars['String']>
  project_ends_with?: Maybe<Scalars['String']>
  project_ends_with_nocase?: Maybe<Scalars['String']>
  project_gt?: Maybe<Scalars['String']>
  project_gte?: Maybe<Scalars['String']>
  project_in?: Maybe<Array<Scalars['String']>>
  project_lt?: Maybe<Scalars['String']>
  project_lte?: Maybe<Scalars['String']>
  project_not?: Maybe<Scalars['String']>
  project_not_contains?: Maybe<Scalars['String']>
  project_not_contains_nocase?: Maybe<Scalars['String']>
  project_not_ends_with?: Maybe<Scalars['String']>
  project_not_ends_with_nocase?: Maybe<Scalars['String']>
  project_not_in?: Maybe<Array<Scalars['String']>>
  project_not_starts_with?: Maybe<Scalars['String']>
  project_not_starts_with_nocase?: Maybe<Scalars['String']>
  project_starts_with?: Maybe<Scalars['String']>
  project_starts_with_nocase?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  script_contains?: Maybe<Scalars['String']>
  script_contains_nocase?: Maybe<Scalars['String']>
  script_ends_with?: Maybe<Scalars['String']>
  script_ends_with_nocase?: Maybe<Scalars['String']>
  script_gt?: Maybe<Scalars['String']>
  script_gte?: Maybe<Scalars['String']>
  script_in?: Maybe<Array<Scalars['String']>>
  script_lt?: Maybe<Scalars['String']>
  script_lte?: Maybe<Scalars['String']>
  script_not?: Maybe<Scalars['String']>
  script_not_contains?: Maybe<Scalars['String']>
  script_not_contains_nocase?: Maybe<Scalars['String']>
  script_not_ends_with?: Maybe<Scalars['String']>
  script_not_ends_with_nocase?: Maybe<Scalars['String']>
  script_not_in?: Maybe<Array<Scalars['String']>>
  script_not_starts_with?: Maybe<Scalars['String']>
  script_not_starts_with_nocase?: Maybe<Scalars['String']>
  script_starts_with?: Maybe<Scalars['String']>
  script_starts_with_nocase?: Maybe<Scalars['String']>
}

export enum ProjectScript_OrderBy {
  Id = 'id',
  Index = 'index',
  Project = 'project',
  Script = 'script',
}

export type Project_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  activatedAt?: Maybe<Scalars['BigInt']>
  activatedAt_gt?: Maybe<Scalars['BigInt']>
  activatedAt_gte?: Maybe<Scalars['BigInt']>
  activatedAt_in?: Maybe<Array<Scalars['BigInt']>>
  activatedAt_lt?: Maybe<Scalars['BigInt']>
  activatedAt_lte?: Maybe<Scalars['BigInt']>
  activatedAt_not?: Maybe<Scalars['BigInt']>
  activatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  active?: Maybe<Scalars['Boolean']>
  active_in?: Maybe<Array<Scalars['Boolean']>>
  active_not?: Maybe<Scalars['Boolean']>
  active_not_in?: Maybe<Array<Scalars['Boolean']>>
  additionalPayee?: Maybe<Scalars['Bytes']>
  additionalPayeePercentage?: Maybe<Scalars['BigInt']>
  additionalPayeePercentage_gt?: Maybe<Scalars['BigInt']>
  additionalPayeePercentage_gte?: Maybe<Scalars['BigInt']>
  additionalPayeePercentage_in?: Maybe<Array<Scalars['BigInt']>>
  additionalPayeePercentage_lt?: Maybe<Scalars['BigInt']>
  additionalPayeePercentage_lte?: Maybe<Scalars['BigInt']>
  additionalPayeePercentage_not?: Maybe<Scalars['BigInt']>
  additionalPayeePercentage_not_in?: Maybe<Array<Scalars['BigInt']>>
  additionalPayeeSecondarySalesAddress?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_contains?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_in?: Maybe<Array<Scalars['Bytes']>>
  additionalPayeeSecondarySalesAddress_not?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_not_contains?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  additionalPayeeSecondarySalesPercentage?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_gt?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_gte?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_in?: Maybe<Array<Scalars['BigInt']>>
  additionalPayeeSecondarySalesPercentage_lt?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_lte?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_not?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_not_in?: Maybe<
    Array<Scalars['BigInt']>
  >
  additionalPayee_contains?: Maybe<Scalars['Bytes']>
  additionalPayee_in?: Maybe<Array<Scalars['Bytes']>>
  additionalPayee_not?: Maybe<Scalars['Bytes']>
  additionalPayee_not_contains?: Maybe<Scalars['Bytes']>
  additionalPayee_not_in?: Maybe<Array<Scalars['Bytes']>>
  artist?: Maybe<Scalars['String']>
  artistAddress?: Maybe<Scalars['Bytes']>
  artistAddress_contains?: Maybe<Scalars['Bytes']>
  artistAddress_in?: Maybe<Array<Scalars['Bytes']>>
  artistAddress_not?: Maybe<Scalars['Bytes']>
  artistAddress_not_contains?: Maybe<Scalars['Bytes']>
  artistAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  artistName?: Maybe<Scalars['String']>
  artistName_contains?: Maybe<Scalars['String']>
  artistName_contains_nocase?: Maybe<Scalars['String']>
  artistName_ends_with?: Maybe<Scalars['String']>
  artistName_ends_with_nocase?: Maybe<Scalars['String']>
  artistName_gt?: Maybe<Scalars['String']>
  artistName_gte?: Maybe<Scalars['String']>
  artistName_in?: Maybe<Array<Scalars['String']>>
  artistName_lt?: Maybe<Scalars['String']>
  artistName_lte?: Maybe<Scalars['String']>
  artistName_not?: Maybe<Scalars['String']>
  artistName_not_contains?: Maybe<Scalars['String']>
  artistName_not_contains_nocase?: Maybe<Scalars['String']>
  artistName_not_ends_with?: Maybe<Scalars['String']>
  artistName_not_ends_with_nocase?: Maybe<Scalars['String']>
  artistName_not_in?: Maybe<Array<Scalars['String']>>
  artistName_not_starts_with?: Maybe<Scalars['String']>
  artistName_not_starts_with_nocase?: Maybe<Scalars['String']>
  artistName_starts_with?: Maybe<Scalars['String']>
  artistName_starts_with_nocase?: Maybe<Scalars['String']>
  artist_?: Maybe<Account_Filter>
  artist_contains?: Maybe<Scalars['String']>
  artist_contains_nocase?: Maybe<Scalars['String']>
  artist_ends_with?: Maybe<Scalars['String']>
  artist_ends_with_nocase?: Maybe<Scalars['String']>
  artist_gt?: Maybe<Scalars['String']>
  artist_gte?: Maybe<Scalars['String']>
  artist_in?: Maybe<Array<Scalars['String']>>
  artist_lt?: Maybe<Scalars['String']>
  artist_lte?: Maybe<Scalars['String']>
  artist_not?: Maybe<Scalars['String']>
  artist_not_contains?: Maybe<Scalars['String']>
  artist_not_contains_nocase?: Maybe<Scalars['String']>
  artist_not_ends_with?: Maybe<Scalars['String']>
  artist_not_ends_with_nocase?: Maybe<Scalars['String']>
  artist_not_in?: Maybe<Array<Scalars['String']>>
  artist_not_starts_with?: Maybe<Scalars['String']>
  artist_not_starts_with_nocase?: Maybe<Scalars['String']>
  artist_starts_with?: Maybe<Scalars['String']>
  artist_starts_with_nocase?: Maybe<Scalars['String']>
  aspectRatio?: Maybe<Scalars['String']>
  aspectRatio_contains?: Maybe<Scalars['String']>
  aspectRatio_contains_nocase?: Maybe<Scalars['String']>
  aspectRatio_ends_with?: Maybe<Scalars['String']>
  aspectRatio_ends_with_nocase?: Maybe<Scalars['String']>
  aspectRatio_gt?: Maybe<Scalars['String']>
  aspectRatio_gte?: Maybe<Scalars['String']>
  aspectRatio_in?: Maybe<Array<Scalars['String']>>
  aspectRatio_lt?: Maybe<Scalars['String']>
  aspectRatio_lte?: Maybe<Scalars['String']>
  aspectRatio_not?: Maybe<Scalars['String']>
  aspectRatio_not_contains?: Maybe<Scalars['String']>
  aspectRatio_not_contains_nocase?: Maybe<Scalars['String']>
  aspectRatio_not_ends_with?: Maybe<Scalars['String']>
  aspectRatio_not_ends_with_nocase?: Maybe<Scalars['String']>
  aspectRatio_not_in?: Maybe<Array<Scalars['String']>>
  aspectRatio_not_starts_with?: Maybe<Scalars['String']>
  aspectRatio_not_starts_with_nocase?: Maybe<Scalars['String']>
  aspectRatio_starts_with?: Maybe<Scalars['String']>
  aspectRatio_starts_with_nocase?: Maybe<Scalars['String']>
  baseIpfsUri?: Maybe<Scalars['String']>
  baseIpfsUri_contains?: Maybe<Scalars['String']>
  baseIpfsUri_contains_nocase?: Maybe<Scalars['String']>
  baseIpfsUri_ends_with?: Maybe<Scalars['String']>
  baseIpfsUri_ends_with_nocase?: Maybe<Scalars['String']>
  baseIpfsUri_gt?: Maybe<Scalars['String']>
  baseIpfsUri_gte?: Maybe<Scalars['String']>
  baseIpfsUri_in?: Maybe<Array<Scalars['String']>>
  baseIpfsUri_lt?: Maybe<Scalars['String']>
  baseIpfsUri_lte?: Maybe<Scalars['String']>
  baseIpfsUri_not?: Maybe<Scalars['String']>
  baseIpfsUri_not_contains?: Maybe<Scalars['String']>
  baseIpfsUri_not_contains_nocase?: Maybe<Scalars['String']>
  baseIpfsUri_not_ends_with?: Maybe<Scalars['String']>
  baseIpfsUri_not_ends_with_nocase?: Maybe<Scalars['String']>
  baseIpfsUri_not_in?: Maybe<Array<Scalars['String']>>
  baseIpfsUri_not_starts_with?: Maybe<Scalars['String']>
  baseIpfsUri_not_starts_with_nocase?: Maybe<Scalars['String']>
  baseIpfsUri_starts_with?: Maybe<Scalars['String']>
  baseIpfsUri_starts_with_nocase?: Maybe<Scalars['String']>
  baseUri?: Maybe<Scalars['String']>
  baseUri_contains?: Maybe<Scalars['String']>
  baseUri_contains_nocase?: Maybe<Scalars['String']>
  baseUri_ends_with?: Maybe<Scalars['String']>
  baseUri_ends_with_nocase?: Maybe<Scalars['String']>
  baseUri_gt?: Maybe<Scalars['String']>
  baseUri_gte?: Maybe<Scalars['String']>
  baseUri_in?: Maybe<Array<Scalars['String']>>
  baseUri_lt?: Maybe<Scalars['String']>
  baseUri_lte?: Maybe<Scalars['String']>
  baseUri_not?: Maybe<Scalars['String']>
  baseUri_not_contains?: Maybe<Scalars['String']>
  baseUri_not_contains_nocase?: Maybe<Scalars['String']>
  baseUri_not_ends_with?: Maybe<Scalars['String']>
  baseUri_not_ends_with_nocase?: Maybe<Scalars['String']>
  baseUri_not_in?: Maybe<Array<Scalars['String']>>
  baseUri_not_starts_with?: Maybe<Scalars['String']>
  baseUri_not_starts_with_nocase?: Maybe<Scalars['String']>
  baseUri_starts_with?: Maybe<Scalars['String']>
  baseUri_starts_with_nocase?: Maybe<Scalars['String']>
  complete?: Maybe<Scalars['Boolean']>
  complete_in?: Maybe<Array<Scalars['Boolean']>>
  complete_not?: Maybe<Scalars['Boolean']>
  complete_not_in?: Maybe<Array<Scalars['Boolean']>>
  completedAt?: Maybe<Scalars['BigInt']>
  completedAt_gt?: Maybe<Scalars['BigInt']>
  completedAt_gte?: Maybe<Scalars['BigInt']>
  completedAt_in?: Maybe<Array<Scalars['BigInt']>>
  completedAt_lt?: Maybe<Scalars['BigInt']>
  completedAt_lte?: Maybe<Scalars['BigInt']>
  completedAt_not?: Maybe<Scalars['BigInt']>
  completedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  contract?: Maybe<Scalars['String']>
  contract_?: Maybe<Contract_Filter>
  contract_contains?: Maybe<Scalars['String']>
  contract_contains_nocase?: Maybe<Scalars['String']>
  contract_ends_with?: Maybe<Scalars['String']>
  contract_ends_with_nocase?: Maybe<Scalars['String']>
  contract_gt?: Maybe<Scalars['String']>
  contract_gte?: Maybe<Scalars['String']>
  contract_in?: Maybe<Array<Scalars['String']>>
  contract_lt?: Maybe<Scalars['String']>
  contract_lte?: Maybe<Scalars['String']>
  contract_not?: Maybe<Scalars['String']>
  contract_not_contains?: Maybe<Scalars['String']>
  contract_not_contains_nocase?: Maybe<Scalars['String']>
  contract_not_ends_with?: Maybe<Scalars['String']>
  contract_not_ends_with_nocase?: Maybe<Scalars['String']>
  contract_not_in?: Maybe<Array<Scalars['String']>>
  contract_not_starts_with?: Maybe<Scalars['String']>
  contract_not_starts_with_nocase?: Maybe<Scalars['String']>
  contract_starts_with?: Maybe<Scalars['String']>
  contract_starts_with_nocase?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['BigInt']>
  createdAt_gt?: Maybe<Scalars['BigInt']>
  createdAt_gte?: Maybe<Scalars['BigInt']>
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>
  createdAt_lt?: Maybe<Scalars['BigInt']>
  createdAt_lte?: Maybe<Scalars['BigInt']>
  createdAt_not?: Maybe<Scalars['BigInt']>
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  curationStatus?: Maybe<Scalars['String']>
  curationStatus_contains?: Maybe<Scalars['String']>
  curationStatus_contains_nocase?: Maybe<Scalars['String']>
  curationStatus_ends_with?: Maybe<Scalars['String']>
  curationStatus_ends_with_nocase?: Maybe<Scalars['String']>
  curationStatus_gt?: Maybe<Scalars['String']>
  curationStatus_gte?: Maybe<Scalars['String']>
  curationStatus_in?: Maybe<Array<Scalars['String']>>
  curationStatus_lt?: Maybe<Scalars['String']>
  curationStatus_lte?: Maybe<Scalars['String']>
  curationStatus_not?: Maybe<Scalars['String']>
  curationStatus_not_contains?: Maybe<Scalars['String']>
  curationStatus_not_contains_nocase?: Maybe<Scalars['String']>
  curationStatus_not_ends_with?: Maybe<Scalars['String']>
  curationStatus_not_ends_with_nocase?: Maybe<Scalars['String']>
  curationStatus_not_in?: Maybe<Array<Scalars['String']>>
  curationStatus_not_starts_with?: Maybe<Scalars['String']>
  curationStatus_not_starts_with_nocase?: Maybe<Scalars['String']>
  curationStatus_starts_with?: Maybe<Scalars['String']>
  curationStatus_starts_with_nocase?: Maybe<Scalars['String']>
  currencyAddress?: Maybe<Scalars['Bytes']>
  currencyAddress_contains?: Maybe<Scalars['Bytes']>
  currencyAddress_in?: Maybe<Array<Scalars['Bytes']>>
  currencyAddress_not?: Maybe<Scalars['Bytes']>
  currencyAddress_not_contains?: Maybe<Scalars['Bytes']>
  currencyAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  currencySymbol?: Maybe<Scalars['String']>
  currencySymbol_contains?: Maybe<Scalars['String']>
  currencySymbol_contains_nocase?: Maybe<Scalars['String']>
  currencySymbol_ends_with?: Maybe<Scalars['String']>
  currencySymbol_ends_with_nocase?: Maybe<Scalars['String']>
  currencySymbol_gt?: Maybe<Scalars['String']>
  currencySymbol_gte?: Maybe<Scalars['String']>
  currencySymbol_in?: Maybe<Array<Scalars['String']>>
  currencySymbol_lt?: Maybe<Scalars['String']>
  currencySymbol_lte?: Maybe<Scalars['String']>
  currencySymbol_not?: Maybe<Scalars['String']>
  currencySymbol_not_contains?: Maybe<Scalars['String']>
  currencySymbol_not_contains_nocase?: Maybe<Scalars['String']>
  currencySymbol_not_ends_with?: Maybe<Scalars['String']>
  currencySymbol_not_ends_with_nocase?: Maybe<Scalars['String']>
  currencySymbol_not_in?: Maybe<Array<Scalars['String']>>
  currencySymbol_not_starts_with?: Maybe<Scalars['String']>
  currencySymbol_not_starts_with_nocase?: Maybe<Scalars['String']>
  currencySymbol_starts_with?: Maybe<Scalars['String']>
  currencySymbol_starts_with_nocase?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  description_contains?: Maybe<Scalars['String']>
  description_contains_nocase?: Maybe<Scalars['String']>
  description_ends_with?: Maybe<Scalars['String']>
  description_ends_with_nocase?: Maybe<Scalars['String']>
  description_gt?: Maybe<Scalars['String']>
  description_gte?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Scalars['String']>>
  description_lt?: Maybe<Scalars['String']>
  description_lte?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  description_not_contains_nocase?: Maybe<Scalars['String']>
  description_not_ends_with?: Maybe<Scalars['String']>
  description_not_ends_with_nocase?: Maybe<Scalars['String']>
  description_not_in?: Maybe<Array<Scalars['String']>>
  description_not_starts_with?: Maybe<Scalars['String']>
  description_not_starts_with_nocase?: Maybe<Scalars['String']>
  description_starts_with?: Maybe<Scalars['String']>
  description_starts_with_nocase?: Maybe<Scalars['String']>
  dynamic?: Maybe<Scalars['Boolean']>
  dynamic_in?: Maybe<Array<Scalars['Boolean']>>
  dynamic_not?: Maybe<Scalars['Boolean']>
  dynamic_not_in?: Maybe<Array<Scalars['Boolean']>>
  externalAssetDependenciesLocked?: Maybe<Scalars['Boolean']>
  externalAssetDependenciesLocked_in?: Maybe<Array<Scalars['Boolean']>>
  externalAssetDependenciesLocked_not?: Maybe<Scalars['Boolean']>
  externalAssetDependenciesLocked_not_in?: Maybe<Array<Scalars['Boolean']>>
  externalAssetDependencies_?: Maybe<ProjectExternalAssetDependency_Filter>
  externalAssetDependencyCount?: Maybe<Scalars['BigInt']>
  externalAssetDependencyCount_gt?: Maybe<Scalars['BigInt']>
  externalAssetDependencyCount_gte?: Maybe<Scalars['BigInt']>
  externalAssetDependencyCount_in?: Maybe<Array<Scalars['BigInt']>>
  externalAssetDependencyCount_lt?: Maybe<Scalars['BigInt']>
  externalAssetDependencyCount_lte?: Maybe<Scalars['BigInt']>
  externalAssetDependencyCount_not?: Maybe<Scalars['BigInt']>
  externalAssetDependencyCount_not_in?: Maybe<Array<Scalars['BigInt']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  invocations?: Maybe<Scalars['BigInt']>
  invocations_gt?: Maybe<Scalars['BigInt']>
  invocations_gte?: Maybe<Scalars['BigInt']>
  invocations_in?: Maybe<Array<Scalars['BigInt']>>
  invocations_lt?: Maybe<Scalars['BigInt']>
  invocations_lte?: Maybe<Scalars['BigInt']>
  invocations_not?: Maybe<Scalars['BigInt']>
  invocations_not_in?: Maybe<Array<Scalars['BigInt']>>
  ipfsHash?: Maybe<Scalars['String']>
  ipfsHash_contains?: Maybe<Scalars['String']>
  ipfsHash_contains_nocase?: Maybe<Scalars['String']>
  ipfsHash_ends_with?: Maybe<Scalars['String']>
  ipfsHash_ends_with_nocase?: Maybe<Scalars['String']>
  ipfsHash_gt?: Maybe<Scalars['String']>
  ipfsHash_gte?: Maybe<Scalars['String']>
  ipfsHash_in?: Maybe<Array<Scalars['String']>>
  ipfsHash_lt?: Maybe<Scalars['String']>
  ipfsHash_lte?: Maybe<Scalars['String']>
  ipfsHash_not?: Maybe<Scalars['String']>
  ipfsHash_not_contains?: Maybe<Scalars['String']>
  ipfsHash_not_contains_nocase?: Maybe<Scalars['String']>
  ipfsHash_not_ends_with?: Maybe<Scalars['String']>
  ipfsHash_not_ends_with_nocase?: Maybe<Scalars['String']>
  ipfsHash_not_in?: Maybe<Array<Scalars['String']>>
  ipfsHash_not_starts_with?: Maybe<Scalars['String']>
  ipfsHash_not_starts_with_nocase?: Maybe<Scalars['String']>
  ipfsHash_starts_with?: Maybe<Scalars['String']>
  ipfsHash_starts_with_nocase?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  license_contains?: Maybe<Scalars['String']>
  license_contains_nocase?: Maybe<Scalars['String']>
  license_ends_with?: Maybe<Scalars['String']>
  license_ends_with_nocase?: Maybe<Scalars['String']>
  license_gt?: Maybe<Scalars['String']>
  license_gte?: Maybe<Scalars['String']>
  license_in?: Maybe<Array<Scalars['String']>>
  license_lt?: Maybe<Scalars['String']>
  license_lte?: Maybe<Scalars['String']>
  license_not?: Maybe<Scalars['String']>
  license_not_contains?: Maybe<Scalars['String']>
  license_not_contains_nocase?: Maybe<Scalars['String']>
  license_not_ends_with?: Maybe<Scalars['String']>
  license_not_ends_with_nocase?: Maybe<Scalars['String']>
  license_not_in?: Maybe<Array<Scalars['String']>>
  license_not_starts_with?: Maybe<Scalars['String']>
  license_not_starts_with_nocase?: Maybe<Scalars['String']>
  license_starts_with?: Maybe<Scalars['String']>
  license_starts_with_nocase?: Maybe<Scalars['String']>
  locked?: Maybe<Scalars['Boolean']>
  locked_in?: Maybe<Array<Scalars['Boolean']>>
  locked_not?: Maybe<Scalars['Boolean']>
  locked_not_in?: Maybe<Array<Scalars['Boolean']>>
  maxInvocations?: Maybe<Scalars['BigInt']>
  maxInvocations_gt?: Maybe<Scalars['BigInt']>
  maxInvocations_gte?: Maybe<Scalars['BigInt']>
  maxInvocations_in?: Maybe<Array<Scalars['BigInt']>>
  maxInvocations_lt?: Maybe<Scalars['BigInt']>
  maxInvocations_lte?: Maybe<Scalars['BigInt']>
  maxInvocations_not?: Maybe<Scalars['BigInt']>
  maxInvocations_not_in?: Maybe<Array<Scalars['BigInt']>>
  minterConfiguration?: Maybe<Scalars['String']>
  minterConfiguration_?: Maybe<ProjectMinterConfiguration_Filter>
  minterConfiguration_contains?: Maybe<Scalars['String']>
  minterConfiguration_contains_nocase?: Maybe<Scalars['String']>
  minterConfiguration_ends_with?: Maybe<Scalars['String']>
  minterConfiguration_ends_with_nocase?: Maybe<Scalars['String']>
  minterConfiguration_gt?: Maybe<Scalars['String']>
  minterConfiguration_gte?: Maybe<Scalars['String']>
  minterConfiguration_in?: Maybe<Array<Scalars['String']>>
  minterConfiguration_lt?: Maybe<Scalars['String']>
  minterConfiguration_lte?: Maybe<Scalars['String']>
  minterConfiguration_not?: Maybe<Scalars['String']>
  minterConfiguration_not_contains?: Maybe<Scalars['String']>
  minterConfiguration_not_contains_nocase?: Maybe<Scalars['String']>
  minterConfiguration_not_ends_with?: Maybe<Scalars['String']>
  minterConfiguration_not_ends_with_nocase?: Maybe<Scalars['String']>
  minterConfiguration_not_in?: Maybe<Array<Scalars['String']>>
  minterConfiguration_not_starts_with?: Maybe<Scalars['String']>
  minterConfiguration_not_starts_with_nocase?: Maybe<Scalars['String']>
  minterConfiguration_starts_with?: Maybe<Scalars['String']>
  minterConfiguration_starts_with_nocase?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  name_contains?: Maybe<Scalars['String']>
  name_contains_nocase?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_ends_with_nocase?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_lt?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_not_contains_nocase?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with_nocase?: Maybe<Scalars['String']>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with_nocase?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_starts_with_nocase?: Maybe<Scalars['String']>
  owners_?: Maybe<AccountProject_Filter>
  paused?: Maybe<Scalars['Boolean']>
  paused_in?: Maybe<Array<Scalars['Boolean']>>
  paused_not?: Maybe<Scalars['Boolean']>
  paused_not_in?: Maybe<Array<Scalars['Boolean']>>
  pricePerTokenInWei?: Maybe<Scalars['BigInt']>
  pricePerTokenInWei_gt?: Maybe<Scalars['BigInt']>
  pricePerTokenInWei_gte?: Maybe<Scalars['BigInt']>
  pricePerTokenInWei_in?: Maybe<Array<Scalars['BigInt']>>
  pricePerTokenInWei_lt?: Maybe<Scalars['BigInt']>
  pricePerTokenInWei_lte?: Maybe<Scalars['BigInt']>
  pricePerTokenInWei_not?: Maybe<Scalars['BigInt']>
  pricePerTokenInWei_not_in?: Maybe<Array<Scalars['BigInt']>>
  projectId?: Maybe<Scalars['BigInt']>
  projectId_gt?: Maybe<Scalars['BigInt']>
  projectId_gte?: Maybe<Scalars['BigInt']>
  projectId_in?: Maybe<Array<Scalars['BigInt']>>
  projectId_lt?: Maybe<Scalars['BigInt']>
  projectId_lte?: Maybe<Scalars['BigInt']>
  projectId_not?: Maybe<Scalars['BigInt']>
  projectId_not_in?: Maybe<Array<Scalars['BigInt']>>
  proposedArtistAddressesAndSplits?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_?: Maybe<ProposedArtistAddressesAndSplit_Filter>
  proposedArtistAddressesAndSplits_contains?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_contains_nocase?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_ends_with?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_ends_with_nocase?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_gt?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_gte?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_in?: Maybe<Array<Scalars['String']>>
  proposedArtistAddressesAndSplits_lt?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_lte?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_not?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_not_contains?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_not_contains_nocase?: Maybe<
    Scalars['String']
  >
  proposedArtistAddressesAndSplits_not_ends_with?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_not_ends_with_nocase?: Maybe<
    Scalars['String']
  >
  proposedArtistAddressesAndSplits_not_in?: Maybe<Array<Scalars['String']>>
  proposedArtistAddressesAndSplits_not_starts_with?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_not_starts_with_nocase?: Maybe<
    Scalars['String']
  >
  proposedArtistAddressesAndSplits_starts_with?: Maybe<Scalars['String']>
  proposedArtistAddressesAndSplits_starts_with_nocase?: Maybe<Scalars['String']>
  royaltyPercentage?: Maybe<Scalars['BigInt']>
  royaltyPercentage_gt?: Maybe<Scalars['BigInt']>
  royaltyPercentage_gte?: Maybe<Scalars['BigInt']>
  royaltyPercentage_in?: Maybe<Array<Scalars['BigInt']>>
  royaltyPercentage_lt?: Maybe<Scalars['BigInt']>
  royaltyPercentage_lte?: Maybe<Scalars['BigInt']>
  royaltyPercentage_not?: Maybe<Scalars['BigInt']>
  royaltyPercentage_not_in?: Maybe<Array<Scalars['BigInt']>>
  saleLookupTables_?: Maybe<SaleLookupTable_Filter>
  script?: Maybe<Scalars['String']>
  scriptCount?: Maybe<Scalars['BigInt']>
  scriptCount_gt?: Maybe<Scalars['BigInt']>
  scriptCount_gte?: Maybe<Scalars['BigInt']>
  scriptCount_in?: Maybe<Array<Scalars['BigInt']>>
  scriptCount_lt?: Maybe<Scalars['BigInt']>
  scriptCount_lte?: Maybe<Scalars['BigInt']>
  scriptCount_not?: Maybe<Scalars['BigInt']>
  scriptCount_not_in?: Maybe<Array<Scalars['BigInt']>>
  scriptJSON?: Maybe<Scalars['String']>
  scriptJSON_contains?: Maybe<Scalars['String']>
  scriptJSON_contains_nocase?: Maybe<Scalars['String']>
  scriptJSON_ends_with?: Maybe<Scalars['String']>
  scriptJSON_ends_with_nocase?: Maybe<Scalars['String']>
  scriptJSON_gt?: Maybe<Scalars['String']>
  scriptJSON_gte?: Maybe<Scalars['String']>
  scriptJSON_in?: Maybe<Array<Scalars['String']>>
  scriptJSON_lt?: Maybe<Scalars['String']>
  scriptJSON_lte?: Maybe<Scalars['String']>
  scriptJSON_not?: Maybe<Scalars['String']>
  scriptJSON_not_contains?: Maybe<Scalars['String']>
  scriptJSON_not_contains_nocase?: Maybe<Scalars['String']>
  scriptJSON_not_ends_with?: Maybe<Scalars['String']>
  scriptJSON_not_ends_with_nocase?: Maybe<Scalars['String']>
  scriptJSON_not_in?: Maybe<Array<Scalars['String']>>
  scriptJSON_not_starts_with?: Maybe<Scalars['String']>
  scriptJSON_not_starts_with_nocase?: Maybe<Scalars['String']>
  scriptJSON_starts_with?: Maybe<Scalars['String']>
  scriptJSON_starts_with_nocase?: Maybe<Scalars['String']>
  scriptTypeAndVersion?: Maybe<Scalars['String']>
  scriptTypeAndVersion_contains?: Maybe<Scalars['String']>
  scriptTypeAndVersion_contains_nocase?: Maybe<Scalars['String']>
  scriptTypeAndVersion_ends_with?: Maybe<Scalars['String']>
  scriptTypeAndVersion_ends_with_nocase?: Maybe<Scalars['String']>
  scriptTypeAndVersion_gt?: Maybe<Scalars['String']>
  scriptTypeAndVersion_gte?: Maybe<Scalars['String']>
  scriptTypeAndVersion_in?: Maybe<Array<Scalars['String']>>
  scriptTypeAndVersion_lt?: Maybe<Scalars['String']>
  scriptTypeAndVersion_lte?: Maybe<Scalars['String']>
  scriptTypeAndVersion_not?: Maybe<Scalars['String']>
  scriptTypeAndVersion_not_contains?: Maybe<Scalars['String']>
  scriptTypeAndVersion_not_contains_nocase?: Maybe<Scalars['String']>
  scriptTypeAndVersion_not_ends_with?: Maybe<Scalars['String']>
  scriptTypeAndVersion_not_ends_with_nocase?: Maybe<Scalars['String']>
  scriptTypeAndVersion_not_in?: Maybe<Array<Scalars['String']>>
  scriptTypeAndVersion_not_starts_with?: Maybe<Scalars['String']>
  scriptTypeAndVersion_not_starts_with_nocase?: Maybe<Scalars['String']>
  scriptTypeAndVersion_starts_with?: Maybe<Scalars['String']>
  scriptTypeAndVersion_starts_with_nocase?: Maybe<Scalars['String']>
  scriptUpdatedAt?: Maybe<Scalars['BigInt']>
  scriptUpdatedAt_gt?: Maybe<Scalars['BigInt']>
  scriptUpdatedAt_gte?: Maybe<Scalars['BigInt']>
  scriptUpdatedAt_in?: Maybe<Array<Scalars['BigInt']>>
  scriptUpdatedAt_lt?: Maybe<Scalars['BigInt']>
  scriptUpdatedAt_lte?: Maybe<Scalars['BigInt']>
  scriptUpdatedAt_not?: Maybe<Scalars['BigInt']>
  scriptUpdatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  script_contains?: Maybe<Scalars['String']>
  script_contains_nocase?: Maybe<Scalars['String']>
  script_ends_with?: Maybe<Scalars['String']>
  script_ends_with_nocase?: Maybe<Scalars['String']>
  script_gt?: Maybe<Scalars['String']>
  script_gte?: Maybe<Scalars['String']>
  script_in?: Maybe<Array<Scalars['String']>>
  script_lt?: Maybe<Scalars['String']>
  script_lte?: Maybe<Scalars['String']>
  script_not?: Maybe<Scalars['String']>
  script_not_contains?: Maybe<Scalars['String']>
  script_not_contains_nocase?: Maybe<Scalars['String']>
  script_not_ends_with?: Maybe<Scalars['String']>
  script_not_ends_with_nocase?: Maybe<Scalars['String']>
  script_not_in?: Maybe<Array<Scalars['String']>>
  script_not_starts_with?: Maybe<Scalars['String']>
  script_not_starts_with_nocase?: Maybe<Scalars['String']>
  script_starts_with?: Maybe<Scalars['String']>
  script_starts_with_nocase?: Maybe<Scalars['String']>
  scripts_?: Maybe<ProjectScript_Filter>
  tokens_?: Maybe<Token_Filter>
  updatedAt?: Maybe<Scalars['BigInt']>
  updatedAt_gt?: Maybe<Scalars['BigInt']>
  updatedAt_gte?: Maybe<Scalars['BigInt']>
  updatedAt_in?: Maybe<Array<Scalars['BigInt']>>
  updatedAt_lt?: Maybe<Scalars['BigInt']>
  updatedAt_lte?: Maybe<Scalars['BigInt']>
  updatedAt_not?: Maybe<Scalars['BigInt']>
  updatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  useHashString?: Maybe<Scalars['Boolean']>
  useHashString_in?: Maybe<Array<Scalars['Boolean']>>
  useHashString_not?: Maybe<Scalars['Boolean']>
  useHashString_not_in?: Maybe<Array<Scalars['Boolean']>>
  useIpfs?: Maybe<Scalars['Boolean']>
  useIpfs_in?: Maybe<Array<Scalars['Boolean']>>
  useIpfs_not?: Maybe<Scalars['Boolean']>
  useIpfs_not_in?: Maybe<Array<Scalars['Boolean']>>
  website?: Maybe<Scalars['String']>
  website_contains?: Maybe<Scalars['String']>
  website_contains_nocase?: Maybe<Scalars['String']>
  website_ends_with?: Maybe<Scalars['String']>
  website_ends_with_nocase?: Maybe<Scalars['String']>
  website_gt?: Maybe<Scalars['String']>
  website_gte?: Maybe<Scalars['String']>
  website_in?: Maybe<Array<Scalars['String']>>
  website_lt?: Maybe<Scalars['String']>
  website_lte?: Maybe<Scalars['String']>
  website_not?: Maybe<Scalars['String']>
  website_not_contains?: Maybe<Scalars['String']>
  website_not_contains_nocase?: Maybe<Scalars['String']>
  website_not_ends_with?: Maybe<Scalars['String']>
  website_not_ends_with_nocase?: Maybe<Scalars['String']>
  website_not_in?: Maybe<Array<Scalars['String']>>
  website_not_starts_with?: Maybe<Scalars['String']>
  website_not_starts_with_nocase?: Maybe<Scalars['String']>
  website_starts_with?: Maybe<Scalars['String']>
  website_starts_with_nocase?: Maybe<Scalars['String']>
}

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
  Website = 'website',
}

export type ProposedArtistAddressesAndSplit = {
  __typename?: 'ProposedArtistAddressesAndSplit'
  /** Proposed artist additional payee address for primary sales */
  additionalPayeePrimarySalesAddress: Scalars['Bytes']
  /** Proposed artist additional payee percentage for primary sales */
  additionalPayeePrimarySalesPercentage: Scalars['BigInt']
  /** Proposed artist additional payee address for secondary sales */
  additionalPayeeSecondarySalesAddress: Scalars['Bytes']
  /** Proposed artist additional payee percentage for secondary sales */
  additionalPayeeSecondarySalesPercentage: Scalars['BigInt']
  /** Proposed artist address */
  artistAddress: Scalars['Bytes']
  createdAt: Scalars['BigInt']
  /** Unique identifier made up of contract address and project id */
  id: Scalars['ID']
  /** Project associated with this proposed artist addresses and splits */
  project: Project
}

export type ProposedArtistAddressesAndSplit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  additionalPayeePrimarySalesAddress?: Maybe<Scalars['Bytes']>
  additionalPayeePrimarySalesAddress_contains?: Maybe<Scalars['Bytes']>
  additionalPayeePrimarySalesAddress_in?: Maybe<Array<Scalars['Bytes']>>
  additionalPayeePrimarySalesAddress_not?: Maybe<Scalars['Bytes']>
  additionalPayeePrimarySalesAddress_not_contains?: Maybe<Scalars['Bytes']>
  additionalPayeePrimarySalesAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  additionalPayeePrimarySalesPercentage?: Maybe<Scalars['BigInt']>
  additionalPayeePrimarySalesPercentage_gt?: Maybe<Scalars['BigInt']>
  additionalPayeePrimarySalesPercentage_gte?: Maybe<Scalars['BigInt']>
  additionalPayeePrimarySalesPercentage_in?: Maybe<Array<Scalars['BigInt']>>
  additionalPayeePrimarySalesPercentage_lt?: Maybe<Scalars['BigInt']>
  additionalPayeePrimarySalesPercentage_lte?: Maybe<Scalars['BigInt']>
  additionalPayeePrimarySalesPercentage_not?: Maybe<Scalars['BigInt']>
  additionalPayeePrimarySalesPercentage_not_in?: Maybe<Array<Scalars['BigInt']>>
  additionalPayeeSecondarySalesAddress?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_contains?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_in?: Maybe<Array<Scalars['Bytes']>>
  additionalPayeeSecondarySalesAddress_not?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_not_contains?: Maybe<Scalars['Bytes']>
  additionalPayeeSecondarySalesAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  additionalPayeeSecondarySalesPercentage?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_gt?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_gte?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_in?: Maybe<Array<Scalars['BigInt']>>
  additionalPayeeSecondarySalesPercentage_lt?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_lte?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_not?: Maybe<Scalars['BigInt']>
  additionalPayeeSecondarySalesPercentage_not_in?: Maybe<
    Array<Scalars['BigInt']>
  >
  artistAddress?: Maybe<Scalars['Bytes']>
  artistAddress_contains?: Maybe<Scalars['Bytes']>
  artistAddress_in?: Maybe<Array<Scalars['Bytes']>>
  artistAddress_not?: Maybe<Scalars['Bytes']>
  artistAddress_not_contains?: Maybe<Scalars['Bytes']>
  artistAddress_not_in?: Maybe<Array<Scalars['Bytes']>>
  createdAt?: Maybe<Scalars['BigInt']>
  createdAt_gt?: Maybe<Scalars['BigInt']>
  createdAt_gte?: Maybe<Scalars['BigInt']>
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>
  createdAt_lt?: Maybe<Scalars['BigInt']>
  createdAt_lte?: Maybe<Scalars['BigInt']>
  createdAt_not?: Maybe<Scalars['BigInt']>
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  project?: Maybe<Scalars['String']>
  project_?: Maybe<Project_Filter>
  project_contains?: Maybe<Scalars['String']>
  project_contains_nocase?: Maybe<Scalars['String']>
  project_ends_with?: Maybe<Scalars['String']>
  project_ends_with_nocase?: Maybe<Scalars['String']>
  project_gt?: Maybe<Scalars['String']>
  project_gte?: Maybe<Scalars['String']>
  project_in?: Maybe<Array<Scalars['String']>>
  project_lt?: Maybe<Scalars['String']>
  project_lte?: Maybe<Scalars['String']>
  project_not?: Maybe<Scalars['String']>
  project_not_contains?: Maybe<Scalars['String']>
  project_not_contains_nocase?: Maybe<Scalars['String']>
  project_not_ends_with?: Maybe<Scalars['String']>
  project_not_ends_with_nocase?: Maybe<Scalars['String']>
  project_not_in?: Maybe<Array<Scalars['String']>>
  project_not_starts_with?: Maybe<Scalars['String']>
  project_not_starts_with_nocase?: Maybe<Scalars['String']>
  project_starts_with?: Maybe<Scalars['String']>
  project_starts_with_nocase?: Maybe<Scalars['String']>
}

export enum ProposedArtistAddressesAndSplit_OrderBy {
  AdditionalPayeePrimarySalesAddress = 'additionalPayeePrimarySalesAddress',
  AdditionalPayeePrimarySalesPercentage = 'additionalPayeePrimarySalesPercentage',
  AdditionalPayeeSecondarySalesAddress = 'additionalPayeeSecondarySalesAddress',
  AdditionalPayeeSecondarySalesPercentage = 'additionalPayeeSecondarySalesPercentage',
  ArtistAddress = 'artistAddress',
  CreatedAt = 'createdAt',
  Id = 'id',
  Project = 'project',
}

export type Sale = {
  __typename?: 'Sale'
  /** The block number of the sale */
  blockNumber: Scalars['BigInt']
  /** The timestamp of the sale */
  blockTimestamp: Scalars['BigInt']
  /** The buyer address */
  buyer: Scalars['Bytes']
  /** The exchange used for this sale */
  exchange: Exchange
  /** The sale id formated: tokenId - token.nextSaleId (using first token sold for bundles) for Opensea V1/V2, orderHash from sale event for Looksrare and Seaport */
  id: Scalars['ID']
  /** Private sales are flagged by this boolean */
  isPrivate: Scalars['Boolean']
  /** List of Payment tokens involved in this sale */
  payments: Array<Payment>
  /** Lookup table to get the list of Tokens sold in this sale */
  saleLookupTables: Array<SaleLookupTable>
  /** The sale type (Single | Bundle) */
  saleType: SaleType
  /** The seller address */
  seller: Scalars['Bytes']
  /** A raw formated string of the token(s) sold (i.e TokenID1::TokenID2::TokenID3) */
  summaryTokensSold: Scalars['String']
  /** The hash of the transaction */
  txHash: Scalars['Bytes']
}

export type SalePaymentsArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Payment_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Payment_Filter>
}

export type SaleSaleLookupTablesArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SaleLookupTable_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<SaleLookupTable_Filter>
}

export type SaleLookupTable = {
  __typename?: 'SaleLookupTable'
  /** The block number of the sale */
  blockNumber: Scalars['BigInt']
  /** Set to `Project Id::Token Id::Sale Id */
  id: Scalars['ID']
  /** The associated project */
  project: Project
  /** The associated sale */
  sale: Sale
  /** Timestamp of the sale */
  timestamp: Scalars['BigInt']
  /** The token sold */
  token: Token
}

export type SaleLookupTable_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  blockNumber?: Maybe<Scalars['BigInt']>
  blockNumber_gt?: Maybe<Scalars['BigInt']>
  blockNumber_gte?: Maybe<Scalars['BigInt']>
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: Maybe<Scalars['BigInt']>
  blockNumber_lte?: Maybe<Scalars['BigInt']>
  blockNumber_not?: Maybe<Scalars['BigInt']>
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  project?: Maybe<Scalars['String']>
  project_?: Maybe<Project_Filter>
  project_contains?: Maybe<Scalars['String']>
  project_contains_nocase?: Maybe<Scalars['String']>
  project_ends_with?: Maybe<Scalars['String']>
  project_ends_with_nocase?: Maybe<Scalars['String']>
  project_gt?: Maybe<Scalars['String']>
  project_gte?: Maybe<Scalars['String']>
  project_in?: Maybe<Array<Scalars['String']>>
  project_lt?: Maybe<Scalars['String']>
  project_lte?: Maybe<Scalars['String']>
  project_not?: Maybe<Scalars['String']>
  project_not_contains?: Maybe<Scalars['String']>
  project_not_contains_nocase?: Maybe<Scalars['String']>
  project_not_ends_with?: Maybe<Scalars['String']>
  project_not_ends_with_nocase?: Maybe<Scalars['String']>
  project_not_in?: Maybe<Array<Scalars['String']>>
  project_not_starts_with?: Maybe<Scalars['String']>
  project_not_starts_with_nocase?: Maybe<Scalars['String']>
  project_starts_with?: Maybe<Scalars['String']>
  project_starts_with_nocase?: Maybe<Scalars['String']>
  sale?: Maybe<Scalars['String']>
  sale_?: Maybe<Sale_Filter>
  sale_contains?: Maybe<Scalars['String']>
  sale_contains_nocase?: Maybe<Scalars['String']>
  sale_ends_with?: Maybe<Scalars['String']>
  sale_ends_with_nocase?: Maybe<Scalars['String']>
  sale_gt?: Maybe<Scalars['String']>
  sale_gte?: Maybe<Scalars['String']>
  sale_in?: Maybe<Array<Scalars['String']>>
  sale_lt?: Maybe<Scalars['String']>
  sale_lte?: Maybe<Scalars['String']>
  sale_not?: Maybe<Scalars['String']>
  sale_not_contains?: Maybe<Scalars['String']>
  sale_not_contains_nocase?: Maybe<Scalars['String']>
  sale_not_ends_with?: Maybe<Scalars['String']>
  sale_not_ends_with_nocase?: Maybe<Scalars['String']>
  sale_not_in?: Maybe<Array<Scalars['String']>>
  sale_not_starts_with?: Maybe<Scalars['String']>
  sale_not_starts_with_nocase?: Maybe<Scalars['String']>
  sale_starts_with?: Maybe<Scalars['String']>
  sale_starts_with_nocase?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['BigInt']>
  timestamp_gt?: Maybe<Scalars['BigInt']>
  timestamp_gte?: Maybe<Scalars['BigInt']>
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>
  timestamp_lt?: Maybe<Scalars['BigInt']>
  timestamp_lte?: Maybe<Scalars['BigInt']>
  timestamp_not?: Maybe<Scalars['BigInt']>
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  token?: Maybe<Scalars['String']>
  token_?: Maybe<Token_Filter>
  token_contains?: Maybe<Scalars['String']>
  token_contains_nocase?: Maybe<Scalars['String']>
  token_ends_with?: Maybe<Scalars['String']>
  token_ends_with_nocase?: Maybe<Scalars['String']>
  token_gt?: Maybe<Scalars['String']>
  token_gte?: Maybe<Scalars['String']>
  token_in?: Maybe<Array<Scalars['String']>>
  token_lt?: Maybe<Scalars['String']>
  token_lte?: Maybe<Scalars['String']>
  token_not?: Maybe<Scalars['String']>
  token_not_contains?: Maybe<Scalars['String']>
  token_not_contains_nocase?: Maybe<Scalars['String']>
  token_not_ends_with?: Maybe<Scalars['String']>
  token_not_ends_with_nocase?: Maybe<Scalars['String']>
  token_not_in?: Maybe<Array<Scalars['String']>>
  token_not_starts_with?: Maybe<Scalars['String']>
  token_not_starts_with_nocase?: Maybe<Scalars['String']>
  token_starts_with?: Maybe<Scalars['String']>
  token_starts_with_nocase?: Maybe<Scalars['String']>
}

export enum SaleLookupTable_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  Project = 'project',
  Sale = 'sale',
  Timestamp = 'timestamp',
  Token = 'token',
}

export enum SaleType {
  Bundle = 'Bundle',
  Single = 'Single',
}

export type Sale_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  blockNumber?: Maybe<Scalars['BigInt']>
  blockNumber_gt?: Maybe<Scalars['BigInt']>
  blockNumber_gte?: Maybe<Scalars['BigInt']>
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: Maybe<Scalars['BigInt']>
  blockNumber_lte?: Maybe<Scalars['BigInt']>
  blockNumber_not?: Maybe<Scalars['BigInt']>
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp?: Maybe<Scalars['BigInt']>
  blockTimestamp_gt?: Maybe<Scalars['BigInt']>
  blockTimestamp_gte?: Maybe<Scalars['BigInt']>
  blockTimestamp_in?: Maybe<Array<Scalars['BigInt']>>
  blockTimestamp_lt?: Maybe<Scalars['BigInt']>
  blockTimestamp_lte?: Maybe<Scalars['BigInt']>
  blockTimestamp_not?: Maybe<Scalars['BigInt']>
  blockTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>
  buyer?: Maybe<Scalars['Bytes']>
  buyer_contains?: Maybe<Scalars['Bytes']>
  buyer_in?: Maybe<Array<Scalars['Bytes']>>
  buyer_not?: Maybe<Scalars['Bytes']>
  buyer_not_contains?: Maybe<Scalars['Bytes']>
  buyer_not_in?: Maybe<Array<Scalars['Bytes']>>
  exchange?: Maybe<Exchange>
  exchange_in?: Maybe<Array<Exchange>>
  exchange_not?: Maybe<Exchange>
  exchange_not_in?: Maybe<Array<Exchange>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  isPrivate?: Maybe<Scalars['Boolean']>
  isPrivate_in?: Maybe<Array<Scalars['Boolean']>>
  isPrivate_not?: Maybe<Scalars['Boolean']>
  isPrivate_not_in?: Maybe<Array<Scalars['Boolean']>>
  payments_?: Maybe<Payment_Filter>
  saleLookupTables_?: Maybe<SaleLookupTable_Filter>
  saleType?: Maybe<SaleType>
  saleType_in?: Maybe<Array<SaleType>>
  saleType_not?: Maybe<SaleType>
  saleType_not_in?: Maybe<Array<SaleType>>
  seller?: Maybe<Scalars['Bytes']>
  seller_contains?: Maybe<Scalars['Bytes']>
  seller_in?: Maybe<Array<Scalars['Bytes']>>
  seller_not?: Maybe<Scalars['Bytes']>
  seller_not_contains?: Maybe<Scalars['Bytes']>
  seller_not_in?: Maybe<Array<Scalars['Bytes']>>
  summaryTokensSold?: Maybe<Scalars['String']>
  summaryTokensSold_contains?: Maybe<Scalars['String']>
  summaryTokensSold_contains_nocase?: Maybe<Scalars['String']>
  summaryTokensSold_ends_with?: Maybe<Scalars['String']>
  summaryTokensSold_ends_with_nocase?: Maybe<Scalars['String']>
  summaryTokensSold_gt?: Maybe<Scalars['String']>
  summaryTokensSold_gte?: Maybe<Scalars['String']>
  summaryTokensSold_in?: Maybe<Array<Scalars['String']>>
  summaryTokensSold_lt?: Maybe<Scalars['String']>
  summaryTokensSold_lte?: Maybe<Scalars['String']>
  summaryTokensSold_not?: Maybe<Scalars['String']>
  summaryTokensSold_not_contains?: Maybe<Scalars['String']>
  summaryTokensSold_not_contains_nocase?: Maybe<Scalars['String']>
  summaryTokensSold_not_ends_with?: Maybe<Scalars['String']>
  summaryTokensSold_not_ends_with_nocase?: Maybe<Scalars['String']>
  summaryTokensSold_not_in?: Maybe<Array<Scalars['String']>>
  summaryTokensSold_not_starts_with?: Maybe<Scalars['String']>
  summaryTokensSold_not_starts_with_nocase?: Maybe<Scalars['String']>
  summaryTokensSold_starts_with?: Maybe<Scalars['String']>
  summaryTokensSold_starts_with_nocase?: Maybe<Scalars['String']>
  txHash?: Maybe<Scalars['Bytes']>
  txHash_contains?: Maybe<Scalars['Bytes']>
  txHash_in?: Maybe<Array<Scalars['Bytes']>>
  txHash_not?: Maybe<Scalars['Bytes']>
  txHash_not_contains?: Maybe<Scalars['Bytes']>
  txHash_not_in?: Maybe<Array<Scalars['Bytes']>>
}

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
  TxHash = 'txHash',
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>
  _gt?: Maybe<Scalars['String']>
  _gte?: Maybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>
  _is_null?: Maybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>
  _lt?: Maybe<Scalars['String']>
  _lte?: Maybe<Scalars['String']>
  _neq?: Maybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>
  _nin?: Maybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>
}

export type Token = {
  __typename?: 'Token'
  /** Contract the token is on */
  contract: Contract
  createdAt: Scalars['BigInt']
  /** Unique string used as input to the tokens project script */
  hash: Scalars['Bytes']
  /** Unique identifier made up of contract address and token id */
  id: Scalars['ID']
  /** Invocation number of the project */
  invocation: Scalars['BigInt']
  /** Next available sale id */
  nextSaleId: Scalars['BigInt']
  /** Current owner of the token */
  owner: Account
  /** Project of the token */
  project: Project
  /** Lookup table to get the Sale history */
  saleLookupTables: Array<SaleLookupTable>
  /** ID of the token on the contract */
  tokenId: Scalars['BigInt']
  /** Transaction hash of token mint */
  transactionHash: Scalars['Bytes']
  transfers?: Maybe<Array<Transfer>>
  updatedAt: Scalars['BigInt']
  uri?: Maybe<Scalars['String']>
}

export type TokenSaleLookupTablesArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SaleLookupTable_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<SaleLookupTable_Filter>
}

export type TokenTransfersArgs = {
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Transfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  where?: Maybe<Transfer_Filter>
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  contract?: Maybe<Scalars['String']>
  contract_?: Maybe<Contract_Filter>
  contract_contains?: Maybe<Scalars['String']>
  contract_contains_nocase?: Maybe<Scalars['String']>
  contract_ends_with?: Maybe<Scalars['String']>
  contract_ends_with_nocase?: Maybe<Scalars['String']>
  contract_gt?: Maybe<Scalars['String']>
  contract_gte?: Maybe<Scalars['String']>
  contract_in?: Maybe<Array<Scalars['String']>>
  contract_lt?: Maybe<Scalars['String']>
  contract_lte?: Maybe<Scalars['String']>
  contract_not?: Maybe<Scalars['String']>
  contract_not_contains?: Maybe<Scalars['String']>
  contract_not_contains_nocase?: Maybe<Scalars['String']>
  contract_not_ends_with?: Maybe<Scalars['String']>
  contract_not_ends_with_nocase?: Maybe<Scalars['String']>
  contract_not_in?: Maybe<Array<Scalars['String']>>
  contract_not_starts_with?: Maybe<Scalars['String']>
  contract_not_starts_with_nocase?: Maybe<Scalars['String']>
  contract_starts_with?: Maybe<Scalars['String']>
  contract_starts_with_nocase?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['BigInt']>
  createdAt_gt?: Maybe<Scalars['BigInt']>
  createdAt_gte?: Maybe<Scalars['BigInt']>
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>
  createdAt_lt?: Maybe<Scalars['BigInt']>
  createdAt_lte?: Maybe<Scalars['BigInt']>
  createdAt_not?: Maybe<Scalars['BigInt']>
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  hash?: Maybe<Scalars['Bytes']>
  hash_contains?: Maybe<Scalars['Bytes']>
  hash_in?: Maybe<Array<Scalars['Bytes']>>
  hash_not?: Maybe<Scalars['Bytes']>
  hash_not_contains?: Maybe<Scalars['Bytes']>
  hash_not_in?: Maybe<Array<Scalars['Bytes']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  invocation?: Maybe<Scalars['BigInt']>
  invocation_gt?: Maybe<Scalars['BigInt']>
  invocation_gte?: Maybe<Scalars['BigInt']>
  invocation_in?: Maybe<Array<Scalars['BigInt']>>
  invocation_lt?: Maybe<Scalars['BigInt']>
  invocation_lte?: Maybe<Scalars['BigInt']>
  invocation_not?: Maybe<Scalars['BigInt']>
  invocation_not_in?: Maybe<Array<Scalars['BigInt']>>
  nextSaleId?: Maybe<Scalars['BigInt']>
  nextSaleId_gt?: Maybe<Scalars['BigInt']>
  nextSaleId_gte?: Maybe<Scalars['BigInt']>
  nextSaleId_in?: Maybe<Array<Scalars['BigInt']>>
  nextSaleId_lt?: Maybe<Scalars['BigInt']>
  nextSaleId_lte?: Maybe<Scalars['BigInt']>
  nextSaleId_not?: Maybe<Scalars['BigInt']>
  nextSaleId_not_in?: Maybe<Array<Scalars['BigInt']>>
  owner?: Maybe<Scalars['String']>
  owner_?: Maybe<Account_Filter>
  owner_contains?: Maybe<Scalars['String']>
  owner_contains_nocase?: Maybe<Scalars['String']>
  owner_ends_with?: Maybe<Scalars['String']>
  owner_ends_with_nocase?: Maybe<Scalars['String']>
  owner_gt?: Maybe<Scalars['String']>
  owner_gte?: Maybe<Scalars['String']>
  owner_in?: Maybe<Array<Scalars['String']>>
  owner_lt?: Maybe<Scalars['String']>
  owner_lte?: Maybe<Scalars['String']>
  owner_not?: Maybe<Scalars['String']>
  owner_not_contains?: Maybe<Scalars['String']>
  owner_not_contains_nocase?: Maybe<Scalars['String']>
  owner_not_ends_with?: Maybe<Scalars['String']>
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>
  owner_not_in?: Maybe<Array<Scalars['String']>>
  owner_not_starts_with?: Maybe<Scalars['String']>
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>
  owner_starts_with?: Maybe<Scalars['String']>
  owner_starts_with_nocase?: Maybe<Scalars['String']>
  project?: Maybe<Scalars['String']>
  project_?: Maybe<Project_Filter>
  project_contains?: Maybe<Scalars['String']>
  project_contains_nocase?: Maybe<Scalars['String']>
  project_ends_with?: Maybe<Scalars['String']>
  project_ends_with_nocase?: Maybe<Scalars['String']>
  project_gt?: Maybe<Scalars['String']>
  project_gte?: Maybe<Scalars['String']>
  project_in?: Maybe<Array<Scalars['String']>>
  project_lt?: Maybe<Scalars['String']>
  project_lte?: Maybe<Scalars['String']>
  project_not?: Maybe<Scalars['String']>
  project_not_contains?: Maybe<Scalars['String']>
  project_not_contains_nocase?: Maybe<Scalars['String']>
  project_not_ends_with?: Maybe<Scalars['String']>
  project_not_ends_with_nocase?: Maybe<Scalars['String']>
  project_not_in?: Maybe<Array<Scalars['String']>>
  project_not_starts_with?: Maybe<Scalars['String']>
  project_not_starts_with_nocase?: Maybe<Scalars['String']>
  project_starts_with?: Maybe<Scalars['String']>
  project_starts_with_nocase?: Maybe<Scalars['String']>
  saleLookupTables_?: Maybe<SaleLookupTable_Filter>
  tokenId?: Maybe<Scalars['BigInt']>
  tokenId_gt?: Maybe<Scalars['BigInt']>
  tokenId_gte?: Maybe<Scalars['BigInt']>
  tokenId_in?: Maybe<Array<Scalars['BigInt']>>
  tokenId_lt?: Maybe<Scalars['BigInt']>
  tokenId_lte?: Maybe<Scalars['BigInt']>
  tokenId_not?: Maybe<Scalars['BigInt']>
  tokenId_not_in?: Maybe<Array<Scalars['BigInt']>>
  transactionHash?: Maybe<Scalars['Bytes']>
  transactionHash_contains?: Maybe<Scalars['Bytes']>
  transactionHash_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_not?: Maybe<Scalars['Bytes']>
  transactionHash_not_contains?: Maybe<Scalars['Bytes']>
  transactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>
  transfers_?: Maybe<Transfer_Filter>
  updatedAt?: Maybe<Scalars['BigInt']>
  updatedAt_gt?: Maybe<Scalars['BigInt']>
  updatedAt_gte?: Maybe<Scalars['BigInt']>
  updatedAt_in?: Maybe<Array<Scalars['BigInt']>>
  updatedAt_lt?: Maybe<Scalars['BigInt']>
  updatedAt_lte?: Maybe<Scalars['BigInt']>
  updatedAt_not?: Maybe<Scalars['BigInt']>
  updatedAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  uri?: Maybe<Scalars['String']>
  uri_contains?: Maybe<Scalars['String']>
  uri_contains_nocase?: Maybe<Scalars['String']>
  uri_ends_with?: Maybe<Scalars['String']>
  uri_ends_with_nocase?: Maybe<Scalars['String']>
  uri_gt?: Maybe<Scalars['String']>
  uri_gte?: Maybe<Scalars['String']>
  uri_in?: Maybe<Array<Scalars['String']>>
  uri_lt?: Maybe<Scalars['String']>
  uri_lte?: Maybe<Scalars['String']>
  uri_not?: Maybe<Scalars['String']>
  uri_not_contains?: Maybe<Scalars['String']>
  uri_not_contains_nocase?: Maybe<Scalars['String']>
  uri_not_ends_with?: Maybe<Scalars['String']>
  uri_not_ends_with_nocase?: Maybe<Scalars['String']>
  uri_not_in?: Maybe<Array<Scalars['String']>>
  uri_not_starts_with?: Maybe<Scalars['String']>
  uri_not_starts_with_nocase?: Maybe<Scalars['String']>
  uri_starts_with?: Maybe<Scalars['String']>
  uri_starts_with_nocase?: Maybe<Scalars['String']>
}

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
  Uri = 'uri',
}

export type Transfer = {
  __typename?: 'Transfer'
  createdAt: Scalars['BigInt']
  from: Scalars['Bytes']
  id: Scalars['ID']
  to: Scalars['Bytes']
  token: Token
  transactionHash: Scalars['Bytes']
}

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  createdAt?: Maybe<Scalars['BigInt']>
  createdAt_gt?: Maybe<Scalars['BigInt']>
  createdAt_gte?: Maybe<Scalars['BigInt']>
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>
  createdAt_lt?: Maybe<Scalars['BigInt']>
  createdAt_lte?: Maybe<Scalars['BigInt']>
  createdAt_not?: Maybe<Scalars['BigInt']>
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>
  from?: Maybe<Scalars['Bytes']>
  from_contains?: Maybe<Scalars['Bytes']>
  from_in?: Maybe<Array<Scalars['Bytes']>>
  from_not?: Maybe<Scalars['Bytes']>
  from_not_contains?: Maybe<Scalars['Bytes']>
  from_not_in?: Maybe<Array<Scalars['Bytes']>>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  to?: Maybe<Scalars['Bytes']>
  to_contains?: Maybe<Scalars['Bytes']>
  to_in?: Maybe<Array<Scalars['Bytes']>>
  to_not?: Maybe<Scalars['Bytes']>
  to_not_contains?: Maybe<Scalars['Bytes']>
  to_not_in?: Maybe<Array<Scalars['Bytes']>>
  token?: Maybe<Scalars['String']>
  token_?: Maybe<Token_Filter>
  token_contains?: Maybe<Scalars['String']>
  token_contains_nocase?: Maybe<Scalars['String']>
  token_ends_with?: Maybe<Scalars['String']>
  token_ends_with_nocase?: Maybe<Scalars['String']>
  token_gt?: Maybe<Scalars['String']>
  token_gte?: Maybe<Scalars['String']>
  token_in?: Maybe<Array<Scalars['String']>>
  token_lt?: Maybe<Scalars['String']>
  token_lte?: Maybe<Scalars['String']>
  token_not?: Maybe<Scalars['String']>
  token_not_contains?: Maybe<Scalars['String']>
  token_not_contains_nocase?: Maybe<Scalars['String']>
  token_not_ends_with?: Maybe<Scalars['String']>
  token_not_ends_with_nocase?: Maybe<Scalars['String']>
  token_not_in?: Maybe<Array<Scalars['String']>>
  token_not_starts_with?: Maybe<Scalars['String']>
  token_not_starts_with_nocase?: Maybe<Scalars['String']>
  token_starts_with?: Maybe<Scalars['String']>
  token_starts_with_nocase?: Maybe<Scalars['String']>
  transactionHash?: Maybe<Scalars['Bytes']>
  transactionHash_contains?: Maybe<Scalars['Bytes']>
  transactionHash_in?: Maybe<Array<Scalars['Bytes']>>
  transactionHash_not?: Maybe<Scalars['Bytes']>
  transactionHash_not_contains?: Maybe<Scalars['Bytes']>
  transactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>
}

export enum Transfer_OrderBy {
  CreatedAt = 'createdAt',
  From = 'from',
  Id = 'id',
  To = 'to',
  Token = 'token',
  TransactionHash = 'transactionHash',
}

export type UpdateFeaturesScriptOutput = {
  __typename?: 'UpdateFeaturesScriptOutput'
  project_id: Scalars['String']
}

export type UpdateProjectMediaScriptOutput = {
  __typename?: 'UpdateProjectMediaScriptOutput'
  project_id: Scalars['String']
}

export type UpdateTokenMediaScriptOutput = {
  __typename?: 'UpdateTokenMediaScriptOutput'
  token_ids: Array<Maybe<Scalars['String']>>
}

export type Whitelisting = {
  __typename?: 'Whitelisting'
  account: Account
  contract: Contract
  id: Scalars['ID']
}

export type Whitelisting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>
  account?: Maybe<Scalars['String']>
  account_?: Maybe<Account_Filter>
  account_contains?: Maybe<Scalars['String']>
  account_contains_nocase?: Maybe<Scalars['String']>
  account_ends_with?: Maybe<Scalars['String']>
  account_ends_with_nocase?: Maybe<Scalars['String']>
  account_gt?: Maybe<Scalars['String']>
  account_gte?: Maybe<Scalars['String']>
  account_in?: Maybe<Array<Scalars['String']>>
  account_lt?: Maybe<Scalars['String']>
  account_lte?: Maybe<Scalars['String']>
  account_not?: Maybe<Scalars['String']>
  account_not_contains?: Maybe<Scalars['String']>
  account_not_contains_nocase?: Maybe<Scalars['String']>
  account_not_ends_with?: Maybe<Scalars['String']>
  account_not_ends_with_nocase?: Maybe<Scalars['String']>
  account_not_in?: Maybe<Array<Scalars['String']>>
  account_not_starts_with?: Maybe<Scalars['String']>
  account_not_starts_with_nocase?: Maybe<Scalars['String']>
  account_starts_with?: Maybe<Scalars['String']>
  account_starts_with_nocase?: Maybe<Scalars['String']>
  contract?: Maybe<Scalars['String']>
  contract_?: Maybe<Contract_Filter>
  contract_contains?: Maybe<Scalars['String']>
  contract_contains_nocase?: Maybe<Scalars['String']>
  contract_ends_with?: Maybe<Scalars['String']>
  contract_ends_with_nocase?: Maybe<Scalars['String']>
  contract_gt?: Maybe<Scalars['String']>
  contract_gte?: Maybe<Scalars['String']>
  contract_in?: Maybe<Array<Scalars['String']>>
  contract_lt?: Maybe<Scalars['String']>
  contract_lte?: Maybe<Scalars['String']>
  contract_not?: Maybe<Scalars['String']>
  contract_not_contains?: Maybe<Scalars['String']>
  contract_not_contains_nocase?: Maybe<Scalars['String']>
  contract_not_ends_with?: Maybe<Scalars['String']>
  contract_not_ends_with_nocase?: Maybe<Scalars['String']>
  contract_not_in?: Maybe<Array<Scalars['String']>>
  contract_not_starts_with?: Maybe<Scalars['String']>
  contract_not_starts_with_nocase?: Maybe<Scalars['String']>
  contract_starts_with?: Maybe<Scalars['String']>
  contract_starts_with_nocase?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_not_in?: Maybe<Array<Scalars['ID']>>
}

export enum Whitelisting_OrderBy {
  Account = 'account',
  Contract = 'contract',
  Id = 'id',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>
  _gt?: Maybe<Scalars['bigint']>
  _gte?: Maybe<Scalars['bigint']>
  _in?: Maybe<Array<Scalars['bigint']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['bigint']>
  _lte?: Maybe<Scalars['bigint']>
  _neq?: Maybe<Scalars['bigint']>
  _nin?: Maybe<Array<Scalars['bigint']>>
}

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories'
  name: Scalars['String']
  /** An object relationship */
  project_vertical_category?: Maybe<Project_Vertical_Categories>
}

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  __typename?: 'categories_aggregate'
  aggregate?: Maybe<Categories_Aggregate_Fields>
  nodes: Array<Categories>
}

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  __typename?: 'categories_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Categories_Max_Fields>
  min?: Maybe<Categories_Min_Fields>
}

/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Categories_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: Maybe<Array<Categories_Bool_Exp>>
  _not?: Maybe<Categories_Bool_Exp>
  _or?: Maybe<Array<Categories_Bool_Exp>>
  name?: Maybe<String_Comparison_Exp>
  project_vertical_category?: Maybe<Project_Vertical_Categories_Bool_Exp>
}

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint on columns "name" */
  CategoriesPkey = 'categories_pkey',
}

export enum Categories_Enum {
  Collaborations = 'collaborations',
  Collections = 'collections',
  Engine = 'engine',
  Explorations = 'explorations',
  Unassigned = 'unassigned',
}

/** Boolean expression to compare columns of type "categories_enum". All fields are combined with logical 'AND'. */
export type Categories_Enum_Comparison_Exp = {
  _eq?: Maybe<Categories_Enum>
  _in?: Maybe<Array<Categories_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Categories_Enum>
  _nin?: Maybe<Array<Categories_Enum>>
}

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  name?: Maybe<Scalars['String']>
  project_vertical_category?: Maybe<Project_Vertical_Categories_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields'
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields'
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  __typename?: 'categories_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Categories>
}

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Categories_On_Conflict>
}

/** on_conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint
  update_columns?: Array<Categories_Update_Column>
  where?: Maybe<Categories_Bool_Exp>
}

/** Ordering options when selecting data from "categories". */
export type Categories_Order_By = {
  name?: Maybe<Order_By>
  project_vertical_category?: Maybe<Project_Vertical_Categories_Order_By>
}

/** primary key columns input for table: categories */
export type Categories_Pk_Columns_Input = {
  name: Scalars['String']
}

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  name?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "categories" */
export type Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Categories_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Categories_Stream_Cursor_Value_Input = {
  name?: Maybe<Scalars['String']>
}

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  Name = 'name',
}

export type Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Categories_Set_Input>
  where: Categories_Bool_Exp
}

/** columns and relationships of "contract_allowlistings" */
export type Contract_Allowlistings = {
  __typename?: 'contract_allowlistings'
  /** An object relationship */
  contract?: Maybe<Contracts_Metadata>
  contract_address: Scalars['String']
  /** An object relationship */
  user?: Maybe<Users>
  user_address: Scalars['String']
}

/** aggregated selection of "contract_allowlistings" */
export type Contract_Allowlistings_Aggregate = {
  __typename?: 'contract_allowlistings_aggregate'
  aggregate?: Maybe<Contract_Allowlistings_Aggregate_Fields>
  nodes: Array<Contract_Allowlistings>
}

/** aggregate fields of "contract_allowlistings" */
export type Contract_Allowlistings_Aggregate_Fields = {
  __typename?: 'contract_allowlistings_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Contract_Allowlistings_Max_Fields>
  min?: Maybe<Contract_Allowlistings_Min_Fields>
}

/** aggregate fields of "contract_allowlistings" */
export type Contract_Allowlistings_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "contract_allowlistings" */
export type Contract_Allowlistings_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Contract_Allowlistings_Max_Order_By>
  min?: Maybe<Contract_Allowlistings_Min_Order_By>
}

/** input type for inserting array relation for remote table "contract_allowlistings" */
export type Contract_Allowlistings_Arr_Rel_Insert_Input = {
  data: Array<Contract_Allowlistings_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Contract_Allowlistings_On_Conflict>
}

/** Boolean expression to filter rows from the table "contract_allowlistings". All fields are combined with a logical 'AND'. */
export type Contract_Allowlistings_Bool_Exp = {
  _and?: Maybe<Array<Contract_Allowlistings_Bool_Exp>>
  _not?: Maybe<Contract_Allowlistings_Bool_Exp>
  _or?: Maybe<Array<Contract_Allowlistings_Bool_Exp>>
  contract?: Maybe<Contracts_Metadata_Bool_Exp>
  contract_address?: Maybe<String_Comparison_Exp>
  user?: Maybe<Users_Bool_Exp>
  user_address?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "contract_allowlistings" */
export enum Contract_Allowlistings_Constraint {
  /** unique or primary key constraint on columns "user_address", "contract_address" */
  ContractAllowlistingsPkey = 'contract_allowlistings_pkey',
  /** unique or primary key constraint on columns "user_address", "contract_address" */
  ContractAllowlistingsUserAddressContractAddressKey = 'contract_allowlistings_user_address_contract_address_key',
}

/** input type for inserting data into table "contract_allowlistings" */
export type Contract_Allowlistings_Insert_Input = {
  contract?: Maybe<Contracts_Metadata_Obj_Rel_Insert_Input>
  contract_address?: Maybe<Scalars['String']>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  user_address?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Contract_Allowlistings_Max_Fields = {
  __typename?: 'contract_allowlistings_max_fields'
  contract_address?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "contract_allowlistings" */
export type Contract_Allowlistings_Max_Order_By = {
  contract_address?: Maybe<Order_By>
  user_address?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Contract_Allowlistings_Min_Fields = {
  __typename?: 'contract_allowlistings_min_fields'
  contract_address?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "contract_allowlistings" */
export type Contract_Allowlistings_Min_Order_By = {
  contract_address?: Maybe<Order_By>
  user_address?: Maybe<Order_By>
}

/** response of any mutation on the table "contract_allowlistings" */
export type Contract_Allowlistings_Mutation_Response = {
  __typename?: 'contract_allowlistings_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Contract_Allowlistings>
}

/** on_conflict condition type for table "contract_allowlistings" */
export type Contract_Allowlistings_On_Conflict = {
  constraint: Contract_Allowlistings_Constraint
  update_columns?: Array<Contract_Allowlistings_Update_Column>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

/** Ordering options when selecting data from "contract_allowlistings". */
export type Contract_Allowlistings_Order_By = {
  contract?: Maybe<Contracts_Metadata_Order_By>
  contract_address?: Maybe<Order_By>
  user?: Maybe<Users_Order_By>
  user_address?: Maybe<Order_By>
}

/** primary key columns input for table: contract_allowlistings */
export type Contract_Allowlistings_Pk_Columns_Input = {
  contract_address: Scalars['String']
  user_address: Scalars['String']
}

/** select columns of table "contract_allowlistings" */
export enum Contract_Allowlistings_Select_Column {
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  UserAddress = 'user_address',
}

/** input type for updating data in table "contract_allowlistings" */
export type Contract_Allowlistings_Set_Input = {
  contract_address?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "contract_allowlistings" */
export type Contract_Allowlistings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contract_Allowlistings_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Contract_Allowlistings_Stream_Cursor_Value_Input = {
  contract_address?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** update columns of table "contract_allowlistings" */
export enum Contract_Allowlistings_Update_Column {
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  UserAddress = 'user_address',
}

export type Contract_Allowlistings_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Contract_Allowlistings_Set_Input>
  where: Contract_Allowlistings_Bool_Exp
}

/** columns and relationships of "contract_type_names" */
export type Contract_Type_Names = {
  __typename?: 'contract_type_names'
  name: Scalars['String']
}

/** aggregated selection of "contract_type_names" */
export type Contract_Type_Names_Aggregate = {
  __typename?: 'contract_type_names_aggregate'
  aggregate?: Maybe<Contract_Type_Names_Aggregate_Fields>
  nodes: Array<Contract_Type_Names>
}

/** aggregate fields of "contract_type_names" */
export type Contract_Type_Names_Aggregate_Fields = {
  __typename?: 'contract_type_names_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Contract_Type_Names_Max_Fields>
  min?: Maybe<Contract_Type_Names_Min_Fields>
}

/** aggregate fields of "contract_type_names" */
export type Contract_Type_Names_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Contract_Type_Names_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "contract_type_names". All fields are combined with a logical 'AND'. */
export type Contract_Type_Names_Bool_Exp = {
  _and?: Maybe<Array<Contract_Type_Names_Bool_Exp>>
  _not?: Maybe<Contract_Type_Names_Bool_Exp>
  _or?: Maybe<Array<Contract_Type_Names_Bool_Exp>>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "contract_type_names" */
export enum Contract_Type_Names_Constraint {
  /** unique or primary key constraint on columns "name" */
  ContractTypeNamesPkey = 'contract_type_names_pkey',
}

export enum Contract_Type_Names_Enum {
  GenArt721CoreV0 = 'GenArt721CoreV0',
  GenArt721CoreV1 = 'GenArt721CoreV1',
  GenArt721CoreV2EngineFlex = 'GenArt721CoreV2_ENGINE_FLEX',
  GenArt721CoreV2Pbab = 'GenArt721CoreV2_PBAB',
  GenArt721CoreV3 = 'GenArt721CoreV3',
}

/** Boolean expression to compare columns of type "contract_type_names_enum". All fields are combined with logical 'AND'. */
export type Contract_Type_Names_Enum_Comparison_Exp = {
  _eq?: Maybe<Contract_Type_Names_Enum>
  _in?: Maybe<Array<Contract_Type_Names_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Contract_Type_Names_Enum>
  _nin?: Maybe<Array<Contract_Type_Names_Enum>>
}

/** input type for inserting data into table "contract_type_names" */
export type Contract_Type_Names_Insert_Input = {
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Contract_Type_Names_Max_Fields = {
  __typename?: 'contract_type_names_max_fields'
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Contract_Type_Names_Min_Fields = {
  __typename?: 'contract_type_names_min_fields'
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "contract_type_names" */
export type Contract_Type_Names_Mutation_Response = {
  __typename?: 'contract_type_names_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Contract_Type_Names>
}

/** on_conflict condition type for table "contract_type_names" */
export type Contract_Type_Names_On_Conflict = {
  constraint: Contract_Type_Names_Constraint
  update_columns?: Array<Contract_Type_Names_Update_Column>
  where?: Maybe<Contract_Type_Names_Bool_Exp>
}

/** Ordering options when selecting data from "contract_type_names". */
export type Contract_Type_Names_Order_By = {
  name?: Maybe<Order_By>
}

/** primary key columns input for table: contract_type_names */
export type Contract_Type_Names_Pk_Columns_Input = {
  name: Scalars['String']
}

/** select columns of table "contract_type_names" */
export enum Contract_Type_Names_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "contract_type_names" */
export type Contract_Type_Names_Set_Input = {
  name?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "contract_type_names" */
export type Contract_Type_Names_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contract_Type_Names_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Contract_Type_Names_Stream_Cursor_Value_Input = {
  name?: Maybe<Scalars['String']>
}

/** update columns of table "contract_type_names" */
export enum Contract_Type_Names_Update_Column {
  /** column name */
  Name = 'name',
}

export type Contract_Type_Names_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Contract_Type_Names_Set_Input>
  where: Contract_Type_Names_Bool_Exp
}

/** columns and relationships of "contract_types" */
export type Contract_Types = {
  __typename?: 'contract_types'
  abi?: Maybe<Scalars['jsonb']>
  type: Contract_Type_Names_Enum
}

/** columns and relationships of "contract_types" */
export type Contract_TypesAbiArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "contract_types" */
export type Contract_Types_Aggregate = {
  __typename?: 'contract_types_aggregate'
  aggregate?: Maybe<Contract_Types_Aggregate_Fields>
  nodes: Array<Contract_Types>
}

/** aggregate fields of "contract_types" */
export type Contract_Types_Aggregate_Fields = {
  __typename?: 'contract_types_aggregate_fields'
  count: Scalars['Int']
}

/** aggregate fields of "contract_types" */
export type Contract_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Contract_Types_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Contract_Types_Append_Input = {
  abi?: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "contract_types". All fields are combined with a logical 'AND'. */
export type Contract_Types_Bool_Exp = {
  _and?: Maybe<Array<Contract_Types_Bool_Exp>>
  _not?: Maybe<Contract_Types_Bool_Exp>
  _or?: Maybe<Array<Contract_Types_Bool_Exp>>
  abi?: Maybe<Jsonb_Comparison_Exp>
  type?: Maybe<Contract_Type_Names_Enum_Comparison_Exp>
}

/** unique or primary key constraints on table "contract_types" */
export enum Contract_Types_Constraint {
  /** unique or primary key constraint on columns "type" */
  ContractTypesPkey = 'contract_types_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Contract_Types_Delete_At_Path_Input = {
  abi?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Contract_Types_Delete_Elem_Input = {
  abi?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Contract_Types_Delete_Key_Input = {
  abi?: Maybe<Scalars['String']>
}

/** input type for inserting data into table "contract_types" */
export type Contract_Types_Insert_Input = {
  abi?: Maybe<Scalars['jsonb']>
  type?: Maybe<Contract_Type_Names_Enum>
}

/** response of any mutation on the table "contract_types" */
export type Contract_Types_Mutation_Response = {
  __typename?: 'contract_types_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Contract_Types>
}

/** input type for inserting object relation for remote table "contract_types" */
export type Contract_Types_Obj_Rel_Insert_Input = {
  data: Contract_Types_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Contract_Types_On_Conflict>
}

/** on_conflict condition type for table "contract_types" */
export type Contract_Types_On_Conflict = {
  constraint: Contract_Types_Constraint
  update_columns?: Array<Contract_Types_Update_Column>
  where?: Maybe<Contract_Types_Bool_Exp>
}

/** Ordering options when selecting data from "contract_types". */
export type Contract_Types_Order_By = {
  abi?: Maybe<Order_By>
  type?: Maybe<Order_By>
}

/** primary key columns input for table: contract_types */
export type Contract_Types_Pk_Columns_Input = {
  type: Contract_Type_Names_Enum
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Contract_Types_Prepend_Input = {
  abi?: Maybe<Scalars['jsonb']>
}

/** select columns of table "contract_types" */
export enum Contract_Types_Select_Column {
  /** column name */
  Abi = 'abi',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "contract_types" */
export type Contract_Types_Set_Input = {
  abi?: Maybe<Scalars['jsonb']>
  type?: Maybe<Contract_Type_Names_Enum>
}

/** Streaming cursor of the table "contract_types" */
export type Contract_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contract_Types_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Contract_Types_Stream_Cursor_Value_Input = {
  abi?: Maybe<Scalars['jsonb']>
  type?: Maybe<Contract_Type_Names_Enum>
}

/** update columns of table "contract_types" */
export enum Contract_Types_Update_Column {
  /** column name */
  Abi = 'abi',
  /** column name */
  Type = 'type',
}

export type Contract_Types_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Contract_Types_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Contract_Types_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Contract_Types_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Contract_Types_Delete_Key_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Contract_Types_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Contract_Types_Set_Input>
  where: Contract_Types_Bool_Exp
}

/** columns and relationships of "contracts_metadata" */
export type Contracts_Metadata = {
  __typename?: 'contracts_metadata'
  address: Scalars['String']
  admin?: Maybe<Scalars['String']>
  alertbot_secret?: Maybe<Scalars['String']>
  alertbot_url?: Maybe<Scalars['String']>
  /** An array relationship */
  allowlisted_users: Array<Contract_Allowlistings>
  /** An aggregate relationship */
  allowlisted_users_aggregate: Contract_Allowlistings_Aggregate
  bucket_name?: Maybe<Scalars['String']>
  contract_type: Contract_Type_Names_Enum
  curation_registry_id?: Maybe<Scalars['String']>
  /** An object relationship */
  default_vertical?: Maybe<Project_Verticals>
  default_vertical_name?: Maybe<Scalars['String']>
  dependency_registry_id?: Maybe<Scalars['String']>
  generator_url?: Maybe<Scalars['String']>
  minter_address?: Maybe<Scalars['String']>
  /** An object relationship */
  minter_filter?: Maybe<Minter_Filters_Metadata>
  minter_filter_address?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  /** A computed field, executes function "new_projects_forbidden" */
  new_projects_forbidden?: Maybe<Scalars['Boolean']>
  new_projects_forbidden_offchain: Scalars['Boolean']
  new_projects_forbidden_onchain: Scalars['Boolean']
  preferred_arweave_gateway?: Maybe<Scalars['String']>
  preferred_ipfs_gateway?: Maybe<Scalars['String']>
  /** An array relationship */
  projects: Array<Projects_Metadata>
  /** An aggregate relationship */
  projects_aggregate: Projects_Metadata_Aggregate
  render_provider_address?: Maybe<Scalars['String']>
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
  token_base_url?: Maybe<Scalars['String']>
  /** An object relationship */
  type?: Maybe<Contract_Types>
  updated_at?: Maybe<Scalars['timestamp']>
  /** A computed field, executes function "user_is_allowlisted" */
  user_is_allowlisted?: Maybe<Scalars['Boolean']>
}

/** columns and relationships of "contracts_metadata" */
export type Contracts_MetadataAllowlisted_UsersArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

/** columns and relationships of "contracts_metadata" */
export type Contracts_MetadataAllowlisted_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

/** columns and relationships of "contracts_metadata" */
export type Contracts_MetadataProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** columns and relationships of "contracts_metadata" */
export type Contracts_MetadataProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** aggregated selection of "contracts_metadata" */
export type Contracts_Metadata_Aggregate = {
  __typename?: 'contracts_metadata_aggregate'
  aggregate?: Maybe<Contracts_Metadata_Aggregate_Fields>
  nodes: Array<Contracts_Metadata>
}

/** aggregate fields of "contracts_metadata" */
export type Contracts_Metadata_Aggregate_Fields = {
  __typename?: 'contracts_metadata_aggregate_fields'
  avg?: Maybe<Contracts_Metadata_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Contracts_Metadata_Max_Fields>
  min?: Maybe<Contracts_Metadata_Min_Fields>
  stddev?: Maybe<Contracts_Metadata_Stddev_Fields>
  stddev_pop?: Maybe<Contracts_Metadata_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Contracts_Metadata_Stddev_Samp_Fields>
  sum?: Maybe<Contracts_Metadata_Sum_Fields>
  var_pop?: Maybe<Contracts_Metadata_Var_Pop_Fields>
  var_samp?: Maybe<Contracts_Metadata_Var_Samp_Fields>
  variance?: Maybe<Contracts_Metadata_Variance_Fields>
}

/** aggregate fields of "contracts_metadata" */
export type Contracts_Metadata_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Contracts_Metadata_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Contracts_Metadata_Avg_Fields = {
  __typename?: 'contracts_metadata_avg_fields'
  render_provider_percentage?: Maybe<Scalars['Float']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "contracts_metadata". All fields are combined with a logical 'AND'. */
export type Contracts_Metadata_Bool_Exp = {
  _and?: Maybe<Array<Contracts_Metadata_Bool_Exp>>
  _not?: Maybe<Contracts_Metadata_Bool_Exp>
  _or?: Maybe<Array<Contracts_Metadata_Bool_Exp>>
  address?: Maybe<String_Comparison_Exp>
  admin?: Maybe<String_Comparison_Exp>
  alertbot_secret?: Maybe<String_Comparison_Exp>
  alertbot_url?: Maybe<String_Comparison_Exp>
  allowlisted_users?: Maybe<Contract_Allowlistings_Bool_Exp>
  bucket_name?: Maybe<String_Comparison_Exp>
  contract_type?: Maybe<Contract_Type_Names_Enum_Comparison_Exp>
  curation_registry_id?: Maybe<String_Comparison_Exp>
  default_vertical?: Maybe<Project_Verticals_Bool_Exp>
  default_vertical_name?: Maybe<String_Comparison_Exp>
  dependency_registry_id?: Maybe<String_Comparison_Exp>
  generator_url?: Maybe<String_Comparison_Exp>
  minter_address?: Maybe<String_Comparison_Exp>
  minter_filter?: Maybe<Minter_Filters_Metadata_Bool_Exp>
  minter_filter_address?: Maybe<String_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  new_projects_forbidden?: Maybe<Boolean_Comparison_Exp>
  new_projects_forbidden_offchain?: Maybe<Boolean_Comparison_Exp>
  new_projects_forbidden_onchain?: Maybe<Boolean_Comparison_Exp>
  preferred_arweave_gateway?: Maybe<String_Comparison_Exp>
  preferred_ipfs_gateway?: Maybe<String_Comparison_Exp>
  projects?: Maybe<Projects_Metadata_Bool_Exp>
  render_provider_address?: Maybe<String_Comparison_Exp>
  render_provider_percentage?: Maybe<Int_Comparison_Exp>
  render_provider_secondary_sales_address?: Maybe<String_Comparison_Exp>
  render_provider_secondary_sales_bps?: Maybe<Int_Comparison_Exp>
  token_base_url?: Maybe<String_Comparison_Exp>
  type?: Maybe<Contract_Types_Bool_Exp>
  updated_at?: Maybe<Timestamp_Comparison_Exp>
  user_is_allowlisted?: Maybe<Boolean_Comparison_Exp>
}

/** unique or primary key constraints on table "contracts_metadata" */
export enum Contracts_Metadata_Constraint {
  /** unique or primary key constraint on columns "name" */
  ContractsMetadataNameKey = 'contracts_metadata_name_key',
  /** unique or primary key constraint on columns "address" */
  ContractsMetadataPkey = 'contracts_metadata_pkey',
}

/** input type for incrementing numeric columns in table "contracts_metadata" */
export type Contracts_Metadata_Inc_Input = {
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "contracts_metadata" */
export type Contracts_Metadata_Insert_Input = {
  address?: Maybe<Scalars['String']>
  admin?: Maybe<Scalars['String']>
  alertbot_secret?: Maybe<Scalars['String']>
  alertbot_url?: Maybe<Scalars['String']>
  allowlisted_users?: Maybe<Contract_Allowlistings_Arr_Rel_Insert_Input>
  bucket_name?: Maybe<Scalars['String']>
  contract_type?: Maybe<Contract_Type_Names_Enum>
  curation_registry_id?: Maybe<Scalars['String']>
  default_vertical?: Maybe<Project_Verticals_Obj_Rel_Insert_Input>
  default_vertical_name?: Maybe<Scalars['String']>
  dependency_registry_id?: Maybe<Scalars['String']>
  generator_url?: Maybe<Scalars['String']>
  minter_address?: Maybe<Scalars['String']>
  minter_filter?: Maybe<Minter_Filters_Metadata_Obj_Rel_Insert_Input>
  minter_filter_address?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  new_projects_forbidden_offchain?: Maybe<Scalars['Boolean']>
  new_projects_forbidden_onchain?: Maybe<Scalars['Boolean']>
  preferred_arweave_gateway?: Maybe<Scalars['String']>
  preferred_ipfs_gateway?: Maybe<Scalars['String']>
  projects?: Maybe<Projects_Metadata_Arr_Rel_Insert_Input>
  render_provider_address?: Maybe<Scalars['String']>
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
  token_base_url?: Maybe<Scalars['String']>
  type?: Maybe<Contract_Types_Obj_Rel_Insert_Input>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** aggregate max on columns */
export type Contracts_Metadata_Max_Fields = {
  __typename?: 'contracts_metadata_max_fields'
  address?: Maybe<Scalars['String']>
  admin?: Maybe<Scalars['String']>
  alertbot_secret?: Maybe<Scalars['String']>
  alertbot_url?: Maybe<Scalars['String']>
  bucket_name?: Maybe<Scalars['String']>
  curation_registry_id?: Maybe<Scalars['String']>
  default_vertical_name?: Maybe<Scalars['String']>
  dependency_registry_id?: Maybe<Scalars['String']>
  generator_url?: Maybe<Scalars['String']>
  minter_address?: Maybe<Scalars['String']>
  minter_filter_address?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  preferred_arweave_gateway?: Maybe<Scalars['String']>
  preferred_ipfs_gateway?: Maybe<Scalars['String']>
  render_provider_address?: Maybe<Scalars['String']>
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
  token_base_url?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** aggregate min on columns */
export type Contracts_Metadata_Min_Fields = {
  __typename?: 'contracts_metadata_min_fields'
  address?: Maybe<Scalars['String']>
  admin?: Maybe<Scalars['String']>
  alertbot_secret?: Maybe<Scalars['String']>
  alertbot_url?: Maybe<Scalars['String']>
  bucket_name?: Maybe<Scalars['String']>
  curation_registry_id?: Maybe<Scalars['String']>
  default_vertical_name?: Maybe<Scalars['String']>
  dependency_registry_id?: Maybe<Scalars['String']>
  generator_url?: Maybe<Scalars['String']>
  minter_address?: Maybe<Scalars['String']>
  minter_filter_address?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  preferred_arweave_gateway?: Maybe<Scalars['String']>
  preferred_ipfs_gateway?: Maybe<Scalars['String']>
  render_provider_address?: Maybe<Scalars['String']>
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
  token_base_url?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** response of any mutation on the table "contracts_metadata" */
export type Contracts_Metadata_Mutation_Response = {
  __typename?: 'contracts_metadata_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Contracts_Metadata>
}

/** input type for inserting object relation for remote table "contracts_metadata" */
export type Contracts_Metadata_Obj_Rel_Insert_Input = {
  data: Contracts_Metadata_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Contracts_Metadata_On_Conflict>
}

/** on_conflict condition type for table "contracts_metadata" */
export type Contracts_Metadata_On_Conflict = {
  constraint: Contracts_Metadata_Constraint
  update_columns?: Array<Contracts_Metadata_Update_Column>
  where?: Maybe<Contracts_Metadata_Bool_Exp>
}

/** Ordering options when selecting data from "contracts_metadata". */
export type Contracts_Metadata_Order_By = {
  address?: Maybe<Order_By>
  admin?: Maybe<Order_By>
  alertbot_secret?: Maybe<Order_By>
  alertbot_url?: Maybe<Order_By>
  allowlisted_users_aggregate?: Maybe<Contract_Allowlistings_Aggregate_Order_By>
  bucket_name?: Maybe<Order_By>
  contract_type?: Maybe<Order_By>
  curation_registry_id?: Maybe<Order_By>
  default_vertical?: Maybe<Project_Verticals_Order_By>
  default_vertical_name?: Maybe<Order_By>
  dependency_registry_id?: Maybe<Order_By>
  generator_url?: Maybe<Order_By>
  minter_address?: Maybe<Order_By>
  minter_filter?: Maybe<Minter_Filters_Metadata_Order_By>
  minter_filter_address?: Maybe<Order_By>
  name?: Maybe<Order_By>
  new_projects_forbidden?: Maybe<Order_By>
  new_projects_forbidden_offchain?: Maybe<Order_By>
  new_projects_forbidden_onchain?: Maybe<Order_By>
  preferred_arweave_gateway?: Maybe<Order_By>
  preferred_ipfs_gateway?: Maybe<Order_By>
  projects_aggregate?: Maybe<Projects_Metadata_Aggregate_Order_By>
  render_provider_address?: Maybe<Order_By>
  render_provider_percentage?: Maybe<Order_By>
  render_provider_secondary_sales_address?: Maybe<Order_By>
  render_provider_secondary_sales_bps?: Maybe<Order_By>
  token_base_url?: Maybe<Order_By>
  type?: Maybe<Contract_Types_Order_By>
  updated_at?: Maybe<Order_By>
  user_is_allowlisted?: Maybe<Order_By>
}

/** primary key columns input for table: contracts_metadata */
export type Contracts_Metadata_Pk_Columns_Input = {
  address: Scalars['String']
}

/** select columns of table "contracts_metadata" */
export enum Contracts_Metadata_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Admin = 'admin',
  /** column name */
  AlertbotSecret = 'alertbot_secret',
  /** column name */
  AlertbotUrl = 'alertbot_url',
  /** column name */
  BucketName = 'bucket_name',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  CurationRegistryId = 'curation_registry_id',
  /** column name */
  DefaultVerticalName = 'default_vertical_name',
  /** column name */
  DependencyRegistryId = 'dependency_registry_id',
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
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "contracts_metadata" */
export type Contracts_Metadata_Set_Input = {
  address?: Maybe<Scalars['String']>
  admin?: Maybe<Scalars['String']>
  alertbot_secret?: Maybe<Scalars['String']>
  alertbot_url?: Maybe<Scalars['String']>
  bucket_name?: Maybe<Scalars['String']>
  contract_type?: Maybe<Contract_Type_Names_Enum>
  curation_registry_id?: Maybe<Scalars['String']>
  default_vertical_name?: Maybe<Scalars['String']>
  dependency_registry_id?: Maybe<Scalars['String']>
  generator_url?: Maybe<Scalars['String']>
  minter_address?: Maybe<Scalars['String']>
  minter_filter_address?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  new_projects_forbidden_offchain?: Maybe<Scalars['Boolean']>
  new_projects_forbidden_onchain?: Maybe<Scalars['Boolean']>
  preferred_arweave_gateway?: Maybe<Scalars['String']>
  preferred_ipfs_gateway?: Maybe<Scalars['String']>
  render_provider_address?: Maybe<Scalars['String']>
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
  token_base_url?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** aggregate stddev on columns */
export type Contracts_Metadata_Stddev_Fields = {
  __typename?: 'contracts_metadata_stddev_fields'
  render_provider_percentage?: Maybe<Scalars['Float']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Contracts_Metadata_Stddev_Pop_Fields = {
  __typename?: 'contracts_metadata_stddev_pop_fields'
  render_provider_percentage?: Maybe<Scalars['Float']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Contracts_Metadata_Stddev_Samp_Fields = {
  __typename?: 'contracts_metadata_stddev_samp_fields'
  render_provider_percentage?: Maybe<Scalars['Float']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "contracts_metadata" */
export type Contracts_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contracts_Metadata_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Contracts_Metadata_Stream_Cursor_Value_Input = {
  address?: Maybe<Scalars['String']>
  admin?: Maybe<Scalars['String']>
  alertbot_secret?: Maybe<Scalars['String']>
  alertbot_url?: Maybe<Scalars['String']>
  bucket_name?: Maybe<Scalars['String']>
  contract_type?: Maybe<Contract_Type_Names_Enum>
  curation_registry_id?: Maybe<Scalars['String']>
  default_vertical_name?: Maybe<Scalars['String']>
  dependency_registry_id?: Maybe<Scalars['String']>
  generator_url?: Maybe<Scalars['String']>
  minter_address?: Maybe<Scalars['String']>
  minter_filter_address?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  new_projects_forbidden_offchain?: Maybe<Scalars['Boolean']>
  new_projects_forbidden_onchain?: Maybe<Scalars['Boolean']>
  preferred_arweave_gateway?: Maybe<Scalars['String']>
  preferred_ipfs_gateway?: Maybe<Scalars['String']>
  render_provider_address?: Maybe<Scalars['String']>
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_address?: Maybe<Scalars['String']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
  token_base_url?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** aggregate sum on columns */
export type Contracts_Metadata_Sum_Fields = {
  __typename?: 'contracts_metadata_sum_fields'
  render_provider_percentage?: Maybe<Scalars['Int']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Int']>
}

/** update columns of table "contracts_metadata" */
export enum Contracts_Metadata_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Admin = 'admin',
  /** column name */
  AlertbotSecret = 'alertbot_secret',
  /** column name */
  AlertbotUrl = 'alertbot_url',
  /** column name */
  BucketName = 'bucket_name',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  CurationRegistryId = 'curation_registry_id',
  /** column name */
  DefaultVerticalName = 'default_vertical_name',
  /** column name */
  DependencyRegistryId = 'dependency_registry_id',
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
  UpdatedAt = 'updated_at',
}

export type Contracts_Metadata_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Contracts_Metadata_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Contracts_Metadata_Set_Input>
  where: Contracts_Metadata_Bool_Exp
}

/** aggregate var_pop on columns */
export type Contracts_Metadata_Var_Pop_Fields = {
  __typename?: 'contracts_metadata_var_pop_fields'
  render_provider_percentage?: Maybe<Scalars['Float']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Contracts_Metadata_Var_Samp_Fields = {
  __typename?: 'contracts_metadata_var_samp_fields'
  render_provider_percentage?: Maybe<Scalars['Float']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Contracts_Metadata_Variance_Fields = {
  __typename?: 'contracts_metadata_variance_fields'
  render_provider_percentage?: Maybe<Scalars['Float']>
  render_provider_secondary_sales_bps?: Maybe<Scalars['Float']>
}

/** fields of action: "createApplication" */
export type CreateApplication = {
  __typename?: 'createApplication'
  /** the time at which this action was created */
  created_at: Scalars['timestamptz']
  /** errors related to the invocation */
  errors?: Maybe<Scalars['json']>
  /** the unique id of an action */
  id: Scalars['uuid']
  /** the output fields of this action */
  output?: Maybe<CreateApplicationOutput>
}

/** columns and relationships of "curation_statuses" */
export type Curation_Statuses = {
  __typename?: 'curation_statuses'
  value: Scalars['String']
}

/** aggregated selection of "curation_statuses" */
export type Curation_Statuses_Aggregate = {
  __typename?: 'curation_statuses_aggregate'
  aggregate?: Maybe<Curation_Statuses_Aggregate_Fields>
  nodes: Array<Curation_Statuses>
}

/** aggregate fields of "curation_statuses" */
export type Curation_Statuses_Aggregate_Fields = {
  __typename?: 'curation_statuses_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Curation_Statuses_Max_Fields>
  min?: Maybe<Curation_Statuses_Min_Fields>
}

/** aggregate fields of "curation_statuses" */
export type Curation_Statuses_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Curation_Statuses_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "curation_statuses". All fields are combined with a logical 'AND'. */
export type Curation_Statuses_Bool_Exp = {
  _and?: Maybe<Array<Curation_Statuses_Bool_Exp>>
  _not?: Maybe<Curation_Statuses_Bool_Exp>
  _or?: Maybe<Array<Curation_Statuses_Bool_Exp>>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "curation_statuses" */
export enum Curation_Statuses_Constraint {
  /** unique or primary key constraint on columns "value" */
  CurationStatusesPkey = 'curation_statuses_pkey',
}

export enum Curation_Statuses_Enum {
  Collaboration = 'collaboration',
  Curated = 'curated',
  Factory = 'factory',
  Playground = 'playground',
}

/** Boolean expression to compare columns of type "curation_statuses_enum". All fields are combined with logical 'AND'. */
export type Curation_Statuses_Enum_Comparison_Exp = {
  _eq?: Maybe<Curation_Statuses_Enum>
  _in?: Maybe<Array<Curation_Statuses_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Curation_Statuses_Enum>
  _nin?: Maybe<Array<Curation_Statuses_Enum>>
}

/** input type for inserting data into table "curation_statuses" */
export type Curation_Statuses_Insert_Input = {
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Curation_Statuses_Max_Fields = {
  __typename?: 'curation_statuses_max_fields'
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Curation_Statuses_Min_Fields = {
  __typename?: 'curation_statuses_min_fields'
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "curation_statuses" */
export type Curation_Statuses_Mutation_Response = {
  __typename?: 'curation_statuses_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Curation_Statuses>
}

/** on_conflict condition type for table "curation_statuses" */
export type Curation_Statuses_On_Conflict = {
  constraint: Curation_Statuses_Constraint
  update_columns?: Array<Curation_Statuses_Update_Column>
  where?: Maybe<Curation_Statuses_Bool_Exp>
}

/** Ordering options when selecting data from "curation_statuses". */
export type Curation_Statuses_Order_By = {
  value?: Maybe<Order_By>
}

/** primary key columns input for table: curation_statuses */
export type Curation_Statuses_Pk_Columns_Input = {
  value: Scalars['String']
}

/** select columns of table "curation_statuses" */
export enum Curation_Statuses_Select_Column {
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "curation_statuses" */
export type Curation_Statuses_Set_Input = {
  value?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "curation_statuses" */
export type Curation_Statuses_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Curation_Statuses_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Curation_Statuses_Stream_Cursor_Value_Input = {
  value?: Maybe<Scalars['String']>
}

/** update columns of table "curation_statuses" */
export enum Curation_Statuses_Update_Column {
  /** column name */
  Value = 'value',
}

export type Curation_Statuses_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Curation_Statuses_Set_Input>
  where: Curation_Statuses_Bool_Exp
}

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** columns and relationships of "entity_tags" */
export type Entity_Tags = {
  __typename?: 'entity_tags'
  id: Scalars['Int']
  /** An object relationship */
  project?: Maybe<Projects_Metadata>
  project_id?: Maybe<Scalars['String']>
  /** An object relationship */
  tag?: Maybe<Tags>
  tag_name: Scalars['String']
  /** An object relationship */
  user?: Maybe<Users>
  user_address?: Maybe<Scalars['String']>
}

/** aggregated selection of "entity_tags" */
export type Entity_Tags_Aggregate = {
  __typename?: 'entity_tags_aggregate'
  aggregate?: Maybe<Entity_Tags_Aggregate_Fields>
  nodes: Array<Entity_Tags>
}

/** aggregate fields of "entity_tags" */
export type Entity_Tags_Aggregate_Fields = {
  __typename?: 'entity_tags_aggregate_fields'
  avg?: Maybe<Entity_Tags_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Entity_Tags_Max_Fields>
  min?: Maybe<Entity_Tags_Min_Fields>
  stddev?: Maybe<Entity_Tags_Stddev_Fields>
  stddev_pop?: Maybe<Entity_Tags_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Entity_Tags_Stddev_Samp_Fields>
  sum?: Maybe<Entity_Tags_Sum_Fields>
  var_pop?: Maybe<Entity_Tags_Var_Pop_Fields>
  var_samp?: Maybe<Entity_Tags_Var_Samp_Fields>
  variance?: Maybe<Entity_Tags_Variance_Fields>
}

/** aggregate fields of "entity_tags" */
export type Entity_Tags_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Entity_Tags_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "entity_tags" */
export type Entity_Tags_Aggregate_Order_By = {
  avg?: Maybe<Entity_Tags_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Entity_Tags_Max_Order_By>
  min?: Maybe<Entity_Tags_Min_Order_By>
  stddev?: Maybe<Entity_Tags_Stddev_Order_By>
  stddev_pop?: Maybe<Entity_Tags_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Entity_Tags_Stddev_Samp_Order_By>
  sum?: Maybe<Entity_Tags_Sum_Order_By>
  var_pop?: Maybe<Entity_Tags_Var_Pop_Order_By>
  var_samp?: Maybe<Entity_Tags_Var_Samp_Order_By>
  variance?: Maybe<Entity_Tags_Variance_Order_By>
}

/** input type for inserting array relation for remote table "entity_tags" */
export type Entity_Tags_Arr_Rel_Insert_Input = {
  data: Array<Entity_Tags_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Entity_Tags_On_Conflict>
}

/** aggregate avg on columns */
export type Entity_Tags_Avg_Fields = {
  __typename?: 'entity_tags_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "entity_tags" */
export type Entity_Tags_Avg_Order_By = {
  id?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "entity_tags". All fields are combined with a logical 'AND'. */
export type Entity_Tags_Bool_Exp = {
  _and?: Maybe<Array<Entity_Tags_Bool_Exp>>
  _not?: Maybe<Entity_Tags_Bool_Exp>
  _or?: Maybe<Array<Entity_Tags_Bool_Exp>>
  id?: Maybe<Int_Comparison_Exp>
  project?: Maybe<Projects_Metadata_Bool_Exp>
  project_id?: Maybe<String_Comparison_Exp>
  tag?: Maybe<Tags_Bool_Exp>
  tag_name?: Maybe<String_Comparison_Exp>
  user?: Maybe<Users_Bool_Exp>
  user_address?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "entity_tags" */
export enum Entity_Tags_Constraint {
  /** unique or primary key constraint on columns "id" */
  EntityTagsPkey = 'entity_tags_pkey',
}

/** input type for incrementing numeric columns in table "entity_tags" */
export type Entity_Tags_Inc_Input = {
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "entity_tags" */
export type Entity_Tags_Insert_Input = {
  id?: Maybe<Scalars['Int']>
  project?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  project_id?: Maybe<Scalars['String']>
  tag?: Maybe<Tags_Obj_Rel_Insert_Input>
  tag_name?: Maybe<Scalars['String']>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  user_address?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Entity_Tags_Max_Fields = {
  __typename?: 'entity_tags_max_fields'
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  tag_name?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "entity_tags" */
export type Entity_Tags_Max_Order_By = {
  id?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  tag_name?: Maybe<Order_By>
  user_address?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Entity_Tags_Min_Fields = {
  __typename?: 'entity_tags_min_fields'
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  tag_name?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "entity_tags" */
export type Entity_Tags_Min_Order_By = {
  id?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  tag_name?: Maybe<Order_By>
  user_address?: Maybe<Order_By>
}

/** response of any mutation on the table "entity_tags" */
export type Entity_Tags_Mutation_Response = {
  __typename?: 'entity_tags_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Entity_Tags>
}

/** on_conflict condition type for table "entity_tags" */
export type Entity_Tags_On_Conflict = {
  constraint: Entity_Tags_Constraint
  update_columns?: Array<Entity_Tags_Update_Column>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

/** Ordering options when selecting data from "entity_tags". */
export type Entity_Tags_Order_By = {
  id?: Maybe<Order_By>
  project?: Maybe<Projects_Metadata_Order_By>
  project_id?: Maybe<Order_By>
  tag?: Maybe<Tags_Order_By>
  tag_name?: Maybe<Order_By>
  user?: Maybe<Users_Order_By>
  user_address?: Maybe<Order_By>
}

/** primary key columns input for table: entity_tags */
export type Entity_Tags_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "entity_tags" */
export enum Entity_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TagName = 'tag_name',
  /** column name */
  UserAddress = 'user_address',
}

/** input type for updating data in table "entity_tags" */
export type Entity_Tags_Set_Input = {
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  tag_name?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Entity_Tags_Stddev_Fields = {
  __typename?: 'entity_tags_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "entity_tags" */
export type Entity_Tags_Stddev_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Entity_Tags_Stddev_Pop_Fields = {
  __typename?: 'entity_tags_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "entity_tags" */
export type Entity_Tags_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Entity_Tags_Stddev_Samp_Fields = {
  __typename?: 'entity_tags_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "entity_tags" */
export type Entity_Tags_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>
}

/** Streaming cursor of the table "entity_tags" */
export type Entity_Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Entity_Tags_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Entity_Tags_Stream_Cursor_Value_Input = {
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  tag_name?: Maybe<Scalars['String']>
  user_address?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Entity_Tags_Sum_Fields = {
  __typename?: 'entity_tags_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "entity_tags" */
export type Entity_Tags_Sum_Order_By = {
  id?: Maybe<Order_By>
}

/** update columns of table "entity_tags" */
export enum Entity_Tags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TagName = 'tag_name',
  /** column name */
  UserAddress = 'user_address',
}

export type Entity_Tags_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Entity_Tags_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Entity_Tags_Set_Input>
  where: Entity_Tags_Bool_Exp
}

/** aggregate var_pop on columns */
export type Entity_Tags_Var_Pop_Fields = {
  __typename?: 'entity_tags_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "entity_tags" */
export type Entity_Tags_Var_Pop_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Entity_Tags_Var_Samp_Fields = {
  __typename?: 'entity_tags_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "entity_tags" */
export type Entity_Tags_Var_Samp_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Entity_Tags_Variance_Fields = {
  __typename?: 'entity_tags_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "entity_tags" */
export type Entity_Tags_Variance_Order_By = {
  id?: Maybe<Order_By>
}

/** columns and relationships of "favorites" */
export type Favorites = {
  __typename?: 'favorites'
  favorited_project_id?: Maybe<Scalars['String']>
  favorited_token_id?: Maybe<Scalars['String']>
  /** An object relationship */
  favorited_user?: Maybe<Users>
  favorited_user_address?: Maybe<Scalars['String']>
  id: Scalars['Int']
  /** An object relationship */
  project_metadata?: Maybe<Projects_Metadata>
  /** An object relationship */
  token_metadata?: Maybe<Tokens_Metadata>
  /** An object relationship */
  user: Users
  user_public_address: Scalars['String']
}

/** aggregated selection of "favorites" */
export type Favorites_Aggregate = {
  __typename?: 'favorites_aggregate'
  aggregate?: Maybe<Favorites_Aggregate_Fields>
  nodes: Array<Favorites>
}

/** aggregate fields of "favorites" */
export type Favorites_Aggregate_Fields = {
  __typename?: 'favorites_aggregate_fields'
  avg?: Maybe<Favorites_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Favorites_Max_Fields>
  min?: Maybe<Favorites_Min_Fields>
  stddev?: Maybe<Favorites_Stddev_Fields>
  stddev_pop?: Maybe<Favorites_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Favorites_Stddev_Samp_Fields>
  sum?: Maybe<Favorites_Sum_Fields>
  var_pop?: Maybe<Favorites_Var_Pop_Fields>
  var_samp?: Maybe<Favorites_Var_Samp_Fields>
  variance?: Maybe<Favorites_Variance_Fields>
}

/** aggregate fields of "favorites" */
export type Favorites_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Favorites_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "favorites" */
export type Favorites_Aggregate_Order_By = {
  avg?: Maybe<Favorites_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Favorites_Max_Order_By>
  min?: Maybe<Favorites_Min_Order_By>
  stddev?: Maybe<Favorites_Stddev_Order_By>
  stddev_pop?: Maybe<Favorites_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Favorites_Stddev_Samp_Order_By>
  sum?: Maybe<Favorites_Sum_Order_By>
  var_pop?: Maybe<Favorites_Var_Pop_Order_By>
  var_samp?: Maybe<Favorites_Var_Samp_Order_By>
  variance?: Maybe<Favorites_Variance_Order_By>
}

/** input type for inserting array relation for remote table "favorites" */
export type Favorites_Arr_Rel_Insert_Input = {
  data: Array<Favorites_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Favorites_On_Conflict>
}

/** aggregate avg on columns */
export type Favorites_Avg_Fields = {
  __typename?: 'favorites_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "favorites" */
export type Favorites_Avg_Order_By = {
  id?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "favorites". All fields are combined with a logical 'AND'. */
export type Favorites_Bool_Exp = {
  _and?: Maybe<Array<Favorites_Bool_Exp>>
  _not?: Maybe<Favorites_Bool_Exp>
  _or?: Maybe<Array<Favorites_Bool_Exp>>
  favorited_project_id?: Maybe<String_Comparison_Exp>
  favorited_token_id?: Maybe<String_Comparison_Exp>
  favorited_user?: Maybe<Users_Bool_Exp>
  favorited_user_address?: Maybe<String_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  project_metadata?: Maybe<Projects_Metadata_Bool_Exp>
  token_metadata?: Maybe<Tokens_Metadata_Bool_Exp>
  user?: Maybe<Users_Bool_Exp>
  user_public_address?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "favorites" */
export enum Favorites_Constraint {
  /** unique or primary key constraint on columns "id" */
  FavoritesPkey = 'favorites_pkey',
}

/** input type for incrementing numeric columns in table "favorites" */
export type Favorites_Inc_Input = {
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "favorites" */
export type Favorites_Insert_Input = {
  favorited_project_id?: Maybe<Scalars['String']>
  favorited_token_id?: Maybe<Scalars['String']>
  favorited_user?: Maybe<Users_Obj_Rel_Insert_Input>
  favorited_user_address?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  project_metadata?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  token_metadata?: Maybe<Tokens_Metadata_Obj_Rel_Insert_Input>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  user_public_address?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Favorites_Max_Fields = {
  __typename?: 'favorites_max_fields'
  favorited_project_id?: Maybe<Scalars['String']>
  favorited_token_id?: Maybe<Scalars['String']>
  favorited_user_address?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  user_public_address?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "favorites" */
export type Favorites_Max_Order_By = {
  favorited_project_id?: Maybe<Order_By>
  favorited_token_id?: Maybe<Order_By>
  favorited_user_address?: Maybe<Order_By>
  id?: Maybe<Order_By>
  user_public_address?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Favorites_Min_Fields = {
  __typename?: 'favorites_min_fields'
  favorited_project_id?: Maybe<Scalars['String']>
  favorited_token_id?: Maybe<Scalars['String']>
  favorited_user_address?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  user_public_address?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "favorites" */
export type Favorites_Min_Order_By = {
  favorited_project_id?: Maybe<Order_By>
  favorited_token_id?: Maybe<Order_By>
  favorited_user_address?: Maybe<Order_By>
  id?: Maybe<Order_By>
  user_public_address?: Maybe<Order_By>
}

/** response of any mutation on the table "favorites" */
export type Favorites_Mutation_Response = {
  __typename?: 'favorites_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Favorites>
}

/** on_conflict condition type for table "favorites" */
export type Favorites_On_Conflict = {
  constraint: Favorites_Constraint
  update_columns?: Array<Favorites_Update_Column>
  where?: Maybe<Favorites_Bool_Exp>
}

/** Ordering options when selecting data from "favorites". */
export type Favorites_Order_By = {
  favorited_project_id?: Maybe<Order_By>
  favorited_token_id?: Maybe<Order_By>
  favorited_user?: Maybe<Users_Order_By>
  favorited_user_address?: Maybe<Order_By>
  id?: Maybe<Order_By>
  project_metadata?: Maybe<Projects_Metadata_Order_By>
  token_metadata?: Maybe<Tokens_Metadata_Order_By>
  user?: Maybe<Users_Order_By>
  user_public_address?: Maybe<Order_By>
}

/** primary key columns input for table: favorites */
export type Favorites_Pk_Columns_Input = {
  id: Scalars['Int']
}

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
  UserPublicAddress = 'user_public_address',
}

/** input type for updating data in table "favorites" */
export type Favorites_Set_Input = {
  favorited_project_id?: Maybe<Scalars['String']>
  favorited_token_id?: Maybe<Scalars['String']>
  favorited_user_address?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  user_public_address?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Favorites_Stddev_Fields = {
  __typename?: 'favorites_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "favorites" */
export type Favorites_Stddev_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Favorites_Stddev_Pop_Fields = {
  __typename?: 'favorites_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "favorites" */
export type Favorites_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Favorites_Stddev_Samp_Fields = {
  __typename?: 'favorites_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "favorites" */
export type Favorites_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>
}

/** Streaming cursor of the table "favorites" */
export type Favorites_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Favorites_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Favorites_Stream_Cursor_Value_Input = {
  favorited_project_id?: Maybe<Scalars['String']>
  favorited_token_id?: Maybe<Scalars['String']>
  favorited_user_address?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  user_public_address?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Favorites_Sum_Fields = {
  __typename?: 'favorites_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "favorites" */
export type Favorites_Sum_Order_By = {
  id?: Maybe<Order_By>
}

/** update columns of table "favorites" */
export enum Favorites_Update_Column {
  /** column name */
  FavoritedProjectId = 'favorited_project_id',
  /** column name */
  FavoritedTokenId = 'favorited_token_id',
  /** column name */
  FavoritedUserAddress = 'favorited_user_address',
  /** column name */
  Id = 'id',
  /** column name */
  UserPublicAddress = 'user_public_address',
}

export type Favorites_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Favorites_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Favorites_Set_Input>
  where: Favorites_Bool_Exp
}

/** aggregate var_pop on columns */
export type Favorites_Var_Pop_Fields = {
  __typename?: 'favorites_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "favorites" */
export type Favorites_Var_Pop_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Favorites_Var_Samp_Fields = {
  __typename?: 'favorites_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "favorites" */
export type Favorites_Var_Samp_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Favorites_Variance_Fields = {
  __typename?: 'favorites_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "favorites" */
export type Favorites_Variance_Order_By = {
  id?: Maybe<Order_By>
}

/** columns and relationships of "feature_field_values_counts" */
export type Feature_Field_Values_Counts = {
  __typename?: 'feature_field_values_counts'
  count: Scalars['bigint']
  value: Scalars['String']
}

/** aggregated selection of "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Aggregate = {
  __typename?: 'feature_field_values_counts_aggregate'
  aggregate?: Maybe<Feature_Field_Values_Counts_Aggregate_Fields>
  nodes: Array<Feature_Field_Values_Counts>
}

/** aggregate fields of "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Aggregate_Fields = {
  __typename?: 'feature_field_values_counts_aggregate_fields'
  avg?: Maybe<Feature_Field_Values_Counts_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Feature_Field_Values_Counts_Max_Fields>
  min?: Maybe<Feature_Field_Values_Counts_Min_Fields>
  stddev?: Maybe<Feature_Field_Values_Counts_Stddev_Fields>
  stddev_pop?: Maybe<Feature_Field_Values_Counts_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Feature_Field_Values_Counts_Stddev_Samp_Fields>
  sum?: Maybe<Feature_Field_Values_Counts_Sum_Fields>
  var_pop?: Maybe<Feature_Field_Values_Counts_Var_Pop_Fields>
  var_samp?: Maybe<Feature_Field_Values_Counts_Var_Samp_Fields>
  variance?: Maybe<Feature_Field_Values_Counts_Variance_Fields>
}

/** aggregate fields of "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Feature_Field_Values_Counts_Avg_Fields = {
  __typename?: 'feature_field_values_counts_avg_fields'
  count?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "feature_field_values_counts". All fields are combined with a logical 'AND'. */
export type Feature_Field_Values_Counts_Bool_Exp = {
  _and?: Maybe<Array<Feature_Field_Values_Counts_Bool_Exp>>
  _not?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
  _or?: Maybe<Array<Feature_Field_Values_Counts_Bool_Exp>>
  count?: Maybe<Bigint_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** input type for incrementing numeric columns in table "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Inc_Input = {
  count?: Maybe<Scalars['bigint']>
}

/** input type for inserting data into table "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Insert_Input = {
  count?: Maybe<Scalars['bigint']>
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Feature_Field_Values_Counts_Max_Fields = {
  __typename?: 'feature_field_values_counts_max_fields'
  count?: Maybe<Scalars['bigint']>
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Feature_Field_Values_Counts_Min_Fields = {
  __typename?: 'feature_field_values_counts_min_fields'
  count?: Maybe<Scalars['bigint']>
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Mutation_Response = {
  __typename?: 'feature_field_values_counts_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Feature_Field_Values_Counts>
}

/** Ordering options when selecting data from "feature_field_values_counts". */
export type Feature_Field_Values_Counts_Order_By = {
  count?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** select columns of table "feature_field_values_counts" */
export enum Feature_Field_Values_Counts_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Set_Input = {
  count?: Maybe<Scalars['bigint']>
  value?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Feature_Field_Values_Counts_Stddev_Fields = {
  __typename?: 'feature_field_values_counts_stddev_fields'
  count?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Feature_Field_Values_Counts_Stddev_Pop_Fields = {
  __typename?: 'feature_field_values_counts_stddev_pop_fields'
  count?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Feature_Field_Values_Counts_Stddev_Samp_Fields = {
  __typename?: 'feature_field_values_counts_stddev_samp_fields'
  count?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "feature_field_values_counts" */
export type Feature_Field_Values_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Feature_Field_Values_Counts_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Feature_Field_Values_Counts_Stream_Cursor_Value_Input = {
  count?: Maybe<Scalars['bigint']>
  value?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Feature_Field_Values_Counts_Sum_Fields = {
  __typename?: 'feature_field_values_counts_sum_fields'
  count?: Maybe<Scalars['bigint']>
}

export type Feature_Field_Values_Counts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Feature_Field_Values_Counts_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Feature_Field_Values_Counts_Set_Input>
  where: Feature_Field_Values_Counts_Bool_Exp
}

/** aggregate var_pop on columns */
export type Feature_Field_Values_Counts_Var_Pop_Fields = {
  __typename?: 'feature_field_values_counts_var_pop_fields'
  count?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Feature_Field_Values_Counts_Var_Samp_Fields = {
  __typename?: 'feature_field_values_counts_var_samp_fields'
  count?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Feature_Field_Values_Counts_Variance_Fields = {
  __typename?: 'feature_field_values_counts_variance_fields'
  count?: Maybe<Scalars['Float']>
}

/** columns and relationships of "feature_flags" */
export type Feature_Flags = {
  __typename?: 'feature_flags'
  address_allowlist?: Maybe<Scalars['String']>
  flag_name: Scalars['String']
  globally_enabled: Scalars['Boolean']
}

/** aggregated selection of "feature_flags" */
export type Feature_Flags_Aggregate = {
  __typename?: 'feature_flags_aggregate'
  aggregate?: Maybe<Feature_Flags_Aggregate_Fields>
  nodes: Array<Feature_Flags>
}

/** aggregate fields of "feature_flags" */
export type Feature_Flags_Aggregate_Fields = {
  __typename?: 'feature_flags_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Feature_Flags_Max_Fields>
  min?: Maybe<Feature_Flags_Min_Fields>
}

/** aggregate fields of "feature_flags" */
export type Feature_Flags_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Feature_Flags_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "feature_flags". All fields are combined with a logical 'AND'. */
export type Feature_Flags_Bool_Exp = {
  _and?: Maybe<Array<Feature_Flags_Bool_Exp>>
  _not?: Maybe<Feature_Flags_Bool_Exp>
  _or?: Maybe<Array<Feature_Flags_Bool_Exp>>
  address_allowlist?: Maybe<String_Comparison_Exp>
  flag_name?: Maybe<String_Comparison_Exp>
  globally_enabled?: Maybe<Boolean_Comparison_Exp>
}

/** unique or primary key constraints on table "feature_flags" */
export enum Feature_Flags_Constraint {
  /** unique or primary key constraint on columns "flag_name" */
  FeatureFlagsPkey = 'feature_flags_pkey',
}

/** input type for inserting data into table "feature_flags" */
export type Feature_Flags_Insert_Input = {
  address_allowlist?: Maybe<Scalars['String']>
  flag_name?: Maybe<Scalars['String']>
  globally_enabled?: Maybe<Scalars['Boolean']>
}

/** aggregate max on columns */
export type Feature_Flags_Max_Fields = {
  __typename?: 'feature_flags_max_fields'
  address_allowlist?: Maybe<Scalars['String']>
  flag_name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Feature_Flags_Min_Fields = {
  __typename?: 'feature_flags_min_fields'
  address_allowlist?: Maybe<Scalars['String']>
  flag_name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "feature_flags" */
export type Feature_Flags_Mutation_Response = {
  __typename?: 'feature_flags_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Feature_Flags>
}

/** on_conflict condition type for table "feature_flags" */
export type Feature_Flags_On_Conflict = {
  constraint: Feature_Flags_Constraint
  update_columns?: Array<Feature_Flags_Update_Column>
  where?: Maybe<Feature_Flags_Bool_Exp>
}

/** Ordering options when selecting data from "feature_flags". */
export type Feature_Flags_Order_By = {
  address_allowlist?: Maybe<Order_By>
  flag_name?: Maybe<Order_By>
  globally_enabled?: Maybe<Order_By>
}

/** primary key columns input for table: feature_flags */
export type Feature_Flags_Pk_Columns_Input = {
  flag_name: Scalars['String']
}

/** select columns of table "feature_flags" */
export enum Feature_Flags_Select_Column {
  /** column name */
  AddressAllowlist = 'address_allowlist',
  /** column name */
  FlagName = 'flag_name',
  /** column name */
  GloballyEnabled = 'globally_enabled',
}

/** input type for updating data in table "feature_flags" */
export type Feature_Flags_Set_Input = {
  address_allowlist?: Maybe<Scalars['String']>
  flag_name?: Maybe<Scalars['String']>
  globally_enabled?: Maybe<Scalars['Boolean']>
}

/** Streaming cursor of the table "feature_flags" */
export type Feature_Flags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Feature_Flags_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Feature_Flags_Stream_Cursor_Value_Input = {
  address_allowlist?: Maybe<Scalars['String']>
  flag_name?: Maybe<Scalars['String']>
  globally_enabled?: Maybe<Scalars['Boolean']>
}

/** update columns of table "feature_flags" */
export enum Feature_Flags_Update_Column {
  /** column name */
  AddressAllowlist = 'address_allowlist',
  /** column name */
  FlagName = 'flag_name',
  /** column name */
  GloballyEnabled = 'globally_enabled',
}

export type Feature_Flags_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Feature_Flags_Set_Input>
  where: Feature_Flags_Bool_Exp
}

export type Featured_Token_Projects_Metadata_Args = {
  seed?: Maybe<Scalars['float8']>
}

export type Filter_Tokens_Metadata_By_Features_Args = {
  path?: Maybe<Scalars['jsonpath']>
}

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: Maybe<Scalars['float8']>
  _gt?: Maybe<Scalars['float8']>
  _gte?: Maybe<Scalars['float8']>
  _in?: Maybe<Array<Scalars['float8']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['float8']>
  _lte?: Maybe<Scalars['float8']>
  _neq?: Maybe<Scalars['float8']>
  _nin?: Maybe<Array<Scalars['float8']>>
}

export type Get_Projects_Metadata_Feature_Field_Value_Counts_Args = {
  _feature_field?: Maybe<Scalars['String']>
  _project_id?: Maybe<Scalars['String']>
}

export type Jsonb_Cast_Exp = {
  String?: Maybe<String_Comparison_Exp>
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: Maybe<Jsonb_Cast_Exp>
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>
  _eq?: Maybe<Scalars['jsonb']>
  _gt?: Maybe<Scalars['jsonb']>
  _gte?: Maybe<Scalars['jsonb']>
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>
  _in?: Maybe<Array<Scalars['jsonb']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['jsonb']>
  _lte?: Maybe<Scalars['jsonb']>
  _neq?: Maybe<Scalars['jsonb']>
  _nin?: Maybe<Array<Scalars['jsonb']>>
}

export type List_Projects_Metadata_Random_Args = {
  seed?: Maybe<Scalars['seed_float']>
}

/** columns and relationships of "media" */
export type Media = {
  __typename?: 'media'
  bucket_name: Scalars['String']
  file_path: Scalars['String']
  id: Scalars['Int']
  metadata?: Maybe<Scalars['jsonb']>
  owner_id?: Maybe<Scalars['String']>
  /** A computed field, executes function "media_url" */
  url?: Maybe<Scalars['String']>
}

/** columns and relationships of "media" */
export type MediaMetadataArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "media" */
export type Media_Aggregate = {
  __typename?: 'media_aggregate'
  aggregate?: Maybe<Media_Aggregate_Fields>
  nodes: Array<Media>
}

/** aggregate fields of "media" */
export type Media_Aggregate_Fields = {
  __typename?: 'media_aggregate_fields'
  avg?: Maybe<Media_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Media_Max_Fields>
  min?: Maybe<Media_Min_Fields>
  stddev?: Maybe<Media_Stddev_Fields>
  stddev_pop?: Maybe<Media_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Media_Stddev_Samp_Fields>
  sum?: Maybe<Media_Sum_Fields>
  var_pop?: Maybe<Media_Var_Pop_Fields>
  var_samp?: Maybe<Media_Var_Samp_Fields>
  variance?: Maybe<Media_Variance_Fields>
}

/** aggregate fields of "media" */
export type Media_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Media_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Media_Append_Input = {
  metadata?: Maybe<Scalars['jsonb']>
}

/** aggregate avg on columns */
export type Media_Avg_Fields = {
  __typename?: 'media_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "media". All fields are combined with a logical 'AND'. */
export type Media_Bool_Exp = {
  _and?: Maybe<Array<Media_Bool_Exp>>
  _not?: Maybe<Media_Bool_Exp>
  _or?: Maybe<Array<Media_Bool_Exp>>
  bucket_name?: Maybe<String_Comparison_Exp>
  file_path?: Maybe<String_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  metadata?: Maybe<Jsonb_Comparison_Exp>
  owner_id?: Maybe<String_Comparison_Exp>
  url?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "media" */
export enum Media_Constraint {
  /** unique or primary key constraint on columns "file_path", "bucket_name" */
  MediaBucketNameFilePathKey = 'media_bucket_name_file_path_key',
  /** unique or primary key constraint on columns "id" */
  MediaPkey = 'media_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Media_Delete_At_Path_Input = {
  metadata?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Media_Delete_Elem_Input = {
  metadata?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Media_Delete_Key_Input = {
  metadata?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "media" */
export type Media_Inc_Input = {
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "media" */
export type Media_Insert_Input = {
  bucket_name?: Maybe<Scalars['String']>
  file_path?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  metadata?: Maybe<Scalars['jsonb']>
  owner_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Media_Max_Fields = {
  __typename?: 'media_max_fields'
  bucket_name?: Maybe<Scalars['String']>
  file_path?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  owner_id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Media_Min_Fields = {
  __typename?: 'media_min_fields'
  bucket_name?: Maybe<Scalars['String']>
  file_path?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  owner_id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "media" */
export type Media_Mutation_Response = {
  __typename?: 'media_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Media>
}

/** input type for inserting object relation for remote table "media" */
export type Media_Obj_Rel_Insert_Input = {
  data: Media_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Media_On_Conflict>
}

/** on_conflict condition type for table "media" */
export type Media_On_Conflict = {
  constraint: Media_Constraint
  update_columns?: Array<Media_Update_Column>
  where?: Maybe<Media_Bool_Exp>
}

/** Ordering options when selecting data from "media". */
export type Media_Order_By = {
  bucket_name?: Maybe<Order_By>
  file_path?: Maybe<Order_By>
  id?: Maybe<Order_By>
  metadata?: Maybe<Order_By>
  owner_id?: Maybe<Order_By>
  url?: Maybe<Order_By>
}

/** primary key columns input for table: media */
export type Media_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Media_Prepend_Input = {
  metadata?: Maybe<Scalars['jsonb']>
}

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
  OwnerId = 'owner_id',
}

/** input type for updating data in table "media" */
export type Media_Set_Input = {
  bucket_name?: Maybe<Scalars['String']>
  file_path?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  metadata?: Maybe<Scalars['jsonb']>
  owner_id?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Media_Stddev_Fields = {
  __typename?: 'media_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Media_Stddev_Pop_Fields = {
  __typename?: 'media_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Media_Stddev_Samp_Fields = {
  __typename?: 'media_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "media" */
export type Media_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Media_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Media_Stream_Cursor_Value_Input = {
  bucket_name?: Maybe<Scalars['String']>
  file_path?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  metadata?: Maybe<Scalars['jsonb']>
  owner_id?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Media_Sum_Fields = {
  __typename?: 'media_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "media" */
export enum Media_Update_Column {
  /** column name */
  BucketName = 'bucket_name',
  /** column name */
  FilePath = 'file_path',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  OwnerId = 'owner_id',
}

export type Media_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Media_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Media_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Media_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Media_Delete_Key_Input>
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Media_Inc_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Media_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Media_Set_Input>
  where: Media_Bool_Exp
}

/** aggregate var_pop on columns */
export type Media_Var_Pop_Fields = {
  __typename?: 'media_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Media_Var_Samp_Fields = {
  __typename?: 'media_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Media_Variance_Fields = {
  __typename?: 'media_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "minter_filters_metadata" */
export type Minter_Filters_Metadata = {
  __typename?: 'minter_filters_metadata'
  address: Scalars['String']
  /** An array relationship */
  allowed_minters: Array<Minters_Metadata>
  /** An aggregate relationship */
  allowed_minters_aggregate: Minters_Metadata_Aggregate
}

/** columns and relationships of "minter_filters_metadata" */
export type Minter_Filters_MetadataAllowed_MintersArgs = {
  distinct_on?: Maybe<Array<Minters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minters_Metadata_Order_By>>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

/** columns and relationships of "minter_filters_metadata" */
export type Minter_Filters_MetadataAllowed_Minters_AggregateArgs = {
  distinct_on?: Maybe<Array<Minters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minters_Metadata_Order_By>>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

/** aggregated selection of "minter_filters_metadata" */
export type Minter_Filters_Metadata_Aggregate = {
  __typename?: 'minter_filters_metadata_aggregate'
  aggregate?: Maybe<Minter_Filters_Metadata_Aggregate_Fields>
  nodes: Array<Minter_Filters_Metadata>
}

/** aggregate fields of "minter_filters_metadata" */
export type Minter_Filters_Metadata_Aggregate_Fields = {
  __typename?: 'minter_filters_metadata_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Minter_Filters_Metadata_Max_Fields>
  min?: Maybe<Minter_Filters_Metadata_Min_Fields>
}

/** aggregate fields of "minter_filters_metadata" */
export type Minter_Filters_Metadata_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Minter_Filters_Metadata_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "minter_filters_metadata". All fields are combined with a logical 'AND'. */
export type Minter_Filters_Metadata_Bool_Exp = {
  _and?: Maybe<Array<Minter_Filters_Metadata_Bool_Exp>>
  _not?: Maybe<Minter_Filters_Metadata_Bool_Exp>
  _or?: Maybe<Array<Minter_Filters_Metadata_Bool_Exp>>
  address?: Maybe<String_Comparison_Exp>
  allowed_minters?: Maybe<Minters_Metadata_Bool_Exp>
}

/** unique or primary key constraints on table "minter_filters_metadata" */
export enum Minter_Filters_Metadata_Constraint {
  /** unique or primary key constraint on columns "address" */
  MinterFiltersMetadataPkey = 'minter_filters_metadata_pkey',
}

/** input type for inserting data into table "minter_filters_metadata" */
export type Minter_Filters_Metadata_Insert_Input = {
  address?: Maybe<Scalars['String']>
  allowed_minters?: Maybe<Minters_Metadata_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Minter_Filters_Metadata_Max_Fields = {
  __typename?: 'minter_filters_metadata_max_fields'
  address?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Minter_Filters_Metadata_Min_Fields = {
  __typename?: 'minter_filters_metadata_min_fields'
  address?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "minter_filters_metadata" */
export type Minter_Filters_Metadata_Mutation_Response = {
  __typename?: 'minter_filters_metadata_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Minter_Filters_Metadata>
}

/** input type for inserting object relation for remote table "minter_filters_metadata" */
export type Minter_Filters_Metadata_Obj_Rel_Insert_Input = {
  data: Minter_Filters_Metadata_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Minter_Filters_Metadata_On_Conflict>
}

/** on_conflict condition type for table "minter_filters_metadata" */
export type Minter_Filters_Metadata_On_Conflict = {
  constraint: Minter_Filters_Metadata_Constraint
  update_columns?: Array<Minter_Filters_Metadata_Update_Column>
  where?: Maybe<Minter_Filters_Metadata_Bool_Exp>
}

/** Ordering options when selecting data from "minter_filters_metadata". */
export type Minter_Filters_Metadata_Order_By = {
  address?: Maybe<Order_By>
  allowed_minters_aggregate?: Maybe<Minters_Metadata_Aggregate_Order_By>
}

/** primary key columns input for table: minter_filters_metadata */
export type Minter_Filters_Metadata_Pk_Columns_Input = {
  address: Scalars['String']
}

/** select columns of table "minter_filters_metadata" */
export enum Minter_Filters_Metadata_Select_Column {
  /** column name */
  Address = 'address',
}

/** input type for updating data in table "minter_filters_metadata" */
export type Minter_Filters_Metadata_Set_Input = {
  address?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "minter_filters_metadata" */
export type Minter_Filters_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Minter_Filters_Metadata_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Minter_Filters_Metadata_Stream_Cursor_Value_Input = {
  address?: Maybe<Scalars['String']>
}

/** update columns of table "minter_filters_metadata" */
export enum Minter_Filters_Metadata_Update_Column {
  /** column name */
  Address = 'address',
}

export type Minter_Filters_Metadata_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Minter_Filters_Metadata_Set_Input>
  where: Minter_Filters_Metadata_Bool_Exp
}

/** columns and relationships of "minter_type_names" */
export type Minter_Type_Names = {
  __typename?: 'minter_type_names'
  name: Scalars['String']
}

/** aggregated selection of "minter_type_names" */
export type Minter_Type_Names_Aggregate = {
  __typename?: 'minter_type_names_aggregate'
  aggregate?: Maybe<Minter_Type_Names_Aggregate_Fields>
  nodes: Array<Minter_Type_Names>
}

/** aggregate fields of "minter_type_names" */
export type Minter_Type_Names_Aggregate_Fields = {
  __typename?: 'minter_type_names_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Minter_Type_Names_Max_Fields>
  min?: Maybe<Minter_Type_Names_Min_Fields>
}

/** aggregate fields of "minter_type_names" */
export type Minter_Type_Names_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Minter_Type_Names_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "minter_type_names". All fields are combined with a logical 'AND'. */
export type Minter_Type_Names_Bool_Exp = {
  _and?: Maybe<Array<Minter_Type_Names_Bool_Exp>>
  _not?: Maybe<Minter_Type_Names_Bool_Exp>
  _or?: Maybe<Array<Minter_Type_Names_Bool_Exp>>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "minter_type_names" */
export enum Minter_Type_Names_Constraint {
  /** unique or primary key constraint on columns "name" */
  MinterTypeNamesPkey = 'minter_type_names_pkey',
}

export enum Minter_Type_Names_Enum {
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
  MinterSetPriceV2 = 'MinterSetPriceV2',
}

/** Boolean expression to compare columns of type "minter_type_names_enum". All fields are combined with logical 'AND'. */
export type Minter_Type_Names_Enum_Comparison_Exp = {
  _eq?: Maybe<Minter_Type_Names_Enum>
  _in?: Maybe<Array<Minter_Type_Names_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Minter_Type_Names_Enum>
  _nin?: Maybe<Array<Minter_Type_Names_Enum>>
}

/** input type for inserting data into table "minter_type_names" */
export type Minter_Type_Names_Insert_Input = {
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Minter_Type_Names_Max_Fields = {
  __typename?: 'minter_type_names_max_fields'
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Minter_Type_Names_Min_Fields = {
  __typename?: 'minter_type_names_min_fields'
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "minter_type_names" */
export type Minter_Type_Names_Mutation_Response = {
  __typename?: 'minter_type_names_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Minter_Type_Names>
}

/** on_conflict condition type for table "minter_type_names" */
export type Minter_Type_Names_On_Conflict = {
  constraint: Minter_Type_Names_Constraint
  update_columns?: Array<Minter_Type_Names_Update_Column>
  where?: Maybe<Minter_Type_Names_Bool_Exp>
}

/** Ordering options when selecting data from "minter_type_names". */
export type Minter_Type_Names_Order_By = {
  name?: Maybe<Order_By>
}

/** primary key columns input for table: minter_type_names */
export type Minter_Type_Names_Pk_Columns_Input = {
  name: Scalars['String']
}

/** select columns of table "minter_type_names" */
export enum Minter_Type_Names_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "minter_type_names" */
export type Minter_Type_Names_Set_Input = {
  name?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "minter_type_names" */
export type Minter_Type_Names_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Minter_Type_Names_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Minter_Type_Names_Stream_Cursor_Value_Input = {
  name?: Maybe<Scalars['String']>
}

/** update columns of table "minter_type_names" */
export enum Minter_Type_Names_Update_Column {
  /** column name */
  Name = 'name',
}

export type Minter_Type_Names_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Minter_Type_Names_Set_Input>
  where: Minter_Type_Names_Bool_Exp
}

/** columns and relationships of "minter_types" */
export type Minter_Types = {
  __typename?: 'minter_types'
  description_template: Scalars['String']
  label?: Maybe<Scalars['String']>
  type: Minter_Type_Names_Enum
  /** A computed field, executes function "minter_type_unversioned" */
  unversioned_type?: Maybe<Scalars['String']>
  /** A computed field, executes function "minter_type_version_number" */
  version_number?: Maybe<Scalars['Int']>
}

/** aggregated selection of "minter_types" */
export type Minter_Types_Aggregate = {
  __typename?: 'minter_types_aggregate'
  aggregate?: Maybe<Minter_Types_Aggregate_Fields>
  nodes: Array<Minter_Types>
}

/** aggregate fields of "minter_types" */
export type Minter_Types_Aggregate_Fields = {
  __typename?: 'minter_types_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Minter_Types_Max_Fields>
  min?: Maybe<Minter_Types_Min_Fields>
}

/** aggregate fields of "minter_types" */
export type Minter_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Minter_Types_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "minter_types". All fields are combined with a logical 'AND'. */
export type Minter_Types_Bool_Exp = {
  _and?: Maybe<Array<Minter_Types_Bool_Exp>>
  _not?: Maybe<Minter_Types_Bool_Exp>
  _or?: Maybe<Array<Minter_Types_Bool_Exp>>
  description_template?: Maybe<String_Comparison_Exp>
  label?: Maybe<String_Comparison_Exp>
  type?: Maybe<Minter_Type_Names_Enum_Comparison_Exp>
  unversioned_type?: Maybe<String_Comparison_Exp>
  version_number?: Maybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "minter_types" */
export enum Minter_Types_Constraint {
  /** unique or primary key constraint on columns "type" */
  MinterTypesPkey = 'minter_types_pkey',
}

/** input type for inserting data into table "minter_types" */
export type Minter_Types_Insert_Input = {
  description_template?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  type?: Maybe<Minter_Type_Names_Enum>
}

/** aggregate max on columns */
export type Minter_Types_Max_Fields = {
  __typename?: 'minter_types_max_fields'
  description_template?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Minter_Types_Min_Fields = {
  __typename?: 'minter_types_min_fields'
  description_template?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "minter_types" */
export type Minter_Types_Mutation_Response = {
  __typename?: 'minter_types_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Minter_Types>
}

/** input type for inserting object relation for remote table "minter_types" */
export type Minter_Types_Obj_Rel_Insert_Input = {
  data: Minter_Types_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Minter_Types_On_Conflict>
}

/** on_conflict condition type for table "minter_types" */
export type Minter_Types_On_Conflict = {
  constraint: Minter_Types_Constraint
  update_columns?: Array<Minter_Types_Update_Column>
  where?: Maybe<Minter_Types_Bool_Exp>
}

/** Ordering options when selecting data from "minter_types". */
export type Minter_Types_Order_By = {
  description_template?: Maybe<Order_By>
  label?: Maybe<Order_By>
  type?: Maybe<Order_By>
  unversioned_type?: Maybe<Order_By>
  version_number?: Maybe<Order_By>
}

/** primary key columns input for table: minter_types */
export type Minter_Types_Pk_Columns_Input = {
  type: Minter_Type_Names_Enum
}

/** select columns of table "minter_types" */
export enum Minter_Types_Select_Column {
  /** column name */
  DescriptionTemplate = 'description_template',
  /** column name */
  Label = 'label',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "minter_types" */
export type Minter_Types_Set_Input = {
  description_template?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  type?: Maybe<Minter_Type_Names_Enum>
}

/** Streaming cursor of the table "minter_types" */
export type Minter_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Minter_Types_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Minter_Types_Stream_Cursor_Value_Input = {
  description_template?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  type?: Maybe<Minter_Type_Names_Enum>
}

/** update columns of table "minter_types" */
export enum Minter_Types_Update_Column {
  /** column name */
  DescriptionTemplate = 'description_template',
  /** column name */
  Label = 'label',
  /** column name */
  Type = 'type',
}

export type Minter_Types_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Minter_Types_Set_Input>
  where: Minter_Types_Bool_Exp
}

/** columns and relationships of "minters_metadata" */
export type Minters_Metadata = {
  __typename?: 'minters_metadata'
  address: Scalars['String']
  /** An object relationship */
  core_contract?: Maybe<Contracts_Metadata>
  core_contract_address: Scalars['String']
  extra_minter_details?: Maybe<Scalars['jsonb']>
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  /** An object relationship */
  minter_filter?: Maybe<Minter_Filters_Metadata>
  minter_filter_address: Scalars['String']
  minter_type: Minter_Type_Names_Enum
  /** An object relationship */
  type?: Maybe<Minter_Types>
}

/** columns and relationships of "minters_metadata" */
export type Minters_MetadataExtra_Minter_DetailsArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "minters_metadata" */
export type Minters_Metadata_Aggregate = {
  __typename?: 'minters_metadata_aggregate'
  aggregate?: Maybe<Minters_Metadata_Aggregate_Fields>
  nodes: Array<Minters_Metadata>
}

/** aggregate fields of "minters_metadata" */
export type Minters_Metadata_Aggregate_Fields = {
  __typename?: 'minters_metadata_aggregate_fields'
  avg?: Maybe<Minters_Metadata_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Minters_Metadata_Max_Fields>
  min?: Maybe<Minters_Metadata_Min_Fields>
  stddev?: Maybe<Minters_Metadata_Stddev_Fields>
  stddev_pop?: Maybe<Minters_Metadata_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Minters_Metadata_Stddev_Samp_Fields>
  sum?: Maybe<Minters_Metadata_Sum_Fields>
  var_pop?: Maybe<Minters_Metadata_Var_Pop_Fields>
  var_samp?: Maybe<Minters_Metadata_Var_Samp_Fields>
  variance?: Maybe<Minters_Metadata_Variance_Fields>
}

/** aggregate fields of "minters_metadata" */
export type Minters_Metadata_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Minters_Metadata_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "minters_metadata" */
export type Minters_Metadata_Aggregate_Order_By = {
  avg?: Maybe<Minters_Metadata_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Minters_Metadata_Max_Order_By>
  min?: Maybe<Minters_Metadata_Min_Order_By>
  stddev?: Maybe<Minters_Metadata_Stddev_Order_By>
  stddev_pop?: Maybe<Minters_Metadata_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Minters_Metadata_Stddev_Samp_Order_By>
  sum?: Maybe<Minters_Metadata_Sum_Order_By>
  var_pop?: Maybe<Minters_Metadata_Var_Pop_Order_By>
  var_samp?: Maybe<Minters_Metadata_Var_Samp_Order_By>
  variance?: Maybe<Minters_Metadata_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Minters_Metadata_Append_Input = {
  extra_minter_details?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "minters_metadata" */
export type Minters_Metadata_Arr_Rel_Insert_Input = {
  data: Array<Minters_Metadata_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Minters_Metadata_On_Conflict>
}

/** aggregate avg on columns */
export type Minters_Metadata_Avg_Fields = {
  __typename?: 'minters_metadata_avg_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Float']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "minters_metadata" */
export type Minters_Metadata_Avg_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "minters_metadata". All fields are combined with a logical 'AND'. */
export type Minters_Metadata_Bool_Exp = {
  _and?: Maybe<Array<Minters_Metadata_Bool_Exp>>
  _not?: Maybe<Minters_Metadata_Bool_Exp>
  _or?: Maybe<Array<Minters_Metadata_Bool_Exp>>
  address?: Maybe<String_Comparison_Exp>
  core_contract?: Maybe<Contracts_Metadata_Bool_Exp>
  core_contract_address?: Maybe<String_Comparison_Exp>
  extra_minter_details?: Maybe<Jsonb_Comparison_Exp>
  maximum_price_decay_half_life_in_seconds?: Maybe<Int_Comparison_Exp>
  minimum_auction_length_in_seconds?: Maybe<Int_Comparison_Exp>
  minimum_price_decay_half_life_in_seconds?: Maybe<Int_Comparison_Exp>
  minter_filter?: Maybe<Minter_Filters_Metadata_Bool_Exp>
  minter_filter_address?: Maybe<String_Comparison_Exp>
  minter_type?: Maybe<Minter_Type_Names_Enum_Comparison_Exp>
  type?: Maybe<Minter_Types_Bool_Exp>
}

/** unique or primary key constraints on table "minters_metadata" */
export enum Minters_Metadata_Constraint {
  /** unique or primary key constraint on columns "address" */
  MintersMetadataPkey = 'minters_metadata_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Minters_Metadata_Delete_At_Path_Input = {
  extra_minter_details?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Minters_Metadata_Delete_Elem_Input = {
  extra_minter_details?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Minters_Metadata_Delete_Key_Input = {
  extra_minter_details?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "minters_metadata" */
export type Minters_Metadata_Inc_Input = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "minters_metadata" */
export type Minters_Metadata_Insert_Input = {
  address?: Maybe<Scalars['String']>
  core_contract?: Maybe<Contracts_Metadata_Obj_Rel_Insert_Input>
  core_contract_address?: Maybe<Scalars['String']>
  extra_minter_details?: Maybe<Scalars['jsonb']>
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minter_filter?: Maybe<Minter_Filters_Metadata_Obj_Rel_Insert_Input>
  minter_filter_address?: Maybe<Scalars['String']>
  minter_type?: Maybe<Minter_Type_Names_Enum>
  type?: Maybe<Minter_Types_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Minters_Metadata_Max_Fields = {
  __typename?: 'minters_metadata_max_fields'
  address?: Maybe<Scalars['String']>
  core_contract_address?: Maybe<Scalars['String']>
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minter_filter_address?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "minters_metadata" */
export type Minters_Metadata_Max_Order_By = {
  address?: Maybe<Order_By>
  core_contract_address?: Maybe<Order_By>
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minter_filter_address?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Minters_Metadata_Min_Fields = {
  __typename?: 'minters_metadata_min_fields'
  address?: Maybe<Scalars['String']>
  core_contract_address?: Maybe<Scalars['String']>
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minter_filter_address?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "minters_metadata" */
export type Minters_Metadata_Min_Order_By = {
  address?: Maybe<Order_By>
  core_contract_address?: Maybe<Order_By>
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minter_filter_address?: Maybe<Order_By>
}

/** response of any mutation on the table "minters_metadata" */
export type Minters_Metadata_Mutation_Response = {
  __typename?: 'minters_metadata_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Minters_Metadata>
}

/** input type for inserting object relation for remote table "minters_metadata" */
export type Minters_Metadata_Obj_Rel_Insert_Input = {
  data: Minters_Metadata_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Minters_Metadata_On_Conflict>
}

/** on_conflict condition type for table "minters_metadata" */
export type Minters_Metadata_On_Conflict = {
  constraint: Minters_Metadata_Constraint
  update_columns?: Array<Minters_Metadata_Update_Column>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

/** Ordering options when selecting data from "minters_metadata". */
export type Minters_Metadata_Order_By = {
  address?: Maybe<Order_By>
  core_contract?: Maybe<Contracts_Metadata_Order_By>
  core_contract_address?: Maybe<Order_By>
  extra_minter_details?: Maybe<Order_By>
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minter_filter?: Maybe<Minter_Filters_Metadata_Order_By>
  minter_filter_address?: Maybe<Order_By>
  minter_type?: Maybe<Order_By>
  type?: Maybe<Minter_Types_Order_By>
}

/** primary key columns input for table: minters_metadata */
export type Minters_Metadata_Pk_Columns_Input = {
  address: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Minters_Metadata_Prepend_Input = {
  extra_minter_details?: Maybe<Scalars['jsonb']>
}

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
  MinterType = 'minter_type',
}

/** input type for updating data in table "minters_metadata" */
export type Minters_Metadata_Set_Input = {
  address?: Maybe<Scalars['String']>
  core_contract_address?: Maybe<Scalars['String']>
  extra_minter_details?: Maybe<Scalars['jsonb']>
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minter_filter_address?: Maybe<Scalars['String']>
  minter_type?: Maybe<Minter_Type_Names_Enum>
}

/** aggregate stddev on columns */
export type Minters_Metadata_Stddev_Fields = {
  __typename?: 'minters_metadata_stddev_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Float']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "minters_metadata" */
export type Minters_Metadata_Stddev_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Minters_Metadata_Stddev_Pop_Fields = {
  __typename?: 'minters_metadata_stddev_pop_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Float']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "minters_metadata" */
export type Minters_Metadata_Stddev_Pop_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Minters_Metadata_Stddev_Samp_Fields = {
  __typename?: 'minters_metadata_stddev_samp_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Float']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "minters_metadata" */
export type Minters_Metadata_Stddev_Samp_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** Streaming cursor of the table "minters_metadata" */
export type Minters_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Minters_Metadata_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Minters_Metadata_Stream_Cursor_Value_Input = {
  address?: Maybe<Scalars['String']>
  core_contract_address?: Maybe<Scalars['String']>
  extra_minter_details?: Maybe<Scalars['jsonb']>
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minter_filter_address?: Maybe<Scalars['String']>
  minter_type?: Maybe<Minter_Type_Names_Enum>
}

/** aggregate sum on columns */
export type Minters_Metadata_Sum_Fields = {
  __typename?: 'minters_metadata_sum_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Int']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "minters_metadata" */
export type Minters_Metadata_Sum_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** update columns of table "minters_metadata" */
export enum Minters_Metadata_Update_Column {
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
  MinterType = 'minter_type',
}

export type Minters_Metadata_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Minters_Metadata_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Minters_Metadata_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Minters_Metadata_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Minters_Metadata_Delete_Key_Input>
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Minters_Metadata_Inc_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Minters_Metadata_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Minters_Metadata_Set_Input>
  where: Minters_Metadata_Bool_Exp
}

/** aggregate var_pop on columns */
export type Minters_Metadata_Var_Pop_Fields = {
  __typename?: 'minters_metadata_var_pop_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Float']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "minters_metadata" */
export type Minters_Metadata_Var_Pop_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Minters_Metadata_Var_Samp_Fields = {
  __typename?: 'minters_metadata_var_samp_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Float']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "minters_metadata" */
export type Minters_Metadata_Var_Samp_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Minters_Metadata_Variance_Fields = {
  __typename?: 'minters_metadata_variance_fields'
  maximum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
  minimum_auction_length_in_seconds?: Maybe<Scalars['Float']>
  minimum_price_decay_half_life_in_seconds?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "minters_metadata" */
export type Minters_Metadata_Variance_Order_By = {
  maximum_price_decay_half_life_in_seconds?: Maybe<Order_By>
  minimum_auction_length_in_seconds?: Maybe<Order_By>
  minimum_price_decay_half_life_in_seconds?: Maybe<Order_By>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  createApplication: Scalars['uuid']
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>
  /** delete data from the table: "contract_allowlistings" */
  delete_contract_allowlistings?: Maybe<Contract_Allowlistings_Mutation_Response>
  /** delete single row from the table: "contract_allowlistings" */
  delete_contract_allowlistings_by_pk?: Maybe<Contract_Allowlistings>
  /** delete data from the table: "contract_type_names" */
  delete_contract_type_names?: Maybe<Contract_Type_Names_Mutation_Response>
  /** delete single row from the table: "contract_type_names" */
  delete_contract_type_names_by_pk?: Maybe<Contract_Type_Names>
  /** delete data from the table: "contract_types" */
  delete_contract_types?: Maybe<Contract_Types_Mutation_Response>
  /** delete single row from the table: "contract_types" */
  delete_contract_types_by_pk?: Maybe<Contract_Types>
  /** delete data from the table: "contracts_metadata" */
  delete_contracts_metadata?: Maybe<Contracts_Metadata_Mutation_Response>
  /** delete single row from the table: "contracts_metadata" */
  delete_contracts_metadata_by_pk?: Maybe<Contracts_Metadata>
  /** delete data from the table: "curation_statuses" */
  delete_curation_statuses?: Maybe<Curation_Statuses_Mutation_Response>
  /** delete single row from the table: "curation_statuses" */
  delete_curation_statuses_by_pk?: Maybe<Curation_Statuses>
  /** delete data from the table: "entity_tags" */
  delete_entity_tags?: Maybe<Entity_Tags_Mutation_Response>
  /** delete single row from the table: "entity_tags" */
  delete_entity_tags_by_pk?: Maybe<Entity_Tags>
  /** delete data from the table: "favorites" */
  delete_favorites?: Maybe<Favorites_Mutation_Response>
  /** delete single row from the table: "favorites" */
  delete_favorites_by_pk?: Maybe<Favorites>
  /** delete data from the table: "feature_field_values_counts" */
  delete_feature_field_values_counts?: Maybe<Feature_Field_Values_Counts_Mutation_Response>
  /** delete data from the table: "feature_flags" */
  delete_feature_flags?: Maybe<Feature_Flags_Mutation_Response>
  /** delete single row from the table: "feature_flags" */
  delete_feature_flags_by_pk?: Maybe<Feature_Flags>
  /** delete data from the table: "media" */
  delete_media?: Maybe<Media_Mutation_Response>
  /** delete single row from the table: "media" */
  delete_media_by_pk?: Maybe<Media>
  /** delete data from the table: "minter_filters_metadata" */
  delete_minter_filters_metadata?: Maybe<Minter_Filters_Metadata_Mutation_Response>
  /** delete single row from the table: "minter_filters_metadata" */
  delete_minter_filters_metadata_by_pk?: Maybe<Minter_Filters_Metadata>
  /** delete data from the table: "minter_type_names" */
  delete_minter_type_names?: Maybe<Minter_Type_Names_Mutation_Response>
  /** delete single row from the table: "minter_type_names" */
  delete_minter_type_names_by_pk?: Maybe<Minter_Type_Names>
  /** delete data from the table: "minter_types" */
  delete_minter_types?: Maybe<Minter_Types_Mutation_Response>
  /** delete single row from the table: "minter_types" */
  delete_minter_types_by_pk?: Maybe<Minter_Types>
  /** delete data from the table: "minters_metadata" */
  delete_minters_metadata?: Maybe<Minters_Metadata_Mutation_Response>
  /** delete single row from the table: "minters_metadata" */
  delete_minters_metadata_by_pk?: Maybe<Minters_Metadata>
  /** delete data from the table: "notifications" */
  delete_notifications?: Maybe<Notifications_Mutation_Response>
  /** delete single row from the table: "notifications" */
  delete_notifications_by_pk?: Maybe<Notifications>
  /** delete data from the table: "project_external_asset_dependencies" */
  delete_project_external_asset_dependencies?: Maybe<Project_External_Asset_Dependencies_Mutation_Response>
  /** delete single row from the table: "project_external_asset_dependencies" */
  delete_project_external_asset_dependencies_by_pk?: Maybe<Project_External_Asset_Dependencies>
  /** delete data from the table: "project_external_asset_dependency_types" */
  delete_project_external_asset_dependency_types?: Maybe<Project_External_Asset_Dependency_Types_Mutation_Response>
  /** delete single row from the table: "project_external_asset_dependency_types" */
  delete_project_external_asset_dependency_types_by_pk?: Maybe<Project_External_Asset_Dependency_Types>
  /** delete data from the table: "project_minter_configurations" */
  delete_project_minter_configurations?: Maybe<Project_Minter_Configurations_Mutation_Response>
  /** delete single row from the table: "project_minter_configurations" */
  delete_project_minter_configurations_by_pk?: Maybe<Project_Minter_Configurations>
  /** delete data from the table: "project_scripts" */
  delete_project_scripts?: Maybe<Project_Scripts_Mutation_Response>
  /** delete single row from the table: "project_scripts" */
  delete_project_scripts_by_pk?: Maybe<Project_Scripts>
  /** delete data from the table: "project_series" */
  delete_project_series?: Maybe<Project_Series_Mutation_Response>
  /** delete single row from the table: "project_series" */
  delete_project_series_by_pk?: Maybe<Project_Series>
  /** delete data from the table: "project_vertical_categories" */
  delete_project_vertical_categories?: Maybe<Project_Vertical_Categories_Mutation_Response>
  /** delete single row from the table: "project_vertical_categories" */
  delete_project_vertical_categories_by_pk?: Maybe<Project_Vertical_Categories>
  /** delete data from the table: "project_verticals" */
  delete_project_verticals?: Maybe<Project_Verticals_Mutation_Response>
  /** delete single row from the table: "project_verticals" */
  delete_project_verticals_by_pk?: Maybe<Project_Verticals>
  /** delete data from the table: "projects_features" */
  delete_projects_features?: Maybe<Projects_Features_Mutation_Response>
  /** delete single row from the table: "projects_features" */
  delete_projects_features_by_pk?: Maybe<Projects_Features>
  /** delete data from the table: "projects_features_private" */
  delete_projects_features_private?: Maybe<Projects_Features_Private_Mutation_Response>
  /** delete data from the table: "projects_metadata" */
  delete_projects_metadata?: Maybe<Projects_Metadata_Mutation_Response>
  /** delete single row from the table: "projects_metadata" */
  delete_projects_metadata_by_pk?: Maybe<Projects_Metadata>
  /** delete data from the table: "proposed_artist_addresses_and_splits" */
  delete_proposed_artist_addresses_and_splits?: Maybe<Proposed_Artist_Addresses_And_Splits_Mutation_Response>
  /** delete single row from the table: "proposed_artist_addresses_and_splits" */
  delete_proposed_artist_addresses_and_splits_by_pk?: Maybe<Proposed_Artist_Addresses_And_Splits>
  /** delete data from the table: "screenings" */
  delete_screenings?: Maybe<Screenings_Mutation_Response>
  /** delete single row from the table: "screenings" */
  delete_screenings_by_pk?: Maybe<Screenings>
  /** delete data from the table: "sync_status" */
  delete_sync_status?: Maybe<Sync_Status_Mutation_Response>
  /** delete single row from the table: "sync_status" */
  delete_sync_status_by_pk?: Maybe<Sync_Status>
  /** delete data from the table: "tag_groupings" */
  delete_tag_groupings?: Maybe<Tag_Groupings_Mutation_Response>
  /** delete single row from the table: "tag_groupings" */
  delete_tag_groupings_by_pk?: Maybe<Tag_Groupings>
  /** delete data from the table: "tag_status" */
  delete_tag_status?: Maybe<Tag_Status_Mutation_Response>
  /** delete single row from the table: "tag_status" */
  delete_tag_status_by_pk?: Maybe<Tag_Status>
  /** delete data from the table: "tag_types" */
  delete_tag_types?: Maybe<Tag_Types_Mutation_Response>
  /** delete single row from the table: "tag_types" */
  delete_tag_types_by_pk?: Maybe<Tag_Types>
  /** delete data from the table: "tags" */
  delete_tags?: Maybe<Tags_Mutation_Response>
  /** delete single row from the table: "tags" */
  delete_tags_by_pk?: Maybe<Tags>
  /** delete data from the table: "terms_of_service" */
  delete_terms_of_service?: Maybe<Terms_Of_Service_Mutation_Response>
  /** delete single row from the table: "terms_of_service" */
  delete_terms_of_service_by_pk?: Maybe<Terms_Of_Service>
  /** delete data from the table: "tokens_metadata" */
  delete_tokens_metadata?: Maybe<Tokens_Metadata_Mutation_Response>
  /** delete single row from the table: "tokens_metadata" */
  delete_tokens_metadata_by_pk?: Maybe<Tokens_Metadata>
  /** delete data from the table: "user_profiles" */
  delete_user_profiles?: Maybe<User_Profiles_Mutation_Response>
  /** delete single row from the table: "user_profiles" */
  delete_user_profiles_by_pk?: Maybe<User_Profiles>
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** delete data from the table: "verticals" */
  delete_verticals?: Maybe<Verticals_Mutation_Response>
  /** delete single row from the table: "verticals" */
  delete_verticals_by_pk?: Maybe<Verticals>
  /** delete data from the table: "webflow_artist_info" */
  delete_webflow_artist_info?: Maybe<Webflow_Artist_Info_Mutation_Response>
  /** delete single row from the table: "webflow_artist_info" */
  delete_webflow_artist_info_by_pk?: Maybe<Webflow_Artist_Info>
  /** delete data from the table: "webflow_spectrum_articles" */
  delete_webflow_spectrum_articles?: Maybe<Webflow_Spectrum_Articles_Mutation_Response>
  /** delete single row from the table: "webflow_spectrum_articles" */
  delete_webflow_spectrum_articles_by_pk?: Maybe<Webflow_Spectrum_Articles>
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>
  /** insert data into the table: "contract_allowlistings" */
  insert_contract_allowlistings?: Maybe<Contract_Allowlistings_Mutation_Response>
  /** insert a single row into the table: "contract_allowlistings" */
  insert_contract_allowlistings_one?: Maybe<Contract_Allowlistings>
  /** insert data into the table: "contract_type_names" */
  insert_contract_type_names?: Maybe<Contract_Type_Names_Mutation_Response>
  /** insert a single row into the table: "contract_type_names" */
  insert_contract_type_names_one?: Maybe<Contract_Type_Names>
  /** insert data into the table: "contract_types" */
  insert_contract_types?: Maybe<Contract_Types_Mutation_Response>
  /** insert a single row into the table: "contract_types" */
  insert_contract_types_one?: Maybe<Contract_Types>
  /** insert data into the table: "contracts_metadata" */
  insert_contracts_metadata?: Maybe<Contracts_Metadata_Mutation_Response>
  /** insert a single row into the table: "contracts_metadata" */
  insert_contracts_metadata_one?: Maybe<Contracts_Metadata>
  /** insert data into the table: "curation_statuses" */
  insert_curation_statuses?: Maybe<Curation_Statuses_Mutation_Response>
  /** insert a single row into the table: "curation_statuses" */
  insert_curation_statuses_one?: Maybe<Curation_Statuses>
  /** insert data into the table: "entity_tags" */
  insert_entity_tags?: Maybe<Entity_Tags_Mutation_Response>
  /** insert a single row into the table: "entity_tags" */
  insert_entity_tags_one?: Maybe<Entity_Tags>
  /** insert data into the table: "favorites" */
  insert_favorites?: Maybe<Favorites_Mutation_Response>
  /** insert a single row into the table: "favorites" */
  insert_favorites_one?: Maybe<Favorites>
  /** insert data into the table: "feature_field_values_counts" */
  insert_feature_field_values_counts?: Maybe<Feature_Field_Values_Counts_Mutation_Response>
  /** insert a single row into the table: "feature_field_values_counts" */
  insert_feature_field_values_counts_one?: Maybe<Feature_Field_Values_Counts>
  /** insert data into the table: "feature_flags" */
  insert_feature_flags?: Maybe<Feature_Flags_Mutation_Response>
  /** insert a single row into the table: "feature_flags" */
  insert_feature_flags_one?: Maybe<Feature_Flags>
  /** insert data into the table: "media" */
  insert_media?: Maybe<Media_Mutation_Response>
  /** insert a single row into the table: "media" */
  insert_media_one?: Maybe<Media>
  /** insert data into the table: "minter_filters_metadata" */
  insert_minter_filters_metadata?: Maybe<Minter_Filters_Metadata_Mutation_Response>
  /** insert a single row into the table: "minter_filters_metadata" */
  insert_minter_filters_metadata_one?: Maybe<Minter_Filters_Metadata>
  /** insert data into the table: "minter_type_names" */
  insert_minter_type_names?: Maybe<Minter_Type_Names_Mutation_Response>
  /** insert a single row into the table: "minter_type_names" */
  insert_minter_type_names_one?: Maybe<Minter_Type_Names>
  /** insert data into the table: "minter_types" */
  insert_minter_types?: Maybe<Minter_Types_Mutation_Response>
  /** insert a single row into the table: "minter_types" */
  insert_minter_types_one?: Maybe<Minter_Types>
  /** insert data into the table: "minters_metadata" */
  insert_minters_metadata?: Maybe<Minters_Metadata_Mutation_Response>
  /** insert a single row into the table: "minters_metadata" */
  insert_minters_metadata_one?: Maybe<Minters_Metadata>
  /** insert data into the table: "notifications" */
  insert_notifications?: Maybe<Notifications_Mutation_Response>
  /** insert a single row into the table: "notifications" */
  insert_notifications_one?: Maybe<Notifications>
  /** insert data into the table: "project_external_asset_dependencies" */
  insert_project_external_asset_dependencies?: Maybe<Project_External_Asset_Dependencies_Mutation_Response>
  /** insert a single row into the table: "project_external_asset_dependencies" */
  insert_project_external_asset_dependencies_one?: Maybe<Project_External_Asset_Dependencies>
  /** insert data into the table: "project_external_asset_dependency_types" */
  insert_project_external_asset_dependency_types?: Maybe<Project_External_Asset_Dependency_Types_Mutation_Response>
  /** insert a single row into the table: "project_external_asset_dependency_types" */
  insert_project_external_asset_dependency_types_one?: Maybe<Project_External_Asset_Dependency_Types>
  /** insert data into the table: "project_minter_configurations" */
  insert_project_minter_configurations?: Maybe<Project_Minter_Configurations_Mutation_Response>
  /** insert a single row into the table: "project_minter_configurations" */
  insert_project_minter_configurations_one?: Maybe<Project_Minter_Configurations>
  /** insert data into the table: "project_scripts" */
  insert_project_scripts?: Maybe<Project_Scripts_Mutation_Response>
  /** insert a single row into the table: "project_scripts" */
  insert_project_scripts_one?: Maybe<Project_Scripts>
  /** insert data into the table: "project_series" */
  insert_project_series?: Maybe<Project_Series_Mutation_Response>
  /** insert a single row into the table: "project_series" */
  insert_project_series_one?: Maybe<Project_Series>
  /** insert data into the table: "project_vertical_categories" */
  insert_project_vertical_categories?: Maybe<Project_Vertical_Categories_Mutation_Response>
  /** insert a single row into the table: "project_vertical_categories" */
  insert_project_vertical_categories_one?: Maybe<Project_Vertical_Categories>
  /** insert data into the table: "project_verticals" */
  insert_project_verticals?: Maybe<Project_Verticals_Mutation_Response>
  /** insert a single row into the table: "project_verticals" */
  insert_project_verticals_one?: Maybe<Project_Verticals>
  /** insert data into the table: "projects_features" */
  insert_projects_features?: Maybe<Projects_Features_Mutation_Response>
  /** insert a single row into the table: "projects_features" */
  insert_projects_features_one?: Maybe<Projects_Features>
  /** insert data into the table: "projects_features_private" */
  insert_projects_features_private?: Maybe<Projects_Features_Private_Mutation_Response>
  /** insert a single row into the table: "projects_features_private" */
  insert_projects_features_private_one?: Maybe<Projects_Features_Private>
  /** insert data into the table: "projects_metadata" */
  insert_projects_metadata?: Maybe<Projects_Metadata_Mutation_Response>
  /** insert a single row into the table: "projects_metadata" */
  insert_projects_metadata_one?: Maybe<Projects_Metadata>
  /** insert data into the table: "proposed_artist_addresses_and_splits" */
  insert_proposed_artist_addresses_and_splits?: Maybe<Proposed_Artist_Addresses_And_Splits_Mutation_Response>
  /** insert a single row into the table: "proposed_artist_addresses_and_splits" */
  insert_proposed_artist_addresses_and_splits_one?: Maybe<Proposed_Artist_Addresses_And_Splits>
  /** insert data into the table: "screenings" */
  insert_screenings?: Maybe<Screenings_Mutation_Response>
  /** insert a single row into the table: "screenings" */
  insert_screenings_one?: Maybe<Screenings>
  /** insert data into the table: "sync_status" */
  insert_sync_status?: Maybe<Sync_Status_Mutation_Response>
  /** insert a single row into the table: "sync_status" */
  insert_sync_status_one?: Maybe<Sync_Status>
  /** insert data into the table: "tag_groupings" */
  insert_tag_groupings?: Maybe<Tag_Groupings_Mutation_Response>
  /** insert a single row into the table: "tag_groupings" */
  insert_tag_groupings_one?: Maybe<Tag_Groupings>
  /** insert data into the table: "tag_status" */
  insert_tag_status?: Maybe<Tag_Status_Mutation_Response>
  /** insert a single row into the table: "tag_status" */
  insert_tag_status_one?: Maybe<Tag_Status>
  /** insert data into the table: "tag_types" */
  insert_tag_types?: Maybe<Tag_Types_Mutation_Response>
  /** insert a single row into the table: "tag_types" */
  insert_tag_types_one?: Maybe<Tag_Types>
  /** insert data into the table: "tags" */
  insert_tags?: Maybe<Tags_Mutation_Response>
  /** insert a single row into the table: "tags" */
  insert_tags_one?: Maybe<Tags>
  /** insert data into the table: "terms_of_service" */
  insert_terms_of_service?: Maybe<Terms_Of_Service_Mutation_Response>
  /** insert a single row into the table: "terms_of_service" */
  insert_terms_of_service_one?: Maybe<Terms_Of_Service>
  /** insert data into the table: "tokens_metadata" */
  insert_tokens_metadata?: Maybe<Tokens_Metadata_Mutation_Response>
  /** insert a single row into the table: "tokens_metadata" */
  insert_tokens_metadata_one?: Maybe<Tokens_Metadata>
  /** insert data into the table: "user_profiles" */
  insert_user_profiles?: Maybe<User_Profiles_Mutation_Response>
  /** insert a single row into the table: "user_profiles" */
  insert_user_profiles_one?: Maybe<User_Profiles>
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** insert data into the table: "verticals" */
  insert_verticals?: Maybe<Verticals_Mutation_Response>
  /** insert a single row into the table: "verticals" */
  insert_verticals_one?: Maybe<Verticals>
  /** insert data into the table: "webflow_artist_info" */
  insert_webflow_artist_info?: Maybe<Webflow_Artist_Info_Mutation_Response>
  /** insert a single row into the table: "webflow_artist_info" */
  insert_webflow_artist_info_one?: Maybe<Webflow_Artist_Info>
  /** insert data into the table: "webflow_spectrum_articles" */
  insert_webflow_spectrum_articles?: Maybe<Webflow_Spectrum_Articles_Mutation_Response>
  /** insert a single row into the table: "webflow_spectrum_articles" */
  insert_webflow_spectrum_articles_one?: Maybe<Webflow_Spectrum_Articles>
  updateFeatures?: Maybe<UpdateFeaturesScriptOutput>
  updateProjectMedia?: Maybe<UpdateProjectMediaScriptOutput>
  updateTokenMedia?: Maybe<UpdateTokenMediaScriptOutput>
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>
  /** update multiples rows of table: "categories" */
  update_categories_many?: Maybe<Array<Maybe<Categories_Mutation_Response>>>
  /** update data of the table: "contract_allowlistings" */
  update_contract_allowlistings?: Maybe<Contract_Allowlistings_Mutation_Response>
  /** update single row of the table: "contract_allowlistings" */
  update_contract_allowlistings_by_pk?: Maybe<Contract_Allowlistings>
  /** update multiples rows of table: "contract_allowlistings" */
  update_contract_allowlistings_many?: Maybe<
    Array<Maybe<Contract_Allowlistings_Mutation_Response>>
  >
  /** update data of the table: "contract_type_names" */
  update_contract_type_names?: Maybe<Contract_Type_Names_Mutation_Response>
  /** update single row of the table: "contract_type_names" */
  update_contract_type_names_by_pk?: Maybe<Contract_Type_Names>
  /** update multiples rows of table: "contract_type_names" */
  update_contract_type_names_many?: Maybe<
    Array<Maybe<Contract_Type_Names_Mutation_Response>>
  >
  /** update data of the table: "contract_types" */
  update_contract_types?: Maybe<Contract_Types_Mutation_Response>
  /** update single row of the table: "contract_types" */
  update_contract_types_by_pk?: Maybe<Contract_Types>
  /** update multiples rows of table: "contract_types" */
  update_contract_types_many?: Maybe<
    Array<Maybe<Contract_Types_Mutation_Response>>
  >
  /** update data of the table: "contracts_metadata" */
  update_contracts_metadata?: Maybe<Contracts_Metadata_Mutation_Response>
  /** update single row of the table: "contracts_metadata" */
  update_contracts_metadata_by_pk?: Maybe<Contracts_Metadata>
  /** update multiples rows of table: "contracts_metadata" */
  update_contracts_metadata_many?: Maybe<
    Array<Maybe<Contracts_Metadata_Mutation_Response>>
  >
  /** update data of the table: "curation_statuses" */
  update_curation_statuses?: Maybe<Curation_Statuses_Mutation_Response>
  /** update single row of the table: "curation_statuses" */
  update_curation_statuses_by_pk?: Maybe<Curation_Statuses>
  /** update multiples rows of table: "curation_statuses" */
  update_curation_statuses_many?: Maybe<
    Array<Maybe<Curation_Statuses_Mutation_Response>>
  >
  /** update data of the table: "entity_tags" */
  update_entity_tags?: Maybe<Entity_Tags_Mutation_Response>
  /** update single row of the table: "entity_tags" */
  update_entity_tags_by_pk?: Maybe<Entity_Tags>
  /** update multiples rows of table: "entity_tags" */
  update_entity_tags_many?: Maybe<Array<Maybe<Entity_Tags_Mutation_Response>>>
  /** update data of the table: "favorites" */
  update_favorites?: Maybe<Favorites_Mutation_Response>
  /** update single row of the table: "favorites" */
  update_favorites_by_pk?: Maybe<Favorites>
  /** update multiples rows of table: "favorites" */
  update_favorites_many?: Maybe<Array<Maybe<Favorites_Mutation_Response>>>
  /** update data of the table: "feature_field_values_counts" */
  update_feature_field_values_counts?: Maybe<Feature_Field_Values_Counts_Mutation_Response>
  /** update multiples rows of table: "feature_field_values_counts" */
  update_feature_field_values_counts_many?: Maybe<
    Array<Maybe<Feature_Field_Values_Counts_Mutation_Response>>
  >
  /** update data of the table: "feature_flags" */
  update_feature_flags?: Maybe<Feature_Flags_Mutation_Response>
  /** update single row of the table: "feature_flags" */
  update_feature_flags_by_pk?: Maybe<Feature_Flags>
  /** update multiples rows of table: "feature_flags" */
  update_feature_flags_many?: Maybe<
    Array<Maybe<Feature_Flags_Mutation_Response>>
  >
  /** update data of the table: "media" */
  update_media?: Maybe<Media_Mutation_Response>
  /** update single row of the table: "media" */
  update_media_by_pk?: Maybe<Media>
  /** update multiples rows of table: "media" */
  update_media_many?: Maybe<Array<Maybe<Media_Mutation_Response>>>
  /** update data of the table: "minter_filters_metadata" */
  update_minter_filters_metadata?: Maybe<Minter_Filters_Metadata_Mutation_Response>
  /** update single row of the table: "minter_filters_metadata" */
  update_minter_filters_metadata_by_pk?: Maybe<Minter_Filters_Metadata>
  /** update multiples rows of table: "minter_filters_metadata" */
  update_minter_filters_metadata_many?: Maybe<
    Array<Maybe<Minter_Filters_Metadata_Mutation_Response>>
  >
  /** update data of the table: "minter_type_names" */
  update_minter_type_names?: Maybe<Minter_Type_Names_Mutation_Response>
  /** update single row of the table: "minter_type_names" */
  update_minter_type_names_by_pk?: Maybe<Minter_Type_Names>
  /** update multiples rows of table: "minter_type_names" */
  update_minter_type_names_many?: Maybe<
    Array<Maybe<Minter_Type_Names_Mutation_Response>>
  >
  /** update data of the table: "minter_types" */
  update_minter_types?: Maybe<Minter_Types_Mutation_Response>
  /** update single row of the table: "minter_types" */
  update_minter_types_by_pk?: Maybe<Minter_Types>
  /** update multiples rows of table: "minter_types" */
  update_minter_types_many?: Maybe<Array<Maybe<Minter_Types_Mutation_Response>>>
  /** update data of the table: "minters_metadata" */
  update_minters_metadata?: Maybe<Minters_Metadata_Mutation_Response>
  /** update single row of the table: "minters_metadata" */
  update_minters_metadata_by_pk?: Maybe<Minters_Metadata>
  /** update multiples rows of table: "minters_metadata" */
  update_minters_metadata_many?: Maybe<
    Array<Maybe<Minters_Metadata_Mutation_Response>>
  >
  /** update data of the table: "notifications" */
  update_notifications?: Maybe<Notifications_Mutation_Response>
  /** update single row of the table: "notifications" */
  update_notifications_by_pk?: Maybe<Notifications>
  /** update multiples rows of table: "notifications" */
  update_notifications_many?: Maybe<
    Array<Maybe<Notifications_Mutation_Response>>
  >
  /** update data of the table: "project_external_asset_dependencies" */
  update_project_external_asset_dependencies?: Maybe<Project_External_Asset_Dependencies_Mutation_Response>
  /** update single row of the table: "project_external_asset_dependencies" */
  update_project_external_asset_dependencies_by_pk?: Maybe<Project_External_Asset_Dependencies>
  /** update multiples rows of table: "project_external_asset_dependencies" */
  update_project_external_asset_dependencies_many?: Maybe<
    Array<Maybe<Project_External_Asset_Dependencies_Mutation_Response>>
  >
  /** update data of the table: "project_external_asset_dependency_types" */
  update_project_external_asset_dependency_types?: Maybe<Project_External_Asset_Dependency_Types_Mutation_Response>
  /** update single row of the table: "project_external_asset_dependency_types" */
  update_project_external_asset_dependency_types_by_pk?: Maybe<Project_External_Asset_Dependency_Types>
  /** update multiples rows of table: "project_external_asset_dependency_types" */
  update_project_external_asset_dependency_types_many?: Maybe<
    Array<Maybe<Project_External_Asset_Dependency_Types_Mutation_Response>>
  >
  /** update data of the table: "project_minter_configurations" */
  update_project_minter_configurations?: Maybe<Project_Minter_Configurations_Mutation_Response>
  /** update single row of the table: "project_minter_configurations" */
  update_project_minter_configurations_by_pk?: Maybe<Project_Minter_Configurations>
  /** update multiples rows of table: "project_minter_configurations" */
  update_project_minter_configurations_many?: Maybe<
    Array<Maybe<Project_Minter_Configurations_Mutation_Response>>
  >
  /** update data of the table: "project_scripts" */
  update_project_scripts?: Maybe<Project_Scripts_Mutation_Response>
  /** update single row of the table: "project_scripts" */
  update_project_scripts_by_pk?: Maybe<Project_Scripts>
  /** update multiples rows of table: "project_scripts" */
  update_project_scripts_many?: Maybe<
    Array<Maybe<Project_Scripts_Mutation_Response>>
  >
  /** update data of the table: "project_series" */
  update_project_series?: Maybe<Project_Series_Mutation_Response>
  /** update single row of the table: "project_series" */
  update_project_series_by_pk?: Maybe<Project_Series>
  /** update multiples rows of table: "project_series" */
  update_project_series_many?: Maybe<
    Array<Maybe<Project_Series_Mutation_Response>>
  >
  /** update data of the table: "project_vertical_categories" */
  update_project_vertical_categories?: Maybe<Project_Vertical_Categories_Mutation_Response>
  /** update single row of the table: "project_vertical_categories" */
  update_project_vertical_categories_by_pk?: Maybe<Project_Vertical_Categories>
  /** update multiples rows of table: "project_vertical_categories" */
  update_project_vertical_categories_many?: Maybe<
    Array<Maybe<Project_Vertical_Categories_Mutation_Response>>
  >
  /** update data of the table: "project_verticals" */
  update_project_verticals?: Maybe<Project_Verticals_Mutation_Response>
  /** update single row of the table: "project_verticals" */
  update_project_verticals_by_pk?: Maybe<Project_Verticals>
  /** update multiples rows of table: "project_verticals" */
  update_project_verticals_many?: Maybe<
    Array<Maybe<Project_Verticals_Mutation_Response>>
  >
  /** update data of the table: "projects_features" */
  update_projects_features?: Maybe<Projects_Features_Mutation_Response>
  /** update single row of the table: "projects_features" */
  update_projects_features_by_pk?: Maybe<Projects_Features>
  /** update multiples rows of table: "projects_features" */
  update_projects_features_many?: Maybe<
    Array<Maybe<Projects_Features_Mutation_Response>>
  >
  /** update data of the table: "projects_features_private" */
  update_projects_features_private?: Maybe<Projects_Features_Private_Mutation_Response>
  /** update multiples rows of table: "projects_features_private" */
  update_projects_features_private_many?: Maybe<
    Array<Maybe<Projects_Features_Private_Mutation_Response>>
  >
  /** update data of the table: "projects_metadata" */
  update_projects_metadata?: Maybe<Projects_Metadata_Mutation_Response>
  /** update single row of the table: "projects_metadata" */
  update_projects_metadata_by_pk?: Maybe<Projects_Metadata>
  /** update multiples rows of table: "projects_metadata" */
  update_projects_metadata_many?: Maybe<
    Array<Maybe<Projects_Metadata_Mutation_Response>>
  >
  /** update data of the table: "proposed_artist_addresses_and_splits" */
  update_proposed_artist_addresses_and_splits?: Maybe<Proposed_Artist_Addresses_And_Splits_Mutation_Response>
  /** update single row of the table: "proposed_artist_addresses_and_splits" */
  update_proposed_artist_addresses_and_splits_by_pk?: Maybe<Proposed_Artist_Addresses_And_Splits>
  /** update multiples rows of table: "proposed_artist_addresses_and_splits" */
  update_proposed_artist_addresses_and_splits_many?: Maybe<
    Array<Maybe<Proposed_Artist_Addresses_And_Splits_Mutation_Response>>
  >
  /** update data of the table: "screenings" */
  update_screenings?: Maybe<Screenings_Mutation_Response>
  /** update single row of the table: "screenings" */
  update_screenings_by_pk?: Maybe<Screenings>
  /** update multiples rows of table: "screenings" */
  update_screenings_many?: Maybe<Array<Maybe<Screenings_Mutation_Response>>>
  /** update data of the table: "sync_status" */
  update_sync_status?: Maybe<Sync_Status_Mutation_Response>
  /** update single row of the table: "sync_status" */
  update_sync_status_by_pk?: Maybe<Sync_Status>
  /** update multiples rows of table: "sync_status" */
  update_sync_status_many?: Maybe<Array<Maybe<Sync_Status_Mutation_Response>>>
  /** update data of the table: "tag_groupings" */
  update_tag_groupings?: Maybe<Tag_Groupings_Mutation_Response>
  /** update single row of the table: "tag_groupings" */
  update_tag_groupings_by_pk?: Maybe<Tag_Groupings>
  /** update multiples rows of table: "tag_groupings" */
  update_tag_groupings_many?: Maybe<
    Array<Maybe<Tag_Groupings_Mutation_Response>>
  >
  /** update data of the table: "tag_status" */
  update_tag_status?: Maybe<Tag_Status_Mutation_Response>
  /** update single row of the table: "tag_status" */
  update_tag_status_by_pk?: Maybe<Tag_Status>
  /** update multiples rows of table: "tag_status" */
  update_tag_status_many?: Maybe<Array<Maybe<Tag_Status_Mutation_Response>>>
  /** update data of the table: "tag_types" */
  update_tag_types?: Maybe<Tag_Types_Mutation_Response>
  /** update single row of the table: "tag_types" */
  update_tag_types_by_pk?: Maybe<Tag_Types>
  /** update multiples rows of table: "tag_types" */
  update_tag_types_many?: Maybe<Array<Maybe<Tag_Types_Mutation_Response>>>
  /** update data of the table: "tags" */
  update_tags?: Maybe<Tags_Mutation_Response>
  /** update single row of the table: "tags" */
  update_tags_by_pk?: Maybe<Tags>
  /** update multiples rows of table: "tags" */
  update_tags_many?: Maybe<Array<Maybe<Tags_Mutation_Response>>>
  /** update data of the table: "terms_of_service" */
  update_terms_of_service?: Maybe<Terms_Of_Service_Mutation_Response>
  /** update single row of the table: "terms_of_service" */
  update_terms_of_service_by_pk?: Maybe<Terms_Of_Service>
  /** update multiples rows of table: "terms_of_service" */
  update_terms_of_service_many?: Maybe<
    Array<Maybe<Terms_Of_Service_Mutation_Response>>
  >
  /** update data of the table: "tokens_metadata" */
  update_tokens_metadata?: Maybe<Tokens_Metadata_Mutation_Response>
  /** update single row of the table: "tokens_metadata" */
  update_tokens_metadata_by_pk?: Maybe<Tokens_Metadata>
  /** update multiples rows of table: "tokens_metadata" */
  update_tokens_metadata_many?: Maybe<
    Array<Maybe<Tokens_Metadata_Mutation_Response>>
  >
  /** update data of the table: "user_profiles" */
  update_user_profiles?: Maybe<User_Profiles_Mutation_Response>
  /** update single row of the table: "user_profiles" */
  update_user_profiles_by_pk?: Maybe<User_Profiles>
  /** update multiples rows of table: "user_profiles" */
  update_user_profiles_many?: Maybe<
    Array<Maybe<User_Profiles_Mutation_Response>>
  >
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>
  /** update data of the table: "verticals" */
  update_verticals?: Maybe<Verticals_Mutation_Response>
  /** update single row of the table: "verticals" */
  update_verticals_by_pk?: Maybe<Verticals>
  /** update multiples rows of table: "verticals" */
  update_verticals_many?: Maybe<Array<Maybe<Verticals_Mutation_Response>>>
  /** update data of the table: "webflow_artist_info" */
  update_webflow_artist_info?: Maybe<Webflow_Artist_Info_Mutation_Response>
  /** update single row of the table: "webflow_artist_info" */
  update_webflow_artist_info_by_pk?: Maybe<Webflow_Artist_Info>
  /** update multiples rows of table: "webflow_artist_info" */
  update_webflow_artist_info_many?: Maybe<
    Array<Maybe<Webflow_Artist_Info_Mutation_Response>>
  >
  /** update data of the table: "webflow_spectrum_articles" */
  update_webflow_spectrum_articles?: Maybe<Webflow_Spectrum_Articles_Mutation_Response>
  /** update single row of the table: "webflow_spectrum_articles" */
  update_webflow_spectrum_articles_by_pk?: Maybe<Webflow_Spectrum_Articles>
  /** update multiples rows of table: "webflow_spectrum_articles" */
  update_webflow_spectrum_articles_many?: Maybe<
    Array<Maybe<Webflow_Spectrum_Articles_Mutation_Response>>
  >
}

/** mutation root */
export type Mutation_RootCreateApplicationArgs = {
  formData?: Maybe<CreateApplicationInput>
}

/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Categories_By_PkArgs = {
  name: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Contract_AllowlistingsArgs = {
  where: Contract_Allowlistings_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Contract_Allowlistings_By_PkArgs = {
  contract_address: Scalars['String']
  user_address: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Contract_Type_NamesArgs = {
  where: Contract_Type_Names_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Contract_Type_Names_By_PkArgs = {
  name: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Contract_TypesArgs = {
  where: Contract_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Contract_Types_By_PkArgs = {
  type: Contract_Type_Names_Enum
}

/** mutation root */
export type Mutation_RootDelete_Contracts_MetadataArgs = {
  where: Contracts_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Contracts_Metadata_By_PkArgs = {
  address: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Curation_StatusesArgs = {
  where: Curation_Statuses_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Curation_Statuses_By_PkArgs = {
  value: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Entity_TagsArgs = {
  where: Entity_Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Entity_Tags_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_FavoritesArgs = {
  where: Favorites_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Favorites_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Feature_Field_Values_CountsArgs = {
  where: Feature_Field_Values_Counts_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Feature_FlagsArgs = {
  where: Feature_Flags_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Feature_Flags_By_PkArgs = {
  flag_name: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_MediaArgs = {
  where: Media_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Media_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Minter_Filters_MetadataArgs = {
  where: Minter_Filters_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Minter_Filters_Metadata_By_PkArgs = {
  address: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Minter_Type_NamesArgs = {
  where: Minter_Type_Names_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Minter_Type_Names_By_PkArgs = {
  name: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Minter_TypesArgs = {
  where: Minter_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Minter_Types_By_PkArgs = {
  type: Minter_Type_Names_Enum
}

/** mutation root */
export type Mutation_RootDelete_Minters_MetadataArgs = {
  where: Minters_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Minters_Metadata_By_PkArgs = {
  address: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_NotificationsArgs = {
  where: Notifications_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Notifications_By_PkArgs = {
  trigger_key: Scalars['String']
  trigger_time: Scalars['timestamptz']
  user_address: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Project_External_Asset_DependenciesArgs = {
  where: Project_External_Asset_Dependencies_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Project_External_Asset_Dependencies_By_PkArgs =
  {
    index: Scalars['Int']
    project_id: Scalars['String']
  }

/** mutation root */
export type Mutation_RootDelete_Project_External_Asset_Dependency_TypesArgs = {
  where: Project_External_Asset_Dependency_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Project_External_Asset_Dependency_Types_By_PkArgs =
  {
    type: Scalars['String']
  }

/** mutation root */
export type Mutation_RootDelete_Project_Minter_ConfigurationsArgs = {
  where: Project_Minter_Configurations_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Project_Minter_Configurations_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Project_ScriptsArgs = {
  where: Project_Scripts_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Project_Scripts_By_PkArgs = {
  index: Scalars['Int']
  project_id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Project_SeriesArgs = {
  where: Project_Series_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Project_Series_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Project_Vertical_CategoriesArgs = {
  where: Project_Vertical_Categories_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Project_Vertical_Categories_By_PkArgs = {
  name: Categories_Enum
}

/** mutation root */
export type Mutation_RootDelete_Project_VerticalsArgs = {
  where: Project_Verticals_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Project_Verticals_By_PkArgs = {
  name: Verticals_Enum
}

/** mutation root */
export type Mutation_RootDelete_Projects_FeaturesArgs = {
  where: Projects_Features_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Projects_Features_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Projects_Features_PrivateArgs = {
  where: Projects_Features_Private_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Projects_MetadataArgs = {
  where: Projects_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Projects_Metadata_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Proposed_Artist_Addresses_And_SplitsArgs = {
  where: Proposed_Artist_Addresses_And_Splits_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Proposed_Artist_Addresses_And_Splits_By_PkArgs =
  {
    project_id: Scalars['String']
  }

/** mutation root */
export type Mutation_RootDelete_ScreeningsArgs = {
  where: Screenings_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Screenings_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Sync_StatusArgs = {
  where: Sync_Status_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Sync_Status_By_PkArgs = {
  id: Scalars['Boolean']
}

/** mutation root */
export type Mutation_RootDelete_Tag_GroupingsArgs = {
  where: Tag_Groupings_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tag_Groupings_By_PkArgs = {
  name: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Tag_StatusArgs = {
  where: Tag_Status_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tag_Status_By_PkArgs = {
  value: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Tag_TypesArgs = {
  where: Tag_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tag_Types_By_PkArgs = {
  value: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_TagsArgs = {
  where: Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tags_By_PkArgs = {
  name: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Terms_Of_ServiceArgs = {
  where: Terms_Of_Service_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Terms_Of_Service_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Tokens_MetadataArgs = {
  where: Tokens_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tokens_Metadata_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_User_ProfilesArgs = {
  where: User_Profiles_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_User_Profiles_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  public_address: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_VerticalsArgs = {
  where: Verticals_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Verticals_By_PkArgs = {
  name: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Webflow_Artist_InfoArgs = {
  where: Webflow_Artist_Info_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Webflow_Artist_Info_By_PkArgs = {
  webflow_item_id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Webflow_Spectrum_ArticlesArgs = {
  where: Webflow_Spectrum_Articles_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Webflow_Spectrum_Articles_By_PkArgs = {
  webflow_item_id: Scalars['String']
}

/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>
  on_conflict?: Maybe<Categories_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input
  on_conflict?: Maybe<Categories_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contract_AllowlistingsArgs = {
  objects: Array<Contract_Allowlistings_Insert_Input>
  on_conflict?: Maybe<Contract_Allowlistings_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contract_Allowlistings_OneArgs = {
  object: Contract_Allowlistings_Insert_Input
  on_conflict?: Maybe<Contract_Allowlistings_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contract_Type_NamesArgs = {
  objects: Array<Contract_Type_Names_Insert_Input>
  on_conflict?: Maybe<Contract_Type_Names_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contract_Type_Names_OneArgs = {
  object: Contract_Type_Names_Insert_Input
  on_conflict?: Maybe<Contract_Type_Names_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contract_TypesArgs = {
  objects: Array<Contract_Types_Insert_Input>
  on_conflict?: Maybe<Contract_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contract_Types_OneArgs = {
  object: Contract_Types_Insert_Input
  on_conflict?: Maybe<Contract_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contracts_MetadataArgs = {
  objects: Array<Contracts_Metadata_Insert_Input>
  on_conflict?: Maybe<Contracts_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Contracts_Metadata_OneArgs = {
  object: Contracts_Metadata_Insert_Input
  on_conflict?: Maybe<Contracts_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Curation_StatusesArgs = {
  objects: Array<Curation_Statuses_Insert_Input>
  on_conflict?: Maybe<Curation_Statuses_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Curation_Statuses_OneArgs = {
  object: Curation_Statuses_Insert_Input
  on_conflict?: Maybe<Curation_Statuses_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Entity_TagsArgs = {
  objects: Array<Entity_Tags_Insert_Input>
  on_conflict?: Maybe<Entity_Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Entity_Tags_OneArgs = {
  object: Entity_Tags_Insert_Input
  on_conflict?: Maybe<Entity_Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_FavoritesArgs = {
  objects: Array<Favorites_Insert_Input>
  on_conflict?: Maybe<Favorites_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Favorites_OneArgs = {
  object: Favorites_Insert_Input
  on_conflict?: Maybe<Favorites_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Feature_Field_Values_CountsArgs = {
  objects: Array<Feature_Field_Values_Counts_Insert_Input>
}

/** mutation root */
export type Mutation_RootInsert_Feature_Field_Values_Counts_OneArgs = {
  object: Feature_Field_Values_Counts_Insert_Input
}

/** mutation root */
export type Mutation_RootInsert_Feature_FlagsArgs = {
  objects: Array<Feature_Flags_Insert_Input>
  on_conflict?: Maybe<Feature_Flags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Feature_Flags_OneArgs = {
  object: Feature_Flags_Insert_Input
  on_conflict?: Maybe<Feature_Flags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_MediaArgs = {
  objects: Array<Media_Insert_Input>
  on_conflict?: Maybe<Media_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Media_OneArgs = {
  object: Media_Insert_Input
  on_conflict?: Maybe<Media_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minter_Filters_MetadataArgs = {
  objects: Array<Minter_Filters_Metadata_Insert_Input>
  on_conflict?: Maybe<Minter_Filters_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minter_Filters_Metadata_OneArgs = {
  object: Minter_Filters_Metadata_Insert_Input
  on_conflict?: Maybe<Minter_Filters_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minter_Type_NamesArgs = {
  objects: Array<Minter_Type_Names_Insert_Input>
  on_conflict?: Maybe<Minter_Type_Names_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minter_Type_Names_OneArgs = {
  object: Minter_Type_Names_Insert_Input
  on_conflict?: Maybe<Minter_Type_Names_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minter_TypesArgs = {
  objects: Array<Minter_Types_Insert_Input>
  on_conflict?: Maybe<Minter_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minter_Types_OneArgs = {
  object: Minter_Types_Insert_Input
  on_conflict?: Maybe<Minter_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minters_MetadataArgs = {
  objects: Array<Minters_Metadata_Insert_Input>
  on_conflict?: Maybe<Minters_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Minters_Metadata_OneArgs = {
  object: Minters_Metadata_Insert_Input
  on_conflict?: Maybe<Minters_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_NotificationsArgs = {
  objects: Array<Notifications_Insert_Input>
  on_conflict?: Maybe<Notifications_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Notifications_OneArgs = {
  object: Notifications_Insert_Input
  on_conflict?: Maybe<Notifications_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_External_Asset_DependenciesArgs = {
  objects: Array<Project_External_Asset_Dependencies_Insert_Input>
  on_conflict?: Maybe<Project_External_Asset_Dependencies_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_External_Asset_Dependencies_OneArgs = {
  object: Project_External_Asset_Dependencies_Insert_Input
  on_conflict?: Maybe<Project_External_Asset_Dependencies_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_External_Asset_Dependency_TypesArgs = {
  objects: Array<Project_External_Asset_Dependency_Types_Insert_Input>
  on_conflict?: Maybe<Project_External_Asset_Dependency_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_External_Asset_Dependency_Types_OneArgs =
  {
    object: Project_External_Asset_Dependency_Types_Insert_Input
    on_conflict?: Maybe<Project_External_Asset_Dependency_Types_On_Conflict>
  }

/** mutation root */
export type Mutation_RootInsert_Project_Minter_ConfigurationsArgs = {
  objects: Array<Project_Minter_Configurations_Insert_Input>
  on_conflict?: Maybe<Project_Minter_Configurations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_Minter_Configurations_OneArgs = {
  object: Project_Minter_Configurations_Insert_Input
  on_conflict?: Maybe<Project_Minter_Configurations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_ScriptsArgs = {
  objects: Array<Project_Scripts_Insert_Input>
  on_conflict?: Maybe<Project_Scripts_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_Scripts_OneArgs = {
  object: Project_Scripts_Insert_Input
  on_conflict?: Maybe<Project_Scripts_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_SeriesArgs = {
  objects: Array<Project_Series_Insert_Input>
  on_conflict?: Maybe<Project_Series_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_Series_OneArgs = {
  object: Project_Series_Insert_Input
  on_conflict?: Maybe<Project_Series_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_Vertical_CategoriesArgs = {
  objects: Array<Project_Vertical_Categories_Insert_Input>
  on_conflict?: Maybe<Project_Vertical_Categories_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_Vertical_Categories_OneArgs = {
  object: Project_Vertical_Categories_Insert_Input
  on_conflict?: Maybe<Project_Vertical_Categories_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_VerticalsArgs = {
  objects: Array<Project_Verticals_Insert_Input>
  on_conflict?: Maybe<Project_Verticals_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Project_Verticals_OneArgs = {
  object: Project_Verticals_Insert_Input
  on_conflict?: Maybe<Project_Verticals_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Projects_FeaturesArgs = {
  objects: Array<Projects_Features_Insert_Input>
  on_conflict?: Maybe<Projects_Features_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Projects_Features_OneArgs = {
  object: Projects_Features_Insert_Input
  on_conflict?: Maybe<Projects_Features_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Projects_Features_PrivateArgs = {
  objects: Array<Projects_Features_Private_Insert_Input>
}

/** mutation root */
export type Mutation_RootInsert_Projects_Features_Private_OneArgs = {
  object: Projects_Features_Private_Insert_Input
}

/** mutation root */
export type Mutation_RootInsert_Projects_MetadataArgs = {
  objects: Array<Projects_Metadata_Insert_Input>
  on_conflict?: Maybe<Projects_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Projects_Metadata_OneArgs = {
  object: Projects_Metadata_Insert_Input
  on_conflict?: Maybe<Projects_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Proposed_Artist_Addresses_And_SplitsArgs = {
  objects: Array<Proposed_Artist_Addresses_And_Splits_Insert_Input>
  on_conflict?: Maybe<Proposed_Artist_Addresses_And_Splits_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Proposed_Artist_Addresses_And_Splits_OneArgs = {
  object: Proposed_Artist_Addresses_And_Splits_Insert_Input
  on_conflict?: Maybe<Proposed_Artist_Addresses_And_Splits_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_ScreeningsArgs = {
  objects: Array<Screenings_Insert_Input>
  on_conflict?: Maybe<Screenings_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Screenings_OneArgs = {
  object: Screenings_Insert_Input
  on_conflict?: Maybe<Screenings_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Sync_StatusArgs = {
  objects: Array<Sync_Status_Insert_Input>
  on_conflict?: Maybe<Sync_Status_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Sync_Status_OneArgs = {
  object: Sync_Status_Insert_Input
  on_conflict?: Maybe<Sync_Status_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tag_GroupingsArgs = {
  objects: Array<Tag_Groupings_Insert_Input>
  on_conflict?: Maybe<Tag_Groupings_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tag_Groupings_OneArgs = {
  object: Tag_Groupings_Insert_Input
  on_conflict?: Maybe<Tag_Groupings_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tag_StatusArgs = {
  objects: Array<Tag_Status_Insert_Input>
  on_conflict?: Maybe<Tag_Status_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tag_Status_OneArgs = {
  object: Tag_Status_Insert_Input
  on_conflict?: Maybe<Tag_Status_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tag_TypesArgs = {
  objects: Array<Tag_Types_Insert_Input>
  on_conflict?: Maybe<Tag_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tag_Types_OneArgs = {
  object: Tag_Types_Insert_Input
  on_conflict?: Maybe<Tag_Types_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_TagsArgs = {
  objects: Array<Tags_Insert_Input>
  on_conflict?: Maybe<Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tags_OneArgs = {
  object: Tags_Insert_Input
  on_conflict?: Maybe<Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Terms_Of_ServiceArgs = {
  objects: Array<Terms_Of_Service_Insert_Input>
  on_conflict?: Maybe<Terms_Of_Service_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Terms_Of_Service_OneArgs = {
  object: Terms_Of_Service_Insert_Input
  on_conflict?: Maybe<Terms_Of_Service_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tokens_MetadataArgs = {
  objects: Array<Tokens_Metadata_Insert_Input>
  on_conflict?: Maybe<Tokens_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tokens_Metadata_OneArgs = {
  object: Tokens_Metadata_Insert_Input
  on_conflict?: Maybe<Tokens_Metadata_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_User_ProfilesArgs = {
  objects: Array<User_Profiles_Insert_Input>
  on_conflict?: Maybe<User_Profiles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_User_Profiles_OneArgs = {
  object: User_Profiles_Insert_Input
  on_conflict?: Maybe<User_Profiles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_VerticalsArgs = {
  objects: Array<Verticals_Insert_Input>
  on_conflict?: Maybe<Verticals_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Verticals_OneArgs = {
  object: Verticals_Insert_Input
  on_conflict?: Maybe<Verticals_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Webflow_Artist_InfoArgs = {
  objects: Array<Webflow_Artist_Info_Insert_Input>
  on_conflict?: Maybe<Webflow_Artist_Info_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Webflow_Artist_Info_OneArgs = {
  object: Webflow_Artist_Info_Insert_Input
  on_conflict?: Maybe<Webflow_Artist_Info_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Webflow_Spectrum_ArticlesArgs = {
  objects: Array<Webflow_Spectrum_Articles_Insert_Input>
  on_conflict?: Maybe<Webflow_Spectrum_Articles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Webflow_Spectrum_Articles_OneArgs = {
  object: Webflow_Spectrum_Articles_Insert_Input
  on_conflict?: Maybe<Webflow_Spectrum_Articles_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdateFeaturesArgs = {
  featureFields: Scalars['jsonb']
  featuresScript: Scalars['String']
  projectId: Scalars['String']
}

/** mutation root */
export type Mutation_RootUpdateProjectMediaArgs = {
  features?: Maybe<Scalars['Boolean']>
  projectId: Scalars['String']
  render?: Maybe<Scalars['Boolean']>
}

/** mutation root */
export type Mutation_RootUpdateTokenMediaArgs = {
  tokenIds?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** mutation root */
export type Mutation_RootUpdate_CategoriesArgs = {
  _set?: Maybe<Categories_Set_Input>
  where: Categories_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _set?: Maybe<Categories_Set_Input>
  pk_columns: Categories_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Categories_ManyArgs = {
  updates: Array<Categories_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Contract_AllowlistingsArgs = {
  _set?: Maybe<Contract_Allowlistings_Set_Input>
  where: Contract_Allowlistings_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Contract_Allowlistings_By_PkArgs = {
  _set?: Maybe<Contract_Allowlistings_Set_Input>
  pk_columns: Contract_Allowlistings_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Contract_Allowlistings_ManyArgs = {
  updates: Array<Contract_Allowlistings_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Contract_Type_NamesArgs = {
  _set?: Maybe<Contract_Type_Names_Set_Input>
  where: Contract_Type_Names_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Contract_Type_Names_By_PkArgs = {
  _set?: Maybe<Contract_Type_Names_Set_Input>
  pk_columns: Contract_Type_Names_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Contract_Type_Names_ManyArgs = {
  updates: Array<Contract_Type_Names_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Contract_TypesArgs = {
  _append?: Maybe<Contract_Types_Append_Input>
  _delete_at_path?: Maybe<Contract_Types_Delete_At_Path_Input>
  _delete_elem?: Maybe<Contract_Types_Delete_Elem_Input>
  _delete_key?: Maybe<Contract_Types_Delete_Key_Input>
  _prepend?: Maybe<Contract_Types_Prepend_Input>
  _set?: Maybe<Contract_Types_Set_Input>
  where: Contract_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Contract_Types_By_PkArgs = {
  _append?: Maybe<Contract_Types_Append_Input>
  _delete_at_path?: Maybe<Contract_Types_Delete_At_Path_Input>
  _delete_elem?: Maybe<Contract_Types_Delete_Elem_Input>
  _delete_key?: Maybe<Contract_Types_Delete_Key_Input>
  _prepend?: Maybe<Contract_Types_Prepend_Input>
  _set?: Maybe<Contract_Types_Set_Input>
  pk_columns: Contract_Types_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Contract_Types_ManyArgs = {
  updates: Array<Contract_Types_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Contracts_MetadataArgs = {
  _inc?: Maybe<Contracts_Metadata_Inc_Input>
  _set?: Maybe<Contracts_Metadata_Set_Input>
  where: Contracts_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Contracts_Metadata_By_PkArgs = {
  _inc?: Maybe<Contracts_Metadata_Inc_Input>
  _set?: Maybe<Contracts_Metadata_Set_Input>
  pk_columns: Contracts_Metadata_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Contracts_Metadata_ManyArgs = {
  updates: Array<Contracts_Metadata_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Curation_StatusesArgs = {
  _set?: Maybe<Curation_Statuses_Set_Input>
  where: Curation_Statuses_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Curation_Statuses_By_PkArgs = {
  _set?: Maybe<Curation_Statuses_Set_Input>
  pk_columns: Curation_Statuses_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Curation_Statuses_ManyArgs = {
  updates: Array<Curation_Statuses_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Entity_TagsArgs = {
  _inc?: Maybe<Entity_Tags_Inc_Input>
  _set?: Maybe<Entity_Tags_Set_Input>
  where: Entity_Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Entity_Tags_By_PkArgs = {
  _inc?: Maybe<Entity_Tags_Inc_Input>
  _set?: Maybe<Entity_Tags_Set_Input>
  pk_columns: Entity_Tags_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Entity_Tags_ManyArgs = {
  updates: Array<Entity_Tags_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_FavoritesArgs = {
  _inc?: Maybe<Favorites_Inc_Input>
  _set?: Maybe<Favorites_Set_Input>
  where: Favorites_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Favorites_By_PkArgs = {
  _inc?: Maybe<Favorites_Inc_Input>
  _set?: Maybe<Favorites_Set_Input>
  pk_columns: Favorites_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Favorites_ManyArgs = {
  updates: Array<Favorites_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Feature_Field_Values_CountsArgs = {
  _inc?: Maybe<Feature_Field_Values_Counts_Inc_Input>
  _set?: Maybe<Feature_Field_Values_Counts_Set_Input>
  where: Feature_Field_Values_Counts_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Feature_Field_Values_Counts_ManyArgs = {
  updates: Array<Feature_Field_Values_Counts_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Feature_FlagsArgs = {
  _set?: Maybe<Feature_Flags_Set_Input>
  where: Feature_Flags_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Feature_Flags_By_PkArgs = {
  _set?: Maybe<Feature_Flags_Set_Input>
  pk_columns: Feature_Flags_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Feature_Flags_ManyArgs = {
  updates: Array<Feature_Flags_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_MediaArgs = {
  _append?: Maybe<Media_Append_Input>
  _delete_at_path?: Maybe<Media_Delete_At_Path_Input>
  _delete_elem?: Maybe<Media_Delete_Elem_Input>
  _delete_key?: Maybe<Media_Delete_Key_Input>
  _inc?: Maybe<Media_Inc_Input>
  _prepend?: Maybe<Media_Prepend_Input>
  _set?: Maybe<Media_Set_Input>
  where: Media_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Media_By_PkArgs = {
  _append?: Maybe<Media_Append_Input>
  _delete_at_path?: Maybe<Media_Delete_At_Path_Input>
  _delete_elem?: Maybe<Media_Delete_Elem_Input>
  _delete_key?: Maybe<Media_Delete_Key_Input>
  _inc?: Maybe<Media_Inc_Input>
  _prepend?: Maybe<Media_Prepend_Input>
  _set?: Maybe<Media_Set_Input>
  pk_columns: Media_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Media_ManyArgs = {
  updates: Array<Media_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Filters_MetadataArgs = {
  _set?: Maybe<Minter_Filters_Metadata_Set_Input>
  where: Minter_Filters_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Filters_Metadata_By_PkArgs = {
  _set?: Maybe<Minter_Filters_Metadata_Set_Input>
  pk_columns: Minter_Filters_Metadata_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Filters_Metadata_ManyArgs = {
  updates: Array<Minter_Filters_Metadata_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Type_NamesArgs = {
  _set?: Maybe<Minter_Type_Names_Set_Input>
  where: Minter_Type_Names_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Type_Names_By_PkArgs = {
  _set?: Maybe<Minter_Type_Names_Set_Input>
  pk_columns: Minter_Type_Names_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Type_Names_ManyArgs = {
  updates: Array<Minter_Type_Names_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Minter_TypesArgs = {
  _set?: Maybe<Minter_Types_Set_Input>
  where: Minter_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Types_By_PkArgs = {
  _set?: Maybe<Minter_Types_Set_Input>
  pk_columns: Minter_Types_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Minter_Types_ManyArgs = {
  updates: Array<Minter_Types_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Minters_MetadataArgs = {
  _append?: Maybe<Minters_Metadata_Append_Input>
  _delete_at_path?: Maybe<Minters_Metadata_Delete_At_Path_Input>
  _delete_elem?: Maybe<Minters_Metadata_Delete_Elem_Input>
  _delete_key?: Maybe<Minters_Metadata_Delete_Key_Input>
  _inc?: Maybe<Minters_Metadata_Inc_Input>
  _prepend?: Maybe<Minters_Metadata_Prepend_Input>
  _set?: Maybe<Minters_Metadata_Set_Input>
  where: Minters_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Minters_Metadata_By_PkArgs = {
  _append?: Maybe<Minters_Metadata_Append_Input>
  _delete_at_path?: Maybe<Minters_Metadata_Delete_At_Path_Input>
  _delete_elem?: Maybe<Minters_Metadata_Delete_Elem_Input>
  _delete_key?: Maybe<Minters_Metadata_Delete_Key_Input>
  _inc?: Maybe<Minters_Metadata_Inc_Input>
  _prepend?: Maybe<Minters_Metadata_Prepend_Input>
  _set?: Maybe<Minters_Metadata_Set_Input>
  pk_columns: Minters_Metadata_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Minters_Metadata_ManyArgs = {
  updates: Array<Minters_Metadata_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_NotificationsArgs = {
  _inc?: Maybe<Notifications_Inc_Input>
  _set?: Maybe<Notifications_Set_Input>
  where: Notifications_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Notifications_By_PkArgs = {
  _inc?: Maybe<Notifications_Inc_Input>
  _set?: Maybe<Notifications_Set_Input>
  pk_columns: Notifications_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Notifications_ManyArgs = {
  updates: Array<Notifications_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Project_External_Asset_DependenciesArgs = {
  _inc?: Maybe<Project_External_Asset_Dependencies_Inc_Input>
  _set?: Maybe<Project_External_Asset_Dependencies_Set_Input>
  where: Project_External_Asset_Dependencies_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Project_External_Asset_Dependencies_By_PkArgs =
  {
    _inc?: Maybe<Project_External_Asset_Dependencies_Inc_Input>
    _set?: Maybe<Project_External_Asset_Dependencies_Set_Input>
    pk_columns: Project_External_Asset_Dependencies_Pk_Columns_Input
  }

/** mutation root */
export type Mutation_RootUpdate_Project_External_Asset_Dependencies_ManyArgs = {
  updates: Array<Project_External_Asset_Dependencies_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Project_External_Asset_Dependency_TypesArgs = {
  _set?: Maybe<Project_External_Asset_Dependency_Types_Set_Input>
  where: Project_External_Asset_Dependency_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Project_External_Asset_Dependency_Types_By_PkArgs =
  {
    _set?: Maybe<Project_External_Asset_Dependency_Types_Set_Input>
    pk_columns: Project_External_Asset_Dependency_Types_Pk_Columns_Input
  }

/** mutation root */
export type Mutation_RootUpdate_Project_External_Asset_Dependency_Types_ManyArgs =
  {
    updates: Array<Project_External_Asset_Dependency_Types_Updates>
  }

/** mutation root */
export type Mutation_RootUpdate_Project_Minter_ConfigurationsArgs = {
  _append?: Maybe<Project_Minter_Configurations_Append_Input>
  _delete_at_path?: Maybe<Project_Minter_Configurations_Delete_At_Path_Input>
  _delete_elem?: Maybe<Project_Minter_Configurations_Delete_Elem_Input>
  _delete_key?: Maybe<Project_Minter_Configurations_Delete_Key_Input>
  _prepend?: Maybe<Project_Minter_Configurations_Prepend_Input>
  _set?: Maybe<Project_Minter_Configurations_Set_Input>
  where: Project_Minter_Configurations_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Project_Minter_Configurations_By_PkArgs = {
  _append?: Maybe<Project_Minter_Configurations_Append_Input>
  _delete_at_path?: Maybe<Project_Minter_Configurations_Delete_At_Path_Input>
  _delete_elem?: Maybe<Project_Minter_Configurations_Delete_Elem_Input>
  _delete_key?: Maybe<Project_Minter_Configurations_Delete_Key_Input>
  _prepend?: Maybe<Project_Minter_Configurations_Prepend_Input>
  _set?: Maybe<Project_Minter_Configurations_Set_Input>
  pk_columns: Project_Minter_Configurations_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Project_Minter_Configurations_ManyArgs = {
  updates: Array<Project_Minter_Configurations_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Project_ScriptsArgs = {
  _inc?: Maybe<Project_Scripts_Inc_Input>
  _set?: Maybe<Project_Scripts_Set_Input>
  where: Project_Scripts_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Project_Scripts_By_PkArgs = {
  _inc?: Maybe<Project_Scripts_Inc_Input>
  _set?: Maybe<Project_Scripts_Set_Input>
  pk_columns: Project_Scripts_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Project_Scripts_ManyArgs = {
  updates: Array<Project_Scripts_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Project_SeriesArgs = {
  _inc?: Maybe<Project_Series_Inc_Input>
  _set?: Maybe<Project_Series_Set_Input>
  where: Project_Series_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Project_Series_By_PkArgs = {
  _inc?: Maybe<Project_Series_Inc_Input>
  _set?: Maybe<Project_Series_Set_Input>
  pk_columns: Project_Series_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Project_Series_ManyArgs = {
  updates: Array<Project_Series_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Project_Vertical_CategoriesArgs = {
  _set?: Maybe<Project_Vertical_Categories_Set_Input>
  where: Project_Vertical_Categories_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Project_Vertical_Categories_By_PkArgs = {
  _set?: Maybe<Project_Vertical_Categories_Set_Input>
  pk_columns: Project_Vertical_Categories_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Project_Vertical_Categories_ManyArgs = {
  updates: Array<Project_Vertical_Categories_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Project_VerticalsArgs = {
  _set?: Maybe<Project_Verticals_Set_Input>
  where: Project_Verticals_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Project_Verticals_By_PkArgs = {
  _set?: Maybe<Project_Verticals_Set_Input>
  pk_columns: Project_Verticals_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Project_Verticals_ManyArgs = {
  updates: Array<Project_Verticals_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Projects_FeaturesArgs = {
  _append?: Maybe<Projects_Features_Append_Input>
  _delete_at_path?: Maybe<Projects_Features_Delete_At_Path_Input>
  _delete_elem?: Maybe<Projects_Features_Delete_Elem_Input>
  _delete_key?: Maybe<Projects_Features_Delete_Key_Input>
  _inc?: Maybe<Projects_Features_Inc_Input>
  _prepend?: Maybe<Projects_Features_Prepend_Input>
  _set?: Maybe<Projects_Features_Set_Input>
  where: Projects_Features_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Projects_Features_By_PkArgs = {
  _append?: Maybe<Projects_Features_Append_Input>
  _delete_at_path?: Maybe<Projects_Features_Delete_At_Path_Input>
  _delete_elem?: Maybe<Projects_Features_Delete_Elem_Input>
  _delete_key?: Maybe<Projects_Features_Delete_Key_Input>
  _inc?: Maybe<Projects_Features_Inc_Input>
  _prepend?: Maybe<Projects_Features_Prepend_Input>
  _set?: Maybe<Projects_Features_Set_Input>
  pk_columns: Projects_Features_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Projects_Features_ManyArgs = {
  updates: Array<Projects_Features_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Projects_Features_PrivateArgs = {
  _inc?: Maybe<Projects_Features_Private_Inc_Input>
  _set?: Maybe<Projects_Features_Private_Set_Input>
  where: Projects_Features_Private_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Projects_Features_Private_ManyArgs = {
  updates: Array<Projects_Features_Private_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Projects_MetadataArgs = {
  _append?: Maybe<Projects_Metadata_Append_Input>
  _delete_at_path?: Maybe<Projects_Metadata_Delete_At_Path_Input>
  _delete_elem?: Maybe<Projects_Metadata_Delete_Elem_Input>
  _delete_key?: Maybe<Projects_Metadata_Delete_Key_Input>
  _inc?: Maybe<Projects_Metadata_Inc_Input>
  _prepend?: Maybe<Projects_Metadata_Prepend_Input>
  _set?: Maybe<Projects_Metadata_Set_Input>
  where: Projects_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Projects_Metadata_By_PkArgs = {
  _append?: Maybe<Projects_Metadata_Append_Input>
  _delete_at_path?: Maybe<Projects_Metadata_Delete_At_Path_Input>
  _delete_elem?: Maybe<Projects_Metadata_Delete_Elem_Input>
  _delete_key?: Maybe<Projects_Metadata_Delete_Key_Input>
  _inc?: Maybe<Projects_Metadata_Inc_Input>
  _prepend?: Maybe<Projects_Metadata_Prepend_Input>
  _set?: Maybe<Projects_Metadata_Set_Input>
  pk_columns: Projects_Metadata_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Projects_Metadata_ManyArgs = {
  updates: Array<Projects_Metadata_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Proposed_Artist_Addresses_And_SplitsArgs = {
  _inc?: Maybe<Proposed_Artist_Addresses_And_Splits_Inc_Input>
  _set?: Maybe<Proposed_Artist_Addresses_And_Splits_Set_Input>
  where: Proposed_Artist_Addresses_And_Splits_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Proposed_Artist_Addresses_And_Splits_By_PkArgs =
  {
    _inc?: Maybe<Proposed_Artist_Addresses_And_Splits_Inc_Input>
    _set?: Maybe<Proposed_Artist_Addresses_And_Splits_Set_Input>
    pk_columns: Proposed_Artist_Addresses_And_Splits_Pk_Columns_Input
  }

/** mutation root */
export type Mutation_RootUpdate_Proposed_Artist_Addresses_And_Splits_ManyArgs =
  {
    updates: Array<Proposed_Artist_Addresses_And_Splits_Updates>
  }

/** mutation root */
export type Mutation_RootUpdate_ScreeningsArgs = {
  _inc?: Maybe<Screenings_Inc_Input>
  _set?: Maybe<Screenings_Set_Input>
  where: Screenings_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Screenings_By_PkArgs = {
  _inc?: Maybe<Screenings_Inc_Input>
  _set?: Maybe<Screenings_Set_Input>
  pk_columns: Screenings_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Screenings_ManyArgs = {
  updates: Array<Screenings_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Sync_StatusArgs = {
  _set?: Maybe<Sync_Status_Set_Input>
  where: Sync_Status_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Sync_Status_By_PkArgs = {
  _set?: Maybe<Sync_Status_Set_Input>
  pk_columns: Sync_Status_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Sync_Status_ManyArgs = {
  updates: Array<Sync_Status_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Tag_GroupingsArgs = {
  _set?: Maybe<Tag_Groupings_Set_Input>
  where: Tag_Groupings_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tag_Groupings_By_PkArgs = {
  _set?: Maybe<Tag_Groupings_Set_Input>
  pk_columns: Tag_Groupings_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Tag_Groupings_ManyArgs = {
  updates: Array<Tag_Groupings_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Tag_StatusArgs = {
  _set?: Maybe<Tag_Status_Set_Input>
  where: Tag_Status_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tag_Status_By_PkArgs = {
  _set?: Maybe<Tag_Status_Set_Input>
  pk_columns: Tag_Status_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Tag_Status_ManyArgs = {
  updates: Array<Tag_Status_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Tag_TypesArgs = {
  _set?: Maybe<Tag_Types_Set_Input>
  where: Tag_Types_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tag_Types_By_PkArgs = {
  _set?: Maybe<Tag_Types_Set_Input>
  pk_columns: Tag_Types_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Tag_Types_ManyArgs = {
  updates: Array<Tag_Types_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_TagsArgs = {
  _inc?: Maybe<Tags_Inc_Input>
  _set?: Maybe<Tags_Set_Input>
  where: Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tags_By_PkArgs = {
  _inc?: Maybe<Tags_Inc_Input>
  _set?: Maybe<Tags_Set_Input>
  pk_columns: Tags_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Tags_ManyArgs = {
  updates: Array<Tags_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Terms_Of_ServiceArgs = {
  _inc?: Maybe<Terms_Of_Service_Inc_Input>
  _set?: Maybe<Terms_Of_Service_Set_Input>
  where: Terms_Of_Service_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Terms_Of_Service_By_PkArgs = {
  _inc?: Maybe<Terms_Of_Service_Inc_Input>
  _set?: Maybe<Terms_Of_Service_Set_Input>
  pk_columns: Terms_Of_Service_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Terms_Of_Service_ManyArgs = {
  updates: Array<Terms_Of_Service_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Tokens_MetadataArgs = {
  _append?: Maybe<Tokens_Metadata_Append_Input>
  _delete_at_path?: Maybe<Tokens_Metadata_Delete_At_Path_Input>
  _delete_elem?: Maybe<Tokens_Metadata_Delete_Elem_Input>
  _delete_key?: Maybe<Tokens_Metadata_Delete_Key_Input>
  _inc?: Maybe<Tokens_Metadata_Inc_Input>
  _prepend?: Maybe<Tokens_Metadata_Prepend_Input>
  _set?: Maybe<Tokens_Metadata_Set_Input>
  where: Tokens_Metadata_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tokens_Metadata_By_PkArgs = {
  _append?: Maybe<Tokens_Metadata_Append_Input>
  _delete_at_path?: Maybe<Tokens_Metadata_Delete_At_Path_Input>
  _delete_elem?: Maybe<Tokens_Metadata_Delete_Elem_Input>
  _delete_key?: Maybe<Tokens_Metadata_Delete_Key_Input>
  _inc?: Maybe<Tokens_Metadata_Inc_Input>
  _prepend?: Maybe<Tokens_Metadata_Prepend_Input>
  _set?: Maybe<Tokens_Metadata_Set_Input>
  pk_columns: Tokens_Metadata_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Tokens_Metadata_ManyArgs = {
  updates: Array<Tokens_Metadata_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_User_ProfilesArgs = {
  _inc?: Maybe<User_Profiles_Inc_Input>
  _set?: Maybe<User_Profiles_Set_Input>
  where: User_Profiles_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_User_Profiles_By_PkArgs = {
  _inc?: Maybe<User_Profiles_Inc_Input>
  _set?: Maybe<User_Profiles_Set_Input>
  pk_columns: User_Profiles_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_User_Profiles_ManyArgs = {
  updates: Array<User_Profiles_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: Maybe<Users_Inc_Input>
  _set?: Maybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: Maybe<Users_Inc_Input>
  _set?: Maybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_VerticalsArgs = {
  _set?: Maybe<Verticals_Set_Input>
  where: Verticals_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Verticals_By_PkArgs = {
  _set?: Maybe<Verticals_Set_Input>
  pk_columns: Verticals_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Verticals_ManyArgs = {
  updates: Array<Verticals_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Webflow_Artist_InfoArgs = {
  _append?: Maybe<Webflow_Artist_Info_Append_Input>
  _delete_at_path?: Maybe<Webflow_Artist_Info_Delete_At_Path_Input>
  _delete_elem?: Maybe<Webflow_Artist_Info_Delete_Elem_Input>
  _delete_key?: Maybe<Webflow_Artist_Info_Delete_Key_Input>
  _prepend?: Maybe<Webflow_Artist_Info_Prepend_Input>
  _set?: Maybe<Webflow_Artist_Info_Set_Input>
  where: Webflow_Artist_Info_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Webflow_Artist_Info_By_PkArgs = {
  _append?: Maybe<Webflow_Artist_Info_Append_Input>
  _delete_at_path?: Maybe<Webflow_Artist_Info_Delete_At_Path_Input>
  _delete_elem?: Maybe<Webflow_Artist_Info_Delete_Elem_Input>
  _delete_key?: Maybe<Webflow_Artist_Info_Delete_Key_Input>
  _prepend?: Maybe<Webflow_Artist_Info_Prepend_Input>
  _set?: Maybe<Webflow_Artist_Info_Set_Input>
  pk_columns: Webflow_Artist_Info_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Webflow_Artist_Info_ManyArgs = {
  updates: Array<Webflow_Artist_Info_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Webflow_Spectrum_ArticlesArgs = {
  _append?: Maybe<Webflow_Spectrum_Articles_Append_Input>
  _delete_at_path?: Maybe<Webflow_Spectrum_Articles_Delete_At_Path_Input>
  _delete_elem?: Maybe<Webflow_Spectrum_Articles_Delete_Elem_Input>
  _delete_key?: Maybe<Webflow_Spectrum_Articles_Delete_Key_Input>
  _prepend?: Maybe<Webflow_Spectrum_Articles_Prepend_Input>
  _set?: Maybe<Webflow_Spectrum_Articles_Set_Input>
  where: Webflow_Spectrum_Articles_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Webflow_Spectrum_Articles_By_PkArgs = {
  _append?: Maybe<Webflow_Spectrum_Articles_Append_Input>
  _delete_at_path?: Maybe<Webflow_Spectrum_Articles_Delete_At_Path_Input>
  _delete_elem?: Maybe<Webflow_Spectrum_Articles_Delete_Elem_Input>
  _delete_key?: Maybe<Webflow_Spectrum_Articles_Delete_Key_Input>
  _prepend?: Maybe<Webflow_Spectrum_Articles_Prepend_Input>
  _set?: Maybe<Webflow_Spectrum_Articles_Set_Input>
  pk_columns: Webflow_Spectrum_Articles_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Webflow_Spectrum_Articles_ManyArgs = {
  updates: Array<Webflow_Spectrum_Articles_Updates>
}

/** columns and relationships of "notifications" */
export type Notifications = {
  __typename?: 'notifications'
  action_text?: Maybe<Scalars['String']>
  action_url?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  dismissed: Scalars['Boolean']
  /** An object relationship */
  image?: Maybe<Media>
  image_id?: Maybe<Scalars['Int']>
  title: Scalars['String']
  trigger_key: Scalars['String']
  trigger_time: Scalars['timestamptz']
  /** An object relationship */
  user: Users
  user_address: Scalars['String']
}

/** aggregated selection of "notifications" */
export type Notifications_Aggregate = {
  __typename?: 'notifications_aggregate'
  aggregate?: Maybe<Notifications_Aggregate_Fields>
  nodes: Array<Notifications>
}

/** aggregate fields of "notifications" */
export type Notifications_Aggregate_Fields = {
  __typename?: 'notifications_aggregate_fields'
  avg?: Maybe<Notifications_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Notifications_Max_Fields>
  min?: Maybe<Notifications_Min_Fields>
  stddev?: Maybe<Notifications_Stddev_Fields>
  stddev_pop?: Maybe<Notifications_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Notifications_Stddev_Samp_Fields>
  sum?: Maybe<Notifications_Sum_Fields>
  var_pop?: Maybe<Notifications_Var_Pop_Fields>
  var_samp?: Maybe<Notifications_Var_Samp_Fields>
  variance?: Maybe<Notifications_Variance_Fields>
}

/** aggregate fields of "notifications" */
export type Notifications_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Notifications_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "notifications" */
export type Notifications_Aggregate_Order_By = {
  avg?: Maybe<Notifications_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Notifications_Max_Order_By>
  min?: Maybe<Notifications_Min_Order_By>
  stddev?: Maybe<Notifications_Stddev_Order_By>
  stddev_pop?: Maybe<Notifications_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Notifications_Stddev_Samp_Order_By>
  sum?: Maybe<Notifications_Sum_Order_By>
  var_pop?: Maybe<Notifications_Var_Pop_Order_By>
  var_samp?: Maybe<Notifications_Var_Samp_Order_By>
  variance?: Maybe<Notifications_Variance_Order_By>
}

/** input type for inserting array relation for remote table "notifications" */
export type Notifications_Arr_Rel_Insert_Input = {
  data: Array<Notifications_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Notifications_On_Conflict>
}

/** aggregate avg on columns */
export type Notifications_Avg_Fields = {
  __typename?: 'notifications_avg_fields'
  image_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "notifications" */
export type Notifications_Avg_Order_By = {
  image_id?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "notifications". All fields are combined with a logical 'AND'. */
export type Notifications_Bool_Exp = {
  _and?: Maybe<Array<Notifications_Bool_Exp>>
  _not?: Maybe<Notifications_Bool_Exp>
  _or?: Maybe<Array<Notifications_Bool_Exp>>
  action_text?: Maybe<String_Comparison_Exp>
  action_url?: Maybe<String_Comparison_Exp>
  body?: Maybe<String_Comparison_Exp>
  dismissed?: Maybe<Boolean_Comparison_Exp>
  image?: Maybe<Media_Bool_Exp>
  image_id?: Maybe<Int_Comparison_Exp>
  title?: Maybe<String_Comparison_Exp>
  trigger_key?: Maybe<String_Comparison_Exp>
  trigger_time?: Maybe<Timestamptz_Comparison_Exp>
  user?: Maybe<Users_Bool_Exp>
  user_address?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "notifications" */
export enum Notifications_Constraint {
  /** unique or primary key constraint on columns "trigger_key", "user_address", "trigger_time" */
  NotificationsPkey = 'notifications_pkey',
}

/** input type for incrementing numeric columns in table "notifications" */
export type Notifications_Inc_Input = {
  image_id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "notifications" */
export type Notifications_Insert_Input = {
  action_text?: Maybe<Scalars['String']>
  action_url?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  dismissed?: Maybe<Scalars['Boolean']>
  image?: Maybe<Media_Obj_Rel_Insert_Input>
  image_id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  trigger_key?: Maybe<Scalars['String']>
  trigger_time?: Maybe<Scalars['timestamptz']>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  user_address?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Notifications_Max_Fields = {
  __typename?: 'notifications_max_fields'
  action_text?: Maybe<Scalars['String']>
  action_url?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  image_id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  trigger_key?: Maybe<Scalars['String']>
  trigger_time?: Maybe<Scalars['timestamptz']>
  user_address?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "notifications" */
export type Notifications_Max_Order_By = {
  action_text?: Maybe<Order_By>
  action_url?: Maybe<Order_By>
  body?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  title?: Maybe<Order_By>
  trigger_key?: Maybe<Order_By>
  trigger_time?: Maybe<Order_By>
  user_address?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Notifications_Min_Fields = {
  __typename?: 'notifications_min_fields'
  action_text?: Maybe<Scalars['String']>
  action_url?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  image_id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  trigger_key?: Maybe<Scalars['String']>
  trigger_time?: Maybe<Scalars['timestamptz']>
  user_address?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "notifications" */
export type Notifications_Min_Order_By = {
  action_text?: Maybe<Order_By>
  action_url?: Maybe<Order_By>
  body?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  title?: Maybe<Order_By>
  trigger_key?: Maybe<Order_By>
  trigger_time?: Maybe<Order_By>
  user_address?: Maybe<Order_By>
}

/** response of any mutation on the table "notifications" */
export type Notifications_Mutation_Response = {
  __typename?: 'notifications_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Notifications>
}

/** on_conflict condition type for table "notifications" */
export type Notifications_On_Conflict = {
  constraint: Notifications_Constraint
  update_columns?: Array<Notifications_Update_Column>
  where?: Maybe<Notifications_Bool_Exp>
}

/** Ordering options when selecting data from "notifications". */
export type Notifications_Order_By = {
  action_text?: Maybe<Order_By>
  action_url?: Maybe<Order_By>
  body?: Maybe<Order_By>
  dismissed?: Maybe<Order_By>
  image?: Maybe<Media_Order_By>
  image_id?: Maybe<Order_By>
  title?: Maybe<Order_By>
  trigger_key?: Maybe<Order_By>
  trigger_time?: Maybe<Order_By>
  user?: Maybe<Users_Order_By>
  user_address?: Maybe<Order_By>
}

/** primary key columns input for table: notifications */
export type Notifications_Pk_Columns_Input = {
  trigger_key: Scalars['String']
  trigger_time: Scalars['timestamptz']
  user_address: Scalars['String']
}

/** select columns of table "notifications" */
export enum Notifications_Select_Column {
  /** column name */
  ActionText = 'action_text',
  /** column name */
  ActionUrl = 'action_url',
  /** column name */
  Body = 'body',
  /** column name */
  Dismissed = 'dismissed',
  /** column name */
  ImageId = 'image_id',
  /** column name */
  Title = 'title',
  /** column name */
  TriggerKey = 'trigger_key',
  /** column name */
  TriggerTime = 'trigger_time',
  /** column name */
  UserAddress = 'user_address',
}

/** input type for updating data in table "notifications" */
export type Notifications_Set_Input = {
  action_text?: Maybe<Scalars['String']>
  action_url?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  dismissed?: Maybe<Scalars['Boolean']>
  image_id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  trigger_key?: Maybe<Scalars['String']>
  trigger_time?: Maybe<Scalars['timestamptz']>
  user_address?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Notifications_Stddev_Fields = {
  __typename?: 'notifications_stddev_fields'
  image_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "notifications" */
export type Notifications_Stddev_Order_By = {
  image_id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Notifications_Stddev_Pop_Fields = {
  __typename?: 'notifications_stddev_pop_fields'
  image_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "notifications" */
export type Notifications_Stddev_Pop_Order_By = {
  image_id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Notifications_Stddev_Samp_Fields = {
  __typename?: 'notifications_stddev_samp_fields'
  image_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "notifications" */
export type Notifications_Stddev_Samp_Order_By = {
  image_id?: Maybe<Order_By>
}

/** Streaming cursor of the table "notifications" */
export type Notifications_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Notifications_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Notifications_Stream_Cursor_Value_Input = {
  action_text?: Maybe<Scalars['String']>
  action_url?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  dismissed?: Maybe<Scalars['Boolean']>
  image_id?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  trigger_key?: Maybe<Scalars['String']>
  trigger_time?: Maybe<Scalars['timestamptz']>
  user_address?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Notifications_Sum_Fields = {
  __typename?: 'notifications_sum_fields'
  image_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "notifications" */
export type Notifications_Sum_Order_By = {
  image_id?: Maybe<Order_By>
}

/** update columns of table "notifications" */
export enum Notifications_Update_Column {
  /** column name */
  ActionText = 'action_text',
  /** column name */
  ActionUrl = 'action_url',
  /** column name */
  Body = 'body',
  /** column name */
  Dismissed = 'dismissed',
  /** column name */
  ImageId = 'image_id',
  /** column name */
  Title = 'title',
  /** column name */
  TriggerKey = 'trigger_key',
  /** column name */
  TriggerTime = 'trigger_time',
  /** column name */
  UserAddress = 'user_address',
}

export type Notifications_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Notifications_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Notifications_Set_Input>
  where: Notifications_Bool_Exp
}

/** aggregate var_pop on columns */
export type Notifications_Var_Pop_Fields = {
  __typename?: 'notifications_var_pop_fields'
  image_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "notifications" */
export type Notifications_Var_Pop_Order_By = {
  image_id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Notifications_Var_Samp_Fields = {
  __typename?: 'notifications_var_samp_fields'
  image_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "notifications" */
export type Notifications_Var_Samp_Order_By = {
  image_id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Notifications_Variance_Fields = {
  __typename?: 'notifications_variance_fields'
  image_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "notifications" */
export type Notifications_Variance_Order_By = {
  image_id?: Maybe<Order_By>
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>
  _gt?: Maybe<Scalars['numeric']>
  _gte?: Maybe<Scalars['numeric']>
  _in?: Maybe<Array<Scalars['numeric']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['numeric']>
  _lte?: Maybe<Scalars['numeric']>
  _neq?: Maybe<Scalars['numeric']>
  _nin?: Maybe<Array<Scalars['numeric']>>
}

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
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies = {
  __typename?: 'project_external_asset_dependencies'
  cid: Scalars['String']
  dependency_type: Project_External_Asset_Dependency_Types_Enum
  index: Scalars['Int']
  /** An object relationship */
  project: Projects_Metadata
  project_id: Scalars['String']
}

/** aggregated selection of "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Aggregate = {
  __typename?: 'project_external_asset_dependencies_aggregate'
  aggregate?: Maybe<Project_External_Asset_Dependencies_Aggregate_Fields>
  nodes: Array<Project_External_Asset_Dependencies>
}

/** aggregate fields of "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Aggregate_Fields = {
  __typename?: 'project_external_asset_dependencies_aggregate_fields'
  avg?: Maybe<Project_External_Asset_Dependencies_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Project_External_Asset_Dependencies_Max_Fields>
  min?: Maybe<Project_External_Asset_Dependencies_Min_Fields>
  stddev?: Maybe<Project_External_Asset_Dependencies_Stddev_Fields>
  stddev_pop?: Maybe<Project_External_Asset_Dependencies_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Project_External_Asset_Dependencies_Stddev_Samp_Fields>
  sum?: Maybe<Project_External_Asset_Dependencies_Sum_Fields>
  var_pop?: Maybe<Project_External_Asset_Dependencies_Var_Pop_Fields>
  var_samp?: Maybe<Project_External_Asset_Dependencies_Var_Samp_Fields>
  variance?: Maybe<Project_External_Asset_Dependencies_Variance_Fields>
}

/** aggregate fields of "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_External_Asset_Dependencies_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Aggregate_Order_By = {
  avg?: Maybe<Project_External_Asset_Dependencies_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Project_External_Asset_Dependencies_Max_Order_By>
  min?: Maybe<Project_External_Asset_Dependencies_Min_Order_By>
  stddev?: Maybe<Project_External_Asset_Dependencies_Stddev_Order_By>
  stddev_pop?: Maybe<Project_External_Asset_Dependencies_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Project_External_Asset_Dependencies_Stddev_Samp_Order_By>
  sum?: Maybe<Project_External_Asset_Dependencies_Sum_Order_By>
  var_pop?: Maybe<Project_External_Asset_Dependencies_Var_Pop_Order_By>
  var_samp?: Maybe<Project_External_Asset_Dependencies_Var_Samp_Order_By>
  variance?: Maybe<Project_External_Asset_Dependencies_Variance_Order_By>
}

/** input type for inserting array relation for remote table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Arr_Rel_Insert_Input = {
  data: Array<Project_External_Asset_Dependencies_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Project_External_Asset_Dependencies_On_Conflict>
}

/** aggregate avg on columns */
export type Project_External_Asset_Dependencies_Avg_Fields = {
  __typename?: 'project_external_asset_dependencies_avg_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Avg_Order_By = {
  index?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "project_external_asset_dependencies". All fields are combined with a logical 'AND'. */
export type Project_External_Asset_Dependencies_Bool_Exp = {
  _and?: Maybe<Array<Project_External_Asset_Dependencies_Bool_Exp>>
  _not?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
  _or?: Maybe<Array<Project_External_Asset_Dependencies_Bool_Exp>>
  cid?: Maybe<String_Comparison_Exp>
  dependency_type?: Maybe<Project_External_Asset_Dependency_Types_Enum_Comparison_Exp>
  index?: Maybe<Int_Comparison_Exp>
  project?: Maybe<Projects_Metadata_Bool_Exp>
  project_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "project_external_asset_dependencies" */
export enum Project_External_Asset_Dependencies_Constraint {
  /** unique or primary key constraint on columns "index", "project_id" */
  ProjectExternalAssetDependenciesPkey = 'project_external_asset_dependencies_pkey',
}

/** input type for incrementing numeric columns in table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Inc_Input = {
  index?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Insert_Input = {
  cid?: Maybe<Scalars['String']>
  dependency_type?: Maybe<Project_External_Asset_Dependency_Types_Enum>
  index?: Maybe<Scalars['Int']>
  project?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Project_External_Asset_Dependencies_Max_Fields = {
  __typename?: 'project_external_asset_dependencies_max_fields'
  cid?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Max_Order_By = {
  cid?: Maybe<Order_By>
  index?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Project_External_Asset_Dependencies_Min_Fields = {
  __typename?: 'project_external_asset_dependencies_min_fields'
  cid?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Min_Order_By = {
  cid?: Maybe<Order_By>
  index?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
}

/** response of any mutation on the table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Mutation_Response = {
  __typename?: 'project_external_asset_dependencies_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Project_External_Asset_Dependencies>
}

/** on_conflict condition type for table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_On_Conflict = {
  constraint: Project_External_Asset_Dependencies_Constraint
  update_columns?: Array<Project_External_Asset_Dependencies_Update_Column>
  where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
}

/** Ordering options when selecting data from "project_external_asset_dependencies". */
export type Project_External_Asset_Dependencies_Order_By = {
  cid?: Maybe<Order_By>
  dependency_type?: Maybe<Order_By>
  index?: Maybe<Order_By>
  project?: Maybe<Projects_Metadata_Order_By>
  project_id?: Maybe<Order_By>
}

/** primary key columns input for table: project_external_asset_dependencies */
export type Project_External_Asset_Dependencies_Pk_Columns_Input = {
  index: Scalars['Int']
  project_id: Scalars['String']
}

/** select columns of table "project_external_asset_dependencies" */
export enum Project_External_Asset_Dependencies_Select_Column {
  /** column name */
  Cid = 'cid',
  /** column name */
  DependencyType = 'dependency_type',
  /** column name */
  Index = 'index',
  /** column name */
  ProjectId = 'project_id',
}

/** input type for updating data in table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Set_Input = {
  cid?: Maybe<Scalars['String']>
  dependency_type?: Maybe<Project_External_Asset_Dependency_Types_Enum>
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Project_External_Asset_Dependencies_Stddev_Fields = {
  __typename?: 'project_external_asset_dependencies_stddev_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stddev_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Project_External_Asset_Dependencies_Stddev_Pop_Fields = {
  __typename?: 'project_external_asset_dependencies_stddev_pop_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stddev_Pop_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Project_External_Asset_Dependencies_Stddev_Samp_Fields = {
  __typename?: 'project_external_asset_dependencies_stddev_samp_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stddev_Samp_Order_By = {
  index?: Maybe<Order_By>
}

/** Streaming cursor of the table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_External_Asset_Dependencies_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Project_External_Asset_Dependencies_Stream_Cursor_Value_Input = {
  cid?: Maybe<Scalars['String']>
  dependency_type?: Maybe<Project_External_Asset_Dependency_Types_Enum>
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Project_External_Asset_Dependencies_Sum_Fields = {
  __typename?: 'project_external_asset_dependencies_sum_fields'
  index?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Sum_Order_By = {
  index?: Maybe<Order_By>
}

/** update columns of table "project_external_asset_dependencies" */
export enum Project_External_Asset_Dependencies_Update_Column {
  /** column name */
  Cid = 'cid',
  /** column name */
  DependencyType = 'dependency_type',
  /** column name */
  Index = 'index',
  /** column name */
  ProjectId = 'project_id',
}

export type Project_External_Asset_Dependencies_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Project_External_Asset_Dependencies_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Project_External_Asset_Dependencies_Set_Input>
  where: Project_External_Asset_Dependencies_Bool_Exp
}

/** aggregate var_pop on columns */
export type Project_External_Asset_Dependencies_Var_Pop_Fields = {
  __typename?: 'project_external_asset_dependencies_var_pop_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Var_Pop_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Project_External_Asset_Dependencies_Var_Samp_Fields = {
  __typename?: 'project_external_asset_dependencies_var_samp_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Var_Samp_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Project_External_Asset_Dependencies_Variance_Fields = {
  __typename?: 'project_external_asset_dependencies_variance_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "project_external_asset_dependencies" */
export type Project_External_Asset_Dependencies_Variance_Order_By = {
  index?: Maybe<Order_By>
}

/** columns and relationships of "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types = {
  __typename?: 'project_external_asset_dependency_types'
  type: Scalars['String']
}

/** aggregated selection of "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_Aggregate = {
  __typename?: 'project_external_asset_dependency_types_aggregate'
  aggregate?: Maybe<Project_External_Asset_Dependency_Types_Aggregate_Fields>
  nodes: Array<Project_External_Asset_Dependency_Types>
}

/** aggregate fields of "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_Aggregate_Fields = {
  __typename?: 'project_external_asset_dependency_types_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Project_External_Asset_Dependency_Types_Max_Fields>
  min?: Maybe<Project_External_Asset_Dependency_Types_Min_Fields>
}

/** aggregate fields of "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_Aggregate_FieldsCountArgs =
  {
    columns?: Maybe<
      Array<Project_External_Asset_Dependency_Types_Select_Column>
    >
    distinct?: Maybe<Scalars['Boolean']>
  }

/** Boolean expression to filter rows from the table "project_external_asset_dependency_types". All fields are combined with a logical 'AND'. */
export type Project_External_Asset_Dependency_Types_Bool_Exp = {
  _and?: Maybe<Array<Project_External_Asset_Dependency_Types_Bool_Exp>>
  _not?: Maybe<Project_External_Asset_Dependency_Types_Bool_Exp>
  _or?: Maybe<Array<Project_External_Asset_Dependency_Types_Bool_Exp>>
  type?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "project_external_asset_dependency_types" */
export enum Project_External_Asset_Dependency_Types_Constraint {
  /** unique or primary key constraint on columns "type" */
  ProjectExternalAssetDependencyTypesPkey = 'project_external_asset_dependency_types_pkey',
}

export enum Project_External_Asset_Dependency_Types_Enum {
  Arweave = 'ARWEAVE',
  Ipfs = 'IPFS',
}

/** Boolean expression to compare columns of type "project_external_asset_dependency_types_enum". All fields are combined with logical 'AND'. */
export type Project_External_Asset_Dependency_Types_Enum_Comparison_Exp = {
  _eq?: Maybe<Project_External_Asset_Dependency_Types_Enum>
  _in?: Maybe<Array<Project_External_Asset_Dependency_Types_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Project_External_Asset_Dependency_Types_Enum>
  _nin?: Maybe<Array<Project_External_Asset_Dependency_Types_Enum>>
}

/** input type for inserting data into table "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_Insert_Input = {
  type?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Project_External_Asset_Dependency_Types_Max_Fields = {
  __typename?: 'project_external_asset_dependency_types_max_fields'
  type?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Project_External_Asset_Dependency_Types_Min_Fields = {
  __typename?: 'project_external_asset_dependency_types_min_fields'
  type?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_Mutation_Response = {
  __typename?: 'project_external_asset_dependency_types_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Project_External_Asset_Dependency_Types>
}

/** on_conflict condition type for table "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_On_Conflict = {
  constraint: Project_External_Asset_Dependency_Types_Constraint
  update_columns?: Array<Project_External_Asset_Dependency_Types_Update_Column>
  where?: Maybe<Project_External_Asset_Dependency_Types_Bool_Exp>
}

/** Ordering options when selecting data from "project_external_asset_dependency_types". */
export type Project_External_Asset_Dependency_Types_Order_By = {
  type?: Maybe<Order_By>
}

/** primary key columns input for table: project_external_asset_dependency_types */
export type Project_External_Asset_Dependency_Types_Pk_Columns_Input = {
  type: Scalars['String']
}

/** select columns of table "project_external_asset_dependency_types" */
export enum Project_External_Asset_Dependency_Types_Select_Column {
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_Set_Input = {
  type?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "project_external_asset_dependency_types" */
export type Project_External_Asset_Dependency_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_External_Asset_Dependency_Types_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Project_External_Asset_Dependency_Types_Stream_Cursor_Value_Input =
  {
    type?: Maybe<Scalars['String']>
  }

/** update columns of table "project_external_asset_dependency_types" */
export enum Project_External_Asset_Dependency_Types_Update_Column {
  /** column name */
  Type = 'type',
}

export type Project_External_Asset_Dependency_Types_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Project_External_Asset_Dependency_Types_Set_Input>
  where: Project_External_Asset_Dependency_Types_Bool_Exp
}

/** columns and relationships of "project_minter_configurations" */
export type Project_Minter_Configurations = {
  __typename?: 'project_minter_configurations'
  /** A computed field, executes function "approximate_exp_da_end_time" */
  approximate_exp_da_end_time?: Maybe<Scalars['timestamptz']>
  base_price?: Maybe<Scalars['String']>
  currency_address: Scalars['String']
  currency_symbol: Scalars['String']
  end_time?: Maybe<Scalars['timestamptz']>
  extra_minter_details?: Maybe<Scalars['jsonb']>
  half_life_in_seconds?: Maybe<Scalars['String']>
  id: Scalars['String']
  /** An object relationship */
  minter?: Maybe<Minters_Metadata>
  minter_id: Scalars['String']
  offchain_extra_minter_details?: Maybe<Scalars['jsonb']>
  price_is_configured: Scalars['Boolean']
  /** An object relationship */
  project?: Maybe<Projects_Metadata>
  project_id: Scalars['String']
  purchase_to_disabled: Scalars['Boolean']
  start_price?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timestamptz']>
}

/** columns and relationships of "project_minter_configurations" */
export type Project_Minter_ConfigurationsExtra_Minter_DetailsArgs = {
  path?: Maybe<Scalars['String']>
}

/** columns and relationships of "project_minter_configurations" */
export type Project_Minter_ConfigurationsOffchain_Extra_Minter_DetailsArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "project_minter_configurations" */
export type Project_Minter_Configurations_Aggregate = {
  __typename?: 'project_minter_configurations_aggregate'
  aggregate?: Maybe<Project_Minter_Configurations_Aggregate_Fields>
  nodes: Array<Project_Minter_Configurations>
}

/** aggregate fields of "project_minter_configurations" */
export type Project_Minter_Configurations_Aggregate_Fields = {
  __typename?: 'project_minter_configurations_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Project_Minter_Configurations_Max_Fields>
  min?: Maybe<Project_Minter_Configurations_Min_Fields>
}

/** aggregate fields of "project_minter_configurations" */
export type Project_Minter_Configurations_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Minter_Configurations_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Project_Minter_Configurations_Append_Input = {
  extra_minter_details?: Maybe<Scalars['jsonb']>
  offchain_extra_minter_details?: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "project_minter_configurations". All fields are combined with a logical 'AND'. */
export type Project_Minter_Configurations_Bool_Exp = {
  _and?: Maybe<Array<Project_Minter_Configurations_Bool_Exp>>
  _not?: Maybe<Project_Minter_Configurations_Bool_Exp>
  _or?: Maybe<Array<Project_Minter_Configurations_Bool_Exp>>
  approximate_exp_da_end_time?: Maybe<Timestamptz_Comparison_Exp>
  base_price?: Maybe<String_Comparison_Exp>
  currency_address?: Maybe<String_Comparison_Exp>
  currency_symbol?: Maybe<String_Comparison_Exp>
  end_time?: Maybe<Timestamptz_Comparison_Exp>
  extra_minter_details?: Maybe<Jsonb_Comparison_Exp>
  half_life_in_seconds?: Maybe<String_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  minter?: Maybe<Minters_Metadata_Bool_Exp>
  minter_id?: Maybe<String_Comparison_Exp>
  offchain_extra_minter_details?: Maybe<Jsonb_Comparison_Exp>
  price_is_configured?: Maybe<Boolean_Comparison_Exp>
  project?: Maybe<Projects_Metadata_Bool_Exp>
  project_id?: Maybe<String_Comparison_Exp>
  purchase_to_disabled?: Maybe<Boolean_Comparison_Exp>
  start_price?: Maybe<String_Comparison_Exp>
  start_time?: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "project_minter_configurations" */
export enum Project_Minter_Configurations_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProjectMinterConfigurationsPkey = 'project_minter_configurations_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Project_Minter_Configurations_Delete_At_Path_Input = {
  extra_minter_details?: Maybe<Array<Scalars['String']>>
  offchain_extra_minter_details?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Project_Minter_Configurations_Delete_Elem_Input = {
  extra_minter_details?: Maybe<Scalars['Int']>
  offchain_extra_minter_details?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Project_Minter_Configurations_Delete_Key_Input = {
  extra_minter_details?: Maybe<Scalars['String']>
  offchain_extra_minter_details?: Maybe<Scalars['String']>
}

/** input type for inserting data into table "project_minter_configurations" */
export type Project_Minter_Configurations_Insert_Input = {
  base_price?: Maybe<Scalars['String']>
  currency_address?: Maybe<Scalars['String']>
  currency_symbol?: Maybe<Scalars['String']>
  end_time?: Maybe<Scalars['timestamptz']>
  extra_minter_details?: Maybe<Scalars['jsonb']>
  half_life_in_seconds?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  minter?: Maybe<Minters_Metadata_Obj_Rel_Insert_Input>
  minter_id?: Maybe<Scalars['String']>
  offchain_extra_minter_details?: Maybe<Scalars['jsonb']>
  price_is_configured?: Maybe<Scalars['Boolean']>
  project?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  project_id?: Maybe<Scalars['String']>
  purchase_to_disabled?: Maybe<Scalars['Boolean']>
  start_price?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Project_Minter_Configurations_Max_Fields = {
  __typename?: 'project_minter_configurations_max_fields'
  base_price?: Maybe<Scalars['String']>
  currency_address?: Maybe<Scalars['String']>
  currency_symbol?: Maybe<Scalars['String']>
  end_time?: Maybe<Scalars['timestamptz']>
  half_life_in_seconds?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  minter_id?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  start_price?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Project_Minter_Configurations_Min_Fields = {
  __typename?: 'project_minter_configurations_min_fields'
  base_price?: Maybe<Scalars['String']>
  currency_address?: Maybe<Scalars['String']>
  currency_symbol?: Maybe<Scalars['String']>
  end_time?: Maybe<Scalars['timestamptz']>
  half_life_in_seconds?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  minter_id?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  start_price?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "project_minter_configurations" */
export type Project_Minter_Configurations_Mutation_Response = {
  __typename?: 'project_minter_configurations_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Project_Minter_Configurations>
}

/** input type for inserting object relation for remote table "project_minter_configurations" */
export type Project_Minter_Configurations_Obj_Rel_Insert_Input = {
  data: Project_Minter_Configurations_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Project_Minter_Configurations_On_Conflict>
}

/** on_conflict condition type for table "project_minter_configurations" */
export type Project_Minter_Configurations_On_Conflict = {
  constraint: Project_Minter_Configurations_Constraint
  update_columns?: Array<Project_Minter_Configurations_Update_Column>
  where?: Maybe<Project_Minter_Configurations_Bool_Exp>
}

/** Ordering options when selecting data from "project_minter_configurations". */
export type Project_Minter_Configurations_Order_By = {
  approximate_exp_da_end_time?: Maybe<Order_By>
  base_price?: Maybe<Order_By>
  currency_address?: Maybe<Order_By>
  currency_symbol?: Maybe<Order_By>
  end_time?: Maybe<Order_By>
  extra_minter_details?: Maybe<Order_By>
  half_life_in_seconds?: Maybe<Order_By>
  id?: Maybe<Order_By>
  minter?: Maybe<Minters_Metadata_Order_By>
  minter_id?: Maybe<Order_By>
  offchain_extra_minter_details?: Maybe<Order_By>
  price_is_configured?: Maybe<Order_By>
  project?: Maybe<Projects_Metadata_Order_By>
  project_id?: Maybe<Order_By>
  purchase_to_disabled?: Maybe<Order_By>
  start_price?: Maybe<Order_By>
  start_time?: Maybe<Order_By>
}

/** primary key columns input for table: project_minter_configurations */
export type Project_Minter_Configurations_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Project_Minter_Configurations_Prepend_Input = {
  extra_minter_details?: Maybe<Scalars['jsonb']>
  offchain_extra_minter_details?: Maybe<Scalars['jsonb']>
}

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
  StartTime = 'start_time',
}

/** input type for updating data in table "project_minter_configurations" */
export type Project_Minter_Configurations_Set_Input = {
  base_price?: Maybe<Scalars['String']>
  currency_address?: Maybe<Scalars['String']>
  currency_symbol?: Maybe<Scalars['String']>
  end_time?: Maybe<Scalars['timestamptz']>
  extra_minter_details?: Maybe<Scalars['jsonb']>
  half_life_in_seconds?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  minter_id?: Maybe<Scalars['String']>
  offchain_extra_minter_details?: Maybe<Scalars['jsonb']>
  price_is_configured?: Maybe<Scalars['Boolean']>
  project_id?: Maybe<Scalars['String']>
  purchase_to_disabled?: Maybe<Scalars['Boolean']>
  start_price?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timestamptz']>
}

/** Streaming cursor of the table "project_minter_configurations" */
export type Project_Minter_Configurations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Minter_Configurations_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Project_Minter_Configurations_Stream_Cursor_Value_Input = {
  base_price?: Maybe<Scalars['String']>
  currency_address?: Maybe<Scalars['String']>
  currency_symbol?: Maybe<Scalars['String']>
  end_time?: Maybe<Scalars['timestamptz']>
  extra_minter_details?: Maybe<Scalars['jsonb']>
  half_life_in_seconds?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  minter_id?: Maybe<Scalars['String']>
  offchain_extra_minter_details?: Maybe<Scalars['jsonb']>
  price_is_configured?: Maybe<Scalars['Boolean']>
  project_id?: Maybe<Scalars['String']>
  purchase_to_disabled?: Maybe<Scalars['Boolean']>
  start_price?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timestamptz']>
}

/** update columns of table "project_minter_configurations" */
export enum Project_Minter_Configurations_Update_Column {
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
  StartTime = 'start_time',
}

export type Project_Minter_Configurations_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Project_Minter_Configurations_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Project_Minter_Configurations_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Project_Minter_Configurations_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Project_Minter_Configurations_Delete_Key_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Project_Minter_Configurations_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Project_Minter_Configurations_Set_Input>
  where: Project_Minter_Configurations_Bool_Exp
}

/** columns and relationships of "project_scripts" */
export type Project_Scripts = {
  __typename?: 'project_scripts'
  index: Scalars['Int']
  /** An object relationship */
  project?: Maybe<Projects_Metadata>
  project_id: Scalars['String']
  script: Scalars['String']
}

/** aggregated selection of "project_scripts" */
export type Project_Scripts_Aggregate = {
  __typename?: 'project_scripts_aggregate'
  aggregate?: Maybe<Project_Scripts_Aggregate_Fields>
  nodes: Array<Project_Scripts>
}

/** aggregate fields of "project_scripts" */
export type Project_Scripts_Aggregate_Fields = {
  __typename?: 'project_scripts_aggregate_fields'
  avg?: Maybe<Project_Scripts_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Project_Scripts_Max_Fields>
  min?: Maybe<Project_Scripts_Min_Fields>
  stddev?: Maybe<Project_Scripts_Stddev_Fields>
  stddev_pop?: Maybe<Project_Scripts_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Project_Scripts_Stddev_Samp_Fields>
  sum?: Maybe<Project_Scripts_Sum_Fields>
  var_pop?: Maybe<Project_Scripts_Var_Pop_Fields>
  var_samp?: Maybe<Project_Scripts_Var_Samp_Fields>
  variance?: Maybe<Project_Scripts_Variance_Fields>
}

/** aggregate fields of "project_scripts" */
export type Project_Scripts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Scripts_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "project_scripts" */
export type Project_Scripts_Aggregate_Order_By = {
  avg?: Maybe<Project_Scripts_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Project_Scripts_Max_Order_By>
  min?: Maybe<Project_Scripts_Min_Order_By>
  stddev?: Maybe<Project_Scripts_Stddev_Order_By>
  stddev_pop?: Maybe<Project_Scripts_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Project_Scripts_Stddev_Samp_Order_By>
  sum?: Maybe<Project_Scripts_Sum_Order_By>
  var_pop?: Maybe<Project_Scripts_Var_Pop_Order_By>
  var_samp?: Maybe<Project_Scripts_Var_Samp_Order_By>
  variance?: Maybe<Project_Scripts_Variance_Order_By>
}

/** input type for inserting array relation for remote table "project_scripts" */
export type Project_Scripts_Arr_Rel_Insert_Input = {
  data: Array<Project_Scripts_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Project_Scripts_On_Conflict>
}

/** aggregate avg on columns */
export type Project_Scripts_Avg_Fields = {
  __typename?: 'project_scripts_avg_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "project_scripts" */
export type Project_Scripts_Avg_Order_By = {
  index?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "project_scripts". All fields are combined with a logical 'AND'. */
export type Project_Scripts_Bool_Exp = {
  _and?: Maybe<Array<Project_Scripts_Bool_Exp>>
  _not?: Maybe<Project_Scripts_Bool_Exp>
  _or?: Maybe<Array<Project_Scripts_Bool_Exp>>
  index?: Maybe<Int_Comparison_Exp>
  project?: Maybe<Projects_Metadata_Bool_Exp>
  project_id?: Maybe<String_Comparison_Exp>
  script?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "project_scripts" */
export enum Project_Scripts_Constraint {
  /** unique or primary key constraint on columns "index", "project_id" */
  ProjectScriptsPkey = 'project_scripts_pkey',
}

/** input type for incrementing numeric columns in table "project_scripts" */
export type Project_Scripts_Inc_Input = {
  index?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "project_scripts" */
export type Project_Scripts_Insert_Input = {
  index?: Maybe<Scalars['Int']>
  project?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  project_id?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Project_Scripts_Max_Fields = {
  __typename?: 'project_scripts_max_fields'
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "project_scripts" */
export type Project_Scripts_Max_Order_By = {
  index?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  script?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Project_Scripts_Min_Fields = {
  __typename?: 'project_scripts_min_fields'
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "project_scripts" */
export type Project_Scripts_Min_Order_By = {
  index?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  script?: Maybe<Order_By>
}

/** response of any mutation on the table "project_scripts" */
export type Project_Scripts_Mutation_Response = {
  __typename?: 'project_scripts_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Project_Scripts>
}

/** on_conflict condition type for table "project_scripts" */
export type Project_Scripts_On_Conflict = {
  constraint: Project_Scripts_Constraint
  update_columns?: Array<Project_Scripts_Update_Column>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

/** Ordering options when selecting data from "project_scripts". */
export type Project_Scripts_Order_By = {
  index?: Maybe<Order_By>
  project?: Maybe<Projects_Metadata_Order_By>
  project_id?: Maybe<Order_By>
  script?: Maybe<Order_By>
}

/** primary key columns input for table: project_scripts */
export type Project_Scripts_Pk_Columns_Input = {
  index: Scalars['Int']
  project_id: Scalars['String']
}

/** select columns of table "project_scripts" */
export enum Project_Scripts_Select_Column {
  /** column name */
  Index = 'index',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Script = 'script',
}

/** input type for updating data in table "project_scripts" */
export type Project_Scripts_Set_Input = {
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Project_Scripts_Stddev_Fields = {
  __typename?: 'project_scripts_stddev_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "project_scripts" */
export type Project_Scripts_Stddev_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Project_Scripts_Stddev_Pop_Fields = {
  __typename?: 'project_scripts_stddev_pop_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "project_scripts" */
export type Project_Scripts_Stddev_Pop_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Project_Scripts_Stddev_Samp_Fields = {
  __typename?: 'project_scripts_stddev_samp_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "project_scripts" */
export type Project_Scripts_Stddev_Samp_Order_By = {
  index?: Maybe<Order_By>
}

/** Streaming cursor of the table "project_scripts" */
export type Project_Scripts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Scripts_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Project_Scripts_Stream_Cursor_Value_Input = {
  index?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Project_Scripts_Sum_Fields = {
  __typename?: 'project_scripts_sum_fields'
  index?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "project_scripts" */
export type Project_Scripts_Sum_Order_By = {
  index?: Maybe<Order_By>
}

/** update columns of table "project_scripts" */
export enum Project_Scripts_Update_Column {
  /** column name */
  Index = 'index',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Script = 'script',
}

export type Project_Scripts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Project_Scripts_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Project_Scripts_Set_Input>
  where: Project_Scripts_Bool_Exp
}

/** aggregate var_pop on columns */
export type Project_Scripts_Var_Pop_Fields = {
  __typename?: 'project_scripts_var_pop_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "project_scripts" */
export type Project_Scripts_Var_Pop_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Project_Scripts_Var_Samp_Fields = {
  __typename?: 'project_scripts_var_samp_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "project_scripts" */
export type Project_Scripts_Var_Samp_Order_By = {
  index?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Project_Scripts_Variance_Fields = {
  __typename?: 'project_scripts_variance_fields'
  index?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "project_scripts" */
export type Project_Scripts_Variance_Order_By = {
  index?: Maybe<Order_By>
}

/** columns and relationships of "project_series" */
export type Project_Series = {
  __typename?: 'project_series'
  id: Scalars['Int']
  /** An array relationship */
  projects: Array<Projects_Metadata>
  /** An aggregate relationship */
  projects_aggregate: Projects_Metadata_Aggregate
}

/** columns and relationships of "project_series" */
export type Project_SeriesProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** columns and relationships of "project_series" */
export type Project_SeriesProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** aggregated selection of "project_series" */
export type Project_Series_Aggregate = {
  __typename?: 'project_series_aggregate'
  aggregate?: Maybe<Project_Series_Aggregate_Fields>
  nodes: Array<Project_Series>
}

/** aggregate fields of "project_series" */
export type Project_Series_Aggregate_Fields = {
  __typename?: 'project_series_aggregate_fields'
  avg?: Maybe<Project_Series_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Project_Series_Max_Fields>
  min?: Maybe<Project_Series_Min_Fields>
  stddev?: Maybe<Project_Series_Stddev_Fields>
  stddev_pop?: Maybe<Project_Series_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Project_Series_Stddev_Samp_Fields>
  sum?: Maybe<Project_Series_Sum_Fields>
  var_pop?: Maybe<Project_Series_Var_Pop_Fields>
  var_samp?: Maybe<Project_Series_Var_Samp_Fields>
  variance?: Maybe<Project_Series_Variance_Fields>
}

/** aggregate fields of "project_series" */
export type Project_Series_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Series_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Project_Series_Avg_Fields = {
  __typename?: 'project_series_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "project_series". All fields are combined with a logical 'AND'. */
export type Project_Series_Bool_Exp = {
  _and?: Maybe<Array<Project_Series_Bool_Exp>>
  _not?: Maybe<Project_Series_Bool_Exp>
  _or?: Maybe<Array<Project_Series_Bool_Exp>>
  id?: Maybe<Int_Comparison_Exp>
  projects?: Maybe<Projects_Metadata_Bool_Exp>
}

/** unique or primary key constraints on table "project_series" */
export enum Project_Series_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProjectSeriesPkey = 'project_series_pkey',
}

/** input type for incrementing numeric columns in table "project_series" */
export type Project_Series_Inc_Input = {
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "project_series" */
export type Project_Series_Insert_Input = {
  id?: Maybe<Scalars['Int']>
  projects?: Maybe<Projects_Metadata_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Project_Series_Max_Fields = {
  __typename?: 'project_series_max_fields'
  id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Project_Series_Min_Fields = {
  __typename?: 'project_series_min_fields'
  id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "project_series" */
export type Project_Series_Mutation_Response = {
  __typename?: 'project_series_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Project_Series>
}

/** input type for inserting object relation for remote table "project_series" */
export type Project_Series_Obj_Rel_Insert_Input = {
  data: Project_Series_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Project_Series_On_Conflict>
}

/** on_conflict condition type for table "project_series" */
export type Project_Series_On_Conflict = {
  constraint: Project_Series_Constraint
  update_columns?: Array<Project_Series_Update_Column>
  where?: Maybe<Project_Series_Bool_Exp>
}

/** Ordering options when selecting data from "project_series". */
export type Project_Series_Order_By = {
  id?: Maybe<Order_By>
  projects_aggregate?: Maybe<Projects_Metadata_Aggregate_Order_By>
}

/** primary key columns input for table: project_series */
export type Project_Series_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "project_series" */
export enum Project_Series_Select_Column {
  /** column name */
  Id = 'id',
}

/** input type for updating data in table "project_series" */
export type Project_Series_Set_Input = {
  id?: Maybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Project_Series_Stddev_Fields = {
  __typename?: 'project_series_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Project_Series_Stddev_Pop_Fields = {
  __typename?: 'project_series_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Project_Series_Stddev_Samp_Fields = {
  __typename?: 'project_series_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "project_series" */
export type Project_Series_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Series_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Project_Series_Stream_Cursor_Value_Input = {
  id?: Maybe<Scalars['Int']>
}

/** aggregate sum on columns */
export type Project_Series_Sum_Fields = {
  __typename?: 'project_series_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "project_series" */
export enum Project_Series_Update_Column {
  /** column name */
  Id = 'id',
}

export type Project_Series_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Project_Series_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Project_Series_Set_Input>
  where: Project_Series_Bool_Exp
}

/** aggregate var_pop on columns */
export type Project_Series_Var_Pop_Fields = {
  __typename?: 'project_series_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Project_Series_Var_Samp_Fields = {
  __typename?: 'project_series_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Project_Series_Variance_Fields = {
  __typename?: 'project_series_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "project_vertical_categories" */
export type Project_Vertical_Categories = {
  __typename?: 'project_vertical_categories'
  /** An object relationship */
  category: Categories
  hosted: Scalars['Boolean']
  is_artblocks?: Maybe<Scalars['Boolean']>
  name: Categories_Enum
  /** An array relationship */
  verticals: Array<Project_Verticals>
  /** An aggregate relationship */
  verticals_aggregate: Project_Verticals_Aggregate
}

/** columns and relationships of "project_vertical_categories" */
export type Project_Vertical_CategoriesVerticalsArgs = {
  distinct_on?: Maybe<Array<Project_Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Verticals_Order_By>>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

/** columns and relationships of "project_vertical_categories" */
export type Project_Vertical_CategoriesVerticals_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Verticals_Order_By>>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

/** aggregated selection of "project_vertical_categories" */
export type Project_Vertical_Categories_Aggregate = {
  __typename?: 'project_vertical_categories_aggregate'
  aggregate?: Maybe<Project_Vertical_Categories_Aggregate_Fields>
  nodes: Array<Project_Vertical_Categories>
}

/** aggregate fields of "project_vertical_categories" */
export type Project_Vertical_Categories_Aggregate_Fields = {
  __typename?: 'project_vertical_categories_aggregate_fields'
  count: Scalars['Int']
}

/** aggregate fields of "project_vertical_categories" */
export type Project_Vertical_Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Vertical_Categories_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "project_vertical_categories". All fields are combined with a logical 'AND'. */
export type Project_Vertical_Categories_Bool_Exp = {
  _and?: Maybe<Array<Project_Vertical_Categories_Bool_Exp>>
  _not?: Maybe<Project_Vertical_Categories_Bool_Exp>
  _or?: Maybe<Array<Project_Vertical_Categories_Bool_Exp>>
  category?: Maybe<Categories_Bool_Exp>
  hosted?: Maybe<Boolean_Comparison_Exp>
  is_artblocks?: Maybe<Boolean_Comparison_Exp>
  name?: Maybe<Categories_Enum_Comparison_Exp>
  verticals?: Maybe<Project_Verticals_Bool_Exp>
}

/** unique or primary key constraints on table "project_vertical_categories" */
export enum Project_Vertical_Categories_Constraint {
  /** unique or primary key constraint on columns "name" */
  ProjectVerticalCategoriesPkey = 'project_vertical_categories_pkey',
}

/** input type for inserting data into table "project_vertical_categories" */
export type Project_Vertical_Categories_Insert_Input = {
  category?: Maybe<Categories_Obj_Rel_Insert_Input>
  hosted?: Maybe<Scalars['Boolean']>
  is_artblocks?: Maybe<Scalars['Boolean']>
  name?: Maybe<Categories_Enum>
  verticals?: Maybe<Project_Verticals_Arr_Rel_Insert_Input>
}

/** response of any mutation on the table "project_vertical_categories" */
export type Project_Vertical_Categories_Mutation_Response = {
  __typename?: 'project_vertical_categories_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Project_Vertical_Categories>
}

/** input type for inserting object relation for remote table "project_vertical_categories" */
export type Project_Vertical_Categories_Obj_Rel_Insert_Input = {
  data: Project_Vertical_Categories_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Project_Vertical_Categories_On_Conflict>
}

/** on_conflict condition type for table "project_vertical_categories" */
export type Project_Vertical_Categories_On_Conflict = {
  constraint: Project_Vertical_Categories_Constraint
  update_columns?: Array<Project_Vertical_Categories_Update_Column>
  where?: Maybe<Project_Vertical_Categories_Bool_Exp>
}

/** Ordering options when selecting data from "project_vertical_categories". */
export type Project_Vertical_Categories_Order_By = {
  category?: Maybe<Categories_Order_By>
  hosted?: Maybe<Order_By>
  is_artblocks?: Maybe<Order_By>
  name?: Maybe<Order_By>
  verticals_aggregate?: Maybe<Project_Verticals_Aggregate_Order_By>
}

/** primary key columns input for table: project_vertical_categories */
export type Project_Vertical_Categories_Pk_Columns_Input = {
  name: Categories_Enum
}

/** select columns of table "project_vertical_categories" */
export enum Project_Vertical_Categories_Select_Column {
  /** column name */
  Hosted = 'hosted',
  /** column name */
  IsArtblocks = 'is_artblocks',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "project_vertical_categories" */
export type Project_Vertical_Categories_Set_Input = {
  hosted?: Maybe<Scalars['Boolean']>
  is_artblocks?: Maybe<Scalars['Boolean']>
  name?: Maybe<Categories_Enum>
}

/** Streaming cursor of the table "project_vertical_categories" */
export type Project_Vertical_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Vertical_Categories_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Project_Vertical_Categories_Stream_Cursor_Value_Input = {
  hosted?: Maybe<Scalars['Boolean']>
  is_artblocks?: Maybe<Scalars['Boolean']>
  name?: Maybe<Categories_Enum>
}

/** update columns of table "project_vertical_categories" */
export enum Project_Vertical_Categories_Update_Column {
  /** column name */
  Hosted = 'hosted',
  /** column name */
  IsArtblocks = 'is_artblocks',
  /** column name */
  Name = 'name',
}

export type Project_Vertical_Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Project_Vertical_Categories_Set_Input>
  where: Project_Vertical_Categories_Bool_Exp
}

/** columns and relationships of "project_verticals" */
export type Project_Verticals = {
  __typename?: 'project_verticals'
  active: Scalars['Boolean']
  /** An object relationship */
  category: Project_Vertical_Categories
  category_name: Scalars['String']
  description?: Maybe<Scalars['String']>
  display_name: Scalars['String']
  name: Verticals_Enum
  /** An array relationship */
  projects: Array<Projects_Metadata>
  /** An aggregate relationship */
  projects_aggregate: Projects_Metadata_Aggregate
  /** An object relationship */
  vertical: Verticals
}

/** columns and relationships of "project_verticals" */
export type Project_VerticalsProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** columns and relationships of "project_verticals" */
export type Project_VerticalsProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** aggregated selection of "project_verticals" */
export type Project_Verticals_Aggregate = {
  __typename?: 'project_verticals_aggregate'
  aggregate?: Maybe<Project_Verticals_Aggregate_Fields>
  nodes: Array<Project_Verticals>
}

/** aggregate fields of "project_verticals" */
export type Project_Verticals_Aggregate_Fields = {
  __typename?: 'project_verticals_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Project_Verticals_Max_Fields>
  min?: Maybe<Project_Verticals_Min_Fields>
}

/** aggregate fields of "project_verticals" */
export type Project_Verticals_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Verticals_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "project_verticals" */
export type Project_Verticals_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Project_Verticals_Max_Order_By>
  min?: Maybe<Project_Verticals_Min_Order_By>
}

/** input type for inserting array relation for remote table "project_verticals" */
export type Project_Verticals_Arr_Rel_Insert_Input = {
  data: Array<Project_Verticals_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Project_Verticals_On_Conflict>
}

/** Boolean expression to filter rows from the table "project_verticals". All fields are combined with a logical 'AND'. */
export type Project_Verticals_Bool_Exp = {
  _and?: Maybe<Array<Project_Verticals_Bool_Exp>>
  _not?: Maybe<Project_Verticals_Bool_Exp>
  _or?: Maybe<Array<Project_Verticals_Bool_Exp>>
  active?: Maybe<Boolean_Comparison_Exp>
  category?: Maybe<Project_Vertical_Categories_Bool_Exp>
  category_name?: Maybe<String_Comparison_Exp>
  description?: Maybe<String_Comparison_Exp>
  display_name?: Maybe<String_Comparison_Exp>
  name?: Maybe<Verticals_Enum_Comparison_Exp>
  projects?: Maybe<Projects_Metadata_Bool_Exp>
  vertical?: Maybe<Verticals_Bool_Exp>
}

/** unique or primary key constraints on table "project_verticals" */
export enum Project_Verticals_Constraint {
  /** unique or primary key constraint on columns "name" */
  ProjectVerticalsPkey = 'project_verticals_pkey',
}

/** input type for inserting data into table "project_verticals" */
export type Project_Verticals_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>
  category?: Maybe<Project_Vertical_Categories_Obj_Rel_Insert_Input>
  category_name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  name?: Maybe<Verticals_Enum>
  projects?: Maybe<Projects_Metadata_Arr_Rel_Insert_Input>
  vertical?: Maybe<Verticals_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Project_Verticals_Max_Fields = {
  __typename?: 'project_verticals_max_fields'
  category_name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "project_verticals" */
export type Project_Verticals_Max_Order_By = {
  category_name?: Maybe<Order_By>
  description?: Maybe<Order_By>
  display_name?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Project_Verticals_Min_Fields = {
  __typename?: 'project_verticals_min_fields'
  category_name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "project_verticals" */
export type Project_Verticals_Min_Order_By = {
  category_name?: Maybe<Order_By>
  description?: Maybe<Order_By>
  display_name?: Maybe<Order_By>
}

/** response of any mutation on the table "project_verticals" */
export type Project_Verticals_Mutation_Response = {
  __typename?: 'project_verticals_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Project_Verticals>
}

/** input type for inserting object relation for remote table "project_verticals" */
export type Project_Verticals_Obj_Rel_Insert_Input = {
  data: Project_Verticals_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Project_Verticals_On_Conflict>
}

/** on_conflict condition type for table "project_verticals" */
export type Project_Verticals_On_Conflict = {
  constraint: Project_Verticals_Constraint
  update_columns?: Array<Project_Verticals_Update_Column>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

/** Ordering options when selecting data from "project_verticals". */
export type Project_Verticals_Order_By = {
  active?: Maybe<Order_By>
  category?: Maybe<Project_Vertical_Categories_Order_By>
  category_name?: Maybe<Order_By>
  description?: Maybe<Order_By>
  display_name?: Maybe<Order_By>
  name?: Maybe<Order_By>
  projects_aggregate?: Maybe<Projects_Metadata_Aggregate_Order_By>
  vertical?: Maybe<Verticals_Order_By>
}

/** primary key columns input for table: project_verticals */
export type Project_Verticals_Pk_Columns_Input = {
  name: Verticals_Enum
}

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
  Name = 'name',
}

/** input type for updating data in table "project_verticals" */
export type Project_Verticals_Set_Input = {
  active?: Maybe<Scalars['Boolean']>
  category_name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  name?: Maybe<Verticals_Enum>
}

/** Streaming cursor of the table "project_verticals" */
export type Project_Verticals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Project_Verticals_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Project_Verticals_Stream_Cursor_Value_Input = {
  active?: Maybe<Scalars['Boolean']>
  category_name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  name?: Maybe<Verticals_Enum>
}

/** update columns of table "project_verticals" */
export enum Project_Verticals_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CategoryName = 'category_name',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Name = 'name',
}

export type Project_Verticals_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Project_Verticals_Set_Input>
  where: Project_Verticals_Bool_Exp
}

/** columns and relationships of "projects_features" */
export type Projects_Features = {
  __typename?: 'projects_features'
  enable_artist_update_after_completion: Scalars['Boolean']
  feature_fields?: Maybe<Scalars['jsonb']>
  feature_fields_counts?: Maybe<Scalars['jsonb']>
  features_script?: Maybe<Scalars['String']>
  id: Scalars['Int']
  /** An object relationship */
  private_data?: Maybe<Projects_Features_Private>
  /** An object relationship */
  project: Projects_Metadata
  project_id: Scalars['String']
}

/** columns and relationships of "projects_features" */
export type Projects_FeaturesFeature_FieldsArgs = {
  path?: Maybe<Scalars['String']>
}

/** columns and relationships of "projects_features" */
export type Projects_FeaturesFeature_Fields_CountsArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "projects_features" */
export type Projects_Features_Aggregate = {
  __typename?: 'projects_features_aggregate'
  aggregate?: Maybe<Projects_Features_Aggregate_Fields>
  nodes: Array<Projects_Features>
}

/** aggregate fields of "projects_features" */
export type Projects_Features_Aggregate_Fields = {
  __typename?: 'projects_features_aggregate_fields'
  avg?: Maybe<Projects_Features_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Projects_Features_Max_Fields>
  min?: Maybe<Projects_Features_Min_Fields>
  stddev?: Maybe<Projects_Features_Stddev_Fields>
  stddev_pop?: Maybe<Projects_Features_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Projects_Features_Stddev_Samp_Fields>
  sum?: Maybe<Projects_Features_Sum_Fields>
  var_pop?: Maybe<Projects_Features_Var_Pop_Fields>
  var_samp?: Maybe<Projects_Features_Var_Samp_Fields>
  variance?: Maybe<Projects_Features_Variance_Fields>
}

/** aggregate fields of "projects_features" */
export type Projects_Features_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Projects_Features_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Projects_Features_Append_Input = {
  feature_fields?: Maybe<Scalars['jsonb']>
  feature_fields_counts?: Maybe<Scalars['jsonb']>
}

/** aggregate avg on columns */
export type Projects_Features_Avg_Fields = {
  __typename?: 'projects_features_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "projects_features". All fields are combined with a logical 'AND'. */
export type Projects_Features_Bool_Exp = {
  _and?: Maybe<Array<Projects_Features_Bool_Exp>>
  _not?: Maybe<Projects_Features_Bool_Exp>
  _or?: Maybe<Array<Projects_Features_Bool_Exp>>
  enable_artist_update_after_completion?: Maybe<Boolean_Comparison_Exp>
  feature_fields?: Maybe<Jsonb_Comparison_Exp>
  feature_fields_counts?: Maybe<Jsonb_Comparison_Exp>
  features_script?: Maybe<String_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  private_data?: Maybe<Projects_Features_Private_Bool_Exp>
  project?: Maybe<Projects_Metadata_Bool_Exp>
  project_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "projects_features" */
export enum Projects_Features_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProjectsFeaturesPkey = 'projects_features_pkey',
  /** unique or primary key constraint on columns "project_id" */
  ProjectsFeaturesProjectIdKey = 'projects_features_project_id_key',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Projects_Features_Delete_At_Path_Input = {
  feature_fields?: Maybe<Array<Scalars['String']>>
  feature_fields_counts?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Projects_Features_Delete_Elem_Input = {
  feature_fields?: Maybe<Scalars['Int']>
  feature_fields_counts?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Projects_Features_Delete_Key_Input = {
  feature_fields?: Maybe<Scalars['String']>
  feature_fields_counts?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "projects_features" */
export type Projects_Features_Inc_Input = {
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "projects_features" */
export type Projects_Features_Insert_Input = {
  enable_artist_update_after_completion?: Maybe<Scalars['Boolean']>
  feature_fields?: Maybe<Scalars['jsonb']>
  feature_fields_counts?: Maybe<Scalars['jsonb']>
  features_script?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  private_data?: Maybe<Projects_Features_Private_Obj_Rel_Insert_Input>
  project?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Projects_Features_Max_Fields = {
  __typename?: 'projects_features_max_fields'
  features_script?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Projects_Features_Min_Fields = {
  __typename?: 'projects_features_min_fields'
  features_script?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "projects_features" */
export type Projects_Features_Mutation_Response = {
  __typename?: 'projects_features_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Projects_Features>
}

/** input type for inserting object relation for remote table "projects_features" */
export type Projects_Features_Obj_Rel_Insert_Input = {
  data: Projects_Features_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Projects_Features_On_Conflict>
}

/** on_conflict condition type for table "projects_features" */
export type Projects_Features_On_Conflict = {
  constraint: Projects_Features_Constraint
  update_columns?: Array<Projects_Features_Update_Column>
  where?: Maybe<Projects_Features_Bool_Exp>
}

/** Ordering options when selecting data from "projects_features". */
export type Projects_Features_Order_By = {
  enable_artist_update_after_completion?: Maybe<Order_By>
  feature_fields?: Maybe<Order_By>
  feature_fields_counts?: Maybe<Order_By>
  features_script?: Maybe<Order_By>
  id?: Maybe<Order_By>
  private_data?: Maybe<Projects_Features_Private_Order_By>
  project?: Maybe<Projects_Metadata_Order_By>
  project_id?: Maybe<Order_By>
}

/** primary key columns input for table: projects_features */
export type Projects_Features_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Projects_Features_Prepend_Input = {
  feature_fields?: Maybe<Scalars['jsonb']>
  feature_fields_counts?: Maybe<Scalars['jsonb']>
}

/** columns and relationships of "projects_features_private" */
export type Projects_Features_Private = {
  __typename?: 'projects_features_private'
  features_script?: Maybe<Scalars['String']>
  /** An object relationship */
  project_features?: Maybe<Projects_Features>
  project_features_id?: Maybe<Scalars['Int']>
}

/** aggregated selection of "projects_features_private" */
export type Projects_Features_Private_Aggregate = {
  __typename?: 'projects_features_private_aggregate'
  aggregate?: Maybe<Projects_Features_Private_Aggregate_Fields>
  nodes: Array<Projects_Features_Private>
}

/** aggregate fields of "projects_features_private" */
export type Projects_Features_Private_Aggregate_Fields = {
  __typename?: 'projects_features_private_aggregate_fields'
  avg?: Maybe<Projects_Features_Private_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Projects_Features_Private_Max_Fields>
  min?: Maybe<Projects_Features_Private_Min_Fields>
  stddev?: Maybe<Projects_Features_Private_Stddev_Fields>
  stddev_pop?: Maybe<Projects_Features_Private_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Projects_Features_Private_Stddev_Samp_Fields>
  sum?: Maybe<Projects_Features_Private_Sum_Fields>
  var_pop?: Maybe<Projects_Features_Private_Var_Pop_Fields>
  var_samp?: Maybe<Projects_Features_Private_Var_Samp_Fields>
  variance?: Maybe<Projects_Features_Private_Variance_Fields>
}

/** aggregate fields of "projects_features_private" */
export type Projects_Features_Private_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Projects_Features_Private_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Projects_Features_Private_Avg_Fields = {
  __typename?: 'projects_features_private_avg_fields'
  project_features_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "projects_features_private". All fields are combined with a logical 'AND'. */
export type Projects_Features_Private_Bool_Exp = {
  _and?: Maybe<Array<Projects_Features_Private_Bool_Exp>>
  _not?: Maybe<Projects_Features_Private_Bool_Exp>
  _or?: Maybe<Array<Projects_Features_Private_Bool_Exp>>
  features_script?: Maybe<String_Comparison_Exp>
  project_features?: Maybe<Projects_Features_Bool_Exp>
  project_features_id?: Maybe<Int_Comparison_Exp>
}

/** input type for incrementing numeric columns in table "projects_features_private" */
export type Projects_Features_Private_Inc_Input = {
  project_features_id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "projects_features_private" */
export type Projects_Features_Private_Insert_Input = {
  features_script?: Maybe<Scalars['String']>
  project_features?: Maybe<Projects_Features_Obj_Rel_Insert_Input>
  project_features_id?: Maybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Projects_Features_Private_Max_Fields = {
  __typename?: 'projects_features_private_max_fields'
  features_script?: Maybe<Scalars['String']>
  project_features_id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Projects_Features_Private_Min_Fields = {
  __typename?: 'projects_features_private_min_fields'
  features_script?: Maybe<Scalars['String']>
  project_features_id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "projects_features_private" */
export type Projects_Features_Private_Mutation_Response = {
  __typename?: 'projects_features_private_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Projects_Features_Private>
}

/** input type for inserting object relation for remote table "projects_features_private" */
export type Projects_Features_Private_Obj_Rel_Insert_Input = {
  data: Projects_Features_Private_Insert_Input
}

/** Ordering options when selecting data from "projects_features_private". */
export type Projects_Features_Private_Order_By = {
  features_script?: Maybe<Order_By>
  project_features?: Maybe<Projects_Features_Order_By>
  project_features_id?: Maybe<Order_By>
}

/** select columns of table "projects_features_private" */
export enum Projects_Features_Private_Select_Column {
  /** column name */
  FeaturesScript = 'features_script',
  /** column name */
  ProjectFeaturesId = 'project_features_id',
}

/** input type for updating data in table "projects_features_private" */
export type Projects_Features_Private_Set_Input = {
  features_script?: Maybe<Scalars['String']>
  project_features_id?: Maybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Projects_Features_Private_Stddev_Fields = {
  __typename?: 'projects_features_private_stddev_fields'
  project_features_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Projects_Features_Private_Stddev_Pop_Fields = {
  __typename?: 'projects_features_private_stddev_pop_fields'
  project_features_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Projects_Features_Private_Stddev_Samp_Fields = {
  __typename?: 'projects_features_private_stddev_samp_fields'
  project_features_id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "projects_features_private" */
export type Projects_Features_Private_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Projects_Features_Private_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Projects_Features_Private_Stream_Cursor_Value_Input = {
  features_script?: Maybe<Scalars['String']>
  project_features_id?: Maybe<Scalars['Int']>
}

/** aggregate sum on columns */
export type Projects_Features_Private_Sum_Fields = {
  __typename?: 'projects_features_private_sum_fields'
  project_features_id?: Maybe<Scalars['Int']>
}

export type Projects_Features_Private_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Projects_Features_Private_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Projects_Features_Private_Set_Input>
  where: Projects_Features_Private_Bool_Exp
}

/** aggregate var_pop on columns */
export type Projects_Features_Private_Var_Pop_Fields = {
  __typename?: 'projects_features_private_var_pop_fields'
  project_features_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Projects_Features_Private_Var_Samp_Fields = {
  __typename?: 'projects_features_private_var_samp_fields'
  project_features_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Projects_Features_Private_Variance_Fields = {
  __typename?: 'projects_features_private_variance_fields'
  project_features_id?: Maybe<Scalars['Float']>
}

/** select columns of table "projects_features" */
export enum Projects_Features_Select_Column {
  /** column name */
  EnableArtistUpdateAfterCompletion = 'enable_artist_update_after_completion',
  /** column name */
  FeatureFields = 'feature_fields',
  /** column name */
  FeatureFieldsCounts = 'feature_fields_counts',
  /** column name */
  FeaturesScript = 'features_script',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
}

/** input type for updating data in table "projects_features" */
export type Projects_Features_Set_Input = {
  enable_artist_update_after_completion?: Maybe<Scalars['Boolean']>
  feature_fields?: Maybe<Scalars['jsonb']>
  feature_fields_counts?: Maybe<Scalars['jsonb']>
  features_script?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Projects_Features_Stddev_Fields = {
  __typename?: 'projects_features_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Projects_Features_Stddev_Pop_Fields = {
  __typename?: 'projects_features_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Projects_Features_Stddev_Samp_Fields = {
  __typename?: 'projects_features_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "projects_features" */
export type Projects_Features_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Projects_Features_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Projects_Features_Stream_Cursor_Value_Input = {
  enable_artist_update_after_completion?: Maybe<Scalars['Boolean']>
  feature_fields?: Maybe<Scalars['jsonb']>
  feature_fields_counts?: Maybe<Scalars['jsonb']>
  features_script?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Projects_Features_Sum_Fields = {
  __typename?: 'projects_features_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "projects_features" */
export enum Projects_Features_Update_Column {
  /** column name */
  EnableArtistUpdateAfterCompletion = 'enable_artist_update_after_completion',
  /** column name */
  FeatureFields = 'feature_fields',
  /** column name */
  FeatureFieldsCounts = 'feature_fields_counts',
  /** column name */
  FeaturesScript = 'features_script',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
}

export type Projects_Features_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Projects_Features_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Projects_Features_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Projects_Features_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Projects_Features_Delete_Key_Input>
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Projects_Features_Inc_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Projects_Features_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Projects_Features_Set_Input>
  where: Projects_Features_Bool_Exp
}

/** aggregate var_pop on columns */
export type Projects_Features_Var_Pop_Fields = {
  __typename?: 'projects_features_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Projects_Features_Var_Samp_Fields = {
  __typename?: 'projects_features_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Projects_Features_Variance_Fields = {
  __typename?: 'projects_features_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "projects_metadata" */
export type Projects_Metadata = {
  __typename?: 'projects_metadata'
  activated_at?: Maybe<Scalars['timestamptz']>
  active: Scalars['Boolean']
  additional_payee?: Maybe<Scalars['String']>
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  /** An object relationship */
  artist: Users
  artist_address: Scalars['String']
  artist_display_notes?: Maybe<Scalars['String']>
  artist_featured_token_id?: Maybe<Scalars['String']>
  artist_interview?: Maybe<Scalars['String']>
  artist_name?: Maybe<Scalars['String']>
  aspect_ratio: Scalars['numeric']
  base_uri?: Maybe<Scalars['String']>
  charitable_giving_details?: Maybe<Scalars['String']>
  complete: Scalars['Boolean']
  /** A computed field, executes function "completed_at" */
  completed_at?: Maybe<Scalars['timestamptz']>
  /** An object relationship */
  contract: Contracts_Metadata
  contract_address: Scalars['String']
  creative_credit?: Maybe<Scalars['String']>
  curation_status: Curation_Statuses_Enum
  /** A computed field, executes function "curation_status_display" */
  curation_status_display?: Maybe<Scalars['String']>
  curation_status_override?: Maybe<Curation_Statuses_Enum>
  currency_address?: Maybe<Scalars['String']>
  currency_decimals?: Maybe<Scalars['Int']>
  currency_symbol?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  disable_auto_image_format?: Maybe<Scalars['Boolean']>
  disable_sample_generator: Scalars['Boolean']
  display_static: Scalars['Boolean']
  /** An array relationship */
  external_asset_dependencies: Array<Project_External_Asset_Dependencies>
  /** An aggregate relationship */
  external_asset_dependencies_aggregate: Project_External_Asset_Dependencies_Aggregate
  external_asset_dependencies_locked?: Maybe<Scalars['Boolean']>
  /** A computed field, executes function "project_external_asset_dependency_count" */
  external_asset_dependency_count?: Maybe<Scalars['bigint']>
  /** A computed field, executes function "project_favorited_by_user" */
  favorited_by_user?: Maybe<Scalars['Boolean']>
  /** An array relationship */
  favorites: Array<Favorites>
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate
  /** A computed field, executes function "project_featured_token" */
  featured_token?: Maybe<Array<Tokens_Metadata>>
  /** An object relationship */
  features?: Maybe<Projects_Features>
  /** A computed field, executes function "first_token_minted_at" */
  first_token_minted_at?: Maybe<Scalars['timestamptz']>
  /** A computed field, executes function "project_heritage_status" */
  heritage_curation_status?: Maybe<Scalars['String']>
  id: Scalars['String']
  index?: Maybe<Scalars['Int']>
  /** A computed field, executes function "project_invocations" */
  invocations?: Maybe<Scalars['bigint']>
  ipfs_hash?: Maybe<Scalars['String']>
  /** A computed field, executes function "project_is_flagship" */
  is_artblocks?: Maybe<Scalars['Boolean']>
  license?: Maybe<Scalars['String']>
  link_to_license?: Maybe<Scalars['String']>
  /** A computed field, executes function "calc_locked" */
  locked?: Maybe<Scalars['Boolean']>
  locked_pre_v3?: Maybe<Scalars['Boolean']>
  /** A computed field, executes function "project_lowest_listing" */
  lowest_listing?: Maybe<Scalars['float8']>
  max_invocations: Scalars['Int']
  /** An object relationship */
  minter_configuration?: Maybe<Project_Minter_Configurations>
  minter_configuration_id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  open_for_review: Scalars['Boolean']
  paused: Scalars['Boolean']
  price_per_token_in_wei?: Maybe<Scalars['String']>
  project?: Maybe<Project>
  project_id: Scalars['String']
  /** An object relationship */
  proposed_artist_addresses_and_split?: Maybe<Proposed_Artist_Addresses_And_Splits>
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>
  /** A computed field, executes function "project_render_complete" */
  render_complete?: Maybe<Scalars['Boolean']>
  render_delay?: Maybe<Scalars['Int']>
  render_with_gpu?: Maybe<Scalars['Boolean']>
  royalty_percentage?: Maybe<Scalars['Int']>
  sales_notes?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  /** A computed field, executes function "project_script_count" */
  script_count?: Maybe<Scalars['bigint']>
  script_json?: Maybe<Scalars['jsonb']>
  script_type_and_version?: Maybe<Scalars['String']>
  /** An array relationship */
  scripts: Array<Project_Scripts>
  /** An aggregate relationship */
  scripts_aggregate: Project_Scripts_Aggregate
  /** A computed field, executes function "second_token_minted_at" */
  second_token_minted_at?: Maybe<Scalars['timestamptz']>
  /** An object relationship */
  series?: Maybe<Project_Series>
  series_id?: Maybe<Scalars['Int']>
  start_datetime?: Maybe<Scalars['timestamptz']>
  /** An array relationship */
  tags: Array<Entity_Tags>
  /** An aggregate relationship */
  tags_aggregate: Entity_Tags_Aggregate
  /** An array relationship */
  tokens: Array<Tokens_Metadata>
  /** An aggregate relationship */
  tokens_aggregate: Tokens_Metadata_Aggregate
  updated_at?: Maybe<Scalars['timestamp']>
  /** A computed field, executes function "user_is_artist" */
  user_is_artist?: Maybe<Scalars['Boolean']>
  /** An object relationship */
  vertical: Project_Verticals
  vertical_name: Scalars['String']
  website?: Maybe<Scalars['String']>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataExternal_Asset_DependenciesArgs = {
  distinct_on?: Maybe<Array<Project_External_Asset_Dependencies_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependencies_Order_By>>
  where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataExternal_Asset_Dependencies_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_External_Asset_Dependencies_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependencies_Order_By>>
  where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataFavoritesArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataFavorites_AggregateArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataFeatured_TokenArgs = {
  args: Featured_Token_Projects_Metadata_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataProjectArgs = {
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataScript_JsonArgs = {
  path?: Maybe<Scalars['String']>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataScriptsArgs = {
  distinct_on?: Maybe<Array<Project_Scripts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Scripts_Order_By>>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataScripts_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Scripts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Scripts_Order_By>>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataTagsArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataTokensArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

/** columns and relationships of "projects_metadata" */
export type Projects_MetadataTokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

/** aggregated selection of "projects_metadata" */
export type Projects_Metadata_Aggregate = {
  __typename?: 'projects_metadata_aggregate'
  aggregate?: Maybe<Projects_Metadata_Aggregate_Fields>
  nodes: Array<Projects_Metadata>
}

/** aggregate fields of "projects_metadata" */
export type Projects_Metadata_Aggregate_Fields = {
  __typename?: 'projects_metadata_aggregate_fields'
  avg?: Maybe<Projects_Metadata_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Projects_Metadata_Max_Fields>
  min?: Maybe<Projects_Metadata_Min_Fields>
  stddev?: Maybe<Projects_Metadata_Stddev_Fields>
  stddev_pop?: Maybe<Projects_Metadata_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Projects_Metadata_Stddev_Samp_Fields>
  sum?: Maybe<Projects_Metadata_Sum_Fields>
  var_pop?: Maybe<Projects_Metadata_Var_Pop_Fields>
  var_samp?: Maybe<Projects_Metadata_Var_Samp_Fields>
  variance?: Maybe<Projects_Metadata_Variance_Fields>
}

/** aggregate fields of "projects_metadata" */
export type Projects_Metadata_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Projects_Metadata_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "projects_metadata" */
export type Projects_Metadata_Aggregate_Order_By = {
  avg?: Maybe<Projects_Metadata_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Projects_Metadata_Max_Order_By>
  min?: Maybe<Projects_Metadata_Min_Order_By>
  stddev?: Maybe<Projects_Metadata_Stddev_Order_By>
  stddev_pop?: Maybe<Projects_Metadata_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Projects_Metadata_Stddev_Samp_Order_By>
  sum?: Maybe<Projects_Metadata_Sum_Order_By>
  var_pop?: Maybe<Projects_Metadata_Var_Pop_Order_By>
  var_samp?: Maybe<Projects_Metadata_Var_Samp_Order_By>
  variance?: Maybe<Projects_Metadata_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Projects_Metadata_Append_Input = {
  script_json?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "projects_metadata" */
export type Projects_Metadata_Arr_Rel_Insert_Input = {
  data: Array<Projects_Metadata_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Projects_Metadata_On_Conflict>
}

/** aggregate avg on columns */
export type Projects_Metadata_Avg_Fields = {
  __typename?: 'projects_metadata_avg_fields'
  additional_payee_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
  aspect_ratio?: Maybe<Scalars['Float']>
  currency_decimals?: Maybe<Scalars['Float']>
  index?: Maybe<Scalars['Float']>
  max_invocations?: Maybe<Scalars['Float']>
  render_delay?: Maybe<Scalars['Float']>
  royalty_percentage?: Maybe<Scalars['Float']>
  series_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "projects_metadata" */
export type Projects_Metadata_Avg_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "projects_metadata". All fields are combined with a logical 'AND'. */
export type Projects_Metadata_Bool_Exp = {
  _and?: Maybe<Array<Projects_Metadata_Bool_Exp>>
  _not?: Maybe<Projects_Metadata_Bool_Exp>
  _or?: Maybe<Array<Projects_Metadata_Bool_Exp>>
  activated_at?: Maybe<Timestamptz_Comparison_Exp>
  active?: Maybe<Boolean_Comparison_Exp>
  additional_payee?: Maybe<String_Comparison_Exp>
  additional_payee_percentage?: Maybe<Int_Comparison_Exp>
  additional_payee_secondary_sales_address?: Maybe<String_Comparison_Exp>
  additional_payee_secondary_sales_percentage?: Maybe<Int_Comparison_Exp>
  artist?: Maybe<Users_Bool_Exp>
  artist_address?: Maybe<String_Comparison_Exp>
  artist_display_notes?: Maybe<String_Comparison_Exp>
  artist_featured_token_id?: Maybe<String_Comparison_Exp>
  artist_interview?: Maybe<String_Comparison_Exp>
  artist_name?: Maybe<String_Comparison_Exp>
  aspect_ratio?: Maybe<Numeric_Comparison_Exp>
  base_uri?: Maybe<String_Comparison_Exp>
  charitable_giving_details?: Maybe<String_Comparison_Exp>
  complete?: Maybe<Boolean_Comparison_Exp>
  completed_at?: Maybe<Timestamptz_Comparison_Exp>
  contract?: Maybe<Contracts_Metadata_Bool_Exp>
  contract_address?: Maybe<String_Comparison_Exp>
  creative_credit?: Maybe<String_Comparison_Exp>
  curation_status?: Maybe<Curation_Statuses_Enum_Comparison_Exp>
  curation_status_display?: Maybe<String_Comparison_Exp>
  curation_status_override?: Maybe<Curation_Statuses_Enum_Comparison_Exp>
  currency_address?: Maybe<String_Comparison_Exp>
  currency_decimals?: Maybe<Int_Comparison_Exp>
  currency_symbol?: Maybe<String_Comparison_Exp>
  description?: Maybe<String_Comparison_Exp>
  disable_auto_image_format?: Maybe<Boolean_Comparison_Exp>
  disable_sample_generator?: Maybe<Boolean_Comparison_Exp>
  display_static?: Maybe<Boolean_Comparison_Exp>
  external_asset_dependencies?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
  external_asset_dependencies_locked?: Maybe<Boolean_Comparison_Exp>
  external_asset_dependency_count?: Maybe<Bigint_Comparison_Exp>
  favorited_by_user?: Maybe<Boolean_Comparison_Exp>
  favorites?: Maybe<Favorites_Bool_Exp>
  features?: Maybe<Projects_Features_Bool_Exp>
  first_token_minted_at?: Maybe<Timestamptz_Comparison_Exp>
  heritage_curation_status?: Maybe<String_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  index?: Maybe<Int_Comparison_Exp>
  invocations?: Maybe<Bigint_Comparison_Exp>
  ipfs_hash?: Maybe<String_Comparison_Exp>
  is_artblocks?: Maybe<Boolean_Comparison_Exp>
  license?: Maybe<String_Comparison_Exp>
  link_to_license?: Maybe<String_Comparison_Exp>
  locked?: Maybe<Boolean_Comparison_Exp>
  locked_pre_v3?: Maybe<Boolean_Comparison_Exp>
  lowest_listing?: Maybe<Float8_Comparison_Exp>
  max_invocations?: Maybe<Int_Comparison_Exp>
  minter_configuration?: Maybe<Project_Minter_Configurations_Bool_Exp>
  minter_configuration_id?: Maybe<String_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  open_for_review?: Maybe<Boolean_Comparison_Exp>
  paused?: Maybe<Boolean_Comparison_Exp>
  price_per_token_in_wei?: Maybe<String_Comparison_Exp>
  project_id?: Maybe<String_Comparison_Exp>
  proposed_artist_addresses_and_split?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
  proposed_artists_and_splits_id?: Maybe<String_Comparison_Exp>
  render_complete?: Maybe<Boolean_Comparison_Exp>
  render_delay?: Maybe<Int_Comparison_Exp>
  render_with_gpu?: Maybe<Boolean_Comparison_Exp>
  royalty_percentage?: Maybe<Int_Comparison_Exp>
  sales_notes?: Maybe<String_Comparison_Exp>
  script?: Maybe<String_Comparison_Exp>
  script_count?: Maybe<Bigint_Comparison_Exp>
  script_json?: Maybe<Jsonb_Comparison_Exp>
  script_type_and_version?: Maybe<String_Comparison_Exp>
  scripts?: Maybe<Project_Scripts_Bool_Exp>
  second_token_minted_at?: Maybe<Timestamptz_Comparison_Exp>
  series?: Maybe<Project_Series_Bool_Exp>
  series_id?: Maybe<Int_Comparison_Exp>
  start_datetime?: Maybe<Timestamptz_Comparison_Exp>
  tags?: Maybe<Entity_Tags_Bool_Exp>
  tokens?: Maybe<Tokens_Metadata_Bool_Exp>
  updated_at?: Maybe<Timestamp_Comparison_Exp>
  user_is_artist?: Maybe<Boolean_Comparison_Exp>
  vertical?: Maybe<Project_Verticals_Bool_Exp>
  vertical_name?: Maybe<String_Comparison_Exp>
  website?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "projects_metadata" */
export enum Projects_Metadata_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProjectsMetaPkey = 'projects_meta_pkey',
  /** unique or primary key constraint on columns "project_id", "contract_address" */
  ProjectsMetadataProjectIdContractAddressKey = 'projects_metadata_project_id_contract_address_key',
  /** unique or primary key constraint on columns "proposed_artists_and_splits_id" */
  ProjectsMetadataProposedArtistsAndSplitsIdKey = 'projects_metadata_proposed_artists_and_splits_id_key',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Projects_Metadata_Delete_At_Path_Input = {
  script_json?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Projects_Metadata_Delete_Elem_Input = {
  script_json?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Projects_Metadata_Delete_Key_Input = {
  script_json?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "projects_metadata" */
export type Projects_Metadata_Inc_Input = {
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  aspect_ratio?: Maybe<Scalars['numeric']>
  currency_decimals?: Maybe<Scalars['Int']>
  index?: Maybe<Scalars['Int']>
  max_invocations?: Maybe<Scalars['Int']>
  render_delay?: Maybe<Scalars['Int']>
  royalty_percentage?: Maybe<Scalars['Int']>
  series_id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "projects_metadata" */
export type Projects_Metadata_Insert_Input = {
  activated_at?: Maybe<Scalars['timestamptz']>
  active?: Maybe<Scalars['Boolean']>
  additional_payee?: Maybe<Scalars['String']>
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist?: Maybe<Users_Obj_Rel_Insert_Input>
  artist_address?: Maybe<Scalars['String']>
  artist_display_notes?: Maybe<Scalars['String']>
  artist_featured_token_id?: Maybe<Scalars['String']>
  artist_interview?: Maybe<Scalars['String']>
  artist_name?: Maybe<Scalars['String']>
  aspect_ratio?: Maybe<Scalars['numeric']>
  base_uri?: Maybe<Scalars['String']>
  charitable_giving_details?: Maybe<Scalars['String']>
  complete?: Maybe<Scalars['Boolean']>
  contract?: Maybe<Contracts_Metadata_Obj_Rel_Insert_Input>
  contract_address?: Maybe<Scalars['String']>
  creative_credit?: Maybe<Scalars['String']>
  curation_status?: Maybe<Curation_Statuses_Enum>
  curation_status_override?: Maybe<Curation_Statuses_Enum>
  currency_address?: Maybe<Scalars['String']>
  currency_decimals?: Maybe<Scalars['Int']>
  currency_symbol?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  disable_auto_image_format?: Maybe<Scalars['Boolean']>
  disable_sample_generator?: Maybe<Scalars['Boolean']>
  display_static?: Maybe<Scalars['Boolean']>
  external_asset_dependencies?: Maybe<Project_External_Asset_Dependencies_Arr_Rel_Insert_Input>
  external_asset_dependencies_locked?: Maybe<Scalars['Boolean']>
  favorites?: Maybe<Favorites_Arr_Rel_Insert_Input>
  features?: Maybe<Projects_Features_Obj_Rel_Insert_Input>
  id?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['Int']>
  ipfs_hash?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  link_to_license?: Maybe<Scalars['String']>
  locked_pre_v3?: Maybe<Scalars['Boolean']>
  max_invocations?: Maybe<Scalars['Int']>
  minter_configuration?: Maybe<Project_Minter_Configurations_Obj_Rel_Insert_Input>
  minter_configuration_id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  open_for_review?: Maybe<Scalars['Boolean']>
  paused?: Maybe<Scalars['Boolean']>
  price_per_token_in_wei?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  proposed_artist_addresses_and_split?: Maybe<Proposed_Artist_Addresses_And_Splits_Obj_Rel_Insert_Input>
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>
  render_delay?: Maybe<Scalars['Int']>
  render_with_gpu?: Maybe<Scalars['Boolean']>
  royalty_percentage?: Maybe<Scalars['Int']>
  sales_notes?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  script_json?: Maybe<Scalars['jsonb']>
  script_type_and_version?: Maybe<Scalars['String']>
  scripts?: Maybe<Project_Scripts_Arr_Rel_Insert_Input>
  series?: Maybe<Project_Series_Obj_Rel_Insert_Input>
  series_id?: Maybe<Scalars['Int']>
  start_datetime?: Maybe<Scalars['timestamptz']>
  tags?: Maybe<Entity_Tags_Arr_Rel_Insert_Input>
  tokens?: Maybe<Tokens_Metadata_Arr_Rel_Insert_Input>
  updated_at?: Maybe<Scalars['timestamp']>
  vertical?: Maybe<Project_Verticals_Obj_Rel_Insert_Input>
  vertical_name?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Projects_Metadata_Max_Fields = {
  __typename?: 'projects_metadata_max_fields'
  activated_at?: Maybe<Scalars['timestamptz']>
  additional_payee?: Maybe<Scalars['String']>
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  artist_display_notes?: Maybe<Scalars['String']>
  artist_featured_token_id?: Maybe<Scalars['String']>
  artist_interview?: Maybe<Scalars['String']>
  artist_name?: Maybe<Scalars['String']>
  aspect_ratio?: Maybe<Scalars['numeric']>
  base_uri?: Maybe<Scalars['String']>
  charitable_giving_details?: Maybe<Scalars['String']>
  contract_address?: Maybe<Scalars['String']>
  creative_credit?: Maybe<Scalars['String']>
  currency_address?: Maybe<Scalars['String']>
  currency_decimals?: Maybe<Scalars['Int']>
  currency_symbol?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['Int']>
  ipfs_hash?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  link_to_license?: Maybe<Scalars['String']>
  max_invocations?: Maybe<Scalars['Int']>
  minter_configuration_id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  price_per_token_in_wei?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>
  render_delay?: Maybe<Scalars['Int']>
  royalty_percentage?: Maybe<Scalars['Int']>
  sales_notes?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  script_type_and_version?: Maybe<Scalars['String']>
  series_id?: Maybe<Scalars['Int']>
  start_datetime?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamp']>
  vertical_name?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "projects_metadata" */
export type Projects_Metadata_Max_Order_By = {
  activated_at?: Maybe<Order_By>
  additional_payee?: Maybe<Order_By>
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_address?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  artist_address?: Maybe<Order_By>
  artist_display_notes?: Maybe<Order_By>
  artist_featured_token_id?: Maybe<Order_By>
  artist_interview?: Maybe<Order_By>
  artist_name?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  base_uri?: Maybe<Order_By>
  charitable_giving_details?: Maybe<Order_By>
  contract_address?: Maybe<Order_By>
  creative_credit?: Maybe<Order_By>
  currency_address?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  currency_symbol?: Maybe<Order_By>
  description?: Maybe<Order_By>
  id?: Maybe<Order_By>
  index?: Maybe<Order_By>
  ipfs_hash?: Maybe<Order_By>
  license?: Maybe<Order_By>
  link_to_license?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  minter_configuration_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  price_per_token_in_wei?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  proposed_artists_and_splits_id?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  sales_notes?: Maybe<Order_By>
  script?: Maybe<Order_By>
  script_type_and_version?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
  start_datetime?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  vertical_name?: Maybe<Order_By>
  website?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Projects_Metadata_Min_Fields = {
  __typename?: 'projects_metadata_min_fields'
  activated_at?: Maybe<Scalars['timestamptz']>
  additional_payee?: Maybe<Scalars['String']>
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  artist_display_notes?: Maybe<Scalars['String']>
  artist_featured_token_id?: Maybe<Scalars['String']>
  artist_interview?: Maybe<Scalars['String']>
  artist_name?: Maybe<Scalars['String']>
  aspect_ratio?: Maybe<Scalars['numeric']>
  base_uri?: Maybe<Scalars['String']>
  charitable_giving_details?: Maybe<Scalars['String']>
  contract_address?: Maybe<Scalars['String']>
  creative_credit?: Maybe<Scalars['String']>
  currency_address?: Maybe<Scalars['String']>
  currency_decimals?: Maybe<Scalars['Int']>
  currency_symbol?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['Int']>
  ipfs_hash?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  link_to_license?: Maybe<Scalars['String']>
  max_invocations?: Maybe<Scalars['Int']>
  minter_configuration_id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  price_per_token_in_wei?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>
  render_delay?: Maybe<Scalars['Int']>
  royalty_percentage?: Maybe<Scalars['Int']>
  sales_notes?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  script_type_and_version?: Maybe<Scalars['String']>
  series_id?: Maybe<Scalars['Int']>
  start_datetime?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamp']>
  vertical_name?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "projects_metadata" */
export type Projects_Metadata_Min_Order_By = {
  activated_at?: Maybe<Order_By>
  additional_payee?: Maybe<Order_By>
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_address?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  artist_address?: Maybe<Order_By>
  artist_display_notes?: Maybe<Order_By>
  artist_featured_token_id?: Maybe<Order_By>
  artist_interview?: Maybe<Order_By>
  artist_name?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  base_uri?: Maybe<Order_By>
  charitable_giving_details?: Maybe<Order_By>
  contract_address?: Maybe<Order_By>
  creative_credit?: Maybe<Order_By>
  currency_address?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  currency_symbol?: Maybe<Order_By>
  description?: Maybe<Order_By>
  id?: Maybe<Order_By>
  index?: Maybe<Order_By>
  ipfs_hash?: Maybe<Order_By>
  license?: Maybe<Order_By>
  link_to_license?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  minter_configuration_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  price_per_token_in_wei?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  proposed_artists_and_splits_id?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  sales_notes?: Maybe<Order_By>
  script?: Maybe<Order_By>
  script_type_and_version?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
  start_datetime?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  vertical_name?: Maybe<Order_By>
  website?: Maybe<Order_By>
}

/** response of any mutation on the table "projects_metadata" */
export type Projects_Metadata_Mutation_Response = {
  __typename?: 'projects_metadata_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Projects_Metadata>
}

/** input type for inserting object relation for remote table "projects_metadata" */
export type Projects_Metadata_Obj_Rel_Insert_Input = {
  data: Projects_Metadata_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Projects_Metadata_On_Conflict>
}

/** on_conflict condition type for table "projects_metadata" */
export type Projects_Metadata_On_Conflict = {
  constraint: Projects_Metadata_Constraint
  update_columns?: Array<Projects_Metadata_Update_Column>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** Ordering options when selecting data from "projects_metadata". */
export type Projects_Metadata_Order_By = {
  activated_at?: Maybe<Order_By>
  active?: Maybe<Order_By>
  additional_payee?: Maybe<Order_By>
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_address?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  artist?: Maybe<Users_Order_By>
  artist_address?: Maybe<Order_By>
  artist_display_notes?: Maybe<Order_By>
  artist_featured_token_id?: Maybe<Order_By>
  artist_interview?: Maybe<Order_By>
  artist_name?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  base_uri?: Maybe<Order_By>
  charitable_giving_details?: Maybe<Order_By>
  complete?: Maybe<Order_By>
  completed_at?: Maybe<Order_By>
  contract?: Maybe<Contracts_Metadata_Order_By>
  contract_address?: Maybe<Order_By>
  creative_credit?: Maybe<Order_By>
  curation_status?: Maybe<Order_By>
  curation_status_display?: Maybe<Order_By>
  curation_status_override?: Maybe<Order_By>
  currency_address?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  currency_symbol?: Maybe<Order_By>
  description?: Maybe<Order_By>
  disable_auto_image_format?: Maybe<Order_By>
  disable_sample_generator?: Maybe<Order_By>
  display_static?: Maybe<Order_By>
  external_asset_dependencies_aggregate?: Maybe<Project_External_Asset_Dependencies_Aggregate_Order_By>
  external_asset_dependencies_locked?: Maybe<Order_By>
  external_asset_dependency_count?: Maybe<Order_By>
  favorited_by_user?: Maybe<Order_By>
  favorites_aggregate?: Maybe<Favorites_Aggregate_Order_By>
  features?: Maybe<Projects_Features_Order_By>
  first_token_minted_at?: Maybe<Order_By>
  heritage_curation_status?: Maybe<Order_By>
  id?: Maybe<Order_By>
  index?: Maybe<Order_By>
  invocations?: Maybe<Order_By>
  ipfs_hash?: Maybe<Order_By>
  is_artblocks?: Maybe<Order_By>
  license?: Maybe<Order_By>
  link_to_license?: Maybe<Order_By>
  locked?: Maybe<Order_By>
  locked_pre_v3?: Maybe<Order_By>
  lowest_listing?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  minter_configuration?: Maybe<Project_Minter_Configurations_Order_By>
  minter_configuration_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  open_for_review?: Maybe<Order_By>
  paused?: Maybe<Order_By>
  price_per_token_in_wei?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  proposed_artist_addresses_and_split?: Maybe<Proposed_Artist_Addresses_And_Splits_Order_By>
  proposed_artists_and_splits_id?: Maybe<Order_By>
  render_complete?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  render_with_gpu?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  sales_notes?: Maybe<Order_By>
  script?: Maybe<Order_By>
  script_count?: Maybe<Order_By>
  script_json?: Maybe<Order_By>
  script_type_and_version?: Maybe<Order_By>
  scripts_aggregate?: Maybe<Project_Scripts_Aggregate_Order_By>
  second_token_minted_at?: Maybe<Order_By>
  series?: Maybe<Project_Series_Order_By>
  series_id?: Maybe<Order_By>
  start_datetime?: Maybe<Order_By>
  tags_aggregate?: Maybe<Entity_Tags_Aggregate_Order_By>
  tokens_aggregate?: Maybe<Tokens_Metadata_Aggregate_Order_By>
  updated_at?: Maybe<Order_By>
  user_is_artist?: Maybe<Order_By>
  vertical?: Maybe<Project_Verticals_Order_By>
  vertical_name?: Maybe<Order_By>
  website?: Maybe<Order_By>
}

/** primary key columns input for table: projects_metadata */
export type Projects_Metadata_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Projects_Metadata_Prepend_Input = {
  script_json?: Maybe<Scalars['jsonb']>
}

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
  LockedPreV3 = 'locked_pre_v3',
  /** column name */
  MaxInvocations = 'max_invocations',
  /** column name */
  MinterConfigurationId = 'minter_configuration_id',
  /** column name */
  Name = 'name',
  /** column name */
  OpenForReview = 'open_for_review',
  /** column name */
  Paused = 'paused',
  /** column name */
  PricePerTokenInWei = 'price_per_token_in_wei',
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
  Website = 'website',
}

/** input type for updating data in table "projects_metadata" */
export type Projects_Metadata_Set_Input = {
  activated_at?: Maybe<Scalars['timestamptz']>
  active?: Maybe<Scalars['Boolean']>
  additional_payee?: Maybe<Scalars['String']>
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  artist_display_notes?: Maybe<Scalars['String']>
  artist_featured_token_id?: Maybe<Scalars['String']>
  artist_interview?: Maybe<Scalars['String']>
  artist_name?: Maybe<Scalars['String']>
  aspect_ratio?: Maybe<Scalars['numeric']>
  base_uri?: Maybe<Scalars['String']>
  charitable_giving_details?: Maybe<Scalars['String']>
  complete?: Maybe<Scalars['Boolean']>
  contract_address?: Maybe<Scalars['String']>
  creative_credit?: Maybe<Scalars['String']>
  curation_status?: Maybe<Curation_Statuses_Enum>
  curation_status_override?: Maybe<Curation_Statuses_Enum>
  currency_address?: Maybe<Scalars['String']>
  currency_decimals?: Maybe<Scalars['Int']>
  currency_symbol?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  disable_auto_image_format?: Maybe<Scalars['Boolean']>
  disable_sample_generator?: Maybe<Scalars['Boolean']>
  display_static?: Maybe<Scalars['Boolean']>
  external_asset_dependencies_locked?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['Int']>
  ipfs_hash?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  link_to_license?: Maybe<Scalars['String']>
  locked_pre_v3?: Maybe<Scalars['Boolean']>
  max_invocations?: Maybe<Scalars['Int']>
  minter_configuration_id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  open_for_review?: Maybe<Scalars['Boolean']>
  paused?: Maybe<Scalars['Boolean']>
  price_per_token_in_wei?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>
  render_delay?: Maybe<Scalars['Int']>
  render_with_gpu?: Maybe<Scalars['Boolean']>
  royalty_percentage?: Maybe<Scalars['Int']>
  sales_notes?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  script_json?: Maybe<Scalars['jsonb']>
  script_type_and_version?: Maybe<Scalars['String']>
  series_id?: Maybe<Scalars['Int']>
  start_datetime?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamp']>
  vertical_name?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Projects_Metadata_Stddev_Fields = {
  __typename?: 'projects_metadata_stddev_fields'
  additional_payee_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
  aspect_ratio?: Maybe<Scalars['Float']>
  currency_decimals?: Maybe<Scalars['Float']>
  index?: Maybe<Scalars['Float']>
  max_invocations?: Maybe<Scalars['Float']>
  render_delay?: Maybe<Scalars['Float']>
  royalty_percentage?: Maybe<Scalars['Float']>
  series_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "projects_metadata" */
export type Projects_Metadata_Stddev_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Projects_Metadata_Stddev_Pop_Fields = {
  __typename?: 'projects_metadata_stddev_pop_fields'
  additional_payee_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
  aspect_ratio?: Maybe<Scalars['Float']>
  currency_decimals?: Maybe<Scalars['Float']>
  index?: Maybe<Scalars['Float']>
  max_invocations?: Maybe<Scalars['Float']>
  render_delay?: Maybe<Scalars['Float']>
  royalty_percentage?: Maybe<Scalars['Float']>
  series_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "projects_metadata" */
export type Projects_Metadata_Stddev_Pop_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Projects_Metadata_Stddev_Samp_Fields = {
  __typename?: 'projects_metadata_stddev_samp_fields'
  additional_payee_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
  aspect_ratio?: Maybe<Scalars['Float']>
  currency_decimals?: Maybe<Scalars['Float']>
  index?: Maybe<Scalars['Float']>
  max_invocations?: Maybe<Scalars['Float']>
  render_delay?: Maybe<Scalars['Float']>
  royalty_percentage?: Maybe<Scalars['Float']>
  series_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "projects_metadata" */
export type Projects_Metadata_Stddev_Samp_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** Streaming cursor of the table "projects_metadata" */
export type Projects_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Projects_Metadata_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Projects_Metadata_Stream_Cursor_Value_Input = {
  activated_at?: Maybe<Scalars['timestamptz']>
  active?: Maybe<Scalars['Boolean']>
  additional_payee?: Maybe<Scalars['String']>
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_address?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  artist_display_notes?: Maybe<Scalars['String']>
  artist_featured_token_id?: Maybe<Scalars['String']>
  artist_interview?: Maybe<Scalars['String']>
  artist_name?: Maybe<Scalars['String']>
  aspect_ratio?: Maybe<Scalars['numeric']>
  base_uri?: Maybe<Scalars['String']>
  charitable_giving_details?: Maybe<Scalars['String']>
  complete?: Maybe<Scalars['Boolean']>
  contract_address?: Maybe<Scalars['String']>
  creative_credit?: Maybe<Scalars['String']>
  curation_status?: Maybe<Curation_Statuses_Enum>
  curation_status_override?: Maybe<Curation_Statuses_Enum>
  currency_address?: Maybe<Scalars['String']>
  currency_decimals?: Maybe<Scalars['Int']>
  currency_symbol?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  disable_auto_image_format?: Maybe<Scalars['Boolean']>
  disable_sample_generator?: Maybe<Scalars['Boolean']>
  display_static?: Maybe<Scalars['Boolean']>
  external_asset_dependencies_locked?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['Int']>
  ipfs_hash?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  link_to_license?: Maybe<Scalars['String']>
  locked_pre_v3?: Maybe<Scalars['Boolean']>
  max_invocations?: Maybe<Scalars['Int']>
  minter_configuration_id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  open_for_review?: Maybe<Scalars['Boolean']>
  paused?: Maybe<Scalars['Boolean']>
  price_per_token_in_wei?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  proposed_artists_and_splits_id?: Maybe<Scalars['String']>
  render_delay?: Maybe<Scalars['Int']>
  render_with_gpu?: Maybe<Scalars['Boolean']>
  royalty_percentage?: Maybe<Scalars['Int']>
  sales_notes?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  script_json?: Maybe<Scalars['jsonb']>
  script_type_and_version?: Maybe<Scalars['String']>
  series_id?: Maybe<Scalars['Int']>
  start_datetime?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamp']>
  vertical_name?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Projects_Metadata_Sum_Fields = {
  __typename?: 'projects_metadata_sum_fields'
  additional_payee_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  aspect_ratio?: Maybe<Scalars['numeric']>
  currency_decimals?: Maybe<Scalars['Int']>
  index?: Maybe<Scalars['Int']>
  max_invocations?: Maybe<Scalars['Int']>
  render_delay?: Maybe<Scalars['Int']>
  royalty_percentage?: Maybe<Scalars['Int']>
  series_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "projects_metadata" */
export type Projects_Metadata_Sum_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** update columns of table "projects_metadata" */
export enum Projects_Metadata_Update_Column {
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
  LockedPreV3 = 'locked_pre_v3',
  /** column name */
  MaxInvocations = 'max_invocations',
  /** column name */
  MinterConfigurationId = 'minter_configuration_id',
  /** column name */
  Name = 'name',
  /** column name */
  OpenForReview = 'open_for_review',
  /** column name */
  Paused = 'paused',
  /** column name */
  PricePerTokenInWei = 'price_per_token_in_wei',
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
  Website = 'website',
}

export type Projects_Metadata_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Projects_Metadata_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Projects_Metadata_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Projects_Metadata_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Projects_Metadata_Delete_Key_Input>
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Projects_Metadata_Inc_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Projects_Metadata_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Projects_Metadata_Set_Input>
  where: Projects_Metadata_Bool_Exp
}

/** aggregate var_pop on columns */
export type Projects_Metadata_Var_Pop_Fields = {
  __typename?: 'projects_metadata_var_pop_fields'
  additional_payee_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
  aspect_ratio?: Maybe<Scalars['Float']>
  currency_decimals?: Maybe<Scalars['Float']>
  index?: Maybe<Scalars['Float']>
  max_invocations?: Maybe<Scalars['Float']>
  render_delay?: Maybe<Scalars['Float']>
  royalty_percentage?: Maybe<Scalars['Float']>
  series_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "projects_metadata" */
export type Projects_Metadata_Var_Pop_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Projects_Metadata_Var_Samp_Fields = {
  __typename?: 'projects_metadata_var_samp_fields'
  additional_payee_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
  aspect_ratio?: Maybe<Scalars['Float']>
  currency_decimals?: Maybe<Scalars['Float']>
  index?: Maybe<Scalars['Float']>
  max_invocations?: Maybe<Scalars['Float']>
  render_delay?: Maybe<Scalars['Float']>
  royalty_percentage?: Maybe<Scalars['Float']>
  series_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "projects_metadata" */
export type Projects_Metadata_Var_Samp_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Projects_Metadata_Variance_Fields = {
  __typename?: 'projects_metadata_variance_fields'
  additional_payee_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
  aspect_ratio?: Maybe<Scalars['Float']>
  currency_decimals?: Maybe<Scalars['Float']>
  index?: Maybe<Scalars['Float']>
  max_invocations?: Maybe<Scalars['Float']>
  render_delay?: Maybe<Scalars['Float']>
  royalty_percentage?: Maybe<Scalars['Float']>
  series_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "projects_metadata" */
export type Projects_Metadata_Variance_Order_By = {
  additional_payee_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  aspect_ratio?: Maybe<Order_By>
  currency_decimals?: Maybe<Order_By>
  index?: Maybe<Order_By>
  max_invocations?: Maybe<Order_By>
  render_delay?: Maybe<Order_By>
  royalty_percentage?: Maybe<Order_By>
  series_id?: Maybe<Order_By>
}

/** Currently proposed artist and address splits */
export type Proposed_Artist_Addresses_And_Splits = {
  __typename?: 'proposed_artist_addresses_and_splits'
  additional_payee_primary_sales: Scalars['String']
  additional_payee_primary_sales_percentage: Scalars['Int']
  additional_payee_secondary_sales: Scalars['String']
  additional_payee_secondary_sales_percentage: Scalars['Int']
  artist_address: Scalars['String']
  /** An object relationship */
  project: Projects_Metadata
  project_id: Scalars['String']
}

/** aggregated selection of "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Aggregate = {
  __typename?: 'proposed_artist_addresses_and_splits_aggregate'
  aggregate?: Maybe<Proposed_Artist_Addresses_And_Splits_Aggregate_Fields>
  nodes: Array<Proposed_Artist_Addresses_And_Splits>
}

/** aggregate fields of "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Aggregate_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_aggregate_fields'
  avg?: Maybe<Proposed_Artist_Addresses_And_Splits_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Proposed_Artist_Addresses_And_Splits_Max_Fields>
  min?: Maybe<Proposed_Artist_Addresses_And_Splits_Min_Fields>
  stddev?: Maybe<Proposed_Artist_Addresses_And_Splits_Stddev_Fields>
  stddev_pop?: Maybe<Proposed_Artist_Addresses_And_Splits_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Proposed_Artist_Addresses_And_Splits_Stddev_Samp_Fields>
  sum?: Maybe<Proposed_Artist_Addresses_And_Splits_Sum_Fields>
  var_pop?: Maybe<Proposed_Artist_Addresses_And_Splits_Var_Pop_Fields>
  var_samp?: Maybe<Proposed_Artist_Addresses_And_Splits_Var_Samp_Fields>
  variance?: Maybe<Proposed_Artist_Addresses_And_Splits_Variance_Fields>
}

/** aggregate fields of "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Proposed_Artist_Addresses_And_Splits_Avg_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_avg_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "proposed_artist_addresses_and_splits". All fields are combined with a logical 'AND'. */
export type Proposed_Artist_Addresses_And_Splits_Bool_Exp = {
  _and?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Bool_Exp>>
  _not?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
  _or?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Bool_Exp>>
  additional_payee_primary_sales?: Maybe<String_Comparison_Exp>
  additional_payee_primary_sales_percentage?: Maybe<Int_Comparison_Exp>
  additional_payee_secondary_sales?: Maybe<String_Comparison_Exp>
  additional_payee_secondary_sales_percentage?: Maybe<Int_Comparison_Exp>
  artist_address?: Maybe<String_Comparison_Exp>
  project?: Maybe<Projects_Metadata_Bool_Exp>
  project_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "proposed_artist_addresses_and_splits" */
export enum Proposed_Artist_Addresses_And_Splits_Constraint {
  /** unique or primary key constraint on columns "project_id" */
  ProposedArtistAddressesAndSplitsPkey = 'proposed_artist_addresses_and_splits_pkey',
}

/** input type for incrementing numeric columns in table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Inc_Input = {
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Insert_Input = {
  additional_payee_primary_sales?: Maybe<Scalars['String']>
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  project?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Proposed_Artist_Addresses_And_Splits_Max_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_max_fields'
  additional_payee_primary_sales?: Maybe<Scalars['String']>
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Proposed_Artist_Addresses_And_Splits_Min_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_min_fields'
  additional_payee_primary_sales?: Maybe<Scalars['String']>
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Mutation_Response = {
  __typename?: 'proposed_artist_addresses_and_splits_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Proposed_Artist_Addresses_And_Splits>
}

/** input type for inserting object relation for remote table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Obj_Rel_Insert_Input = {
  data: Proposed_Artist_Addresses_And_Splits_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Proposed_Artist_Addresses_And_Splits_On_Conflict>
}

/** on_conflict condition type for table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_On_Conflict = {
  constraint: Proposed_Artist_Addresses_And_Splits_Constraint
  update_columns?: Array<Proposed_Artist_Addresses_And_Splits_Update_Column>
  where?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
}

/** Ordering options when selecting data from "proposed_artist_addresses_and_splits". */
export type Proposed_Artist_Addresses_And_Splits_Order_By = {
  additional_payee_primary_sales?: Maybe<Order_By>
  additional_payee_primary_sales_percentage?: Maybe<Order_By>
  additional_payee_secondary_sales?: Maybe<Order_By>
  additional_payee_secondary_sales_percentage?: Maybe<Order_By>
  artist_address?: Maybe<Order_By>
  project?: Maybe<Projects_Metadata_Order_By>
  project_id?: Maybe<Order_By>
}

/** primary key columns input for table: proposed_artist_addresses_and_splits */
export type Proposed_Artist_Addresses_And_Splits_Pk_Columns_Input = {
  project_id: Scalars['String']
}

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
  ProjectId = 'project_id',
}

/** input type for updating data in table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Set_Input = {
  additional_payee_primary_sales?: Maybe<Scalars['String']>
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Proposed_Artist_Addresses_And_Splits_Stddev_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_stddev_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Proposed_Artist_Addresses_And_Splits_Stddev_Pop_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_stddev_pop_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Proposed_Artist_Addresses_And_Splits_Stddev_Samp_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_stddev_samp_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "proposed_artist_addresses_and_splits" */
export type Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Value_Input = {
  additional_payee_primary_sales?: Maybe<Scalars['String']>
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales?: Maybe<Scalars['String']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
  artist_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Proposed_Artist_Addresses_And_Splits_Sum_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_sum_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Int']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Int']>
}

/** update columns of table "proposed_artist_addresses_and_splits" */
export enum Proposed_Artist_Addresses_And_Splits_Update_Column {
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
  ProjectId = 'project_id',
}

export type Proposed_Artist_Addresses_And_Splits_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Proposed_Artist_Addresses_And_Splits_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Proposed_Artist_Addresses_And_Splits_Set_Input>
  where: Proposed_Artist_Addresses_And_Splits_Bool_Exp
}

/** aggregate var_pop on columns */
export type Proposed_Artist_Addresses_And_Splits_Var_Pop_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_var_pop_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Proposed_Artist_Addresses_And_Splits_Var_Samp_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_var_samp_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Proposed_Artist_Addresses_And_Splits_Variance_Fields = {
  __typename?: 'proposed_artist_addresses_and_splits_variance_fields'
  additional_payee_primary_sales_percentage?: Maybe<Scalars['Float']>
  additional_payee_secondary_sales_percentage?: Maybe<Scalars['Float']>
}

export type Query_Root = {
  __typename?: 'query_root'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  account?: Maybe<Account>
  accountProject?: Maybe<AccountProject>
  accountProjects: Array<AccountProject>
  accounts: Array<Account>
  /** fetch data from the table: "categories" */
  categories: Array<Categories>
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>
  contract?: Maybe<Contract>
  /** fetch data from the table: "contract_allowlistings" */
  contract_allowlistings: Array<Contract_Allowlistings>
  /** fetch aggregated fields from the table: "contract_allowlistings" */
  contract_allowlistings_aggregate: Contract_Allowlistings_Aggregate
  /** fetch data from the table: "contract_allowlistings" using primary key columns */
  contract_allowlistings_by_pk?: Maybe<Contract_Allowlistings>
  /** fetch data from the table: "contract_type_names" */
  contract_type_names: Array<Contract_Type_Names>
  /** fetch aggregated fields from the table: "contract_type_names" */
  contract_type_names_aggregate: Contract_Type_Names_Aggregate
  /** fetch data from the table: "contract_type_names" using primary key columns */
  contract_type_names_by_pk?: Maybe<Contract_Type_Names>
  /** fetch data from the table: "contract_types" */
  contract_types: Array<Contract_Types>
  /** fetch aggregated fields from the table: "contract_types" */
  contract_types_aggregate: Contract_Types_Aggregate
  /** fetch data from the table: "contract_types" using primary key columns */
  contract_types_by_pk?: Maybe<Contract_Types>
  contracts: Array<Contract>
  /** fetch data from the table: "contracts_metadata" */
  contracts_metadata: Array<Contracts_Metadata>
  /** fetch aggregated fields from the table: "contracts_metadata" */
  contracts_metadata_aggregate: Contracts_Metadata_Aggregate
  /** fetch data from the table: "contracts_metadata" using primary key columns */
  contracts_metadata_by_pk?: Maybe<Contracts_Metadata>
  createApplication?: Maybe<CreateApplication>
  /** fetch data from the table: "curation_statuses" */
  curation_statuses: Array<Curation_Statuses>
  /** fetch aggregated fields from the table: "curation_statuses" */
  curation_statuses_aggregate: Curation_Statuses_Aggregate
  /** fetch data from the table: "curation_statuses" using primary key columns */
  curation_statuses_by_pk?: Maybe<Curation_Statuses>
  /** An array relationship */
  entity_tags: Array<Entity_Tags>
  /** An aggregate relationship */
  entity_tags_aggregate: Entity_Tags_Aggregate
  /** fetch data from the table: "entity_tags" using primary key columns */
  entity_tags_by_pk?: Maybe<Entity_Tags>
  /** An array relationship */
  favorites: Array<Favorites>
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate
  /** fetch data from the table: "favorites" using primary key columns */
  favorites_by_pk?: Maybe<Favorites>
  /** fetch data from the table: "feature_field_values_counts" */
  feature_field_values_counts: Array<Feature_Field_Values_Counts>
  /** fetch aggregated fields from the table: "feature_field_values_counts" */
  feature_field_values_counts_aggregate: Feature_Field_Values_Counts_Aggregate
  /** fetch data from the table: "feature_flags" */
  feature_flags: Array<Feature_Flags>
  /** fetch aggregated fields from the table: "feature_flags" */
  feature_flags_aggregate: Feature_Flags_Aggregate
  /** fetch data from the table: "feature_flags" using primary key columns */
  feature_flags_by_pk?: Maybe<Feature_Flags>
  /** execute function "filter_tokens_metadata_by_features" which returns "tokens_metadata" */
  filter_tokens_metadata_by_features: Array<Tokens_Metadata>
  /** execute function "filter_tokens_metadata_by_features" and query aggregates on result of table type "tokens_metadata" */
  filter_tokens_metadata_by_features_aggregate: Tokens_Metadata_Aggregate
  getOpenseaCollectionURL?: Maybe<OpenseaCollectionData>
  /** execute function "get_projects_metadata_feature_field_value_counts" which returns "feature_field_values_counts" */
  get_projects_metadata_feature_field_value_counts: Array<Feature_Field_Values_Counts>
  /** execute function "get_projects_metadata_feature_field_value_counts" and query aggregates on result of table type "feature_field_values_counts" */
  get_projects_metadata_feature_field_value_counts_aggregate: Feature_Field_Values_Counts_Aggregate
  isTokenFlagged?: Maybe<Scalars['Boolean']>
  /** execute function "list_projects_metadata_random" which returns "projects_metadata" */
  list_projects_metadata_random: Array<Projects_Metadata>
  /** execute function "list_projects_metadata_random" and query aggregates on result of table type "projects_metadata" */
  list_projects_metadata_random_aggregate: Projects_Metadata_Aggregate
  /** fetch data from the table: "media" */
  media: Array<Media>
  /** fetch aggregated fields from the table: "media" */
  media_aggregate: Media_Aggregate
  /** fetch data from the table: "media" using primary key columns */
  media_by_pk?: Maybe<Media>
  minter?: Maybe<Minter>
  minterFilter?: Maybe<MinterFilter>
  minterFilters: Array<MinterFilter>
  /** fetch data from the table: "minter_filters_metadata" */
  minter_filters_metadata: Array<Minter_Filters_Metadata>
  /** fetch aggregated fields from the table: "minter_filters_metadata" */
  minter_filters_metadata_aggregate: Minter_Filters_Metadata_Aggregate
  /** fetch data from the table: "minter_filters_metadata" using primary key columns */
  minter_filters_metadata_by_pk?: Maybe<Minter_Filters_Metadata>
  /** fetch data from the table: "minter_type_names" */
  minter_type_names: Array<Minter_Type_Names>
  /** fetch aggregated fields from the table: "minter_type_names" */
  minter_type_names_aggregate: Minter_Type_Names_Aggregate
  /** fetch data from the table: "minter_type_names" using primary key columns */
  minter_type_names_by_pk?: Maybe<Minter_Type_Names>
  /** fetch data from the table: "minter_types" */
  minter_types: Array<Minter_Types>
  /** fetch aggregated fields from the table: "minter_types" */
  minter_types_aggregate: Minter_Types_Aggregate
  /** fetch data from the table: "minter_types" using primary key columns */
  minter_types_by_pk?: Maybe<Minter_Types>
  minters: Array<Minter>
  /** fetch data from the table: "minters_metadata" */
  minters_metadata: Array<Minters_Metadata>
  /** fetch aggregated fields from the table: "minters_metadata" */
  minters_metadata_aggregate: Minters_Metadata_Aggregate
  /** fetch data from the table: "minters_metadata" using primary key columns */
  minters_metadata_by_pk?: Maybe<Minters_Metadata>
  /** An array relationship */
  notifications: Array<Notifications>
  /** An aggregate relationship */
  notifications_aggregate: Notifications_Aggregate
  /** fetch data from the table: "notifications" using primary key columns */
  notifications_by_pk?: Maybe<Notifications>
  payment?: Maybe<Payment>
  payments: Array<Payment>
  project?: Maybe<Project>
  projectExternalAssetDependencies: Array<ProjectExternalAssetDependency>
  projectExternalAssetDependency?: Maybe<ProjectExternalAssetDependency>
  projectMinterConfiguration?: Maybe<ProjectMinterConfiguration>
  projectMinterConfigurations: Array<ProjectMinterConfiguration>
  projectScript?: Maybe<ProjectScript>
  projectScripts: Array<ProjectScript>
  /** fetch data from the table: "project_external_asset_dependencies" */
  project_external_asset_dependencies: Array<Project_External_Asset_Dependencies>
  /** fetch aggregated fields from the table: "project_external_asset_dependencies" */
  project_external_asset_dependencies_aggregate: Project_External_Asset_Dependencies_Aggregate
  /** fetch data from the table: "project_external_asset_dependencies" using primary key columns */
  project_external_asset_dependencies_by_pk?: Maybe<Project_External_Asset_Dependencies>
  /** fetch data from the table: "project_external_asset_dependency_types" */
  project_external_asset_dependency_types: Array<Project_External_Asset_Dependency_Types>
  /** fetch aggregated fields from the table: "project_external_asset_dependency_types" */
  project_external_asset_dependency_types_aggregate: Project_External_Asset_Dependency_Types_Aggregate
  /** fetch data from the table: "project_external_asset_dependency_types" using primary key columns */
  project_external_asset_dependency_types_by_pk?: Maybe<Project_External_Asset_Dependency_Types>
  /** fetch data from the table: "project_minter_configurations" */
  project_minter_configurations: Array<Project_Minter_Configurations>
  /** fetch aggregated fields from the table: "project_minter_configurations" */
  project_minter_configurations_aggregate: Project_Minter_Configurations_Aggregate
  /** fetch data from the table: "project_minter_configurations" using primary key columns */
  project_minter_configurations_by_pk?: Maybe<Project_Minter_Configurations>
  /** fetch data from the table: "project_scripts" */
  project_scripts: Array<Project_Scripts>
  /** fetch aggregated fields from the table: "project_scripts" */
  project_scripts_aggregate: Project_Scripts_Aggregate
  /** fetch data from the table: "project_scripts" using primary key columns */
  project_scripts_by_pk?: Maybe<Project_Scripts>
  /** fetch data from the table: "project_series" */
  project_series: Array<Project_Series>
  /** fetch aggregated fields from the table: "project_series" */
  project_series_aggregate: Project_Series_Aggregate
  /** fetch data from the table: "project_series" using primary key columns */
  project_series_by_pk?: Maybe<Project_Series>
  /** fetch data from the table: "project_vertical_categories" */
  project_vertical_categories: Array<Project_Vertical_Categories>
  /** fetch aggregated fields from the table: "project_vertical_categories" */
  project_vertical_categories_aggregate: Project_Vertical_Categories_Aggregate
  /** fetch data from the table: "project_vertical_categories" using primary key columns */
  project_vertical_categories_by_pk?: Maybe<Project_Vertical_Categories>
  /** fetch data from the table: "project_verticals" */
  project_verticals: Array<Project_Verticals>
  /** fetch aggregated fields from the table: "project_verticals" */
  project_verticals_aggregate: Project_Verticals_Aggregate
  /** fetch data from the table: "project_verticals" using primary key columns */
  project_verticals_by_pk?: Maybe<Project_Verticals>
  projects: Array<Project>
  /** fetch data from the table: "projects_features" */
  projects_features: Array<Projects_Features>
  /** fetch aggregated fields from the table: "projects_features" */
  projects_features_aggregate: Projects_Features_Aggregate
  /** fetch data from the table: "projects_features" using primary key columns */
  projects_features_by_pk?: Maybe<Projects_Features>
  /** fetch data from the table: "projects_features_private" */
  projects_features_private: Array<Projects_Features_Private>
  /** fetch aggregated fields from the table: "projects_features_private" */
  projects_features_private_aggregate: Projects_Features_Private_Aggregate
  /** fetch data from the table: "projects_metadata" */
  projects_metadata: Array<Projects_Metadata>
  /** fetch aggregated fields from the table: "projects_metadata" */
  projects_metadata_aggregate: Projects_Metadata_Aggregate
  /** fetch data from the table: "projects_metadata" using primary key columns */
  projects_metadata_by_pk?: Maybe<Projects_Metadata>
  proposedArtistAddressesAndSplit?: Maybe<ProposedArtistAddressesAndSplit>
  proposedArtistAddressesAndSplits: Array<ProposedArtistAddressesAndSplit>
  /** fetch data from the table: "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits: Array<Proposed_Artist_Addresses_And_Splits>
  /** fetch aggregated fields from the table: "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits_aggregate: Proposed_Artist_Addresses_And_Splits_Aggregate
  /** fetch data from the table: "proposed_artist_addresses_and_splits" using primary key columns */
  proposed_artist_addresses_and_splits_by_pk?: Maybe<Proposed_Artist_Addresses_And_Splits>
  sale?: Maybe<Sale>
  saleLookupTable?: Maybe<SaleLookupTable>
  saleLookupTables: Array<SaleLookupTable>
  sales: Array<Sale>
  /** fetch data from the table: "screenings" */
  screenings: Array<Screenings>
  /** fetch aggregated fields from the table: "screenings" */
  screenings_aggregate: Screenings_Aggregate
  /** fetch data from the table: "screenings" using primary key columns */
  screenings_by_pk?: Maybe<Screenings>
  /** execute function "search_projects" which returns "projects_metadata" */
  search_projects: Array<Projects_Metadata>
  /** execute function "search_projects" and query aggregates on result of table type "projects_metadata" */
  search_projects_aggregate: Projects_Metadata_Aggregate
  /** execute function "search_tags" which returns "tags" */
  search_tags: Array<Tags>
  /** execute function "search_tags" and query aggregates on result of table type "tags" */
  search_tags_aggregate: Tags_Aggregate
  /** execute function "search_tokens" which returns "tokens_metadata" */
  search_tokens: Array<Tokens_Metadata>
  /** execute function "search_tokens" and query aggregates on result of table type "tokens_metadata" */
  search_tokens_aggregate: Tokens_Metadata_Aggregate
  /** execute function "search_users" which returns "user_profiles" */
  search_users: Array<User_Profiles>
  /** execute function "search_users" and query aggregates on result of table type "user_profiles" */
  search_users_aggregate: User_Profiles_Aggregate
  /** fetch data from the table: "sync_status" */
  sync_status: Array<Sync_Status>
  /** fetch aggregated fields from the table: "sync_status" */
  sync_status_aggregate: Sync_Status_Aggregate
  /** fetch data from the table: "sync_status" using primary key columns */
  sync_status_by_pk?: Maybe<Sync_Status>
  /** fetch data from the table: "tag_groupings" */
  tag_groupings: Array<Tag_Groupings>
  /** fetch aggregated fields from the table: "tag_groupings" */
  tag_groupings_aggregate: Tag_Groupings_Aggregate
  /** fetch data from the table: "tag_groupings" using primary key columns */
  tag_groupings_by_pk?: Maybe<Tag_Groupings>
  /** fetch data from the table: "tag_status" */
  tag_status: Array<Tag_Status>
  /** fetch aggregated fields from the table: "tag_status" */
  tag_status_aggregate: Tag_Status_Aggregate
  /** fetch data from the table: "tag_status" using primary key columns */
  tag_status_by_pk?: Maybe<Tag_Status>
  /** fetch data from the table: "tag_types" */
  tag_types: Array<Tag_Types>
  /** fetch aggregated fields from the table: "tag_types" */
  tag_types_aggregate: Tag_Types_Aggregate
  /** fetch data from the table: "tag_types" using primary key columns */
  tag_types_by_pk?: Maybe<Tag_Types>
  /** fetch data from the table: "tags" */
  tags: Array<Tags>
  /** fetch aggregated fields from the table: "tags" */
  tags_aggregate: Tags_Aggregate
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>
  /** fetch data from the table: "terms_of_service" */
  terms_of_service: Array<Terms_Of_Service>
  /** fetch aggregated fields from the table: "terms_of_service" */
  terms_of_service_aggregate: Terms_Of_Service_Aggregate
  /** fetch data from the table: "terms_of_service" using primary key columns */
  terms_of_service_by_pk?: Maybe<Terms_Of_Service>
  token?: Maybe<Token>
  tokens: Array<Token>
  /** fetch data from the table: "tokens_metadata" */
  tokens_metadata: Array<Tokens_Metadata>
  /** fetch aggregated fields from the table: "tokens_metadata" */
  tokens_metadata_aggregate: Tokens_Metadata_Aggregate
  /** fetch data from the table: "tokens_metadata" using primary key columns */
  tokens_metadata_by_pk?: Maybe<Tokens_Metadata>
  transfer?: Maybe<Transfer>
  transfers: Array<Transfer>
  /** fetch data from the table: "user_profiles" */
  user_profiles: Array<User_Profiles>
  /** fetch aggregated fields from the table: "user_profiles" */
  user_profiles_aggregate: User_Profiles_Aggregate
  /** fetch data from the table: "user_profiles" using primary key columns */
  user_profiles_by_pk?: Maybe<User_Profiles>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
  /** fetch data from the table: "verticals" */
  verticals: Array<Verticals>
  /** fetch aggregated fields from the table: "verticals" */
  verticals_aggregate: Verticals_Aggregate
  /** fetch data from the table: "verticals" using primary key columns */
  verticals_by_pk?: Maybe<Verticals>
  /** fetch data from the table: "webflow_artist_info" */
  webflow_artist_info: Array<Webflow_Artist_Info>
  /** fetch aggregated fields from the table: "webflow_artist_info" */
  webflow_artist_info_aggregate: Webflow_Artist_Info_Aggregate
  /** fetch data from the table: "webflow_artist_info" using primary key columns */
  webflow_artist_info_by_pk?: Maybe<Webflow_Artist_Info>
  /** fetch data from the table: "webflow_spectrum_articles" */
  webflow_spectrum_articles: Array<Webflow_Spectrum_Articles>
  /** fetch aggregated fields from the table: "webflow_spectrum_articles" */
  webflow_spectrum_articles_aggregate: Webflow_Spectrum_Articles_Aggregate
  /** fetch data from the table: "webflow_spectrum_articles" using primary key columns */
  webflow_spectrum_articles_by_pk?: Maybe<Webflow_Spectrum_Articles>
  whitelisting?: Maybe<Whitelisting>
  whitelistings: Array<Whitelisting>
}

export type Query_Root_MetaArgs = {
  block?: Maybe<Block_Height>
}

export type Query_RootAccountArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootAccountProjectArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootAccountProjectsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<AccountProject_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<AccountProject_Filter>
}

export type Query_RootAccountsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Account_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Account_Filter>
}

export type Query_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Query_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Query_RootCategories_By_PkArgs = {
  name: Scalars['String']
}

export type Query_RootContractArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootContract_AllowlistingsArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

export type Query_RootContract_Allowlistings_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

export type Query_RootContract_Allowlistings_By_PkArgs = {
  contract_address: Scalars['String']
  user_address: Scalars['String']
}

export type Query_RootContract_Type_NamesArgs = {
  distinct_on?: Maybe<Array<Contract_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Type_Names_Order_By>>
  where?: Maybe<Contract_Type_Names_Bool_Exp>
}

export type Query_RootContract_Type_Names_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Type_Names_Order_By>>
  where?: Maybe<Contract_Type_Names_Bool_Exp>
}

export type Query_RootContract_Type_Names_By_PkArgs = {
  name: Scalars['String']
}

export type Query_RootContract_TypesArgs = {
  distinct_on?: Maybe<Array<Contract_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Types_Order_By>>
  where?: Maybe<Contract_Types_Bool_Exp>
}

export type Query_RootContract_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Types_Order_By>>
  where?: Maybe<Contract_Types_Bool_Exp>
}

export type Query_RootContract_Types_By_PkArgs = {
  type: Contract_Type_Names_Enum
}

export type Query_RootContractsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Contract_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Contract_Filter>
}

export type Query_RootContracts_MetadataArgs = {
  distinct_on?: Maybe<Array<Contracts_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contracts_Metadata_Order_By>>
  where?: Maybe<Contracts_Metadata_Bool_Exp>
}

export type Query_RootContracts_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Contracts_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contracts_Metadata_Order_By>>
  where?: Maybe<Contracts_Metadata_Bool_Exp>
}

export type Query_RootContracts_Metadata_By_PkArgs = {
  address: Scalars['String']
}

export type Query_RootCreateApplicationArgs = {
  id: Scalars['uuid']
}

export type Query_RootCuration_StatusesArgs = {
  distinct_on?: Maybe<Array<Curation_Statuses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Curation_Statuses_Order_By>>
  where?: Maybe<Curation_Statuses_Bool_Exp>
}

export type Query_RootCuration_Statuses_AggregateArgs = {
  distinct_on?: Maybe<Array<Curation_Statuses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Curation_Statuses_Order_By>>
  where?: Maybe<Curation_Statuses_Bool_Exp>
}

export type Query_RootCuration_Statuses_By_PkArgs = {
  value: Scalars['String']
}

export type Query_RootEntity_TagsArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

export type Query_RootEntity_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

export type Query_RootEntity_Tags_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootFavoritesArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

export type Query_RootFavorites_AggregateArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

export type Query_RootFavorites_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootFeature_Field_Values_CountsArgs = {
  distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
  where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
}

export type Query_RootFeature_Field_Values_Counts_AggregateArgs = {
  distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
  where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
}

export type Query_RootFeature_FlagsArgs = {
  distinct_on?: Maybe<Array<Feature_Flags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Flags_Order_By>>
  where?: Maybe<Feature_Flags_Bool_Exp>
}

export type Query_RootFeature_Flags_AggregateArgs = {
  distinct_on?: Maybe<Array<Feature_Flags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Flags_Order_By>>
  where?: Maybe<Feature_Flags_Bool_Exp>
}

export type Query_RootFeature_Flags_By_PkArgs = {
  flag_name: Scalars['String']
}

export type Query_RootFilter_Tokens_Metadata_By_FeaturesArgs = {
  args: Filter_Tokens_Metadata_By_Features_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Query_RootFilter_Tokens_Metadata_By_Features_AggregateArgs = {
  args: Filter_Tokens_Metadata_By_Features_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Query_RootGetOpenseaCollectionUrlArgs = {
  contractAddress: Scalars['String']
  projectId: Scalars['String']
}

export type Query_RootGet_Projects_Metadata_Feature_Field_Value_CountsArgs = {
  args: Get_Projects_Metadata_Feature_Field_Value_Counts_Args
  distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
  where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
}

export type Query_RootGet_Projects_Metadata_Feature_Field_Value_Counts_AggregateArgs =
  {
    args: Get_Projects_Metadata_Feature_Field_Value_Counts_Args
    distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
    where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
  }

export type Query_RootIsTokenFlaggedArgs = {
  contractAddress: Scalars['String']
  tokenId: Scalars['String']
}

export type Query_RootList_Projects_Metadata_RandomArgs = {
  args: List_Projects_Metadata_Random_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Query_RootList_Projects_Metadata_Random_AggregateArgs = {
  args: List_Projects_Metadata_Random_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Query_RootMediaArgs = {
  distinct_on?: Maybe<Array<Media_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Media_Order_By>>
  where?: Maybe<Media_Bool_Exp>
}

export type Query_RootMedia_AggregateArgs = {
  distinct_on?: Maybe<Array<Media_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Media_Order_By>>
  where?: Maybe<Media_Bool_Exp>
}

export type Query_RootMedia_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootMinterArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootMinterFilterArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootMinterFiltersArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<MinterFilter_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<MinterFilter_Filter>
}

export type Query_RootMinter_Filters_MetadataArgs = {
  distinct_on?: Maybe<Array<Minter_Filters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Filters_Metadata_Order_By>>
  where?: Maybe<Minter_Filters_Metadata_Bool_Exp>
}

export type Query_RootMinter_Filters_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Minter_Filters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Filters_Metadata_Order_By>>
  where?: Maybe<Minter_Filters_Metadata_Bool_Exp>
}

export type Query_RootMinter_Filters_Metadata_By_PkArgs = {
  address: Scalars['String']
}

export type Query_RootMinter_Type_NamesArgs = {
  distinct_on?: Maybe<Array<Minter_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Type_Names_Order_By>>
  where?: Maybe<Minter_Type_Names_Bool_Exp>
}

export type Query_RootMinter_Type_Names_AggregateArgs = {
  distinct_on?: Maybe<Array<Minter_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Type_Names_Order_By>>
  where?: Maybe<Minter_Type_Names_Bool_Exp>
}

export type Query_RootMinter_Type_Names_By_PkArgs = {
  name: Scalars['String']
}

export type Query_RootMinter_TypesArgs = {
  distinct_on?: Maybe<Array<Minter_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Types_Order_By>>
  where?: Maybe<Minter_Types_Bool_Exp>
}

export type Query_RootMinter_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Minter_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Types_Order_By>>
  where?: Maybe<Minter_Types_Bool_Exp>
}

export type Query_RootMinter_Types_By_PkArgs = {
  type: Minter_Type_Names_Enum
}

export type Query_RootMintersArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Minter_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Minter_Filter>
}

export type Query_RootMinters_MetadataArgs = {
  distinct_on?: Maybe<Array<Minters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minters_Metadata_Order_By>>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

export type Query_RootMinters_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Minters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minters_Metadata_Order_By>>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

export type Query_RootMinters_Metadata_By_PkArgs = {
  address: Scalars['String']
}

export type Query_RootNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Notifications_Order_By>>
  where?: Maybe<Notifications_Bool_Exp>
}

export type Query_RootNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Notifications_Order_By>>
  where?: Maybe<Notifications_Bool_Exp>
}

export type Query_RootNotifications_By_PkArgs = {
  trigger_key: Scalars['String']
  trigger_time: Scalars['timestamptz']
  user_address: Scalars['String']
}

export type Query_RootPaymentArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootPaymentsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Payment_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Payment_Filter>
}

export type Query_RootProjectArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootProjectExternalAssetDependenciesArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectExternalAssetDependency_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProjectExternalAssetDependency_Filter>
}

export type Query_RootProjectExternalAssetDependencyArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootProjectMinterConfigurationArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootProjectMinterConfigurationsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectMinterConfiguration_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProjectMinterConfiguration_Filter>
}

export type Query_RootProjectScriptArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootProjectScriptsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectScript_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProjectScript_Filter>
}

export type Query_RootProject_External_Asset_DependenciesArgs = {
  distinct_on?: Maybe<Array<Project_External_Asset_Dependencies_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependencies_Order_By>>
  where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
}

export type Query_RootProject_External_Asset_Dependencies_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_External_Asset_Dependencies_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependencies_Order_By>>
  where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
}

export type Query_RootProject_External_Asset_Dependencies_By_PkArgs = {
  index: Scalars['Int']
  project_id: Scalars['String']
}

export type Query_RootProject_External_Asset_Dependency_TypesArgs = {
  distinct_on?: Maybe<
    Array<Project_External_Asset_Dependency_Types_Select_Column>
  >
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependency_Types_Order_By>>
  where?: Maybe<Project_External_Asset_Dependency_Types_Bool_Exp>
}

export type Query_RootProject_External_Asset_Dependency_Types_AggregateArgs = {
  distinct_on?: Maybe<
    Array<Project_External_Asset_Dependency_Types_Select_Column>
  >
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependency_Types_Order_By>>
  where?: Maybe<Project_External_Asset_Dependency_Types_Bool_Exp>
}

export type Query_RootProject_External_Asset_Dependency_Types_By_PkArgs = {
  type: Scalars['String']
}

export type Query_RootProject_Minter_ConfigurationsArgs = {
  distinct_on?: Maybe<Array<Project_Minter_Configurations_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Minter_Configurations_Order_By>>
  where?: Maybe<Project_Minter_Configurations_Bool_Exp>
}

export type Query_RootProject_Minter_Configurations_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Minter_Configurations_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Minter_Configurations_Order_By>>
  where?: Maybe<Project_Minter_Configurations_Bool_Exp>
}

export type Query_RootProject_Minter_Configurations_By_PkArgs = {
  id: Scalars['String']
}

export type Query_RootProject_ScriptsArgs = {
  distinct_on?: Maybe<Array<Project_Scripts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Scripts_Order_By>>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

export type Query_RootProject_Scripts_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Scripts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Scripts_Order_By>>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

export type Query_RootProject_Scripts_By_PkArgs = {
  index: Scalars['Int']
  project_id: Scalars['String']
}

export type Query_RootProject_SeriesArgs = {
  distinct_on?: Maybe<Array<Project_Series_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Series_Order_By>>
  where?: Maybe<Project_Series_Bool_Exp>
}

export type Query_RootProject_Series_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Series_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Series_Order_By>>
  where?: Maybe<Project_Series_Bool_Exp>
}

export type Query_RootProject_Series_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootProject_Vertical_CategoriesArgs = {
  distinct_on?: Maybe<Array<Project_Vertical_Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Vertical_Categories_Order_By>>
  where?: Maybe<Project_Vertical_Categories_Bool_Exp>
}

export type Query_RootProject_Vertical_Categories_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Vertical_Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Vertical_Categories_Order_By>>
  where?: Maybe<Project_Vertical_Categories_Bool_Exp>
}

export type Query_RootProject_Vertical_Categories_By_PkArgs = {
  name: Categories_Enum
}

export type Query_RootProject_VerticalsArgs = {
  distinct_on?: Maybe<Array<Project_Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Verticals_Order_By>>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

export type Query_RootProject_Verticals_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Verticals_Order_By>>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

export type Query_RootProject_Verticals_By_PkArgs = {
  name: Verticals_Enum
}

export type Query_RootProjectsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Project_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Project_Filter>
}

export type Query_RootProjects_FeaturesArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Order_By>>
  where?: Maybe<Projects_Features_Bool_Exp>
}

export type Query_RootProjects_Features_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Order_By>>
  where?: Maybe<Projects_Features_Bool_Exp>
}

export type Query_RootProjects_Features_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootProjects_Features_PrivateArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Private_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Private_Order_By>>
  where?: Maybe<Projects_Features_Private_Bool_Exp>
}

export type Query_RootProjects_Features_Private_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Private_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Private_Order_By>>
  where?: Maybe<Projects_Features_Private_Bool_Exp>
}

export type Query_RootProjects_MetadataArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Query_RootProjects_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Query_RootProjects_Metadata_By_PkArgs = {
  id: Scalars['String']
}

export type Query_RootProposedArtistAddressesAndSplitArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootProposedArtistAddressesAndSplitsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProposedArtistAddressesAndSplit_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProposedArtistAddressesAndSplit_Filter>
}

export type Query_RootProposed_Artist_Addresses_And_SplitsArgs = {
  distinct_on?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Order_By>>
  where?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
}

export type Query_RootProposed_Artist_Addresses_And_Splits_AggregateArgs = {
  distinct_on?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Order_By>>
  where?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
}

export type Query_RootProposed_Artist_Addresses_And_Splits_By_PkArgs = {
  project_id: Scalars['String']
}

export type Query_RootSaleArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootSaleLookupTableArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootSaleLookupTablesArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SaleLookupTable_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<SaleLookupTable_Filter>
}

export type Query_RootSalesArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Sale_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Sale_Filter>
}

export type Query_RootScreeningsArgs = {
  distinct_on?: Maybe<Array<Screenings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Screenings_Order_By>>
  where?: Maybe<Screenings_Bool_Exp>
}

export type Query_RootScreenings_AggregateArgs = {
  distinct_on?: Maybe<Array<Screenings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Screenings_Order_By>>
  where?: Maybe<Screenings_Bool_Exp>
}

export type Query_RootScreenings_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootSearch_ProjectsArgs = {
  args: Search_Projects_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Query_RootSearch_Projects_AggregateArgs = {
  args: Search_Projects_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Query_RootSearch_TagsArgs = {
  args: Search_Tags_Args
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Query_RootSearch_Tags_AggregateArgs = {
  args: Search_Tags_Args
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Query_RootSearch_TokensArgs = {
  args: Search_Tokens_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Query_RootSearch_Tokens_AggregateArgs = {
  args: Search_Tokens_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Query_RootSearch_UsersArgs = {
  args: Search_Users_Args
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Query_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Query_RootSync_StatusArgs = {
  distinct_on?: Maybe<Array<Sync_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Sync_Status_Order_By>>
  where?: Maybe<Sync_Status_Bool_Exp>
}

export type Query_RootSync_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Sync_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Sync_Status_Order_By>>
  where?: Maybe<Sync_Status_Bool_Exp>
}

export type Query_RootSync_Status_By_PkArgs = {
  id: Scalars['Boolean']
}

export type Query_RootTag_GroupingsArgs = {
  distinct_on?: Maybe<Array<Tag_Groupings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Groupings_Order_By>>
  where?: Maybe<Tag_Groupings_Bool_Exp>
}

export type Query_RootTag_Groupings_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Groupings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Groupings_Order_By>>
  where?: Maybe<Tag_Groupings_Bool_Exp>
}

export type Query_RootTag_Groupings_By_PkArgs = {
  name: Scalars['String']
}

export type Query_RootTag_StatusArgs = {
  distinct_on?: Maybe<Array<Tag_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Status_Order_By>>
  where?: Maybe<Tag_Status_Bool_Exp>
}

export type Query_RootTag_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Status_Order_By>>
  where?: Maybe<Tag_Status_Bool_Exp>
}

export type Query_RootTag_Status_By_PkArgs = {
  value: Scalars['String']
}

export type Query_RootTag_TypesArgs = {
  distinct_on?: Maybe<Array<Tag_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Types_Order_By>>
  where?: Maybe<Tag_Types_Bool_Exp>
}

export type Query_RootTag_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Types_Order_By>>
  where?: Maybe<Tag_Types_Bool_Exp>
}

export type Query_RootTag_Types_By_PkArgs = {
  value: Scalars['String']
}

export type Query_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Query_RootTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Query_RootTags_By_PkArgs = {
  name: Scalars['String']
}

export type Query_RootTerms_Of_ServiceArgs = {
  distinct_on?: Maybe<Array<Terms_Of_Service_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Terms_Of_Service_Order_By>>
  where?: Maybe<Terms_Of_Service_Bool_Exp>
}

export type Query_RootTerms_Of_Service_AggregateArgs = {
  distinct_on?: Maybe<Array<Terms_Of_Service_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Terms_Of_Service_Order_By>>
  where?: Maybe<Terms_Of_Service_Bool_Exp>
}

export type Query_RootTerms_Of_Service_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootTokenArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootTokensArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Token_Filter>
}

export type Query_RootTokens_MetadataArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Query_RootTokens_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Query_RootTokens_Metadata_By_PkArgs = {
  id: Scalars['String']
}

export type Query_RootTransferArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootTransfersArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Transfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Transfer_Filter>
}

export type Query_RootUser_ProfilesArgs = {
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Query_RootUser_Profiles_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Query_RootUser_Profiles_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Query_RootUsers_By_PkArgs = {
  public_address: Scalars['String']
}

export type Query_RootVerticalsArgs = {
  distinct_on?: Maybe<Array<Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Verticals_Order_By>>
  where?: Maybe<Verticals_Bool_Exp>
}

export type Query_RootVerticals_AggregateArgs = {
  distinct_on?: Maybe<Array<Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Verticals_Order_By>>
  where?: Maybe<Verticals_Bool_Exp>
}

export type Query_RootVerticals_By_PkArgs = {
  name: Scalars['String']
}

export type Query_RootWebflow_Artist_InfoArgs = {
  distinct_on?: Maybe<Array<Webflow_Artist_Info_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Artist_Info_Order_By>>
  where?: Maybe<Webflow_Artist_Info_Bool_Exp>
}

export type Query_RootWebflow_Artist_Info_AggregateArgs = {
  distinct_on?: Maybe<Array<Webflow_Artist_Info_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Artist_Info_Order_By>>
  where?: Maybe<Webflow_Artist_Info_Bool_Exp>
}

export type Query_RootWebflow_Artist_Info_By_PkArgs = {
  webflow_item_id: Scalars['String']
}

export type Query_RootWebflow_Spectrum_ArticlesArgs = {
  distinct_on?: Maybe<Array<Webflow_Spectrum_Articles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Spectrum_Articles_Order_By>>
  where?: Maybe<Webflow_Spectrum_Articles_Bool_Exp>
}

export type Query_RootWebflow_Spectrum_Articles_AggregateArgs = {
  distinct_on?: Maybe<Array<Webflow_Spectrum_Articles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Spectrum_Articles_Order_By>>
  where?: Maybe<Webflow_Spectrum_Articles_Bool_Exp>
}

export type Query_RootWebflow_Spectrum_Articles_By_PkArgs = {
  webflow_item_id: Scalars['String']
}

export type Query_RootWhitelistingArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_RootWhitelistingsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Whitelisting_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Whitelisting_Filter>
}

/** This is the results of the wallet and ip screenings we've performed */
export type Screenings = {
  __typename?: 'screenings'
  blocked: Scalars['Boolean']
  id: Scalars['Int']
  ip_address?: Maybe<Scalars['String']>
  /** A computed field, that runs the "screening_is_valid" function that calculates if the attached screening is still valid. */
  is_valid?: Maybe<Scalars['Boolean']>
  last_checked: Scalars['timestamptz']
  wallet_address?: Maybe<Scalars['String']>
}

/** aggregated selection of "screenings" */
export type Screenings_Aggregate = {
  __typename?: 'screenings_aggregate'
  aggregate?: Maybe<Screenings_Aggregate_Fields>
  nodes: Array<Screenings>
}

/** aggregate fields of "screenings" */
export type Screenings_Aggregate_Fields = {
  __typename?: 'screenings_aggregate_fields'
  avg?: Maybe<Screenings_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Screenings_Max_Fields>
  min?: Maybe<Screenings_Min_Fields>
  stddev?: Maybe<Screenings_Stddev_Fields>
  stddev_pop?: Maybe<Screenings_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Screenings_Stddev_Samp_Fields>
  sum?: Maybe<Screenings_Sum_Fields>
  var_pop?: Maybe<Screenings_Var_Pop_Fields>
  var_samp?: Maybe<Screenings_Var_Samp_Fields>
  variance?: Maybe<Screenings_Variance_Fields>
}

/** aggregate fields of "screenings" */
export type Screenings_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Screenings_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Screenings_Avg_Fields = {
  __typename?: 'screenings_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "screenings". All fields are combined with a logical 'AND'. */
export type Screenings_Bool_Exp = {
  _and?: Maybe<Array<Screenings_Bool_Exp>>
  _not?: Maybe<Screenings_Bool_Exp>
  _or?: Maybe<Array<Screenings_Bool_Exp>>
  blocked?: Maybe<Boolean_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  ip_address?: Maybe<String_Comparison_Exp>
  is_valid?: Maybe<Boolean_Comparison_Exp>
  last_checked?: Maybe<Timestamptz_Comparison_Exp>
  wallet_address?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "screenings" */
export enum Screenings_Constraint {
  /** unique or primary key constraint on columns "ip_address" */
  ScreeningsIpAddressKey = 'screenings_ip_address_key',
  /** unique or primary key constraint on columns "id" */
  ScreeningsPkey = 'screenings_pkey',
  /** unique or primary key constraint on columns "wallet_address" */
  ScreeningsWalletAddressKey = 'screenings_wallet_address_key',
}

/** input type for incrementing numeric columns in table "screenings" */
export type Screenings_Inc_Input = {
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "screenings" */
export type Screenings_Insert_Input = {
  blocked?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['Int']>
  ip_address?: Maybe<Scalars['String']>
  last_checked?: Maybe<Scalars['timestamptz']>
  wallet_address?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Screenings_Max_Fields = {
  __typename?: 'screenings_max_fields'
  id?: Maybe<Scalars['Int']>
  ip_address?: Maybe<Scalars['String']>
  last_checked?: Maybe<Scalars['timestamptz']>
  wallet_address?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Screenings_Min_Fields = {
  __typename?: 'screenings_min_fields'
  id?: Maybe<Scalars['Int']>
  ip_address?: Maybe<Scalars['String']>
  last_checked?: Maybe<Scalars['timestamptz']>
  wallet_address?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "screenings" */
export type Screenings_Mutation_Response = {
  __typename?: 'screenings_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Screenings>
}

/** on_conflict condition type for table "screenings" */
export type Screenings_On_Conflict = {
  constraint: Screenings_Constraint
  update_columns?: Array<Screenings_Update_Column>
  where?: Maybe<Screenings_Bool_Exp>
}

/** Ordering options when selecting data from "screenings". */
export type Screenings_Order_By = {
  blocked?: Maybe<Order_By>
  id?: Maybe<Order_By>
  ip_address?: Maybe<Order_By>
  is_valid?: Maybe<Order_By>
  last_checked?: Maybe<Order_By>
  wallet_address?: Maybe<Order_By>
}

/** primary key columns input for table: screenings */
export type Screenings_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "screenings" */
export enum Screenings_Select_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  Id = 'id',
  /** column name */
  IpAddress = 'ip_address',
  /** column name */
  LastChecked = 'last_checked',
  /** column name */
  WalletAddress = 'wallet_address',
}

/** input type for updating data in table "screenings" */
export type Screenings_Set_Input = {
  blocked?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['Int']>
  ip_address?: Maybe<Scalars['String']>
  last_checked?: Maybe<Scalars['timestamptz']>
  wallet_address?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Screenings_Stddev_Fields = {
  __typename?: 'screenings_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Screenings_Stddev_Pop_Fields = {
  __typename?: 'screenings_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Screenings_Stddev_Samp_Fields = {
  __typename?: 'screenings_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "screenings" */
export type Screenings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Screenings_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Screenings_Stream_Cursor_Value_Input = {
  blocked?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['Int']>
  ip_address?: Maybe<Scalars['String']>
  last_checked?: Maybe<Scalars['timestamptz']>
  wallet_address?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Screenings_Sum_Fields = {
  __typename?: 'screenings_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "screenings" */
export enum Screenings_Update_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  Id = 'id',
  /** column name */
  IpAddress = 'ip_address',
  /** column name */
  LastChecked = 'last_checked',
  /** column name */
  WalletAddress = 'wallet_address',
}

export type Screenings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Screenings_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Screenings_Set_Input>
  where: Screenings_Bool_Exp
}

/** aggregate var_pop on columns */
export type Screenings_Var_Pop_Fields = {
  __typename?: 'screenings_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Screenings_Var_Samp_Fields = {
  __typename?: 'screenings_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Screenings_Variance_Fields = {
  __typename?: 'screenings_variance_fields'
  id?: Maybe<Scalars['Float']>
}

export type Search_Projects_Args = {
  search?: Maybe<Scalars['String']>
}

export type Search_Tags_Args = {
  search?: Maybe<Scalars['String']>
}

export type Search_Tokens_Args = {
  search?: Maybe<Scalars['String']>
}

export type Search_Users_Args = {
  search?: Maybe<Scalars['String']>
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  account?: Maybe<Account>
  accountProject?: Maybe<AccountProject>
  accountProjects: Array<AccountProject>
  accounts: Array<Account>
  /** fetch data from the table: "categories" */
  categories: Array<Categories>
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>
  /** fetch data from the table in a streaming manner : "categories" */
  categories_stream: Array<Categories>
  contract?: Maybe<Contract>
  /** fetch data from the table: "contract_allowlistings" */
  contract_allowlistings: Array<Contract_Allowlistings>
  /** fetch aggregated fields from the table: "contract_allowlistings" */
  contract_allowlistings_aggregate: Contract_Allowlistings_Aggregate
  /** fetch data from the table: "contract_allowlistings" using primary key columns */
  contract_allowlistings_by_pk?: Maybe<Contract_Allowlistings>
  /** fetch data from the table in a streaming manner : "contract_allowlistings" */
  contract_allowlistings_stream: Array<Contract_Allowlistings>
  /** fetch data from the table: "contract_type_names" */
  contract_type_names: Array<Contract_Type_Names>
  /** fetch aggregated fields from the table: "contract_type_names" */
  contract_type_names_aggregate: Contract_Type_Names_Aggregate
  /** fetch data from the table: "contract_type_names" using primary key columns */
  contract_type_names_by_pk?: Maybe<Contract_Type_Names>
  /** fetch data from the table in a streaming manner : "contract_type_names" */
  contract_type_names_stream: Array<Contract_Type_Names>
  /** fetch data from the table: "contract_types" */
  contract_types: Array<Contract_Types>
  /** fetch aggregated fields from the table: "contract_types" */
  contract_types_aggregate: Contract_Types_Aggregate
  /** fetch data from the table: "contract_types" using primary key columns */
  contract_types_by_pk?: Maybe<Contract_Types>
  /** fetch data from the table in a streaming manner : "contract_types" */
  contract_types_stream: Array<Contract_Types>
  contracts: Array<Contract>
  /** fetch data from the table: "contracts_metadata" */
  contracts_metadata: Array<Contracts_Metadata>
  /** fetch aggregated fields from the table: "contracts_metadata" */
  contracts_metadata_aggregate: Contracts_Metadata_Aggregate
  /** fetch data from the table: "contracts_metadata" using primary key columns */
  contracts_metadata_by_pk?: Maybe<Contracts_Metadata>
  /** fetch data from the table in a streaming manner : "contracts_metadata" */
  contracts_metadata_stream: Array<Contracts_Metadata>
  createApplication?: Maybe<CreateApplication>
  /** fetch data from the table: "curation_statuses" */
  curation_statuses: Array<Curation_Statuses>
  /** fetch aggregated fields from the table: "curation_statuses" */
  curation_statuses_aggregate: Curation_Statuses_Aggregate
  /** fetch data from the table: "curation_statuses" using primary key columns */
  curation_statuses_by_pk?: Maybe<Curation_Statuses>
  /** fetch data from the table in a streaming manner : "curation_statuses" */
  curation_statuses_stream: Array<Curation_Statuses>
  /** An array relationship */
  entity_tags: Array<Entity_Tags>
  /** An aggregate relationship */
  entity_tags_aggregate: Entity_Tags_Aggregate
  /** fetch data from the table: "entity_tags" using primary key columns */
  entity_tags_by_pk?: Maybe<Entity_Tags>
  /** fetch data from the table in a streaming manner : "entity_tags" */
  entity_tags_stream: Array<Entity_Tags>
  /** An array relationship */
  favorites: Array<Favorites>
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate
  /** fetch data from the table: "favorites" using primary key columns */
  favorites_by_pk?: Maybe<Favorites>
  /** fetch data from the table in a streaming manner : "favorites" */
  favorites_stream: Array<Favorites>
  /** fetch data from the table: "feature_field_values_counts" */
  feature_field_values_counts: Array<Feature_Field_Values_Counts>
  /** fetch aggregated fields from the table: "feature_field_values_counts" */
  feature_field_values_counts_aggregate: Feature_Field_Values_Counts_Aggregate
  /** fetch data from the table in a streaming manner : "feature_field_values_counts" */
  feature_field_values_counts_stream: Array<Feature_Field_Values_Counts>
  /** fetch data from the table: "feature_flags" */
  feature_flags: Array<Feature_Flags>
  /** fetch aggregated fields from the table: "feature_flags" */
  feature_flags_aggregate: Feature_Flags_Aggregate
  /** fetch data from the table: "feature_flags" using primary key columns */
  feature_flags_by_pk?: Maybe<Feature_Flags>
  /** fetch data from the table in a streaming manner : "feature_flags" */
  feature_flags_stream: Array<Feature_Flags>
  /** execute function "filter_tokens_metadata_by_features" which returns "tokens_metadata" */
  filter_tokens_metadata_by_features: Array<Tokens_Metadata>
  /** execute function "filter_tokens_metadata_by_features" and query aggregates on result of table type "tokens_metadata" */
  filter_tokens_metadata_by_features_aggregate: Tokens_Metadata_Aggregate
  /** execute function "get_projects_metadata_feature_field_value_counts" which returns "feature_field_values_counts" */
  get_projects_metadata_feature_field_value_counts: Array<Feature_Field_Values_Counts>
  /** execute function "get_projects_metadata_feature_field_value_counts" and query aggregates on result of table type "feature_field_values_counts" */
  get_projects_metadata_feature_field_value_counts_aggregate: Feature_Field_Values_Counts_Aggregate
  /** execute function "list_projects_metadata_random" which returns "projects_metadata" */
  list_projects_metadata_random: Array<Projects_Metadata>
  /** execute function "list_projects_metadata_random" and query aggregates on result of table type "projects_metadata" */
  list_projects_metadata_random_aggregate: Projects_Metadata_Aggregate
  /** fetch data from the table: "media" */
  media: Array<Media>
  /** fetch aggregated fields from the table: "media" */
  media_aggregate: Media_Aggregate
  /** fetch data from the table: "media" using primary key columns */
  media_by_pk?: Maybe<Media>
  /** fetch data from the table in a streaming manner : "media" */
  media_stream: Array<Media>
  minter?: Maybe<Minter>
  minterFilter?: Maybe<MinterFilter>
  minterFilters: Array<MinterFilter>
  /** fetch data from the table: "minter_filters_metadata" */
  minter_filters_metadata: Array<Minter_Filters_Metadata>
  /** fetch aggregated fields from the table: "minter_filters_metadata" */
  minter_filters_metadata_aggregate: Minter_Filters_Metadata_Aggregate
  /** fetch data from the table: "minter_filters_metadata" using primary key columns */
  minter_filters_metadata_by_pk?: Maybe<Minter_Filters_Metadata>
  /** fetch data from the table in a streaming manner : "minter_filters_metadata" */
  minter_filters_metadata_stream: Array<Minter_Filters_Metadata>
  /** fetch data from the table: "minter_type_names" */
  minter_type_names: Array<Minter_Type_Names>
  /** fetch aggregated fields from the table: "minter_type_names" */
  minter_type_names_aggregate: Minter_Type_Names_Aggregate
  /** fetch data from the table: "minter_type_names" using primary key columns */
  minter_type_names_by_pk?: Maybe<Minter_Type_Names>
  /** fetch data from the table in a streaming manner : "minter_type_names" */
  minter_type_names_stream: Array<Minter_Type_Names>
  /** fetch data from the table: "minter_types" */
  minter_types: Array<Minter_Types>
  /** fetch aggregated fields from the table: "minter_types" */
  minter_types_aggregate: Minter_Types_Aggregate
  /** fetch data from the table: "minter_types" using primary key columns */
  minter_types_by_pk?: Maybe<Minter_Types>
  /** fetch data from the table in a streaming manner : "minter_types" */
  minter_types_stream: Array<Minter_Types>
  minters: Array<Minter>
  /** fetch data from the table: "minters_metadata" */
  minters_metadata: Array<Minters_Metadata>
  /** fetch aggregated fields from the table: "minters_metadata" */
  minters_metadata_aggregate: Minters_Metadata_Aggregate
  /** fetch data from the table: "minters_metadata" using primary key columns */
  minters_metadata_by_pk?: Maybe<Minters_Metadata>
  /** fetch data from the table in a streaming manner : "minters_metadata" */
  minters_metadata_stream: Array<Minters_Metadata>
  /** An array relationship */
  notifications: Array<Notifications>
  /** An aggregate relationship */
  notifications_aggregate: Notifications_Aggregate
  /** fetch data from the table: "notifications" using primary key columns */
  notifications_by_pk?: Maybe<Notifications>
  /** fetch data from the table in a streaming manner : "notifications" */
  notifications_stream: Array<Notifications>
  payment?: Maybe<Payment>
  payments: Array<Payment>
  project?: Maybe<Project>
  projectExternalAssetDependencies: Array<ProjectExternalAssetDependency>
  projectExternalAssetDependency?: Maybe<ProjectExternalAssetDependency>
  projectMinterConfiguration?: Maybe<ProjectMinterConfiguration>
  projectMinterConfigurations: Array<ProjectMinterConfiguration>
  projectScript?: Maybe<ProjectScript>
  projectScripts: Array<ProjectScript>
  /** fetch data from the table: "project_external_asset_dependencies" */
  project_external_asset_dependencies: Array<Project_External_Asset_Dependencies>
  /** fetch aggregated fields from the table: "project_external_asset_dependencies" */
  project_external_asset_dependencies_aggregate: Project_External_Asset_Dependencies_Aggregate
  /** fetch data from the table: "project_external_asset_dependencies" using primary key columns */
  project_external_asset_dependencies_by_pk?: Maybe<Project_External_Asset_Dependencies>
  /** fetch data from the table in a streaming manner : "project_external_asset_dependencies" */
  project_external_asset_dependencies_stream: Array<Project_External_Asset_Dependencies>
  /** fetch data from the table: "project_external_asset_dependency_types" */
  project_external_asset_dependency_types: Array<Project_External_Asset_Dependency_Types>
  /** fetch aggregated fields from the table: "project_external_asset_dependency_types" */
  project_external_asset_dependency_types_aggregate: Project_External_Asset_Dependency_Types_Aggregate
  /** fetch data from the table: "project_external_asset_dependency_types" using primary key columns */
  project_external_asset_dependency_types_by_pk?: Maybe<Project_External_Asset_Dependency_Types>
  /** fetch data from the table in a streaming manner : "project_external_asset_dependency_types" */
  project_external_asset_dependency_types_stream: Array<Project_External_Asset_Dependency_Types>
  /** fetch data from the table: "project_minter_configurations" */
  project_minter_configurations: Array<Project_Minter_Configurations>
  /** fetch aggregated fields from the table: "project_minter_configurations" */
  project_minter_configurations_aggregate: Project_Minter_Configurations_Aggregate
  /** fetch data from the table: "project_minter_configurations" using primary key columns */
  project_minter_configurations_by_pk?: Maybe<Project_Minter_Configurations>
  /** fetch data from the table in a streaming manner : "project_minter_configurations" */
  project_minter_configurations_stream: Array<Project_Minter_Configurations>
  /** fetch data from the table: "project_scripts" */
  project_scripts: Array<Project_Scripts>
  /** fetch aggregated fields from the table: "project_scripts" */
  project_scripts_aggregate: Project_Scripts_Aggregate
  /** fetch data from the table: "project_scripts" using primary key columns */
  project_scripts_by_pk?: Maybe<Project_Scripts>
  /** fetch data from the table in a streaming manner : "project_scripts" */
  project_scripts_stream: Array<Project_Scripts>
  /** fetch data from the table: "project_series" */
  project_series: Array<Project_Series>
  /** fetch aggregated fields from the table: "project_series" */
  project_series_aggregate: Project_Series_Aggregate
  /** fetch data from the table: "project_series" using primary key columns */
  project_series_by_pk?: Maybe<Project_Series>
  /** fetch data from the table in a streaming manner : "project_series" */
  project_series_stream: Array<Project_Series>
  /** fetch data from the table: "project_vertical_categories" */
  project_vertical_categories: Array<Project_Vertical_Categories>
  /** fetch aggregated fields from the table: "project_vertical_categories" */
  project_vertical_categories_aggregate: Project_Vertical_Categories_Aggregate
  /** fetch data from the table: "project_vertical_categories" using primary key columns */
  project_vertical_categories_by_pk?: Maybe<Project_Vertical_Categories>
  /** fetch data from the table in a streaming manner : "project_vertical_categories" */
  project_vertical_categories_stream: Array<Project_Vertical_Categories>
  /** fetch data from the table: "project_verticals" */
  project_verticals: Array<Project_Verticals>
  /** fetch aggregated fields from the table: "project_verticals" */
  project_verticals_aggregate: Project_Verticals_Aggregate
  /** fetch data from the table: "project_verticals" using primary key columns */
  project_verticals_by_pk?: Maybe<Project_Verticals>
  /** fetch data from the table in a streaming manner : "project_verticals" */
  project_verticals_stream: Array<Project_Verticals>
  projects: Array<Project>
  /** fetch data from the table: "projects_features" */
  projects_features: Array<Projects_Features>
  /** fetch aggregated fields from the table: "projects_features" */
  projects_features_aggregate: Projects_Features_Aggregate
  /** fetch data from the table: "projects_features" using primary key columns */
  projects_features_by_pk?: Maybe<Projects_Features>
  /** fetch data from the table: "projects_features_private" */
  projects_features_private: Array<Projects_Features_Private>
  /** fetch aggregated fields from the table: "projects_features_private" */
  projects_features_private_aggregate: Projects_Features_Private_Aggregate
  /** fetch data from the table in a streaming manner : "projects_features_private" */
  projects_features_private_stream: Array<Projects_Features_Private>
  /** fetch data from the table in a streaming manner : "projects_features" */
  projects_features_stream: Array<Projects_Features>
  /** fetch data from the table: "projects_metadata" */
  projects_metadata: Array<Projects_Metadata>
  /** fetch aggregated fields from the table: "projects_metadata" */
  projects_metadata_aggregate: Projects_Metadata_Aggregate
  /** fetch data from the table: "projects_metadata" using primary key columns */
  projects_metadata_by_pk?: Maybe<Projects_Metadata>
  /** fetch data from the table in a streaming manner : "projects_metadata" */
  projects_metadata_stream: Array<Projects_Metadata>
  proposedArtistAddressesAndSplit?: Maybe<ProposedArtistAddressesAndSplit>
  proposedArtistAddressesAndSplits: Array<ProposedArtistAddressesAndSplit>
  /** fetch data from the table: "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits: Array<Proposed_Artist_Addresses_And_Splits>
  /** fetch aggregated fields from the table: "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits_aggregate: Proposed_Artist_Addresses_And_Splits_Aggregate
  /** fetch data from the table: "proposed_artist_addresses_and_splits" using primary key columns */
  proposed_artist_addresses_and_splits_by_pk?: Maybe<Proposed_Artist_Addresses_And_Splits>
  /** fetch data from the table in a streaming manner : "proposed_artist_addresses_and_splits" */
  proposed_artist_addresses_and_splits_stream: Array<Proposed_Artist_Addresses_And_Splits>
  sale?: Maybe<Sale>
  saleLookupTable?: Maybe<SaleLookupTable>
  saleLookupTables: Array<SaleLookupTable>
  sales: Array<Sale>
  /** fetch data from the table: "screenings" */
  screenings: Array<Screenings>
  /** fetch aggregated fields from the table: "screenings" */
  screenings_aggregate: Screenings_Aggregate
  /** fetch data from the table: "screenings" using primary key columns */
  screenings_by_pk?: Maybe<Screenings>
  /** fetch data from the table in a streaming manner : "screenings" */
  screenings_stream: Array<Screenings>
  /** execute function "search_projects" which returns "projects_metadata" */
  search_projects: Array<Projects_Metadata>
  /** execute function "search_projects" and query aggregates on result of table type "projects_metadata" */
  search_projects_aggregate: Projects_Metadata_Aggregate
  /** execute function "search_tags" which returns "tags" */
  search_tags: Array<Tags>
  /** execute function "search_tags" and query aggregates on result of table type "tags" */
  search_tags_aggregate: Tags_Aggregate
  /** execute function "search_tokens" which returns "tokens_metadata" */
  search_tokens: Array<Tokens_Metadata>
  /** execute function "search_tokens" and query aggregates on result of table type "tokens_metadata" */
  search_tokens_aggregate: Tokens_Metadata_Aggregate
  /** execute function "search_users" which returns "user_profiles" */
  search_users: Array<User_Profiles>
  /** execute function "search_users" and query aggregates on result of table type "user_profiles" */
  search_users_aggregate: User_Profiles_Aggregate
  /** fetch data from the table: "sync_status" */
  sync_status: Array<Sync_Status>
  /** fetch aggregated fields from the table: "sync_status" */
  sync_status_aggregate: Sync_Status_Aggregate
  /** fetch data from the table: "sync_status" using primary key columns */
  sync_status_by_pk?: Maybe<Sync_Status>
  /** fetch data from the table in a streaming manner : "sync_status" */
  sync_status_stream: Array<Sync_Status>
  /** fetch data from the table: "tag_groupings" */
  tag_groupings: Array<Tag_Groupings>
  /** fetch aggregated fields from the table: "tag_groupings" */
  tag_groupings_aggregate: Tag_Groupings_Aggregate
  /** fetch data from the table: "tag_groupings" using primary key columns */
  tag_groupings_by_pk?: Maybe<Tag_Groupings>
  /** fetch data from the table in a streaming manner : "tag_groupings" */
  tag_groupings_stream: Array<Tag_Groupings>
  /** fetch data from the table: "tag_status" */
  tag_status: Array<Tag_Status>
  /** fetch aggregated fields from the table: "tag_status" */
  tag_status_aggregate: Tag_Status_Aggregate
  /** fetch data from the table: "tag_status" using primary key columns */
  tag_status_by_pk?: Maybe<Tag_Status>
  /** fetch data from the table in a streaming manner : "tag_status" */
  tag_status_stream: Array<Tag_Status>
  /** fetch data from the table: "tag_types" */
  tag_types: Array<Tag_Types>
  /** fetch aggregated fields from the table: "tag_types" */
  tag_types_aggregate: Tag_Types_Aggregate
  /** fetch data from the table: "tag_types" using primary key columns */
  tag_types_by_pk?: Maybe<Tag_Types>
  /** fetch data from the table in a streaming manner : "tag_types" */
  tag_types_stream: Array<Tag_Types>
  /** fetch data from the table: "tags" */
  tags: Array<Tags>
  /** fetch aggregated fields from the table: "tags" */
  tags_aggregate: Tags_Aggregate
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>
  /** fetch data from the table in a streaming manner : "tags" */
  tags_stream: Array<Tags>
  /** fetch data from the table: "terms_of_service" */
  terms_of_service: Array<Terms_Of_Service>
  /** fetch aggregated fields from the table: "terms_of_service" */
  terms_of_service_aggregate: Terms_Of_Service_Aggregate
  /** fetch data from the table: "terms_of_service" using primary key columns */
  terms_of_service_by_pk?: Maybe<Terms_Of_Service>
  /** fetch data from the table in a streaming manner : "terms_of_service" */
  terms_of_service_stream: Array<Terms_Of_Service>
  token?: Maybe<Token>
  tokens: Array<Token>
  /** fetch data from the table: "tokens_metadata" */
  tokens_metadata: Array<Tokens_Metadata>
  /** fetch aggregated fields from the table: "tokens_metadata" */
  tokens_metadata_aggregate: Tokens_Metadata_Aggregate
  /** fetch data from the table: "tokens_metadata" using primary key columns */
  tokens_metadata_by_pk?: Maybe<Tokens_Metadata>
  /** fetch data from the table in a streaming manner : "tokens_metadata" */
  tokens_metadata_stream: Array<Tokens_Metadata>
  transfer?: Maybe<Transfer>
  transfers: Array<Transfer>
  /** fetch data from the table: "user_profiles" */
  user_profiles: Array<User_Profiles>
  /** fetch aggregated fields from the table: "user_profiles" */
  user_profiles_aggregate: User_Profiles_Aggregate
  /** fetch data from the table: "user_profiles" using primary key columns */
  user_profiles_by_pk?: Maybe<User_Profiles>
  /** fetch data from the table in a streaming manner : "user_profiles" */
  user_profiles_stream: Array<User_Profiles>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
  /** fetch data from the table in a streaming manner : "users" */
  users_stream: Array<Users>
  /** fetch data from the table: "verticals" */
  verticals: Array<Verticals>
  /** fetch aggregated fields from the table: "verticals" */
  verticals_aggregate: Verticals_Aggregate
  /** fetch data from the table: "verticals" using primary key columns */
  verticals_by_pk?: Maybe<Verticals>
  /** fetch data from the table in a streaming manner : "verticals" */
  verticals_stream: Array<Verticals>
  /** fetch data from the table: "webflow_artist_info" */
  webflow_artist_info: Array<Webflow_Artist_Info>
  /** fetch aggregated fields from the table: "webflow_artist_info" */
  webflow_artist_info_aggregate: Webflow_Artist_Info_Aggregate
  /** fetch data from the table: "webflow_artist_info" using primary key columns */
  webflow_artist_info_by_pk?: Maybe<Webflow_Artist_Info>
  /** fetch data from the table in a streaming manner : "webflow_artist_info" */
  webflow_artist_info_stream: Array<Webflow_Artist_Info>
  /** fetch data from the table: "webflow_spectrum_articles" */
  webflow_spectrum_articles: Array<Webflow_Spectrum_Articles>
  /** fetch aggregated fields from the table: "webflow_spectrum_articles" */
  webflow_spectrum_articles_aggregate: Webflow_Spectrum_Articles_Aggregate
  /** fetch data from the table: "webflow_spectrum_articles" using primary key columns */
  webflow_spectrum_articles_by_pk?: Maybe<Webflow_Spectrum_Articles>
  /** fetch data from the table in a streaming manner : "webflow_spectrum_articles" */
  webflow_spectrum_articles_stream: Array<Webflow_Spectrum_Articles>
  whitelisting?: Maybe<Whitelisting>
  whitelistings: Array<Whitelisting>
}

export type Subscription_Root_MetaArgs = {
  block?: Maybe<Block_Height>
}

export type Subscription_RootAccountArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootAccountProjectArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootAccountProjectsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<AccountProject_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<AccountProject_Filter>
}

export type Subscription_RootAccountsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Account_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Account_Filter>
}

export type Subscription_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Categories_Order_By>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Subscription_RootCategories_By_PkArgs = {
  name: Scalars['String']
}

export type Subscription_RootCategories_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Categories_Stream_Cursor_Input>>
  where?: Maybe<Categories_Bool_Exp>
}

export type Subscription_RootContractArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootContract_AllowlistingsArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

export type Subscription_RootContract_Allowlistings_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

export type Subscription_RootContract_Allowlistings_By_PkArgs = {
  contract_address: Scalars['String']
  user_address: Scalars['String']
}

export type Subscription_RootContract_Allowlistings_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Contract_Allowlistings_Stream_Cursor_Input>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

export type Subscription_RootContract_Type_NamesArgs = {
  distinct_on?: Maybe<Array<Contract_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Type_Names_Order_By>>
  where?: Maybe<Contract_Type_Names_Bool_Exp>
}

export type Subscription_RootContract_Type_Names_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Type_Names_Order_By>>
  where?: Maybe<Contract_Type_Names_Bool_Exp>
}

export type Subscription_RootContract_Type_Names_By_PkArgs = {
  name: Scalars['String']
}

export type Subscription_RootContract_Type_Names_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Contract_Type_Names_Stream_Cursor_Input>>
  where?: Maybe<Contract_Type_Names_Bool_Exp>
}

export type Subscription_RootContract_TypesArgs = {
  distinct_on?: Maybe<Array<Contract_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Types_Order_By>>
  where?: Maybe<Contract_Types_Bool_Exp>
}

export type Subscription_RootContract_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Types_Order_By>>
  where?: Maybe<Contract_Types_Bool_Exp>
}

export type Subscription_RootContract_Types_By_PkArgs = {
  type: Contract_Type_Names_Enum
}

export type Subscription_RootContract_Types_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Contract_Types_Stream_Cursor_Input>>
  where?: Maybe<Contract_Types_Bool_Exp>
}

export type Subscription_RootContractsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Contract_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Contract_Filter>
}

export type Subscription_RootContracts_MetadataArgs = {
  distinct_on?: Maybe<Array<Contracts_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contracts_Metadata_Order_By>>
  where?: Maybe<Contracts_Metadata_Bool_Exp>
}

export type Subscription_RootContracts_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Contracts_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contracts_Metadata_Order_By>>
  where?: Maybe<Contracts_Metadata_Bool_Exp>
}

export type Subscription_RootContracts_Metadata_By_PkArgs = {
  address: Scalars['String']
}

export type Subscription_RootContracts_Metadata_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Contracts_Metadata_Stream_Cursor_Input>>
  where?: Maybe<Contracts_Metadata_Bool_Exp>
}

export type Subscription_RootCreateApplicationArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootCuration_StatusesArgs = {
  distinct_on?: Maybe<Array<Curation_Statuses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Curation_Statuses_Order_By>>
  where?: Maybe<Curation_Statuses_Bool_Exp>
}

export type Subscription_RootCuration_Statuses_AggregateArgs = {
  distinct_on?: Maybe<Array<Curation_Statuses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Curation_Statuses_Order_By>>
  where?: Maybe<Curation_Statuses_Bool_Exp>
}

export type Subscription_RootCuration_Statuses_By_PkArgs = {
  value: Scalars['String']
}

export type Subscription_RootCuration_Statuses_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Curation_Statuses_Stream_Cursor_Input>>
  where?: Maybe<Curation_Statuses_Bool_Exp>
}

export type Subscription_RootEntity_TagsArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

export type Subscription_RootEntity_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

export type Subscription_RootEntity_Tags_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootEntity_Tags_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Entity_Tags_Stream_Cursor_Input>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

export type Subscription_RootFavoritesArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

export type Subscription_RootFavorites_AggregateArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

export type Subscription_RootFavorites_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootFavorites_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Favorites_Stream_Cursor_Input>>
  where?: Maybe<Favorites_Bool_Exp>
}

export type Subscription_RootFeature_Field_Values_CountsArgs = {
  distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
  where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
}

export type Subscription_RootFeature_Field_Values_Counts_AggregateArgs = {
  distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
  where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
}

export type Subscription_RootFeature_Field_Values_Counts_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Feature_Field_Values_Counts_Stream_Cursor_Input>>
  where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
}

export type Subscription_RootFeature_FlagsArgs = {
  distinct_on?: Maybe<Array<Feature_Flags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Flags_Order_By>>
  where?: Maybe<Feature_Flags_Bool_Exp>
}

export type Subscription_RootFeature_Flags_AggregateArgs = {
  distinct_on?: Maybe<Array<Feature_Flags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Feature_Flags_Order_By>>
  where?: Maybe<Feature_Flags_Bool_Exp>
}

export type Subscription_RootFeature_Flags_By_PkArgs = {
  flag_name: Scalars['String']
}

export type Subscription_RootFeature_Flags_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Feature_Flags_Stream_Cursor_Input>>
  where?: Maybe<Feature_Flags_Bool_Exp>
}

export type Subscription_RootFilter_Tokens_Metadata_By_FeaturesArgs = {
  args: Filter_Tokens_Metadata_By_Features_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Subscription_RootFilter_Tokens_Metadata_By_Features_AggregateArgs =
  {
    args: Filter_Tokens_Metadata_By_Features_Args
    distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
    where?: Maybe<Tokens_Metadata_Bool_Exp>
  }

export type Subscription_RootGet_Projects_Metadata_Feature_Field_Value_CountsArgs =
  {
    args: Get_Projects_Metadata_Feature_Field_Value_Counts_Args
    distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
    where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
  }

export type Subscription_RootGet_Projects_Metadata_Feature_Field_Value_Counts_AggregateArgs =
  {
    args: Get_Projects_Metadata_Feature_Field_Value_Counts_Args
    distinct_on?: Maybe<Array<Feature_Field_Values_Counts_Select_Column>>
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    order_by?: Maybe<Array<Feature_Field_Values_Counts_Order_By>>
    where?: Maybe<Feature_Field_Values_Counts_Bool_Exp>
  }

export type Subscription_RootList_Projects_Metadata_RandomArgs = {
  args: List_Projects_Metadata_Random_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Subscription_RootList_Projects_Metadata_Random_AggregateArgs = {
  args: List_Projects_Metadata_Random_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Subscription_RootMediaArgs = {
  distinct_on?: Maybe<Array<Media_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Media_Order_By>>
  where?: Maybe<Media_Bool_Exp>
}

export type Subscription_RootMedia_AggregateArgs = {
  distinct_on?: Maybe<Array<Media_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Media_Order_By>>
  where?: Maybe<Media_Bool_Exp>
}

export type Subscription_RootMedia_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootMedia_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Media_Stream_Cursor_Input>>
  where?: Maybe<Media_Bool_Exp>
}

export type Subscription_RootMinterArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootMinterFilterArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootMinterFiltersArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<MinterFilter_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<MinterFilter_Filter>
}

export type Subscription_RootMinter_Filters_MetadataArgs = {
  distinct_on?: Maybe<Array<Minter_Filters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Filters_Metadata_Order_By>>
  where?: Maybe<Minter_Filters_Metadata_Bool_Exp>
}

export type Subscription_RootMinter_Filters_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Minter_Filters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Filters_Metadata_Order_By>>
  where?: Maybe<Minter_Filters_Metadata_Bool_Exp>
}

export type Subscription_RootMinter_Filters_Metadata_By_PkArgs = {
  address: Scalars['String']
}

export type Subscription_RootMinter_Filters_Metadata_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Minter_Filters_Metadata_Stream_Cursor_Input>>
  where?: Maybe<Minter_Filters_Metadata_Bool_Exp>
}

export type Subscription_RootMinter_Type_NamesArgs = {
  distinct_on?: Maybe<Array<Minter_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Type_Names_Order_By>>
  where?: Maybe<Minter_Type_Names_Bool_Exp>
}

export type Subscription_RootMinter_Type_Names_AggregateArgs = {
  distinct_on?: Maybe<Array<Minter_Type_Names_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Type_Names_Order_By>>
  where?: Maybe<Minter_Type_Names_Bool_Exp>
}

export type Subscription_RootMinter_Type_Names_By_PkArgs = {
  name: Scalars['String']
}

export type Subscription_RootMinter_Type_Names_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Minter_Type_Names_Stream_Cursor_Input>>
  where?: Maybe<Minter_Type_Names_Bool_Exp>
}

export type Subscription_RootMinter_TypesArgs = {
  distinct_on?: Maybe<Array<Minter_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Types_Order_By>>
  where?: Maybe<Minter_Types_Bool_Exp>
}

export type Subscription_RootMinter_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Minter_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minter_Types_Order_By>>
  where?: Maybe<Minter_Types_Bool_Exp>
}

export type Subscription_RootMinter_Types_By_PkArgs = {
  type: Minter_Type_Names_Enum
}

export type Subscription_RootMinter_Types_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Minter_Types_Stream_Cursor_Input>>
  where?: Maybe<Minter_Types_Bool_Exp>
}

export type Subscription_RootMintersArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Minter_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Minter_Filter>
}

export type Subscription_RootMinters_MetadataArgs = {
  distinct_on?: Maybe<Array<Minters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minters_Metadata_Order_By>>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

export type Subscription_RootMinters_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Minters_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Minters_Metadata_Order_By>>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

export type Subscription_RootMinters_Metadata_By_PkArgs = {
  address: Scalars['String']
}

export type Subscription_RootMinters_Metadata_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Minters_Metadata_Stream_Cursor_Input>>
  where?: Maybe<Minters_Metadata_Bool_Exp>
}

export type Subscription_RootNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Notifications_Order_By>>
  where?: Maybe<Notifications_Bool_Exp>
}

export type Subscription_RootNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Notifications_Order_By>>
  where?: Maybe<Notifications_Bool_Exp>
}

export type Subscription_RootNotifications_By_PkArgs = {
  trigger_key: Scalars['String']
  trigger_time: Scalars['timestamptz']
  user_address: Scalars['String']
}

export type Subscription_RootNotifications_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Notifications_Stream_Cursor_Input>>
  where?: Maybe<Notifications_Bool_Exp>
}

export type Subscription_RootPaymentArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootPaymentsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Payment_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Payment_Filter>
}

export type Subscription_RootProjectArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootProjectExternalAssetDependenciesArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectExternalAssetDependency_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProjectExternalAssetDependency_Filter>
}

export type Subscription_RootProjectExternalAssetDependencyArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootProjectMinterConfigurationArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootProjectMinterConfigurationsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectMinterConfiguration_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProjectMinterConfiguration_Filter>
}

export type Subscription_RootProjectScriptArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootProjectScriptsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProjectScript_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProjectScript_Filter>
}

export type Subscription_RootProject_External_Asset_DependenciesArgs = {
  distinct_on?: Maybe<Array<Project_External_Asset_Dependencies_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependencies_Order_By>>
  where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
}

export type Subscription_RootProject_External_Asset_Dependencies_AggregateArgs =
  {
    distinct_on?: Maybe<
      Array<Project_External_Asset_Dependencies_Select_Column>
    >
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    order_by?: Maybe<Array<Project_External_Asset_Dependencies_Order_By>>
    where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
  }

export type Subscription_RootProject_External_Asset_Dependencies_By_PkArgs = {
  index: Scalars['Int']
  project_id: Scalars['String']
}

export type Subscription_RootProject_External_Asset_Dependencies_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Project_External_Asset_Dependencies_Stream_Cursor_Input>>
  where?: Maybe<Project_External_Asset_Dependencies_Bool_Exp>
}

export type Subscription_RootProject_External_Asset_Dependency_TypesArgs = {
  distinct_on?: Maybe<
    Array<Project_External_Asset_Dependency_Types_Select_Column>
  >
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_External_Asset_Dependency_Types_Order_By>>
  where?: Maybe<Project_External_Asset_Dependency_Types_Bool_Exp>
}

export type Subscription_RootProject_External_Asset_Dependency_Types_AggregateArgs =
  {
    distinct_on?: Maybe<
      Array<Project_External_Asset_Dependency_Types_Select_Column>
    >
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    order_by?: Maybe<Array<Project_External_Asset_Dependency_Types_Order_By>>
    where?: Maybe<Project_External_Asset_Dependency_Types_Bool_Exp>
  }

export type Subscription_RootProject_External_Asset_Dependency_Types_By_PkArgs =
  {
    type: Scalars['String']
  }

export type Subscription_RootProject_External_Asset_Dependency_Types_StreamArgs =
  {
    batch_size: Scalars['Int']
    cursor: Array<
      Maybe<Project_External_Asset_Dependency_Types_Stream_Cursor_Input>
    >
    where?: Maybe<Project_External_Asset_Dependency_Types_Bool_Exp>
  }

export type Subscription_RootProject_Minter_ConfigurationsArgs = {
  distinct_on?: Maybe<Array<Project_Minter_Configurations_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Minter_Configurations_Order_By>>
  where?: Maybe<Project_Minter_Configurations_Bool_Exp>
}

export type Subscription_RootProject_Minter_Configurations_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Minter_Configurations_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Minter_Configurations_Order_By>>
  where?: Maybe<Project_Minter_Configurations_Bool_Exp>
}

export type Subscription_RootProject_Minter_Configurations_By_PkArgs = {
  id: Scalars['String']
}

export type Subscription_RootProject_Minter_Configurations_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Project_Minter_Configurations_Stream_Cursor_Input>>
  where?: Maybe<Project_Minter_Configurations_Bool_Exp>
}

export type Subscription_RootProject_ScriptsArgs = {
  distinct_on?: Maybe<Array<Project_Scripts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Scripts_Order_By>>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

export type Subscription_RootProject_Scripts_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Scripts_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Scripts_Order_By>>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

export type Subscription_RootProject_Scripts_By_PkArgs = {
  index: Scalars['Int']
  project_id: Scalars['String']
}

export type Subscription_RootProject_Scripts_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Project_Scripts_Stream_Cursor_Input>>
  where?: Maybe<Project_Scripts_Bool_Exp>
}

export type Subscription_RootProject_SeriesArgs = {
  distinct_on?: Maybe<Array<Project_Series_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Series_Order_By>>
  where?: Maybe<Project_Series_Bool_Exp>
}

export type Subscription_RootProject_Series_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Series_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Series_Order_By>>
  where?: Maybe<Project_Series_Bool_Exp>
}

export type Subscription_RootProject_Series_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootProject_Series_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Project_Series_Stream_Cursor_Input>>
  where?: Maybe<Project_Series_Bool_Exp>
}

export type Subscription_RootProject_Vertical_CategoriesArgs = {
  distinct_on?: Maybe<Array<Project_Vertical_Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Vertical_Categories_Order_By>>
  where?: Maybe<Project_Vertical_Categories_Bool_Exp>
}

export type Subscription_RootProject_Vertical_Categories_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Vertical_Categories_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Vertical_Categories_Order_By>>
  where?: Maybe<Project_Vertical_Categories_Bool_Exp>
}

export type Subscription_RootProject_Vertical_Categories_By_PkArgs = {
  name: Categories_Enum
}

export type Subscription_RootProject_Vertical_Categories_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Project_Vertical_Categories_Stream_Cursor_Input>>
  where?: Maybe<Project_Vertical_Categories_Bool_Exp>
}

export type Subscription_RootProject_VerticalsArgs = {
  distinct_on?: Maybe<Array<Project_Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Verticals_Order_By>>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

export type Subscription_RootProject_Verticals_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Project_Verticals_Order_By>>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

export type Subscription_RootProject_Verticals_By_PkArgs = {
  name: Verticals_Enum
}

export type Subscription_RootProject_Verticals_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Project_Verticals_Stream_Cursor_Input>>
  where?: Maybe<Project_Verticals_Bool_Exp>
}

export type Subscription_RootProjectsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Project_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Project_Filter>
}

export type Subscription_RootProjects_FeaturesArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Order_By>>
  where?: Maybe<Projects_Features_Bool_Exp>
}

export type Subscription_RootProjects_Features_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Order_By>>
  where?: Maybe<Projects_Features_Bool_Exp>
}

export type Subscription_RootProjects_Features_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootProjects_Features_PrivateArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Private_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Private_Order_By>>
  where?: Maybe<Projects_Features_Private_Bool_Exp>
}

export type Subscription_RootProjects_Features_Private_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Features_Private_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Features_Private_Order_By>>
  where?: Maybe<Projects_Features_Private_Bool_Exp>
}

export type Subscription_RootProjects_Features_Private_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Projects_Features_Private_Stream_Cursor_Input>>
  where?: Maybe<Projects_Features_Private_Bool_Exp>
}

export type Subscription_RootProjects_Features_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Projects_Features_Stream_Cursor_Input>>
  where?: Maybe<Projects_Features_Bool_Exp>
}

export type Subscription_RootProjects_MetadataArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Subscription_RootProjects_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Subscription_RootProjects_Metadata_By_PkArgs = {
  id: Scalars['String']
}

export type Subscription_RootProjects_Metadata_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Projects_Metadata_Stream_Cursor_Input>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Subscription_RootProposedArtistAddressesAndSplitArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootProposedArtistAddressesAndSplitsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<ProposedArtistAddressesAndSplit_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<ProposedArtistAddressesAndSplit_Filter>
}

export type Subscription_RootProposed_Artist_Addresses_And_SplitsArgs = {
  distinct_on?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Order_By>>
  where?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
}

export type Subscription_RootProposed_Artist_Addresses_And_Splits_AggregateArgs =
  {
    distinct_on?: Maybe<
      Array<Proposed_Artist_Addresses_And_Splits_Select_Column>
    >
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    order_by?: Maybe<Array<Proposed_Artist_Addresses_And_Splits_Order_By>>
    where?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
  }

export type Subscription_RootProposed_Artist_Addresses_And_Splits_By_PkArgs = {
  project_id: Scalars['String']
}

export type Subscription_RootProposed_Artist_Addresses_And_Splits_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Proposed_Artist_Addresses_And_Splits_Stream_Cursor_Input>>
  where?: Maybe<Proposed_Artist_Addresses_And_Splits_Bool_Exp>
}

export type Subscription_RootSaleArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootSaleLookupTableArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootSaleLookupTablesArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<SaleLookupTable_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<SaleLookupTable_Filter>
}

export type Subscription_RootSalesArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Sale_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Sale_Filter>
}

export type Subscription_RootScreeningsArgs = {
  distinct_on?: Maybe<Array<Screenings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Screenings_Order_By>>
  where?: Maybe<Screenings_Bool_Exp>
}

export type Subscription_RootScreenings_AggregateArgs = {
  distinct_on?: Maybe<Array<Screenings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Screenings_Order_By>>
  where?: Maybe<Screenings_Bool_Exp>
}

export type Subscription_RootScreenings_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootScreenings_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Screenings_Stream_Cursor_Input>>
  where?: Maybe<Screenings_Bool_Exp>
}

export type Subscription_RootSearch_ProjectsArgs = {
  args: Search_Projects_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Subscription_RootSearch_Projects_AggregateArgs = {
  args: Search_Projects_Args
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

export type Subscription_RootSearch_TagsArgs = {
  args: Search_Tags_Args
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Subscription_RootSearch_Tags_AggregateArgs = {
  args: Search_Tags_Args
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Subscription_RootSearch_TokensArgs = {
  args: Search_Tokens_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Subscription_RootSearch_Tokens_AggregateArgs = {
  args: Search_Tokens_Args
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Subscription_RootSearch_UsersArgs = {
  args: Search_Users_Args
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Subscription_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Subscription_RootSync_StatusArgs = {
  distinct_on?: Maybe<Array<Sync_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Sync_Status_Order_By>>
  where?: Maybe<Sync_Status_Bool_Exp>
}

export type Subscription_RootSync_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Sync_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Sync_Status_Order_By>>
  where?: Maybe<Sync_Status_Bool_Exp>
}

export type Subscription_RootSync_Status_By_PkArgs = {
  id: Scalars['Boolean']
}

export type Subscription_RootSync_Status_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Sync_Status_Stream_Cursor_Input>>
  where?: Maybe<Sync_Status_Bool_Exp>
}

export type Subscription_RootTag_GroupingsArgs = {
  distinct_on?: Maybe<Array<Tag_Groupings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Groupings_Order_By>>
  where?: Maybe<Tag_Groupings_Bool_Exp>
}

export type Subscription_RootTag_Groupings_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Groupings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Groupings_Order_By>>
  where?: Maybe<Tag_Groupings_Bool_Exp>
}

export type Subscription_RootTag_Groupings_By_PkArgs = {
  name: Scalars['String']
}

export type Subscription_RootTag_Groupings_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Tag_Groupings_Stream_Cursor_Input>>
  where?: Maybe<Tag_Groupings_Bool_Exp>
}

export type Subscription_RootTag_StatusArgs = {
  distinct_on?: Maybe<Array<Tag_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Status_Order_By>>
  where?: Maybe<Tag_Status_Bool_Exp>
}

export type Subscription_RootTag_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Status_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Status_Order_By>>
  where?: Maybe<Tag_Status_Bool_Exp>
}

export type Subscription_RootTag_Status_By_PkArgs = {
  value: Scalars['String']
}

export type Subscription_RootTag_Status_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Tag_Status_Stream_Cursor_Input>>
  where?: Maybe<Tag_Status_Bool_Exp>
}

export type Subscription_RootTag_TypesArgs = {
  distinct_on?: Maybe<Array<Tag_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Types_Order_By>>
  where?: Maybe<Tag_Types_Bool_Exp>
}

export type Subscription_RootTag_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Types_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Types_Order_By>>
  where?: Maybe<Tag_Types_Bool_Exp>
}

export type Subscription_RootTag_Types_By_PkArgs = {
  value: Scalars['String']
}

export type Subscription_RootTag_Types_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Tag_Types_Stream_Cursor_Input>>
  where?: Maybe<Tag_Types_Bool_Exp>
}

export type Subscription_RootTagsArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Subscription_RootTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tags_Order_By>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Subscription_RootTags_By_PkArgs = {
  name: Scalars['String']
}

export type Subscription_RootTags_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Tags_Stream_Cursor_Input>>
  where?: Maybe<Tags_Bool_Exp>
}

export type Subscription_RootTerms_Of_ServiceArgs = {
  distinct_on?: Maybe<Array<Terms_Of_Service_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Terms_Of_Service_Order_By>>
  where?: Maybe<Terms_Of_Service_Bool_Exp>
}

export type Subscription_RootTerms_Of_Service_AggregateArgs = {
  distinct_on?: Maybe<Array<Terms_Of_Service_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Terms_Of_Service_Order_By>>
  where?: Maybe<Terms_Of_Service_Bool_Exp>
}

export type Subscription_RootTerms_Of_Service_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootTerms_Of_Service_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Terms_Of_Service_Stream_Cursor_Input>>
  where?: Maybe<Terms_Of_Service_Bool_Exp>
}

export type Subscription_RootTokenArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootTokensArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Token_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Token_Filter>
}

export type Subscription_RootTokens_MetadataArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Subscription_RootTokens_Metadata_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Subscription_RootTokens_Metadata_By_PkArgs = {
  id: Scalars['String']
}

export type Subscription_RootTokens_Metadata_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Tokens_Metadata_Stream_Cursor_Input>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

export type Subscription_RootTransferArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootTransfersArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Transfer_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Transfer_Filter>
}

export type Subscription_RootUser_ProfilesArgs = {
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Subscription_RootUser_Profiles_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Profiles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Profiles_Order_By>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Subscription_RootUser_Profiles_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootUser_Profiles_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<User_Profiles_Stream_Cursor_Input>>
  where?: Maybe<User_Profiles_Bool_Exp>
}

export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_By_PkArgs = {
  public_address: Scalars['String']
}

export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Users_Stream_Cursor_Input>>
  where?: Maybe<Users_Bool_Exp>
}

export type Subscription_RootVerticalsArgs = {
  distinct_on?: Maybe<Array<Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Verticals_Order_By>>
  where?: Maybe<Verticals_Bool_Exp>
}

export type Subscription_RootVerticals_AggregateArgs = {
  distinct_on?: Maybe<Array<Verticals_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Verticals_Order_By>>
  where?: Maybe<Verticals_Bool_Exp>
}

export type Subscription_RootVerticals_By_PkArgs = {
  name: Scalars['String']
}

export type Subscription_RootVerticals_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Verticals_Stream_Cursor_Input>>
  where?: Maybe<Verticals_Bool_Exp>
}

export type Subscription_RootWebflow_Artist_InfoArgs = {
  distinct_on?: Maybe<Array<Webflow_Artist_Info_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Artist_Info_Order_By>>
  where?: Maybe<Webflow_Artist_Info_Bool_Exp>
}

export type Subscription_RootWebflow_Artist_Info_AggregateArgs = {
  distinct_on?: Maybe<Array<Webflow_Artist_Info_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Artist_Info_Order_By>>
  where?: Maybe<Webflow_Artist_Info_Bool_Exp>
}

export type Subscription_RootWebflow_Artist_Info_By_PkArgs = {
  webflow_item_id: Scalars['String']
}

export type Subscription_RootWebflow_Artist_Info_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Webflow_Artist_Info_Stream_Cursor_Input>>
  where?: Maybe<Webflow_Artist_Info_Bool_Exp>
}

export type Subscription_RootWebflow_Spectrum_ArticlesArgs = {
  distinct_on?: Maybe<Array<Webflow_Spectrum_Articles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Spectrum_Articles_Order_By>>
  where?: Maybe<Webflow_Spectrum_Articles_Bool_Exp>
}

export type Subscription_RootWebflow_Spectrum_Articles_AggregateArgs = {
  distinct_on?: Maybe<Array<Webflow_Spectrum_Articles_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Webflow_Spectrum_Articles_Order_By>>
  where?: Maybe<Webflow_Spectrum_Articles_Bool_Exp>
}

export type Subscription_RootWebflow_Spectrum_Articles_By_PkArgs = {
  webflow_item_id: Scalars['String']
}

export type Subscription_RootWebflow_Spectrum_Articles_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<Maybe<Webflow_Spectrum_Articles_Stream_Cursor_Input>>
  where?: Maybe<Webflow_Spectrum_Articles_Bool_Exp>
}

export type Subscription_RootWhitelistingArgs = {
  block?: Maybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_RootWhitelistingsArgs = {
  block?: Maybe<Block_Height>
  first?: Maybe<Scalars['Int']>
  orderBy?: Maybe<Whitelisting_OrderBy>
  orderDirection?: Maybe<OrderDirection>
  skip?: Maybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: Maybe<Whitelisting_Filter>
}

/** columns and relationships of "sync_status" */
export type Sync_Status = {
  __typename?: 'sync_status'
  id: Scalars['Boolean']
  last_contract_updated_at: Scalars['timestamptz']
  last_minter_filter_updated_at: Scalars['timestamptz']
  last_minter_updated_at: Scalars['timestamptz']
  last_project_updated_at: Scalars['timestamptz']
  last_secondary_updated_at: Scalars['timestamptz']
  last_token_updated_at: Scalars['timestamptz']
}

/** aggregated selection of "sync_status" */
export type Sync_Status_Aggregate = {
  __typename?: 'sync_status_aggregate'
  aggregate?: Maybe<Sync_Status_Aggregate_Fields>
  nodes: Array<Sync_Status>
}

/** aggregate fields of "sync_status" */
export type Sync_Status_Aggregate_Fields = {
  __typename?: 'sync_status_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Sync_Status_Max_Fields>
  min?: Maybe<Sync_Status_Min_Fields>
}

/** aggregate fields of "sync_status" */
export type Sync_Status_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Sync_Status_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "sync_status". All fields are combined with a logical 'AND'. */
export type Sync_Status_Bool_Exp = {
  _and?: Maybe<Array<Sync_Status_Bool_Exp>>
  _not?: Maybe<Sync_Status_Bool_Exp>
  _or?: Maybe<Array<Sync_Status_Bool_Exp>>
  id?: Maybe<Boolean_Comparison_Exp>
  last_contract_updated_at?: Maybe<Timestamptz_Comparison_Exp>
  last_minter_filter_updated_at?: Maybe<Timestamptz_Comparison_Exp>
  last_minter_updated_at?: Maybe<Timestamptz_Comparison_Exp>
  last_project_updated_at?: Maybe<Timestamptz_Comparison_Exp>
  last_secondary_updated_at?: Maybe<Timestamptz_Comparison_Exp>
  last_token_updated_at?: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "sync_status" */
export enum Sync_Status_Constraint {
  /** unique or primary key constraint on columns "id" */
  SyncStatusPkey = 'sync_status_pkey',
}

/** input type for inserting data into table "sync_status" */
export type Sync_Status_Insert_Input = {
  id?: Maybe<Scalars['Boolean']>
  last_contract_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_filter_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_updated_at?: Maybe<Scalars['timestamptz']>
  last_project_updated_at?: Maybe<Scalars['timestamptz']>
  last_secondary_updated_at?: Maybe<Scalars['timestamptz']>
  last_token_updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Sync_Status_Max_Fields = {
  __typename?: 'sync_status_max_fields'
  last_contract_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_filter_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_updated_at?: Maybe<Scalars['timestamptz']>
  last_project_updated_at?: Maybe<Scalars['timestamptz']>
  last_secondary_updated_at?: Maybe<Scalars['timestamptz']>
  last_token_updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Sync_Status_Min_Fields = {
  __typename?: 'sync_status_min_fields'
  last_contract_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_filter_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_updated_at?: Maybe<Scalars['timestamptz']>
  last_project_updated_at?: Maybe<Scalars['timestamptz']>
  last_secondary_updated_at?: Maybe<Scalars['timestamptz']>
  last_token_updated_at?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "sync_status" */
export type Sync_Status_Mutation_Response = {
  __typename?: 'sync_status_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Sync_Status>
}

/** on_conflict condition type for table "sync_status" */
export type Sync_Status_On_Conflict = {
  constraint: Sync_Status_Constraint
  update_columns?: Array<Sync_Status_Update_Column>
  where?: Maybe<Sync_Status_Bool_Exp>
}

/** Ordering options when selecting data from "sync_status". */
export type Sync_Status_Order_By = {
  id?: Maybe<Order_By>
  last_contract_updated_at?: Maybe<Order_By>
  last_minter_filter_updated_at?: Maybe<Order_By>
  last_minter_updated_at?: Maybe<Order_By>
  last_project_updated_at?: Maybe<Order_By>
  last_secondary_updated_at?: Maybe<Order_By>
  last_token_updated_at?: Maybe<Order_By>
}

/** primary key columns input for table: sync_status */
export type Sync_Status_Pk_Columns_Input = {
  id: Scalars['Boolean']
}

/** select columns of table "sync_status" */
export enum Sync_Status_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LastContractUpdatedAt = 'last_contract_updated_at',
  /** column name */
  LastMinterFilterUpdatedAt = 'last_minter_filter_updated_at',
  /** column name */
  LastMinterUpdatedAt = 'last_minter_updated_at',
  /** column name */
  LastProjectUpdatedAt = 'last_project_updated_at',
  /** column name */
  LastSecondaryUpdatedAt = 'last_secondary_updated_at',
  /** column name */
  LastTokenUpdatedAt = 'last_token_updated_at',
}

/** input type for updating data in table "sync_status" */
export type Sync_Status_Set_Input = {
  id?: Maybe<Scalars['Boolean']>
  last_contract_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_filter_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_updated_at?: Maybe<Scalars['timestamptz']>
  last_project_updated_at?: Maybe<Scalars['timestamptz']>
  last_secondary_updated_at?: Maybe<Scalars['timestamptz']>
  last_token_updated_at?: Maybe<Scalars['timestamptz']>
}

/** Streaming cursor of the table "sync_status" */
export type Sync_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sync_Status_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Sync_Status_Stream_Cursor_Value_Input = {
  id?: Maybe<Scalars['Boolean']>
  last_contract_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_filter_updated_at?: Maybe<Scalars['timestamptz']>
  last_minter_updated_at?: Maybe<Scalars['timestamptz']>
  last_project_updated_at?: Maybe<Scalars['timestamptz']>
  last_secondary_updated_at?: Maybe<Scalars['timestamptz']>
  last_token_updated_at?: Maybe<Scalars['timestamptz']>
}

/** update columns of table "sync_status" */
export enum Sync_Status_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LastContractUpdatedAt = 'last_contract_updated_at',
  /** column name */
  LastMinterFilterUpdatedAt = 'last_minter_filter_updated_at',
  /** column name */
  LastMinterUpdatedAt = 'last_minter_updated_at',
  /** column name */
  LastProjectUpdatedAt = 'last_project_updated_at',
  /** column name */
  LastSecondaryUpdatedAt = 'last_secondary_updated_at',
  /** column name */
  LastTokenUpdatedAt = 'last_token_updated_at',
}

export type Sync_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Sync_Status_Set_Input>
  where: Sync_Status_Bool_Exp
}

/** columns and relationships of "tag_groupings" */
export type Tag_Groupings = {
  __typename?: 'tag_groupings'
  name: Scalars['String']
}

/** aggregated selection of "tag_groupings" */
export type Tag_Groupings_Aggregate = {
  __typename?: 'tag_groupings_aggregate'
  aggregate?: Maybe<Tag_Groupings_Aggregate_Fields>
  nodes: Array<Tag_Groupings>
}

/** aggregate fields of "tag_groupings" */
export type Tag_Groupings_Aggregate_Fields = {
  __typename?: 'tag_groupings_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Tag_Groupings_Max_Fields>
  min?: Maybe<Tag_Groupings_Min_Fields>
}

/** aggregate fields of "tag_groupings" */
export type Tag_Groupings_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tag_Groupings_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "tag_groupings". All fields are combined with a logical 'AND'. */
export type Tag_Groupings_Bool_Exp = {
  _and?: Maybe<Array<Tag_Groupings_Bool_Exp>>
  _not?: Maybe<Tag_Groupings_Bool_Exp>
  _or?: Maybe<Array<Tag_Groupings_Bool_Exp>>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "tag_groupings" */
export enum Tag_Groupings_Constraint {
  /** unique or primary key constraint on columns "name" */
  TagGroupingsPkey = 'tag_groupings_pkey',
}

export enum Tag_Groupings_Enum {
  Heritage = 'heritage',
  Presentation = 'presentation',
  Social = 'social',
  Unassigned = 'unassigned',
}

/** Boolean expression to compare columns of type "tag_groupings_enum". All fields are combined with logical 'AND'. */
export type Tag_Groupings_Enum_Comparison_Exp = {
  _eq?: Maybe<Tag_Groupings_Enum>
  _in?: Maybe<Array<Tag_Groupings_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Tag_Groupings_Enum>
  _nin?: Maybe<Array<Tag_Groupings_Enum>>
}

/** input type for inserting data into table "tag_groupings" */
export type Tag_Groupings_Insert_Input = {
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Tag_Groupings_Max_Fields = {
  __typename?: 'tag_groupings_max_fields'
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Tag_Groupings_Min_Fields = {
  __typename?: 'tag_groupings_min_fields'
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "tag_groupings" */
export type Tag_Groupings_Mutation_Response = {
  __typename?: 'tag_groupings_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Tag_Groupings>
}

/** on_conflict condition type for table "tag_groupings" */
export type Tag_Groupings_On_Conflict = {
  constraint: Tag_Groupings_Constraint
  update_columns?: Array<Tag_Groupings_Update_Column>
  where?: Maybe<Tag_Groupings_Bool_Exp>
}

/** Ordering options when selecting data from "tag_groupings". */
export type Tag_Groupings_Order_By = {
  name?: Maybe<Order_By>
}

/** primary key columns input for table: tag_groupings */
export type Tag_Groupings_Pk_Columns_Input = {
  name: Scalars['String']
}

/** select columns of table "tag_groupings" */
export enum Tag_Groupings_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "tag_groupings" */
export type Tag_Groupings_Set_Input = {
  name?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "tag_groupings" */
export type Tag_Groupings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tag_Groupings_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Tag_Groupings_Stream_Cursor_Value_Input = {
  name?: Maybe<Scalars['String']>
}

/** update columns of table "tag_groupings" */
export enum Tag_Groupings_Update_Column {
  /** column name */
  Name = 'name',
}

export type Tag_Groupings_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Tag_Groupings_Set_Input>
  where: Tag_Groupings_Bool_Exp
}

/** columns and relationships of "tag_status" */
export type Tag_Status = {
  __typename?: 'tag_status'
  description: Scalars['String']
  value: Scalars['String']
}

/** aggregated selection of "tag_status" */
export type Tag_Status_Aggregate = {
  __typename?: 'tag_status_aggregate'
  aggregate?: Maybe<Tag_Status_Aggregate_Fields>
  nodes: Array<Tag_Status>
}

/** aggregate fields of "tag_status" */
export type Tag_Status_Aggregate_Fields = {
  __typename?: 'tag_status_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Tag_Status_Max_Fields>
  min?: Maybe<Tag_Status_Min_Fields>
}

/** aggregate fields of "tag_status" */
export type Tag_Status_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tag_Status_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "tag_status". All fields are combined with a logical 'AND'. */
export type Tag_Status_Bool_Exp = {
  _and?: Maybe<Array<Tag_Status_Bool_Exp>>
  _not?: Maybe<Tag_Status_Bool_Exp>
  _or?: Maybe<Array<Tag_Status_Bool_Exp>>
  description?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "tag_status" */
export enum Tag_Status_Constraint {
  /** unique or primary key constraint on columns "value" */
  TagStatusEnumPkey = 'tag_status_enum_pkey',
}

export enum Tag_Status_Enum {
  /** private status */
  Private = 'private',
  /** public status */
  Public = 'public',
}

/** Boolean expression to compare columns of type "tag_status_enum". All fields are combined with logical 'AND'. */
export type Tag_Status_Enum_Comparison_Exp = {
  _eq?: Maybe<Tag_Status_Enum>
  _in?: Maybe<Array<Tag_Status_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Tag_Status_Enum>
  _nin?: Maybe<Array<Tag_Status_Enum>>
}

/** input type for inserting data into table "tag_status" */
export type Tag_Status_Insert_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Tag_Status_Max_Fields = {
  __typename?: 'tag_status_max_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Tag_Status_Min_Fields = {
  __typename?: 'tag_status_min_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "tag_status" */
export type Tag_Status_Mutation_Response = {
  __typename?: 'tag_status_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Tag_Status>
}

/** input type for inserting object relation for remote table "tag_status" */
export type Tag_Status_Obj_Rel_Insert_Input = {
  data: Tag_Status_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Tag_Status_On_Conflict>
}

/** on_conflict condition type for table "tag_status" */
export type Tag_Status_On_Conflict = {
  constraint: Tag_Status_Constraint
  update_columns?: Array<Tag_Status_Update_Column>
  where?: Maybe<Tag_Status_Bool_Exp>
}

/** Ordering options when selecting data from "tag_status". */
export type Tag_Status_Order_By = {
  description?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: tag_status */
export type Tag_Status_Pk_Columns_Input = {
  value: Scalars['String']
}

/** select columns of table "tag_status" */
export enum Tag_Status_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "tag_status" */
export type Tag_Status_Set_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "tag_status" */
export type Tag_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tag_Status_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Tag_Status_Stream_Cursor_Value_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** update columns of table "tag_status" */
export enum Tag_Status_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

export type Tag_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Tag_Status_Set_Input>
  where: Tag_Status_Bool_Exp
}

/** columns and relationships of "tag_types" */
export type Tag_Types = {
  __typename?: 'tag_types'
  description: Scalars['String']
  value: Scalars['String']
}

/** aggregated selection of "tag_types" */
export type Tag_Types_Aggregate = {
  __typename?: 'tag_types_aggregate'
  aggregate?: Maybe<Tag_Types_Aggregate_Fields>
  nodes: Array<Tag_Types>
}

/** aggregate fields of "tag_types" */
export type Tag_Types_Aggregate_Fields = {
  __typename?: 'tag_types_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Tag_Types_Max_Fields>
  min?: Maybe<Tag_Types_Min_Fields>
}

/** aggregate fields of "tag_types" */
export type Tag_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tag_Types_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "tag_types". All fields are combined with a logical 'AND'. */
export type Tag_Types_Bool_Exp = {
  _and?: Maybe<Array<Tag_Types_Bool_Exp>>
  _not?: Maybe<Tag_Types_Bool_Exp>
  _or?: Maybe<Array<Tag_Types_Bool_Exp>>
  description?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "tag_types" */
export enum Tag_Types_Constraint {
  /** unique or primary key constraint on columns "value" */
  TagTypesEnumPkey = 'tag_types_enum_pkey',
}

export enum Tag_Types_Enum {
  /** tag type of project */
  Project = 'project',
  /** tag type of user */
  User = 'user',
}

/** Boolean expression to compare columns of type "tag_types_enum". All fields are combined with logical 'AND'. */
export type Tag_Types_Enum_Comparison_Exp = {
  _eq?: Maybe<Tag_Types_Enum>
  _in?: Maybe<Array<Tag_Types_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Tag_Types_Enum>
  _nin?: Maybe<Array<Tag_Types_Enum>>
}

/** input type for inserting data into table "tag_types" */
export type Tag_Types_Insert_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Tag_Types_Max_Fields = {
  __typename?: 'tag_types_max_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Tag_Types_Min_Fields = {
  __typename?: 'tag_types_min_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "tag_types" */
export type Tag_Types_Mutation_Response = {
  __typename?: 'tag_types_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Tag_Types>
}

/** input type for inserting object relation for remote table "tag_types" */
export type Tag_Types_Obj_Rel_Insert_Input = {
  data: Tag_Types_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Tag_Types_On_Conflict>
}

/** on_conflict condition type for table "tag_types" */
export type Tag_Types_On_Conflict = {
  constraint: Tag_Types_Constraint
  update_columns?: Array<Tag_Types_Update_Column>
  where?: Maybe<Tag_Types_Bool_Exp>
}

/** Ordering options when selecting data from "tag_types". */
export type Tag_Types_Order_By = {
  description?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: tag_types */
export type Tag_Types_Pk_Columns_Input = {
  value: Scalars['String']
}

/** select columns of table "tag_types" */
export enum Tag_Types_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "tag_types" */
export type Tag_Types_Set_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "tag_types" */
export type Tag_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tag_Types_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Tag_Types_Stream_Cursor_Value_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** update columns of table "tag_types" */
export enum Tag_Types_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

export type Tag_Types_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Tag_Types_Set_Input>
  where: Tag_Types_Bool_Exp
}

/** columns and relationships of "tags" */
export type Tags = {
  __typename?: 'tags'
  description?: Maybe<Scalars['String']>
  display_name: Scalars['String']
  /** An array relationship */
  entity_tags: Array<Entity_Tags>
  /** An aggregate relationship */
  entity_tags_aggregate: Entity_Tags_Aggregate
  grouping_name: Tag_Groupings_Enum
  /** An object relationship */
  image?: Maybe<Media>
  media_id?: Maybe<Scalars['Int']>
  name: Scalars['String']
  status: Tag_Status_Enum
  /** An object relationship */
  status_enum: Tag_Status
  tagline?: Maybe<Scalars['String']>
  tier: Scalars['Int']
  type: Tag_Types_Enum
  /** An object relationship */
  type_enum: Tag_Types
}

/** columns and relationships of "tags" */
export type TagsEntity_TagsArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

/** columns and relationships of "tags" */
export type TagsEntity_Tags_AggregateArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

export type Tags_Aggregate = {
  __typename?: 'tags_aggregate'
  aggregate?: Maybe<Tags_Aggregate_Fields>
  nodes: Array<Tags>
}

/** aggregate fields of "tags" */
export type Tags_Aggregate_Fields = {
  __typename?: 'tags_aggregate_fields'
  avg?: Maybe<Tags_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Tags_Max_Fields>
  min?: Maybe<Tags_Min_Fields>
  stddev?: Maybe<Tags_Stddev_Fields>
  stddev_pop?: Maybe<Tags_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Tags_Stddev_Samp_Fields>
  sum?: Maybe<Tags_Sum_Fields>
  var_pop?: Maybe<Tags_Var_Pop_Fields>
  var_samp?: Maybe<Tags_Var_Samp_Fields>
  variance?: Maybe<Tags_Variance_Fields>
}

/** aggregate fields of "tags" */
export type Tags_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tags_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Tags_Avg_Fields = {
  __typename?: 'tags_avg_fields'
  media_id?: Maybe<Scalars['Float']>
  tier?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type Tags_Bool_Exp = {
  _and?: Maybe<Array<Tags_Bool_Exp>>
  _not?: Maybe<Tags_Bool_Exp>
  _or?: Maybe<Array<Tags_Bool_Exp>>
  description?: Maybe<String_Comparison_Exp>
  display_name?: Maybe<String_Comparison_Exp>
  entity_tags?: Maybe<Entity_Tags_Bool_Exp>
  grouping_name?: Maybe<Tag_Groupings_Enum_Comparison_Exp>
  image?: Maybe<Media_Bool_Exp>
  media_id?: Maybe<Int_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  status?: Maybe<Tag_Status_Enum_Comparison_Exp>
  status_enum?: Maybe<Tag_Status_Bool_Exp>
  tagline?: Maybe<String_Comparison_Exp>
  tier?: Maybe<Int_Comparison_Exp>
  type?: Maybe<Tag_Types_Enum_Comparison_Exp>
  type_enum?: Maybe<Tag_Types_Bool_Exp>
}

/** unique or primary key constraints on table "tags" */
export enum Tags_Constraint {
  /** unique or primary key constraint on columns "media_id" */
  TagsMediaIdKey = 'tags_media_id_key',
  /** unique or primary key constraint on columns "name" */
  TagsPkey = 'tags_pkey',
}

/** input type for incrementing numeric columns in table "tags" */
export type Tags_Inc_Input = {
  media_id?: Maybe<Scalars['Int']>
  tier?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "tags" */
export type Tags_Insert_Input = {
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  entity_tags?: Maybe<Entity_Tags_Arr_Rel_Insert_Input>
  grouping_name?: Maybe<Tag_Groupings_Enum>
  image?: Maybe<Media_Obj_Rel_Insert_Input>
  media_id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  status?: Maybe<Tag_Status_Enum>
  status_enum?: Maybe<Tag_Status_Obj_Rel_Insert_Input>
  tagline?: Maybe<Scalars['String']>
  tier?: Maybe<Scalars['Int']>
  type?: Maybe<Tag_Types_Enum>
  type_enum?: Maybe<Tag_Types_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Tags_Max_Fields = {
  __typename?: 'tags_max_fields'
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  media_id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  tagline?: Maybe<Scalars['String']>
  tier?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Tags_Min_Fields = {
  __typename?: 'tags_min_fields'
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  media_id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  tagline?: Maybe<Scalars['String']>
  tier?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "tags" */
export type Tags_Mutation_Response = {
  __typename?: 'tags_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Tags>
}

/** input type for inserting object relation for remote table "tags" */
export type Tags_Obj_Rel_Insert_Input = {
  data: Tags_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Tags_On_Conflict>
}

/** on_conflict condition type for table "tags" */
export type Tags_On_Conflict = {
  constraint: Tags_Constraint
  update_columns?: Array<Tags_Update_Column>
  where?: Maybe<Tags_Bool_Exp>
}

/** Ordering options when selecting data from "tags". */
export type Tags_Order_By = {
  description?: Maybe<Order_By>
  display_name?: Maybe<Order_By>
  entity_tags_aggregate?: Maybe<Entity_Tags_Aggregate_Order_By>
  grouping_name?: Maybe<Order_By>
  image?: Maybe<Media_Order_By>
  media_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  status?: Maybe<Order_By>
  status_enum?: Maybe<Tag_Status_Order_By>
  tagline?: Maybe<Order_By>
  tier?: Maybe<Order_By>
  type?: Maybe<Order_By>
  type_enum?: Maybe<Tag_Types_Order_By>
}

/** primary key columns input for table: tags */
export type Tags_Pk_Columns_Input = {
  name: Scalars['String']
}

/** select columns of table "tags" */
export enum Tags_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  GroupingName = 'grouping_name',
  /** column name */
  MediaId = 'media_id',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status',
  /** column name */
  Tagline = 'tagline',
  /** column name */
  Tier = 'tier',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "tags" */
export type Tags_Set_Input = {
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  grouping_name?: Maybe<Tag_Groupings_Enum>
  media_id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  status?: Maybe<Tag_Status_Enum>
  tagline?: Maybe<Scalars['String']>
  tier?: Maybe<Scalars['Int']>
  type?: Maybe<Tag_Types_Enum>
}

/** aggregate stddev on columns */
export type Tags_Stddev_Fields = {
  __typename?: 'tags_stddev_fields'
  media_id?: Maybe<Scalars['Float']>
  tier?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Tags_Stddev_Pop_Fields = {
  __typename?: 'tags_stddev_pop_fields'
  media_id?: Maybe<Scalars['Float']>
  tier?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Tags_Stddev_Samp_Fields = {
  __typename?: 'tags_stddev_samp_fields'
  media_id?: Maybe<Scalars['Float']>
  tier?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "tags" */
export type Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tags_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Tags_Stream_Cursor_Value_Input = {
  description?: Maybe<Scalars['String']>
  display_name?: Maybe<Scalars['String']>
  grouping_name?: Maybe<Tag_Groupings_Enum>
  media_id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  status?: Maybe<Tag_Status_Enum>
  tagline?: Maybe<Scalars['String']>
  tier?: Maybe<Scalars['Int']>
  type?: Maybe<Tag_Types_Enum>
}

/** aggregate sum on columns */
export type Tags_Sum_Fields = {
  __typename?: 'tags_sum_fields'
  media_id?: Maybe<Scalars['Int']>
  tier?: Maybe<Scalars['Int']>
}

/** update columns of table "tags" */
export enum Tags_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  GroupingName = 'grouping_name',
  /** column name */
  MediaId = 'media_id',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status',
  /** column name */
  Tagline = 'tagline',
  /** column name */
  Tier = 'tier',
  /** column name */
  Type = 'type',
}

export type Tags_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Tags_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Tags_Set_Input>
  where: Tags_Bool_Exp
}

/** aggregate var_pop on columns */
export type Tags_Var_Pop_Fields = {
  __typename?: 'tags_var_pop_fields'
  media_id?: Maybe<Scalars['Float']>
  tier?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Tags_Var_Samp_Fields = {
  __typename?: 'tags_var_samp_fields'
  media_id?: Maybe<Scalars['Float']>
  tier?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Tags_Variance_Fields = {
  __typename?: 'tags_variance_fields'
  media_id?: Maybe<Scalars['Float']>
  tier?: Maybe<Scalars['Float']>
}

/** columns and relationships of "terms_of_service" */
export type Terms_Of_Service = {
  __typename?: 'terms_of_service'
  content: Scalars['String']
  created_at: Scalars['timestamptz']
  id: Scalars['Int']
}

/** aggregated selection of "terms_of_service" */
export type Terms_Of_Service_Aggregate = {
  __typename?: 'terms_of_service_aggregate'
  aggregate?: Maybe<Terms_Of_Service_Aggregate_Fields>
  nodes: Array<Terms_Of_Service>
}

/** aggregate fields of "terms_of_service" */
export type Terms_Of_Service_Aggregate_Fields = {
  __typename?: 'terms_of_service_aggregate_fields'
  avg?: Maybe<Terms_Of_Service_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Terms_Of_Service_Max_Fields>
  min?: Maybe<Terms_Of_Service_Min_Fields>
  stddev?: Maybe<Terms_Of_Service_Stddev_Fields>
  stddev_pop?: Maybe<Terms_Of_Service_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Terms_Of_Service_Stddev_Samp_Fields>
  sum?: Maybe<Terms_Of_Service_Sum_Fields>
  var_pop?: Maybe<Terms_Of_Service_Var_Pop_Fields>
  var_samp?: Maybe<Terms_Of_Service_Var_Samp_Fields>
  variance?: Maybe<Terms_Of_Service_Variance_Fields>
}

/** aggregate fields of "terms_of_service" */
export type Terms_Of_Service_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Terms_Of_Service_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Terms_Of_Service_Avg_Fields = {
  __typename?: 'terms_of_service_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "terms_of_service". All fields are combined with a logical 'AND'. */
export type Terms_Of_Service_Bool_Exp = {
  _and?: Maybe<Array<Terms_Of_Service_Bool_Exp>>
  _not?: Maybe<Terms_Of_Service_Bool_Exp>
  _or?: Maybe<Array<Terms_Of_Service_Bool_Exp>>
  content?: Maybe<String_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "terms_of_service" */
export enum Terms_Of_Service_Constraint {
  /** unique or primary key constraint on columns "id" */
  TermsOfServicePkey = 'terms_of_service_pkey',
}

/** input type for incrementing numeric columns in table "terms_of_service" */
export type Terms_Of_Service_Inc_Input = {
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "terms_of_service" */
export type Terms_Of_Service_Insert_Input = {
  content?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Terms_Of_Service_Max_Fields = {
  __typename?: 'terms_of_service_max_fields'
  content?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
}

/** aggregate min on columns */
export type Terms_Of_Service_Min_Fields = {
  __typename?: 'terms_of_service_min_fields'
  content?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
}

/** response of any mutation on the table "terms_of_service" */
export type Terms_Of_Service_Mutation_Response = {
  __typename?: 'terms_of_service_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Terms_Of_Service>
}

/** on_conflict condition type for table "terms_of_service" */
export type Terms_Of_Service_On_Conflict = {
  constraint: Terms_Of_Service_Constraint
  update_columns?: Array<Terms_Of_Service_Update_Column>
  where?: Maybe<Terms_Of_Service_Bool_Exp>
}

/** Ordering options when selecting data from "terms_of_service". */
export type Terms_Of_Service_Order_By = {
  content?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** primary key columns input for table: terms_of_service */
export type Terms_Of_Service_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "terms_of_service" */
export enum Terms_Of_Service_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
}

/** input type for updating data in table "terms_of_service" */
export type Terms_Of_Service_Set_Input = {
  content?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Terms_Of_Service_Stddev_Fields = {
  __typename?: 'terms_of_service_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Terms_Of_Service_Stddev_Pop_Fields = {
  __typename?: 'terms_of_service_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Terms_Of_Service_Stddev_Samp_Fields = {
  __typename?: 'terms_of_service_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "terms_of_service" */
export type Terms_Of_Service_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Terms_Of_Service_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Terms_Of_Service_Stream_Cursor_Value_Input = {
  content?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
}

/** aggregate sum on columns */
export type Terms_Of_Service_Sum_Fields = {
  __typename?: 'terms_of_service_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "terms_of_service" */
export enum Terms_Of_Service_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
}

export type Terms_Of_Service_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Terms_Of_Service_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Terms_Of_Service_Set_Input>
  where: Terms_Of_Service_Bool_Exp
}

/** aggregate var_pop on columns */
export type Terms_Of_Service_Var_Pop_Fields = {
  __typename?: 'terms_of_service_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Terms_Of_Service_Var_Samp_Fields = {
  __typename?: 'terms_of_service_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Terms_Of_Service_Variance_Fields = {
  __typename?: 'terms_of_service_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>
  _gt?: Maybe<Scalars['timestamp']>
  _gte?: Maybe<Scalars['timestamp']>
  _in?: Maybe<Array<Scalars['timestamp']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['timestamp']>
  _lte?: Maybe<Scalars['timestamp']>
  _neq?: Maybe<Scalars['timestamp']>
  _nin?: Maybe<Array<Scalars['timestamp']>>
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>
  _gt?: Maybe<Scalars['timestamptz']>
  _gte?: Maybe<Scalars['timestamptz']>
  _in?: Maybe<Array<Scalars['timestamptz']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['timestamptz']>
  _lte?: Maybe<Scalars['timestamptz']>
  _neq?: Maybe<Scalars['timestamptz']>
  _nin?: Maybe<Array<Scalars['timestamptz']>>
}

/** columns and relationships of "tokens_metadata" */
export type Tokens_Metadata = {
  __typename?: 'tokens_metadata'
  /** An object relationship */
  contract?: Maybe<Contracts_Metadata>
  contract_address: Scalars['String']
  /** A computed field, executes function "token_favorited_by_user" */
  favorited_by_user?: Maybe<Scalars['Boolean']>
  /** An array relationship */
  favorites: Array<Favorites>
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate
  features: Scalars['jsonb']
  hash: Scalars['String']
  /** An object relationship */
  high_res_image?: Maybe<Media>
  high_res_image_id?: Maybe<Scalars['Int']>
  id: Scalars['String']
  /** An object relationship */
  image?: Maybe<Media>
  image_id?: Maybe<Scalars['Int']>
  invocation: Scalars['Int']
  isFlaggedAsSuspicious?: Maybe<Scalars['Boolean']>
  list_currency_address?: Maybe<Scalars['String']>
  list_currency_symbol?: Maybe<Scalars['String']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_expiration_date?: Maybe<Scalars['timestamptz']>
  list_platform?: Maybe<Scalars['String']>
  list_price?: Maybe<Scalars['float8']>
  list_url?: Maybe<Scalars['String']>
  /** A computed field, executes function "live_view_path" */
  live_view_path?: Maybe<Scalars['String']>
  /** A computed field, executes function "live_view_url" */
  live_view_url?: Maybe<Scalars['String']>
  /** An object relationship */
  low_res_image?: Maybe<Media>
  low_res_image_id?: Maybe<Scalars['Int']>
  mint_transaction_hash?: Maybe<Scalars['String']>
  minted_at: Scalars['timestamptz']
  /** An object relationship */
  owner?: Maybe<Users>
  owner_address: Scalars['String']
  /** An object relationship */
  project: Projects_Metadata
  project_id: Scalars['String']
  project_name?: Maybe<Scalars['String']>
  token?: Maybe<Token>
  token_id: Scalars['String']
  updated_at?: Maybe<Scalars['timestamp']>
}

/** columns and relationships of "tokens_metadata" */
export type Tokens_MetadataFavoritesArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

/** columns and relationships of "tokens_metadata" */
export type Tokens_MetadataFavorites_AggregateArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

/** columns and relationships of "tokens_metadata" */
export type Tokens_MetadataFeaturesArgs = {
  path?: Maybe<Scalars['String']>
}

/** columns and relationships of "tokens_metadata" */
export type Tokens_MetadataTokenArgs = {
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

/** aggregated selection of "tokens_metadata" */
export type Tokens_Metadata_Aggregate = {
  __typename?: 'tokens_metadata_aggregate'
  aggregate?: Maybe<Tokens_Metadata_Aggregate_Fields>
  nodes: Array<Tokens_Metadata>
}

/** aggregate fields of "tokens_metadata" */
export type Tokens_Metadata_Aggregate_Fields = {
  __typename?: 'tokens_metadata_aggregate_fields'
  avg?: Maybe<Tokens_Metadata_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Tokens_Metadata_Max_Fields>
  min?: Maybe<Tokens_Metadata_Min_Fields>
  stddev?: Maybe<Tokens_Metadata_Stddev_Fields>
  stddev_pop?: Maybe<Tokens_Metadata_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Tokens_Metadata_Stddev_Samp_Fields>
  sum?: Maybe<Tokens_Metadata_Sum_Fields>
  var_pop?: Maybe<Tokens_Metadata_Var_Pop_Fields>
  var_samp?: Maybe<Tokens_Metadata_Var_Samp_Fields>
  variance?: Maybe<Tokens_Metadata_Variance_Fields>
}

/** aggregate fields of "tokens_metadata" */
export type Tokens_Metadata_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tokens_Metadata_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "tokens_metadata" */
export type Tokens_Metadata_Aggregate_Order_By = {
  avg?: Maybe<Tokens_Metadata_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Tokens_Metadata_Max_Order_By>
  min?: Maybe<Tokens_Metadata_Min_Order_By>
  stddev?: Maybe<Tokens_Metadata_Stddev_Order_By>
  stddev_pop?: Maybe<Tokens_Metadata_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Tokens_Metadata_Stddev_Samp_Order_By>
  sum?: Maybe<Tokens_Metadata_Sum_Order_By>
  var_pop?: Maybe<Tokens_Metadata_Var_Pop_Order_By>
  var_samp?: Maybe<Tokens_Metadata_Var_Samp_Order_By>
  variance?: Maybe<Tokens_Metadata_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Tokens_Metadata_Append_Input = {
  features?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "tokens_metadata" */
export type Tokens_Metadata_Arr_Rel_Insert_Input = {
  data: Array<Tokens_Metadata_Insert_Input>
  /** upsert condition */
  on_conflict?: Maybe<Tokens_Metadata_On_Conflict>
}

/** aggregate avg on columns */
export type Tokens_Metadata_Avg_Fields = {
  __typename?: 'tokens_metadata_avg_fields'
  high_res_image_id?: Maybe<Scalars['Float']>
  image_id?: Maybe<Scalars['Float']>
  invocation?: Maybe<Scalars['Float']>
  list_eth_price?: Maybe<Scalars['Float']>
  list_price?: Maybe<Scalars['Float']>
  low_res_image_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Avg_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "tokens_metadata". All fields are combined with a logical 'AND'. */
export type Tokens_Metadata_Bool_Exp = {
  _and?: Maybe<Array<Tokens_Metadata_Bool_Exp>>
  _not?: Maybe<Tokens_Metadata_Bool_Exp>
  _or?: Maybe<Array<Tokens_Metadata_Bool_Exp>>
  contract?: Maybe<Contracts_Metadata_Bool_Exp>
  contract_address?: Maybe<String_Comparison_Exp>
  favorited_by_user?: Maybe<Boolean_Comparison_Exp>
  favorites?: Maybe<Favorites_Bool_Exp>
  features?: Maybe<Jsonb_Comparison_Exp>
  hash?: Maybe<String_Comparison_Exp>
  high_res_image?: Maybe<Media_Bool_Exp>
  high_res_image_id?: Maybe<Int_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  image?: Maybe<Media_Bool_Exp>
  image_id?: Maybe<Int_Comparison_Exp>
  invocation?: Maybe<Int_Comparison_Exp>
  list_currency_address?: Maybe<String_Comparison_Exp>
  list_currency_symbol?: Maybe<String_Comparison_Exp>
  list_eth_price?: Maybe<Float8_Comparison_Exp>
  list_expiration_date?: Maybe<Timestamptz_Comparison_Exp>
  list_platform?: Maybe<String_Comparison_Exp>
  list_price?: Maybe<Float8_Comparison_Exp>
  list_url?: Maybe<String_Comparison_Exp>
  live_view_path?: Maybe<String_Comparison_Exp>
  live_view_url?: Maybe<String_Comparison_Exp>
  low_res_image?: Maybe<Media_Bool_Exp>
  low_res_image_id?: Maybe<Int_Comparison_Exp>
  mint_transaction_hash?: Maybe<String_Comparison_Exp>
  minted_at?: Maybe<Timestamptz_Comparison_Exp>
  owner?: Maybe<Users_Bool_Exp>
  owner_address?: Maybe<String_Comparison_Exp>
  project?: Maybe<Projects_Metadata_Bool_Exp>
  project_id?: Maybe<String_Comparison_Exp>
  project_name?: Maybe<String_Comparison_Exp>
  token_id?: Maybe<String_Comparison_Exp>
  updated_at?: Maybe<Timestamp_Comparison_Exp>
}

/** unique or primary key constraints on table "tokens_metadata" */
export enum Tokens_Metadata_Constraint {
  /** unique or primary key constraint on columns "id" */
  TokensMetadataPkey = 'tokens_metadata_pkey',
  /** unique or primary key constraint on columns "token_id", "contract_address" */
  TokensMetadataTokenIdContractAddressKey = 'tokens_metadata_token_id_contract_address_key',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Tokens_Metadata_Delete_At_Path_Input = {
  features?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Tokens_Metadata_Delete_Elem_Input = {
  features?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Tokens_Metadata_Delete_Key_Input = {
  features?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "tokens_metadata" */
export type Tokens_Metadata_Inc_Input = {
  high_res_image_id?: Maybe<Scalars['Int']>
  image_id?: Maybe<Scalars['Int']>
  invocation?: Maybe<Scalars['Int']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_price?: Maybe<Scalars['float8']>
  low_res_image_id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "tokens_metadata" */
export type Tokens_Metadata_Insert_Input = {
  contract?: Maybe<Contracts_Metadata_Obj_Rel_Insert_Input>
  contract_address?: Maybe<Scalars['String']>
  favorites?: Maybe<Favorites_Arr_Rel_Insert_Input>
  features?: Maybe<Scalars['jsonb']>
  hash?: Maybe<Scalars['String']>
  high_res_image?: Maybe<Media_Obj_Rel_Insert_Input>
  high_res_image_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<Media_Obj_Rel_Insert_Input>
  image_id?: Maybe<Scalars['Int']>
  invocation?: Maybe<Scalars['Int']>
  list_currency_address?: Maybe<Scalars['String']>
  list_currency_symbol?: Maybe<Scalars['String']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_expiration_date?: Maybe<Scalars['timestamptz']>
  list_platform?: Maybe<Scalars['String']>
  list_price?: Maybe<Scalars['float8']>
  list_url?: Maybe<Scalars['String']>
  low_res_image?: Maybe<Media_Obj_Rel_Insert_Input>
  low_res_image_id?: Maybe<Scalars['Int']>
  mint_transaction_hash?: Maybe<Scalars['String']>
  minted_at?: Maybe<Scalars['timestamptz']>
  owner?: Maybe<Users_Obj_Rel_Insert_Input>
  owner_address?: Maybe<Scalars['String']>
  project?: Maybe<Projects_Metadata_Obj_Rel_Insert_Input>
  project_id?: Maybe<Scalars['String']>
  project_name?: Maybe<Scalars['String']>
  token_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** aggregate max on columns */
export type Tokens_Metadata_Max_Fields = {
  __typename?: 'tokens_metadata_max_fields'
  contract_address?: Maybe<Scalars['String']>
  hash?: Maybe<Scalars['String']>
  high_res_image_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  image_id?: Maybe<Scalars['Int']>
  invocation?: Maybe<Scalars['Int']>
  list_currency_address?: Maybe<Scalars['String']>
  list_currency_symbol?: Maybe<Scalars['String']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_expiration_date?: Maybe<Scalars['timestamptz']>
  list_platform?: Maybe<Scalars['String']>
  list_price?: Maybe<Scalars['float8']>
  list_url?: Maybe<Scalars['String']>
  low_res_image_id?: Maybe<Scalars['Int']>
  mint_transaction_hash?: Maybe<Scalars['String']>
  minted_at?: Maybe<Scalars['timestamptz']>
  owner_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  project_name?: Maybe<Scalars['String']>
  token_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** order by max() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Max_Order_By = {
  contract_address?: Maybe<Order_By>
  hash?: Maybe<Order_By>
  high_res_image_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_currency_address?: Maybe<Order_By>
  list_currency_symbol?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_expiration_date?: Maybe<Order_By>
  list_platform?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  list_url?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
  mint_transaction_hash?: Maybe<Order_By>
  minted_at?: Maybe<Order_By>
  owner_address?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  project_name?: Maybe<Order_By>
  token_id?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Tokens_Metadata_Min_Fields = {
  __typename?: 'tokens_metadata_min_fields'
  contract_address?: Maybe<Scalars['String']>
  hash?: Maybe<Scalars['String']>
  high_res_image_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  image_id?: Maybe<Scalars['Int']>
  invocation?: Maybe<Scalars['Int']>
  list_currency_address?: Maybe<Scalars['String']>
  list_currency_symbol?: Maybe<Scalars['String']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_expiration_date?: Maybe<Scalars['timestamptz']>
  list_platform?: Maybe<Scalars['String']>
  list_price?: Maybe<Scalars['float8']>
  list_url?: Maybe<Scalars['String']>
  low_res_image_id?: Maybe<Scalars['Int']>
  mint_transaction_hash?: Maybe<Scalars['String']>
  minted_at?: Maybe<Scalars['timestamptz']>
  owner_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  project_name?: Maybe<Scalars['String']>
  token_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** order by min() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Min_Order_By = {
  contract_address?: Maybe<Order_By>
  hash?: Maybe<Order_By>
  high_res_image_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_currency_address?: Maybe<Order_By>
  list_currency_symbol?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_expiration_date?: Maybe<Order_By>
  list_platform?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  list_url?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
  mint_transaction_hash?: Maybe<Order_By>
  minted_at?: Maybe<Order_By>
  owner_address?: Maybe<Order_By>
  project_id?: Maybe<Order_By>
  project_name?: Maybe<Order_By>
  token_id?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** response of any mutation on the table "tokens_metadata" */
export type Tokens_Metadata_Mutation_Response = {
  __typename?: 'tokens_metadata_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Tokens_Metadata>
}

/** input type for inserting object relation for remote table "tokens_metadata" */
export type Tokens_Metadata_Obj_Rel_Insert_Input = {
  data: Tokens_Metadata_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Tokens_Metadata_On_Conflict>
}

/** on_conflict condition type for table "tokens_metadata" */
export type Tokens_Metadata_On_Conflict = {
  constraint: Tokens_Metadata_Constraint
  update_columns?: Array<Tokens_Metadata_Update_Column>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

/** Ordering options when selecting data from "tokens_metadata". */
export type Tokens_Metadata_Order_By = {
  contract?: Maybe<Contracts_Metadata_Order_By>
  contract_address?: Maybe<Order_By>
  favorited_by_user?: Maybe<Order_By>
  favorites_aggregate?: Maybe<Favorites_Aggregate_Order_By>
  features?: Maybe<Order_By>
  hash?: Maybe<Order_By>
  high_res_image?: Maybe<Media_Order_By>
  high_res_image_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  image?: Maybe<Media_Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_currency_address?: Maybe<Order_By>
  list_currency_symbol?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_expiration_date?: Maybe<Order_By>
  list_platform?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  list_url?: Maybe<Order_By>
  live_view_path?: Maybe<Order_By>
  live_view_url?: Maybe<Order_By>
  low_res_image?: Maybe<Media_Order_By>
  low_res_image_id?: Maybe<Order_By>
  mint_transaction_hash?: Maybe<Order_By>
  minted_at?: Maybe<Order_By>
  owner?: Maybe<Users_Order_By>
  owner_address?: Maybe<Order_By>
  project?: Maybe<Projects_Metadata_Order_By>
  project_id?: Maybe<Order_By>
  project_name?: Maybe<Order_By>
  token_id?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** primary key columns input for table: tokens_metadata */
export type Tokens_Metadata_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Tokens_Metadata_Prepend_Input = {
  features?: Maybe<Scalars['jsonb']>
}

/** select columns of table "tokens_metadata" */
export enum Tokens_Metadata_Select_Column {
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  Features = 'features',
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
}

/** input type for updating data in table "tokens_metadata" */
export type Tokens_Metadata_Set_Input = {
  contract_address?: Maybe<Scalars['String']>
  features?: Maybe<Scalars['jsonb']>
  hash?: Maybe<Scalars['String']>
  high_res_image_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  image_id?: Maybe<Scalars['Int']>
  invocation?: Maybe<Scalars['Int']>
  list_currency_address?: Maybe<Scalars['String']>
  list_currency_symbol?: Maybe<Scalars['String']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_expiration_date?: Maybe<Scalars['timestamptz']>
  list_platform?: Maybe<Scalars['String']>
  list_price?: Maybe<Scalars['float8']>
  list_url?: Maybe<Scalars['String']>
  low_res_image_id?: Maybe<Scalars['Int']>
  mint_transaction_hash?: Maybe<Scalars['String']>
  minted_at?: Maybe<Scalars['timestamptz']>
  owner_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  project_name?: Maybe<Scalars['String']>
  token_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** aggregate stddev on columns */
export type Tokens_Metadata_Stddev_Fields = {
  __typename?: 'tokens_metadata_stddev_fields'
  high_res_image_id?: Maybe<Scalars['Float']>
  image_id?: Maybe<Scalars['Float']>
  invocation?: Maybe<Scalars['Float']>
  list_eth_price?: Maybe<Scalars['Float']>
  list_price?: Maybe<Scalars['Float']>
  low_res_image_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Stddev_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Tokens_Metadata_Stddev_Pop_Fields = {
  __typename?: 'tokens_metadata_stddev_pop_fields'
  high_res_image_id?: Maybe<Scalars['Float']>
  image_id?: Maybe<Scalars['Float']>
  invocation?: Maybe<Scalars['Float']>
  list_eth_price?: Maybe<Scalars['Float']>
  list_price?: Maybe<Scalars['Float']>
  low_res_image_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Stddev_Pop_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Tokens_Metadata_Stddev_Samp_Fields = {
  __typename?: 'tokens_metadata_stddev_samp_fields'
  high_res_image_id?: Maybe<Scalars['Float']>
  image_id?: Maybe<Scalars['Float']>
  invocation?: Maybe<Scalars['Float']>
  list_eth_price?: Maybe<Scalars['Float']>
  list_price?: Maybe<Scalars['Float']>
  low_res_image_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Stddev_Samp_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** Streaming cursor of the table "tokens_metadata" */
export type Tokens_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tokens_Metadata_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Tokens_Metadata_Stream_Cursor_Value_Input = {
  contract_address?: Maybe<Scalars['String']>
  features?: Maybe<Scalars['jsonb']>
  hash?: Maybe<Scalars['String']>
  high_res_image_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  image_id?: Maybe<Scalars['Int']>
  invocation?: Maybe<Scalars['Int']>
  list_currency_address?: Maybe<Scalars['String']>
  list_currency_symbol?: Maybe<Scalars['String']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_expiration_date?: Maybe<Scalars['timestamptz']>
  list_platform?: Maybe<Scalars['String']>
  list_price?: Maybe<Scalars['float8']>
  list_url?: Maybe<Scalars['String']>
  low_res_image_id?: Maybe<Scalars['Int']>
  mint_transaction_hash?: Maybe<Scalars['String']>
  minted_at?: Maybe<Scalars['timestamptz']>
  owner_address?: Maybe<Scalars['String']>
  project_id?: Maybe<Scalars['String']>
  project_name?: Maybe<Scalars['String']>
  token_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamp']>
}

/** aggregate sum on columns */
export type Tokens_Metadata_Sum_Fields = {
  __typename?: 'tokens_metadata_sum_fields'
  high_res_image_id?: Maybe<Scalars['Int']>
  image_id?: Maybe<Scalars['Int']>
  invocation?: Maybe<Scalars['Int']>
  list_eth_price?: Maybe<Scalars['float8']>
  list_price?: Maybe<Scalars['float8']>
  low_res_image_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Sum_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** update columns of table "tokens_metadata" */
export enum Tokens_Metadata_Update_Column {
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  Features = 'features',
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
}

export type Tokens_Metadata_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Tokens_Metadata_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Tokens_Metadata_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Tokens_Metadata_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Tokens_Metadata_Delete_Key_Input>
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Tokens_Metadata_Inc_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Tokens_Metadata_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Tokens_Metadata_Set_Input>
  where: Tokens_Metadata_Bool_Exp
}

/** aggregate var_pop on columns */
export type Tokens_Metadata_Var_Pop_Fields = {
  __typename?: 'tokens_metadata_var_pop_fields'
  high_res_image_id?: Maybe<Scalars['Float']>
  image_id?: Maybe<Scalars['Float']>
  invocation?: Maybe<Scalars['Float']>
  list_eth_price?: Maybe<Scalars['Float']>
  list_price?: Maybe<Scalars['Float']>
  low_res_image_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Var_Pop_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Tokens_Metadata_Var_Samp_Fields = {
  __typename?: 'tokens_metadata_var_samp_fields'
  high_res_image_id?: Maybe<Scalars['Float']>
  image_id?: Maybe<Scalars['Float']>
  invocation?: Maybe<Scalars['Float']>
  list_eth_price?: Maybe<Scalars['Float']>
  list_price?: Maybe<Scalars['Float']>
  low_res_image_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Var_Samp_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Tokens_Metadata_Variance_Fields = {
  __typename?: 'tokens_metadata_variance_fields'
  high_res_image_id?: Maybe<Scalars['Float']>
  image_id?: Maybe<Scalars['Float']>
  invocation?: Maybe<Scalars['Float']>
  list_eth_price?: Maybe<Scalars['Float']>
  list_price?: Maybe<Scalars['Float']>
  low_res_image_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "tokens_metadata" */
export type Tokens_Metadata_Variance_Order_By = {
  high_res_image_id?: Maybe<Order_By>
  image_id?: Maybe<Order_By>
  invocation?: Maybe<Order_By>
  list_eth_price?: Maybe<Order_By>
  list_price?: Maybe<Order_By>
  low_res_image_id?: Maybe<Order_By>
}

/** columns and relationships of "user_profiles" */
export type User_Profiles = {
  __typename?: 'user_profiles'
  bio?: Maybe<Scalars['String']>
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  /** An object relationship */
  profile_picture?: Maybe<Media>
  profile_picture_id?: Maybe<Scalars['Int']>
  user_address: Scalars['String']
  username?: Maybe<Scalars['String']>
}

export type User_Profiles_Aggregate = {
  __typename?: 'user_profiles_aggregate'
  aggregate?: Maybe<User_Profiles_Aggregate_Fields>
  nodes: Array<User_Profiles>
}

/** aggregate fields of "user_profiles" */
export type User_Profiles_Aggregate_Fields = {
  __typename?: 'user_profiles_aggregate_fields'
  avg?: Maybe<User_Profiles_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<User_Profiles_Max_Fields>
  min?: Maybe<User_Profiles_Min_Fields>
  stddev?: Maybe<User_Profiles_Stddev_Fields>
  stddev_pop?: Maybe<User_Profiles_Stddev_Pop_Fields>
  stddev_samp?: Maybe<User_Profiles_Stddev_Samp_Fields>
  sum?: Maybe<User_Profiles_Sum_Fields>
  var_pop?: Maybe<User_Profiles_Var_Pop_Fields>
  var_samp?: Maybe<User_Profiles_Var_Samp_Fields>
  variance?: Maybe<User_Profiles_Variance_Fields>
}

/** aggregate fields of "user_profiles" */
export type User_Profiles_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Profiles_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type User_Profiles_Avg_Fields = {
  __typename?: 'user_profiles_avg_fields'
  id?: Maybe<Scalars['Float']>
  profile_picture_id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "user_profiles". All fields are combined with a logical 'AND'. */
export type User_Profiles_Bool_Exp = {
  _and?: Maybe<Array<User_Profiles_Bool_Exp>>
  _not?: Maybe<User_Profiles_Bool_Exp>
  _or?: Maybe<Array<User_Profiles_Bool_Exp>>
  bio?: Maybe<String_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  profile_picture?: Maybe<Media_Bool_Exp>
  profile_picture_id?: Maybe<Int_Comparison_Exp>
  user_address?: Maybe<String_Comparison_Exp>
  username?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "user_profiles" */
export enum User_Profiles_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserProfilesPkey = 'user_profiles_pkey',
  /** unique or primary key constraint on columns "user_address" */
  UserProfilesUserAddressKey = 'user_profiles_user_address_key',
  /** unique or primary key constraint on columns "username" */
  UserProfilesUsernameKey = 'user_profiles_username_key',
}

/** input type for incrementing numeric columns in table "user_profiles" */
export type User_Profiles_Inc_Input = {
  id?: Maybe<Scalars['Int']>
  profile_picture_id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "user_profiles" */
export type User_Profiles_Insert_Input = {
  bio?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  profile_picture?: Maybe<Media_Obj_Rel_Insert_Input>
  profile_picture_id?: Maybe<Scalars['Int']>
  user_address?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type User_Profiles_Max_Fields = {
  __typename?: 'user_profiles_max_fields'
  bio?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  profile_picture_id?: Maybe<Scalars['Int']>
  user_address?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type User_Profiles_Min_Fields = {
  __typename?: 'user_profiles_min_fields'
  bio?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  profile_picture_id?: Maybe<Scalars['Int']>
  user_address?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "user_profiles" */
export type User_Profiles_Mutation_Response = {
  __typename?: 'user_profiles_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<User_Profiles>
}

/** input type for inserting object relation for remote table "user_profiles" */
export type User_Profiles_Obj_Rel_Insert_Input = {
  data: User_Profiles_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<User_Profiles_On_Conflict>
}

/** on_conflict condition type for table "user_profiles" */
export type User_Profiles_On_Conflict = {
  constraint: User_Profiles_Constraint
  update_columns?: Array<User_Profiles_Update_Column>
  where?: Maybe<User_Profiles_Bool_Exp>
}

/** Ordering options when selecting data from "user_profiles". */
export type User_Profiles_Order_By = {
  bio?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  profile_picture?: Maybe<Media_Order_By>
  profile_picture_id?: Maybe<Order_By>
  user_address?: Maybe<Order_By>
  username?: Maybe<Order_By>
}

/** primary key columns input for table: user_profiles */
export type User_Profiles_Pk_Columns_Input = {
  id: Scalars['Int']
}

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
  Username = 'username',
}

/** input type for updating data in table "user_profiles" */
export type User_Profiles_Set_Input = {
  bio?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  profile_picture_id?: Maybe<Scalars['Int']>
  user_address?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type User_Profiles_Stddev_Fields = {
  __typename?: 'user_profiles_stddev_fields'
  id?: Maybe<Scalars['Float']>
  profile_picture_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type User_Profiles_Stddev_Pop_Fields = {
  __typename?: 'user_profiles_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
  profile_picture_id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type User_Profiles_Stddev_Samp_Fields = {
  __typename?: 'user_profiles_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
  profile_picture_id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "user_profiles" */
export type User_Profiles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Profiles_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type User_Profiles_Stream_Cursor_Value_Input = {
  bio?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  profile_picture_id?: Maybe<Scalars['Int']>
  user_address?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

/** aggregate sum on columns */
export type User_Profiles_Sum_Fields = {
  __typename?: 'user_profiles_sum_fields'
  id?: Maybe<Scalars['Int']>
  profile_picture_id?: Maybe<Scalars['Int']>
}

/** update columns of table "user_profiles" */
export enum User_Profiles_Update_Column {
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
  Username = 'username',
}

export type User_Profiles_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<User_Profiles_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<User_Profiles_Set_Input>
  where: User_Profiles_Bool_Exp
}

/** aggregate var_pop on columns */
export type User_Profiles_Var_Pop_Fields = {
  __typename?: 'user_profiles_var_pop_fields'
  id?: Maybe<Scalars['Float']>
  profile_picture_id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type User_Profiles_Var_Samp_Fields = {
  __typename?: 'user_profiles_var_samp_fields'
  id?: Maybe<Scalars['Float']>
  profile_picture_id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type User_Profiles_Variance_Fields = {
  __typename?: 'user_profiles_variance_fields'
  id?: Maybe<Scalars['Float']>
  profile_picture_id?: Maybe<Scalars['Float']>
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  account?: Maybe<Account>
  /** An array relationship */
  allowlisted_on: Array<Contract_Allowlistings>
  /** An aggregate relationship */
  allowlisted_on_aggregate: Contract_Allowlistings_Aggregate
  created_at: Scalars['timestamptz']
  /** A computed field, executes function "user_display_name" */
  display_name?: Maybe<Scalars['String']>
  favorited_by_user?: Maybe<Scalars['Boolean']>
  /** An array relationship */
  favorites: Array<Favorites>
  /** An aggregate relationship */
  favorites_aggregate: Favorites_Aggregate
  /** A computed field, executes function "user_feature_flags" */
  feature_flags?: Maybe<Scalars['jsonb']>
  is_ab_staff?: Maybe<Scalars['Boolean']>
  /** A computed field, executes function "user_is_curated" */
  is_curated?: Maybe<Scalars['Boolean']>
  is_curator?: Maybe<Scalars['Boolean']>
  /** A computed field, executes function "generate_nonce" */
  nonce?: Maybe<Scalars['String']>
  nonce_offset: Scalars['Int']
  /** An array relationship */
  notifications: Array<Notifications>
  /** An aggregate relationship */
  notifications_aggregate: Notifications_Aggregate
  /** An object relationship */
  profile?: Maybe<User_Profiles>
  /** An array relationship */
  projects_created: Array<Projects_Metadata>
  /** An aggregate relationship */
  projects_created_aggregate: Projects_Metadata_Aggregate
  public_address: Scalars['String']
  /** An array relationship */
  tags: Array<Entity_Tags>
  /** An aggregate relationship */
  tags_aggregate: Entity_Tags_Aggregate
  /** An array relationship */
  tokens: Array<Tokens_Metadata>
  /** An aggregate relationship */
  tokens_aggregate: Tokens_Metadata_Aggregate
  tos_accepted_at?: Maybe<Scalars['timestamptz']>
  viewed_warning_banner?: Maybe<Scalars['Boolean']>
  /** An object relationship */
  webflow_artist_info?: Maybe<Webflow_Artist_Info>
}

/** columns and relationships of "users" */
export type UsersAccountArgs = {
  block?: Maybe<Block_Height>
  subgraphError?: _SubgraphErrorPolicy_
}

/** columns and relationships of "users" */
export type UsersAllowlisted_OnArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersAllowlisted_On_AggregateArgs = {
  distinct_on?: Maybe<Array<Contract_Allowlistings_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Contract_Allowlistings_Order_By>>
  where?: Maybe<Contract_Allowlistings_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersFavoritesArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersFavorites_AggregateArgs = {
  distinct_on?: Maybe<Array<Favorites_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Favorites_Order_By>>
  where?: Maybe<Favorites_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersFeature_FlagsArgs = {
  path?: Maybe<Scalars['String']>
}

/** columns and relationships of "users" */
export type UsersNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Notifications_Order_By>>
  where?: Maybe<Notifications_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Notifications_Order_By>>
  where?: Maybe<Notifications_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersProjects_CreatedArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersProjects_Created_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Projects_Metadata_Order_By>>
  where?: Maybe<Projects_Metadata_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersTagsArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersTags_AggregateArgs = {
  distinct_on?: Maybe<Array<Entity_Tags_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Entity_Tags_Order_By>>
  where?: Maybe<Entity_Tags_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersTokensArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersTokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Metadata_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tokens_Metadata_Order_By>>
  where?: Maybe<Tokens_Metadata_Bool_Exp>
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate'
  aggregate?: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields'
  avg?: Maybe<Users_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Users_Max_Fields>
  min?: Maybe<Users_Min_Fields>
  stddev?: Maybe<Users_Stddev_Fields>
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>
  sum?: Maybe<Users_Sum_Fields>
  var_pop?: Maybe<Users_Var_Pop_Fields>
  var_samp?: Maybe<Users_Var_Samp_Fields>
  variance?: Maybe<Users_Variance_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields'
  nonce_offset?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>
  _not?: Maybe<Users_Bool_Exp>
  _or?: Maybe<Array<Users_Bool_Exp>>
  allowlisted_on?: Maybe<Contract_Allowlistings_Bool_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  display_name?: Maybe<String_Comparison_Exp>
  favorited_by_user?: Maybe<Boolean_Comparison_Exp>
  favorites?: Maybe<Favorites_Bool_Exp>
  feature_flags?: Maybe<Jsonb_Comparison_Exp>
  is_ab_staff?: Maybe<Boolean_Comparison_Exp>
  is_curated?: Maybe<Boolean_Comparison_Exp>
  is_curator?: Maybe<Boolean_Comparison_Exp>
  nonce?: Maybe<String_Comparison_Exp>
  nonce_offset?: Maybe<Int_Comparison_Exp>
  notifications?: Maybe<Notifications_Bool_Exp>
  profile?: Maybe<User_Profiles_Bool_Exp>
  projects_created?: Maybe<Projects_Metadata_Bool_Exp>
  public_address?: Maybe<String_Comparison_Exp>
  tags?: Maybe<Entity_Tags_Bool_Exp>
  tokens?: Maybe<Tokens_Metadata_Bool_Exp>
  tos_accepted_at?: Maybe<Timestamptz_Comparison_Exp>
  viewed_warning_banner?: Maybe<Boolean_Comparison_Exp>
  webflow_artist_info?: Maybe<Webflow_Artist_Info_Bool_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "public_address" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "public_address" */
  UsersPublicAddressKey = 'users_public_address_key',
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  nonce_offset?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  allowlisted_on?: Maybe<Contract_Allowlistings_Arr_Rel_Insert_Input>
  created_at?: Maybe<Scalars['timestamptz']>
  favorites?: Maybe<Favorites_Arr_Rel_Insert_Input>
  is_ab_staff?: Maybe<Scalars['Boolean']>
  is_curator?: Maybe<Scalars['Boolean']>
  nonce_offset?: Maybe<Scalars['Int']>
  notifications?: Maybe<Notifications_Arr_Rel_Insert_Input>
  profile?: Maybe<User_Profiles_Obj_Rel_Insert_Input>
  projects_created?: Maybe<Projects_Metadata_Arr_Rel_Insert_Input>
  public_address?: Maybe<Scalars['String']>
  tags?: Maybe<Entity_Tags_Arr_Rel_Insert_Input>
  tokens?: Maybe<Tokens_Metadata_Arr_Rel_Insert_Input>
  tos_accepted_at?: Maybe<Scalars['timestamptz']>
  viewed_warning_banner?: Maybe<Scalars['Boolean']>
  webflow_artist_info?: Maybe<Webflow_Artist_Info_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  nonce_offset?: Maybe<Scalars['Int']>
  public_address?: Maybe<Scalars['String']>
  tos_accepted_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  nonce_offset?: Maybe<Scalars['Int']>
  public_address?: Maybe<Scalars['String']>
  tos_accepted_at?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Users_On_Conflict>
}

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns?: Array<Users_Update_Column>
  where?: Maybe<Users_Bool_Exp>
}

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  allowlisted_on_aggregate?: Maybe<Contract_Allowlistings_Aggregate_Order_By>
  created_at?: Maybe<Order_By>
  display_name?: Maybe<Order_By>
  favorited_by_user?: Maybe<Order_By>
  favorites_aggregate?: Maybe<Favorites_Aggregate_Order_By>
  feature_flags?: Maybe<Order_By>
  is_ab_staff?: Maybe<Order_By>
  is_curated?: Maybe<Order_By>
  is_curator?: Maybe<Order_By>
  nonce?: Maybe<Order_By>
  nonce_offset?: Maybe<Order_By>
  notifications_aggregate?: Maybe<Notifications_Aggregate_Order_By>
  profile?: Maybe<User_Profiles_Order_By>
  projects_created_aggregate?: Maybe<Projects_Metadata_Aggregate_Order_By>
  public_address?: Maybe<Order_By>
  tags_aggregate?: Maybe<Entity_Tags_Aggregate_Order_By>
  tokens_aggregate?: Maybe<Tokens_Metadata_Aggregate_Order_By>
  tos_accepted_at?: Maybe<Order_By>
  viewed_warning_banner?: Maybe<Order_By>
  webflow_artist_info?: Maybe<Webflow_Artist_Info_Order_By>
}

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  public_address: Scalars['String']
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsAbStaff = 'is_ab_staff',
  /** column name */
  IsCurator = 'is_curator',
  /** column name */
  NonceOffset = 'nonce_offset',
  /** column name */
  PublicAddress = 'public_address',
  /** column name */
  TosAcceptedAt = 'tos_accepted_at',
  /** column name */
  ViewedWarningBanner = 'viewed_warning_banner',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>
  is_ab_staff?: Maybe<Scalars['Boolean']>
  is_curator?: Maybe<Scalars['Boolean']>
  nonce_offset?: Maybe<Scalars['Int']>
  public_address?: Maybe<Scalars['String']>
  tos_accepted_at?: Maybe<Scalars['timestamptz']>
  viewed_warning_banner?: Maybe<Scalars['Boolean']>
}

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields'
  nonce_offset?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields'
  nonce_offset?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields'
  nonce_offset?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: Maybe<Scalars['timestamptz']>
  is_ab_staff?: Maybe<Scalars['Boolean']>
  is_curator?: Maybe<Scalars['Boolean']>
  nonce_offset?: Maybe<Scalars['Int']>
  public_address?: Maybe<Scalars['String']>
  tos_accepted_at?: Maybe<Scalars['timestamptz']>
  viewed_warning_banner?: Maybe<Scalars['Boolean']>
}

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields'
  nonce_offset?: Maybe<Scalars['Int']>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsAbStaff = 'is_ab_staff',
  /** column name */
  IsCurator = 'is_curator',
  /** column name */
  NonceOffset = 'nonce_offset',
  /** column name */
  PublicAddress = 'public_address',
  /** column name */
  TosAcceptedAt = 'tos_accepted_at',
  /** column name */
  ViewedWarningBanner = 'viewed_warning_banner',
}

export type Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: Maybe<Users_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields'
  nonce_offset?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields'
  nonce_offset?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields'
  nonce_offset?: Maybe<Scalars['Float']>
}

/** vertical enums */
export type Verticals = {
  __typename?: 'verticals'
  name: Scalars['String']
  /** An object relationship */
  project_vertical?: Maybe<Project_Verticals>
}

/** aggregated selection of "verticals" */
export type Verticals_Aggregate = {
  __typename?: 'verticals_aggregate'
  aggregate?: Maybe<Verticals_Aggregate_Fields>
  nodes: Array<Verticals>
}

/** aggregate fields of "verticals" */
export type Verticals_Aggregate_Fields = {
  __typename?: 'verticals_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Verticals_Max_Fields>
  min?: Maybe<Verticals_Min_Fields>
}

/** aggregate fields of "verticals" */
export type Verticals_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Verticals_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "verticals". All fields are combined with a logical 'AND'. */
export type Verticals_Bool_Exp = {
  _and?: Maybe<Array<Verticals_Bool_Exp>>
  _not?: Maybe<Verticals_Bool_Exp>
  _or?: Maybe<Array<Verticals_Bool_Exp>>
  name?: Maybe<String_Comparison_Exp>
  project_vertical?: Maybe<Project_Verticals_Bool_Exp>
}

/** unique or primary key constraints on table "verticals" */
export enum Verticals_Constraint {
  /** unique or primary key constraint on columns "name" */
  VerticalsPkey = 'verticals_pkey',
}

export enum Verticals_Enum {
  Artblocksxpace = 'artblocksxpace',
  Curated = 'curated',
  Explorations = 'explorations',
  Factory = 'factory',
  Flex = 'flex',
  Fullyonchain = 'fullyonchain',
  Playground = 'playground',
  Presents = 'presents',
  Unassigned = 'unassigned',
}

/** Boolean expression to compare columns of type "verticals_enum". All fields are combined with logical 'AND'. */
export type Verticals_Enum_Comparison_Exp = {
  _eq?: Maybe<Verticals_Enum>
  _in?: Maybe<Array<Verticals_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Verticals_Enum>
  _nin?: Maybe<Array<Verticals_Enum>>
}

/** input type for inserting data into table "verticals" */
export type Verticals_Insert_Input = {
  name?: Maybe<Scalars['String']>
  project_vertical?: Maybe<Project_Verticals_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Verticals_Max_Fields = {
  __typename?: 'verticals_max_fields'
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Verticals_Min_Fields = {
  __typename?: 'verticals_min_fields'
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "verticals" */
export type Verticals_Mutation_Response = {
  __typename?: 'verticals_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Verticals>
}

/** input type for inserting object relation for remote table "verticals" */
export type Verticals_Obj_Rel_Insert_Input = {
  data: Verticals_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Verticals_On_Conflict>
}

/** on_conflict condition type for table "verticals" */
export type Verticals_On_Conflict = {
  constraint: Verticals_Constraint
  update_columns?: Array<Verticals_Update_Column>
  where?: Maybe<Verticals_Bool_Exp>
}

/** Ordering options when selecting data from "verticals". */
export type Verticals_Order_By = {
  name?: Maybe<Order_By>
  project_vertical?: Maybe<Project_Verticals_Order_By>
}

/** primary key columns input for table: verticals */
export type Verticals_Pk_Columns_Input = {
  name: Scalars['String']
}

/** select columns of table "verticals" */
export enum Verticals_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "verticals" */
export type Verticals_Set_Input = {
  name?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "verticals" */
export type Verticals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Verticals_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Verticals_Stream_Cursor_Value_Input = {
  name?: Maybe<Scalars['String']>
}

/** update columns of table "verticals" */
export enum Verticals_Update_Column {
  /** column name */
  Name = 'name',
}

export type Verticals_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Verticals_Set_Input>
  where: Verticals_Bool_Exp
}

/** columns and relationships of "webflow_artist_info" */
export type Webflow_Artist_Info = {
  __typename?: 'webflow_artist_info'
  published: Scalars['Boolean']
  raw_data: Scalars['jsonb']
  slug: Scalars['String']
  /** An object relationship */
  user: Users
  user_public_address: Scalars['String']
  webflow_collection_id: Scalars['String']
  webflow_item_id: Scalars['String']
}

/** columns and relationships of "webflow_artist_info" */
export type Webflow_Artist_InfoRaw_DataArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "webflow_artist_info" */
export type Webflow_Artist_Info_Aggregate = {
  __typename?: 'webflow_artist_info_aggregate'
  aggregate?: Maybe<Webflow_Artist_Info_Aggregate_Fields>
  nodes: Array<Webflow_Artist_Info>
}

/** aggregate fields of "webflow_artist_info" */
export type Webflow_Artist_Info_Aggregate_Fields = {
  __typename?: 'webflow_artist_info_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Webflow_Artist_Info_Max_Fields>
  min?: Maybe<Webflow_Artist_Info_Min_Fields>
}

/** aggregate fields of "webflow_artist_info" */
export type Webflow_Artist_Info_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Webflow_Artist_Info_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Webflow_Artist_Info_Append_Input = {
  raw_data?: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "webflow_artist_info". All fields are combined with a logical 'AND'. */
export type Webflow_Artist_Info_Bool_Exp = {
  _and?: Maybe<Array<Webflow_Artist_Info_Bool_Exp>>
  _not?: Maybe<Webflow_Artist_Info_Bool_Exp>
  _or?: Maybe<Array<Webflow_Artist_Info_Bool_Exp>>
  published?: Maybe<Boolean_Comparison_Exp>
  raw_data?: Maybe<Jsonb_Comparison_Exp>
  slug?: Maybe<String_Comparison_Exp>
  user?: Maybe<Users_Bool_Exp>
  user_public_address?: Maybe<String_Comparison_Exp>
  webflow_collection_id?: Maybe<String_Comparison_Exp>
  webflow_item_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "webflow_artist_info" */
export enum Webflow_Artist_Info_Constraint {
  /** unique or primary key constraint on columns "webflow_item_id" */
  WebflowArtistInfoPkey = 'webflow_artist_info_pkey',
  /** unique or primary key constraint on columns "user_public_address" */
  WebflowArtistInfoUserPublicAddressKey = 'webflow_artist_info_user_public_address_key',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Webflow_Artist_Info_Delete_At_Path_Input = {
  raw_data?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Webflow_Artist_Info_Delete_Elem_Input = {
  raw_data?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Webflow_Artist_Info_Delete_Key_Input = {
  raw_data?: Maybe<Scalars['String']>
}

/** input type for inserting data into table "webflow_artist_info" */
export type Webflow_Artist_Info_Insert_Input = {
  published?: Maybe<Scalars['Boolean']>
  raw_data?: Maybe<Scalars['jsonb']>
  slug?: Maybe<Scalars['String']>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  user_public_address?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Webflow_Artist_Info_Max_Fields = {
  __typename?: 'webflow_artist_info_max_fields'
  slug?: Maybe<Scalars['String']>
  user_public_address?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Webflow_Artist_Info_Min_Fields = {
  __typename?: 'webflow_artist_info_min_fields'
  slug?: Maybe<Scalars['String']>
  user_public_address?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "webflow_artist_info" */
export type Webflow_Artist_Info_Mutation_Response = {
  __typename?: 'webflow_artist_info_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Webflow_Artist_Info>
}

/** input type for inserting object relation for remote table "webflow_artist_info" */
export type Webflow_Artist_Info_Obj_Rel_Insert_Input = {
  data: Webflow_Artist_Info_Insert_Input
  /** upsert condition */
  on_conflict?: Maybe<Webflow_Artist_Info_On_Conflict>
}

/** on_conflict condition type for table "webflow_artist_info" */
export type Webflow_Artist_Info_On_Conflict = {
  constraint: Webflow_Artist_Info_Constraint
  update_columns?: Array<Webflow_Artist_Info_Update_Column>
  where?: Maybe<Webflow_Artist_Info_Bool_Exp>
}

/** Ordering options when selecting data from "webflow_artist_info". */
export type Webflow_Artist_Info_Order_By = {
  published?: Maybe<Order_By>
  raw_data?: Maybe<Order_By>
  slug?: Maybe<Order_By>
  user?: Maybe<Users_Order_By>
  user_public_address?: Maybe<Order_By>
  webflow_collection_id?: Maybe<Order_By>
  webflow_item_id?: Maybe<Order_By>
}

/** primary key columns input for table: webflow_artist_info */
export type Webflow_Artist_Info_Pk_Columns_Input = {
  webflow_item_id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Webflow_Artist_Info_Prepend_Input = {
  raw_data?: Maybe<Scalars['jsonb']>
}

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
  WebflowItemId = 'webflow_item_id',
}

/** input type for updating data in table "webflow_artist_info" */
export type Webflow_Artist_Info_Set_Input = {
  published?: Maybe<Scalars['Boolean']>
  raw_data?: Maybe<Scalars['jsonb']>
  slug?: Maybe<Scalars['String']>
  user_public_address?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "webflow_artist_info" */
export type Webflow_Artist_Info_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Webflow_Artist_Info_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Webflow_Artist_Info_Stream_Cursor_Value_Input = {
  published?: Maybe<Scalars['Boolean']>
  raw_data?: Maybe<Scalars['jsonb']>
  slug?: Maybe<Scalars['String']>
  user_public_address?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** update columns of table "webflow_artist_info" */
export enum Webflow_Artist_Info_Update_Column {
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
  WebflowItemId = 'webflow_item_id',
}

export type Webflow_Artist_Info_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Webflow_Artist_Info_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Webflow_Artist_Info_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Webflow_Artist_Info_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Webflow_Artist_Info_Delete_Key_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Webflow_Artist_Info_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Webflow_Artist_Info_Set_Input>
  where: Webflow_Artist_Info_Bool_Exp
}

/** columns and relationships of "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles = {
  __typename?: 'webflow_spectrum_articles'
  category: Scalars['String']
  description: Scalars['String']
  extra_info?: Maybe<Scalars['String']>
  image: Scalars['String']
  published_at?: Maybe<Scalars['timestamptz']>
  raw_data: Scalars['jsonb']
  section?: Maybe<Scalars['String']>
  slug: Scalars['String']
  title: Scalars['String']
  webflow_collection_id: Scalars['String']
  webflow_item_id: Scalars['String']
}

/** columns and relationships of "webflow_spectrum_articles" */
export type Webflow_Spectrum_ArticlesRaw_DataArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Aggregate = {
  __typename?: 'webflow_spectrum_articles_aggregate'
  aggregate?: Maybe<Webflow_Spectrum_Articles_Aggregate_Fields>
  nodes: Array<Webflow_Spectrum_Articles>
}

/** aggregate fields of "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Aggregate_Fields = {
  __typename?: 'webflow_spectrum_articles_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Webflow_Spectrum_Articles_Max_Fields>
  min?: Maybe<Webflow_Spectrum_Articles_Min_Fields>
}

/** aggregate fields of "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Webflow_Spectrum_Articles_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Webflow_Spectrum_Articles_Append_Input = {
  raw_data?: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "webflow_spectrum_articles". All fields are combined with a logical 'AND'. */
export type Webflow_Spectrum_Articles_Bool_Exp = {
  _and?: Maybe<Array<Webflow_Spectrum_Articles_Bool_Exp>>
  _not?: Maybe<Webflow_Spectrum_Articles_Bool_Exp>
  _or?: Maybe<Array<Webflow_Spectrum_Articles_Bool_Exp>>
  category?: Maybe<String_Comparison_Exp>
  description?: Maybe<String_Comparison_Exp>
  extra_info?: Maybe<String_Comparison_Exp>
  image?: Maybe<String_Comparison_Exp>
  published_at?: Maybe<Timestamptz_Comparison_Exp>
  raw_data?: Maybe<Jsonb_Comparison_Exp>
  section?: Maybe<String_Comparison_Exp>
  slug?: Maybe<String_Comparison_Exp>
  title?: Maybe<String_Comparison_Exp>
  webflow_collection_id?: Maybe<String_Comparison_Exp>
  webflow_item_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "webflow_spectrum_articles" */
export enum Webflow_Spectrum_Articles_Constraint {
  /** unique or primary key constraint on columns "webflow_item_id" */
  WebflowSpectrumArticlesPkey = 'webflow_spectrum_articles_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Webflow_Spectrum_Articles_Delete_At_Path_Input = {
  raw_data?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Webflow_Spectrum_Articles_Delete_Elem_Input = {
  raw_data?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Webflow_Spectrum_Articles_Delete_Key_Input = {
  raw_data?: Maybe<Scalars['String']>
}

/** input type for inserting data into table "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Insert_Input = {
  category?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  extra_info?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['timestamptz']>
  raw_data?: Maybe<Scalars['jsonb']>
  section?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Webflow_Spectrum_Articles_Max_Fields = {
  __typename?: 'webflow_spectrum_articles_max_fields'
  category?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  extra_info?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['timestamptz']>
  section?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Webflow_Spectrum_Articles_Min_Fields = {
  __typename?: 'webflow_spectrum_articles_min_fields'
  category?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  extra_info?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['timestamptz']>
  section?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Mutation_Response = {
  __typename?: 'webflow_spectrum_articles_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Webflow_Spectrum_Articles>
}

/** on_conflict condition type for table "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_On_Conflict = {
  constraint: Webflow_Spectrum_Articles_Constraint
  update_columns?: Array<Webflow_Spectrum_Articles_Update_Column>
  where?: Maybe<Webflow_Spectrum_Articles_Bool_Exp>
}

/** Ordering options when selecting data from "webflow_spectrum_articles". */
export type Webflow_Spectrum_Articles_Order_By = {
  category?: Maybe<Order_By>
  description?: Maybe<Order_By>
  extra_info?: Maybe<Order_By>
  image?: Maybe<Order_By>
  published_at?: Maybe<Order_By>
  raw_data?: Maybe<Order_By>
  section?: Maybe<Order_By>
  slug?: Maybe<Order_By>
  title?: Maybe<Order_By>
  webflow_collection_id?: Maybe<Order_By>
  webflow_item_id?: Maybe<Order_By>
}

/** primary key columns input for table: webflow_spectrum_articles */
export type Webflow_Spectrum_Articles_Pk_Columns_Input = {
  webflow_item_id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Webflow_Spectrum_Articles_Prepend_Input = {
  raw_data?: Maybe<Scalars['jsonb']>
}

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
  WebflowItemId = 'webflow_item_id',
}

/** input type for updating data in table "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Set_Input = {
  category?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  extra_info?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['timestamptz']>
  raw_data?: Maybe<Scalars['jsonb']>
  section?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** Streaming cursor of the table "webflow_spectrum_articles" */
export type Webflow_Spectrum_Articles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Webflow_Spectrum_Articles_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: Maybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Webflow_Spectrum_Articles_Stream_Cursor_Value_Input = {
  category?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  extra_info?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['timestamptz']>
  raw_data?: Maybe<Scalars['jsonb']>
  section?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  webflow_collection_id?: Maybe<Scalars['String']>
  webflow_item_id?: Maybe<Scalars['String']>
}

/** update columns of table "webflow_spectrum_articles" */
export enum Webflow_Spectrum_Articles_Update_Column {
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
  WebflowItemId = 'webflow_item_id',
}

export type Webflow_Spectrum_Articles_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: Maybe<Webflow_Spectrum_Articles_Append_Input>
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: Maybe<Webflow_Spectrum_Articles_Delete_At_Path_Input>
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: Maybe<Webflow_Spectrum_Articles_Delete_Elem_Input>
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: Maybe<Webflow_Spectrum_Articles_Delete_Key_Input>
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: Maybe<Webflow_Spectrum_Articles_Prepend_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: Maybe<Webflow_Spectrum_Articles_Set_Input>
  where: Webflow_Spectrum_Articles_Bool_Exp
}

export type GetTokensImagesQueryVariables = Exact<{
  token_ids?: Maybe<Array<Scalars['String']> | Scalars['String']>
}>

export type GetTokensImagesQuery = { __typename?: 'query_root' } & {
  tokens_metadata: Array<
    { __typename?: 'tokens_metadata' } & Pick<
      Tokens_Metadata,
      'id' | 'image_id'
    >
  >
}

export const GetTokensImagesDocument = gql`
  query GetTokensImages($token_ids: [String!]) {
    tokens_metadata(where: { id: { _in: $token_ids } }) {
      id
      image_id
    }
  }
`
