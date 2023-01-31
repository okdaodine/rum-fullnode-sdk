import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  create(p: ICreateTokenReq) {
    return axios.post('/app/api/v1/token/create', p) as Promise<ICreateTokenRes>;
  },

  refresh(token: string) {
    return axios.post('/app/api/v1/token/refresh', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }) as Promise<IRefreshTokenRes>;
  },
});


export interface ICreateTokenReq {
  allow_groups?: string[]
  expires_at: string
  name: string
  role: 'node' | 'chain'
}

export interface ICreateTokenRes {
  token: string
}

export interface IRefreshTokenRes {
  token: string
}