import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  getAuthRule(groupId: string, trxType: TrxTypeUpper) {
    return axios.get(`/api/v1/group/${groupId}/trx/auth/${trxType}`) as Promise<IFollowingRule>;
  },

  updateChainConfig(p: IUpdateChainConfig) {
    const payload: any = p;
    payload.config = JSON.stringify(p.config);
    return axios.post('/api/v1/group/chainconfig', payload) as Promise<IUpdateChainConfigRes>;
  },

  getAllowList(groupId: string) {
    return axios.get(`/api/v1/group/${groupId}/trx/allowlist`) as Promise<Array<IAllowOrDenyListItem> | null>;
  },

  getDenyList(groupId: string) {
    return axios.get(`/api/v1/group/${groupId}/trx/denylist`) as Promise<Array<IAllowOrDenyListItem> | null>;
  }
});

export interface IUpdateChainConfig {
  group_id: string
  type: 'upd_alw_list' | 'upd_dny_list' | 'set_trx_auth_mode'
  config: {
    trx_type: TrxTypeUpper | TrxTypeLower[]
    memo: string
    action?: 'add' | 'remove'
    pubkey?: string
    trx_auth_mode?: AuthTypeLower
  }
}

export type TrxTypeUpper = 'POST' | 'ANNOUNCE' | 'REQ_BLOCK_FORWARD' | 'REQ_BLOCK_BACKWARD' | 'BLOCK_SYNCED' | 'BLOCK_PRODUCED' | 'ASK_PEERID';

export type TrxTypeLower = 'post' | 'announce' | 'req_block_forward' | 'req_block_backward' | 'block_synced' | 'block_produced' | 'ask_peerid';

export type AuthTypeUpper = 'FOLLOW_ALW_LIST' | 'FOLLOW_DNY_LIST'

export type AuthTypeLower = 'follow_alw_list' | 'follow_dny_list';

export interface IUpdateChainConfigRes {
  'group_id': string
  'owner_pubkey': string
  'signature': string
  'trx_id': string
}

export interface IAllowOrDenyListItem {
  Pubkey: string
  TrxType: TrxTypeUpper
  GroupOwnerPubkey: string
  GroupOwnerSign: string
  TimeStamp: number
  Memo: string
}

export interface IFollowingRule {
  TrxType: TrxTypeUpper
  AuthType: AuthTypeUpper
}
