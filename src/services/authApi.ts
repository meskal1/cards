import axios, { AxiosResponse } from 'axios'

// API
const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('', data)
  },
  logout() {
    return instance.delete<ResponseType>('')
  },
  me() {
    return instance.get<ResponseType>('')
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

export type AuthMeType = {}

export type ResponseType = {}
