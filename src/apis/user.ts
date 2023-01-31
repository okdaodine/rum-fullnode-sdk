import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  announce(p: IAnnouncePayload) {
    return axios.post('/api/v1/group/announce', p) as Promise<IAnnounceUserRes>;
  },

  listAnnouncedUsers(groupId: string) {
    return axios.get(`/api/v1/group/${groupId}/announced/users`) as Promise<Array<IAnnouncedUser>>;
  },
  
  getAnnouncedUser(groupId: string, pubKey: string) {
    return axios.get(`/api/v1/group/${groupId}/announced/user/${pubKey}`) as Promise<IAnnouncedUser>;
  },

  declare(p: IDeclareUserPayload) {
    return axios.post('/api/v1/group/user', p) as Promise<IDeclareUserRes>;
  },
});

export interface IAnnouncePayload {
  'group_id': string
  'action': 'add' | 'remove'
  'type': 'user'
  'memo': string
}

export interface IAnnounceUserRes {
  group_id: string
  sign_pubkey: string
  encrypt_pubkey: string
  type: string
  action: string
  sign: string
  trx_id: string
}

export interface IAnnouncedUser {
  AnnouncedEncryptPubkey: string
  AnnouncedSignPubkey: string
  AnnouncerSign: string
  Result: 'ANNOUNCED' | 'APPROVED'
  Memo: string
  TimeStamp: number
}

export interface IDeclareUserPayload {
  'user_pubkey': string
  'group_id': string
  'action': 'add' | 'remove'
}

export interface IDeclareUserRes {
  group_id: string
  user_pubkey: string
  encrypt_pubkey: string
  owner_pubkey: string
  sign: string
  trx_id: string
  memo: string
  action: string
}
