import axios, { AxiosResponse } from 'axios'

// API
const instance = axios.create({
  //   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
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
}

// TYPES
export type LoginParamsType = {}

export type AuthMeType = {}

export type ResponseType = {}
