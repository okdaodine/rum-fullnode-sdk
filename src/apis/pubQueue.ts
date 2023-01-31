import { AxiosInstance } from 'axios';
import { ITrx } from './trx';
import qs from 'query-string';

export default (axios: AxiosInstance) => ({
  list(groupId: string, options?: {
    trx: string
  }) {
    return axios.get(`/api/v1/group/${groupId}/pubqueue?=${qs.stringify(options || {})}`) as Promise<IPubQueueRes>;
  },

  acknowledge(trxIds: string[]) {
    return axios.post('/api/v1/trx/ack', {
      trx_ids: trxIds,
    }) as Promise<IAcknowledgeRes>;
  }
});

export interface IPubQueueRes {
  GroupId: string
  Data: IPubQueueTrx[]
}

export interface IPubQueueTrx {
  GroupId: string
  RetryCount: number
  State: 'SUCCESS' | 'PENDING' | 'FAIL'
  UpdateAt: number
  StorageType: string
  Trx: ITrx
}

export type IAcknowledgeRes = string[];