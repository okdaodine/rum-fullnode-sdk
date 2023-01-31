import { AxiosInstance } from 'axios';
import qs from 'query-string';

export default (axios: AxiosInstance) => ({
  create(groupId: string, data: Object) {
    return axios.post(`/api/v1/group/${groupId}/content`, { data }) as Promise<ICreateContentRes>;
  },

  list(groupId: string, p: IListContentParams) {
    return axios.get(`/app/api/v1/group/${groupId}/content?${qs.stringify(p)}`, {
      headers: {
        'Accept-Content': 'gzip',
      },
    }) as Promise<null | Array<IContentItem>>
  }
});

export interface ICreateContentRes {
  trx_id: string
}

export interface IListContentParams {
  num: number
  starttrx?: string
  nonce?: number
  reverse?: boolean
  includestarttrx?: boolean
}

export interface IContentItem {
  TrxId: string
  Publisher: string
  TypeUrl: string
  TimeStamp: number
  Content: string
}