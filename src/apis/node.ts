import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  get() {
    return axios.get('/api/v1/node') as Promise<INode>;
  },
});

export interface INode {
  node_id: string
  node_publickey: string
  node_status: string
  node_type: string
  node_version: string
  peers: Record<string, string[]>
}
