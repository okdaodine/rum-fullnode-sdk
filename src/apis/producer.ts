import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  announce(p: IAnnouncePayload) {
    return axios.post('/api/v1/group/announce', p) as Promise<IAnnounceProducerRes>;
  },

  listAnnouncedProducers(groupId: string) {
    return axios.get(`/api/v1/group/${groupId}/announced/producers`) as Promise<Array<IAnnouncedProducer>>;
  },

  declare(p: IDeclareProducerPayload) {
    return axios.post('/api/v1/group/producer', p) as Promise<IDeclareProducerRes>;
  },

  listApprovedProducers(groupId: string) {
    return axios.get(`/api/v1/group/${groupId}/producers`) as Promise<Array<IApprovedProducer>>;
  },
});

export interface IAnnouncePayload {
  group_id: string
  action: 'add' | 'remove'
  type: 'producer'
  memo: string
}

export interface IAnnounceProducerRes {
  group_id: string
  sign_pubkey: string
  encrypt_pubkey: string
  type: string
  action: string
  sign: string
  trx_id: string
}

export interface IAnnouncedProducer {
  Action: 'ADD' | 'REMOVE'
  AnnouncedPubkey: string
  AnnouncerSign: string
  Result: 'ANNOUNCED' | 'APPROVED'
  Memo: string
  TimeStamp: number
}

export interface IDeclareProducerPayload {
  producer_pubkey: string
  group_id: string
  action: 'add' | 'remove'
}

export interface IDeclareProducerRes {
  group_id: string
  producer_pubkey: string
  owner_pubkey: string
  signature: string
  trx_id: string
  memo: string
  action: string
}

export interface IApprovedProducer {
  ProducerPubkey: string
  OwnerPubkey: string
  OwnerSign: string
  TimeStamp: number
  BlockProduced: number
}
