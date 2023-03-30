import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  get(groupId: string, trxId: string) {
    return axios.get(`/api/v1/trx/${groupId}/${trxId}`) as Promise<ITrx>;
  },
});

export interface ITrx {
  TrxId: string
  GroupId: string
  SenderPubkey: string
  Data: string
  TimeStamp: number
  Version: string
  SenderSign: string
}