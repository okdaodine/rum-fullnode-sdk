import { AxiosInstance } from 'axios';
import qs from 'query-string';

export default (axios: AxiosInstance) => ({
  create(p: ICreateTokenReq) {
    return axios.post('/app/api/v1/token', p) as Promise<ICreateTokenRes>;
  },

  list() {
    return axios.get('/app/api/v1/token/list') as Promise<IListTokenRes>;
  },

  revoke(p: IRevokeTokenReq) {
    return axios.post('/app/api/v1/token/revoke', p) as Promise<IRevokeTokenRes>;
  },

  refresh(token: string) {
    return axios.post('/app/api/v1/token/refresh', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }) as Promise<IRefreshTokenRes>;
  },

  remove(p: IRemoveTokenReq) {
    return axios.delete(`/app/api/v1/token?${qs.stringify(p)}`) as Promise<IRemoveTokenRes>;
  },
});


export interface ICreateTokenReq {
  group_id: string
  expires_at: string
  name: string
  role: 'node' | 'chain'
}

export interface ICreateTokenRes {
  token: string
}

export interface IRevokeTokenRes {
  success: boolean
}

export interface IListTokenRes {
  key: string,
  chain: {
    normal: Array<{ remark: string, token: string }> | null
    revoke: Array<{ remark: string, token: string }> | null
  },
  node: {
    normal: Array<{ remark: string, token: string }> | null
    revoke: Array<{ remark: string, token: string }> | null
  },
}

export interface IRefreshTokenRes {
  token: string
}

export interface IRemoveTokenRes {
  success: boolean
}

export interface IRevokeTokenReq {
  group_id?: string
  role: 'node' | 'chain'
  token: string
}

export interface IRemoveTokenReq {
  group_id?: string
  role: 'node' | 'chain'
  token: string
}