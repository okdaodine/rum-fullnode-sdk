import axios from 'axios';
import Group from './apis/group';
import Token from './apis/token';
import AppConfig from './apis/appConfig';
import Content from './apis/content';
import Trx from './apis/trx';
import Network from './apis/network';
import Node from './apis/node';
import User from './apis/user';
import Producer from './apis/producer';
import Auth from './apis/auth';
import PubQueue from './apis/pubQueue';

const RumFullNodeClient = (p: {
  baseURL: string
  jwt?: string
}) => {
  const axiosInstance = axios.create({
    baseURL: p.baseURL,
    headers: {
      Authorization: `Bearer ${p.jwt || ''}`,
    }
  });
  axiosInstance.interceptors.response.use(async (res) => res.data);
  return {
    Group: Group(axiosInstance),
    Token: Token(axiosInstance),
    AppConfig: AppConfig(axiosInstance),
    Content: Content(axiosInstance),
    Trx: Trx(axiosInstance),
    Network: Network(axiosInstance),
    Node: Node(axiosInstance),
    User: User(axiosInstance),
    Producer: Producer(axiosInstance),
    Auth: Auth(axiosInstance),
    PubQueue: PubQueue(axiosInstance),
  }
}

export default RumFullNodeClient

export { RumFullNodeClient }

if (typeof window !== 'undefined') {
  (window as any).RumFullNodeClient = RumFullNodeClient;
}

