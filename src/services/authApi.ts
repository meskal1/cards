import axios, { AxiosResponse } from 'axios'

// API
//process.env.REACT_APP_BASE_URL,
const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  register() {
    return instance.post('auth/register', {
      email: 'project@test.com',
      password: 'qwerty123',
    })
  },

  login(data?: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', {
      email: 'project@test.com',
      password: 'qwerty123',
      rememberMe: false,
    })
  },
  logout() {
    return instance.delete<ResponseType>('')
  },
  me() {
    return instance.post<ResponseType>('auth/me', {})
  },
}

// TYPES
export type LoginParamsType = {}

export type AuthMeType = {}

type ErrorResponseType = {
  error: string
  in: string
}

export type ResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}
