import { AxiosInstance } from 'axios';
import qs from 'query-string';
import * as Base64 from 'js-base64';

export default (axios: AxiosInstance) => ({
  create(groupId: string, data: Object) {
    return axios.post(`/api/v1/group/${groupId}/content`, { data }) as Promise<ICreateContentRes>;
  },

  async list(groupId: string, p: IListContentParams) {
    const contents: null | Array<IContentItem> = await (axios.get(`/app/api/v1/group/${groupId}/content?${qs.stringify(p)}`, {
      headers: {
        'Accept-Content': 'gzip',
      },
    }));
    if (!contents) {
      return contents;
    }
    return contents.map(content => {
      try {
        content.Data = JSON.parse(Base64.decode(content.Data));
      } catch (err) {
        console.log(err); 
      }
      return content;
    });
  }
});

export interface ICreateContentRes {
  trx_id: string
}

export interface IListContentParams {
  num: number
  start_trx?: string
  reverse?: boolean
  include_start_trx?: boolean
  senders?: Array<string>
}

export interface IContentItem {
  Data: string
  GroupId: string
  SenderPubkey: string
  SenderSign: string
  TimeStamp: string
  TrxId: string
  Version: string
}