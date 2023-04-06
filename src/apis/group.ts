import { AxiosInstance } from 'axios';
import qs from 'query-string';

export default (axios: AxiosInstance) => ({
  create(p: ICreateParams) {
    return axios.post('/api/v1/group', p) as Promise<ICreateGroupsRes>;
  },

  get(groupId: string) {
    return axios.get(`/api/v1/group/${groupId}`) as Promise<IGroup>;
  },

  leave(groupId: string) {
    return axios.post('/api/v1/group/leave', { group_id: groupId }) as Promise<ILeaveGroupRes>;
  },

  clear(groupId: string) {
    return axios.post('/api/v1/group/clear', { group_id: groupId }) as Promise<IClearGroupRes>;
  },

  list() {
    return axios.get('/api/v1/groups') as Promise<IListGroupsRes>;
  },

  join(seed: string) {
    return axios.post('/api/v2/group/join', { seed }) as Promise<IJoinGroupRes>;
  },

  getSeed(groupId: string, options?: { include_chain_url: string }) {
    return axios.get(`/api/v1/group/${groupId}/seed?${qs.stringify(options || {})}`) as Promise<IGetSeedRes>;
  },
});

export interface ICreateParams {
  group_name: string
  consensus_type: string
  encryption_type: string
  app_key: string
  include_chain_url?: string
}

export interface IListGroupsRes {
  groups: Array<IGroup> | null
}

export interface IGetSeedRes {
  seed: string
}

export interface IGroup {
  app_key: string
  cipher_key: string
  consensus_type: string
  currt_epoch: number
  currt_top_block: number
  encryption_type: string
  group_id: string
  group_name: string
  last_updated: number,
  owner_pubkey: string
  rex_Syncer_result: {
    blockProvided: number
    fromBlock: number
    lastSyncTaskTimestamp: number
    nextSyncTaskTimeStamp: number
    provider: string
    syncResult: string
  },
  rex_syncer_status: string
  user_eth_addr: string
  user_pubkey: string
}

export interface ICreateGroupsRes {
  group_id: string
  seed: string
}

export interface IJoinGroupRes {
  group_id: string
  group_name: string
  owner_pubkey: string
  user_pubkey: string
  user_encryptpubkey: string
  consensus_type: string
  encryption_type: string
  cipher_key: string
  app_key: string
  signature: string
}

export interface ILeaveGroupRes {
  group_id: string
}

export interface IClearGroupRes {
  group_id: string
}

export type AppGetAppConfigItemConfigKeyListRes = null | Array<{ Name: string, Type: 'STRING' | 'BOOL' | 'INT' }>;

export interface AppConfigItemRes {
  Name: string
  Type: string
  Value: string
  OwnerPubkey: string
  OwnerSign: string
  Memo: string
  TimeStamp: number
}

export interface ISeed {
  genesis_block: {
    BlockId: string;
    GroupId: string;
    PrevBlockId: string;
    PreviousHash: null,
    TimeStamp: number,
    ProducerPubKey: string;
    Trxs: null,
    Signature: string;
  },
  group_name: string;
  consensus_type: string;
  encryption_type: string;
  cipher_key: string;
  group_id: string;
  owner_pubkey: string;
  signature: string;
  app_key: string;
  urls: string[]
}