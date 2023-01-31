import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  change(p: IChangeReq) {
    return axios.post('/api/v1/group/appconfig', p) as Promise<IChangeRes>;
  },

  getKeyList(groupId: string) {
    return axios.get(`/api/v1/group/${groupId}/appconfig/keylist`) as Promise<IGetKeyListRes>;
  },

  getValueByKey(groupId: string, key: string) {
    return axios.get(`/api/v1/group/${groupId}/appconfig/${key}`) as Promise<IGetItemByKey>;
  }
});

export interface IChangeReq {
  action: 'add' | 'del'
  group_id: string
  name: string
  type: 'int' | 'string' | 'bool'
  value: unknown
  memo?: string
}

export interface IChangeRes {
  group_id: string
  signature: string
  trx_id: string
}

export type IGetKeyListRes = null | Array<{ Name: string, Type: 'STRING' | 'BOOL' | 'INT' }>;

export interface IGetItemByKey {
  Name: string
  Type: string
  Value: string
  OwnerPubkey: string
  OwnerSign: string
  Memo: string
  TimeStamp: number
}