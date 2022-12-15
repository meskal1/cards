import axios, { AxiosResponse } from 'axios'

// API
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
  },
  logout() {
    return instance.delete<DeleteResponseType>('auth/me', {})
  },
  me() {
    return instance.post<ResponseType>('auth/me', {})
  },
  register(data: RegisterParamsType) {
    return instance.post<RegisterResponseType>('/auth/register', data)
  },
}

// TYPES
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserType = {
  _id: string
  email: string
  rememberMe: boolean
  name: string
  publicCardPacksCount: number
  created: string
  updated: string
  avatar: string
}

export type RegisterParamsType = Omit<LoginParamsType, 'rememberMe'>

export type RegisterResponseType = RegisterSuccessResponseType

export type RegisterSuccessResponseType = {
  addedUser: AddedUserType
}

export type RegisterFailResponseType = {
  error: string
  email: string
  in: string
}

export type AddedUserType = Omit<UserType, 'avatar'>

export type ResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
  token: string
  tokenDeathTime: number
  __v: number
}

type DeleteResponseType = {
  info: string
  error: string
}
