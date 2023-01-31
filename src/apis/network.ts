import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  get() {
    return axios.get('/api/v1/network') as Promise<INetwork>;
  },
});

export interface INetwork {
  peer_id: string
  eth_addr: string
  nat_type: string
  nat_enabled: boolean
  addrs: string[]
  groups: INetworkGroup[] | null
  node: any
}

export interface INetworkGroup {
  GroupId: string
  GroupName: string
  Peers: string[] | null
}